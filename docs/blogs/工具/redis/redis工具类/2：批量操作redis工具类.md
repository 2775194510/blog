---
title: 2：批量操作redis工具类
date: 2023-11-27
sidebar: auto
categories:
  - spring
tags:
  - Redis
  - springboot

author: 胡昊泽
---

```java
package com.xiaoze.exer.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisStringCommands;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.types.Expiration;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Component
public class BatchRunRedisUtil {


    @Autowired
    private StringRedisTemplate stringRedisTemplate;


    /**
     * 批量添加
     *
     * @param map
     */
    public void batchSet(Map<String, String> map) {
        stringRedisTemplate.opsForValue().multiSet(map);
    }


    /**
     * 批量添加 并且设置失效时间
     *
     * @param map
     * @param seconds
     */
    public void batchSetOrExpire(Map<String, String> map, Long seconds) {
        RedisSerializer<String> serializer = stringRedisTemplate.getStringSerializer();
        stringRedisTemplate.executePipelined(new RedisCallback<String>() {
            @Override
            public String doInRedis(RedisConnection connection) throws DataAccessException {
                map.forEach((key, value) -> {
                    connection.set(serializer.serialize(key), serializer.serialize(value), Expiration.seconds(seconds), RedisStringCommands.SetOption.UPSERT);
                });
                return null;
            }
        }, serializer);
    }


    /**
     * 批量获取
     *
     * @param list
     * @return
     */
    public List<Object> batchGet(List<String> list) {
        List<Object> objectList = Collections.singletonList(stringRedisTemplate.opsForValue().multiGet(list));
        return objectList;
    }


    /**
     * Redis批量Delete
     *
     * @param list
     */
    public void batchDelete(List<String> list) {
        stringRedisTemplate.delete(list);
    }

}
```