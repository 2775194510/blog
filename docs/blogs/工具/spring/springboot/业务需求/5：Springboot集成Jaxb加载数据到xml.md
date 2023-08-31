---
title: 5：Springboot集成Jaxb加载数据到xml
date: 2023-8-31
sidebar: auto
categories:
  - spring
tags:
  - Jaxb
  - springboot
author: 胡昊泽
---

## 1：前言
　　过往的项目中数据存储都离不开数据库，不过最近做的一个项目的某些数据（比如人员信息、菜单、权限等等）却完全没有涉及任何数据库操作，直接XML搞定。这里无意比较优劣，因为数据库存储和XML存储本就有不同的适用场景，盲目比较毫无意义，只是因为业务需要，仅此而已。先来概念一下——XML，可扩展标记语言，设计宗旨是用来`传输数据`而非显示数据，其遵循W3C标准，是一种通用的数据交换格式,具有很强的跨平台性，并且数据无需转换，所以，如果你要将数据做跨平台传输，那么把数据保存在 XML 文件中是有好处的。当然，这里要说明，由于XML仅仅是作为一种文档模式的结构化存储，所以并不适用于大数据量的存储。现在的Java中有很多类库比如DOM、SAX、JDOM和DOM4J等等都可以操作XML，但如果仅仅是想做JavaBean和XML节点元素的互相转换，而不涉及动态XML的处理，那么JAXB绝对是一个不错的选择。在比较新的jdk版本中，JAXB都是jdk的扩展包javax中自带的类库，不需要你引入第三方jar包。

## 2：JAXB基础介绍
### 1）常用api
- `JAXBContext类`，是应用的入口，通过该类创建序列化和反序列化对象，也即编组对象和解组对象；
- `Marshaller 编组接口`，将Java对象序列化为XML数据；
- `Unmarshaller 解组接口`，将XML数据反序列化为Java对象。

### 2）常用注解
- `@XmlRootElement`，将Java类或枚举映射成XML元素根节点，是唯一一个必须注解，name属性指定根节点名称，不指定默认为类名的小写；
- `@XmlElement`，将Java类的一个属性映射为XML节点元素，name属性可自定义元素名；
- `@XmlAttribute`，将Java类的一个属性映射为XML节点元素的属性，name属性可自定义属性名；
- `@XmlType`，将Java类或枚举类型映射到XML模式类型，常与@XmlRootElement、@XmlAccessorType共用，propOrder属性定义字段生成的XML节点顺序；
- `@XmlAccessorType`，控制字段或属性的序列化。属性XmlAccessType有4个常量值:FIELD表示JAXB将自动绑定Java类中的每个非静态的（static）、非瞬态的（由@XmlTransient标注）字段到XML；PROPERTY表示java对象中所有通过getter/setter方式绑定成属性到XML；PUBLIC_MEMBER表示Java对象中所有的public访问权限的成员变量和通过getter/setter方式访问的成员变量，该值为默认值；NONE表示Java对象的所有属性都不映射为XML的元素；
- `@XmlAccessorOrder`，控制JAXB 绑定类中属性和字段的排序，有两个属性，AccessorOrder.ALPHABETICAL——对生成的XML元素按字母书序排序，XmlAccessOrder.UNDEFINED——不排序，默认为该值；
- `@XmlJavaTypeAdapter`，自定义适配器（即扩展抽象类XmlAdapter并覆盖marshal()和unmarshal()方法），解决日期（Date）,数字（Number）格式化问题；
- `@XmlElementWrapper` ，对于数组或集合（即包含多个元素的成员变量），生成一个包装该数组或集合的XML元素（称为包装器），该注解只能用在集合上；
- `@XmlTransient` ，用于标示在由Java对象映射XML时，忽略此属性，在生成的XML文件中将不出现此元素。

### 3）实际应用中注意的问题
- ① 如果JavaBean中定义了有参的构造器，那么必须同时定义无参构造器，否则转XML会抛`无默认构造函数的异常`;
- ② 成员变量值为NULL时，将不会映射成对应的XML元素——由于基本数据类型默认值不为空，所以基本数据类型不设值也会映射成XML元素，值为默认值,所以如果模型需要基本数据，在属性定义的时候尽量使用包装类型；
- ③ `@XmlAccessorType` 注解中如果属性值为`XmlAccessType.FIELD`，则表示通过成员变量来映射，set/get方法上的映射注解就是多余的，所以如果此时set/get方法上再标注元素或者属性映射注解，将抛属性重复性异常；属性值为`XmlAccessType.NONE`不映射为XML元素的前提是Java字段或set/get方法上都没有映射注解；
- ④ `@XmlType `propOrder属性能够自定义字段的排序，该属性如果设置，要么写成{}的形式，否则在就必须将所有`@XmlElement`标注或者没有`@XmlElement`标注的但实际上会被映射为XML节点的字段添加到排序列表，不然会抛异常；如果propOrder属性设置有值，`@XmlAccessorOrder`注解的元素排序规则将失效；

## 3：代码简单实现
### 1）工具类
```java
package com.xiaoze.exer.utils;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.*;

/**
 * 封装了XML转换成object，object转换成XML的代码
 *
 * @author hhz
 * @date 2023/8/30 16:25
 */
public class XMLUtil {
    /**
     * 方法描述: 将对象直接转换成String类型的 XML输出
     *
     * @param :
     * @return
     * @Author 胡昊泽
     * @Date 2023/8/30 16:25
     */
    public static String convertToXml(Object obj) {
        // 创建输出流
        StringWriter sw = new StringWriter();
        try {
            // 利用jdk中自带的转换类实现
            JAXBContext context = JAXBContext.newInstance(obj.getClass());
            Marshaller marshaller = context.createMarshaller();
            // 格式化xml输出的格式
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
            // 将对象转换成输出流形式的xml
            marshaller.marshal(obj, sw);
        } catch (JAXBException e) {
            e.printStackTrace();
        }
        return sw.toString();
    }

    /**
     * 　　* 将对象根据路径转换成xml文件
     * 　　*
     * 　　* @param obj
     * 　　* @param path
     */
    public static String convertToXml(Object obj, String path) {
        FileWriter fw = null;
        try {
            // 利用jdk中自带的转换类实现
            JAXBContext context = JAXBContext.newInstance(obj.getClass());
            Marshaller marshaller = context.createMarshaller();
            // 格式化xml输出的格式
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
            // 将对象转换成输出流形式的xml
            // 创建输出流
            fw = new FileWriter(path);
            marshaller.marshal(obj, fw);
        } catch (JAXBException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fw.toString();
    }

    /**
     * 　　* 将String类型的xml转换成对象
     * 　　*
     * 　　* @param clazz
     * 　　* @param xmlStr
     * 　　* @return
     */
    public static Object convertXmlStrToObject(Class clazz, String xmlStr) {
        Object xmlObject = null;
        try {
            JAXBContext context = JAXBContext.newInstance(clazz);
            // 进行将Xml转成对象的核心接口
            Unmarshaller unmarshaller = context.createUnmarshaller();
            StringReader sr = new StringReader(xmlStr);
            xmlObject = unmarshaller.unmarshal(sr);
        } catch (JAXBException e) {
            e.printStackTrace();
        }
        return xmlObject;
    }

    /**
     * 　　* 将file类型的xml转换成对象
     * 　　*
     * 　　* @param clazz
     * 　　* @param xmlPath
     * 　　* @return
     */
    public static Object convertXmlFileToObject(Class clazz, String xmlPath) {
        Object xmlObject = null;
        try {
            JAXBContext context = JAXBContext.newInstance(clazz);
            Unmarshaller unmarshaller = context.createUnmarshaller();
            FileReader fr = null;
            fr = new FileReader(xmlPath);
            xmlObject = unmarshaller.unmarshal(fr);
        } catch (JAXBException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return xmlObject;
    }
}
```
### 2）简单对象实现互相转换
```java
@Data
@XmlRootElement(name = "user")
@XmlAccessorType(XmlAccessType.FIELD)
public class UserTest {
    private Integer userId;
    private String Username;
    private String email;
}
```
```java
private static final Logger logger = LoggerFactory.getLogger(JaxbController.class);

    @ApiOperation("jaxb简单测试")
    @PostMapping("/test1")
    public R JaxbTest(@RequestBody UserTest userTest) {
        String path = "src/main/resources/UserTestJaxb.xml";
        logger.info("---将对象转换成File类型的xml Start---");
        String str = XMLUtil.convertToXml(userTest, path);
        logger.info(str);
        logger.info("---将对象转换成File类型的xml End---");

        logger.info("---将File类型的xml转换成对象 Start---");
        UserTest policyObj = (UserTest) XMLUtil.convertXmlFileToObject(UserTest.class, path);
        logger.info(policyObj.toString());
        logger.info("---将File类型的xml转换成对象 End---");
        return R.ok().data("user", policyObj);
    }
```
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<user>
    <userId>100000</userId>
    <Username>string2</Username>
    <email>string1</email>
</user>
```
### 3）集合对象实现互相转换
```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@XmlRootElement(name = "user1")
@XmlAccessorType(XmlAccessType.FIELD)
public class UserTest1 {
    //设置属性
    @XmlAttribute(name = "field3")
    private String field3;
    //设置属性
    @XmlAttribute(name = "field4")
    private String field4;

    @XmlElement(name = "userId")
    private Integer userId;
    @XmlElement(name = "Username")
    private String Username;
    @XmlElement(name = "email")
    private String email;
}
```
```java
@Data
@XmlRootElement(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
public class UserTest2 {
    //设置属性
    @XmlAttribute(name = "field1")
    private String field1;
    //设置属性
    @XmlAttribute(name = "field2")
    private String field2;

    //设置标签
    @XmlElement(name = "user1")
    private List<UserTest1> userTest1;
}
```
```java
@ApiOperation("jaxb简单测试")
    @GetMapping("/test2")
    public R JaxbTest1() {
        //准备数据
        List<UserTest1> userTest1List = new ArrayList<>();
        UserTest1 userTest1 = new UserTest1();
        userTest1.setUserId(123465000);
        userTest1.setEmail("255555.com");
        userTest1.setUsername("小泽1");
        userTest1.setField3("field3");
        userTest1.setField4("field4");

        UserTest1 userTest2 = new UserTest1();
        userTest2.setUserId(123465545);
        userTest2.setEmail("25555566666.com");
        userTest2.setUsername("小泽2");
        userTest2.setField3("field3");
        userTest2.setField4("field4");

        userTest1List.add(userTest1);
        userTest1List.add(userTest2);

        UserTest2 userTest3 = new UserTest2();
        userTest3.setField1("field1");
        userTest3.setField2("field2");
        userTest3.setUserTest1(userTest1List);
        logger.error(String.valueOf(userTest1List));
        String path = "src/main/resources/UserTestJaxb1.xml";
        logger.info("---将对象转换成File类型的xml Start---");
        String str = XMLUtil.convertToXml(userTest3, path);
        logger.info(str);
        logger.info("---将对象转换成File类型的xml End---");

        logger.info("---将File类型的xml转换成对象 Start---");
        UserTest2 policyObj = (UserTest2) XMLUtil.convertXmlFileToObject(UserTest2.class, path);
        logger.info(policyObj.toString());
        logger.info("---将File类型的xml转换成对象 End---");
        return R.ok().data("user", policyObj);
    }
```

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<users field1="field1" field2="field2">
    <user1 field3="field3" field4="field4">
        <userId>123465000</userId>
        <Username>小泽1</Username>
        <email>255555.com</email>
    </user1>
    <user1 field3="field3" field4="field4">
        <userId>123465545</userId>
        <Username>小泽2</Username>
        <email>25555566666.com</email>
    </user1>
</users>

```
## 4：优化
将路径集中管理在一个properties中，然后去读取信息
### 1）工具类
```java
package com.xiaoze.exer.utils;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

/**
 * @author 小泽
 * @create 2023-08-10  11:16
 * 记得每天敲代码哦
 */
public class ErrorCodeLoadUtil {

    // 定义异常信息配置文件的路径
    private static final  String PROPERTIES_FILE = "exception/exception.properties";
    private static final  String PROPERTIES_FILE1 = "JAXB/JAXB.properties";

    /**
     * 根据错误码获取对应的错误信息
     *
     * @param errCode 错误码
     * @return 错误信息
     */
    public static String getErrorMsg(String errCode) {
        // 创建 Properties 对象
        Properties prop = new Properties();
        // 定义错误信息变量
        String errorMessage = null;
        try (InputStream input = ErrorCodeLoadUtil.class.getClassLoader().getResourceAsStream(PROPERTIES_FILE)) {
            // 判断配置文件是否存在
            if (input == null) {
                throw new RuntimeException("Could not find the properties file: " + PROPERTIES_FILE);
            }
            // 读取配置文件到 Properties 对象中
            prop.load(new InputStreamReader(input, StandardCharsets.UTF_8));
            // 根据错误码获取对应的错误信息
            errorMessage = prop.getProperty(errCode);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        // 返回错误信息
        return errorMessage;
    }

    public static String getPath(String errCode) {
        // 创建 Properties 对象
        Properties prop = new Properties();
        // 定义错误信息变量
        String errorMessage = null;
        try (InputStream input = ErrorCodeLoadUtil.class.getClassLoader().getResourceAsStream(PROPERTIES_FILE1)) {
            // 判断配置文件是否存在
            if (input == null) {
                throw new RuntimeException("Could not find the properties file: " + PROPERTIES_FILE1);
            }
            // 读取配置文件到 Properties 对象中
            prop.load(new InputStreamReader(input, StandardCharsets.UTF_8));
            // 根据错误码获取对应的错误信息
            errorMessage = prop.getProperty(errCode);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        // 返回错误信息
        return errorMessage;
    }
}
```
### 2）文件编写
```properties
userTestJaxb=src/main/resources/UserTestJaxb.xml
```
### 3）测试
```java
@ApiOperation("jaxb配置测试")
    @GetMapping("/test3")
    public R JaxbTest() {
        UserTest userTest = new UserTest();
        userTest.setUserId(123456);
        userTest.setUsername("xiaoze");
        userTest.setEmail("27751194510@qq.com");
        //根据标识去获取真实路径
        String path = ErrorCodeLoadUtil.getPath("userTestJaxb");
        logger.info("---将对象转换成File类型的xml Start---");
        String str = XMLUtil.convertToXml(userTest, path);
        logger.info(str);
        logger.info("---将对象转换成File类型的xml End---");

        logger.info("---将File类型的xml转换成对象 Start---");
        UserTest policyObj = (UserTest) XMLUtil.convertXmlFileToObject(UserTest.class, path);
        logger.info(policyObj.toString());
        logger.info("---将File类型的xml转换成对象 End---");
        return R.ok().data("user", policyObj);
    }
```

## 5：学习网站补充
- [JAXB应用实例大全](https://www.cnblogs.com/chenbenbuyi/archive/2018/01/20/8283657.html#_label1)
- [W3Cschool](https://www.w3cschool.cn/jaxb2/jaxb2-tji52zof.html)
- [互相转换示例](https://zhuanlan.zhihu.com/p/343893930)