<template><div><h2 id="统计方法执行时间注解" tabindex="-1"><a class="header-anchor" href="#统计方法执行时间注解" aria-hidden="true">#</a> 统计方法执行时间注解</h2>
<p>::: warning 需求背景
统计需要测试方法的执行时间。
:::</p>
<p>具体实现</p>
<h3 id="_1-aspectj-aop" tabindex="-1"><a class="header-anchor" href="#_1-aspectj-aop" aria-hidden="true">#</a> 1：AspectJ  AOP</h3>
<h4 id="_1-1-引入aop依赖" tabindex="-1"><a class="header-anchor" href="#_1-1-引入aop依赖" aria-hidden="true">#</a> 1.1 引入AOP依赖</h4>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code>        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-aop&lt;/artifactId&gt;
        &lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-自定义注解" tabindex="-1"><a class="header-anchor" href="#_1-2-自定义注解" aria-hidden="true">#</a> 1.2：自定义注解</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>//统计接口的耗时
@Documented
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
 public @interface UserTimeInterface {
     String methodName() default &quot;&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-3-定义切面类" tabindex="-1"><a class="header-anchor" href="#_1-3-定义切面类" aria-hidden="true">#</a> 1.3：定义切面类</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>@Aspect
@Component
@Slf4j
public class UserTimeAspect {

    //统计请求的处理时间
    ThreadLocal&lt;Long&gt; startTime = new ThreadLocal&lt;&gt;();
    ThreadLocal&lt;Long&gt; endTime = new ThreadLocal&lt;&gt;();

//使用@Pointcut注解定义切入点，即指定注解@UserTimeInterface作为切入点；
    @Pointcut(&quot;@annotation(com.xiaoze.fraulein.interfaceForMy.UserTimeInterface)&quot;)
    public void UserTimeInterface() {
    }
    
//使用@Before注解定义前置通知，即在目标方法执行前执行的方法；
//在前置通知中记录目标方法的名称、参数、请求URL、请求方法等信息，并记录开始时间；
    @Before(&quot;UserTimeInterface()&quot;)
    public void doBefore(JoinPoint joinPoint) throws Throwable {
        // 获取方法的名称
        String methodName = joinPoint.getSignature().getName();
        // 获取方法入参
        Object[] param = joinPoint.getArgs();
        StringBuilder sb = new StringBuilder();
        for (Object o : param) {
            sb.append(o + &quot;;&quot;);
        }
        log.info(&quot;进入《{}》 方法,参数为: {}&quot;, methodName,sb.toString());
        SimpleDateFormat sdf = new SimpleDateFormat(&quot;yyyy-MM-dd HH:mm:ss&quot;);
        startTime.set(System.currentTimeMillis());
        log.error(&quot;方法开始时间:&quot; +sdf.format(startTime.get()));
        //接收到请求，记录请求内容
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        //记录请求的内容
        log.info(&quot;请求URL:&quot; + request.getRequestURL().toString());
        //记录请求的方法
        log.info(&quot;请求METHOD:&quot; + request.getMethod());
    }


//使用@AfterReturning注解定义后置通知，即在目标方法正常执行并返回结果后执行的方法；
//在后置通知中记录返回值、结束时间，并计算方法执行时间。
    @AfterReturning(returning = &quot;ret&quot;, pointcut = &quot;UserTimeInterface()&quot;)
    public void doAfterReturning(Object ret) {
        //处理完请求后，返回内容
        log.info(&quot;方法返回值:&quot; + JSON.toJSONString(ret));
        endTime.set(System.currentTimeMillis());
        SimpleDateFormat sdf = new SimpleDateFormat(&quot;yyyy-MM-dd HH:mm:ss&quot;);
        log.error(&quot;方法结束时间&quot; +sdf.format(endTime.get()));
        log.error(&quot;方法执行时间:&quot; + (endTime.get() - startTime.get())+&quot;毫秒！&quot;);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-4-测试" tabindex="-1"><a class="header-anchor" href="#_1-4-测试" aria-hidden="true">#</a> 1.4：测试</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    @UserTimeInterface(methodName = &quot;/getAllUser/{currentPage}/{pageSize}&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-拦截器实现" tabindex="-1"><a class="header-anchor" href="#_2-拦截器实现" aria-hidden="true">#</a> 2：拦截器实现</h3>
<h4 id="_2-1-创建自定义注解" tabindex="-1"><a class="header-anchor" href="#_2-1-创建自定义注解" aria-hidden="true">#</a> 2.1 创建自定义注解</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface TrackTime {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-创建拦截器" tabindex="-1"><a class="header-anchor" href="#_2-2-创建拦截器" aria-hidden="true">#</a> 2.2 创建拦截器</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>@Slf4j
@Component
public class TrackTimeInterceptor implements HandlerInterceptor {

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    if (handler instanceof HandlerMethod) {
      final HandlerMethod handlerMethod = (HandlerMethod) handler;
      final Method method = handlerMethod.getMethod();
      if (method.isAnnotationPresent(TrackTime.class)) {
        request.setAttribute(&quot;startTime&quot;, System.currentTimeMillis());
      }
    }
    return true;
  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    if (handler instanceof HandlerMethod) {
      final HandlerMethod handlerMethod = (HandlerMethod) handler;
      final Method method = handlerMethod.getMethod();
      if (method.isAnnotationPresent(TrackTime.class)) {
        final long startTime = (long) request.getAttribute(&quot;startTime&quot;);
        log.info(&quot;Method: {}, Time Taken: {}&quot;, method.getName(), System.currentTimeMillis() - startTime);
      }
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-测试" tabindex="-1"><a class="header-anchor" href="#_2-3-测试" aria-hidden="true">#</a> 2.3 测试</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>@RestController
public class TestController {
  @TrackTime
  @GetMapping(&quot;/test&quot;)
  public String test() {
    return &quot;test&quot;;
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-4-配置拦截器" tabindex="-1"><a class="header-anchor" href="#_2-4-配置拦截器" aria-hidden="true">#</a> 2.4 配置拦截器</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Autowired
  private TrackTimeInterceptor trackTimeInterceptor;

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(trackTimeInterceptor);
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


