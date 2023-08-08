---
title: nginx学习
date: 2023-8-8
sidebar: auto
categories:
  - nginx
tags:
  - nginx
author: 胡昊泽
---

[学习地址cnblog](https://www.cnblogs.com/LiuQizhong/p/11757420.html)  
[学习地址csdn](https://blog.csdn.net/weixin_44227063/article/details/121985874?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522169105686716800213067958%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=169105686716800213067958&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~sobaiduend~default-1-121985874-null-null.268^v1^koosearch&utm_term=%E5%B0%9A%E7%A1%85%E8%B0%B7nginx%E6%95%99%E7%A8%8B&spm=1018.2226.3001.4450)
## 一、安装Nginx

### 1、准备工作
 - （1）打开虚拟机，使用远程连接工具连接 linux 操作系统  
 - （2）到 nginx 官网下载软件 [http://nginx.org/](http://nginx.org/)
### 2、开始进行 nginx 安装
（1）安装 pcre 依赖   
 - 第一步 联网下载 pcre 压缩文件依赖  
```linux
wget http://downloads.sourceforge.net/project/pcre/pcre/8.37/pcre-8.37.tar.gz
```
 - 第二步 解压压缩文件  `使用命令 tar –xvf pcre-8.37.tar.gz`  
 - 第三步`./configure` 完成后，回到 `pcre` 目录下执行 `make`，最后执行 `make install`
查看pcre依赖是否安装成功：`pcre-config --version`  
（2）安装 openssl 、zlib 、 gcc 依赖
```linux
yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel
```
（3）安装 nginx  
 使用命令解压  
` ./configure`  
` make && make install`  
进入目录 /usr/local/nginx/sbin/nginx 启动服务  

## 二、Nginx常用命令
进入 nginx 目录中: cd /usr/local/nginx/sbin
### 1、查看 nginx 版本号 
`./nginx -v`

### 2、启动 nginx
`./nginx`

查看是否启动成功：`ps -ef|grep nginx`
### 3、停止 nginx
`./nginx -s stop`

### 4、重新加载 nginx
`./nginx -s reload`

## 三、nginx.conf配置文件
### 1、位置
`vim /usr/local/nginx/conf/nginx.conf`

### 2、配置文件中的内容（包含三部分）
#### （1）全局块：配置服务器整体运行的配置指令
从配置文件开始到 `events` 块之间的内容，主要会设置一些影响 `nginx` 服务器整体运行的配置指令，主要包括配置运行 `Nginx` 服务器的用户（组）、允许生成的 `worker process` 数，进程 `PID` 存放路径、日志存放路径和类型以及配置文件的引入等。   

比如上面第一行配置的：  

这是 Nginx 服务器并发处理服务的关键配置，`worker_processes` 值越大，可以支持的并发处理量也越多，但是会受到硬件、软件等设备的制约

#### （2）events 块：影响 Nginx 服务器与用户的网络连接
`events` 块涉及的指令主要影响 Nginx 服务器与用户的网络连接，常用的设置包括是否开启对多 `work process`下的网络连接进行序列化，是否允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个 `word process` 可以同时支持的最大连接数等。

上述例子就表示每个 `work process` 支持的最大连接数为 **1024**.

这部分的配置对 Nginx 的性能影响较大，在实际中应该灵活配置。
```conf
events {
    worker_connections  1024;
}
```

#### （3）http 块 
这算是 Nginx 服务器配置中最频繁的部分，`代理`、`缓存`和`日志`定义等绝大多数功能和`第三方模块的配置`都在这里。  
需要注意的是：`http` 块也可以包括 `http 全局块`、`server 块`。
示例一：  
```nginx
http {
    include       mime.types;
    default_type  application/json;

    sendfile        on;
    
    keepalive_timeout  65;

    server {
        listen       8080;
        server_name  localhost;
        # 指定前端项目所在的位置
        location / {
            root   html/hmdp;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }


        location /api {  
            default_type  application/json;
            #internal;  
            keepalive_timeout   30s;  
            keepalive_requests  1000;  
            #支持keep-alive  
            proxy_http_version 1.1;  
            rewrite /api(/.*) $1 break;  
            proxy_pass_request_headers on;
            #more_clear_input_headers Accept-Encoding;  
            proxy_next_upstream error timeout;  
            proxy_pass http://127.0.0.1:8081;
            #proxy_pass http://backend;
        }
    }

    upstream backend {
        server 127.0.0.1:8081 max_fails=5 fail_timeout=10s weight=1;
        #server 127.0.0.1:8082 max_fails=5 fail_timeout=10s weight=1;
    }  
}
```
实例二：  
```nginx
http {
    include       mime.types;
    default_type  application/octet-stream;
    client_max_body_size 1024m;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       81;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

  server{
        listen 9001;
        server_name localhost;

        location ~ /eduservice/{
            proxy_pass http://localhost:8001;
        }

        location ~ /eduoss/ {
            proxy_pass http://localhost:8002;
        }
        location ~ /eduvod/ {
            proxy_pass http://localhost:8003;
        }
        location ~ /educms/ {
            proxy_pass http://localhost:8004;
        }
        location ~ /edumsm/ {
            proxy_pass http://localhost:8005;
        }
        location ~ /educenter/ {
            proxy_pass http://localhost:8160;
        }
        location ~ /orderservice/ {
            proxy_pass http://localhost:8007;
        }
        location ~ /staservice/ {
            proxy_pass http://localhost:8008;
        }
        location ~ /admin/ {
            proxy_pass http://localhost:8009;
        }

    }

}
```
①、http 全局块   
http 全局块配置的指令包括文件引入、MIME-TYPE 定义、日志自定义、连接超时时间、单链接请求数上限等。  
②、server 块  
这块和虚拟主机有密切关系，虚拟主机从用户角度看，和一台独立的硬件主机是完全一样的，该技术的产生是为了节省互联网服务器硬件成本。  
每个 http 块可以包括多个 server 块，而每个 server 块就相当于一个虚拟主机。  
而每个 server 块也分为全局 server 块，以及可以同时包含多个 locaton 块。  
全局 server 块
最常见的配置是本虚拟机主机的监听配置和本虚拟主机的名称或 IP 配置。  

location 块  
一个 server 块可以配置多个 location 块。  

这块的主要作用是基于 Nginx 服务器接收到的请求字符串（例如 server_name/uri-string），对虚拟主机名称（也可以是 IP 别名）之外的字符串（例如 前面的 /uri-string）进行匹配，对特定的请求进行处理。地址定向、数据缓存和应答控制等功能，还有许多第三方模块的配置也在这里进行。  