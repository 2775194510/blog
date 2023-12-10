---
title: 2：Flink快速上手
date: 2023-12-09
sidebar: auto
categories:
  - Flink
tags:
  - Flink
  - 大数据
---

## 1：创建项目

就是创建一个普通的 `maven` 项目，没什么好说的

### 1）添加项目依赖
在项目的 `pom` 文件中，添加 `Flink` 的依赖，包括 `flink-java`、`flink-streaming-java`，以及 `flink-clients`（客户端，也可以省略）。
```xml
    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <flink.version>1.17.0</flink.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-streaming-java</artifactId>
            <version>${flink.version}</version>
        </dependency>

        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-clients</artifactId>
            <version>${flink.version}</version>
        </dependency>
    </dependencies>
```

## 2：WordCount代码编写

>  `需求` ：统计一段文字中，每个单词出现的频次。(该文字在一个文件中)

> `环境准备` ：在 `src/main/java` 目录下，新建一个包，命名为 `com.xiaoze.wc` 。


### 1）批处理

`批处理基本思路`：先逐行读入文件数据，然后将每一行文字拆分成单词；接着按照单词分组，统计每组数据的个数，就是对应单词的频次。

#### 数据准备
- （1）在工程根目录下新建一个 `input` 文件夹，并在下面创建文本文件 `words.txt`
- （2）在 `words.txt` 中输入一些文字，例如：

:::warning 数据
hello flink  
hello world  
hello java  
:::

#### 代码编写

（1）在 `com.xiaoze.wc` 包下新建Java类 `WordCountBatchDemo` ，在静态main方法中编写代码。具体代码实现如下：
```java
package com.xiaoze.wc;

import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.java.ExecutionEnvironment;
import org.apache.flink.api.java.operators.AggregateOperator;
import org.apache.flink.api.java.operators.DataSource;
import org.apache.flink.api.java.operators.FlatMapOperator;
import org.apache.flink.api.java.operators.UnsortedGrouping;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.util.Collector;

/**
 * @author 小泽
 * @create 2023-12-02  23:42
 * 记得每天敲代码哦
 */
public class WordCountBatchDemo {

    public static void main(String[] args) throws Exception {
        // TODO 1. 创建执行环境
        ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();

        // TODO 2.读取数据：从文件中读取
        DataSource<String> lineDS = env.readTextFile("input/word.txt");

        // TODO 3.切分、转换 （word，1）
        FlatMapOperator<String, Tuple2<String, Integer>> wordAndOne = lineDS.flatMap(new FlatMapFunction<String, Tuple2<String, Integer>>() {
            @Override
            public void flatMap(String value, Collector<Tuple2<String, Integer>> out) throws Exception {
                // TODO 3.1 按照 空格 切分单词
                String[] words = value.split(" ");
                // TODO 3.2 将 单词 转换为 （word，1）
                for (String word : words) {
                    Tuple2<String, Integer> wordTuple2 = Tuple2.of(word, 1);
                    //TODO 3.3 使用 Collector 向下游发送数据
                    out.collect(wordTuple2);
                }
            }
        });

        // TODO 4.按照 word 分组
        UnsortedGrouping<Tuple2<String, Integer>> wordAndOneGroupby = wordAndOne.groupBy(0);

        // TODO 5.各分组内聚合
        AggregateOperator<Tuple2<String, Integer>> sum = wordAndOneGroupby.sum(1); // 1是位置，表示第二个元素

        // TODO 6.输出
        sum.print();

    }
}

```

（2）输出
:::warning 结果
(flink,1)  
(world,1)  
(hello,3)  
(java,1)  
:::

**需要注意的是** ，这种代码的实现方式，是基于 `DataSet API` 的，也就是我们对数据的处理转换，是看作 `数据集` 来进行操作的。事实上Flink本身是 `流批统一的处理架构` ， `批量的数据集`本质上也是 `流`，没有必要用两套不同的API来实现。所以从 `Flink 1.12` 开始，官方推荐的做法是直接使用 `DataStream API` ，在提交任务时通过将 `执行模式` 设为 `BATCH` 来进行批处理：
`$ bin/flink run -Dexecution.runtime-mode=BATCH BatchWordCount.jar` 

这样，`DataSet API`就没什么用了，在实际应用中我们只要维护一套 `DataStream API`就可以。这里只是为了方便大家理解，我们依然用 `DataSet API` 做了 `批处理` 的实现。

### 2）流处理

对于 `Flink` 而言， `流` 才是整个 `处理逻辑的底层核心` ，所以 `流批统一` 之后的 `DataStream API` 更加强大，可以 `直接处理批处理和流处理的所有场景` 。

下面我们就针对不同类型的输入数据源，用具体的代码来实现流处理。

### 3）流处理-读取文件

我们同样试图 **读取** 文档 `words.txt` 中的数据， ***并统计每个单词出现的频次*** 。整体思路与之前的批处理非常类似，代码模式也基本一致。 

在 `com.xiaoze.wc` 包下新建Java类 `WordCountStreamDemo` ，在静态main方法中编写代码。具体代码实现如下：
```java
package com.xiaoze.wc;

import org.apache.flink.api.common.functions.FlatMapFunction;
import org.apache.flink.api.java.functions.KeySelector;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.streaming.api.datastream.DataStreamSource;
import org.apache.flink.streaming.api.datastream.KeyedStream;
import org.apache.flink.streaming.api.datastream.SingleOutputStreamOperator;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.util.Collector;

/**
 * TODO DataStream实现Wordcount：读文件（有界流）
 *
 * @author 胡昊泽
 * @version 1.0
 */
public class WordCountStreamDemo {
    public static void main(String[] args) throws Exception {
        // TODO 1.创建执行环境
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

        // TODO 2.读取数据:从文件读
        DataStreamSource<String> lineDS = env.readTextFile("input/word.txt");

        // TODO 3.处理数据: 切分、转换、分组、聚合
        // TODO 3.1 切分、转换
        SingleOutputStreamOperator<Tuple2<String, Integer>> wordAndOneDS = lineDS
                .flatMap(new FlatMapFunction<String, Tuple2<String, Integer>>() {
                    @Override
                    public void flatMap(String value, Collector<Tuple2<String, Integer>> out) throws Exception {
                        // 按照 空格 切分
                        String[] words = value.split(" ");
                        for (String word : words) {
                            // 转换成 二元组 （word，1）
                            Tuple2<String, Integer> wordsAndOne = Tuple2.of(word, 1);
                            // 通过 采集器 向下游发送数据
                            out.collect(wordsAndOne);
                        }
                    }
                });
        // TODO 3.2 分组
        KeyedStream<Tuple2<String, Integer>, String> wordAndOneKS = wordAndOneDS.keyBy(
                new KeySelector<Tuple2<String, Integer>, String>() {
                    @Override
                    public String getKey(Tuple2<String, Integer> value) throws Exception {
                        return value.f0;
                    }
                }
        );
        // TODO 3.3 聚合
        SingleOutputStreamOperator<Tuple2<String, Integer>> sumDS = wordAndOneKS.sum(1);

        // TODO 4.输出数据
        sumDS.print();

        // TODO 5.执行：类似 sparkstreaming最后 ssc.start()
        env.execute();
    }
}

/**
 * 接口 A，里面有一个方法a()
 * 1、正常实现接口步骤：
 * <p>
 * 1.1 定义一个class B  实现 接口A、方法a()
 * 1.2 创建B的对象：   B b = new B()
 * <p>
 * <p>
 * 2、接口的匿名实现类：
 * new A(){
 * a(){
 * <p>
 * }
 * }
 */
```

:::warning 输出
3> (hello,1)  
5> (world,1)  
2> (java,1)  
3> (hello,2)  
7> (flink,1)  
3> (hello,3)  
:::

主要观察与批处理程序 `WordCountBatchDemo` 的不同：

- 创建执行环境的不同，`流处理` 程序使用的是 `StreamExecutionEnvironment` 。
- 转换处理之后，得到的数据对象类型不同。
- 分组操作调用的是 `keyBy` 方法，可以传入一个 `匿名函数` 作为 `键选择器（KeySelector）` ，指定当前分组的 `key` 是什么。 
- 代码末尾需要调用env的 `execute` 方法，开始执行任务。

### 4）流处理-读取socket文本流

在实际的生产环境中，***真正的数据流其实是 `无界的`***，有开始却没有结束，这就要求我们需要持续地处理捕获的数据。为了模拟这种场景，可以监听 `socket` 端口，然后向该端口不断的发送数据。

（1）将 `WordCountStreamDemo` 代码中读取文件数据的 `readTextFile` 方法，替换成读取 `socket文本流` 的方法 `socketTextStream` 。具体代码实现如下：
```java
package com.xiaoze.wc;

import org.apache.flink.api.common.typeinfo.Types;
import org.apache.flink.api.java.tuple.Tuple2;
import org.apache.flink.streaming.api.datastream.DataStreamSource;
import org.apache.flink.streaming.api.datastream.SingleOutputStreamOperator;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.util.Collector;

/**
 * TODO DataStream实现Wordcount：读socket（无界流）
 *
 * @author 胡昊泽
 * @version 1.0
 */
public class WordCountStreamUnboundedDemo {
    public static void main(String[] args) throws Exception {
        // TODO 1. 创建执行环境
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        // IDEA运行时，也可以看到webui，一般用于本地测试
        // 需要引入一个依赖 flink-runtime-web
        // 在idea运行，不指定并行度，默认就是 电脑的 线程数
//        StreamExecutionEnvironment env = StreamExecutionEnvironment.createLocalEnvironmentWithWebUI(new Configuration());


        env.setParallelism(3);

        // TODO 2. 读取数据： socket
        DataStreamSource<String> socketDS = env.socketTextStream("hadoop102", 7777);

        // TODO 3. 处理数据: 切换、转换、分组、聚合
        SingleOutputStreamOperator<Tuple2<String, Integer>> sum = socketDS
                .flatMap(
                        (String value, Collector<Tuple2<String, Integer>> out) -> {
                            String[] words = value.split(" ");
                            for (String word : words) {
                                out.collect(Tuple2.of(word, 1));
                            }
                        }
                )
                .setParallelism(2)
                .returns(Types.TUPLE(Types.STRING,Types.INT)) //不然会出现类型擦除
//                .returns(new TypeHint<Tuple2<String, Integer>>() {})
                .keyBy(value -> value.f0)
                .sum(1);



        // TODO 4. 输出
        sum.print();

        // TODO 5. 执行
        env.execute();
    }
}

/**

 并行度的优先级：
    代码：算子 > 代码：env > 提交时指定 > 配置文件

 */
```

（2）在 `Linux` 环境的主机 `hadoop102` 上，执行下列命令，发送数据进行测试

```shell
nc -lk 7777
```

<p style="color:blue">注意：要先启动端口，后启动 StreamWordCountDemo 程序，否则会报超时连接异常。</p>

（3）启动 `StreamWordCount` 程序

我们会发现程序启动之后没有任何输出、也不会退出。这是正常的，因为 `Flink` 的流处理是事件驱动的，当前程序会 `一直处于监听状态` ，只有 `接收到数据才会执行任务、输出统计结果`。

（4）从 `hadoop102` 发送数据

- ①在 `hadoop102` 主机中，输入 `“hello flink”` ，输出如下内容

:::warning 输出
13> (flink,1)  
5> (hello,1)  
:::

- ②再输入 `“hello world”` ，输出如下内容

:::warning 输出
2> (world,1)  
5> (hello,2)  
:::

> 说明：
> Flink还具有一个 `类型提取系统` ，可以 `分析函数的输入和返回类型，自动获取类型信息`，从而获得 `对应的序列化器和反序列化器` 。但是，由于 `Java中泛型擦除的存在` ，在某些特殊情况下（比如Lambda表达式中），自动提取的信息是不够精细的——只告诉Flink当前的元素由“船头、船身、船尾”构成，根本无法重建出“大船”的模样； ***`这时就需要显式地提供类型信息`*** ，才能使应用程序正常工作或提高其性能。因为对于 `flatMap` 里传入的 `Lambda` 表达式，系统只能推断出返回的是 `Tuple2`类型，而无法得到`Tuple2<String, Long>` 。***只有显式地告诉系统当前的返回类型，才能正确地解析出完整数据。***