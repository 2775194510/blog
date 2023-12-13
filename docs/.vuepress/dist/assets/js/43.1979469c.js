(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{1259:function(a,s,e){"use strict";e.r(s);var t=e(1),r=Object(t.a)({},(function(){var a=this,s=a._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("p",[s("code",[a._v("YARN")]),a._v(" 上部署的过程是：客户端把 "),s("code",[a._v("Flink")]),a._v(" 应用提交给 "),s("code",[a._v("Yarn")]),a._v(" 的 "),s("code",[a._v("ResourceManager")]),a._v("，"),s("code",[a._v("Yarn")]),a._v("的 "),s("code",[a._v("ResourceManager")]),a._v(" 会向 "),s("code",[a._v("Yarn")]),a._v(" 的 "),s("code",[a._v("NodeManager")]),a._v(" 申请容器。在这些容器上，"),s("code",[a._v("Flink")]),a._v(" 会部署 "),s("code",[a._v("JobManager")]),a._v(" 和 "),s("code",[a._v("TaskManager")]),a._v(" 的实例，从而启动集群。***"),s("code",[a._v("Flink")]),a._v(" 会根据运行在 "),s("code",[a._v("JobManger")]),a._v("上的作业所需要的 "),s("code",[a._v("Slot")]),a._v(" 数量动态分配 "),s("code",[a._v("TaskManager")]),a._v("资源***。")]),a._v(" "),s("h2",{attrs:{id:"_1-相关准备和配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-相关准备和配置"}},[a._v("#")]),a._v(" 1：相关准备和配置")]),a._v(" "),s("p",[a._v("在将 "),s("code",[a._v("Flink")]),a._v(" 任务部署至 "),s("code",[a._v("YARN")]),a._v(" 集群之前，需要确认集群是否安装有 "),s("code",[a._v("Hadoop")]),a._v("，保证 "),s("code",[a._v("Hadoop")]),a._v(" 版本至少在2.2以上，并且集群中安装有 "),s("code",[a._v("HDFS")]),a._v(" 服务。"),s("br"),a._v("\n具体配置步骤如下：")]),a._v(" "),s("p",[a._v("（1）配置环境变量，增加环境变量配置如下：")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" /etc/profile.d/my_env.sh\n\n"),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("HADOOP_HOME")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("/opt/module/hadoop-3.3.4\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("PATH")])]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token environment constant"}},[a._v("$PATH")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(":")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$HADOOP_HOME")]),a._v("/bin:"),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$HADOOP_HOME")]),a._v("/sbin\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("HADOOP_CONF_DIR")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("${HADOOP_HOME}")]),a._v("/etc/hadoop\n"),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("export")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("HADOOP_CLASSPATH")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("`")]),a._v("hadoop classpath"),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("`")])]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br")])]),s("p",[a._v("（2）启动 "),s("code",[a._v("Hadoop")]),a._v(" 集群，包括 "),s("code",[a._v("HDFS")]),a._v(" 和 "),s("code",[a._v("YARN")]),a._v(" 。")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("start-dfs.sh\nstart-yarn.sh\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("p",[a._v("（3）在 "),s("code",[a._v("hadoop102")]),a._v(" 中执行以下命令启动 "),s("code",[a._v("netcat")]),a._v(" 。")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("nc")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-lk")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("7777")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("h2",{attrs:{id:"_2-会话模式部署"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-会话模式部署"}},[a._v("#")]),a._v(" 2：会话模式部署")]),a._v(" "),s("p",[s("code",[a._v("YARN")]),a._v(" 的会话模式与独立集群略有不同，需要首先申请一个 "),s("code",[a._v("YARN")]),a._v(" 会话（YARN Session）来启动"),s("code",[a._v("Flink")]),a._v(" 集群。具体步骤如下：")]),a._v(" "),s("h3",{attrs:{id:"_1-启动集群"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-启动集群"}},[a._v("#")]),a._v(" 1）启动集群")]),a._v(" "),s("p",[a._v("（1）启动 "),s("code",[a._v("Hadoop")]),a._v(" 集群（"),s("code",[a._v("HDFS、YARN")]),a._v("）。"),s("br"),a._v("\n（2）执行脚本命令向 "),s("code",[a._v("YARN")]),a._v(" 集群申请资源，开启一个 "),s("code",[a._v("YARN")]),a._v(" 会话，启动 "),s("code",[a._v("Flink")]),a._v(" 集群。")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("bin/yarn-session.sh "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-nm")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("test")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("可用参数解读：")]),a._v(" "),s("ul",[s("li",[s("code",[a._v("-d")]),a._v(" ：分离模式，如果你不想让Flink YARN客户端一直前台运行，可以使用这个参数，即使关掉当前对话窗口，YARN session也可以后台运行。")]),a._v(" "),s("li",[s("code",[a._v("-jm（--jobManagerMemory）")]),a._v(" ：配置JobManager所需内存，默认单位MB。")]),a._v(" "),s("li",[s("code",[a._v("-nm（--name）")]),a._v(" ：配置在YARN UI界面上显示的任务名。")]),a._v(" "),s("li",[s("code",[a._v("-qu（--queue）")]),a._v(" ：指定YARN队列名。")]),a._v(" "),s("li",[s("code",[a._v("-tm（--taskManager）")]),a._v(" ：配置每个TaskManager所使用内存。")])]),a._v(" "),s("p",[a._v("注意："),s("code",[a._v("Flink1.11.0")]),a._v(" 版本不再使用 "),s("code",[a._v("-n")]),a._v(" 参数和 "),s("code",[a._v("-s")]),a._v(" 参数分别指定 "),s("code",[a._v("TaskManager")]),a._v(" 数量和 "),s("code",[a._v("slot")]),a._v(" 数量，"),s("code",[a._v("YARN")]),a._v(" 会按照需求动态分配 "),s("code",[a._v("TaskManager")]),a._v(" 和 "),s("code",[a._v("slot")]),a._v(" 。所以从这个意义上讲，"),s("code",[a._v("YARN")]),a._v(" 的会话模式也不会把集群资源固定，同样是动态分配的。"),s("br"),a._v(" "),s("code",[a._v("YARN Session")]),a._v(" 启动之后会给出一个 "),s("code",[a._v("Web UI")]),a._v(" 地址以及一个 "),s("code",[a._v("YARN application ID")]),a._v("，如下所示，用户可以通过 "),s("code",[a._v("Web UI")]),a._v(" 或者命令行两种方式提交作业。")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2022")]),a._v("-11-17 "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("15")]),a._v(":20:52,711 INFO  org.apache.flink.yarn.YarnClusterDescriptor                  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" - Found Web Interface hadoop104:40825 of application "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'application_1668668287070_0005'")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v(".")]),a._v("\nJobManager Web Interface: http://hadoop104:40825\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("h3",{attrs:{id:"_2-提交作业"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-提交作业"}},[a._v("#")]),a._v(" 2）提交作业")]),a._v(" "),s("p",[a._v("（1）通过Web UI提交作业"),s("br"),a._v("\n这种方式比较简单，与上文所述Standalone部署模式基本相同。")]),a._v(" "),s("p",[s("img",{attrs:{src:e(907),alt:"Alt text"}})]),a._v(" "),s("p",[a._v("（2）通过命令行提交作业"),s("br"),a._v("\n① 将 "),s("code",[a._v("FlinkTutorial-1.0-SNAPSHOT.jar")]),a._v(" 任务上传至集群。\n② 执行以下命令将该任务提交到已经开启的 "),s("code",[a._v("Yarn-Session")]),a._v(" 中运行。")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("bin/flink run\n"),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-c")]),a._v(" com.atguigu.wc.SocketStreamWordCount FlinkTutorial-1.0-SNAPSHOT.jar\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("p",[a._v("客户端可以自行确定 "),s("code",[a._v("JobManager")]),a._v(" 的地址，也可以通过 "),s("code",[a._v("-m")]),a._v(" 或者 "),s("code",[a._v("-jobmanager")]),a._v(" 参数指定"),s("code",[a._v("JobManager")]),a._v(" 的地址，"),s("code",[a._v("JobManager")]),a._v(" 的地址在 "),s("code",[a._v("YARN Session")]),a._v(" 的启动页面中可以找到。"),s("br"),a._v("\n③ 任务提交成功后，可在 "),s("code",[a._v("YARN")]),a._v(" 的 "),s("code",[a._v("Web UI")]),a._v(" 界面查看运行情况。"),s("code",[a._v("hadoop103:8088")]),a._v("。")]),a._v(" "),s("p",[s("img",{attrs:{src:e(908),alt:"Alt text"}})]),a._v(" "),s("p",[a._v("从上图中可以看到我们创建的 "),s("code",[a._v("Yarn-Session")]),a._v(" 实际上是一个 "),s("code",[a._v("Yarn")]),a._v(" 的 "),s("code",[a._v("Application")]),a._v("，并且有唯一的 "),s("code",[a._v("Application ID")]),a._v("。"),s("br"),a._v("\n④也可以通过 "),s("code",[a._v("Flink")]),a._v(" 的 "),s("code",[a._v("Web UI")]),a._v(" 页面查看提交任务的运行情况，如下图所示。")]),a._v(" "),s("p",[s("img",{attrs:{src:e(909),alt:"Alt text"}})]),a._v(" "),s("h2",{attrs:{id:"_3-单作业模式部署"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-单作业模式部署"}},[a._v("#")]),a._v(" 3：单作业模式部署")]),a._v(" "),s("p",[a._v("在 "),s("code",[a._v("YARN")]),a._v(" 环境中，由于有了外部平台做资源调度，所以我们也可以直接向 "),s("code",[a._v("YARN")]),a._v(" 提交一个单独的作业，从而启动一个 "),s("code",[a._v("Flink")]),a._v(" 集群。")]),a._v(" "),s("p",[a._v("（1）执行命令提交作业。")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("bin/flink run "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-d")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-t")]),a._v(" yarn-per-job "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-c")]),a._v(" com.atguigu.wc.SocketStreamWordCount FlinkTutorial-1.0-SNAPSHOT.jar\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("注意：如果启动过程中报如下异常。")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("Exception "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("in")]),a._v(" thread “Thread-5” java.lang.IllegalStateException: Trying to access closed classloader. Please check "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" you store classloaders directly or indirectly "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("in")]),a._v(" static fields. If the stacktrace suggests that the leak occurs "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("in")]),a._v(" a third party library and cannot be fixed immediately, you can disable this check with the configuration ‘classloader.check-leaked-classloader’.\nat org.apache.flink.runtime.execution.librarycache.FlinkUserCodeClassLoaders\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("p",[a._v("解决办法：在 "),s("code",[a._v("flink")]),a._v(" 的 "),s("code",[a._v("/opt/module/flink-1.17.0/conf/flink-conf.yaml")]),a._v(" 配置文件中设置")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("atguigu@hadoop102 conf"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("vim")]),a._v(" flink-conf.yaml\n\nclassloader.check-leaked-classloader: "),s("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("false")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br")])]),s("p",[a._v("（2）在 "),s("code",[a._v("YARN")]),a._v(" 的 "),s("code",[a._v("ResourceManager")]),a._v(" 界面查看执行情况。")]),a._v(" "),s("p",[s("img",{attrs:{src:e(910),alt:"Alt text"}})]),a._v(" "),s("p",[a._v("点击可以打开 "),s("code",[a._v("Flink Web UI")]),a._v(" 页面进行监控，如下图所示：")]),a._v(" "),s("p",[s("img",{attrs:{src:e(911),alt:"Alt text"}})]),a._v(" "),s("p",[a._v("（3）可以使用命令行查看或取消作业，命令如下。")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("bin/flink list "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-t")]),a._v(" yarn-per-job "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-Dyarn.application.id")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("application_XXXX_YY\n\nbin/flink cancel "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-t")]),a._v(" yarn-per-job "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-Dyarn.application.id")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("application_XXXX_YY "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("jobId"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br")])]),s("p",[a._v("这里的 "),s("code",[a._v("application_XXXX_YY")]),a._v(" 是当前应用的 "),s("code",[a._v("ID")]),a._v("，"),s("code",[a._v("<jobId>")]),a._v(" 是作业的 "),s("code",[a._v("ID")]),a._v(" 。注意如果取消作业，整个 "),s("code",[a._v("Flink")]),a._v(" 集群也会停掉。")]),a._v(" "),s("h2",{attrs:{id:"_4-应用模式部署"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-应用模式部署"}},[a._v("#")]),a._v(" 4：应用模式部署")]),a._v(" "),s("p",[a._v("应用模式同样非常简单，与单作业模式类似，直接执行 "),s("code",[a._v("flink run-application")]),a._v(" 命令即可。")]),a._v(" "),s("h3",{attrs:{id:"_1-命令行提交"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-命令行提交"}},[a._v("#")]),a._v(" 1）命令行提交")]),a._v(" "),s("p",[a._v("（1）执行命令提交作业。")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("bin/flink run-application "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-t")]),a._v(" yarn-application "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-c")]),a._v(" com.atguigu.wc.SocketStreamWordCount FlinkTutorial-1.0-SNAPSHOT.jar \n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("（2）在命令行中查看或取消作业。")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("bin/flink list "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-t")]),a._v(" yarn-application "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-Dyarn.application.id")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("application_XXXX_YY\n\nbin/flink cancel "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-t")]),a._v(" yarn-application "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-Dyarn.application.id")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("application_XXXX_YY "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("jobId"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br")])]),s("h3",{attrs:{id:"_2-上传hdfs提交"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-上传hdfs提交"}},[a._v("#")]),a._v(" 2）上传HDFS提交")]),a._v(" "),s("p",[a._v("可以通过 "),s("code",[a._v("yarn.provided.lib.dirs")]),a._v(" 配置选项指定位置，将 "),s("code",[a._v("flink")]),a._v(" 的依赖上传到远程。")]),a._v(" "),s("p",[a._v("（1）上传 "),s("code",[a._v("flink")]),a._v(" 的 "),s("code",[a._v("lib")]),a._v(" 和 "),s("code",[a._v("plugins")]),a._v(" 到 "),s("code",[a._v("HDFS")]),a._v(" 上")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v(" hadoop fs "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-mkdir")]),a._v(" /flink-dist\n hadoop fs "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-put")]),a._v(" lib/ /flink-dist\n hadoop fs "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-put")]),a._v(" plugins/ /flink-dist\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br")])]),s("p",[a._v("（2）上传自己的jar包到HDFS")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v(" hadoop fs "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-mkdir")]),a._v(" /flink-jars\n hadoop fs "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-put")]),a._v(" FlinkTutorial-1.0-SNAPSHOT.jar /flink-jars\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br")])]),s("p",[a._v("（3）提交作业")]),a._v(" "),s("div",{staticClass:"language-shell line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("bin/flink run-application "),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-t")]),a._v(" yarn-application\t"),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-Dyarn.provided.lib.dirs")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"hdfs://hadoop102:8020/flink-dist"')]),a._v("\t"),s("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-c")]),a._v(" com.atguigu.wc.SocketStreamWordCount  hdfs://hadoop102:8020/flink-jars/FlinkTutorial-1.0-SNAPSHOT.jar\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("这种方式下，"),s("code",[a._v("flink")]),a._v(" 本身的依赖和用户 "),s("code",[a._v("jar")]),a._v(" 可以预先上传到 "),s("code",[a._v("HDFS")]),a._v("，而不需要单独发送到集群，这就使得作业提交更加轻量了。")])])}),[],!1,null,null,null);s.default=r.exports},907:function(a,s,e){a.exports=e.p+"assets/img/image20.949edc4d.png"},908:function(a,s,e){a.exports=e.p+"assets/img/image21.1f68c2a0.png"},909:function(a,s,e){a.exports=e.p+"assets/img/image22.f3e3554f.png"},910:function(a,s,e){a.exports=e.p+"assets/img/image23.96e0da73.png"},911:function(a,s,e){a.exports=e.p+"assets/img/image24.0cc7f21e.png"}}]);