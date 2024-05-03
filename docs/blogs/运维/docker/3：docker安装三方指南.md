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
```shell
docker run \
 -e RABBITMQ_DEFAULT_USER=xiaoze \
 -e RABBITMQ_DEFAULT_PASS=123321 \
 --name rabbitmq \
 --hostname rabbitmq1 \
 -p 15672:15672 \
 -p 5672:5672 \
 -d \
 rabbitmq:3-management
 ```

#### 4）设置开机自启

```shell
docker update rabbitmq --restart=always
```

## 2：安装mysql

### 1）单机部署

#### 1）拉取mysql

```shell
docker pull mysql:8.0
```

#### 2）运行容器

```shell
docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=xiaoze mysql:8.0
```

```shell
docker run -p 3306:3306 --name mysql --restart=always --privileged=true \
-v /usr/local/mysql/log:/var/log/mysql \
-v /usr/local/mysql/data:/var/lib/mysql \
-v /usr/local/mysql/conf:/etc/mysql \
-v /etc/localtime:/etc/localtime:ro \
-e MYSQL_ROOT_PASSWORD=xiaoze -d mysql:8.0
```

#### 3）设置开机自启

```shell
docker update mysql --restart=always
```

## 3：安装redis

### 1）单机部署

#### 1）拉取redis

```shell
docker pull redis:4.0.1
```

#### 2）直接挂载在宿主机

> 用于存储 redis 的持久化数据  
`mkdir -p /usr/local/redis/data`
 
> 用于存储 redis 的配置文件  
`mkdir -p /usr/local/redis/conf`

#### 3）运行容器

```shell
docker run --name redis -p 6379:6379 -v /usr/local/redis/data:/data -v /usr/local/redis/conf/redis.conf:/etc/redis/redis.conf -d redis:4.0.1 redis-server /etc/redis/redis.conf
```

#### 4）设置开机自启

```shell
docker update redis --restart=always
```

#### 5）进入容器内部操作redis

**进入容器内部**
```shell
docker exec -it 0a2b7922fbeb bash
```

输入 `redis-cli` 就可以操作redis客户端了
