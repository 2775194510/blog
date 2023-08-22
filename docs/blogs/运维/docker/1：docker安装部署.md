---
title: 1：docker安装部署
date: 2023-12-28
categories:
  - 运维
tags:
  - docker
---

## 1：卸载旧版本docker
```bash
yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-selinux \
    docker-engine-selinux \
    docker-engine \
    docker-ce
```
## 2：防火墙
使用以下命令 确认服务器开放了 15672 和 5672 端口
!!!重要 最好先将需要开放的端口号配置好，因为在docker容器运行的情况下去重启防火墙似乎会导致一些问题（未证实）
```linux
开启防火墙 systemctl start firewalld
查看防火墙状态 systemctl status firewalld
查看开放的端口 firewall-cmd --zone=public --list-ports
开放指定端口号 firewall-cmd --zone=public --add-port=8080/tcp --permanent
关闭指定端口号 firewall-cmd --zone=public --remove=8080/tcp --permanent
重启防火墙（开放端口号后重启才能生效） firewall-cmd --reload
永久关闭防火墙 systemctl disable firewalld
暂时关闭防火墙(服务器重启后防火墙又会开启) systemctl stop firewalld
```
## 3：安装docker

### 1）安装yum工具
```bash
yum install -y yum-utils \
           device-mapper-persistent-data \
           lvm2 --skip-broken
```
### 2）更新本地镜像源
```bash
# 设置docker镜像源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo

yum makecache fast
```

### 3）安装docker
```bash
yum install -y docker-ce
```
docker-ce为社区免费版本。稍等片刻，docker即可安装成功。

### 4）启动docker
Docker应用需要用到各种端口，逐一去修改防火墙设置。非常麻烦，因此建议大家直接关闭防火墙！

启动docker前，一定要关闭防火墙后！！
```bash
# 关闭
systemctl stop firewalld
# 禁止开机启动防火墙
systemctl disable firewalld
```
启动
```bash
systemctl start docker  # 启动docker服务

systemctl stop docker  # 停止docker服务

systemctl restart docker  # 重启docker服务

systemctl enable docker.service  # 开机自启

```
### 5）查看版本
```bash
docker -v
```

## 4：安装DockerCompose
### 1）命令下载
```bash
# 安装
curl -L https://github.com/docker/compose/releases/download/1.23.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

### 2）修改文件权限
```bash
chmod +x /usr/local/bin/docker-compose
```
### 3）base自动补全命令
```bash
# 补全命令
curl -L https://raw.githubusercontent.com/docker/compose/1.29.1/contrib/completion/bash/docker-compose > /etc/bash_completion.d/docker-compose
```
如果这里出现错误，需要修改自己的hosts文件：
> echo "199.232.68.133 raw.githubusercontent.com" >> /etc/hosts


