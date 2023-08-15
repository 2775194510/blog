---
title: 4：springboot整合pdf
date: 2023-8-15
sidebar: auto
categories:
  - spring
tags:
  - Java
  - springboot

author: 胡昊泽
---

## 1: 导入maven包
```xml

        <dependency>
            <groupId>com.itextpdf</groupId>
            <artifactId>itextpdf</artifactId>
            <version>5.5.13</version>
        </dependency>
        <!-- 输出中文，还要引入下面itext-asian.jar包 -->
        <dependency>
            <groupId>com.itextpdf</groupId>
            <artifactId>itext-asian</artifactId>
            <version>5.2.0</version>
        </dependency>
        <dependency>
            <groupId>com.itextpdf.tool</groupId>
            <artifactId>xmlworker</artifactId>
            <version>5.5.13</version>
        </dependency>
        <!-- 需要引入这个包，复杂base64位图片不显示 -->
        <dependency>
            <groupId>org.xhtmlrenderer</groupId>
            <artifactId>flying-saucer-pdf</artifactId>
            <version>9.1.5</version>
            <exclusions>
                <exclusion>
                    <artifactId>bcprov-jdk14</artifactId>
                    <groupId>org.bouncycastle</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.xhtmlrenderer</groupId>
            <artifactId>flying-saucer-pdf-itext5</artifactId>
            <version>9.1.22</version>
        </dependency>
        <dependency>
            <groupId>org.apache.pdfbox</groupId>
            <artifactId>pdfbox</artifactId>
            <version>2.0.8</version>
        </dependency>

        <!-- 设置pdf文件密码，要引入下面bcprov-jdk15on.jar包 -->
        <dependency>
            <groupId>org.bouncycastle</groupId>
            <artifactId>bcprov-jdk16</artifactId>
            <version>1.46</version>
        </dependency>
```

后续用到再写该块得内容。。。