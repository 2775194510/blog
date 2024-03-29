---
title: 15：校验非controller层业务参数
date: 2024-02-20
sidebar: auto
# keys: 
#   - 'c5abde72f7faa2110550fc5a776622a2'
categories:
  - spring
tags:
  - Java
  - springboot

author: 胡昊泽
---

## 1：需求背景

:::warning 需求背景
现在项目中，有两种调用接口的方法，一种是 `controller`层，一种是直接调用 `逻辑流`；  
- `controller` 层是对外暴露时才需要编写的一层，
- `逻辑流` 给自己使用的，比如，后管等服务。  

所以，我现在如果直接调用 `逻辑流`，那么我这个参数校验如何实现呢？  

**如果不符合校验规则的则通过抛出异常的方式去返回**
:::

## 2：前置知识

看注释官方是让我们去看看 `Validator#validate()` 方法，官方让我看我们就去看呗，索性直接看`Validator` 源码：

```java
public interface Validator {

 <T> Set<ConstraintViolation<T>> validate(T object, Class<?>... groups);

 <T> Set<ConstraintViolation<T>> validateProperty(T object,
              String propertyName,
              Class<?>... groups);

 <T> Set<ConstraintViolation<T>> validateValue(Class<T> beanType,
              String propertyName,
              Object value,
              Class<?>... groups);

 BeanDescriptor getConstraintsForClass(Class<?> clazz);

 <T> T unwrap(Class<T> type);

 ExecutableValidator forExecutables();
}
```

> 那Validator是做什么用的呢？

`Validator` 接口 定义了用于 `执行验证` 的方法，用于验证对象的字段值是否符合指定的约束条件。它主要提供了以下几个核心方法：

- `<T> Set<ConstraintViolation<T>> validate(T object, Class<?>... groups)`：
  - 该方法用于验证给定对象是否符合指定的约束条件。
  - 参数 object是要验证的对象，参数 groups可选，表示验证组。
  - 返回一个 Set 集合，**其中包含违反约束条件的 ConstraintViolation 对象。**
- `<T> Set<ConstraintViolation<T>> validateProperty(T object, String propertyName, Class<?>... groups)`：
  - 该方法用于验证给定对象的特定属性是否符合指定的约束条件。
  - 参数 object是要验证的对象，参数 propertyName是属性名，参数 groups可选，表示验证组。
  - 返回一个 Set 集合，其中包含违反约束条件的 ConstraintViolation 对象。
- `<T> Set<ConstraintViolation<T>> validateValue(Class<T> beanType, String propertyName, Object value, Class<?>... groups)`：
  - 该方法用于验证给定属性值是否符合指定的约束条件，而不需要实际创建对象实例。
  - 参数 beanType是对象类型，参数 propertyName是属性名，参数 value是属性值，参数 groups可选，表示验证组。
  - 返回一个 Set 集合，其中包含违反约束条件的 ConstraintViolation 对象。


这些方法能够对 `Java` 对象进行全面的验证，从整个对象级别到单个属性值的验证，都可以通过 `Validator` 接口提供的方法来实现。

## 3：代码实现

### 3.1 编写校验工具类

```java
package com.xiaoze.exer.utils;

import cn.hutool.core.util.StrUtil;
import com.xiaoze.exer.enums.CommErrCodeEnum;
import com.xiaoze.exer.exception.RccbRuntimeException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;


public class ValidatorUtils {
	private static Validator validator;

	static {
		validator = Validation.buildDefaultValidatorFactory().getValidator();
	}

	/**
	 * 校验对象
	 *
	 * @param object 待校验对象
	 * @param groups 待校验的组
	 */
	@Autowired
	public static void validateEntity(Object object, Class<?>... groups) throws RuntimeException {
		Set<ConstraintViolation<Object>> constraintViolations = validator.validate(object, groups);
		if (!constraintViolations.isEmpty()) {
			StringBuilder msg = new StringBuilder();
			String prefix = "";

			for (ConstraintViolation<Object> constraint : constraintViolations) {
				// msg.append(constraint.getMessage()).append("<br>");
				msg.append(prefix + constraint.getMessage() + ";");
			}
			String finlMsg = StrUtil.removeSuffix(msg.toString(), ";");
			throw new RccbRuntimeException(CommErrCodeEnum.ERR_COMM_100006, finlMsg);
		}

		// 只校验集合对象信息
		String finlMsgTmp = "";
		try {
			Field[] declaredFields = object.getClass().getDeclaredFields();
			for (Field field : declaredFields) {
				if (field.isAnnotationPresent(NotNull.class) && field.getType().equals(List.class)) {
					field.setAccessible(true);
					Object fo = field.get(object);
					Object[] arr = null;
					// 如果是集合，循环调用 validObj
					if (fo instanceof Collection) {
						arr = ((Collection) fo).toArray();
						if (null == arr || arr.length <= 0) {
							NotNull notNull = field.getAnnotation(NotNull.class);
							finlMsgTmp += "" + notNull.message() + ";";
							throw new RccbRuntimeException(CommErrCodeEnum.ERR_COMM_100006, finlMsgTmp);

						}
						for (Object o : arr) {
							validObj(o, finlMsgTmp);
						}
					}
				}
			}
		} catch (NoSuchMethodException e) {
			throw new RccbRuntimeException(CommErrCodeEnum.ERR_COMM_100006, "解析异常");
		} catch (InvocationTargetException e) {
			throw new RccbRuntimeException(CommErrCodeEnum.ERR_COMM_100006, "解析异常");
		} catch (IllegalAccessException e) {
			throw new RccbRuntimeException(CommErrCodeEnum.ERR_COMM_100006, "解析异常");
		} catch (RccbRuntimeException e) {
			throw new RccbRuntimeException(e.getCode(), e.getMessage());
		}
	}

	/**
	 * 校验对象
	 *
	 * @param object 待校验对象 @param groups 待校验的组 @throws boolean
	 */
	public static boolean validateEntityBoolean(Object object, Class<?>... groups) {
		Set<ConstraintViolation<Object>> constraintViolations = validator.validate(object, groups);
		if (!constraintViolations.isEmpty()) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * 深度检查非空.
	 *
	 * @param object 需要检查非空的对象.
	 */
	public static void validObj(Object object, String finlMsg)
			throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
		if (StringUtils.isBlank(finlMsg)) {
			finlMsg = "";
		}
		if (null == object) {
			throw new IllegalArgumentException("input 接入参数不能为空");
		}

		String msgprefix = "";

		Field[] declaredFields = object.getClass().getDeclaredFields();

		// 遍历所有属性.
		for (Field field : declaredFields) {
			// 进行必填项判断.
			if (field.isAnnotationPresent(NotNull.class) || field.isAnnotationPresent(NotEmpty.class)) {
				field.setAccessible(true);
				String prefix = "get";
				String name = field.getName();
				Class<?> type = field.getType();
				// 判断布尔类型.
				if (type.isAssignableFrom(Boolean.class)) {
					prefix = "is";
				}

				Object fo = field.get(object);
				Object[] arr = null;
				// 如果是集合，循环调用 validObj
				if (fo instanceof Collection) {
					arr = ((Collection) fo).toArray();
				}

				// 如果是数组，循环调用 validObj
				if (field.getType().isArray()) {
					arr = (Object[]) fo;
				}
				if (null != arr) {
					for (Object o : arr) {
						validObj(o, finlMsg);
					}
				}

				Method method = object.getClass()
						.getMethod(prefix + name.substring(0, 1).toUpperCase() + name.substring(1));

				Object invoke = method.invoke(object);
				if (invoke == null || invoke.equals("")) {
					NotNull notNull = field.getAnnotation(NotNull.class);
					if (notNull != null) {
						finlMsg += msgprefix + notNull.message() + ";";
					}
					NotEmpty notEmpty = field.getAnnotation(NotEmpty.class);
					if (notEmpty != null) {
						finlMsg += msgprefix + notEmpty.message() + ";";
					}
				}

				if (invoke != null && invoke.getClass().isAssignableFrom(ArrayList.class)
						&& ((ArrayList<Object>) invoke).isEmpty()) {
					NotNull notNull = field.getAnnotation(NotNull.class);
					finlMsg += msgprefix + notNull.message() + ";";
				}
			}
		}
		finlMsg = StrUtil.removeSuffix(finlMsg, ";");
		if (StringUtils.isNotBlank(finlMsg)) {
			throw new RccbRuntimeException(CommErrCodeEnum.ERR_COMM_100006, finlMsg);
		}
	}

}
```

### 3.2 异常信息枚举类

```java
package com.xiaoze.exer.enums;

public enum CommErrCodeEnum implements ErrCodeBaseEnum {

    ERR_COMM_100001("MDCOM1100001", "[{}]添加失败", ""),
    ERR_COMM_100002("MDCOM1100002", "[{}]更新失败", ""),
    ERR_COMM_100003("MDCOM1100003", "[{}]删除失败", ""),
    ERR_COMM_100004("MDCOM1100004", "[{}]参数未上传", ""),
    ERR_COMM_100005("MDCOM1100005", "[{}]参数超出有效范围", ""),
    ERR_COMM_100006("MDCOM1100006", "参数校验异常[{}]", ""),
    ERR_COMM_100007("MDCOM1100007", "枚举值校验异常, [{}]不是[{}]的枚举值！", ""),
    ERR_COMM_100008("MDCOM1100008", "[{}]信息已存在", ""),
    ERR_COMM_100009("MDCOM1100007", "[{}]信息不存在", ""),
    ERR_COMM_100010("ERR_COMM_100010", "[{}]信息长度不能超过[{}]位", ""),
    ERR_COMM_100011("ERR_COMM_100011", "[{}]信息长度必须是[{}]位", ""),
    ERR_COMM_100012("MDCOM1100009", "[{}]服务反欺诈校验未通过", "");


    String code;
    String message;
    String remark;

    CommErrCodeEnum(String code, String message, String remark) {
        this.code = code;
        this.message = message;
        this.remark = remark;
    }

    @Override
    public String getCode() {
        return this.code;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    @Override
    public String getRemark() {
        return this.remark;
    }
}
```

### 3.3 异常定义接口

```java
public interface ErrCodeBaseEnum extends Serializable {
       String getCode();

       String getMessage();

       String getRemark();
}
```

### 3.4 异常返回实体类

```java
@Data
public class ExceptionResult {
    @ApiModelProperty(value = "返回码")
    private String code;

    @ApiModelProperty(value = "返回消息")
    private String message;

    @ApiModelProperty(value = "异常信息")
    private String exception;

    //失败静态方法
    public static ExceptionResult error(String code, String message) {
        ExceptionResult resultVo = new ExceptionResult();
        resultVo.setCode(code);
        resultVo.setMessage(message);
        return resultVo;
    }
}
```
### 3.5 异常定义类

```java
public class RccbRuntimeException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    private String code;
    private String errorMsg;

    public RccbRuntimeException(Throwable e) {
        super(ExceptionUtil.getMessage(e), e);
        this.code = CommConstants.FAIL_CODE;
        this.errorMsg = ExceptionUtil.getMessage(e);
    }

    public RccbRuntimeException(String code, String message) {
        super(message);
        this.code = code;
        this.errorMsg = message;
    }

    public RccbRuntimeException(String message) {
        super(message);
        this.code = CommConstants.FAIL_CODE;
        this.errorMsg = message;
    }

    public RccbRuntimeException(String code, String message, Object... params) {
        super(StrUtil.format(message, params));
        this.code = code;
        this.errorMsg = StrUtil.format(message, params);
    }

    public RccbRuntimeException(String messageTemplate, Object... params) {
        super(StrUtil.format(messageTemplate, params));
        this.code = CommConstants.FAIL_CODE;
        this.errorMsg = StrUtil.format(messageTemplate, params);
    }

    public RccbRuntimeException(String message, Throwable throwable) {
        super(message, throwable);
        this.code = CommConstants.FAIL_CODE;
        this.errorMsg = message;
    }

    public RccbRuntimeException(Throwable throwable, String messageTemplate, Object... params) {
        super(StrUtil.format(messageTemplate, params), throwable);
        this.code = CommConstants.FAIL_CODE;
        this.errorMsg = StrUtil.format(messageTemplate, params);
    }

    public RccbRuntimeException(ErrCodeBaseEnum errorCode, String... params) {
        super(StrUtil.format(errorCode.getMessage(), params));
        this.code = errorCode.getCode();
        this.errorMsg = StrUtil.format(errorCode.getMessage(), params);
    }

    public RccbRuntimeException(CommErrCodeEnum errorCode, String... params) {
        super(StrUtil.format(errorCode.getMessage(), params));
        this.code = errorCode.getCode();
        this.errorMsg = StrUtil.format(errorCode.getMessage(), params);
    }

    public RccbRuntimeException(ErrCodeBaseEnum errorCode, Throwable throwable, String... params) {
        super(StrUtil.format(errorCode.getMessage(), params), throwable);
        this.code = errorCode.getCode();
        this.errorMsg = StrUtil.format(errorCode.getMessage(), params);
    }

    public String getCode() {
        return code;
    }

    public String getErrorMsg() {
        return errorMsg;
    }
}

```

### 3.6 异常返回信息

```java
public interface CommConstants {
       String ACTIVITY_TP_START = "start";
       String ACTIVITY_TP_END = "end";
       String ACTIVITY_TP_INVOKE = "invoke";
       String ACTIVITY_EOS_SERVICE = "invokeEOSServic";
       String ACTIVITY_SPRING_SERVICE = "invokeSpring";
       String ACTIVITY_POJO_SERVICE = "invokePojo";
       String SUCESS_CODE = "000000";
       String SUCESS_MSG = "交易成功";
       String FAIL_CODE = "999999";
       String FAIL_MSG = "交易失败";
}
```
### 3.7 异常处理类

```java
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
    public ExceptionResult error(BusinessException e) {
        System.out.println("-----------------------------------------------");
        log.error(ExceptionUtil.getMessage(e));
        e.printStackTrace();
        //封装成为ExceptionResult对象
        ExceptionResult error = ExceptionResult.error(e.getCode(), e.getErrorMsg());
        error.setException(e.getStackTrace()[0].getClassName() + "   >>   方法名称： " + e.getStackTrace()[0].getMethodName() + "   >>   controller层抛出异常位置：  " + e.getStackTrace()[0].getLineNumber());
        System.out.println("-----------------------------------------------");
        return error;
    }

    @ResponseStatus(value = HttpStatus.OK)
    @ExceptionHandler(RccbRuntimeException.class)
    public ExceptionResult rccbRuntimeException(RccbRuntimeException e) {
        // if(e != null) {
        //     log.error(e.getMessage(),e);
        // }
        // ExceptionResult result = new ExceptionResult();
        // RspHead rspHead = new RspHead();
        // rspHead.setCode(e.getCode());
        // rspHead.setMessage(e.getErrorMsg());
        // rspHead.setRspTime(new Date());
        // rspHead.setSvcIp(CommContextUtil.getServerIp());
        // result.setRspHead(rspHead);

//        result.setCode(e.getCode());
//        result.setMessage(e.getErrorMsg());
//        result.setException(e.getClass().getName());

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

### 3.8 测试

```java
	// 参数校验
	ValidatorUtils.validateEntity(input);
```