(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{1360:function(t,_,s){t.exports=s.p+"assets/img/image30.3f62621d.png"},1361:function(t,_,s){t.exports=s.p+"assets/img/image31.0bd2abcb.png"},1362:function(t,_,s){t.exports=s.p+"assets/img/image32.0aee0cda.png"},1363:function(t,_,s){t.exports=s.p+"assets/img/image33.e7bb58c4.png"},1364:function(t,_,s){t.exports=s.p+"assets/img/image34.974c700d.png"},1365:function(t,_,s){t.exports=s.p+"assets/img/image35.28c24c72.png"},1366:function(t,_,s){t.exports=s.p+"assets/img/image36.8f5d0dc3.png"},1367:function(t,_,s){t.exports=s.p+"assets/img/image37.1a3318f1.png"},1741:function(t,_,s){"use strict";s.r(_);var a=s(1),v=Object(a.a)({},(function(){var t=this,_=t._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h2",{attrs:{id:"_1-二叉树和b树"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-二叉树和b树"}},[t._v("#")]),t._v(" 1：二叉树和B树")]),t._v(" "),_("h3",{attrs:{id:"_1-1-二叉树问题分析"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-二叉树问题分析"}},[t._v("#")]),t._v(" 1.1 二叉树问题分析")]),t._v(" "),_("p",[t._v("二叉树的操作效率较高，但是也存在问题, 请看下面的二叉树")]),t._v(" "),_("p",[_("img",{attrs:{src:s(1360),alt:"alt text"}})]),t._v(" "),_("ul",[_("li",[_("ol",[_("li",[t._v("二叉树需要加载到内存的，如果二叉树的节点少，没有什么问题，但是如果二叉树的节点很多(比如 1 亿)， "),_("strong",[t._v("就存在如下问题")]),t._v(":")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"2"}},[_("li",[_("strong",[t._v("问题 1")]),t._v("：在构建二叉树时，需要多次进行 i/o 操作(海量数据存在数据库或文件中)，节点海量，构建二叉树时， 速度有影响")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"3"}},[_("li",[_("strong",[t._v("问题 2")]),t._v("：节点海量，也会造成二叉树的 "),_("strong",[t._v("高度很大")]),t._v("，会降低操作速度")])])])]),t._v(" "),_("h3",{attrs:{id:"_1-2-多叉树"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-多叉树"}},[t._v("#")]),t._v(" 1.2 多叉树")]),t._v(" "),_("ul",[_("li",[_("ol",[_("li",[t._v("在二叉树中，每个节点有数据项，最多有两个子节点。如果允许每个节点可以有更多的数据项和更多的子节点， 就是 "),_("strong",[t._v("多叉树（multiway tree）")])])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"2"}},[_("li",[t._v("后面我们讲解的 2-3 树，2-3-4 树就是多叉树，多叉树通过重新组织节点，减少树的高度，能对二叉树进行优化。")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"3"}},[_("li",[t._v("举例说明(下面 2-3 树就是一颗多叉树)")])])])]),t._v(" "),_("p",[_("img",{attrs:{src:s(1361),alt:"alt text"}})]),t._v(" "),_("h3",{attrs:{id:"_1-3-b树的介绍"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-b树的介绍"}},[t._v("#")]),t._v(" 1.3 B树的介绍")]),t._v(" "),_("blockquote",[_("p",[_("code",[t._v("B树")]),t._v(" 通过重新组织节点，"),_("strong",[t._v("降低树的高度")]),t._v("，并且 "),_("strong",[t._v("减少 I/o 读写次数来提升效率")]),t._v("。")])]),t._v(" "),_("p",[_("img",{attrs:{src:s(1362),alt:"alt text"}})]),t._v(" "),_("ul",[_("li",[_("ol",[_("li",[t._v("如图 B 树通过重新组织节点， "),_("strong",[t._v("降低了树的高度")]),t._v(".")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"2"}},[_("li",[t._v("文件系统及数据库系统的设计者利用了 "),_("strong",[t._v("磁盘预读原理")]),t._v("，将一个节点的大小设为等于一个页(页得大小通常为 4k)， 这样每个节点只需要一次 I/O 就可以完全载入")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"3"}},[_("li",[t._v("将树的度 M 设置为 1024，在 600 亿个元素中最多只需要 4 次 I/O 操作就可以读取到想要的元素, B 树(B+)广泛 应用于文件存储系统以及数据库系统中")])])])]),t._v(" "),_("h2",{attrs:{id:"_2-2-3树"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-3树"}},[t._v("#")]),t._v(" 2：2-3树")]),t._v(" "),_("blockquote",[_("p",[t._v("2-3树 是最简单的B树")])]),t._v(" "),_("h3",{attrs:{id:"_2-1-特点"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-特点"}},[t._v("#")]),t._v(" 2.1 特点")]),t._v(" "),_("ul",[_("li",[_("ol",[_("li",[_("strong",[t._v("2-3 树")]),t._v(" 的 "),_("strong",[t._v("所有叶子节点")]),t._v(" 都在 "),_("strong",[t._v("同一层")]),t._v(".(只要是 B 树都满足这个条件)")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"2"}},[_("li",[t._v("有两个子节点的节点叫 "),_("strong",[t._v("二节点")]),t._v("，"),_("strong",[t._v("二节点要么没有子节点，要么有两个子节点")])])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"3"}},[_("li",[t._v("有三个子节点的节点叫 "),_("strong",[t._v("三节点")]),t._v("，"),_("strong",[t._v("三节点要么没有子节点，要么有三个子节点")])])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"4"}},[_("li",[t._v("2-3 树是由 "),_("strong",[t._v("二节点")]),t._v(" 和 "),_("strong",[t._v("三节点")]),t._v(" 构成的树。")])])])]),t._v(" "),_("h3",{attrs:{id:"_2-2-应用案例"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-应用案例"}},[t._v("#")]),t._v(" 2.2 应用案例")]),t._v(" "),_("p",[t._v("将数列 "),_("code",[t._v("{16, 24, 12, 32, 14, 26, 34, 10, 8, 28, 38, 20}")]),t._v(" 构建成 2-3 树，并保证数据插入的大小顺序。(演示一下构建 2-3 树的过程.)")]),t._v(" "),_("p",[_("img",{attrs:{src:s(1363),alt:"alt text"}})]),t._v(" "),_("ul",[_("li",[_("ol",[_("li",[t._v("2-3 树的 "),_("strong",[t._v("所有叶子节点都在同一层")]),t._v(".(只要是 B 树都满足这个条件)")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"2"}},[_("li",[t._v("有两个子节点的节点叫二节点，二节点要么没有子节点，要么有两个子节点.")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"3"}},[_("li",[t._v("有三个子节点的节点叫三节点，三节点要么没有子节点，要么有三个子节点")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"4"}},[_("li",[t._v("当按照规则插入一个数到某个节点时，不能满足上面三个要求，就需要拆，"),_("strong",[t._v("先向上拆")]),t._v("，如果上层满，"),_("strong",[t._v("则拆本层")]),t._v("， 拆后仍然需要满足上面 3 个条件。")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"5"}},[_("li",[t._v("对于三节点的子树的值大小仍然遵守(BST 二叉排序树)的规则")])])])]),t._v(" "),_("h3",{attrs:{id:"_2-3-其他"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-其他"}},[t._v("#")]),t._v(" 2.3 其他")]),t._v(" "),_("p",[t._v("除了 23 树，还有 234 树等，概念和 23 树类似，也是一种 B 树。 如图:")]),t._v(" "),_("p",[_("img",{attrs:{src:s(1364),alt:"alt text"}})]),t._v(" "),_("h2",{attrs:{id:"_3-b-树、b-树和-b-树"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-b-树、b-树和-b-树"}},[t._v("#")]),t._v(" 3：B 树、B+树和 B*树")]),t._v(" "),_("h3",{attrs:{id:"_3-1-b-树的介绍"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-b-树的介绍"}},[t._v("#")]),t._v(" 3.1 B 树的介绍")]),t._v(" "),_("blockquote",[_("p",[_("code",[t._v("B-tree")]),t._v(" 树即 B 树，B 即 Balanced，平衡的意思。有人把 B-tree 翻译成 B-树，容易让人产生误解。会以为 B-树 是一种树，而 B 树又是另一种树。实际上，B-tree 就是指的 B 树。")])]),t._v(" "),_("p",[_("img",{attrs:{src:s(1365),alt:"alt text"}})]),t._v(" "),_("p",[t._v("对上图的说明:")]),t._v(" "),_("ul",[_("li",[_("ol",[_("li",[t._v("B 树的阶：节点的最多子节点个数。比如 2-3 树的阶是 3，2-3-4 树的阶是 4")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"2"}},[_("li",[t._v("B-树的搜索，从根结点开始，对结点内的关键字（有序）序列进行二分查找，如果命中则结束，否则进入查询 关键字所属范围的儿子结点；重复，直到所对应的儿子指针为空，或已经是叶子结点")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"3"}},[_("li",[t._v("关键字集合分布在整颗树中, 即叶子节点和非叶子节点都存放数据.")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"4"}},[_("li",[t._v("搜索有可能在非叶子结点结束")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"5"}},[_("li",[t._v("其搜索性能等价于在关键字全集内做一次二分查找")])])])]),t._v(" "),_("h3",{attrs:{id:"_3-2-b-树的介绍"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-b-树的介绍"}},[t._v("#")]),t._v(" 3.2 B+树的介绍")]),t._v(" "),_("p",[t._v("B+树是 B 树的变体，也是一种多路搜索树。")]),t._v(" "),_("p",[_("img",{attrs:{src:s(1366),alt:"alt text"}})]),t._v(" "),_("p",[t._v("对上图的说明:")]),t._v(" "),_("ul",[_("li",[_("ol",[_("li",[t._v("B+树的搜索与 B 树也基本相同，区别是 "),_("strong",[t._v("B+树只有达到叶子结点才命中")]),t._v("（B 树可以在非叶子结点命中），其性 能也等价于在关键字全集做一次二分查找")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"2"}},[_("li",[t._v("所有关键字都出现在叶子结点的链表中（即数据只能在叶子节点【也叫稠密索引】），且链表中的关键字(数据) 恰好是有序的。")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"3"}},[_("li",[t._v("不可能在非叶子结点命中")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"4"}},[_("li",[t._v("非叶子结点相当于是叶子结点的索引（稀疏索引），叶子结点相当于是存储（关键字）数据的数据层")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"5"}},[_("li",[t._v("更适合文件索引系统")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"6"}},[_("li",[t._v("B 树和 B+树各有自己的应用场景，不能说 B+树完全比 B 树好，反之亦然.")])])])]),t._v(" "),_("h3",{attrs:{id:"_3-3-b-树的介绍"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-b-树的介绍"}},[t._v("#")]),t._v(" 3.3 B*树的介绍")]),t._v(" "),_("p",[t._v("B*树是 B+树的变体，在 B+树的 "),_("strong",[t._v("非根和非叶子结点")]),t._v(" 再 "),_("strong",[t._v("增加指向兄弟的指针")]),t._v("。")]),t._v(" "),_("p",[_("img",{attrs:{src:s(1367),alt:"alt text"}})]),t._v(" "),_("p",[t._v("B*树的说明:")]),t._v(" "),_("ul",[_("li",[_("ol",[_("li",[t._v("B*树定义了非叶子结点关键字个数至少为(2/3)*M，即块的最低使用率为 2/3，而 B+树的块的最低使用率为的 1/2。")])])]),t._v(" "),_("li",[_("ol",{attrs:{start:"2"}},[_("li",[t._v("从第 1 个特点我们可以看出，B*树分配新结点的概率比 B+树要低，空间使用率更高")])])])])])}),[],!1,null,null,null);_.default=v.exports}}]);