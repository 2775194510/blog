(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{1400:function(s,a,t){s.exports=t.p+"assets/img/image5.0164894c.png"},1401:function(s,a,t){s.exports=t.p+"assets/img/image6.c5ae63a8.png"},1402:function(s,a,t){s.exports=t.p+"assets/img/image7.ad534926.png"},1778:function(s,a,t){"use strict";t.r(a);var e=t(1),v=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"_1-介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-介绍"}},[s._v("#")]),s._v(" 1：介绍")]),s._v(" "),a("p",[a("strong",[s._v("数据卷（volume）")]),s._v(" 是一个虚拟目录，指向 "),a("strong",[s._v("宿主机文件系统中的某个目录")]),s._v("。")]),s._v(" "),a("p",[a("img",{attrs:{src:t(1400),alt:"alt text"}})]),s._v(" "),a("p",[s._v("一旦完成 "),a("strong",[s._v("数据卷挂载")]),s._v("，对容器的一切操作都会作用在数据卷对应的宿主机目录了。")]),s._v(" "),a("p",[s._v("这样，我们操作 "),a("strong",[s._v("宿主机")]),s._v(" 的 "),a("code",[s._v("/var/lib/docker/volumes/html")]),s._v("目录，就等于操作容器内的 "),a("code",[s._v("/usr/share/nginx/html")]),s._v("目录了")]),s._v(" "),a("h2",{attrs:{id:"_2-数据卷操作命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-数据卷操作命令"}},[s._v("#")]),s._v(" 2：数据卷操作命令")]),s._v(" "),a("p",[s._v("数据卷操作的基本语法如下：")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" volume "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("COMMAND"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("code",[s._v("docker volume")]),s._v("命令是数据卷操作，根据命令后跟随的 "),a("code",[s._v("command")]),s._v("来确定下一步的操作：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("create")]),s._v(" 创建一个volume")]),s._v(" "),a("li",[a("code",[s._v("inspect")]),s._v(" 显示一个或多个volume的信息")]),s._v(" "),a("li",[a("code",[s._v("ls")]),s._v(" 列出所有的volume")]),s._v(" "),a("li",[a("code",[s._v("prune")]),s._v(" 删除未使用的volume")]),s._v(" "),a("li",[a("code",[s._v("rm")]),s._v(" 删除一个或多个指定的volume")])]),s._v(" "),a("h2",{attrs:{id:"_3-创建和查看数据卷"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-创建和查看数据卷"}},[s._v("#")]),s._v(" 3：创建和查看数据卷")]),s._v(" "),a("h3",{attrs:{id:"_3-1-创建数据卷"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-创建数据卷"}},[s._v("#")]),s._v(" 3.1 创建数据卷")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" volume create html\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"_3-2-查看所有数据卷"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-查看所有数据卷"}},[s._v("#")]),s._v(" 3.2 查看所有数据卷")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" volume "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"_3-3-查看数据卷详细信息卷"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-查看数据卷详细信息卷"}},[s._v("#")]),s._v(" 3.3 查看数据卷详细信息卷")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" volume inspect html\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("img",{attrs:{src:t(1401),alt:"alt text"}})]),s._v(" "),a("p",[s._v("可以看到，我们创建的html这个数据卷关联的宿主机目录为"),a("code",[s._v("/var/lib/docker/volumes/html/_data")]),s._v("目录。")]),s._v(" "),a("h3",{attrs:{id:"_3-4-总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-总结"}},[s._v("#")]),s._v(" 3.4 总结")]),s._v(" "),a("p",[s._v("数据卷的作用：")]),s._v(" "),a("ul",[a("li",[s._v("将容器与数据分离，解耦合，方便操作容器内数据，保证数据安全")])]),s._v(" "),a("p",[s._v("数据卷操作：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("docker volume create")]),s._v("：创建数据卷")]),s._v(" "),a("li",[a("code",[s._v("docker volume ls")]),s._v("：查看所有数据卷")]),s._v(" "),a("li",[a("code",[s._v("docker volume inspect")]),s._v("：查看数据卷详细信息，包括关联的宿主机目录位置")]),s._v(" "),a("li",[a("code",[s._v("docker volume rm")]),s._v("：删除指定数据卷")]),s._v(" "),a("li",[a("code",[s._v("docker volume prune")]),s._v("：删除所有未使用的数据卷")])]),s._v(" "),a("h2",{attrs:{id:"_4-挂载数据卷"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-挂载数据卷"}},[s._v("#")]),s._v(" 4：挂载数据卷")]),s._v(" "),a("p",[s._v("我们在创建容器时，可以通过 -v 参数来挂载一个数据卷到某个容器内目录，命令格式如下：")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" mn "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" html:/root/html "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8080")]),s._v(":80\n  nginx "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("这里的-v就是 "),a("strong",[s._v("挂载数据卷")]),s._v("的命令：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-v html:/root/htm")]),s._v(" ：把 "),a("strong",[s._v("html数据卷")]),s._v("挂载到 "),a("strong",[s._v("容器内的/root/html")]),s._v("这个目录中")])]),s._v(" "),a("h2",{attrs:{id:"_5-举例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-举例"}},[s._v("#")]),s._v(" 5：举例")]),s._v(" "),a("h3",{attrs:{id:"_5-1-nginx挂载数据卷"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-nginx挂载数据卷"}},[s._v("#")]),s._v(" 5.1 nginx挂载数据卷")]),s._v(" "),a("p",[a("strong",[s._v("需求")]),s._v("：创建一个 "),a("code",[s._v("nginx")]),s._v("容器，修改容器内的"),a("code",[s._v("html")]),s._v("目录内的"),a("code",[s._v("index.html")]),s._v("内容")]),s._v(" "),a("p",[a("strong",[s._v("分析")]),s._v("：上个案例中，我们进入nginx容器内部，已经知道nginx的html目录所在位置"),a("code",[s._v("/usr/share/nginx/html")]),s._v(" ，我们需要把这个目录挂载到 "),a("code",[s._v("html")]),s._v("这个数据卷上，方便操作其中的内容。")]),s._v(" "),a("p",[a("strong",[s._v("提示")]),s._v("：运行容器时使用 -v 参数挂载数据卷")]),s._v(" "),a("p",[s._v("步骤：")]),s._v(" "),a("ul",[a("li",[s._v("① 创建容器并挂载数据卷到容器内的HTML目录")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" mn "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-v")]),s._v(" html:/usr/share/nginx/html "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),s._v(":80 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" nginx\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("② 进入html数据卷所在位置，并修改HTML内容")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看html数据卷的位置")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" volume inspect html\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入该目录")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /var/lib/docker/volumes/html/_data\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 修改文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v(" index.html\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("h3",{attrs:{id:"_5-2-mysql挂载数据卷"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-2-mysql挂载数据卷"}},[s._v("#")]),s._v(" 5.2 mysql挂载数据卷")]),s._v(" "),a("p",[s._v("容器不仅仅可以挂载数据卷，也可以直接挂载到宿主机目录上。关联关系如下：")]),s._v(" "),a("ul",[a("li",[s._v("带数据卷模式：宿主机目录 --\x3e 数据卷 ---\x3e 容器内目录")]),s._v(" "),a("li",[s._v("直接挂载模式：宿主机目录 ---\x3e 容器内目录")])]),s._v(" "),a("p",[a("img",{attrs:{src:t(1402),alt:"alt text"}})]),s._v(" "),a("p",[a("strong",[s._v("语法")]),s._v("：")]),s._v(" "),a("p",[s._v("目录挂载与数据卷挂载的语法是类似的：")]),s._v(" "),a("ul",[a("li",[s._v("-v [宿主机目录]:[容器内目录]")]),s._v(" "),a("li",[s._v("-v [宿主机文件]:[容器内文件]")])]),s._v(" "),a("p",[a("strong",[s._v("需求")]),s._v("：创建并运行一个MySQL容器，将宿主机目录直接挂载到容器")]),s._v(" "),a("blockquote",[a("p",[s._v("实现思路如下：")])]),s._v(" "),a("ul",[a("li",[s._v("1）在将本地 "),a("code",[s._v("mysql.tar")]),s._v("文件上传到 "),a("strong",[s._v("虚拟机")]),s._v("，通过 "),a("code",[s._v("load")]),s._v("命令加载为镜像")]),s._v(" "),a("li",[s._v("2）创建目录 "),a("code",[s._v("/tmp/mysql/data")])]),s._v(" "),a("li",[s._v("3）创建目录 "),a("code",[s._v("/tmp/mysql/conf")]),s._v("，将资料提供的 "),a("code",[s._v("hmy.cnf")]),s._v("文件上传到 "),a("code",[s._v("/tmp/mysql/conf")])]),s._v(" "),a("li",[s._v("4）去DockerHub查阅资料，创建并运行MySQL容器，要求：\n"),a("ul",[a("li",[s._v("① 挂载 "),a("code",[s._v("/tmp/mysql/data")]),s._v("到mysql容器内 "),a("strong",[s._v("数据存储目录")])]),s._v(" "),a("li",[s._v("② 挂载 "),a("code",[s._v("/tmp/mysql/conf/hmy.cnf")]),s._v("到mysql容器的 "),a("strong",[s._v("配置文件")])]),s._v(" "),a("li",[s._v("③ 设置MySQL密码")])])])]),s._v(" "),a("h2",{attrs:{id:"_6-总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-总结"}},[s._v("#")]),s._v(" 6：总结")]),s._v(" "),a("p",[a("code",[s._v("docker run")]),s._v("的命令中通过 "),a("code",[s._v("-v")]),s._v(" 参数挂载文件或目录到容器中：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("-v volume名称")]),s._v(":容器内目录")]),s._v(" "),a("li",[a("code",[s._v("-v 宿主机文件")]),s._v(":容器内文")]),s._v(" "),a("li",[a("code",[s._v("-v 宿主机目录")]),s._v(":容器内目录")])]),s._v(" "),a("blockquote",[a("p",[s._v("数据卷挂载与目录直接挂载的")])]),s._v(" "),a("ul",[a("li",[s._v("数据卷挂载耦合度低，由docker来管理目录，但是目录较深，不好找")]),s._v(" "),a("li",[s._v("目录挂载耦合度高，需要我们自己管理目录，不过目录容易寻找查看")])])])}),[],!1,null,null,null);a.default=v.exports}}]);