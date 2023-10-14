(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1063:function(s,t,a){"use strict";a.r(t);var e=a(1),n=Object(e.a)({},(function(){var s=this,t=s._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"_1-认识微服务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-认识微服务"}},[s._v("#")]),s._v(" 1.认识微服务")]),s._v(" "),t("h3",{attrs:{id:"_1-1-单体架构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-单体架构"}},[s._v("#")]),s._v(" 1.1.单体架构")]),s._v(" "),t("p",[t("strong",[s._v("单体架构")]),s._v("：将业务的所有功能集中在一个项目中开发，打成一个包部署。")]),s._v(" "),t("p",[t("img",{attrs:{src:a(724),alt:"image-20210713202807818"}})]),s._v(" "),t("p",[s._v("单体架构的优缺点如下：")]),s._v(" "),t("p",[t("strong",[s._v("优点：")])]),s._v(" "),t("ul",[t("li",[s._v("架构简单")]),s._v(" "),t("li",[s._v("部署成本低")])]),s._v(" "),t("p",[t("strong",[s._v("缺点：")])]),s._v(" "),t("ul",[t("li",[s._v("耦合度高（维护困难、升级困难）")])]),s._v(" "),t("h3",{attrs:{id:"_1-2-分布式架构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-分布式架构"}},[s._v("#")]),s._v(" 1.2.分布式架构")]),s._v(" "),t("p",[t("strong",[s._v("分布式架构")]),s._v("：根据业务功能对系统做拆分，每个业务功能模块作为独立项目开发，称为一个服务。")]),s._v(" "),t("p",[t("img",{attrs:{src:a(725),alt:"image-20210713203124797"}})]),s._v(" "),t("p",[s._v("分布式架构的优缺点：")]),s._v(" "),t("p",[t("strong",[s._v("优点：")])]),s._v(" "),t("ul",[t("li",[s._v("降低服务耦合")]),s._v(" "),t("li",[s._v("有利于服务升级和拓展")])]),s._v(" "),t("p",[t("strong",[s._v("缺点：")])]),s._v(" "),t("ul",[t("li",[s._v("服务调用关系错综复杂")])]),s._v(" "),t("p",[s._v("分布式架构虽然降低了服务耦合，但是服务拆分时也有很多问题需要思考：")]),s._v(" "),t("ul",[t("li",[s._v("服务拆分的粒度如何界定？")]),s._v(" "),t("li",[s._v("服务之间如何调用？")]),s._v(" "),t("li",[s._v("服务的调用关系如何管理？")])]),s._v(" "),t("p",[s._v("人们需要制定一套行之有效的标准来约束分布式架构。")]),s._v(" "),t("h3",{attrs:{id:"_1-3-微服务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-微服务"}},[s._v("#")]),s._v(" 1.3.微服务")]),s._v(" "),t("p",[s._v("微服务的架构特征：")]),s._v(" "),t("ul",[t("li",[s._v("单一职责：微服务拆分粒度更小，每一个服务都对应唯一的业务能力，做到单一职责")]),s._v(" "),t("li",[s._v("自治：团队独立、技术独立、数据独立，独立部署和交付")]),s._v(" "),t("li",[s._v("面向服务：服务提供统一标准的接口，与语言和技术无关")]),s._v(" "),t("li",[s._v("隔离性强：服务调用做好隔离、容错、降级，避免出现级联问题")])]),s._v(" "),t("p",[t("img",{attrs:{src:a(726),alt:"image-20210713203753373"}})]),s._v(" "),t("p",[s._v("微服务的上述特性其实是在给分布式架构制定一个标准，进一步降低服务之间的耦合度，提供服务的独立性和灵活性。做到高内聚，低耦合。")]),s._v(" "),t("p",[s._v("因此，可以认为"),t("strong",[s._v("微服务")]),s._v("是一种经过良好架构设计的"),t("strong",[s._v("分布式架构方案")]),s._v(" 。")]),s._v(" "),t("p",[s._v("但方案该怎么落地？选用什么样的技术栈？全球的互联网公司都在积极尝试自己的微服务落地方案。")]),s._v(" "),t("p",[s._v("其中在Java领域最引人注目的就是SpringCloud提供的方案了。")]),s._v(" "),t("h3",{attrs:{id:"_1-4-springcloud"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-springcloud"}},[s._v("#")]),s._v(" 1.4.SpringCloud")]),s._v(" "),t("p",[s._v("SpringCloud是目前国内使用最广泛的微服务框架。官网地址：https://spring.io/projects/spring-cloud。")]),s._v(" "),t("p",[s._v("SpringCloud集成了各种微服务功能组件，并基于SpringBoot实现了这些组件的自动装配，从而提供了良好的开箱即用体验。")]),s._v(" "),t("p",[s._v("其中常见的组件包括：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(727),alt:"image-20210713204155887"}})]),s._v(" "),t("p",[s._v("另外，SpringCloud底层是依赖于SpringBoot的，并且有版本的兼容关系，如下：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(728),alt:"image-20210713205003790"}})]),s._v(" "),t("p",[s._v("我们课堂学习的版本是 Hoxton.SR10，因此对应的SpringBoot版本是2.3.x版本。")]),s._v(" "),t("h3",{attrs:{id:"_1-5-总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-5-总结"}},[s._v("#")]),s._v(" 1.5.总结")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("单体架构：简单方便，高度耦合，扩展性差，适合小型项目。例如：学生管理系统")])]),s._v(" "),t("li",[t("p",[s._v("分布式架构：松耦合，扩展性好，但架构复杂，难度大。适合大型互联网项目，例如：京东、淘宝")])]),s._v(" "),t("li",[t("p",[s._v("微服务：一种良好的分布式架构方案")]),s._v(" "),t("p",[s._v("①优点：拆分粒度更小、服务更独立、耦合度更低")]),s._v(" "),t("p",[s._v("②缺点：架构非常复杂，运维、监控、部署难度提高")])]),s._v(" "),t("li",[t("p",[s._v("SpringCloud是微服务架构的一站式解决方案，集成了各种优秀微服务功能组件")])])]),s._v(" "),t("h2",{attrs:{id:"_2-服务拆分和远程调用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-服务拆分和远程调用"}},[s._v("#")]),s._v(" 2.服务拆分和远程调用")]),s._v(" "),t("p",[s._v("任何分布式架构都离不开服务的拆分，微服务也是一样。")]),s._v(" "),t("h3",{attrs:{id:"_2-1-服务拆分原则"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-服务拆分原则"}},[s._v("#")]),s._v(" 2.1.服务拆分原则")]),s._v(" "),t("p",[s._v("这里我总结了微服务拆分时的几个原则：")]),s._v(" "),t("ul",[t("li",[s._v("不同微服务，不要重复开发相同业务")]),s._v(" "),t("li",[s._v("微服务数据独立，不要访问其它微服务的数据库")]),s._v(" "),t("li",[s._v("微服务可以将自己的业务暴露为接口，供其它微服务调用")])]),s._v(" "),t("p",[t("img",{attrs:{src:a(729),alt:"image-20210713210800950"}})]),s._v(" "),t("h3",{attrs:{id:"_2-2-服务拆分示例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-服务拆分示例"}},[s._v("#")]),s._v(" 2.2.服务拆分示例")]),s._v(" "),t("p",[s._v("以课前资料中的微服务cloud-demo为例，其结构如下：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(730),alt:"image-20210713211009593"}})]),s._v(" "),t("p",[s._v("cloud-demo：父工程，管理依赖")]),s._v(" "),t("ul",[t("li",[s._v("order-service：订单微服务，负责订单相关业务")]),s._v(" "),t("li",[s._v("user-service：用户微服务，负责用户相关业务")])]),s._v(" "),t("p",[s._v("要求：")]),s._v(" "),t("ul",[t("li",[s._v("订单微服务和用户微服务都必须有各自的数据库，相互独立")]),s._v(" "),t("li",[s._v("订单服务和用户服务都对外暴露Restful的接口")]),s._v(" "),t("li",[s._v("订单服务如果需要查询用户信息，只能调用用户服务的Restful接口，不能查询用户数据库")])]),s._v(" "),t("h4",{attrs:{id:"_2-2-1-导入sql语句"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-1-导入sql语句"}},[s._v("#")]),s._v(" 2.2.1.导入Sql语句")]),s._v(" "),t("p",[s._v("首先，将课前资料提供的"),t("code",[s._v("cloud-order.sql")]),s._v("和"),t("code",[s._v("cloud-user.sql")]),s._v("导入到mysql中：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(731),alt:"image-20210713211417049"}})]),s._v(" "),t("p",[s._v("cloud-user表中初始数据如下：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(732),alt:"image-20210713211550169"}})]),s._v(" "),t("p",[s._v("cloud-order表中初始数据如下：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(733),alt:"image-20210713211657319"}})]),s._v(" "),t("p",[s._v("cloud-order表中持有cloud-user表中的id字段。")]),s._v(" "),t("h4",{attrs:{id:"_2-2-2-导入demo工程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-2-导入demo工程"}},[s._v("#")]),s._v(" 2.2.2.导入demo工程")]),s._v(" "),t("p",[s._v("用IDEA导入课前资料提供的Demo：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(734),alt:"image-20210713211814094"}})]),s._v(" "),t("p",[s._v("项目结构如下：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(735),alt:"image-20210713212656887"}})]),s._v(" "),t("p",[s._v("导入后，会在IDEA右下角出现弹窗：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(736),alt:"image-20210713212349272"}})]),s._v(" "),t("p",[s._v("点击弹窗，然后按下图选择：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(737),alt:"image-20210713212336185"}})]),s._v(" "),t("p",[s._v("会出现这样的菜单：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(738),alt:"image-20210713212513324"}})]),s._v(" "),t("p",[s._v("配置下项目使用的JDK：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(739),alt:"image-20210713220736408"}})]),s._v(" "),t("h3",{attrs:{id:"_2-3-实现远程调用案例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-实现远程调用案例"}},[s._v("#")]),s._v(" 2.3.实现远程调用案例")]),s._v(" "),t("p",[s._v("在order-service服务中，有一个根据id查询订单的接口：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(740),alt:"image-20210713212749575"}})]),s._v(" "),t("p",[s._v("根据id查询订单，返回值是Order对象，如图：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(741),alt:"image-20210713212901725"}})]),s._v(" "),t("p",[s._v("其中的user为null")]),s._v(" "),t("p",[s._v("在user-service中有一个根据id查询用户的接口：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(742),alt:"image-20210713213146089"}})]),s._v(" "),t("p",[s._v("查询的结果如图：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(743),alt:"image-20210713213213075"}})]),s._v(" "),t("h4",{attrs:{id:"_2-3-1-案例需求"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-1-案例需求"}},[s._v("#")]),s._v(" 2.3.1.案例需求：")]),s._v(" "),t("p",[s._v("修改order-service中的根据id查询订单业务，要求在查询订单的同时，根据订单中包含的userId查询出用户信息，一起返回。")]),s._v(" "),t("p",[t("img",{attrs:{src:a(744),alt:"image-20210713213312278"}})]),s._v(" "),t("p",[s._v("因此，我们需要在order-service中 向user-service发起一个http的请求，调用http://localhost:8081/user/{userId}这个接口。")]),s._v(" "),t("p",[s._v("大概的步骤是这样的：")]),s._v(" "),t("ul",[t("li",[s._v("注册一个RestTemplate的实例到Spring容器")]),s._v(" "),t("li",[s._v("修改order-service服务中的OrderService类中的queryOrderById方法，根据Order对象中的userId查询User")]),s._v(" "),t("li",[s._v("将查询的User填充到Order对象，一起返回")])]),s._v(" "),t("h4",{attrs:{id:"_2-3-2-注册resttemplate"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-2-注册resttemplate"}},[s._v("#")]),s._v(" 2.3.2.注册RestTemplate")]),s._v(" "),t("p",[s._v("首先，我们在order-service服务中的OrderApplication启动类中，注册RestTemplate实例：")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("package")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("cn"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("itcast"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("order")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token import"}},[t("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("org"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("mybatis"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("spring"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("annotation"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MapperScan")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token import"}},[t("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("org"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("springframework"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("boot"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SpringApplication")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token import"}},[t("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("org"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("springframework"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("boot"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("autoconfigure"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SpringBootApplication")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token import"}},[t("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("org"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("springframework"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("context"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("annotation"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Bean")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token import"}},[t("span",{pre:!0,attrs:{class:"token namespace"}},[s._v("org"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("springframework"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("web"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("client"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")])]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RestTemplate")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@MapperScan")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"cn.itcast.order.mapper"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@SpringBootApplication")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("OrderApplication")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("main")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("String")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" args"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SpringApplication")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("run")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("OrderApplication")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" args"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Bean")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RestTemplate")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("restTemplate")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("RestTemplate")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br")])]),t("h4",{attrs:{id:"_2-3-3-实现远程调用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-3-实现远程调用"}},[s._v("#")]),s._v(" 2.3.3.实现远程调用")]),s._v(" "),t("p",[s._v("修改order-service服务中的cn.itcast.order.service包下的OrderService类中的queryOrderById方法：")]),s._v(" "),t("p",[t("img",{attrs:{src:a(745),alt:"image-20210713213959569"}})]),s._v(" "),t("h3",{attrs:{id:"_2-4-提供者与消费者"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-提供者与消费者"}},[s._v("#")]),s._v(" 2.4.提供者与消费者")]),s._v(" "),t("p",[s._v("在服务调用关系中，会有两个不同的角色：")]),s._v(" "),t("p",[t("strong",[s._v("服务提供者")]),s._v("：一次业务中，被其它微服务调用的服务。（提供接口给其它微服务）")]),s._v(" "),t("p",[t("strong",[s._v("服务消费者")]),s._v("：一次业务中，调用其它微服务的服务。（调用其它微服务提供的接口）")]),s._v(" "),t("p",[t("img",{attrs:{src:a(746),alt:"image-20210713214404481"}})]),s._v(" "),t("p",[s._v("但是，服务提供者与服务消费者的角色并不是绝对的，而是相对于业务而言。")]),s._v(" "),t("p",[s._v("如果服务A调用了服务B，而服务B又调用了服务C，服务B的角色是什么？")]),s._v(" "),t("ul",[t("li",[s._v("对于A调用B的业务而言：A是服务消费者，B是服务提供者")]),s._v(" "),t("li",[s._v("对于B调用C的业务而言：B是服务消费者，C是服务提供者")])]),s._v(" "),t("p",[s._v("因此，服务B既可以是服务提供者，也可以是服务消费者。")])])}),[],!1,null,null,null);t.default=n.exports},724:function(s,t,a){s.exports=a.p+"assets/img/image-20210713202807818.7ca2e0e8.png"},725:function(s,t,a){s.exports=a.p+"assets/img/image-20210713203124797.ea41782e.png"},726:function(s,t,a){s.exports=a.p+"assets/img/image-20210713203753373.bf4a4b52.png"},727:function(s,t,a){s.exports=a.p+"assets/img/image-20210713204155887.c2272f44.png"},728:function(s,t,a){s.exports=a.p+"assets/img/image-20210713205003790.f2ae905c.png"},729:function(s,t,a){s.exports=a.p+"assets/img/image-20210713210800950.809884ea.png"},730:function(s,t,a){s.exports=a.p+"assets/img/image-20210713211009593.d4fc004c.png"},731:function(s,t,a){s.exports=a.p+"assets/img/image-20210713211417049.615ba507.png"},732:function(s,t,a){s.exports=a.p+"assets/img/image-20210713211550169.1d17cdb7.png"},733:function(s,t,a){s.exports=a.p+"assets/img/image-20210713211657319.b977bf99.png"},734:function(s,t,a){s.exports=a.p+"assets/img/image-20210713211814094.693cf885.png"},735:function(s,t,a){s.exports=a.p+"assets/img/image-20210713212656887.605ea50d.png"},736:function(s,t){s.exports="data:image/png;base64,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"},737:function(s,t,a){s.exports=a.p+"assets/img/image-20210713212336185.d099c550.png"},738:function(s,t,a){s.exports=a.p+"assets/img/image-20210713212513324.8ebc08f6.png"},739:function(s,t,a){s.exports=a.p+"assets/img/image-20210713220736408.87d18778.png"},740:function(s,t,a){s.exports=a.p+"assets/img/image-20210713212749575.27d16743.png"},741:function(s,t,a){s.exports=a.p+"assets/img/image-20210713212901725.dccdc0e1.png"},742:function(s,t,a){s.exports=a.p+"assets/img/image-20210713213146089.296f386c.png"},743:function(s,t,a){s.exports=a.p+"assets/img/image-20210713213213075.25998742.png"},744:function(s,t,a){s.exports=a.p+"assets/img/image-20210713213312278.e205f616.png"},745:function(s,t,a){s.exports=a.p+"assets/img/image-20210713213959569.dd3a1896.png"},746:function(s,t,a){s.exports=a.p+"assets/img/image-20210713214404481.0c321504.png"}}]);