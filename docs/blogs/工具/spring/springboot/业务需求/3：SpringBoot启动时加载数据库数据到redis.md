---
title: 3：SpringBoot启动时加载数据库数据到redis
date: 2023-7-22
sidebar: auto
categories:
  - spring
tags:
  - Java
  - springboot

author: 胡昊泽
---

:::warning 需求背景
在springboot启动时需要做一些操作，比如我在项目启动时就要获取用户列表并存入redis中。
:::
## 1：前置知识
### 1）使用@PostConstruct注解
> 注意：@PostConstruct优先级在@Autowired @Value之后，所以可以获取相关的值
举例：
```java
@Component
public class CodeCache {
    public static Map<String, String> codeMap = new HashMap<String, String>();
    
    @Autowired
    private ICodeService codeService;
    
    @PostConstruct
    public void init(){
        System.out.println("系统启动中。。。加载codeMap");
        List<Code> codeList = codeService.selectAll();
        for (Code code : codeList) {
            codeMap.put(code.getKey(), code.getValue());
        }
    }
    
    @PreDestroy
    public void destroy(){
        System.out.println("系统运行结束");
    }
}
```
### 2）CommandLineRunner
> 在项目中经常需要进行初始化一些数据（比如缓存等），以便后面调用使用。spring boot可以通过CommandLineRunner接口实现启动加载功能。 
举例：
```java
@Component
@Order(1) //初始化加载优先级 数字越小优先级越高
public class Init implements CommandLineRunner {

    @Resource
    private IESignInitService eSignInitService;

    @Override
    public void run(String... args) throws Exception {
        eSignInitService.init();
    }
}
```
注意：CommandLineRunner 加载会在项目启动完成之后进行加载
### 3）二者区别
- `@PostConstruct` 要比实现`CommandLineRunner`的类加载的要早；`CommandLineRunner` 是在项目启动完之后加载；
- 如果用`@PostConstruct` 使用这个service可能会`空指针`异常, 以为`@PostConstruct`修饰的方法加载的早, 用到的那个service此时还未加载到spring容器中；
- 创建bean的时候执行顺序：`Constructor(构造方法)` -> `@Autowired(依赖注入)` -> `@PostConstruct(注释的方法)`。
- 在springboot完全初始化完毕后，会执行`CommandLineRunner`和`ApplicationRunner`，两者唯一的区别是参数不同，但是不会影响，都可以获取到执行参数。`CommandLineRunner`对于参数格式没有任何限制，`ApplicationRunner`接口参数格式必须是：`–key=value`；  
<p style="color:blue">注：使用注解`@PostConstruct`是最常见的一种方式，存在的问题是如果执行的方法耗时过长，会导致项目在方法执行期间无法提供服务。</p>

## 2：代码实现
```java
package com.xiaoze.exer.config;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import com.xiaoze.exer.entity.User;
import com.xiaoze.exer.service.UserService;
import com.xiaoze.exer.utils.BeanMapUtils;
import com.xiaoze.exer.utils.RedisConstants;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author 小泽
 * @create 2023-08-26  16:33
 * 记得每天敲代码哦
 */
@Component
public class EnvironmentLoader {
       private static final Log logger = LogFactory.getLog(EnvironmentLoader.class);
       @Autowired
       Environment environment;
       @Autowired
       private StringRedisTemplate stringRedisTemplate;
       @Autowired
       private UserService userService;

       @PostConstruct
       public void init() {
              logger.error("系统启动中。。。正在读取数据库中user数据，请稍后");
              List<User> users = userService.getBaseMapper().selectList(null);
              //user集合转map
              // Map<Integer, User> UserCollect = users.stream().collect(Collectors.toMap(item -> item.getUserId(), item -> item));
              // Map<Object, Object> map = BeanMapUtils.beanToMap(users.get(0));
              //转换成map
              Map<String, Object> stringObjectMap = BeanUtil.beanToMap(users.get(0),
                      new HashMap<>(),
                      CopyOptions.create()  //自定义处理规则。
                              .setIgnoreNullValue(true)
                              .setFieldValueEditor((fieldName, fieldValue) -> {
                                     if(fieldName.equals("created") || fieldName.equals("lastlogintime")){
                                            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                                            fieldValue =  sdf.format(fieldValue);
                                     }
                                     if (fieldValue == null)  fieldValue = "0";
                                     else fieldValue = fieldValue + "";
                                     return fieldValue;
                              }));
              //存入redis中
              stringRedisTemplate.opsForHash().putAll(RedisConstants.Login_USER_ByMail + users.get(0).getUsername(), stringObjectMap);
              System.out.println(users);
       }
}
```
