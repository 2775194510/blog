---
title: 9：聊聊ThreadLocal
date: 2023-10-12
categories:
  - juc
tags:
  - juc
---

## 1：ThreadLocal简介
### 1）恶心的大厂面试题
- `ThreadLocal` 中 `ThreadLocalMap` 的数据结构和关系？
- `ThreadLocal` 的key是弱引用，这是为什么？
- `ThreadLocal` 内存泄漏问题你知道吗？
- `ThreadLocal` 中最后为什么要加 `remove` 方法？
### 2）是什么
`ThreadLocal`提供 **线程局部变量** 。这些变量与正常的变量不同，因为每一个线程在访问`ThreadLocal` 实例的时候（通过其get或set方法） **都有自己的、独立初始化的变量副本**。 ThreadLocal实例通常是类中的 **私有静态字段** ，使用它的目的是希望将状态（例如，用户ID或事务ID）与线程关联起来。

### 3）能干嘛

实现 **每一个线程都有自己专属的本地变量副本** (自己用自己的变量不麻烦别人，不和其他人共享，人人有份，人各一份)，

主要解决了 **让每个线程绑定自己的值，通过使用get()和set()方法，获取默认值或将其值更改为当前线程所存的副本的值** 从而避免了线程安全问题。
![Alt text](./assets/image94.png)
![Alt text](./assets/image95.png)
### 4）api介绍
![Alt text](./assets/image96.png)
### 5）永远都helloworld讲起
#### 需求
> 5个销售卖房子，集团高层只关心销售总量的准确统计数，按照总销售额统计，方便集团公司发奖金

群雄逐鹿起纷争—为了数据安全只能加锁
```java
//代码样例

class House{
    int saleCount = 0;
    public synchronized void saleHouse(){
        ++ saleCount;
    }
}

public class ThreadLocalDemo {
    public static void main(String[] args) {
        House house = new House();
        for(int i = 1;i <= 5;i ++){
            new Thread(()->{
                int size = new Random().nextInt(5) + 1;
                System.out.println(size);
                for(int j = 1;j <= size;j ++){
                    house.saleHouse();
                }
            },String.valueOf(i)).start();
        }

        try {
            TimeUnit.MILLISECONDS.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(Thread.currentThread().getName()+"\t"+"共计卖出多少套："+ house.saleCount);
    }
}
//2
//3
//1
//5
//4
//main  共计卖出多少套：15

``` 
#### 需求变化了
- 希望各自分灶吃饭，各凭销售本事提成，按照出单数各自统计
  - 比如某房产中介销售都有自己的销售额指标，自己专属于自己的，不和别人掺和
正好对应了前面的【每个线程都有自己专属的本地变量副本】
#### 上述需求该如何处理
- 利用 `ThreadLocal`
- 先 `初始化` ，给个0值
- 利用 `set get` 方法
- ------注意，也要调用 `remove（）` 接口，不然容易导致内存泄漏
  - 阿里巴巴手册：必须回收自定义的 `ThreadLocal` 变量，尤其在 **线程池场景** 下，线程经常会被复用，如果不清理自定义的 `ThreadLocal` 变量，可能会影像后序业务逻辑和造成内存泄露等问题。尽量在代理中使用 `try-finally` 块进行回收。

```java
//Demo1
class House{
    int saleCount = 0;
    public synchronized void saleHouse(){
        ++ saleCount;
    }
    
//两个都是创建一个线程局部变量并返回初始值
    /**
     * 一个比较老式的写法（这个阿里巴巴手册里也也有），initialValue()这个api已经淘汰了
     */
    /*ThreadLocal<Integer> saleVolume =  new ThreadLocal<Integer>(){
        @Override
        protected Integer initialValue(){
            return 0;
        }
    };*/
//java8之后带来的新写法
    ThreadLocal<Integer> saleVolume = ThreadLocal.withInitial(() -> 0);//withInitial当前常被用来初始化
    
    public void saleVolumeByThreadLocal(){
        saleVolume.set(1+saleVolume.get());
    }
}

public class ThreadLocalDemo {
    public static void main(String[] args) {
        House house = new House();
        for(int i = 1;i <= 5;i ++){
            new Thread(()->{
                int size = new Random().nextInt(5) + 1;
                for(int j = 1;j <= size;j ++){
                    house.saleHouse();
                    house.saleVolumeByThreadLocal();
                }
                System.out.println(Thread.currentThread().getName()+"\t"+"号销售卖出："+house.saleVolume.get());
            },String.valueOf(i)).start();
        }

        try {
            TimeUnit.MILLISECONDS.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(Thread.currentThread().getName()+"\t"+"共计卖出多少套："+ house.saleCount);
    }
}
//人手一份，不用加锁也可以实现上述需求
//3  号销售卖出：3
//2  号销售卖出：2
//4  号销售卖出：3
//1  号销售卖出：2
//5  号销售卖出：1
//main  共计卖出多少套：11
```

```java
//Demo2-主要演示线程池情况下，线程池中的线程会复用(不会自动清空)，而上面的都是新建一个Thread
class MyData{
    ThreadLocal<Integer> threadLocalField = ThreadLocal.withInitial(() -> 0);
    public void add(){
        threadLocalField.set(1+ threadLocalField.get());
    }
}

/**
 * 根据阿里规范，需要对自定义的ThreadLocal进行回收，否则容易造成内存泄漏和业务逻辑问题(因为线程池中的线程会复用)
 */
public class ThreadLocalDemo2 {
    public static void main(String[] args) {
        MyData myData = new MyData();
        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        try {
            for(int i = 0;i < 10;i ++){
                threadPool.submit(()->{
                    try {
                        Integer beforeInt = myData.threadLocalField.get();
                        myData.add();
                        Integer afterInt = myData.threadLocalField.get();
                        System.out.println(Thread.currentThread().getName()+"\t"+"beforeInt"+beforeInt+"\t afterInt"+afterInt);
                    } finally {
                        myData.threadLocalField.remove();
                    }
                });
            }
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            threadPool.shutdown();
        }
    }
}
//没有remove---出现了累积
//pool-1-thread-1  beforeInt0   afterInt1
//pool-1-thread-3  beforeInt0   afterInt1
//pool-1-thread-2  beforeInt0   afterInt1
//pool-1-thread-2  beforeInt1   afterInt2
//pool-1-thread-2  beforeInt2   afterInt3
//pool-1-thread-2  beforeInt3   afterInt4
//pool-1-thread-2  beforeInt4   afterInt5
//pool-1-thread-2  beforeInt5   afterInt6
//pool-1-thread-3  beforeInt1   afterInt2
//pool-1-thread-1  beforeInt1   afterInt2
//有remove-不会出现累积的情况
//pool-1-thread-1  beforeInt0   afterInt1
//pool-1-thread-3  beforeInt0   afterInt1
//pool-1-thread-2  beforeInt0   afterInt1
//pool-1-thread-1  beforeInt0   afterInt1
//pool-1-thread-3  beforeInt0   afterInt1
//pool-1-thread-1  beforeInt0   afterInt1
//pool-1-thread-2  beforeInt0   afterInt1
//pool-1-thread-1  beforeInt0   afterInt1
//pool-1-thread-3  beforeInt0   afterInt1
//pool-1-thread-2  beforeInt0   afterInt1

```
### 6）通过上面代码总结
- 因为每个 `Thread` 内有 **自己的实例副本** 并且 **该副本只由当前线程自己使用**
- 既然其他 `Thread` 不可访问，那就 **不存在多线程间共享的问题**。
- 统一设置初始值，但是每个线程对这个值的修改都是各自线程相互独立的
- 一句话
  - 如何才能不争抢
    - 假如 `synchronized` 或者 `Lock` 控制资源的访问顺序
    - 利用 `ThreadLocal` 人手一份，大家各自安好，没必要抢夺


## 2：ThreadLocal源码分析
### 1）源码解读
### 2）Thread，ThreadLocal，ThreadLocalMap关系
- 根据官方API，`Thread` 是程序中执行的线程；`ThreadLocal` 类提供线程局部变量。
- 先打开 `Thread.java` 类，发现每个Thread类里面有一个 `ThreadLocal` 类

![Alt text](./assets/image97.png)
- 而 `ThreadLocalMap` 是 `ThreadLocal` 的一个静态内部类
![Alt text](./assets/image98.png)
- All三者总概括脑图
![Alt text](./assets/image99.png)
`threadLocalMap` 实际上就是一个以 `threadLocal` 实例为 `key` ，任意对象为 `value` 的`Entry` 对象。
当我们为 `threadLocal` 变量赋值，实际上就是以当前 `threadLocal` 实例为 `key`，值为 `value` 的 `Entry` 往这个 `threadLocalMap` 中存放
![Alt text](./assets/image100.png)
### 3）小总结
近似可以理解为:
`ThreadLocalMap` 从字面上就可以看出这是一个保存 `ThreadLocal` 对象的 `map` (其实是以`ThreadLocal` 为Key)，不过是经过了两层包装的 `ThreadLocal` 对象：（两层包装可以看下面的解释）
![Alt text](./assets/image101.png)

JVM内部维护了一个线程版的Map\<Thread,T\> 通过 `ThreadLocal` 对象的 `set` 方法，结果把`ThreadLocal` 对象自己当做key，放进了 `ThreadLoalMap` 中,每个线程要用到这个T的时候，用当前的线程去 `Map` 里面获取，通过这样让每个线程都拥有了自己独立的变量，人手一份，竞争条件被彻底消除，在并发模式下是绝对安全的变量。

## 3：ThreadLocal内存泄漏问题-非常重要

### 1）从阿里面试题开始讲起
![Alt text](./assets/image102.png)
> 看着阿里规范，引出三个问题
- 什么是内存泄露?
- 为什么要用弱引用？
- 不用如何？
### 2）什么是内存泄露

不再会被使用的对象或者变量占用的内存不能被回收，就是 **内存泄露**

### 3）谁惹的祸
#### why?
再回首 `ThreadLocalMap`
![Alt text](./assets/image103.png)
- `ThreadLocalMap` 从字面上就可以看出这是一个保存 `ThreadlLocal` 对象的 `map`(以ThreadLocal为Key，不过是经过了两层包装的 ThreadLocal对象)：
  - （1）第一层包装是使用 WeakReference<ThreadLocal<?>> 将ThreadLocal对象变成一个弱引用的对象。
  - （2）第二层包裝是定义了一个专门的类 Entry 来扩展 WeakReference<ThreadLocals?>>。

#### 强引用，软引用，弱引用分别是什么？
##### 整体架构
Java技术允许使用 `finalize()` 方法在垃圾收集器将对象从内存中清除出去之前做必要的清理工作。

官方API: `finalize()` 的通常目的是在对象被不可撤销地丢弃之前执行清理操作。

（我自己理解，某个对象被干掉前还会调用finalize()清理一下）

- Reference是强引用
- SoftReference是软引用
- WeakReference是弱引用
- PhantomReference是虚引用
![Alt text](./assets/image104.png)
新建一个待 `finalize()` 方法的对象 `MyObject`
```java
class MyObject{
    @Override
    protected void finalize() throws Throwable{
        //finalize的通常目的是在对象被不可撤销的丢弃之前进行清理操作
        System.out.println("finalize()被调用-------invoke finalize");
    }
}
```
> 强引用（默认支持模式）

- 当内存不足，JVM开始垃圾回收，对于 **强引用** 的对象，就算是出现了OOM也不会对该对象进行回收， **死都不收**。

- 强引用是我们最常见的普通对象引用，只要还有强引用指向一个对象，就能表明对象还“活着”，垃圾收集器不会碰这种对象。在 Java 中最常见的就是强引用，把一个对象赋给一个引用变量，这个引用变量就是一个强引用。当一个对象被强引用变量引用时，它处于可达状态，它是不可能被垃圾回收机制回收的，即使该对象以后永远都不会被用到JVM也不会回收。因此强引用是造成Java内存泄漏的主要原因之一。

- 对于一个普通的对象，如果没有其他的引用关系，只要超过了引用的作用域或者显式地将相应（强）引用赋值为 null，一般认为就是 **可以被垃圾收集的了** (当然具体回收时机还是要看垃圾收集策略)。

```java
public class referenceDemo {
    public static void main(String[] args) {
        MyObject myObject = new MyObject();
        System.out.println("gc before"+myObject);

        myObject = null;//new 一个对象是一个强引用，如果不把他指为null，垃圾回收回收不了他
        System.gc();//人工开启gc 一般不用

        System.out.println("gc after "+myObject);
    }
}
//gc beforecom.zhang.admin.controller.MyObject@2f4d3709
//gc after null
//finalize()被调用-------invoke finalize      -------这不就是在对象丢弃之前进行一个清理操作，这里确实清理了

```
> 软引用

软引用是一种相对强引用弱化了一些的引用，需要用 `java.lang.ref.SoftReference` 类来实现，可以让对象豁免一些垃圾收集。

对于只有软引用的对象来说，
- 当系统内存充足时它 **不会** 被回收，
- 当系统内存不足时它 **会** 被回收。

软引用通常用在对内存敏感的程序中，比如高速缓存就有用到软引用，内存够用的时候就保留，不够用就回收！

- 先调整一下内存配置
![Alt text](./assets/image105.png)

```java
public class referenceDemo {
    public static void main(String[] args) {
        SoftReference<MyObject> softReference = new SoftReference<>(new MyObject());
        System.gc();
        try {TimeUnit.SECONDS.sleep(1);} catch (InterruptedException e) {e.printStackTrace();}
        System.out.println("-------gc after内存够用"+softReference.get());

        try {
            byte[] bytes = new byte[20 * 1024 * 1024];
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            System.out.println("---------gc after内存不够"+softReference.get());
        }
    }
}
//-------gc after内存够用com.zhang.admin.controller.MyObject@2f4d3709
//---------gc after内存不够null，（因为是软引用，在内存不足时被清理了）
//finalize()被调用-------invoke finalize
//Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
//  at com.zhang.admin.controller.referenceDemo.main(referenceDemo.java:22)
```

> 弱引用

**弱引用** 需要用 `java.lang.ref.WeakReference` 类来实现，它比软引用的生存期更短，

对于只有弱引用的对象来说，只要垃圾回收机制一运行，不管JVM的内存空间是否足够，都会回收该对象占用的内存。
```java
public class referenceDemo {
    public static void main(String[] args) {
        WeakReference<MyObject> weakReference = new WeakReference<>(new MyObject());
        System.out.println("-----gc before 内存够用 "+ weakReference.get());

        System.gc();
        try {TimeUnit.SECONDS.sleep(1);} catch (InterruptedException e) {e.printStackTrace();}
        //暂停几秒钟线程
        System.out.println("----gc after内存够用 "+weakReference.get());
    }
}
//-----gc before 内存够用 com.zhang.admin.controller.MyObject@2f4d3709
//finalize()被调用-------invoke finalize
//----gc after内存够用 null ------- (不管怎么样都会清楚，这即是弱引用)
``` 
- 适用场景
假如有一个应用需要读取大量的本地图片:
- 如果每次读取图片都从硬盘读取则会严重影响性能,
- 如果一次性全部加载到内存中又可能造成内存溢出。

此时使用 **软引用** 可以解决这个问题。

> 设计思路是：用一个HashMap来保存图片的路径和相应图片对象关联的软引用之间的映射关系，在内存不足时，JVM会自动回收这些缓存图片对象所占用的空间，从而有效地避免了OOM的问题。

`Map<String, SoftReference<Bitmap>> imageCache = new HashMap<String, SoftReference<Bitmap>>();`

>  虚引用 

> 定义

- 虚引用必须和引用队列 (ReferenceQueue)**联合使用
虚引用需要java.lang.ret.PhantomReterence类来实现,顾名思义， 就是形同虚设**，与其他几种引用都不同，虚引用并不会决定对象的生命周期。如果一个对象仅持有院引用，那么它就和没有任何引用一样，在任何时候都可能被垃圾回收器回收，它不能单独使用也不能通过它访问对象，虚引用必须和引用队列(ReferenceQueue)联合使用。

- PhantomReference的get方法总是返回null
虚引用的主要作用是跟踪对象被垃圾回收的状态。仅仅是提供了一和确保对象被 finalize以后，做某些事情的通知机制。
PhantomReference的get方法总是返回null，因此无法访问对应的引用对象。

- **处理监控通知使用**
换句话说，设置虚引用关联对象的唯一目的，就是在这个对象被收集器回收的时候收到一个系统通知或者后续添加进一步的处理，用来实现比finalize机制更灵活的回收操作。

- 构造方法
![Alt text](./assets/image106.png)
- 引用队列
我被回收前需要被 **引用队列** 保存下
![Alt text](./assets/image107.png)
- case

记得先给设置成 `-Xms10m -Xmx10m`
```java
class MyObject{
    @Override
    protected void finalize() throws Throwable{
        //finalize的通常目的是在对象被不可撤销的丢弃之前进行清理操作
        System.out.println("finalize()被调用-------invoke finalize");
    }
}

public class referenceDemo {
    public static void main(String[] args) {
        MyObject myObject = new MyObject();
        ReferenceQueue<MyObject> referenceQueue = new ReferenceQueue<>();
        PhantomReference<MyObject> phantomReference = new PhantomReference<>(myObject, referenceQueue);
       // System.out.println(phantomReference.get());//这里就是个null--虚引用的get()就是null

        List<byte[]> list = new ArrayList<>();

        new Thread(() -> {
            while (true)//模拟一个无限循环
            {
                list.add(new byte[1 * 1024 * 1024]);
                try { TimeUnit.MILLISECONDS.sleep(600); } catch (InterruptedException e) { e.printStackTrace(); }
                System.out.println(phantomReference.get());
            }
        },"t1").start();

        new Thread(() -> {
            while (true)
            {
                Reference<? extends MyObject> reference = referenceQueue.poll();
                if (reference != null) {
                    System.out.println("有虚对象加入队列了");
                }
            }
        },"t2").start();

    }
}
//null
//finalize()被调用-------invoke finalize
//null
//null
//null
//null
//null
//有虚对象加入队列了  ------(说明被干掉之后进入了这个引用队列)
//Exception in thread "t1" java.lang.OutOfMemoryError: Java heap space
//  at com.zhang.admin.controller.referenceDemo.lambda$main$0(referenceDemo.java:30)
//  at com.zhang.admin.controller.referenceDemo$$Lambda$1/1108411398.run(Unknown Source)
//  at java.lang.Thread.run(Thread.java:748)


```
##### GCRoots和四大引用小总结
![Alt text](./assets/image108.png)
#### 关系
![Alt text](./assets/image109.png)
- 每个 `Thread` 对象维护着一个 `ThreadLocalMap` 的引用
- `ThreadLocalMap` 是 `ThreadLocal` 的内部类，用 `Entry` 来进行存储
- 调用 `ThreadLocal` 的 `set()` 方法时，实际上就是往 `ThreadLocalMap` 设置值，key是`ThreadLocal` 对象，值Value是传递进来的对象
- 调用 `ThreadLocal` 的 `get()` 方法时，实际上就是往 `ThreadLocalMap` 获取值，key是`ThreadLocal` 对象
- `ThreadLocal` 本身并不存储值，它只是自己作为一个key来让线程从 `ThreadLocalMap` 获取value，正因为这个原理，所以 `ThreadLocal` 能够实现“数据隔离”，获取 **当前线程的局部变量值**，不受其他线程影响

### 4）为什么要用弱引用？不用如何？
#### 为什么源代码用弱引用?
（Entry类似于key-value键值对）
![Alt text](./assets/image110.png)
> 为什么源代码用弱引用?

- 当 `function01` 方法执行完毕后，栈帧销毁 **强引用 tl**  也就没有了。但此时线程的`ThreadLocalMap` 里某个 `entry` 的 `key` 引用还指向这个对象
- 若这个key引用是 **强引用**，就会导致key指向的 `ThreadLocal` 对象及 `v指向的对象` 不能被gc回收，造成内存泄漏；
- 若这个key引用是 **弱引用** ，就大概率会减少内存泄漏的问题(还有一个key为null的雷，后面讲)。使用弱引用，就可以使 `ThreadLocal` 对象在方法执行完毕后顺利被回收且Entry的key引用指向为null。

#### 弱引用就万事大吉了吗？
**埋雷二号坑**
- 其实主要就是线程池线程复用情况下的问题
![Alt text](./assets/image111.png)
- 当我们为 `threadLocal` 变量赋值，实际上就是当前的 `Entry(threadLocal实例为key，值为value)` 往这个 `threadLocalMap` 中存放。Entry中的key是弱引用，当 `threadLocal` 外部强引用被置为null(tl=null),那么系统 GC 的时候，根据可达性分析，这个 `threadLocal` 实例就没有任何一条链路能够引用到它，这个 `ThreadLocal` 势必会被回收，这样一来，`ThreadLocalMap` 中就会出现key为null的Entry，就没有办法访问这些key为null的Entry的value，如果当前线程再迟迟不结束的话（这个tl就不会被干掉），这些key为null的Entry的value就会一直存在一条强引用链：`Thread Ref -> Thread -> ThreaLocalMap -> Entry -> value`永远无法回收，造成内存泄漏。
- 当然，如果当前thread运行结束，`threadLocal`，`threadLocalMap`,`Entry`没有引用链可达，在垃圾回收的时候都会被系统进行回收。
- 但在实际使用中我们有时候会用线程池去维护我们的线程，比如在 `Executors.newFixedThreadPool()` 时创建线程的时候，为了复用线程是不会结束的，所以 `threadLocal`内存泄漏就值得我们小心

> key为null的entry，原理解析

> 结论：在不使用某个ThreadLocal对象后，手动调用remove方法来删除它（尤其是防止线程池下的复用）

`ThreadLocalMap``使用 `ThreadLocal` 的弱引用作为key，如果一个 `ThreadLocal` 没有外部强引用引用他，那么系统gc的时候，这个 `ThreadLocal` 势必会被回收，这样一来，`ThreadLocalMap` 中就会出现key为null的Entry，就没有办法访问这些key为null的Entry的value，如果当前线程再迟迟不结束的话(比如正好用在线程池)，这些key为null的Entry的value就会一直存在一条强引用链。

虽然弱引用，保证了key指向的ThreadLocal对象能被及时回收，但是v指向的value对象是需要ThreadLocalMap调用get、set时发现key为null时才会去回收整个entry、value，因此弱引用不能100%保证内存不泄露。 **我们要在不使用某个ThreadLocal对象后，手动调用​方法来删除它** ，尤其是在线程池中，不仅仅是内存泄露的问题，因为线程池中的线程是重复使用的，意味着这个线程的ThreadLocalMap对象也是重复使用的，如果我们不手动调用remove方法，那么后面的线程就有可能获取到上个线程遗留下来的value值，造成bug。

**set、get方法会去检查所有键为null的Entry对象**

> 这些方法都对key== null 也就是脏Entry进行了处理，防止内存泄漏

- `expungeStaleEntry`（清楚 `ThreadLocal` 中的 `脏Entry` 的意思）
- `set()`
- `get()`
- `remove()`

#### 结论
从前面的 `set`,`getEntry`,`remove`方法看出，在`threadLocal`的生命周期里，针对`threadLocal`存在的内存泄漏的问题，都会通过 `expungeStaleEntry`，`cleanSomeSlots`,`replaceStaleEntry` 这三个方法清理掉 `key为null的脏entry`。

### 5）最佳实践
- 一定要进行初始化避免空指针问题ThreadLocal.withInitial(()- > 初始化值);
- 建议把ThreadLocal修饰为static
- 用完记得手动remove

## 4：小总结
- `ThreadLocal` 并 **不解决线程间共享数据的问题** 
- `ThreadLocal` 适用于变量在线程间隔离且在方法间共享的场景
- `ThreadLocal` 通过隐式的在不同线程内创建独立实例副本避免了实例线程安全的问题
- 每个线程持有一个只属于自己的专属Map并维护了 `ThreadLocal` 对象与具体实例的映射，该Map由于只被持有它的线程访问，故不存在线程安全以及锁的问题
- `ThreadLocalMap` 的Entry对 `ThreadLocal` 的引用为 **弱引用** ，避免了 `ThreadLocal` 对象无法被回收的问题都会通过 `expungeStaleEntry`, `cleanSome Slots`,`replaceStaleEntry` 这三个方法回收键为 null 的 Entry对家的值（即为具体实例）以及 Entry 对象本身 **从而防止内存证漏**，属手安全加固的方法
- 群雄逐鹿起纷争，人各一份天下安

