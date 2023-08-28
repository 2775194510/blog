---
title: 4：SpringBoot启动时加载数据库数据到项目中
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
在springboot启动时需要做一些操作，比如我在项目启动时就要获取用户列表并存入本地项目中，后期如果要根据用户id查询用户信息，直接使用便可以，不用操作数据库。
:::
## 1：前置知识
### 1）InitializingBean
- 1、`InitializingBean`接口为bean提供了初始化方法的方式，它只包括`afterPropertiesSet`方法，凡是继承该接口的类，在初始化bean的时候都会执行该方法。
- 2、spring初始化bean的时候，如果bean实现了`InitializingBean`接口，会自动调用`afterPropertiesSet`方法。
- 3、在Spring初始化bean的时候，如果该bean实现了`InitializingBean`接口，并且同时在配置文件中指定了`init-method`，系统则是先调用`afterPropertieSet()`方法，然后再调用`init-method`中指定的方法。

补充：  

- 1、Spring为bean提供了两种初始化bean的方式，实现`InitializingBean`接口，实现`afterPropertiesSet`方法，或者在配置文件中通过`init-method`指定，两种方式可以同时使用。
- 2、实现`InitializingBean`接口是直接调用`afterPropertiesSet`方法，比通过反射调用`init-method`指定的方法效率要高一点，但是`init-method`方式消除了对spring的依赖。
- 3、如果调用`afterPropertiesSet`方法时出错，则不调用`init-method`指定的方法。

### 2）spring初始化bean有两种方式：
第一：实现`InitializingBean`接口，继而实现`afterPropertiesSet`的方法
第二：反射原理，配置文件使用`init-method`标签直接注入bean  
- 相同点： 实现注入bean的初始化。
- 不同点：
  - （1）实现的方式不一致。
  - （2）接口比配置效率高，但是配置消除了对spring的依赖。而实现`InitializingBean`接口依然采用对spring的依赖。

## 2：代码实例
### 1）本地缓存数据设置、获取方法
<p style="color:red">就是一个对于map的操作方法类，设置数据和获取数据</p>

```java
package com.xiaoze.exer.utils;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LocalCache {
    
    private LocalCache() {
        System.out.println("**************缓存类加载了******************");
    };
    
    private static final LocalCache cachelocal = new LocalCache();
    
    public static LocalCache getLocalCache() {
        return cachelocal;
    }
    
    
    private static Map<String, Object> hCache = new ConcurrentHashMap<String, Object>();
    
    public boolean putValue(String key, Object value) {
        try {
            if (hCache.size() ==  10000) {
                return false;
            }
            hCache.put(key, value);
            return true;
        } catch (Exception e) {
            LogUtil.error(log, "添加缓存失败", e);
        }
        return false;
    }
    
    public Object getValue(String key) {
        if (hCache.size() == 0) {
            return "";
        }
        return hCache.get(key);
    }
    
    public int cacheSize() {
        return hCache.size();
    }
    
}
```

### 2）设置数据，也就是加载数据库数据
```java
package com.xiaoze.exer.config;

import com.xiaoze.exer.entity.User;
import com.xiaoze.exer.service.UserService;
import com.xiaoze.exer.utils.LocalCache;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author 小泽
 * @create 2023-08-28  12:22
 * 记得每天敲代码哦
 */
@Slf4j
@Component
public class InitCache implements InitializingBean {

       private static final Log logger = LogFactory.getLog(InitCache.class);

       @Autowired
       private UserService userService;

       @Override
       public void afterPropertiesSet() throws Exception {
              logger.error("项目开始启动 ---- 开始读取数据库信息");
              List<User> users = userService.getBaseMapper().selectList(null);

              //开始进行数据缓存项目
              LocalCache localCache = LocalCache.getLocalCache();
              for (User user : users) {
                     localCache.putValue(String.valueOf(user.getUserId()), user);
              }
              logger.error("--------数据大小是-------"+users.size());
              logger.error("读取信息完成，已经将信息存入项目中，以供调用。------------");
       }
}
```
### 3）测试数据。
```java
@RestController
@RequestMapping("/项目启动初始化加载数据")
public class InitCacheController {

    @ApiOperation("项目启动初始化加载数据到项目")
    @GetMapping("/test")
    public R InitCacheTest() {
        return R.ok().data("message",LocalCache.getLocalCache().getValue("43"));
    }
}
```

