---
title: 3：SpringBoot统一解决跨域处理
date: 2023-7-22
sidebar: auto
categories:
  - spring
tags:
  - spring工具
  - springboot

author: 胡昊泽
---
## 3：SpringBoot统一解决跨域处理

```java
/**
 * 解决跨域问题
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true)
                .maxAge(3600)
                .allowedHeaders("*");
    }
}
```
