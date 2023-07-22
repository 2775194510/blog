<template><div><h2 id="_1-maven包大全" tabindex="-1"><a class="header-anchor" href="#_1-maven包大全" aria-hidden="true">#</a> 1：maven包大全</h2>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
         xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd&quot;&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;parent&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
        &lt;version&gt;2.6.11&lt;/version&gt;
        &lt;relativePath/&gt; &lt;!-- lookup parent from repository --&gt;
    &lt;/parent&gt;
    &lt;groupId&gt;com.xiaoze&lt;/groupId&gt;
    &lt;artifactId&gt;exer&lt;/artifactId&gt;
    &lt;version&gt;0.0.1-SNAPSHOT&lt;/version&gt;
    &lt;name&gt;exer&lt;/name&gt;
    &lt;description&gt;exer&lt;/description&gt;


    &lt;properties&gt;
        &lt;java.version&gt;8&lt;/java.version&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;project.reporting.outputEncoding&gt;UTF-8&lt;/project.reporting.outputEncoding&gt;
        &lt;spring-boot.version&gt;2.3.7.RELEASE&lt;/spring-boot.version&gt;
        &lt;mybatis-plus.version&gt;3.4.2&lt;/mybatis-plus.version&gt;
        &lt;fastjson.version&gt;1.2.28&lt;/fastjson.version&gt;
        &lt;json.version&gt;20170516&lt;/json.version&gt;
        &lt;poi.version&gt;3.17&lt;/poi.version&gt;
        &lt;commons-dbutils.version&gt;1.7&lt;/commons-dbutils.version&gt;
    &lt;/properties&gt;


    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;!-- redis --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;!--mybatis-plus 持久层--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.baomidou&lt;/groupId&gt;
            &lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;
            &lt;version&gt;3.4.2&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.baomidou&lt;/groupId&gt;
            &lt;artifactId&gt;mybatis-plus-generator&lt;/artifactId&gt;
            &lt;version&gt;3.4.1&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;!--freemarker模板--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.freemarker&lt;/groupId&gt;
            &lt;artifactId&gt;freemarker&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;!--mysql--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;!-- velocity 模板引擎, Mybatis Plus 代码生成器需要 --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.velocity&lt;/groupId&gt;
            &lt;artifactId&gt;velocity-engine-core&lt;/artifactId&gt;
            &lt;version&gt;2.0&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;!--swagger--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;io.springfox&lt;/groupId&gt;
            &lt;artifactId&gt;springfox-swagger2&lt;/artifactId&gt;
            &lt;version&gt;2.9.2&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;!--swagger ui--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;io.springfox&lt;/groupId&gt;
            &lt;artifactId&gt;springfox-swagger-ui&lt;/artifactId&gt;
            &lt;version&gt;2.9.2&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;!--日期时间工具--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;joda-time&lt;/groupId&gt;
            &lt;artifactId&gt;joda-time&lt;/artifactId&gt;
            &lt;version&gt;2.10.1&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;!--            xls--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.poi&lt;/groupId&gt;
            &lt;artifactId&gt;poi&lt;/artifactId&gt;
            &lt;version&gt;3.17&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;!--            xlsx--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.poi&lt;/groupId&gt;
            &lt;artifactId&gt;poi-ooxml&lt;/artifactId&gt;
            &lt;version&gt;3.17&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;!--            文件上传--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;commons-fileupload&lt;/groupId&gt;
            &lt;artifactId&gt;commons-fileupload&lt;/artifactId&gt;
            &lt;version&gt;1.3.1&lt;/version&gt;
            &lt;exclusions&gt;
                &lt;exclusion&gt;
                    &lt;artifactId&gt;commons-io&lt;/artifactId&gt;
                    &lt;groupId&gt;commons-io&lt;/groupId&gt;
                &lt;/exclusion&gt;
            &lt;/exclusions&gt;
        &lt;/dependency&gt;

        &lt;!--commons-io--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;commons-io&lt;/groupId&gt;
            &lt;artifactId&gt;commons-io&lt;/artifactId&gt;
            &lt;version&gt;2.6&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;!--httpclient--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.httpcomponents&lt;/groupId&gt;
            &lt;artifactId&gt;httpclient&lt;/artifactId&gt;
            &lt;version&gt;4.5.1&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.google.code.gson&lt;/groupId&gt;
            &lt;artifactId&gt;gson&lt;/artifactId&gt;
            &lt;version&gt;2.8.2&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;junit&lt;/groupId&gt;
            &lt;artifactId&gt;junit&lt;/artifactId&gt;
            &lt;version&gt;4.12&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.projectlombok&lt;/groupId&gt;
            &lt;artifactId&gt;lombok&lt;/artifactId&gt;
            &lt;optional&gt;true&lt;/optional&gt;
        &lt;/dependency&gt;


        &lt;!-- spring2.X集成redis所需common-pool2--&gt;
        &lt;!--            &lt;dependency&gt;--&gt;
        &lt;!--                &lt;groupId&gt;org.apache.commons&lt;/groupId&gt;--&gt;
        &lt;!--                &lt;artifactId&gt;commons-pool2&lt;/artifactId&gt;--&gt;
        &lt;!--                &lt;version&gt;2.6.0&lt;/version&gt;--&gt;
        &lt;!--            &lt;/dependency&gt;--&gt;
        &lt;!--七牛云SDK--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.qiniu&lt;/groupId&gt;
            &lt;artifactId&gt;qiniu-java-sdk&lt;/artifactId&gt;
            &lt;version&gt;[7.7.0, 7.7.99]&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;!-- 日期工具栏依赖 --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;joda-time&lt;/groupId&gt;
            &lt;artifactId&gt;joda-time&lt;/artifactId&gt;
            &lt;version&gt;2.10.1&lt;/version&gt;
        &lt;/dependency&gt;



        &lt;!--httpclient--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.httpcomponents&lt;/groupId&gt;
            &lt;artifactId&gt;httpclient&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;!--gson--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.google.code.gson&lt;/groupId&gt;
            &lt;artifactId&gt;gson&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-mail&lt;/artifactId&gt;
            &lt;version&gt;2.7.0&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;!--        引入aop依赖--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-aop&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;!--        引入hutool工具包--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;cn.hutool&lt;/groupId&gt;
            &lt;artifactId&gt;hutool-all&lt;/artifactId&gt;
            &lt;version&gt;5.8.8&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.alibaba&lt;/groupId&gt;
            &lt;artifactId&gt;fastjson&lt;/artifactId&gt;
            &lt;version&gt;1.2.54&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;!--微信模版消息推送三方sdk--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.github.binarywang&lt;/groupId&gt;
            &lt;artifactId&gt;weixin-java-mp&lt;/artifactId&gt;
            &lt;version&gt;3.3.0&lt;/version&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.8.1&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;source&gt;1.8&lt;/source&gt;
                    &lt;target&gt;1.8&lt;/target&gt;
                    &lt;encoding&gt;UTF-8&lt;/encoding&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


