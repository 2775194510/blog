---
title: 11：springboot整合Swagger
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
 <!--swagger-->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <scope>provided </scope>
        </dependency>
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
            <scope>provided </scope>
        </dependency>
```

## 2：swagger配置类
```java
@Configuration//配置类
@EnableSwagger2 //swagger注解
public class SwaggerConfig {
 
    @Bean
    public Docket webApiConfig(){
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("webApi")
                .apiInfo(webApiInfo())
                .select()
                .paths(Predicates.not(PathSelectors.regex("/admin/.*")))
                .paths(Predicates.not(PathSelectors.regex("/error.*")))
                .build();
 
    }
 
    private ApiInfo webApiInfo(){
 
        return new ApiInfoBuilder()
                .title("网站-课程中心API文档")
                .description("本文档描述了课程中心微服务接口定义")
                .version("1.0")
                .contact(new Contact("dyk", "https://blog.csdn.net/qq_44866153", "2775194510@qq.com"))
                .build();
    }
}
```

## 3：启动类添加注解

`@EnableSwagger2`

## 4：简单注解说明
注解解释：
- `@Api()` 用于类；  
　　 表示标识这个类是swagger的资源  
- `@ApiOperation()` 用于方法；  
　　 表示一个http请求的操作  
- `@ApiParam()` 用于方法，参数，字段说明；  
　　 表示对参数的添加元数据（说明或是否必填等）  
- `@ApiModel()` 用于类  
　　 表示对类进行说明，用于参数用实体类接收  
- `@ApiModelProperty()` 用于方法，字段  
　　 表示对model属性的说明或者数据操作更改  
- `@ApiIgnore()` 用于类，方法，方法参数  
　　 表示这个方法或者类被忽略  
- `@ApiImplicitParam()`  用于方法  
　　 表示单独的请求参数  
- `@ApiImplicitParams()`  用于方法，包含多个 `@ApiImplicitParam`
