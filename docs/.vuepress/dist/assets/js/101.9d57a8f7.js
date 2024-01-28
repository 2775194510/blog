(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{1397:function(_,v,t){_.exports=t.p+"assets/img/进程.4f891f25.png"},1592:function(_,v,t){"use strict";t.r(v);var s=t(1),a=Object(s.a)({},(function(){var _=this,v=_._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[v("h1",{attrs:{id:"进程通信的几种方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#进程通信的几种方式"}},[_._v("#")]),_._v(" 进程通信的几种方式")]),_._v(" "),v("h2",{attrs:{id:"管道"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#管道"}},[_._v("#")]),_._v(" 管道")]),_._v(" "),v("p",[_._v("可以看出"),v("strong",[_._v("管道传输数据是单向的")]),_._v("，如果想相互通信，我们需要创建两个管道才行。")]),_._v(" "),v("p",[v("strong",[_._v("管道这种通信方式效率低，不适合进程间频繁地交换数据")])]),_._v(" "),v("p",[v("strong",[_._v("所谓的管道，就是内核里面的一串缓存")]),_._v("。从管道的一段写入的数据，实际上是缓存在内核中的，另一端读取，也就是从内核中读取这段数据。另外，管道传输的数据是无格式的流且大小受限。")]),_._v(" "),v("img",{attrs:{src:t(1397),alt:"img"}}),_._v(" "),v("h2",{attrs:{id:"消息队列"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#消息队列"}},[_._v("#")]),_._v(" 消息队列")]),_._v(" "),v("p",[_._v("比如，A 进程要给 B 进程发送消息，A 进程把数据放在对应的消息队列后就可以正常返回了，B 进程需要的时候再去读取数据就可以了。同理，B 进程要给 A 进程发送消息也是如此。")]),_._v(" "),v("p",[v("strong",[_._v("消息队列是保存在内核中的消息链表")]),_._v("，在发送数据时，会分成一个一个独立的数据单元，也就是消息体（数据块），消息体是用户自定义的数据类型，消息的发送方和接收方要约定好消息体的数据类型，所以每个消息体都是固定大小的存储块，不像管道是无格式的字节流数据。如果进程从消息队列中读取了消息体，内核就会把这个消息体删除。")]),_._v(" "),v("p",[_._v("消息队列生命周期随内核，如果没有释放消息队列或者没有关闭操作系统，消息队列会一直存在，而前面提到的匿名管道的生命周期，是随进程的创建而建立，随进程的结束而销毁。")]),_._v(" "),v("p",[v("strong",[_._v("消息队列不适合比较大数据的传输")]),_._v("，因为在内核中每个消息体都有一个最大长度的限制，同时所有队列所包含的全部消息体的总长度也是有上限。在 Linux 内核中，会有两个宏定义 "),v("code",[_._v("MSGMAX")]),_._v(" 和 "),v("code",[_._v("MSGMNB")]),_._v("，它们以字节为单位，分别定义了一条消息的最大长度和一个队列的最大长度。")]),_._v(" "),v("p",[v("strong",[_._v("消息队列通信过程中，存在用户态与内核态之间的数据拷贝开销")]),_._v("，因为进程写入数据到内核中的消息队列时，会发生从用户态拷贝数据到内核态的过程，同理另一进程读取内核中的消息数据时，会发生从内核态拷贝数据到用户态的过程。")]),_._v(" "),v("h2",{attrs:{id:"共享内存"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#共享内存"}},[_._v("#")]),_._v(" 共享内存")]),_._v(" "),v("p",[_._v("消息队列的读取和写入的过程，都会有发生用户态与内核态之间的消息拷贝过程。那"),v("strong",[_._v("共享内存")]),_._v("的方式，就很好的解决了这一问题。")]),_._v(" "),v("p",[_._v("现代操作系统，对于内存管理，采用的是虚拟内存技术，也就是每个进程都有自己独立的虚拟内存空间，不同进程的虚拟内存映射到不同的物理内存中。所以，即使进程 A 和 进程 B 的虚拟地址是一样的，其实访问的是不同的物理内存地址，对于数据的增删查改互不影响。")]),_._v(" "),v("p",[v("strong",[_._v("共享内存的机制，就是拿出一块虚拟地址空间来，映射到相同的物理内存中")]),_._v("。这样这个进程写入的东西，另外一个进程马上就能看到了，都不需要拷贝来拷贝去，传来传去，大大提高了进程间通信的速度。")]),_._v(" "),v("h2",{attrs:{id:"信号量"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#信号量"}},[_._v("#")]),_._v(" 信号量")]),_._v(" "),v("p",[_._v("用了共享内存通信方式，带来新的问题，那就是如果多个进程同时修改同一个共享内存，很有可能就冲突了。例如两个进程都同时写一个地址，那先写的那个进程会发现内容被别人覆盖了。")]),_._v(" "),v("p",[_._v("为了防止多进程竞争共享资源，而造成的数据错乱，所以需要保护机制，使得共享的资源，在任意时刻只能被一个进程访问。正好，"),v("strong",[_._v("信号量")]),_._v("就实现了这一保护机制。")]),_._v(" "),v("p",[v("strong",[_._v("信号量其实是一个整型的计数器，主要用于实现进程间的互斥与同步，而不是用于缓存进程间通信的数据")]),_._v("。")]),_._v(" "),v("p",[_._v("信号量表示资源的数量，控制信号量的方式有两种原子操作：")]),_._v(" "),v("ul",[v("li",[_._v("一个是 "),v("strong",[_._v("P 操作")]),_._v("，这个操作会把信号量减去 -1，相减后如果信号量 < 0，则表明资源已被占用，进程需阻塞等待；相减后如果信号量 >= 0，则表明还有资源可使用，进程可正常继续执行。")]),_._v(" "),v("li",[_._v("另一个是 "),v("strong",[_._v("V 操作")]),_._v("，这个操作会把信号量加上 1，相加后如果信号量 <= 0，则表明当前有阻塞中的进程，于是会将该进程唤醒运行；相加后如果信号量 > 0，则表明当前没有阻塞中的进程；")])]),_._v(" "),v("h2",{attrs:{id:"信号"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#信号"}},[_._v("#")]),_._v(" 信号")]),_._v(" "),v("p",[v("strong",[_._v("对于异常情况下的工作模式，就需要用「信号」的方式来通知进程。")])]),_._v(" "),v("p",[_._v("信号跟信号量虽然名字相似度 66.66%，但两者用途完全不一样")]),_._v(" "),v("p",[_._v("运行在 shell 终端的进程，我们可以通过键盘输入某些组合键的时候，给进程发送信号。例如")]),_._v(" "),v("ul",[v("li",[_._v("Ctrl+C 产生 "),v("code",[_._v("SIGINT")]),_._v(" 信号，表示终止该进程；")]),_._v(" "),v("li",[_._v("Ctrl+Z 产生 "),v("code",[_._v("SIGTSTP")]),_._v(" 信号，表示停止该进程，但还未结束；")])]),_._v(" "),v("p",[_._v("信号是进程间通信机制中"),v("strong",[_._v("唯一的异步通信机制")]),_._v("，因为可以在任何时候发送信号给某一进程，一旦有信号产生，我们就有下面这几种，用户进程对信号的处理方式。")]),_._v(" "),v("p",[v("strong",[_._v("1.执行默认操作")]),_._v("。Linux 对每种信号都规定了默认操作，例如，上面列表中的 SIGTERM 信号，就是终止进程的意思。Core 的意思是 Core Dump，也即终止进程后，通过 Core Dump 将当前进程的运行状态保存在文件里面，方便程序员事后进行分析问题在哪里。")]),_._v(" "),v("p",[v("strong",[_._v("2.捕捉信号")]),_._v("。我们可以为信号定义一个信号处理函数。当信号发生时，我们就执行相应的信号处理函数。")]),_._v(" "),v("p",[v("strong",[_._v("3.忽略信号")]),_._v("。当我们不希望处理某些信号的时候，就可以忽略该信号，不做任何处理。有两个信号是应用进程无法捕捉和忽略的，即 "),v("code",[_._v("SIGKILL")]),_._v(" 和 "),v("code",[_._v("SEGSTOP")]),_._v("，它们用于在任何时候中断或结束某一进程。")]),_._v(" "),v("h2",{attrs:{id:"socket"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#socket"}},[_._v("#")]),_._v(" socket")]),_._v(" "),v("p",[_._v("前面提到的管道、消息队列、共享内存、信号量和信号都是在同一台主机上进行进程间通信，那要想"),v("strong",[_._v("跨网络与不同主机上的进程之间通信，就需要 Socket 通信了。")])]),_._v(" "),v("h2",{attrs:{id:"总结"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[_._v("#")]),_._v(" 总结")]),_._v(" "),v("p",[_._v("由于每个进程的用户空间都是独立的，不能相互访问，这时就需要借助内核空间来实现进程间通信，原因很简单，每个进程都是共享一个内核空间。")]),_._v(" "),v("p",[_._v("Linux 内核提供了不少进程间通信的方式，其中最简单的方式就是管道，管道分为「匿名管道」和「命名管道」。")]),_._v(" "),v("p",[v("strong",[_._v("匿名管道")]),_._v("顾名思义，它没有名字标识，匿名管道是特殊文件只存在于内存，没有存在于文件系统中，shell 命令中的「"),v("code",[_._v("|")]),_._v("」竖线就是匿名管道，通信的数据是"),v("strong",[_._v("无格式的流并且大小受限")]),_._v("，通信的方式是"),v("strong",[_._v("单向")]),_._v("的，数据只能在一个方向上流动，如果要双向通信，需要创建两个管道，再来"),v("strong",[_._v("匿名管道是只能用于存在父子关系的进程间通信")]),_._v("，匿名管道的生命周期随着进程创建而建立，随着进程终止而消失。")]),_._v(" "),v("p",[v("strong",[_._v("命名管道")]),_._v("突破了匿名管道只能在亲缘关系进程间的通信限制，因为使用命名管道的前提，需要在文件系统创建一个类型为 p 的设备文件，那么毫无关系的进程就可以通过这个设备文件进行通信。另外，不管是匿名管道还是命名管道，进程写入的数据都是"),v("strong",[_._v("缓存在内核")]),_._v("中，另一个进程读取数据时候自然也是从内核中获取，同时通信数据都遵循"),v("strong",[_._v("先进先出")]),_._v("原则，不支持 lseek 之类的文件定位操作。")]),_._v(" "),v("p",[v("strong",[_._v("消息队列")]),_._v("克服了管道通信的数据是无格式的字节流的问题，消息队列实际上是保存在内核的「消息链表」，消息队列的消息体是可以用户自定义的数据类型，发送数据时，会被分成一个一个独立的消息体，当然接收数据时，也要与发送方发送的消息体的数据类型保持一致，这样才能保证读取的数据是正确的。消息队列通信的速度不是最及时的，毕竟"),v("strong",[_._v("每次数据的写入和读取都需要经过用户态与内核态之间的拷贝过程。")])]),_._v(" "),v("p",[v("strong",[_._v("共享内存")]),_._v("可以解决消息队列通信中用户态与内核态之间数据拷贝过程带来的开销，"),v("strong",[_._v("它直接分配一个共享空间，每个进程都可以直接访问")]),_._v("，就像访问进程自己的空间一样快捷方便，不需要陷入内核态或者系统调用，大大提高了通信的速度，享有"),v("strong",[_._v("最快")]),_._v("的进程间通信方式之名。但是便捷高效的共享内存通信，"),v("strong",[_._v("带来新的问题，多进程竞争同个共享资源会造成数据的错乱。")])]),_._v(" "),v("p",[_._v("那么，就需要"),v("strong",[_._v("信号量")]),_._v("来保护共享资源，以确保任何时刻只能有一个进程访问共享资源，这种方式就是互斥访问。"),v("strong",[_._v("信号量不仅可以实现访问的互斥性，还可以实现进程间的同步")]),_._v("，信号量其实是一个计数器，表示的是资源个数，其值可以通过两个原子操作来控制，分别是 "),v("strong",[_._v("P 操作和 V 操作")]),_._v("。")]),_._v(" "),v("p",[_._v("与信号量名字很相似的叫"),v("strong",[_._v("信号")]),_._v("，它俩名字虽然相似，但功能一点儿都不一样。信号是进程间通信机制中"),v("strong",[_._v("唯一的异步通信机制")]),_._v("，信号可以在应用进程和内核之间直接交互，内核也可以利用信号来通知用户空间的进程发生了哪些系统事件，信号事件的来源主要有硬件来源（如键盘 Cltr+C ）和软件来源（如 kill 命令），一旦有信号发生，"),v("strong",[_._v("进程有三种方式响应信号 1. 执行默认操作、2. 捕捉信号、3. 忽略信号")]),_._v("。有两个信号是应用进程无法捕捉和忽略的，即 "),v("code",[_._v("SIGKILL")]),_._v(" 和 "),v("code",[_._v("SEGSTOP")]),_._v("，这是为了方便我们能在任何时候结束或停止某个进程。")]),_._v(" "),v("p",[_._v("前面说到的通信机制，都是工作于同一台主机，如果"),v("strong",[_._v("要与不同主机的进程间通信，那么就需要 Socket 通信了")]),_._v("。Socket 实际上不仅用于不同的主机进程间通信，还可以用于本地主机进程间通信，可根据创建 Socket 的类型不同，分为三种常见的通信方式，一个是基于 TCP 协议的通信方式，一个是基于 UDP 协议的通信方式，一个是本地进程间通信方式。")]),_._v(" "),v("h1",{attrs:{id:"线程通信的几种方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#线程通信的几种方式"}},[_._v("#")]),_._v(" 线程通信的几种方式")]),_._v(" "),v("p",[_._v("线程间的通信目的主要是用于线程同步，所以线程没有像进程通信中的用于数据交换的通信机制。")]),_._v(" "),v("h2",{attrs:{id:"_1-等待通知机制"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_1-等待通知机制"}},[_._v("#")]),_._v(" 1. 等待通知机制")]),_._v(" "),v("p",[_._v("两个线程通过对同一对象调用等待 wait() 和通知 notify() 方法来进行通讯。")]),_._v(" "),v("p",[_._v("等待通知有着一个经典范式：")]),_._v(" "),v("p",[_._v("线程 A 作为消费者：")]),_._v(" "),v("ol",[v("li",[_._v("获取对象的锁。")]),_._v(" "),v("li",[_._v("进入 while(判断条件)，并调用 wait() 方法。")]),_._v(" "),v("li",[_._v("当条件满足跳出循环执行具体处理逻辑。")])]),_._v(" "),v("p",[_._v("线程 B 作为生产者:")]),_._v(" "),v("ol",[v("li",[_._v("获取对象锁。")]),_._v(" "),v("li",[_._v("更改与线程 A 共用的判断条件。")]),_._v(" "),v("li",[_._v("调用 notify() 方法。")])]),_._v(" "),v("p",[_._v("伪代码如下:")]),_._v(" "),v("div",{staticClass:"language- line-numbers-mode"},[v("pre",{pre:!0,attrs:{class:"language-text"}},[v("code",[_._v("//Thread A\n\nsynchronized(Object){\n    while(条件){\n        Object.wait();\n    }\n    //do something\n}\n\n//Thread B\nsynchronized(Object){\n    条件=false;//改变条件\n    Object.notify();\n}\n")])]),_._v(" "),v("div",{staticClass:"line-numbers-wrapper"},[v("span",{staticClass:"line-number"},[_._v("1")]),v("br"),v("span",{staticClass:"line-number"},[_._v("2")]),v("br"),v("span",{staticClass:"line-number"},[_._v("3")]),v("br"),v("span",{staticClass:"line-number"},[_._v("4")]),v("br"),v("span",{staticClass:"line-number"},[_._v("5")]),v("br"),v("span",{staticClass:"line-number"},[_._v("6")]),v("br"),v("span",{staticClass:"line-number"},[_._v("7")]),v("br"),v("span",{staticClass:"line-number"},[_._v("8")]),v("br"),v("span",{staticClass:"line-number"},[_._v("9")]),v("br"),v("span",{staticClass:"line-number"},[_._v("10")]),v("br"),v("span",{staticClass:"line-number"},[_._v("11")]),v("br"),v("span",{staticClass:"line-number"},[_._v("12")]),v("br"),v("span",{staticClass:"line-number"},[_._v("13")]),v("br"),v("span",{staticClass:"line-number"},[_._v("14")]),v("br")])]),v("h2",{attrs:{id:"_2-join-方法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_2-join-方法"}},[_._v("#")]),_._v(" 2. join() 方法")]),_._v(" "),v("p",[_._v("在 join 线程完成后会调用 notifyAll() 方法，是在 JVM 实现中调用，所以这里看不出来。")]),_._v(" "),v("h2",{attrs:{id:"_3-volatile-共享内存"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_3-volatile-共享内存"}},[_._v("#")]),_._v(" 3. volatile 共享内存")]),_._v(" "),v("h3",{attrs:{id:"_4-管道通信"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_4-管道通信"}},[_._v("#")]),_._v(" 4. 管道通信")]),_._v(" "),v("h2",{attrs:{id:"_5-并发工具"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#_5-并发工具"}},[_._v("#")]),_._v(" 5. 并发工具")]),_._v(" "),v("p",[_._v("CountDownLatch 并发工具")]),_._v(" "),v("p",[_._v("CyclicBarrier 并发工具")]),_._v(" "),v("h2",{attrs:{id:"参考"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#参考"}},[_._v("#")]),_._v(" 参考")]),_._v(" "),v("p",[_._v("https://crossoverjie.top/2018/03/16/java-senior/thread-communication/")])])}),[],!1,null,null,null);v.default=a.exports}}]);