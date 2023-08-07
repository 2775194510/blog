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

## 1：查询nginx详细安装信息

> 首先，查找nginx的安装信息
```linux
rpm -qa | grep nginx
```

> 然后
```linux
rpm -ql nginx-1.14.2-1.el6.ngx.x86_64
```