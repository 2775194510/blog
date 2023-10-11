---
title: 2：CompletableFuture个人代码
date: 2023-10-11
categories:
  - juc
tags:
  - juc
---

## 1：FutureTaskTest
```java
package com.bilibili.juc;
import java.util.concurrent.FutureTask;
import java.util.concurrent.TimeUnit;

/**
 * @author 小泽
 * @create 2022-09-19  9:24
 * 记得每天敲代码哦
 */
public class FutureTaskTest {
    public static void main(String[] args) throws Exception {
        FutureTask<String> futureTask = new FutureTask<>(() -> {
            System.out.println("异步任务执行开始");
            TimeUnit.SECONDS.sleep(5);
            System.out.println("异步任务执行结束");
            return "执行完成！";
        });
        Thread t1 = new Thread(futureTask, "t1");
        t1.start();
        System.out.println("main函数");
        //1-------  System.out.println(futureTask.get(3,TimeUnit.SECONDS));//只愿意等3秒，过了3秒直接抛出异常
        //2-------更健壮的方式-------轮询方法---等副线程拿到才去get()
        //但是也会消耗cpu资源
        while (true) {
            if (futureTask.isDone()) {
                System.out.println(futureTask.get());
                break;
            } else {
                //暂停毫秒
                try {
                    TimeUnit.MILLISECONDS.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println("正在处理中------------正在处理中");
            }
        }
    }
}
```
## 2：CompletableFutureAPIDemo
```java
package com.bilibili.juc;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

public class CompletableFutureAPIDemo {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        CompletableFuture<String> uCompletableFuture = CompletableFuture.supplyAsync(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);//执行需要2秒
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "abc";
        });

        try {
            TimeUnit.SECONDS.sleep(1);//等待需要1秒
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
       // System.out.println(uCompletableFuture.getNow("xxx"));//执2-等1 返回xxx
        System.out.println(uCompletableFuture.complete("completeValue")+"\t"+uCompletableFuture.get());//执2-等1 返回true+备胎值completeValue
    }
}
```
## 3：CompletableFutureDemo2
```java
package com.bilibili.juc;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

//对计算结果进行处理
// thenApply 计算结果存在在依赖关系，使得线程串行化。因为依赖关系，所以一旦有异常，直接叫停。
public class CompletableFutureDemo2 {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        //当一个线程依赖另一个线程时用 thenApply 方法来把这两个线程串行化,
        CompletableFuture.supplyAsync(() -> {
            //暂停几秒钟线程
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("111");
            return 1024;
        }).thenApply(f -> {
            System.out.println("222");
            return f + 1;
        }).thenApply(f -> {
            //int age = 10/0; // 异常情况：那步出错就停在那步。
            System.out.println("333");
            return f + 1;
        }).whenCompleteAsync((v, e) -> {
            System.out.println("*****v: " + v);
        }).exceptionally(e -> {
            e.printStackTrace();
            return null;
        });

        System.out.println("-----主线程结束，END");

        // 主线程不要立刻结束，否则CompletableFuture默认使用的线程池会立刻关闭:
        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
//-----正常情况
//111
//222
//333
//----计算结果： 6

//-----异常情况
//111
//异常.....
```

## 4：CompletableFutureNoVoid
```java
package com.bilibili.juc;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

/**
 * @author 小泽
 * @create 2022-09-19  9:17
 * 记得每天敲代码哦
 */
public class CompletableFutureNoVoid {
    public static void main(String[] args) {
        /**
         * 方法描述:
         * @Author 胡昊泽
         * @Date 2022/9/16 14:54
         * @param :
         * @return void 无返回值的
         */

        CompletableFuture<Void> completableFuture = CompletableFuture.runAsync(() -> {
            System.out.println(Thread.currentThread().getName());
            try {
                TimeUnit.SECONDS.sleep(5);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        try {
            System.out.println(completableFuture.get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }


}
```
## 5：CompletableFuturHasVoid
```java
package com.bilibili.juc;

import java.util.concurrent.*;

/**
 * @author 小泽
 * @create 2022-09-19  9:17
 * 记得每天敲代码哦
 */
public class CompletableFuturHasVoid {
    public static void main(String[] args) {

        /**
         * 方法描述:
         * @Author 胡昊泽
         * @Date 2022/9/16 14:54
         * @param :
         * @return void 有返回值的
         */

        ExecutorService executorService = Executors.newFixedThreadPool(3);
        CompletableFuture<String> supplyAsync = CompletableFuture.supplyAsync(() -> {
            System.out.println(Thread.currentThread().getName());
            try {
                TimeUnit.SECONDS.sleep(5);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return "hello,supplyAsync";
        }, executorService);
        try {
            System.out.println(supplyAsync.get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        executorService.shutdown();
    }

}
```
## 6：CompletableFutureHighUser
```java
package com.bilibili.juc;

import java.util.concurrent.*;
import java.util.stream.IntStream;

/**
 * @author 小泽
 * @create 2022-09-19  9:17
 * 记得每天敲代码哦
 */
public class CompletableFutureHighUser {
    public static void main(String[] args) {
         // ThreadLocalRandom.current().ints( 1,6).forEach(System.out::println);
        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        CompletableFuture.supplyAsync(() -> {
            System.out.println(Thread.currentThread().getName() + "--------副线程come in");
            int result = ThreadLocalRandom.current().nextInt(10);//产生随机数
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("-----结果---异常判断值---" + result);
            //---------------------异常情况的演示--------------------------------------
            // if (result > 2) {
            //     int i = 10 / 0;//我们主动的给一个异常情况
            // }
            //------------------------------------------------------------------
            return result;
        }, threadPool).whenComplete((v, e) -> {//没有异常,v是值，e是异常
            if (e == null) {
                System.out.println("------------------计算完成，更新系统updataValue" + v);
            }
        }).exceptionally(e -> {//有异常的情况
            e.printStackTrace();
            System.out.println("异常情况" + e.getCause() + "\t" + e.getMessage());
            return null;
        });

        //线程不要立刻结束，否则CompletableFuture默认使用的线程池会立刻关闭：暂停3秒钟线程
        System.out.println(Thread.currentThread().getName() + "线程先去忙其他任务");
        // try {
        //     TimeUnit.SECONDS.sleep(3);
        // } catch (InterruptedException e) {
        //     e.printStackTrace();
        // }
        threadPool.shutdown();
    }
}
```
## 7：CompletableFinallyDemo
```java
package com.bilibili.juc;

import jdk.nashorn.internal.objects.annotations.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * @author 小泽
 * @create 2022-09-19  11:15
 * 记得每天敲代码哦
 */
public class CompletableFinallyDemo {
    static List<NetMall> list = Arrays.asList(
            new NetMall("jd"),
            new NetMall("dangdang"),
            new NetMall("taobao")
    );

    public static List<String> getPrice(List<NetMall> list, String productName) {
        return list
                .stream() //----流式计算做了映射（利用map），希望出来的是有格式的字符串（利用String.format）,%是占位符
                .map(netMall -> String.format(productName + " in %s price is %.2f",
                        netMall.getNetMallName(),//第一个%
                        netMall.calcPrice(productName))).collect(Collectors.toList());//第二个%
    }

    //从功能到性能
    public static List<String> getPricesByCompletableFuture(List<NetMall> list, String productName) {
        return list.stream().map(netMall ->
                CompletableFuture.supplyAsync(() -> String.format(productName + " in %s price is %.2f",
                        netMall.getNetMallName(),
                        netMall.calcPrice(productName))))//Stream<CompletableFuture<String>>
                .collect(Collectors.toList())//List<CompletablFuture<String>>
                .stream()//Stream<CompletableFuture<String>
                .map(s -> s.join())//Stream<String>
                .collect(Collectors.toList());
    }

    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();
        List<String> list1 = getPrice(list, "mysql");
        for (String element : list1) {
            System.out.println(element);
        }
        long endTime = System.currentTimeMillis();
        System.out.println("--普通版----当前操作花费时间----costTime:" + (endTime - startTime) + "毫秒");

        System.out.println("------------------------------分割----------------------");

        startTime = System.currentTimeMillis();
        List<String> list2 = getPricesByCompletableFuture(list, "mysql");
        for (String element : list2) {
            System.out.println(element);
        }
        endTime = System.currentTimeMillis();
        System.out.println("--性能版-当前操作花费时间----costTime:" + (endTime - startTime) + "毫秒");
    }
}

class NetMall {
    private String netMallName;

    public NetMall(String netMallName) {
        this.netMallName = netMallName;
    }

    public double calcPrice(String productName) {
        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return ThreadLocalRandom.current().nextDouble() * 2 + productName.charAt(0);//用这句话来模拟价格
    }

    public String getNetMallName() {
        return netMallName;
    }
}
//mysql in jd price is 109.49
//mysql in dangdang price is 110.85
//mysql in taobao price is 110.32
//--普通版----当前操作花费时间----costTime:3124毫秒
//------------------------------分割----------------------
//mysql in jd price is 109.34
//mysql in dangdang price is 109.02
//mysql in taobao price is 110.37
//--性能版-当前操作花费时间----costTime:1000毫秒
```