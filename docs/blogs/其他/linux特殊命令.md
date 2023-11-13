---
title: 【Linux】2：Linux特殊命令
date: 2023-8-7
sidebar: auto
categories:
  - Linux
tags:
  - Linux
author: 胡昊泽
---


## 1：业务相关
### 1）查询日志高亮
```less
tail -1000f eos-trace.log | perl -pe 's/(AsAccWechatBankImpl|sql)/\e[1;31m$1\e[0m/g'
```


## 2：服务器相关
### 1）查询nginx详细安装信息

> 首先，查找nginx的安装信息
```less
rpm -qa | grep nginx
```

> 然后
```less
rpm -ql nginx-1.14.2-1.el6.ngx.x86_64
```