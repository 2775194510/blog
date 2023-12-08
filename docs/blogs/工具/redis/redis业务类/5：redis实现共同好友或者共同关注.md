---
title: 5：redis实现共同好友或者共同关注
date: 2023-12-08
sidebar: auto
categories:
  - spring
tags:
  - Redis
  - springboot

author: 胡昊泽
---

## 1：需求
> 利用Redis中恰当的数据结构，实现共同关注功能。在博主个人页面展示出当前用户与博主的共同关注呢。

当然是使用我们之前学习过的set集合咯，在 `set集合` 中， ***有交集并集补集的api*** ，我们可以把两人的关注的人分别放入到一个set集合中，然后再通过api去查看这两个set集合中的交集数据。

## 2：提供个人思路
:::warning 个人思路
首先要求交集，则必选 `set` 集合（此时redis中已经有了两个id的set集合，在点击关注的时候就要添加或者删除。）
- 首先用户 `A` 需要点击某个好友 `B` ，这样就需要将 `被点击好友的id` 传到后台。
- 后台拿到`B id`，也拿到`A id`，直接求出他们`交集（intersect）`。
:::

## 3：Java代码实现
```java
@Service
public class FollowServiceImpl extends ServiceImpl<FollowMapper, Follow> implements IFollowService {
 
    @Autowired
    private StringRedisTemplate stringRedisTemplate;
 
    @Autowired
    private IUserService userService;
 
    //取消关注service
    @Override
    public Result isFollow(Long followUserId) {
        // 1.获取登录用户
        Long userId = UserHolder.getUser().getId();
        // 2.查询是否关注 select count(*) from tb_follow where user_id = ? and follow_user_id = ?
        Integer count = query().eq("user_id", userId).eq("follow_user_id", followUserId).count();
        // 3.判断
        return Result.ok(count > 0);
    }
 
    //关注service
    @Override
    public Result follow(Long followUserId, Boolean isFollow) {
        // 1.获取登录用户
        Long userId = UserHolder.getUser().getId();
        String key = "follows:" + userId;
        // 1.判断到底是关注还是取关
        if (isFollow) {
            // 2.关注，新增数据
            Follow follow = new Follow();
            follow.setUserId(userId);
            follow.setFollowUserId(followUserId);
            boolean isSuccess = save(follow);
            if (isSuccess) {
                // 把关注用户的id，放入redis的set集合 sadd userId followerUserId
                stringRedisTemplate.opsForSet().add(key, followUserId.toString());
            }
 
        } else {
            // 3.取关，删除 delete from tb_follow where user_id = ? and follow_user_id = ?
            boolean isSuccess = remove(new QueryWrapper<Follow>()
                    .eq("user_id", userId).eq("follow_user_id", followUserId));
            if (isSuccess) {
                stringRedisTemplate.opsForSet().remove(key, followUserId.toString());
            }
 
        }
        return Result.ok();
    }
 
    /**
     * 方法描述:
     *
     * @param id: 点击用户的id
     * @return com.hmdp.dto.Result
     * @Author 小泽
     * @Date 2022/8/23 17:17
     */
    @Override
    public Result followCommons(Long id) {
        // 1.获取当前用户
        Long userId = UserHolder.getUser().getId();
        String key = "follows:" + userId;
        // 2.求交集
        String key2 = "follows:" + id;
        Set<String> intersect = stringRedisTemplate.opsForSet().intersect(key, key2);
        if (intersect == null || intersect.isEmpty()) {
            // 无交集
            return Result.ok(Collections.emptyList());
        }
        // 3.解析id集合
        List<Long> ids = intersect.stream().map(Long::valueOf).collect(Collectors.toList());
        // 4.查询用户
        List<UserDTO> users = userService.listByIds(ids)
                .stream()
                .map(user -> BeanUtil.copyProperties(user, UserDTO.class))
                .collect(Collectors.toList());
        return Result.ok(users);
    }
 
}
```