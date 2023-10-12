(window.webpackJsonp=window.webpackJsonp||[]).push([[94],{1017:function(t,v,e){"use strict";e.r(v);var _=e(1),p=Object(_.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("p",[t._v("我们都知道 HashMap 是线程不安全的，那 HashMap 为什么线程不安全？JDK1.8 还有这些问题吗？如何解决这些问题呢？本文将对该问题进行解密。")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/HashMap%E4%B8%BA%E4%BB%80%E4%B9%88%E7%BA%BF%E7%A8%8B%E4%B8%8D%E5%AE%89%E5%85%A8.png",alt:""}})]),t._v(" "),v("h2",{attrs:{id:"多线程下扩容死循环"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#多线程下扩容死循环"}},[t._v("#")]),t._v(" 多线程下扩容死循环")]),t._v(" "),v("p",[t._v("JDK1.7中的 HashMap 使用头插法插入元素，在多线程的环境下，扩容的时候有可能导致环形链表的出现，形成死循环。因此，JDK1.8使用尾插法插入元素，在扩容时会保持链表元素原本的顺序，不会出现环形链表的问题。")]),t._v(" "),v("p",[t._v("下面看看多线程情况下， JDK1.7 扩容死循环问题的分析。")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/resize1.png",alt:""}})]),t._v(" "),v("p",[t._v("新建一个更大尺寸的hash表，然后把数据从老的hash表中迁移到新的hash表中。重点看下transfer方法：")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/resize2.png",alt:""}})]),t._v(" "),v("p",[t._v("假设HashMap初始化大小为2，hash算法就是用key mod 表的长度，在mod 2以后都冲突在table[1]这里了。负载因子是 1.5 (默认为 0.75 )，由公式"),v("code",[t._v("threshold=负载因子 * hash表长度")]),t._v("可得，"),v("code",[t._v("threshold=1.5 * 2 =3")]),t._v("，size=3，而 size>=threshold 就要扩容，所以 hash表要 resize 成 4。")]),t._v(" "),v("p",[t._v("未resize前的table如下图：")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/map%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%80%A7%E9%97%AE%E9%A2%98-%E7%AC%AC10%E9%A1%B5.png",alt:""}})]),t._v(" "),v("p",[t._v("正常的ReHash，得到的结果如下图所示：")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/map%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%80%A7%E9%97%AE%E9%A2%98-%E7%AC%AC9%E9%A1%B5.png",alt:""}})]),t._v(" "),v("p",[t._v("我们来看看多线程下的ReHash，假设现在有两个线程同时进行，线程1和线程2，两个线程都会新建新的数组，下面是resize 的过程。")]),t._v(" "),v("p",[v("strong",[t._v("Step1:")])]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/carbon.png",alt:""}})]),t._v(" "),v("p",[t._v("假设 "),v("strong",[t._v("线程1")]),t._v(" 在执行到"),v("code",[t._v("Entry<K,V> next = e.next;")]),t._v("之后，cpu 时间片用完了，被调度挂起，这时"),v("strong",[t._v("线程1的 e")]),t._v(" 指向 节点A，"),v("strong",[t._v("线程1的 next")]),t._v(" 指向节点B。")]),t._v(" "),v("p",[v("strong",[t._v("线程2")]),t._v("继续执行，")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/map%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%80%A7%E9%97%AE%E9%A2%98-%E7%AC%AC1%E9%A1%B5.png",alt:""}})]),t._v(" "),v("p",[v("strong",[t._v("Step2:")])]),t._v(" "),v("p",[t._v("线程 1 被调度回来执行。")]),t._v(" "),v("ul",[v("li",[t._v("先是执行 newTalbe[i] = e;")]),t._v(" "),v("li",[t._v("然后是e = next，导致了e指向了节点B，")]),t._v(" "),v("li",[t._v("而下一次循环的next = e.next导致了next指向了节点A。")])]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/map%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%80%A7%E9%97%AE%E9%A2%98-%E7%AC%AC2%E9%A1%B5.png",alt:""}})]),t._v(" "),v("p",[v("strong",[t._v("Step3:")])]),t._v(" "),v("p",[t._v("线程1 接着工作。"),v("strong",[t._v("把节点B摘下来，放到newTable[i]的第一个，然后把e和next往下移")]),t._v("。")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/map%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%80%A7%E9%97%AE%E9%A2%98-%E7%AC%AC3%E9%A1%B5.png",alt:""}})]),t._v(" "),v("p",[v("strong",[t._v("Step4:")]),t._v(" 出现环形链表")]),t._v(" "),v("p",[t._v("e.next = newTable[i] 导致A.next 指向了 节点B，此时的B.next 已经指向了节点A，出现"),v("strong",[t._v("环形链表")]),t._v("。")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/map%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%80%A7%E9%97%AE%E9%A2%98-%E7%AC%AC4%E9%A1%B5.png",alt:""}})]),t._v(" "),v("p",[t._v("如果get一个在此链表中不存在的key时，就会出现死循环了。如 get(11)时，就发生了死循环。")]),t._v(" "),v("p",[t._v("分析见get方法的源码：")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/carbon1.png",alt:""}})]),t._v(" "),v("p",[t._v("for循环中的"),v("code",[t._v("e = e.next")]),t._v("永远不会为空，那么，如果get一个在这个链表中不存在的key时，就会出现死循环了。")]),t._v(" "),v("h2",{attrs:{id:"多线程的put可能导致元素的丢失"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#多线程的put可能导致元素的丢失"}},[t._v("#")]),t._v(" 多线程的put可能导致元素的丢失")]),t._v(" "),v("p",[t._v("多线程同时执行 put 操作，如果计算出来的索引位置是相同的，那会造成前一个 key 被后一个 key 覆盖，从而导致元素的丢失。此问题在JDK 1.7和 JDK 1.8 中都存在。")]),t._v(" "),v("p",[t._v("我们来看下JDK 1.8 中 put 方法的部分源码，重点看黄色部分：")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/carbon4.png",alt:""}})]),t._v(" "),v("p",[t._v("我们来演示个例子。")]),t._v(" "),v("p",[t._v("假设线程1和线程2同时执行put，线程1执行put(“1”, “A”)，线程2执行put(“5”, “B”)，hash算法就是用key mod 表的长度，表长度为4，在mod 4 以后都冲突在table[1]这里了。注：下面的例子，只演示了 "),v("code",[t._v("#1")]),t._v(" 和"),v("code",[t._v("#2")]),t._v("代码的情况，其他代码也会出现类似情况。")]),t._v(" "),v("p",[t._v("正常情况下，put完成后，table的状态应该是下图中的任意一个。")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/map%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%80%A7%E9%97%AE%E9%A2%98-%E7%AC%AC6%E9%A1%B5.png",alt:""}})]),t._v(" "),v("p",[t._v("下面来看看异常情况，两个线程都执行了"),v("code",[t._v("#1")]),t._v("处的"),v("code",[t._v("if ((p = tab[i = (n - 1) & hash]) == null)")]),t._v("这句代码。")]),t._v(" "),v("p",[t._v("此时假设线程1 先执行"),v("code",[t._v("#2")]),t._v("处的"),v("code",[t._v("tab[i] = newNode(hash, key, value, null);")])]),t._v(" "),v("p",[t._v("那么table会变成如下状态：")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/map%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%80%A7%E9%97%AE%E9%A2%98-%E7%AC%AC7%E9%A1%B5.png",alt:""}})]),t._v(" "),v("p",[t._v("紧接着线程2 执行"),v("code",[t._v("tab[i] = newNode(hash, key, value, null);")])]),t._v(" "),v("p",[t._v("此时table会变成如下状态:")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/map%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E6%80%A7%E9%97%AE%E9%A2%98-%E7%AC%AC8%E9%A1%B5.png",alt:""}})]),t._v(" "),v("p",[t._v("这样一来，元素A就丢失了。")]),t._v(" "),v("h2",{attrs:{id:"put和get并发时-可能导致get为null"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#put和get并发时-可能导致get为null"}},[t._v("#")]),t._v(" put和get并发时，可能导致get为null")]),t._v(" "),v("p",[t._v("线程1执行put时，因为元素个数超出threshold而导致rehash，线程2此时执行get，有可能导致这个问题。此问题在JDK 1.7和 JDK 1.8 中都存在。")]),t._v(" "),v("p",[t._v("我们来看下JDK 1.8 中 resize 方法的部分源码，重点看黄色部分：")]),t._v(" "),v("p",[v("img",{attrs:{src:"http://blog-img.coolsen.cn/img/carbon3.png",alt:""}})]),t._v(" "),v("p",[t._v("在代码"),v("code",[t._v("#1")]),t._v("位置，用新计算的容量new了一个新的hash表，"),v("code",[t._v("#2")]),t._v("将新创建的空hash表赋值给实例变量table。")]),t._v(" "),v("p",[t._v("注意此时实例变量table是空的，如果此时另一个线程执行get，就会get出null。")]),t._v(" "),v("h2",{attrs:{id:"巨人的肩膀"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#巨人的肩膀"}},[t._v("#")]),t._v(" 巨人的肩膀")]),t._v(" "),v("p",[t._v("http://mailinator.blogspot.com/2009/06/beautiful-race-condition.html")]),t._v(" "),v("p",[t._v("https://coolshell.cn/articles/9606.html")]),t._v(" "),v("p",[t._v("https://juejin.cn/post/6844903554264596487")]),t._v(" "),v("p",[t._v("https://juejin.cn/post/6844903796225605640")])])}),[],!1,null,null,null);v.default=p.exports}}]);