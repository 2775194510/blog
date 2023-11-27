---
title: 1：redisUtils快捷操作redis
date: 2023-11-27
sidebar: auto
categories:
  - spring
tags:
  - Redis
  - springboot

author: 胡昊泽
---

## 1：整合springboot

可参考该知识库  [springboot整合redis](https://hu-haoze.gitee.io/xiaoze-blog/blogs/%E5%B7%A5%E5%85%B7/spring/springboot/%E6%95%B4%E5%90%88%E4%B8%89%E6%96%B9/8%EF%BC%9Aspringboot%E6%95%B4%E5%90%88Redis.html#_1-maven)

## 2：工具类
```java
package com.xiaoze.exer.utils;

import com.xiaoze.exer.config.ApplicationContextHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * @author 小泽
 * @create 2023-09-02  16:49
 * 记得每天敲代码哦
 */
public class RedisUtils {
    private static final Logger log = LoggerFactory.getLogger(RedisUtils.class);

    private static RedisTemplate<String, Object> redisTemplate = (RedisTemplate) ApplicationContextHolder
            .getBean("stringRedisTemplate", StringRedisTemplate.class);

    /**
     * 设置有效时间
     *
     * @param key
     * @param timeout
     * @return
     */
    public static boolean expire(String key, long timeout) {
        return expire(key, timeout, TimeUnit.SECONDS);
    }

    /**
     * 设置有效时间
     *
     * @param key
     * @param timeout
     * @param unit
     * @return
     */
    public static boolean expire(String key, long timeout, TimeUnit unit) {
        Boolean ret = redisTemplate.expire(key, timeout, unit);
        return ret != null && ret;
    }

    /**
     * 根据key获取过期时间
     *
     * @param key
     * @return
     */
    public static long getExpire(String key) {
        return redisTemplate.getExpire(key, TimeUnit.SECONDS);
    }

    /**
     * 判断key是否存在
     *
     * @param key
     * @return
     */
    public static boolean hasKey(String key) {
        try {
            return redisTemplate.hasKey(key);
        } catch (Exception var2) {
            log.error("获取redis异常[{}]", var2.getMessage());
            return false;
        }
    }

    /**
     * 删除单个key
     *
     * @param key
     * @return
     */
    public static boolean del(String key) {
        Boolean ret = redisTemplate.delete(key);
        return ret != null && ret;
    }

    /**
     * 删除多个可以
     *
     * @param keys
     * @return
     */
    public static long del(Collection<String> keys) {
        Long ret = redisTemplate.delete(keys);
        return ret == null ? 0L : ret;
    }

    public static void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    /**
     * 分布式锁存入普通对象
     *
     * @param key
     * @param value
     */
    public static boolean setnx(String key, Object value) {
        return redisTemplate.opsForValue().setIfAbsent(key, value);
    }

    /**
     * 存入普通对象并设置过期时间
     *
     * @param key
     * @param value
     * @param timeout
     */
    public static void set(String key, Object value, long timeout) {
        redisTemplate.opsForValue().set(key, value, timeout, TimeUnit.SECONDS);
    }

    /**
     * 获取普通对象
     *
     * @param key
     * @return
     */
    public static Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    /**
     * 使变量中的键以double值的大小进行自增长
     *
     * @param key
     * @param delta
     * @return
     */
    public static long incr(String key, long delta) {
        if (delta < 0L) {
            throw new RuntimeException("递增因子必须大于0");
        } else {
            return redisTemplate.opsForValue().increment(key, delta);
        }
    }

    /**
     * 使变量中的键以double值的大小进行自减
     *
     * @param key
     * @param delta
     * @return
     */
    public static long decr(String key, long delta) {
        if (delta < 0L) {
            throw new RuntimeException("递减因子必须大于0");
        } else {
            return redisTemplate.opsForValue().increment(key, -delta);
        }
    }

    /**
     * 新增HashMap
     *
     * @param key   hashKey
     * @param hKey  mapKey
     * @param value mapValue
     */
    public static void hPut(String key, String hKey, Object value) {
        redisTemplate.opsForHash().put(key, hKey, value);
    }

    /**
     * 以map集合的形式添加键值对
     *
     * @param key    hashValue
     * @param values map集合
     */
    public static void hPutAll(String key, Map<String, Object> values) {
        redisTemplate.opsForHash().putAll(key, values);
    }

    /**
     * 如果hashKey存在，啥也不操作，如果hashKey不存在，则新增
     *
     * @param key   hashKey
     * @param hKey  mapKey
     * @param value mapValue
     */
    public static void hputIfAbsent(String key, String hKey, Object value) {
        redisTemplate.opsForHash().putIfAbsent(key, hKey, value);
    }

    /**
     * 获取变量中的键值对
     *
     * @param key hashKey
     * @return
     */
    public static Map<Object, Object> hEntries(String key) {
        Map<Object, Object> map = redisTemplate.opsForHash().entries(key);
        return map;
    }

    /**
     * 获取变量的长度
     *
     * @param key
     * @return
     */
    public static long hSize(String key) {
        long hashLength = redisTemplate.opsForHash().size(key);
        return hashLength;
    }

    /**
     * 获取变量中的指定map键是否有值,如果存在该map键则获取值，没有则返回null
     *
     * @param key  hashValue
     * @param hKey mapKey
     * @return
     */
    public static Object hGet(String key, String hKey) {
        return redisTemplate.opsForHash().get(key, hKey);
    }

    /**
     * 判断变量中是否有指定的map键
     *
     * @param key  hashValue
     * @param hKey mapKey值
     * @return
     */
    public static boolean hasKey(String key, String hKey) {
        try {
            return redisTemplate.opsForHash().hasKey(key, hKey);
        } catch (Exception var3) {
            log.error("获取redis异常[{}]", var3.getMessage());
            return false;
        }
    }

    /**
     * 删除变量中的键值对，可以传入多个参数，删除多个键值对
     *
     * @param key
     * @param values
     */
    public static void hdel(String key, Object... values) {
        redisTemplate.opsForHash().delete(key, values);
    }

    /**
     * 以集合的方式获取变量中的值。
     *
     * @param key
     * @param hKeys
     * @return
     */
    public static List<Object> hMultiGet(String key, Collection<Object> hKeys) {
        return redisTemplate.opsForHash().multiGet(key, hKeys);
    }

    /**
     * 往Set中存入数据
     *
     * @param key
     * @param values
     * @return
     */
    public static long sSet(String key, Object... values) {
        Long count = redisTemplate.opsForSet().add(key, values);
        return count == null ? 0L : count;
    }

    /**
     * 删除set集合中的数据
     *
     * @param key
     * @param values
     * @return
     */
    public static long sDel(String key, Object... values) {
        Long count = redisTemplate.opsForSet().remove(key, values);
        return count == null ? 0L : count;
    }

    /**
     * 获取set缓存的长度
     *
     * @param key
     * @return
     */
    public static long sGetSetSize(String key) {
        try {
            return redisTemplate.opsForSet().size(key);
        } catch (Exception var2) {
            var2.printStackTrace();
            return 0L;
        }
    }

    /**
     * 获取set集合中的信息
     *
     * @param key
     * @return
     */
    public static Set<Object> sGetSet(String key) {
        return redisTemplate.opsForSet().members(key);
    }

    /**
     * 获取set集合中的信息
     *
     * @param key
     * @return
     */
    public static Set<Object> hGetSet(String key) {
        return redisTemplate.opsForHash().keys(key);
    }

    /**
     * 往List中存入数据
     *
     * @param key
     * @param value
     * @return
     */
    public static long lPush(String key, Object value) {
        Long count = redisTemplate.opsForList().rightPush(key, value);
        return count == null ? 0L : count;
    }

    /**
     * 往List中存入多个数据
     *
     * @param key
     * @param values
     * @return
     */
    public static long lPushAll(String key, Collection<Object> values) {
        Long count = redisTemplate.opsForList().rightPushAll(key, values);
        return count == null ? 0L : count;
    }

    /**
     * 往List中存入多个数据
     *
     * @param key
     * @param values
     * @return
     */
    public static long lPushAll(String key, Object... values) {
        Long count = redisTemplate.opsForList().rightPushAll(key, values);
        return count == null ? 0L : count;
    }

    /**
     * 从List中获取begin到end之间的元素
     *
     * @param key
     * @param start
     * @param end
     * @return
     */
    public static List<Object> lGet(String key, int start, int end) {
        return redisTemplate.opsForList().range(key, (long) start, (long) end);
    }

    /**
     * 获取list缓存的长度
     *
     * @param key
     * @return
     */
    public static long lGetListSize(String key) {
        try {
            return redisTemplate.opsForList().size(key);
        } catch (Exception var2) {
            var2.printStackTrace();
            return 0L;
        }
    }

    /**
     * 通过索引获取list中的值
     *
     * @param key
     * @param index
     * @return
     */
    public static Object lGetIndex(String key, long index) {
        try {
            return redisTemplate.opsForList().index(key, index);
        } catch (Exception var4) {
            var4.printStackTrace();
            return null;
        }
    }

    /**
     * 根据索引修改list中的某条数据
     *
     * @param key
     * @param index
     * @param value
     * @return
     */
    public static boolean lUpdateIndex(String key, long index, Object value) {
        try {
            redisTemplate.opsForList().set(key, index, value);
            return true;
        } catch (Exception var5) {
            var5.printStackTrace();
            return false;
        }
    }

    /**
     * 移除N个值为value
     *
     * @param key
     * @param count
     * @param value
     * @return
     */
    public static long lRemove(String key, long count, Object value) {
        try {
            Long remove = redisTemplate.opsForList().remove(key, count, value);
            return remove;
        } catch (Exception var5) {
            var5.printStackTrace();
            return 0L;
        }
    }
}
```