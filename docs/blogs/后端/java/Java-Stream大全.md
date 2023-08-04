---
title: 3：Stream
date: 2023-8-4
categories:
  - 后端
tags:
  - java
---

[学习地址](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html#mapToInt-java.util.function.ToIntFunction-)

```java
package com.xiaoze.exer.Exercise.StreamTestPack;

import io.swagger.models.auth.In;
import org.apache.commons.lang3.StringUtils;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author 小泽
 * @create 2023-07-13  19:15
 * 记得每天敲代码哦
 */
public class StreamTest {
       public static void main(String[] args) {
              List<Integer> list = new ArrayList<>();
              list.add(1);
              list.add(3);
              list.add(2);
              list.add(4);
              list.add(7);
              list.add(6);
              list.add(6);

              List<List<Integer>> nestedList = Arrays.asList(
                      Arrays.asList(1, 2, 3),
                      Arrays.asList(4, 5, 6),
                      Arrays.asList(7, 8, 9)
              );

              List<Person> persons = new ArrayList<>();
              persons.add(new Person("Alice", 30));
              persons.add(new Person("Bob", 25));
              persons.add(new Person("Charlie", 22));

              //1.filter(返回由该流的元素组成的流，该元素与给定的谓词匹配)  从集合中查询为2的元素
              System.out.println("filter使用："+list.stream().filter(f -> f == 2).collect(Collectors.toList()));
              //2.map(返回一个流，包括将给定函数应用到该流元素的结果)
              System.out.println("map使用："+list.stream().map(f -> f + 2).collect(Collectors.toList()));
              //3.mapToInt(返回一个包含应用给定的功能，该流的元素的结果 IntStream)   boxed()方法将LongStream转换为Stream<Long>
              System.out.println("mapToInt使用："+list.stream().mapToInt(f -> f+1).boxed().collect(Collectors.toList()));
              //4.mapToLong(返回一个包含应用给定的功能，该流的元素的结果 LongStream)  boxed()方法将LongStream转换为Stream<Long>
              System.out.println("mapToLong使用："+list.stream().mapToLong(f -> f+1).boxed().collect(Collectors.toList()));
              //5.mapToDouble(返回一个包含应用给定的功能，该流的元素的结果 DoubleStream)  boxed()方法将LongStream转换为Stream<Long>
              System.out.println("mapToDouble使用："+list.stream().mapToDouble(f -> f+1.5).boxed().collect(Collectors.toList()));
              //6.flatMap()
              // 使用flatMap将嵌套的列表扁平化为一个列表
              List<Integer> flattenedList = nestedList.stream()
                      .flatMap(List::stream) // 将每个子列表转换为Stream<Integer>
                      .collect(Collectors.toList()); // 收集结果为List<Integer>

              // 输出扁平化后的列表
              System.out.println("扁平化后的列表：" + flattenedList);
              //7.distinct
              System.out.println("distinct使用："+list.stream().distinct().collect(Collectors.toList()));
              //8.sorted
              System.out.println("sorted使用："+list.stream().sorted().collect(Collectors.toList()));
              System.out.println("sorted使用(根据age 字段进行排序)："+persons.stream().sorted(Comparator.comparingInt(Person::getAge)).collect(Collectors.toList()));
              //9.peek()方法对流的每个元素执行操作，并且可以在流的不同位置多次调用。但是它只用于观察和调试流的内容，并不用于修改流的内容。
              //10.skip(从第几位开始截取) 和  limit(截取几个)
              System.out.println("skip使用："+list.stream().skip(0).limit(5).collect(Collectors.toList()));
              //11.toArray()转换成数组
              System.out.println("Object[]数组：" + Arrays.toString(list.stream().toArray()));
              System.out.println("String[]数组：" + Arrays.toString(list.stream().map(String::valueOf).toArray(String[]::new)));
              //12.reduce()方法   初始值为0，通过lambda表达式累积相加
              System.out.println("reduce使用："+list.stream().reduce(0, (a, b) -> a + b));
              System.out.println("reduce使用："+list.stream().reduce(0, Integer::sum));
              System.out.println("reduce使用："+list.stream().reduce(0, Integer::max));
              //13.min()、max()、count()  orElse()方法，不为空时返回本身，为空时，返回设置的值
              System.out.println("min使用："+list.stream().min(Integer::compare).orElse(0));
              System.out.println("max使用："+list.stream().max(Integer::compare).orElse(0));
              System.out.println("count使用："+list.stream().count());
              //14.anyMatch()  满足条件返回true ， 否则返回false
              System.out.println("anyMatch()使用："+list.stream().anyMatch(a -> a%2 ==0));
              //15.findFirst(),findAny()
              System.out.println("findFirst()使用："+list.stream().findFirst().orElse(0));
              System.out.println("查找以A开头的name:"+persons.stream().filter(p -> p.getName().startsWith("A")).findAny().get().getName());
       }
}

```

:::warning 结果
`filter使用：`[2]   
`map使用：`[3, 5, 4, 6, 9, 8, 8]   
`mapToInt使用：`[2, 4, 3, 5, 8, 7, 7]   
`mapToLong使用：`[2, 4, 3, 5, 8, 7, 7]   
`mapToDouble使用：`[2.5, 4.5, 3.5, 5.5, 8.5, 7.5, 7.5]   
`扁平化后的列表：`[1, 2, 3, 4, 5, 6, 7, 8, 9]  
`distinct使用：`[1, 3, 2, 4, 7, 6]  
`sorted使用：`[1, 2, 3, 4, 6, 6, 7]  
`sorted使用(根据age 字段进行排序)：`[com.xiaoze.exer.Exercise.StreamTestPack.Person@7dc5e7b4, com.xiaoze.exer.Exercise.StreamTestPack.Person@1ee0005, com.xiaoze.exer.Exercise.StreamTestPack.Person@75a1cd57]  
`skip使用：`[1, 3, 2, 4, 7]  
`Object[]数组：`[1, 3, 2, 4, 7, 6, 6]  
`String[]数组：`[1, 3, 2, 4, 7, 6, 6]   
`reduce使用：`29  
`reduce使用：`29  
`reduce使用：`7  
`min使用：`1  
`max使用：`7  
`count使用：`7  
`anyMatch()使用：`true  
`findFirst()使用：`1  
`查找以A开头的name：`Alice  

:::
