<template><div><h2 id="_1-自定义校验字段注解" tabindex="-1"><a class="header-anchor" href="#_1-自定义校验字段注解" aria-hidden="true">#</a> 1-自定义校验字段注解</h2>
<p>::: warning 需求背景
我需要实现的功能是： 在<code v-pre>字段</code>上面可以加一个<code v-pre>自定义注解</code>，当我这个字段从<code v-pre>数据库</code>中查询出来<code v-pre>BigDecimal</code>该类型为<code v-pre>整数</code>时，我可以默认给它加入<code v-pre>小数点</code>,当然也可以根据需求处理其他类型的值。
:::</p>
<p>具体实现</p>
<h3 id="_1-定义接口" tabindex="-1"><a class="header-anchor" href="#_1-定义接口" aria-hidden="true">#</a> 1：定义接口</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ScaleConvert {
	int value() default 2;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-定义切面类" tabindex="-1"><a class="header-anchor" href="#_2-定义切面类" aria-hidden="true">#</a> 2：定义切面类</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>@Aspect
@Component
public class ScaleConvertAspect {
    /**
     * @annotation 作用与标注了该注解的方法上
     */
    @Pointcut(&quot;@annotation(com.xjrccb.bizplat.facade.annotation.ScaleConvert)&quot;)
    public void pointCutEnableScaleConvert() {
    	
    }
    @AfterReturning(returning=&quot;result&quot;, pointcut=&quot;ScaleConvert()&quot;)
    public Object AfterExec(JoinPoint joinPoint,Object result){
    		result = ScaleConvertUtil.enableScaleConvert(result);
    		return result;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-定义内含方法实现" tabindex="-1"><a class="header-anchor" href="#_3-定义内含方法实现" aria-hidden="true">#</a> 3：定义内含方法实现</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>public class ScaleConvertUtil {
	
	Integer aa = new Integer(0);
	
	private static final Logger log = LoggerFactory.getLogger(ScaleConvertUtil.class);
	
	 public static Object enableScaleConvert(Object model) {
    	EnableScaleConvert annotation = model.getClass().getAnnotation(EnableScaleConvert.class);
    	return model = annotation != null ? scaleConvert(model) : model;
    }
    
	public static Object scaleConvert(Object model){
		try {
			Field[] field = model.getClass().getDeclaredFields();
			for (int i = 0; i &lt; field.length; i++) {
				String name = field[i].getName();
				name = name.substring(0, 1).toUpperCase() + name.substring(1);
				String type = field[i].getGenericType().toString();
				ScaleConvert scaleConvert = field[i].getAnnotation(ScaleConvert.class);
				if (type.equals(&quot;class java.math.BigDecimal&quot;) &amp;&amp; scaleConvert !=null ) {
					int scale = scaleConvert.value();
					Method mg = model.getClass().getMethod(&quot;get&quot;+name, null);
					BigDecimal value = (BigDecimal) mg.invoke(model);
					Method m = model.getClass().getMethod(&quot;set&quot;+name, new Class[] {BigDecimal.class});
					m.invoke(model,new Object[] {NumberUtil.round(value, scale, RoundingMode.DOWN)});
				}
				if (type.equals(&quot;class java.lang.Integer&quot;)) {
					Method mg = model.getClass().getMethod(&quot;get&quot;+name, null);
					Integer value = (Integer) mg.invoke(model);
					value = value == null ? 0 : value;
					
					Method m = model.getClass().getMethod(&quot;set&quot;+name, new Class[] {Integer.class});
					m.invoke(model,new Object[] {value});
				}
				if (type.contains(&quot;java.util.List&quot;)) {
					Method mg = model.getClass().getMethod(&quot;get&quot;+name, null);
					List tmp = (List) mg.invoke(model);
					if(CollectionUtils.isNotEmpty(tmp)) {
						for (int j = 0; j &lt; tmp.size(); j++) {
							Object object = tmp.get(j);
							if (object instanceof BigDecimal) {
							} else {
								enableScaleConvert(object);
							}
						}
					}
				}
				
			}
    	    	} catch (NoSuchMethodException e) {
    		LogUtil.error(log,&quot;处理数值精度方法异常:&quot;+e);
    		throw new RccbRuntimeException(&quot;处理数值精度方法异常&quot;) ;
    	} catch (IllegalAccessException e) {
    		LogUtil.error(log,&quot;处理数值精度非法访问异常:&quot;+e);
    		throw new RccbRuntimeException(&quot;处理数值精度非法访问异常&quot;) ;
    	} catch (IllegalArgumentException e) {
    		LogUtil.error(log,&quot;处理数值精度非法参数异常:&quot;+e);
    		throw new RccbRuntimeException(&quot;处理数值精度非法参数异常&quot;) ;
    	} catch (InvocationTargetException e) {
    		LogUtil.error(log,&quot;处理数值精度调用目标异常:&quot;+e);
    		throw new RccbRuntimeException(&quot;处理数值精度调用目标异常&quot;) ;
    	}
		return model;

	}
    
    public static Object scaleConvert(Object model, int num)
    		throws NoSuchMethodException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
    	
    	Field[] field = model.getClass().getDeclaredFields();
    	for (int i = 0; i &lt; field.length; i++) {
    		String name = field[i].getName();
    		name = name.substring(0, 1).toUpperCase() + name.substring(1);
    		String type = field[i].getGenericType().toString();
    		if (type.equals(&quot;class java.math.BigDecimal&quot;)) {
    			Method mg = model.getClass().getMethod(&quot;get&quot;+name, null);
    			BigDecimal value = (BigDecimal) mg.invoke(model);
    			Method m = model.getClass().getMethod(&quot;set&quot;+name, new Class[] {BigDecimal.class});
    			m.invoke(model,new Object[] {NumberUtil.round(value, num, RoundingMode.DOWN)});
    		}
    		if (type.contains(&quot;java.util.List&quot;)) {
    			Method mg = model.getClass().getMethod(&quot;get&quot;+name, null);
    			List tmp = (List) mg.invoke(model);
    			for (int j = 0; j &lt; tmp.size(); j++) {
    				Object object = tmp.get(j);
    				if (object instanceof BigDecimal) {
    					BigDecimal value = (BigDecimal) object;
    					BigDecimal temp = NumberUtil.round(value, num, RoundingMode.DOWN);
    					tmp.set(j, temp);
    				} else {
    					scaleConvert(object, num);
    				}
    			}
    		}
    		
    	}
    	return model;
    	
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


