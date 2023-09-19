---
title: redis操作lua脚本
date: 2023-09-13
sidebar: auto
categories:
  - lua
tags:
  - lua
author: 胡昊泽
---

## 1：Java
```java
package com.hmdp.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hmdp.dto.Result;
import com.hmdp.entity.VoucherOrder;
import com.hmdp.mapper.VoucherOrderMapper;
import com.hmdp.service.ISeckillVoucherService;
import com.hmdp.service.IVoucherOrderService;
import com.hmdp.utils.RedisIdWorker;
import com.hmdp.utils.UserHolder;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.aop.framework.AopContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author 虎哥
 * @since 2021-12-22
 */
@Slf4j
@Service
public class VoucherOrderServiceImpl extends ServiceImpl<VoucherOrderMapper, VoucherOrder> implements IVoucherOrderService {

    @Autowired
    private ISeckillVoucherService seckillVoucherService;

    @Autowired
    private RedisIdWorker redisIdWorker;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    private RedissonClient redissonClient;

    //执行lua脚本得静态代码块.
    private static final DefaultRedisScript<Long> SECKILL_SCRIPT;

    static {
        SECKILL_SCRIPT = new DefaultRedisScript();
        SECKILL_SCRIPT.setLocation(new ClassPathResource("seckill.lua"));
        SECKILL_SCRIPT.setResultType(Long.class);
    }

    //创建阻塞队列，并初始化阻塞队列的大小
    private BlockingQueue<VoucherOrder> orderTasks = new ArrayBlockingQueue<>(1024 * 1024);

    /***
     * 创建线程池
     */
    private static final ExecutorService SECKILL_ORDER_EXECUTOR = Executors.newSingleThreadExecutor();

    private IVoucherOrderService proxy;

    /***
     * 标有 @PostConstruct 注解的方法，容器在 bean 创建完成并且属性赋值完成后，会调用该初始化方法。
     * 容器启动时，便开始创建独立线程，从队列中读取数据，创建订单
     */
    @PostConstruct

    private void init() {
        SECKILL_ORDER_EXECUTOR.submit(new VoucherOrderHandler());
    }

    //线程任务.
    private class VoucherOrderHandler implements Runnable {

        @Override
        public void run() {
            // 系统启动开始，便不断从阻塞队列中获取优惠券订单信息
            while (true) {
                try {
                    // 阻塞式获取订单信息
                    VoucherOrder voucherOrder = orderTasks.take();
                    createVoucherOrder(voucherOrder);
                } catch (Exception e) {
                    log.error("处理订单异常.");
                }
            }

        }
    }

    private void createVoucherOrder(VoucherOrder voucherOrder) {
        // 判断当前优惠券用户是否已经下过单
        // 用户 id
        Long userId = UserHolder.getUser().getId();
        Long voucherId = voucherOrder.getVoucherId();

        //创建锁对象
        RLock lock = redissonClient.getLock("lock:order:" + userId);
        // 获取互斥锁
        // 使用空参意味着不会进行重复尝试获取锁
        boolean isLock = lock.tryLock();
        if (!isLock) {
            // 获取锁失败，直接返回失败或者重试
            log.error("不允许重复下单！");
            return;
        }

        try {
            // 查询订单
            int count = query().eq("user_id", userId).eq("voucher_id", voucherId).count();
            if (count > 0) {
                log.error("不允许重复下单！");
                return;
            }

            // 扣减库存
            boolean success = seckillVoucherService.update().
                    setSql("stock = stock - 1").
                    eq("voucher_id", voucherId).
                    gt("stock", 0).
                    update();

            // 扣减失败
            if (!success) {
                log.error("库存不足！");
                return;
            }

            // 创建订单
            save(voucherOrder);
        } finally {
            // 释放锁
            lock.unlock();
        }
    }


    @Override
    public Result seckillVoucher(Long voucherId) {
        //获取用户
        Long userId = UserHolder.getUser().getId();
        //1.执行Lua脚本.
        Long result = stringRedisTemplate.execute(
                SECKILL_SCRIPT,
                Collections.emptyList(),
                voucherId.toString(), userId.toString()
        );

        // 2,判断结果是否为 0
        int r = result.intValue();
        if (r != 0) {
            // 2.1不为 0 ，代表没有购买资格
            Result.fail(r == 1 ? "库存不足！" : "不能重复下单!");
        }
        //2.2 为 0,则代表有购买资格,则把下单信息存入 阻塞队列 中.

        VoucherOrder voucherOrder = new VoucherOrder();
        // 生成订单 id
        Long orderId = redisIdWorker.nextId("order");
        voucherOrder.setVoucherId(voucherId);
        voucherOrder.setUserId(userId);
        voucherOrder.setId(orderId);
        //将订单信息放入阻塞队列中.
        orderTasks.add(voucherOrder);
        //获取代理对象
        proxy = (IVoucherOrderService) AopContext.currentProxy();
        return Result.ok(orderId);
    }

    // @Override
    // public Result seckillVoucher(Long voucherId) {
    //
    //     SeckillVoucher seckillVoucher = seckillVoucherService.getById(voucherId);
    //
    //     // 判断秒杀是否还未开始
    //     if (seckillVoucher.getBeginTime().isAfter(LocalDateTime.now())) {
    //         Result.fail("秒杀尚未开始！");
    //     }
    //
    //     // 判断秒杀是否已经结束
    //     if (seckillVoucher.getEndTime().isBefore(LocalDateTime.now())) {
    //         Result.fail("秒杀已经结束！");
    //     }
    //
    //     // 判断库存是否充足
    //     if (seckillVoucher.getStock() < 1) {
    //         Result.fail("库存不足！");
    //     }
    //
    //     return createVoucherOrder(voucherId);
    // }

//     @Transactional
//     public Result createVoucherOrder(Long voucherId) {
//         // 判断当前优惠券用户是否已经下过单
//         // 用户 id
//         Long userId = UserHolder.getUser().getId();
//
//         RLock lock = redissonClient.getLock("lock:order:" + userId);
//         // 获取互斥锁
//         // 使用空参意味着不会进行重复尝试获取锁
//         boolean isLock = lock.tryLock();
//         if (!isLock) {
//             // 获取锁失败，直接返回失败或者重试
//             return Result.fail("不允许重复下单！");
//         }
//
//
//         try {
//             // 查询订单
//             int count = query().eq("user_id", userId).eq("voucher_id", voucherId).count();
//             if (count > 0) {
//                 return Result.fail("用户已经购买过一次");
//             }
//
//             // 扣减库存
//             boolean success = seckillVoucherService.update().
//                     setSql("stock = stock - 1").
//                     eq("voucher_id", voucherId).
// //                eq("stock", seckillVoucher.getStock()).    // 增加对库存的判断，判断当前库存是否与查询出的结果一致
//         gt("stock", 0).        // 修改判断逻辑，改为只要库存大于0，就允许线程扣减
//                     update();
//
//             // 扣减失败
//             if (!success) {
//                 return Result.fail("库存不足！");
//             }
//
//             // 创建订单
//             VoucherOrder voucherOrder = new VoucherOrder();
//             // 生成订单 id
//             Long orderId = redisIdWorker.nextId("order");
//             voucherOrder.setVoucherId(voucherId);
//
//             voucherOrder.setUserId(userId);
//             voucherOrder.setId(orderId);
//             save(voucherOrder);
//
//             return Result.ok(orderId);
//         } finally {
//             // 释放锁
//             lock.unlock();
//         }
//
//     }
}
```
## 2：lua脚本
```lua
-- 1:参数列表
-- 1.1优惠券id
local voucherId = ARGV[1]
-- 1.2用户id
local userId = ARGV[2]

-- 2:数据key
-- 2.1 库存key  .. 相当于 + 拼接符  key 是优惠的业务名称加优惠券id  value 是优惠券的库存数
local stockKey = "seckill:stock:" .. voucherId
-- 2.2订单key  key 也是拼接的业务名称加优惠权id  而value是用户id， 这是一个set集合，凡购买该优惠券的用户都会将其id存入集合中
local orderKey = "seckill:order:" .. voucherId

-- 3:业务
-- 判断库存是否充足
if (tonumber(redis.call('get', stockKey)) <= 0) then
    -- 3.2 库存不足，返回1
    return 1
end

-- 判断用户是否已经下过单  sismember orderKey userId命令，判断当前key集合中，是否存在该value；返回1存在，0不存在
if (redis.call('sismember', orderKey, userId) == 1) then
    return 2
end

-- 扣减库存
redis.call('incrby', stockKey, -1)

-- 将 userId 存入当前优惠券的 set 集合
redis.call('sadd', orderKey, userId)

return 0
```