---
title: 1：用redis生成唯一自增id
date: 2023-11-27
sidebar: auto
categories:
  - spring
tags:
  - Redis
  - springboot

author: 胡昊泽
---

方式：`32位时间戳` + `redis自增id`
![Alt text](./assets/image7.png)
ID 组成部分：

- `符号位`：1 bit，永远为 0
- `时间戳`：31 bit，以秒为单位，可以使用 69 年
- `序列号`：32 bit，秒内的计数器，支持每秒产生 2^32 个不同的 ID
```java
package com.xiaoze.exer.Component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

/**
 * @author 小泽
 * @create 2022-08-17  14:59
 * 记得每天敲代码哦
 */
@Component
public class RedisIdWorker {

    private static final long BEGIN_TIMESTAMP = 1640995200L;

    //序列号得位数
    private static int COUNT_BITS = 32;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    public  Long nextId(String keyPrefix) {
        //获取当前时间
        LocalDateTime now = LocalDateTime.now();
        //获取当前时间得秒数
        long nowSecond = now.toEpochSecond(ZoneOffset.UTC);
        long time = nowSecond - BEGIN_TIMESTAMP;

        String format = now.format(DateTimeFormatter.ofPattern("yyyy:MM:dd"));
        // Redis Incrby 命令将 key 中储存的数字加上指定的增量值。
        // 如果 key 不存在，那么 key 的值会先被初始化为 0 ，然后再执行 INCRBY 命令。
        Long count = stringRedisTemplate.opsForValue().increment("icr:" + keyPrefix + ":" + format);
        return time << COUNT_BITS | count;
    }

    // public static void main(String[] args) {
    //        // LocalDateTime of = LocalDateTime.of(2023, 11, 27, 0, 0, 0);
    //        // long l = of.toEpochSecond(ZoneOffset.UTC);
    //        // // LocalTime类的toEpochSecond()方法用于
    //        // // 将此LocalTime转换为自1970-01-01T00：00：00Z以来的秒数
    //        // System.out.println(l);
    //     // RedisIdWorker redisIdWorker = new RedisIdWorker();
    //     // Long test = redisIdWorker.nextId("test");
    //     // System.out.println(test);
    // }
}
```

测试
```java
@SpringBootTest
class HmDianPingApplicationTests {
 
    @Autowired
    private RedisIdWorker redisIdWorker;
 
    private ExecutorService es = Executors.newFixedThreadPool(500);
 
    @Test
    void testIdWorker() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(300);
        Runnable task = () -> {
            for (int i = 0; i < 100; i++) {
                Long id = redisIdWorker.nextId("order");
                System.out.println("id = " + id);
            }
            latch.countDown();
        };
        long begin = System.currentTimeMillis();
        for (int i = 0; i < 300; i++) {
            es.submit(task);
        }
        latch.await();
        long end = System.currentTimeMillis();
        System.out.println("time = " + (end - begin));
    }
 
}
```