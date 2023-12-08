---
title: 6：redis实现用户签到以及签到统计
date: 2023-12-08
sidebar: auto
categories:
  - spring
tags:
  - Redis
  - springboot

author: 胡昊泽
---
## 1：数据库实现
![Alt text](./assets/image9.png)
 但是呢，这么做会有一个问题？

:::warning 问题
用户一次签到，就是一条记录，假如有 `1000万` 用户，平均每人每年签到次数为 `10` 次，则这张表一年的数据量为 `1亿` 条

每签到一次需要使用 `（8 + 8 + 1 + 1 + 3 + 1）` 共 `22` 字节的内存，一个月则最多需要600多字节

我们如何能够简化一点呢？其实可以考虑小时候一个挺常见的方案，就是小时候，咱们准备一张小小的卡片，你只要签到就打上一个勾，我最后判断你是否签到，其实只需要到小卡片上看一看就知道了

我们可以采用类似这样的方案来实现我们的签到需求。

我们 **按月来统计用户签到信息，签到记录为1，未签到则记录为0.**

把每一个 `bit` 位对应 `当月的每一天` ，形成了映射关系。用 `0` 和 `1` 标示业务状态，这种思路就称为 `位图（BitMap）` 。这样我们就用极小的空间，来实现了大量数据的表示

`Redis` 中是利用 `string` 类型数据结构实现 `BitMap` ，因此最大上限是 `512M` ，转换为`bit` 则是 `2^32个bit` 位。
:::

## 2：redis实现
![Alt text](./assets/image10.png)

`BitMap` 的操作命令有：
- `SETBIT` ：向 `指定位置`（offset）存入一个0或1
- `GETBIT` ：获取 `指定位置` （offset）的bit值
- `BITCOUNT` ：统计BitMap中 `值为1的bit位的数量`
- `BITFIELD` ：操作（查询、修改、自增）BitMap中bit数组中的指定位置（offset）的值
- `BITFIELD_RO` ：获取BitMap中bit数组，并以十进制形式返回
- `BITOP` ：将多个BitMap的结果做 `位运算（与 、或、异或）`
- `BITPOS` ：查找bit数组中指定范围内第一个0或1出现的位置 

### 1）用户签到-实现签到功能
> 需求：实现签到接口，将当前用户当天签到信息保存到Redis中

思路：我们可以把 **年和月作为bitMap的key**，然后保存到一个 `bitMap` 中，每次签到就到对应的位上把数字 **从0变成1**，只要对应是1，就表明说明这一天已经签到了，反之则没有签到。

我们通过接口文档发现，此接口并没有传递任何的参数，没有参数怎么确实是哪一天签到呢？这个很容易，可以通过后台代码直接获取即可，然后到对应的地址上去修改bitMap。

controller
```java
    @PostMapping("/sign")
    public Result sign() {
        return userService.sign();
    }
```

service
```java
@Override
    public Result sign() {
        //1：获取当前登录用户。
        Long userID = UserHolder.getUser().getId();
        //2：获取当前日期。
        LocalDateTime now = LocalDateTime.now();
        //2.1获取当前日期中的  年和月
        String keySuffix = now.format(DateTimeFormatter.ofPattern(":yyyyMM"));
        //3：拼接key  (当前用户id + 年月)
        String key = USER_SIGN_KEY + userID + keySuffix;
        //4：获取今天是当月的第几天
        int dayOfMonth = now.getDayOfMonth();
        //5：存入redis   setbit key offset 1
        stringRedisTemplate.opsForValue().setBit(key, dayOfMonth - 1, true);
        return Result.ok();
    }
```

### 2）用户签到-签到统计

> 问题1：什么叫做连续签到天数？

从最后一次签到开始向前统计，直到遇到第一次未签到为止，计算总的签到次数，就是连续签到天数。

Java逻辑代码：获得当前这个月的最后一次签到数据，定义一个计数器，然后不停的向前统计，直到获得第一个非0的数字即可，每得到一个非0的数字计数器+1，直到遍历完所有的数据，就可以获得当前月的签到总天数了

> 问题2：如何得到本月到今天为止的所有签到数据？

`BITFIELD key GET u[dayOfMonth] 0`

假设今天是10号，那么我们就可以从当前月的第一天开始，获得到当前这一天的位数，是10号，那么就是10位，去拿这段时间的数据，就能拿到所有的数据了，那么这10天里边签到了多少次呢？统计有多少个1即可。

> 问题3：如何从后向前遍历每个bit位？ 

**注意** ：bitMap返回的数据是10进制，哪假如说返回一个数字8，那么我哪儿知道到底哪些是0，哪些是1呢？我们只需要让 <span style="color:red">得到的10进制数字和1做与运算就可以了，因为1只有遇见1 才是1，其他数字都是0</span> ，我们把签到结果和1进行与操作，每与一次，就把签到结果向右移动一位，依次内推，我们就能完成逐个遍历的效果了。

> 需求：实现下面接口，统计当前用户截止当前时间在本月的连续签到天数

有用户有时间我们就可以组织出对应的key，此时就能找到这个用户截止这天的所有签到记录，再根据这套算法，就能统计出来他连续签到的次数了

controller
```java
   @GetMapping("/sign/count")
    public Result signCount() {
        return userService.signCount();
    }
```

service
```java
@Override
public Result signCount() {
    // 1.获取当前登录用户
    Long userId = UserHolder.getUser().getId();
    // 2.获取日期
    LocalDateTime now = LocalDateTime.now();
    // 3.拼接key
    String keySuffix = now.format(DateTimeFormatter.ofPattern(":yyyyMM"));
    String key = USER_SIGN_KEY + userId + keySuffix;
    // 4.获取今天是本月的第几天
    int dayOfMonth = now.getDayOfMonth();
    // 5.获取本月截止今天为止的所有的签到记录，返回的是一个十进制的数字 BITFIELD sign:5:202203 GET u14 0
    List<Long> result = stringRedisTemplate.opsForValue().bitField(
            key,
            BitFieldSubCommands.create()
                    .get(BitFieldSubCommands.BitFieldType.unsigned(dayOfMonth)).valueAt(0)
    );
    if (result == null || result.isEmpty()) {
        // 没有任何签到结果
        return Result.ok(0);
    }
    Long num = result.get(0);
    if (num == null || num == 0) {
        return Result.ok(0);
    }
    // 6.循环遍历
    int count = 0;
    while (true) {
        // 6.1.让这个数字与1做与运算，得到数字的最后一个bit位  // 判断这个bit位是否为0
        if ((num & 1) == 0) {
            // 如果为0，说明未签到，结束
            break;
        }else {
            // 如果不为0，说明已签到，计数器+1
            count++;
        }
        // 把数字右移一位，抛弃最后一个bit位，继续下一个bit位
        num >>>= 1;
    }
    return Result.ok(count);
}
```