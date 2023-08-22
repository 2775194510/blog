---
title: 3：docker安装三方指南
date: 2023-12-28
categories:
  - 运维
tags:
  - docker
---

## 1：安装rabbitmq
### 1）单机部署
#### 1）方式一：在线拉取
下载镜像，[镜像网站](https://registry.hub.docker.com/)
```docker
docker pull rabbitmq:3-management
```

#### 2）方式2：在线拉取
从本地加载

![image-20210423191210349](./assets/image-20210423191210349.png) 
```docker
docker load -i mq.tar
```

#### 3）运行容器
```docker
docker run \
 -e RABBITMQ_DEFAULT_USER=xiaoze \
 -e RABBITMQ_DEFAULT_PASS=123321 \
 --name mq \
 --hostname mq1 \
 -p 15672:15672 \
 -p 5672:5672 \
 -d \
 rabbitmq:3-management
 ```



