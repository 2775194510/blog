---
title: 2：application.yml.
date: 2023-7-22
sidebar: auto
categories:
  - spring
tags:
  - spring工具
  - springboot

author: 胡昊泽
---
## 2：application.yml.

```yml
#服务端口
spring:
  application:
    name: exer
  mvc:
    pathmatch:
      matching-strategy: 'ANT_PATH_MATCHER '
  mail:
    # 下面这个是QQ邮箱host ， 企业邮箱 : smtp.exmail.qq.com
    host: smtp.qq.com
    # tencent mail port  这个是固定的
    port: 465
    # 你的QQ邮箱
    username: huhaoze0429@qq.com
    # 进入邮箱配置后得到的授权码
    password: fmjlxvxxajtcdfce
    #test-connection: true
    default-encoding: utf-8
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
            required: true
    protocol: smtps
#返回json的全局时间格式
  jackson:
    serialization:
      write-dates-as-timestamps: true
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
#  cloud:
#    nacos:
#      discovery:
#        server-addr: localhost:8848
  profiles:
    active: dev
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/collegestudentsloosechangenetwork?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
    username: root
    password: '010429'
  redis:
    database: 0
    host: localhost
    port: 6379
mybatis-plus:
#  configuration:
#    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  global-config:
    db-config:
      logic-delete-field: deleted # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
    mapper-locations: classpath:com/xiaoze/fraulein/mapper/xml/*.xml

qiniu:
  accessKey: zKhTOqWZCDZenbQ2js2-D-WbFGyicyhTbc3tFFyl
  secretKey:  4VWXeZxfD5isbwdSSTyJ6oEHdi9Mnd7wP1wnGOm8
  bucketName:  collegestudent
  path: xiaozestudy.love
server:
  port: 8085


```
