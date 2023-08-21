---
title: 4：SpringBoot+Vue实现数据加密
date: 2023-8-19
sidebar: auto
categories:
  - spring
tags:
  - spring工具

author: 胡昊泽
---
:::warning 思路开发
- ① 前端对数据进行加密，将加密信息封装到请求头中。
- ② 后端在接口中获取请求头，然后进行解密。
:::

:::warning 困难
- ① <span style="color:blue">刚开始将请求体直接加密，传递后端，发现不能成功解密。</span>
- ② <span style="color:blue">前端怎么将加密数据放入请求头中（简单实现：Vuex）</span>
:::
## 1：vue前端实现
### 1）安装插件crypto-js
```npm
npm install crypto-js
```
### 2）编写加密、解密工具类
```js
import CryptoJS from 'crypto-js'

// 需要和后端一致
const KEY = CryptoJS.enc.Utf8.parse('123456798');
const IV = CryptoJS.enc.Utf8.parse('13245678911111');

export default {

  /**
   * 加密
   * @param {*} word
   * @param {*} keyStr
   * @param {*} ivStr
   */
  encrypt (word, keyStr, ivStr) {
    let key = KEY;
    let iv = IV;
    if (keyStr) {
      key = CryptoJS.enc.Utf8.parse(keyStr);
      iv = CryptoJS.enc.Utf8.parse(ivStr);
    }
    let srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  },

  /**
   * 解密
   * @param {*} word
   * @param {*} keyStr
   * @param {*} ivStr
   */
  decrypt (word, keyStr, ivStr) {
    let key = KEY;
    let iv = IV;

    if (keyStr) {
      key = CryptoJS.enc.Utf8.parse(keyStr);
      iv = CryptoJS.enc.Utf8.parse(ivStr);
    }

    let base64 = CryptoJS.enc.Base64.parse(word);
    let src = CryptoJS.enc.Base64.stringify(base64);

    let decrypt = CryptoJS.AES.decrypt(src, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    });

    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
}

```
### 3）vue页面实现
```html
<template>
  <div class="main">
    <el-button type="primary" style="margin: 30px 30px" @click="addUser">添加用户</el-button>

   <div style="margin: 30px 30px">
     <p style="color: #48a54b">前端加密之后的数据</p>
     <el-input
       type="textarea"
       :autosize="{ minRows: 2, maxRows: 4}"
       :rows="2"
       placeholder="前端加密之后的数据,不可更改"
       v-model="Pass"
     disabled>
     </el-input>
     <p style="color: #48a54b;margin-top: 50px">后端返回加密数据，前端解密之后的数据</p>
     <el-input
       type="textarea"
       :autosize="{ minRows: 2, maxRows: 4}"
       :rows="2"
       placeholder="后端返回加密数据，前端解密之后的数据"
       v-model="UnPass"
       disabled>
     </el-input>
   </div>
  </div>
</template>

<script>
import secrt from '../../utils/secrt'
import { saveUser1 } from '../../api/UserRequestApi'

export default {
  name: 'Secrt',
  data() {
    return {
      Pass: "",
      UnPass: "",
      adduserform: {
        userId:'',
        username: '胡昊泽',
        password: '000000',
        sex: true,
        email: '2775194510@qq.com',
        introduction: '无！！！',
        mobile: '189698744785',
        pic: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        school: '.。。。。'
      },
    }
  },
  created() {

  },
  methods: {
    //添加用户
    addUser(){
      //1：在前端对表单数据进行加密，将加密数据放入请求头中
      // （直接放入vuex中就可以了，然后在请求拦截器中会获取vuex,然后放入请求头中）
      this.$store.commit("SET_SECRTMESSAGE",secrt.encrypt(JSON.stringify(this.adduserform)))
      this.Pass = secrt.encrypt(JSON.stringify(this.adduserform))
      //2.调用后台请求
      saveUser1("11111").then(result => {
         // this.UnPass = secrt.decrypt(this.Pass)
        //3.后端返回加密数据，前端进行解密。
        alert(result.message)
      })
    }
  }
}
</script>

<style scoped>

</style>

```
我采用的是axios方式请求，然后又封装一层`请求拦截器`和`响应拦截器`，然后在`响应拦截器`中去获取`Vuex`的内容，接口都写在了一个js下面，然后对外暴露，好管理，所以还涉及到接口文件代码、vuex和前端拦截器代码

### 4）统一接口代码
```js
import request from '@/utils/request'
export function saveUser1(user){
  return request({
    url: `/user/addUser1/`,
    method: 'post',
    data: user
  })
}

```

### 5）vuex代码实现
在这个里面其实可用的就是关于`secrtMessage`的内容
```js
import {login, logout, getInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    secrtMessage: "",
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_SECRTMESSAGE: (state, secrtMessage) => {
      state.secrtMessage = secrtMessage
    }
  },
  getters: {
    getSecrtMessage: state => {
      return state.secrtMessage;
    }
  },
  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
```
### 6）拦截器代码实现
```js
import axios from 'axios'
import {Message, MessageBox } from 'element-ui'
import store from '../store'
import {getToken} from '@/utils/auth'
import vue from 'vue'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    //从vuex中获取加密后的数据，然后设置到请求头中
     config.headers['secrtMessage'] = store.getters.getSecrtMessage

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
```
<p style="color:red">到此前端代码就结束了，开始后端代码</p>

## 2：springboot后端实现
### 1）导包
```xml
    <dependency>
        <groupId>org.bouncycastle</groupId>
        <artifactId>bcprov-jdk16</artifactId>
        <version>1.46</version>
    </dependency>
```
### 2）加密解密工具类实现
```java
package com.xiaoze.exer.utils;

import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class SecretUtil {
    /***
     * key和iv值需要和前端一致
     */
    public static final String KEY = "xjnx_bizplat_key";

    public static final String IV = "xjnx_bizplat_ivm";

    /**
     * 加密方法
     *
     * @param data 要加密的数据
     * @return 加密的结果
     */
    public static String encrypt(String data) {
        String key = KEY;
        String iv = IV;
        try {
            //"算法/模式/补码方式"NoPadding PkcsPadding
            Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");
            int blockSize = cipher.getBlockSize();

            byte[] dataBytes = data.getBytes();
            int plaintextLength = dataBytes.length;
            if (plaintextLength % blockSize != 0) {
                plaintextLength = plaintextLength + (blockSize - (plaintextLength % blockSize));
            }

            byte[] plaintext = new byte[plaintextLength];
            System.arraycopy(dataBytes, 0, plaintext, 0, dataBytes.length);

            SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), "AES");
            IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());

            cipher.init(Cipher.ENCRYPT_MODE, keyspec, ivspec);
            byte[] encrypted = cipher.doFinal(plaintext);

            return new Base64().encodeToString(encrypted);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 解密方法
     *
     * @param data 要解密的数据
     * @return 解密的结果
     */
    public static String desEncrypt(String data) {
        try {
            String key = KEY;
            String iv = IV;
            byte[] encrypted1 = new Base64().decode(data);

            Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");
            SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(iv.getBytes());
            cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
            byte[] original = cipher.doFinal(encrypted1);
            return new String(original).trim();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
```
### 3）接口调用
```java
    @ApiOperation("添加用户信息加密处理")
    // @CryptoJSRequired
    @PostMapping("/addUser1")
    public R AddUserInfo1(@RequestBody String user){
        //获取请求头中加密的信息
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        System.out.println(request.getHeader("secrtMessage"));

        //将密码进行加密
        return R.ok().message("添加成功");
    }
```
## 3：优化逻辑
:::warning 问题
这样虽然也可以实现，但是我岂不是需要改变逻辑代码，有没有一种方法，就是在不改变逻辑代码的情况下，也可以实现请求头解密的功能？
:::
<p style="color:blue">答案肯定是有的，使用自定义注解 + AOP对方法进行增强。</p>

:::warning 思路实现
- 1：前端代码改变，之前接口传递的是`字符串`，现在也改变成`user空对象`，只是为了‘面子’而已，真实数据在`加密后的请求头`中。
- 2：后端实现`自定义注解`，在需要的接口上面加入注解便可以实现效果。
- 3：AOP中思路是：
  - a：获取请求头中加密的数据，然后进行解密，返回的是一个字符串；
  - b：获取请求的参数类型，此时是一个class数组，然后和User.class去比较，一致的话然后将解密后的字符串转换成对象，然后将对象赋值给模型属性。
:::
### 1）前端改变。

``` js
<script>
import secrt from '../../utils/secrt'
import { saveUser1 } from '../../api/UserRequestApi'

export default {
  name: 'Secrt',
  data() {
    return {
      Pass: "",
      UnPass: "",
      adduserform: {
        userId:'',
        username: '胡昊泽',
        password: '000000',
        sex: true,
        email: '2775194510@qq.com',
        introduction: '无！！！',
        mobile: '189698744785',
        pic: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        school: '.。。。。'
      },
      userform: {
        userId:'12314231',
        username: '',
        password: '',
        sex: true,
        email: '',
        introduction: '',
        mobile: '',
        pic: '',
        school: ''
      },
    }
  },
  created() {

  },
  methods: {
    //添加用户
    addUser(){
      //1：在前端对表单数据进行加密，将加密数据放入请求头中
      // （直接放入vuex中就可以了，然后在请求拦截器中会获取vuex,然后放入请求头中）
      this.$store.commit("SET_SECRTMESSAGE",secrt.encrypt(JSON.stringify(this.adduserform)))
      this.Pass = secrt.encrypt(JSON.stringify(this.adduserform))
      //2.调用后台请求
      saveUser1(this.userform).then(result => {
         // this.UnPass = secrt.decrypt(this.Pass)
        //3.后端返回加密数据，前端进行解密。
        this.UnPass = JSON.parse(secrt.decrypt(result.data.passMessage)).name;
      })
    }
  }
}
</script>
```
### 2）实现自定义注解。
```java
package com.xiaoze.exer.interfaceForMy;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CryptoJSRequired {

}
```
### 3）aop实现
```java
package com.xiaoze.exer.Aspect;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xiaoze.exer.entity.User;
import com.xiaoze.exer.utils.SecretUtil;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.ui.Model;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletRequest;

/**
 * @author 小泽
 * @create 2023-02-13  9:43
 * 记得每天敲代码哦
 */
@Aspect
@Component
@Slf4j
public class CryptoJSRequiredAspect {


    @Pointcut("@annotation(com.xiaoze.exer.interfaceForMy.CryptoJSRequired)")
    public void CryptoJSRequired() {
    }

    @Around("CryptoJSRequired()")
    public Object deAround(ProceedingJoinPoint joinPoint) throws Throwable {
        log.error("------------before-------------");
        // 1:获取请求头中加密的信息
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String secrtMessage = request.getHeader("secrtMessage");
        // 2.对加密信息进行解密
        String unSecrtMessage = SecretUtil.desEncrypt(secrtMessage);

        // getSignature()方法返回一个Signature对象，表示切入点方法的签名信息
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        // getParameterTypes()方法则返回一个Class数组，表示切入点方法的参数类型。（比如string.class,User.class）
        Class<?>[] parameterTypes = signature.getParameterTypes();
        log.error(String.valueOf(parameterTypes));

        Object[] args = joinPoint.getArgs();
        log.error(String.valueOf(args));

        for (Class<?> parameterType : parameterTypes) {
            //将解密出的内容转换成User 类对象
            if(parameterType.equals(User.class)){
                // 3.将解密出的内容转换成对象
                User user = new ObjectMapper().readValue(unSecrtMessage, User.class);
                System.out.println(user);

                // 将User类对象赋值给模型属性
                args[0] = user;
            }
        }
        return joinPoint.proceed(args);
    }

    // @Before("CryptoJSRequired()")
    // public void  doBefore(JoinPoint joinPoint) throws Throwable {
    //     log.error("------------before-------------");
    //     // 1:获取请求头中加密的信息
    //     ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
    //     HttpServletRequest request = attributes.getRequest();
    //     String secrtMessage = request.getHeader("secrtMessage");
    //     // 2.对加密信息进行解密
    //     String unSecrtMessage = SecretUtil.desEncrypt(secrtMessage);
    //     // 3.将解密出的内容转换成对象
    //     MethodSignature signature = (MethodSignature) joinPoint.getSignature();
    //     Class<?>[] parameterTypes = signature.getParameterTypes();
    //     Object[] args = joinPoint.getArgs();
    //     for (Class<?> parameterType : parameterTypes) {
    //         //将解密出的内容转换成User 类对象
    //         if(parameterType.equals(User.class)){
    //             User user = new ObjectMapper().readValue(unSecrtMessage, User.class);
    //             System.out.println(user);
    //
    //             // 将User类对象赋值给模型属性
    //             args[0] = user;
    //         }
    //     }
    // }


    @AfterReturning(returning = "rvt", pointcut = "CryptoJSRequired()")
    public Object doAfterReturning(JoinPoint joinpoint,Object rvt) {
        log.error("------------doAfterReturning-------------");
        // 获取被代理对象
        Object target = joinpoint.getTarget();
        // 获取通知签名  获取方法方法上的DESRespondSecret注解
        MethodSignature signature = (MethodSignature) joinpoint.getSignature();
        try {
            // 获取被代理方法
            Method pointMethod = target.getClass().getMethod(signature.getName(), signature.getParameterTypes());
            // 获取被代理方法上面的注解@DESRespondSecret
            // CryptoJSRequired secret = pointMethod.getAnnotation(CryptoJSRequired.class);
            // 被代理方法上没有，则说明@DESRespondSecret注解在被代理类上
            // if (secret == null) {
            //     secret = target.getClass().getAnnotation(CryptoJSRequired.class);
            // }
            // //类上也没有 直接返回
            // if(secret == null){
            //     return rvt;
            // }
            //System.out.println(pointMethod.getReturnType().equals(R.class));
            //如果返回类型是R，则进行内部数据加密
            if (pointMethod.getReturnType().equals(R.class)) {
                R baseVo1 = (R) rvt;
                // 获取返回值json字符串
                Object data = baseVo1.getData();
                if(null != data){
                    String jsonString = JSON.toJSONString(data);
                    // 加密
                    String s = SecretUtil.encrypt(jsonString);
                    HashMap<String, Object> hashMap = new HashMap<>();
                    hashMap.put("passMessage",s);
                    baseVo1.setData(hashMap);
                }
                return baseVo1;
            }else{
                //这里只可能返回两个信息，一个R，一个异常类，异常类不用加密，直接返回。
                return rvt;
            }

        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
        return rvt;
    }

}
```
### 4）controller层
```java
    @ApiOperation("添加用户信息加密处理")
    @CryptoJSRequired
    @PostMapping("/addUser1")
    public R AddUserInfo1(@RequestBody User user){
        System.out.println("进入方法-------------");
        System.out.println(user);
        return R.ok().message("添加成功").data("name","22222");
    }
```

## 4：补充
### 1）AOP修改接口传递参数。
```java
@Around("LogAspect()")
    public Object deAround(ProceedingJoinPoint joinPoint) throws Throwable {
        //获取目标对象方法参数
        Object[] args = joinPoint.getArgs();
        //遍历参数 修改带有需求字段对象的值 
        for (Object obj : args) {
            try{
                System.out.println(obj .toString());
                Class<?> resultClz = obj .getClass();
                //获取class里的所有字段  父类字段获取不到    
                Field[] fieldInfo = resultClz.getDeclaredFields();
                for (Field field : fieldInfo) {
                    if("参数名".equals(field.getName())){
                    	//成员变量为private,故必须进行此操做
                        field.setAccessible(true);
                        //修改前的值 
                        Object fieldValue = field.get(obj);
                        //修改后的值
                        Integer afterValue = 100;
                        if(afterValue!=null){
                            field.set(obj, afterValue);
                        }
                        break;
                    }
                }

            }catch (Exception e) {  
            	
            }
        }
        return joinPoint.proceed(args);
    }
```



