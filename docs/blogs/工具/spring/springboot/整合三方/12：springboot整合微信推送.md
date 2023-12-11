---
title: 12：springboot整合微信推送
date: 2023-12-11
sidebar: auto
keys: 
  - 'c5abde72f7faa2110550fc5a776622a2'
categories:
  - spring
tags:
  - Java
  - springboot

author: 胡昊泽
---

## 1：环境准备

[公众号申请地址](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)  
 

按照步骤一步一步登录什么就可以了


## 2：模板编写

```shell
{{first.DATA}}   
{{key1.DATA}}  
{{key2.DATA}}
```

## 3：pom.xml
```xml
    <!--微信模版消息推送三方sdk-->
    <dependency>
        <groupId>com.github.binarywang</groupId>
        <artifactId>weixin-java-mp</artifactId>
        <version>3.3.0</version>
    </dependency>
```

## 4：推送公共类

这个里面包括 `微信公众号` 推送 和 `QQ邮箱` 发送，要单独使用就单独拎出来。

```java
package com.xiaoze.collegeserver.config;

import me.chanjar.weixin.mp.api.WxMpInMemoryConfigStorage;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.api.impl.WxMpServiceImpl;
import me.chanjar.weixin.mp.bean.template.WxMpTemplateData;
import me.chanjar.weixin.mp.bean.template.WxMpTemplateMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author 小泽
 * @create 2023-02-23  9:38
 * 记得每天敲代码哦
 */
@Component
public class WxConfig {

       @Autowired
       private QQmail qQmail;

       public void sendMessage(String message){
              //1，配置
              WxMpInMemoryConfigStorage wxStorage = new WxMpInMemoryConfigStorage();
              wxStorage.setAppId("wx6cfa24fbd53f4186");
              wxStorage.setSecret("1abb49badfc1f4ec63694a738660227b");
              WxMpService wxMpService = new WxMpServiceImpl();
              wxMpService.setWxMpConfigStorage(wxStorage);
              //2,推送消息
              WxMpTemplateMessage templateMessage = WxMpTemplateMessage.builder()
                      .toUser("oES_m5qJ5NHtAmtNTM7bcQ2u2_N0")//要推送的用户openid
                      .templateId("qHr3aaFOgLGGsGL-lyJGZpHz-5lRrUqzbNeiwyLDUpc")//模版id
                      .url("https://mail.qq.com/cgi-bin/frame_html?sid=iQdb1M9yw6nyhyJG&target=today")//点击模版消息要访问的网址
                      .build();
              // 3,如果是正式版发送模版消息，这里需要配置你的信息
              SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
              String data = dateFormat.format(new Date());
              //获取当前系统日期
              templateMessage.addData(new WxMpTemplateData("first", data, "#FF00FF"));
              templateMessage.addData(new WxMpTemplateData("key1","您有些东西需要改善哦" , "#c9b395"));
              templateMessage.addData(new WxMpTemplateData("key2","建议："+message , "#094c98"));

              try {
                     wxMpService.getTemplateMsgService().sendTemplateMsg(templateMessage);
                     Boolean flag = qQmail.sendMail(
                             "2775194510@qq.com",
                             "用户反馈提醒",
                             "用户已经给您宝贵的修改意见，请尽快完善！修改意见为：" + message);
              } catch (Exception e) {
                     System.out.println("推送失败：" + e.getMessage());
                     e.printStackTrace();
              }
       }

}
```