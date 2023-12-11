---
title: 10：springboot整合MybatisPlus
date: 2023-12-11
sidebar: auto
categories:
  - spring
tags:
  - Java
  - springboot

author: 胡昊泽
---

## 1：pom.xml
```xml
<!--        1:导入数据库驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
<!--        2:导入lombok-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
<!--        3:导入mybatisplus-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.5.1</version>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
            <version>3.4.1</version>
        </dependency>
        <!--freemarker模板-->
        <dependency>
            <groupId>org.freemarker</groupId>
            <artifactId>freemarker</artifactId>
        </dependency>
        <!-- velocity 模板引擎, Mybatis Plus 代码生成器需要 -->
        <dependency>
            <groupId>org.apache.velocity</groupId>
            <artifactId>velocity-engine-core</artifactId>
            <version>2.0</version>
        </dependency>
```

## 2：application.yml配置数据库信息
```yml
#配置数据库
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mybatisplus?&serverTimezone=Hongkong
    username: root
    password: "010429"
    driver-class-name: com.mysql.cj.jdbc.Driver
```

## 3：在Pojo包下创建User.java(Lombok)
```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer id;
    private String name;
    private Integer age;
    private String email;
}
```

## 4：在Mapper包下创建UserMapper接口
```java
@Repository //代表Dao层
//在对应的Mapper上面继承基本的类  BaseMapper
public interface UserMapper extends BaseMapper<User> {
   //所有的CRUD操作都已经完成
}
```

## 5：在启动类中加入Mapper包扫描
`@MapperScan("com.xiaoze.mapper")`

## 6：自动填充配置类
```java
package com.xiaoze.collegeserver.handler;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * @author 小泽
 * @create 2022-07-16  18:37
 * 记得每天敲代码哦
 */
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        //属性名称，不是数据表中得字段名称。
        this.setFieldValByName("created",new Date(),metaObject);
        this.setFieldValByName("lastlogintime",new Date(),metaObject);
        this.setFieldValByName("createTime",new Date(),metaObject);

    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.setFieldValByName("lastlogintime",new Date(),metaObject);
    }
}
```
## 7：mybatisPlus生成器
```java
package com.xiaoze.steampy;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.util.Collections;

/**
 * @author 小泽
 * @create 2022-03-28  11:16
 * 记得每天敲代码哦
 */
public class practerApplication {
    public static void main(String[] args) {
        FastAutoGenerator.create("jdbc:mysql://localhost:3306/steampy?&serverTimezone=Hongkong", "root", "010429")
                .globalConfig(builder -> {
                    builder.author("小泽") // 设置作者
                            // .enableSwagger() // 开启 swagger 模式
                            // .fileOverride() // 覆盖已生成文件
                            .commentDate("yyyy-MM-dd")
                            .outputDir(System.getProperty("user.dir")+"\\src\\main\\java"); // 指定输出目录

                })
                .packageConfig(builder -> {
                    builder.parent("com") // 设置父包名
                            .moduleName("xiaoze.steampy") // 设置父包模块名
                            .entity("entity")
                            .service("service")
                            .serviceImpl("serviceImpl")
                            .controller("controller")
                            .mapper("mapper")
                            .xml("mapper")
                            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, System.getProperty("user.dir")+"\\src\\main\\resources")); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -> {
                    builder.addInclude("RechargeRecord") // 设置需要生成的表名
                            .addTablePrefix("t_", "c_","M_") // 设置过滤表前缀
                            .serviceBuilder()//1：service策略配置
                            .formatServiceFileName("%sService")
                            .formatServiceImplFileName("%sServiceImpl")
                            .entityBuilder()//2：entity策略配置
                            .enableLombok()
                            .logicDeleteColumnName("deleted")//说明逻辑删除是那个字段
                            .enableTableFieldAnnotation()  //属性加上说明注解
                            .controllerBuilder()//3：controller策略配置
                            .formatFileName("%sController")
                            .enableRestStyle()
                            .mapperBuilder()//4：mapper策略配置
                            .superClass(BaseMapper.class)//继承那个父类
                            .formatMapperFileName("%sMapper")
                            .enableMapperAnnotation()//@mapper开启
                            .formatXmlFileName("%sMapper");//XML名
                })
                .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
                .execute();

    }
}

```

## 8：分页配置插件
```java
@Configuration
public class PageConf {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
```