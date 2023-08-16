---
title: 4：SpringBoot统一解决异常处理
date: 2023-7-22
sidebar: auto
keys: 
  - 'c5abde72f7faa2110550fc5a776622a2'
categories:
  - spring
tags:
  - spring工具
  - springboot

author: 胡昊泽
---

## 1：开发背景。

::: warning 开发背景 
今天在企业中学习到了异常处理，企业中处理异常的方法真的是高级。  
模拟了一下企业中是如何实现`异常码`，`异常信息统一管理`。个人感觉真是牛逼！！！  
:::

## 2：开发须知。

> 问题1：我有自己的统一响应类，里面也有错误信息、错误码，为什么还需要这么做？  

 回答1：  
- ①：对于错误信息、错误码，我有可能复用这些信息，那我岂不是每次都需要写，万一每次定义的都不一样（因为我有可能也不知道前辈们写的是什么业务），那又该怎么处理？  
- ②：错误码、错误信息太分散，不容易集中管理。

> 问题2：对于开发人员是不是会复杂很多？  

回答2：  
- ①：对开发人员确实会增加开发量，但是为了整个系统架构设计，可能我们这个项目架构师就是为此设计的。
- ②：复杂其实也不会复杂很多，基本上就三个步骤吧。

> 问题3：具体实现思路？  

回答3：
- ①：首先自定义一个异常`BusinessException`，然后让他继承`RuntimeException`，`BusinessException`中就两个字段，`错误码` 和 `错误信息`。
- ②：异常类中会有一些构造方法，会根据传入的`错误码`，去`exception.properties`中寻找对应的`错误信息`（在这里有个工具类，里面会根据`错误码`去文件中进行寻找） **所以这里需要注意的是：如何加载异常配置文件，并且去里面寻找去匹配？**
- ③：自定义异常基本上实现完成了，然后定义`全局异常处理器`，就是我抛出这个异常了然后做什么操作？
- ④：既然我`统一`要给前端返回相同的`响应模板`，就可以在`全局异常处理器`中去实现这个功能。(之前用的是`统一响应类`返回，但是发现格式好像不正确，不是我想要的，所以更改一下)
- ⑤：**补充**，定义`全局异常响应类`，然后去全局异常处理器中去控制返回格式。


## 3：代码实现
### 1）定义异常 BusinessException
```java
package com.xiaoze.exer.exception;

import cn.hutool.core.util.StrUtil;
import com.xiaoze.exer.enums.CommConstants;
import com.xiaoze.exer.enums.ErrCodeBaseEnum;
import com.xiaoze.exer.utils.ErrorCodeLoadUtil;
import com.xiaoze.exer.utils.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.helpers.MessageFormatter;

/**
 * @author 小泽
 * @create 2023-08-10  11:09
 * 记得每天敲代码哦
 */
@Slf4j
public class BusinessException extends RuntimeException {
    private String code;
    private String errorMsg;

    public BusinessException() {
        super();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public BusinessException(final Throwable cause) {
        super(cause);
        this.code = CommConstants.FAIL_CODE;
        // this.errorMsg = ExceptionUtil.getMessage(cause);
    }

    public BusinessException(ErrCodeBaseEnum errorCode, String... params) {
        super(StrUtil.format(errorCode.getMessage(), params));
        this.code = errorCode.getCode();
        this.errorMsg = errorCode.getMessage();
    }

    public BusinessException(ErrCodeBaseEnum errorCode, Throwable throwable, String... params) {
        super(StrUtil.format(errorCode.getMessage(), params), throwable);
        this.code = errorCode.getCode();
        this.errorMsg = StrUtil.format(errorCode.getMessage(), params);
    }

//    public BusinessException(ResultCode resultCode) {
//        super("{code:" + resultCode.getCode() + ",errorMsg:" + resultCode.getMessage() + "}");
//        this.code = resultCode.getCode();
//        this.errorMsg = resultCode.getMessage();
//    }
//
//    public BusinessException(ResultCode resultCode, Object... params) {
//        super("{code:" + resultCode.getCode() + ",errorMsg:" + MessageFormatter.arrayFormat(resultCode.getMessage(), params).getMessage() + "}");
//        this.code = resultCode.getCode();
//        this.errorMsg = MessageFormatter.arrayFormat(resultCode.getMessage(), params).getMessage();
//    }

    /**
     * 函数一
     *
     * @param code   异常错误码
     * @param params 错误描述占位符
     */
    public BusinessException(String code, String... params) {
        super(code + ":" + StrUtil.format(ErrorCodeLoadUtil.getErrorMsg(code), params));
        this.code = code;
        String message = ErrorCodeLoadUtil.getErrorMsg(code);
        if (StringUtils.isNotEmpty(message)) {
            this.errorMsg = MessageFormatter.arrayFormat(message, params).getMessage();
        } else {
            this.errorMsg = params[0];
        }
    }

    /**
     * 函数二
     *
     * @param errorCode    异常错误码
     * @param errorMessage 异常错误信息
     * @param e            堆栈异常
     */
    public BusinessException(String errorCode, String errorMessage, Throwable e) {
        super(errorCode + ":" + errorMessage, e);
        this.code = errorCode;
        this.errorMsg = errorMessage;
    }


//    public BusinessException(String code, String errorMsg) {
//        super("{code:" + code + ",errorMsg:" + errorMsg + "}");
//        this.code = code;
//        this.errorMsg = errorMsg;
//    }

    public BusinessException(String code, String errorMsg, Object... params) {
        super("{code:" + code + ",errorMsg:" + MessageFormatter.arrayFormat(errorMsg, params).getMessage() + "}");
        this.code = code;
        this.errorMsg = MessageFormatter.arrayFormat(errorMsg, params).getMessage();
    }
}
```
### 2）工具类（加载异常配置文件并根据异常码搜索异常信息）。
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
    private static final String PROPERTIES_FILE = "exception/exception.properties";

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
}
```
### 3）全局异常处理器

统一返回类，（不是异常情况下使用R返回），异常情况下后续已经更改，有一个统一异常响应类。
```java
package com.xiaoze.exer.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
//统一返回结果
public class R {
    @ApiModelProperty(value = "是否成功")
    private Boolean success;

    @ApiModelProperty(value = "返回码")
    private Integer code;

    @ApiModelProperty(value = "返回消息")
    private String message;

    @ApiModelProperty(value = "返回数据")
    private Map<String, Object> data = new HashMap<String, Object>();

    //构造方法私有
    private R(){}

    //成功静态方法
    public static R ok(){
        R resultVo=new R();
        resultVo.setSuccess(true);
        resultVo.setCode(ResultCode.SUCCESS);
        resultVo.setMessage("成功");
        return resultVo;
    }
    //失败静态方法
    public static R error(){
        R resultVo=new R();
        resultVo.setSuccess(false);
        resultVo.setCode(ResultCode.ERROR);
        resultVo.setMessage("失败");
        return resultVo;
    }

    public R success(Boolean success){
        this.setSuccess(success);
        return this;

    }
    public R message(String message){
        this.setMessage(message);
        return this;
    }
    
    public R code(Integer code){
        this.setCode(code);
        return this;
    }
    
    public R data(String key, Object value){
        this.data.put(key,value);
        return this;
    }
    
    public R data(Map<String,Object> map){
        this.setData(map);
        return this;
    }

}

```

成功失败标识
```java
package com.xiaoze.exer.pojo;

public interface ResultCode {
    public static Integer SUCCESS = 20000;

    public static Integer ERROR = 20001;
}
```
异常响应类
```java
package com.xiaoze.exer.pojo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author 小泽
 * @create 2023-08-16  13:15
 * 异常返回类
 * 记得每天敲代码哦
 */
@Data
public class ExceptionResult {
    @ApiModelProperty(value = "返回码")
    private String code;

    @ApiModelProperty(value = "返回消息")
    private String message;

    @ApiModelProperty(value = "异常信息")
    private String exception;
    //失败静态方法
    public static ExceptionResult error(String code,String message){
        ExceptionResult resultVo=new ExceptionResult();
        resultVo.setCode(code);
        resultVo.setMessage(message);
        return resultVo;
    }
}
```

全局异常处理器
```java
package com.xiaoze.exer.ExceptionHandler;



import com.xiaoze.exer.exception.BusinessException;
import com.xiaoze.exer.pojo.R;
import com.xiaoze.exer.utils.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GloablExceptonHandler {

  //指定出现什么异常执行这个方法
   @ExceptionHandler(Exception.class)
   public R error(Exception e){
      e.printStackTrace();  //打印异常。
      return R.error().message(e.getMessage());
   }

    //自定义异常
    @ExceptionHandler(GuliException.class)
    public R error(GuliException e){
       //common服务下 common_utils下面得处理。
        log.error(ExceptionUtil.getMessage(e));
        e.printStackTrace();
        return R.error().code(e.getCode()).message(e.getMsg());
    }

     @ExceptionHandler(BusinessException.class)
    public ExceptionResult error(BusinessException e){
        System.out.println("-----------------------------------------------");
        log.error(ExceptionUtil.getMessage(e));
        e.printStackTrace();
        //封装成为ExceptionResult对象
        ExceptionResult error = ExceptionResult.error(e.getCode(), e.getErrorMsg());
        error.setException(e.getStackTrace()[0].getClassName() + "   >>   方法名称： " + e.getStackTrace()[0].getMethodName() + "   >>   controller层抛出异常位置：  " + e.getStackTrace()[0].getLineNumber());
        System.out.println("-----------------------------------------------");
        return error;
    }
}

```

### 4）controller测试
```java
/**
 * @author 小泽
 * @create 2023-08-10  11:54
 * 记得每天敲代码哦
 */
@RestController
@RequestMapping("/exception")
public class ExceptionController {

    @ApiOperation("异常抛出查询")
    @GetMapping("/test")
    public R exceptionTest() {
        throw new BusinessException("12", "123456");
    }
}
```



