---
title: 1：SpringBoot拦截器
date: 2023-4-23
sidebar: auto
categories:
  - 后端
tags:
  - springBoot
---

## 1：拦截器的快速入门
使用`拦截器`很简单，只需要两步即可：`定义拦截器`和`配置拦截器`。在配置拦截器中，Spring Boot 2.0 以后的版本和之前的版本有所不同，我会重点讲解一下这里可能出现的坑。

### 1）定义拦截器
定义拦截器，只需要实现 `HandlerInterceptor` 接口。`HandlerInterceptor` 接口是所有自定义拦截器或者 `Spring Boot` 提供的拦截器的鼻祖，所以，首先来了解下该接口。该接口中有三个方法，分别为 `preHandle(……)`、`postHandle(……)` 和 `afterCompletion(……)`。

> 1、preHandle(……) 方法  
  
该方法的执行时机是，当某个 URL 已经匹配到对应的 `Controller` 中的某个方法，且在这个方法执行之前。所以 `preHandle(……)` 方法可以决定是否将请求放行，这是通过返回值来决定的，返回 true 则放行，返回 false 则不会向后执行。

> 2、postHandle(……) 方法    

该方法的执行时机是，当某个 URL 已经匹配到对应的 `Controller` 中的某个方法，且在执行完了该方法，但是在 DispatcherServlet 视图渲染之前。所以在这个方法中有个 `ModelAndView` 参数，可以在此做一些修改动作。  

> 3、afterCompletion(……) 方法  

顾名思义，该方法是在整个请求处理完成后（包括视图渲染）执行，这时做一些资源的清理工作，这个方法只有在 `preHandle(……)` 被成功执行后并且返回 true 才会被执行。
```java
/**
 * 自定义拦截器
 * @author hhz
 * @date 2023/08/15
 */
public class MyInterceptor implements HandlerInterceptor {

    private static final Logger logger = LoggerFactory.getLogger(MyInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Method method = handlerMethod.getMethod();
        String methodName = method.getName();
        logger.info("====拦截到了方法：{}，在该方法执行之前执行====", methodName);
        // 返回 true 才会继续执行，返回 false 则取消当前请求
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        logger.info("执行完方法之后进执行(Controller方法调用之后)，但是此时还没进行视图渲染");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        logger.info("整个请求都处理完咯，DispatcherServlet也渲染了对应的视图咯，此时我可以做一些清理的工作了");
    }
}
```

OK，到此为止，拦截器已经定义完成，接下来就是对该拦截器进行拦截配置。


### 2）配置拦截器
 
 在 `Spring Boot 2.0` 之前，我们都是直接继承 `WebMvcConfigurerAdapter` 类，然后重写 `addInterceptors` 方法来实现拦截器的配置。但是在 `Spring Boot 2.0` 之后，该方法已经被废弃了（当然，也可以继续用），取而代之的是 `WebMvcConfigurationSupport` 方法，如下：
```java
@Configuration
public class MyInterceptorConfig extends WebMvcConfigurationSupport {

    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/**");
        super.addInterceptors(registry);
    }
}
```
在该配置中重写 `addInterceptors` 方法，将我们上面自定义的拦截器添加进去，`addPathPatterns` 方法用来添加要拦截的请求，这里我们拦截所有的请求。

如果使用上面这种配置的话，我们会发现一个缺陷，那就是静态资源被拦截了。可以在 `resources/static/` 目录下放置一个图片资源或者 HTML 文件，之后启动项目直接访问，即可看到无法访问的现象。

也就是说，虽然 `Spring Boot 2.0` 废弃了 `WebMvcConfigurerAdapter`，但是 `WebMvcConfigurationSupport` 又会导致默认的静态资源被拦截，这就需要我们手动将静态资源放开。

如何放开呢？除了在 `MyInterceptorConfig` 配置类中重写 `addInterceptors` 方法，还需要再重写一个方法 `addResourceHandlers`，用来将静态资源放开：
```java
/**
 * 用来指定静态资源不被拦截，否则继承 WebMvcConfigurationSupport 这种方式会导致静态资源无法直接访问
 * @param registry
 */
@Override
protected void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
    super.addResourceHandlers(registry);
}
```
如上配置好之后，重启项目，静态资源也可以正常访问了。如果你是个善于学习或者研究的人，那肯定不会止步于此，没错，上面这种方式的确能解决静态资源无法访问的问题，但是，还有更方便的配置方式。

我们不继承 `WebMvcConfigurationSupport` 类，直接实现 `WebMvcConfigurer` 接口，然后重写 `addInterceptors` 方法，将自定义的拦截器添加进去即可，如下：
```java
@Configuration
public class MyInterceptorConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 实现 WebMvcConfigurer 不会导致静态资源被拦截
        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/**");
    }
}
```
这样就非常方便了，通过实现 `WebMvcConfigure` 接口，使 Spring Boot 默认的静态资源不会拦截。




