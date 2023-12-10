---
title: 1：cmd打开本地电脑文件
date: 2023-12-10
sidebar: auto
categories:
  - cmd
tags:
  - cmd
---

:::warning cmd命令
`vuepress-theme-reco` 因为每次都要打开不同地方的文件，很麻烦，所以有没有一种方式，我可以在窗口输入不同的数字来打开不同的文件呢？ ~~~ 当然可以的啦！
:::

## 1：创建bat命令脚本

## 2：编写脚本
```shell
Copyright © 小泽
Link: https://hu-haoze.gitee.io/xiaoze-blog/blogs/好玩的东西/cmd命令/1：cmd打开本地电脑文件.html

@chcp 65001 
@echo off
::title
title 小泽的面试资料：

@echo.

@echo. ~获取Java基础，       请输入1:
@echo. ~获取JVM基础，        请输入2:
@echo. ~获取linux基础，      请输入3:
@echo.
@echo. ~获取MySQL基础，      请输入4:
@echo. ~获取redis基础，      请输入5:
@echo. ~获取Spring基础，     请输入6:
@echo. ~获取SpringMVC基础，  请输入7:
@echo.
@echo. ~获取SpringBoot基础， 请输入8:
@echo. ~获取Mybatis基础，    请输入9:
@echo. ~获取git基础，        请输入10:
@echo.
@echo. ~获取SpringCloud基础，请输入11:
@echo. ~获取计算机网络基础， 请输入12:
@echo. ~获取操作系统基础，   请输入13:
@echo.
@echo. ~获取设计模式基础，   请输入14:
@echo.
@echo. -------------------------------------------------------毕业相关------------------------------------------------
@echo. ~打开毕业设计项目，   请输入15:

set /p number=请输入数字：
:loop
if %number%==1 (
    start "" "G:\YouZe\SearchWeek\面试\java"
) else if %number%==2 (
    start "" "G:\YouZe\SearchWeek\面试\JVM"
) else if %number%==3 (
    start "" "G:\YouZe\SearchWeek\面试\Linux"
) else if %number%==4 (
    start "" "G:\YouZe\SearchWeek\面试\MySQL"
) else if %number%==5 (
    start "" "G:\YouZe\SearchWeek\面试\Redis"
) else if %number%==6 (
    start "" "G:\YouZe\SearchWeek\面试\Spring"
) else if %number%==7 (
    start "" "G:\YouZe\SearchWeek\面试\SpringMVC"
) else if %number%==8 (
    start "" "G:\YouZe\SearchWeek\面试\SpringBoot"
) else if %number%==9 (
    start "" "G:\YouZe\SearchWeek\面试\Mybatis"
) else if %number%==10 (
    start "" "G:\YouZe\SearchWeek\面试\git"
) else if %number%==11 (
    start "" "G:\YouZe\SearchWeek\面试\SpringCloud"
) else if %number%==12 (
    start "" "G:\YouZe\SearchWeek\面试\计算机网络"
) else if %number%==13 (
    start "" "G:\YouZe\SearchWeek\面试\操作系统"
) else if %number%==14 (
    start "" "G:\YouZe\SearchWeek\面试\设计模式"
) else if %number%==15 (
    start "" "G:\YouZe\毕设资料\毕业论文"
) 

set /p number=请继续  输入数字：
goto loop
```

