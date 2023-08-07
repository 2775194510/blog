---
title: 4：Nacos注册中心
date: 2023-8-7
sidebar: auto

categories:
  - 后端
tags:
  - sprincloud
---

国内公司一般都推崇阿里巴巴的技术，比如注册中心，SpringCloudAlibaba也推出了一个名为Nacos的注册中心。



[Nacos](https://nacos.io/)是阿里巴巴的产品，现在是[SpringCloud](https://spring.io/projects/spring-cloud)中的一个组件。相比[Eureka](https://github.com/Netflix/eureka)功能更加丰富，在国内受欢迎程度较高。

![image-20210713230444308](./img/image-20210713230444308.png)

## 1.认识和安装Nacos
### 1）Windows安装

开发阶段采用单机安装即可。

#### 1.1.1下载安装包

在Nacos的GitHub页面，提供有下载链接，可以下载编译好的Nacos服务端或者源代码：

GitHub主页：[https://github.com/alibaba/nacos](https://github.com/alibaba/nacos)

GitHub的Release下载页：[https://github.com/alibaba/nacos/releases](https://github.com/alibaba/nacos/releases)

如图：

![image-20210402161102887](./img/image-20210402161102887.png)



本课程采用1.4.1.版本的Nacos，课前资料已经准备了安装包：

![image-20210402161130261](./img/image-20210402161130261.png)

windows版本使用`nacos-server-1.4.1.zip`包即可。



####  1.1.2 解压

将这个包解压到任意非中文目录下，如图：

![image-20210402161843337](./img/image-20210402161843337.png)

目录说明：

- bin：启动脚本
- conf：配置文件



#### 1.1.3 端口配置

Nacos的默认端口是8848，如果你电脑上的其它进程占用了8848端口，请先尝试关闭该进程。

**如果无法关闭占用8848端口的进程**，也可以进入nacos的conf目录，修改配置文件中的端口：

![image-20210402162008280](./img/image-20210402162008280.png)

修改其中的内容：

![image-20210402162251093](./img/image-20210402162251093.png)



#### 1.1.4 启动

启动非常简单，进入bin目录，结构如下：

![image-20210402162350977](./img/image-20210402162350977.png)

然后执行命令即可：

- windows命令：

  ```
  startup.cmd -m standalone
  ```


执行后的效果如图：

![image-20210402162526774](./img/image-20210402162526774.png)



#### 1.1.5 访问

在浏览器输入地址：[http://127.0.0.1:8848/nacos](http://127.0.0.1:8848/nacos)即可：

![image-20210402162630427](./img/image-20210402162630427.png)

默认的账号和密码都是nacos，进入后：

![image-20210402162709515](./img/image-20210402162709515.png)





### 2）Linux安装

Linux或者Mac安装方式与Windows类似。

#### 1.2.1 安装JDK

Nacos依赖于JDK运行，索引Linux上也需要安装JDK才行。

上传jdk安装包：

![image-20210402172334810](./img/image-20210402172334810.png)

上传到某个目录，例如：`/usr/local/`



然后解压缩：

```sh
tar -xvf jdk-8u144-linux-x64.tar.gz
```

然后重命名为java



配置环境变量：

```sh
export JAVA_HOME=/usr/local/java
export PATH=$PATH:$JAVA_HOME/bin
```

设置环境变量：

```sh
source /etc/profile
```

#### 1.2.2 上传安装包

如图：

![image-20210402161102887](./img/image-20210402161102887.png)

也可以直接使用课前资料中的tar.gz：

![image-20210402161130261](./img/image-20210402161130261.png)

上传到Linux服务器的某个目录，例如`/usr/local/src`目录下：

![image-20210402163715580](./img/image-20210402163715580.png)



#### 1.2.3 解压

命令解压缩安装包：

```sh
tar -xvf nacos-server-1.4.1.tar.gz
```

然后删除安装包：

```sh
rm -rf nacos-server-1.4.1.tar.gz
```

目录中最终样式：

![image-20210402163858429](./img/image-20210402163858429.png)

目录内部：

![image-20210402164414827](./img/image-20210402164414827.png)



#### 1.2.4 端口配置

与windows中类似



#### 1.2.5 启动

在nacos/bin目录中，输入命令启动Nacos：

```sh
sh startup.sh -m standalone
```


## 2.服务注册到nacos

Nacos是SpringCloudAlibaba的组件，而SpringCloudAlibaba也遵循SpringCloud中定义的服务注册、服务发现规范。因此使用Nacos和使用Eureka对于微服务来说，并没有太大区别。

主要差异在于：

- 依赖不同
- 服务地址不同


### 1）引入依赖

在cloud-demo父工程的pom文件中的`<dependencyManagement>`中引入SpringCloudAlibaba的依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2.2.6.RELEASE</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

然后在user-service和order-service中的pom文件中引入nacos-discovery依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

> **注意**：不要忘了注释掉eureka的依赖。


### 2）配置nacos地址

在user-service和order-service的application.yml中添加nacos地址：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
```



> **注意**：不要忘了注释掉eureka的地址



### 3）重启

重启微服务后，登录nacos管理页面，可以看到微服务信息：

![image-20210713231439607](./img/image-20210713231439607.png)



## 3.服务分级存储模型

一个**服务**可以有多个**实例**，例如我们的user-service，可以有:

- 127.0.0.1:8081
- 127.0.0.1:8082
- 127.0.0.1:8083

假如这些实例分布于全国各地的不同机房，例如：

- 127.0.0.1:8081，在上海机房
- 127.0.0.1:8082，在上海机房
- 127.0.0.1:8083，在杭州机房

Nacos就将同一机房内的实例 划分为一个**集群**。

也就是说，user-service是服务，一个服务可以包含多个集群，如杭州、上海，每个集群下可以有多个实例，形成分级模型，如图：

![image-20210713232522531](./img/image-20210713232522531.png)



微服务互相访问时，应该尽可能访问同集群实例，因为本地访问速度更快。当本集群内不可用时，才访问其它集群。例如：

![image-20210713232658928](./img/image-20210713232658928.png)

杭州机房内的order-service应该优先访问同机房的user-service。


### 3.1）给user-service配置集群

修改user-service的application.yml文件，添加集群配置：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ # 集群名称
```

重启两个user-service实例后，我们可以在nacos控制台看到下面结果：

![image-20210713232916215](./img/image-20210713232916215.png)



我们再次复制一个user-service启动配置，添加属性：

```sh
-Dserver.port=8083 -Dspring.cloud.nacos.discovery.cluster-name=SH
```

配置如图所示：

![image-20210713233528982](./img/image-20210713233528982.png)



启动UserApplication3后再次查看nacos控制台：

![image-20210713233727923](./img/image-20210713233727923.png)



### 3.2）同集群优先的负载均衡

默认的`ZoneAvoidanceRule`并不能实现根据同集群优先来实现负载均衡。

因此Nacos中提供了一个`NacosRule`的实现，可以优先从同集群中挑选实例。

1）给order-service配置集群信息

修改order-service的application.yml文件，添加集群配置：

```sh
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ # 集群名称
```



2）修改负载均衡规则

修改order-service的application.yml文件，修改负载均衡规则：

```yaml
userservice:
  ribbon:
    NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule # 负载均衡规则 
```



## 4.权重配置

实际部署中会出现这样的场景：

服务器设备性能有差异，部分实例所在机器性能较好，另一些较差，我们希望性能好的机器承担更多的用户请求。

但默认情况下NacosRule是同集群内随机挑选，不会考虑机器的性能问题。



因此，Nacos提供了权重配置来控制访问频率，权重越大则访问频率越高。



在nacos控制台，找到user-service的实例列表，点击编辑，即可修改权重：

![image-20210713235133225](./img/image-20210713235133225.png)

在弹出的编辑窗口，修改权重：

![image-20210713235235219](./img/image-20210713235235219.png)





> **注意**：如果权重修改为0，则该实例永远不会被访问



## 5.环境隔离

Nacos提供了namespace来实现环境隔离功能。

- nacos中可以有多个namespace
- namespace下可以有group、service等
- 不同namespace之间相互隔离，例如不同namespace的服务互相不可见



![image-20210714000101516](./img/image-20210714000101516.png)



### 5.1）创建namespace

默认情况下，所有service、data、group都在同一个namespace，名为public：

![image-20210714000414781](./img/image-20210714000414781.png)



我们可以点击页面新增按钮，添加一个namespace：

![image-20210714000440143](./img/image-20210714000440143.png)



然后，填写表单：

![image-20210714000505928](./img/image-20210714000505928.png)

就能在页面看到一个新的namespace：

![image-20210714000522913](./img/image-20210714000522913.png)



### 5.2）给微服务配置namespace

给微服务配置namespace只能通过修改配置来实现。

例如，修改order-service的application.yml文件：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ
        namespace: 492a7d5d-237b-46a1-a99a-fa8e98e4b0f9 # 命名空间，填ID
```



重启order-service后，访问控制台，可以看到下面的结果：

![image-20210714000830703](./img/image-20210714000830703.png)



![image-20210714000837140](./img/image-20210714000837140.png)

此时访问order-service，因为namespace不同，会导致找不到userservice，控制台会报错：

![image-20210714000941256](./img/image-20210714000941256.png)



## 6.Nacos与Eureka的区别

Nacos的服务实例分为两种l类型：

- 临时实例：如果实例宕机超过一定时间，会从服务列表剔除，默认的类型。

- 非临时实例：如果实例宕机，不会从服务列表剔除，也可以叫永久实例。



配置一个服务实例为永久实例：

```yaml
spring:
  cloud:
    nacos:
      discovery:
        ephemeral: false # 设置为非临时实例
```

Nacos和Eureka整体结构类似，服务注册、服务拉取、心跳等待，但是也存在一些差异：

![image-20210713220104956](./img/image-20210713220104956.png)
![image-20210714001728017](./img/image-20210714001728017.png)

- Nacos与eureka的共同点
  - 都支持服务注册和服务拉取
  - 都支持服务提供者心跳方式做健康检测

### 6.1）标准区别
- Nacos与Eureka的区别
  - Nacos支持服务端主动检测提供者状态：临时实例采用心跳模式，非临时实例采用主动检测模式
  - 临时实例心跳不正常会被剔除，非临时实例则不会被剔除
  - Nacos支持服务列表变更的消息推送模式，服务列表更新更及时
  - Nacos集群默认采用AP方式，当集群中存在非临时实例时，采用CP模式；Eureka采用AP方式

### 6.2）个人理解区别
:::warning 1：在提供者和注册中心之间。  
:::  
  - （1）Eureka中会定时向注册中心发送心跳，如果在短期内没有发送心跳，则就会直接剔除。  
  - （2）Nacos也会向注册中心发送心跳，但是它的频率要比Eureka快。在Nacos中又分为临时实例和非临时实例。如果是临时实例的话，短期内没有发送心跳，则会直接剔除。但是如果是非临时实例长时间宕机，不会直接剔除，并且注册中心会直接主动询问并且等待非临时实例。

:::warning 2：在消费者和注册中心之间。
:::
  - （1）Eureka会定时向注册中心定时拉去服务，如果不主动拉去服务，注册中心不会主动推送。
  - （2）Nacos中注册中心会定时向消费者主动推送信息  ，这样就会保持数据的准时性。



