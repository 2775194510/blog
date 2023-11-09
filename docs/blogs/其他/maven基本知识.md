---
title: maven基本知识
date: 2023-11-08
categories:
  - 后端
tags:
  - maven
---

## 1：配置文件
`maven` 的配置文件主要有 `settings.xml` 和 `pom.xml` 两个文件。

- 其中在maven安装目录下的settings.xml，如：`D:\Program Files\apache-maven-3.6.3\conf\settings.xml` 是全局配置文件
- 用户目录的 `.m2` 子目录下的 `settings.xml` ，如：`C:\Users\chenxc.m2\settings.xml ` 配置只是针对当前用户的配置文件
- 项目根路径下的 `pom.xml` 主要是对当前项目的配置。  

**局部配置优先于全局配置。 配置优先级从高到低：`pom.xml` > `user settings`  > `global settings`**

## 2：settings.xml 配置详解
### 1）localRepository
该值是此构建系统的本地存储库的路径。默认值为 `${user.home}/.m2/repository`。此元素对于主构建服务器特别有用，允许所有登录用户从公共本地存储库进行构建。
```xml
<localRepository>D:\repository</localRepository>
```
### 2）interactiveMode
表示是否可以和用户交互以获得输入，默认为true。
```xml
<interactiveMode>true</interactiveMode>
```

### 3）offline
表示此构建系统是否应在离线模式下运行，则默认为false。 此元素对于由于网络设置或安全原因而无法连接到远程存储库的构建服务器非常有用。
```xml
<offline>false</offline>
```

### 4）pluginGroups
插件组，该元素包含一个元素列表 `pluginGroup` ，每个元素包含一个 `groupId`。当使用插件且命令行中未提供 `groupId` 时，将搜索该列表。该列表默认包含 `org.apache.maven.plugins和org.codehaus.mojo`。
```xml
<pluginGroups>
    <pluginGroup>org.eclipse.jetty</pluginGroup>
</pluginGroups>
```

### 5）servers
私服服务器配置，配置私服的用户名和密码。配置的私服服务器可以用来发布jar包，与pom 中 `distributionManagement` 标签中配置的仓库ID相互对应。
```xml
<servers>
  <server>
    <id>server001</id>
    <username>my_login</username>
    <password>my_password</password>
    <privateKey>${user.home}/.ssh/id_dsa</privateKey>
    <passphrase>some_passphrase</passphrase>
    <filePermissions>664</filePermissions>
    <directoryPermissions>775</directoryPermissions>
    <configuration></configuration>
  </server>
</servers>
```
- id ：该id与`<distributionManagement>`中`<repository>`元素的`<id>`相匹配（注意不是用户登陆的id）。

如下，在pom文件中设置的`<distributionManagement>`中`<repository>`元素的`<id>`要与settings.xml文件中`<server>`的`<id>`值一致才能匹配的上。

```xml
<distributionManagement>
    <repository>
        <id>server001</id>
        <url>http://121.***.***.51:1481/repository/maven/</url>
    </repository>
</distributionManagement>
```
- username、password：这两元素以一对形式出现，表示向该服务器进行身份验证所需的登录名和密码。

- privateKey、passphrase：与前两个元素一样，指定了一个私钥位置（默认是`${user.home}/.ssh/id_dsa）`以及私钥密码（私钥密码可以没有）。将来 `<passphrase>`和`<password>`元素可能会被提取到外部，但目前它们必须在 `settings.xml` 文件以纯文本的形式声明。

- `filePermissions`、`DirectoryPermissions`：在部署时创建存储库文件或目录时，这些是要使用的权限。每个的合法值都是与 `unix` 文件权限相对应的三位数，例如 664 或 775。

注意：如果您使用私钥`<privateKey>`登录服务器，请确保没有填写`<password>`元素。否则`<privateKey>`将被忽略。

### 6）mirrors
```xml
<mirrors>
  <mirror>
    <id>planetmirror.com</id>
    <name>PlanetMirror Australia</name>
    <url>http://downloads.planetmirror.com/pub/maven2</url>
    <mirrorOf>central</mirrorOf>
  </mirror>
</mirrors>
```
- **id , name**：此镜像的唯一标识符和用户友好的名称。id用于区分镜像元素，并在连接到镜像时从`<servers>`部分选择相应的凭据。
- **url**：该镜像的基本 URL。构建系统将使用此 URL 连接到存储库，而不是原始存储库 URL。
- **mirrorOf**：被镜像的服务器的id。例如，要指向 `Mavencentral`存储库 ( `https://repo.maven.apache.org/maven2/`) 的镜像，请将此元素设置为 `central`。更高级的映射如下：
  - *匹配所有存储库 ID。
  - **external**:*匹配除使用本地主机或基于文件的存储库之外的所有存储库。当您想要排除为集成测试定义的重定向存储库时，可以使用此选项。
  - 从 Maven 3.8.0 开始，`external:http:`*匹配除使用 `localhost` 之外的所有使用 HTTP 的存储库。
  - 可以使用逗号作为分隔符来指定多个存储库，如`repo,repo1 = repo 或 repo1`
  - !可以与上述通配符之一结合使用以排除存储库 ID，如`!repo1`除 `repo1` 之外的所有内容


注意：给定存储库最多可以有一个镜像。换句话说，您无法将单个存储库映射到一组全部定义相同
`<mirrorOf>`值的镜像。Maven 不会聚合镜像，而只是选择第一个匹配项。

### 7）proxies
```xml
<proxies>
  <proxy>
    <id>myproxy</id>
    <active>true</active>
    <protocol>http</protocol>
    <host>proxy.somewhere.com</host>
    <port>8080</port>
    <username>proxyuser</username>
    <password>somepassword</password>
    <nonProxyHosts>*.google.com|ibiblio.org</nonProxyHosts>
  </proxy>
</proxies>
```
- **id**：该代理的唯一标识符。这用于区分`<proxy>`元素。
- **active**：true 如果此代理处于活动状态。这对于声明一组代理很有用，但一次只能有一个代理处于活动状态。
- **protocol**、`host`、`port：protocol://host:port`分别为代理的协议，主机，端口元素。
- **username**、`password`：这些元素以一对形式出现，表示对此代理服务器进行身份验证所需的登录名和密码。
- **nonProxyHosts**：这是不应代理的主机列表。该列表的分隔符由代理服务器指定；例子中使用了竖线分隔符，使用逗号分隔也很常见 


### 8）profiles 
setting.xml文件中的 `<profile>` 是pom中的 `<profile>` 的其中一部分，`<profile>`里包含`<activation>`、 `<repositories>`、`<pluginRepositories>`、`<properties>`这四个主要元素。因为它们关注的是整个构建系统（这就是 `settings.xml` 文件的作用），而不是单个项目对象模型设置。如果一个 `settings.xml` 中的`<profile>`被激活，它的值会覆盖任何其它定义在pom中带有相同id的 `<profile>`。

#### activation
`<activation>`是用来确定该 `<profile>` 是否被激活使用，当 `<profile>` 被激活的时候， `<repositories>`、`<pluginRepositories>`、`<properties>` 这三个元素里的配置才生效。`<activation>` 所以这个元素要至少要和其他三个元素之一同时使用才有意义。

```xml
<profiles>
  <profile>
    <id>test</id>
    <activation>
      <activeByDefault>false</activeByDefault>
      <jdk>1.5</jdk>
      <os>
        <name>Windows XP</name>
        <family>Windows</family>
        <arch>x86</arch>
        <version>5.1.2600</version>
      </os>
      <property>
        <name>mavenVersion</name>
        <value>2.0.3</value>
      </property>
      <file>
        <exists>${basedir}/file2.properties</exists>
        <missing>${basedir}/file1.properties</missing>
      </file>
    </activation>
    ...
  </profile>
</profiles>
```

- **activeByDefault**：`<profile>`默认是否激活的标识
- **jdk**：当运行的java程序的jdk的版本与指定的版本匹配时 `<profile>` 将被激活。如：上面的例子中，当运行的java程序的jdk版本为1.5.0_06时 `<profile>` 将被激活。jdk的版本还支持范围配。 有关支持范围匹配的更多详细信息，请参阅 maven-enforcer-plugin 。
- **os**：该os元素可以定义上面所示的一些操作系统特定属性。 当满足条件时 `<profile>` 将被激活
  - **name**：操作系统的名字匹配则激活该 `<profile>` 。
  - **family**：操作系统所属家族则激活该 `<profile>`。
  - **arch**：操作系统体系结构则激活该 `<profile>`。
  - **version**：操作系统版本则激活该 `<profile>`。
- **property**：如果Maven检测到对应的name=value对的属性（其值可以在pom 中通过`${name}`引用），则`<profile>`将激活。如果值字段是空的，那么存在属性名称字段就会激活 `profile`，如：上面例子中如果存在 `mavenVersion=2.0.3`，那么 `<profile>` 将激活。
- **file**：通过给定的文件存在或丢失来激活 `<profile>`
  - **exists**：如果指定的文件存在，则激活 `<profile>`。
  - **missing**：如果指定的文件不存在，则激活 `<profile>`。


**注意：这多个激活条件的关系是这样的：Maven 3.2.2之前是只要满足其中之一就可以激活该`<profile>`，Maven 3.2.2之后是满足所有才可以激活该`<profile>`。**


#### properties
对应 `<profile>` 的扩展属性列表。可以用来存放一些值。这些值可以在pom文件中的任何地方使用标记 `${X}` 来使用，这里X是指属性的名称（如下例中的 `${user.install}` ）。

```xml
<profiles>
  <profile>
    ...
    <properties>
      <user.install>${user.home}/our-project</user.install>
    </properties>
    ...
  </profile>
</profiles>
```
属性的值有五种不同的形式

- **env.X**: 在一个变量前加上"env."的前缀，会返回一个shell环境变量。例如：env.PATH指代了`$path环境变量（在Windows上是%PATH%）`。
- **project.x**：指代了pom中对应的元素值。例如: `<project><version>1.0</version></project>` 通过 `${project.version}获得version的值` 。
- **settings.x**: 指代了 `settings.xml` 中对应元素的值。例如：`<settings><offline>false</offline></settings>` 通过 `${settings.offline}` 获得`<offline>` 的值。
- **java系统属性** : 所有可通过 `java.lang.System.getProperties()` 获取的属性都能在pom中使用该形式获取，例如 `${java.home}`。
- **x:** 在 `<properties/>` 元素中，或者外部文件中设置，以`${someVar}` 的形式使用。
如果我们想在 `application.peoperties` 文件中引用这个 `user.install` 属性，这里注意引用时要用占位符@
```xml
user.install=@user.install@
```

在springboot工程中只能使用 `@xxx@（xxx为自定义的属性名）`

#### repositories
远程仓库列表，它是Maven用来填充构建系统本地仓库所使用的一组远程仓库列表。

```xml
<profiles>
   <profile>
     ...
     <repositories>
       <repository>
         <id>codehausSnapshots</id>
         <name>Codehaus Snapshots</name>
         <releases>
           <enabled>false</enabled>
           <updatePolicy>always</updatePolicy>
           <checksumPolicy>warn</checksumPolicy>
         </releases>
         <snapshots>
           <enabled>true</enabled>
           <updatePolicy>never</updatePolicy>
           <checksumPolicy>fail</checksumPolicy>
         </snapshots>
         <url>http://snapshots.maven.codehaus.org/maven2</url>
         <layout>default</layout>
       </repository>
     </repositories>
     ...
   </profile>
 </profiles>
```
- **id、name**：远程仓库唯一标识和远程仓库名称
- **releases、snapshots**：如何处理远程仓库里发布版本（releases）和快照版本（snapshots）的下载
  - **enabled**：true或者false表示该仓库是否开启下载某种类型构件（发布版，快照版）。
  - **updatePolicy**：该元素指定更新发生的频率。Maven会比较本地pom 和远程pom 的时间戳。这里的选项是：always（一直），daily（默认，每日），interval：X（这里X是以分钟为单位的时间间隔），或者never（从不）。
  - **checksumPolicy**：当Maven验证构件校验文件失败时该怎么做-ignore（忽略），fail（失败），或者warn（警告）。
- **layout**：在上面对存储库的描述中，提到它们都遵循通用布局。这基本上是正确的。Maven 2 的存储库有一个默认布局；然而，Maven 1.x 有不同的布局。使用此元素指定是default（默认）还是legacy（遗留）。

#### pluginRepositories
插件仓库， Maven plugins是一种特殊的依赖项，与普通的jar包依赖仓库分开定义，结构与repositories类似。具体说明参考如上。

```xml
<profiles>
   <profile>
     ...
     <pluginRepositories>
       <pluginRepository>
         <id>myPluginRepo</id>
         <name>My Plugins repo</name>
         <releases>
           <enabled>true</enabled>
         </releases>
         <snapshots>
           <enabled>false</enabled>
         </snapshots>
         <url>https://maven-central-eu....com/maven2/</url>
       </pluginRepository>
     </pluginRepositories>
     ...
   </profile>
 </profiles>
```

### 9）activeProfiles
它包含一组 `<activeProfile>` 元素，每个元素的值都是一个 `<profile>` 中 `<id>` 里的值。无论任何环境设置如何，`<activeProfile>` 定义的任何 `<profile>` 都将处于活动状态。如果没有找到匹配的配置文件，则不会发生任何事情。和 `<activation>`  配置相比 `<activeProfiles>` 配置比较简单，也比较常用。
```xml
<activeProfiles>
  <activeProfile>env-test</activeProfile>
</activeProfiles>
```
## 3：pom.xml配置文件：
```xml
<parent>
    <!--父项目的构件标识符 -->
    <artifactId />
    <!--父项目的唯一标识符 -->
    <groupId />
    <!--父项目的版本 -->
    <version />
    <!-- 父项目的pom.xml文件的相对路径。
    默认值是../pom.xml。
    Maven首先在构建当前项目的地方寻找父项目的pom，其次在文件系统的这个位置（relativePath位置），然后在本地仓库，最后在远程仓库寻找父项目的pom。 
    注意：如果在父项目中通过<modules>指定了子模块，且子模块在父项目目录下，则不需要指定此配置。如果子项目不在父项目的目录下，应该指定此配置。
    -->
    <relativePath>../pom.xml</relativePath>
</parent>

<!-- 模型版本 -->
<modelVersion>4.0.0</modelVersion>
<!-- 公司或者组织的唯一标志-->
<groupId>com.companyname.project-group</groupId>
<!-- 项目的唯一ID->
<artifactId>project</artifactId>
<!-- 版本号 -->
<version>1.0</version>

<!--项目产生的构件类型，例如jar、war、ear、pom -->
<packaging>jar</packaging>

<!-- 属性配置 -->
<properties>
    <!-- 编译时的编码 -->
    <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
    <spring-boot.version>2.3.7.RELEASE</spring-boot.version>
</properties>
<!-- 依赖配置 -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
        <version>${spring-boot.version}</version>
        <scope>compile</scope>
    </dependency>
</dependencies>
<!-- 依赖声明，不会真正引入包。一般在父pom中进行声明，在子pom中真正引入 -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-core</artifactId>
            <version>${hutool.version}</version>
        </dependency>
    </dependencies>
</dependencyManagement>     

<!-- 编译构建相关配置 -->
<build>
    <!-- 插件申明，一般在父pom中声明，在子pom中真正引入 -->
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>${spring-boot.version}</version>
            </plugin>
        </plugins>
    </pluginManagement>
    <!-- 插件引入，在父pom中引入以后，所有子pom中都会引入 -->
    <plugins>
        <plugin>
            <groupId>org.sonarsource.scanner.maven</groupId>
            <artifactId>sonar-maven-plugin</artifactId>
            <version>3.6.0.1398</version>
        </plugin>
    </plugins>
</build>       

<!-- 针对当前项目的远程仓库配置 -->
<repositories>
    <repository>
        <id>aliyun-public</id>
        <url>https://maven.aliyun.com/repository/public</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </repository>
</repositories>
<!-- 针对当前项目的远程插件仓库配置 -->
<pluginRepositories>
    <pluginRepository>
        <id>aliyun-public</id>
        <url>https://maven.aliyun.com/repository/public</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
        <releases>
            <enabled>true</enabled>
        </releases>
    </pluginRepository>
</pluginRepositories>

<!--jar包发布私服配置-->
<distributionManagement>
	<!--发布版本-->
    <repository>
        <!-- 此ID和setting.xml 中server中配置的服务器进行对应 -->
        <id>maven-releases</id>
        <name>releases</name>
        <url>http://nexus.maven.cn/repository/maven-releases/</url>
        <uniqueVersion>true</uniqueVersion>
    </repository>
    <!--快照版本-->
    <snapshotRepository>
        <id>maven-snapshots</id>
        <name>snapshots</name>
        <url>http://nexus.maven.cn/repository/maven-snapshots/</url>
    </snapshotRepository>
</distributionManagement>

<!--动态构建配置，通过设置活动的profile，profile中的配置会作用于当前的项目编译构建 -->
<profiles>
    <profile>
        <id>dev</id>
        <properties>
            <spring.profiles.active>dev</spring.profiles.active>
        </properties>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
    </profile>
    <profile>
        <id>prod</id>
        <properties>
            <spring.profiles.active>prod</spring.profiles.active>
        </properties>
    </profile>
</profiles>
```

## 4：远程仓库的加载
maven仓库依赖下载顺序：

- 在 `settings.xml` 文件中配置的本地仓库中寻找依赖，没找到则进入第2步。

- 在 `settings.xml` 文件中配置的全局远程仓库中寻找，没找到则进入第3步。

- 在当前项目的 `pom.xml` 中配置的远程仓库中寻找，如果没找到则进入第4步。

- 在中央仓库 `https://repo.maven.apache.org/maven2` 中寻找，如果没找到则抛出依赖无法加载异常。











