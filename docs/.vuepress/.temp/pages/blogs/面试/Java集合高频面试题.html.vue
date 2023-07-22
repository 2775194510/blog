<template><div><h2 id="_1-常见的集合有哪些" tabindex="-1"><a class="header-anchor" href="#_1-常见的集合有哪些" aria-hidden="true">#</a> 1. 常见的集合有哪些？</h2>
<p>Java集合类主要由两个根接口<strong>Collection</strong>和<strong>Map</strong>派生出来的，Collection派生出了三个子接口：List、Set、Queue（Java5新增的队列），因此Java集合大致也可分成List、Set、Queue、Map四种接口体系。</p>
<p><strong>注意：Collection是一个接口，Collections是一个工具类，Map不是Collection的子接口</strong>。</p>
<p>Java集合框架图如下：</p>
<p><img src="http://blog-img.coolsen.cn/img/image-20210403163733569.png" alt=""></p>
<p><img src="http://blog-img.coolsen.cn/img/image-20210403163751501.png" alt=""></p>
<p>图中，List代表了有序可重复集合，可直接根据元素的索引来访问；Set代表无序不可重复集合，只能根据元素本身来访问；Queue是队列集合。</p>
<p>Map代表的是存储key-value对的集合，可根据元素的key来访问value。</p>
<p>上图中淡绿色背景覆盖的是集合体系中常用的实现类，分别是ArrayList、LinkedList、ArrayQueue、HashSet、TreeSet、HashMap、TreeMap等实现类。</p>
<h2 id="_2-线程安全的集合有哪些-线程不安全的呢" tabindex="-1"><a class="header-anchor" href="#_2-线程安全的集合有哪些-线程不安全的呢" aria-hidden="true">#</a> 2. 线程安全的集合有哪些？线程不安全的呢？</h2>
<p>线程安全的：</p>
<ul>
<li>Hashtable：比HashMap多了个线程安全。</li>
<li>ConcurrentHashMap:是一种高效但是线程安全的集合。</li>
<li>Vector：比Arraylist多了个同步化机制。</li>
<li>Stack：栈，也是线程安全的，继承于Vector。</li>
</ul>
<p>线性不安全的：</p>
<ul>
<li>HashMap</li>
<li>Arraylist</li>
<li>LinkedList</li>
<li>HashSet</li>
<li>TreeSet</li>
<li>TreeMap</li>
</ul>
<h2 id="_3-arraylist与-linkedlist-异同点" tabindex="-1"><a class="header-anchor" href="#_3-arraylist与-linkedlist-异同点" aria-hidden="true">#</a> 3. Arraylist与 LinkedList 异同点？</h2>
<ul>
<li><strong>是否保证线程安全：</strong> ArrayList 和 LinkedList 都是不同步的，也就是不保证线程安全；</li>
<li><strong>底层数据结构：</strong> Arraylist 底层使用的是Object数组；LinkedList 底层使用的是双向循环链表数据结构；</li>
<li><strong>插入和删除是否受元素位置的影响：</strong> <strong>ArrayList 采用数组存储，所以插入和删除元素的时间复杂度受元素位置的影响。</strong> 比如：执行<code v-pre>add(E e)</code>方法的时候， ArrayList 会默认在将指定的元素追加到此列表的末尾，这种情况时间复杂度就是O(1)。但是如果要在指定位置 i 插入和删除元素的话（<code v-pre>add(int index, E element)</code>）时间复杂度就为 O(n-i)。因为在进行上述操作的时候集合中第 i 和第 i 个元素之后的(n-i)个元素都要执行向后位/向前移一位的操作。  <strong>LinkedList 采用链表存储，所以插入，删除元素时间复杂度不受元素位置的影响，都是近似 O（1）而数组为近似 O（n）。</strong></li>
<li><strong>是否支持快速随机访问：</strong> LinkedList 不支持高效的随机元素访问，而ArrayList 实现了RandmoAccess 接口，所以有随机访问功能。快速随机访问就是通过元素的序号快速获取元素对象(对应于<code v-pre>get(int index)</code>方法)。</li>
<li><strong>内存空间占用：</strong> ArrayList的空 间浪费主要体现在在list列表的结尾会预留一定的容量空间，而LinkedList的空间花费则体现在它的每一个元素都需要消耗比ArrayList更多的空间（因为要存放直接后继和直接前驱以及数据）。</li>
</ul>
<h2 id="_4-arraylist-与-vector-区别" tabindex="-1"><a class="header-anchor" href="#_4-arraylist-与-vector-区别" aria-hidden="true">#</a> 4. ArrayList 与 Vector 区别？</h2>
<ul>
<li>Vector是线程安全的，ArrayList不是线程安全的。其中，Vector在关键性的方法前面都加了synchronized关键字，来保证线程的安全性。如果有多个线程会访问到集合，那最好是使用 Vector，因为不需要我们自己再去考虑和编写线程安全的代码。</li>
<li>ArrayList在底层数组不够用时在原来的基础上扩展0.5倍，Vector是扩展1倍，这样ArrayList就有利于节约内存空间。</li>
</ul>
<h2 id="_5-说一说arraylist-的扩容机制" tabindex="-1"><a class="header-anchor" href="#_5-说一说arraylist-的扩容机制" aria-hidden="true">#</a> 5. 说一说ArrayList 的扩容机制？</h2>
<p>ArrayList扩容的本质就是计算出新的扩容数组的size后实例化，并将原有数组内容复制到新数组中去。<strong>默认情况下，新的容量会是原容量的1.5倍</strong>。</p>
<p>以JDK1.8为例说明:</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>public boolean add(E e) {
    //判断是否可以容纳e，若能，则直接添加在末尾；若不能，则进行扩容，然后再把e添加在末尾
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    //将e添加到数组末尾
    elementData[size++] = e;
    return true;
    }

// 每次在add()一个元素时，arraylist都需要对这个list的容量进行一个判断。通过ensureCapacityInternal()方法确保当前ArrayList维护的数组具有存储新元素的能力，经过处理之后将元素存储在数组elementData的尾部

private void ensureCapacityInternal(int minCapacity) {
      ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}

private static int calculateCapacity(Object[] elementData, int minCapacity) {
        //如果传入的是个空数组则最小容量取默认容量与minCapacity之间的最大值
        if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
            return Math.max(DEFAULT_CAPACITY, minCapacity);
        }
        return minCapacity;
    }
    
  private void ensureExplicitCapacity(int minCapacity) {
        modCount++;
        // 若ArrayList已有的存储能力满足最低存储要求，则返回add直接添加元素；如果最低要求的存储能力&gt;ArrayList已有的存储能力，这就表示ArrayList的存储能力不足，因此需要调用 grow();方法进行扩容
        if (minCapacity - elementData.length &gt; 0)
            grow(minCapacity);
    }


private void grow(int minCapacity) {
        // 获取elementData数组的内存空间长度
        int oldCapacity = elementData.length;
        // 扩容至原来的1.5倍
        int newCapacity = oldCapacity + (oldCapacity &gt;&gt; 1);
        //校验容量是否够
        if (newCapacity - minCapacity &lt; 0)
            newCapacity = minCapacity;
        //若预设值大于默认的最大值，检查是否溢出
        if (newCapacity - MAX_ARRAY_SIZE &gt; 0)
            newCapacity = hugeCapacity(minCapacity);
        // 调用Arrays.copyOf方法将elementData数组指向新的内存空间
         //并将elementData的数据复制到新的内存空间
        elementData = Arrays.copyOf(elementData, newCapacity);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-array-和-arraylist-有什么区别-什么时候该应-array-而不是-arraylist-呢" tabindex="-1"><a class="header-anchor" href="#_6-array-和-arraylist-有什么区别-什么时候该应-array-而不是-arraylist-呢" aria-hidden="true">#</a> 6. Array 和 ArrayList 有什么区别？什么时候该应 Array 而不是 ArrayList 呢？</h2>
<ul>
<li>
<p>Array 可以包含基本类型和对象类型，ArrayList 只能包含对象类型。</p>
</li>
<li>
<p>Array 大小是固定的，ArrayList 的大小是动态变化的。</p>
</li>
<li>
<p>ArrayList 提供了更多的方法和特性，比如：addAll()，removeAll()，iterator() 等等。</p>
</li>
<li></li>
</ul>
<h2 id="_7-hashmap的底层数据结构是什么" tabindex="-1"><a class="header-anchor" href="#_7-hashmap的底层数据结构是什么" aria-hidden="true">#</a> 7. HashMap的底层数据结构是什么？</h2>
<p>在JDK1.7 和JDK1.8 中有所差别：</p>
<p>在JDK1.7 中，由“数组+链表”组成，数组是 HashMap 的主体，链表则是主要为了解决哈希冲突而存在的。</p>
<p>在JDK1.8 中，由“数组+链表+红黑树”组成。当链表过长，则会严重影响 HashMap 的性能，红黑树搜索时间复杂度是 O(logn)，而链表是糟糕的 O(n)。因此，JDK1.8 对数据结构做了进一步的优化，引入了红黑树，链表和红黑树在达到一定条件会进行转换：</p>
<ul>
<li>
<p>当链表超过 8 且数据总量超过 64 才会转红黑树。</p>
</li>
<li>
<p>将链表转换成红黑树前会判断，如果当前数组的长度小于 64，那么会选择先进行数组扩容，而不是转换为红黑树，以减少搜索时间。</p>
</li>
</ul>
<p><img src="http://blog-img.coolsen.cn/img/image-20210112185830788.png" alt="Jdk1.8 HashMap结构"></p>
<h2 id="_8-解决hash冲突的办法有哪些-hashmap用的哪种" tabindex="-1"><a class="header-anchor" href="#_8-解决hash冲突的办法有哪些-hashmap用的哪种" aria-hidden="true">#</a> 8. 解决hash冲突的办法有哪些？HashMap用的哪种？</h2>
<p>解决Hash冲突方法有:开放定址法、再哈希法、链地址法（拉链法）、建立公共溢出区。HashMap中采用的是 链地址法 。</p>
<ul>
<li>开放定址法也称为<code v-pre>再散列法</code>，基本思想就是，如果<code v-pre>p=H(key)</code>出现冲突时，则以<code v-pre>p</code>为基础，再次hash，<code v-pre>p1=H(p)</code>,如果p1再次出现冲突，则以p1为基础，以此类推，直到找到一个不冲突的哈希地址<code v-pre>pi</code>。 因此开放定址法所需要的hash表的长度要大于等于所需要存放的元素，而且因为存在再次hash，所以<code v-pre>只能在删除的节点上做标记，而不能真正删除节点。</code></li>
<li>再哈希法(双重散列，多重散列)，提供多个不同的hash函数，当<code v-pre>R1=H1(key1)</code>发生冲突时，再计算<code v-pre>R2=H2(key1)</code>，直到没有冲突为止。 这样做虽然不易产生堆集，但增加了计算的时间。</li>
<li>链地址法(拉链法)，将哈希值相同的元素构成一个同义词的单链表,并将单链表的头指针存放在哈希表的第i个单元中，查找、插入和删除主要在同义词链表中进行。链表法适用于经常进行插入和删除的情况。</li>
<li>建立公共溢出区，将哈希表分为公共表和溢出表，当溢出发生时，将所有溢出数据统一放到溢出区。</li>
</ul>
<h2 id="_9-为什么在解决-hash-冲突的时候-不直接用红黑树-而选择先用链表-再转红黑树" tabindex="-1"><a class="header-anchor" href="#_9-为什么在解决-hash-冲突的时候-不直接用红黑树-而选择先用链表-再转红黑树" aria-hidden="true">#</a> 9. 为什么在解决 hash 冲突的时候，不直接用红黑树？而选择先用链表，再转红黑树?</h2>
<p>因为红黑树需要进行左旋，右旋，变色这些操作来保持平衡，而单链表不需要。当元素小于 8 个的时候，此时做查询操作，链表结构已经能保证查询性能。当元素大于 8 个的时候， 红黑树搜索时间复杂度是 O(logn)，而链表是 O(n)，此时需要红黑树来加快查询速度，但是新增节点的效率变慢了。</p>
<p>因此，如果一开始就用红黑树结构，元素太少，新增效率又比较慢，无疑这是浪费性能的。</p>
<h2 id="_10-hashmap默认加载因子是多少-为什么是-0-75-不是-0-6-或者-0-8" tabindex="-1"><a class="header-anchor" href="#_10-hashmap默认加载因子是多少-为什么是-0-75-不是-0-6-或者-0-8" aria-hidden="true">#</a> 10. HashMap默认加载因子是多少？为什么是 0.75，不是 0.6 或者 0.8 ？</h2>
<p>回答这个问题前，我们来先看下HashMap的默认构造函数：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>     int threshold;             // 容纳键值对的最大值
     final float loadFactor;    // 负载因子
     int modCount;  
     int size;  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Node[] table的初始化长度length(默认值是16)，Load factor为负载因子(默认值是0.75)，threshold是HashMap所能容纳键值对的最大值。threshold = length * Load factor。也就是说，在数组定义好长度之后，负载因子越大，所能容纳的键值对个数越多。</p>
<p>默认的loadFactor是0.75，0.75是对空间和时间效率的一个平衡选择，一般不要修改，除非在时间和空间比较特殊的情况下 ：</p>
<ul>
<li>
<p>如果内存空间很多而又对时间效率要求很高，可以降低负载因子Load factor的值 。</p>
</li>
<li>
<p>相反，如果内存空间紧张而对时间效率要求不高，可以增加负载因子loadFactor的值，这个值可以大于1。</p>
</li>
</ul>
<p>我们来追溯下作者在源码中的注释（JDK1.7）：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>As a general rule, the default load factor (.75) offers a good tradeoff between time and space costs. Higher values decrease the space overhead but increase the lookup cost (reflected in most of the operations of the HashMap class, including get and put). The expected number of entries in the map and its load factor should be taken into account when setting its initial capacity, so as to minimize the number of rehash operations. If the initial capacity is greater than the maximum number of entries divided by the load factor, no rehash operations will ever occur.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>翻译过来大概的意思是：作为一般规则，默认负载因子（0.75）在时间和空间成本上提供了很好的折衷。较高的值会降低空间开销，但提高查找成本（体现在大多数的HashMap类的操作，包括get和put）。设置初始大小时，应该考虑预计的entry数在map及其负载系数，并且尽量减少rehash操作的次数。如果初始容量大于最大条目数除以负载因子，rehash操作将不会发生。</p>
<h2 id="_11-hashmap-中-key-的存储索引是怎么计算的" tabindex="-1"><a class="header-anchor" href="#_11-hashmap-中-key-的存储索引是怎么计算的" aria-hidden="true">#</a> 11. HashMap 中  key 的存储索引是怎么计算的？</h2>
<p>首先根据key的值计算出hashcode的值，然后根据hashcode计算出hash值，最后通过hash&amp;（length-1）计算得到存储的位置。看看源码的实现：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>// jdk1.7
方法一：
static int hash(int h) {
    int h = hashSeed;
        if (0 != h &amp;&amp; k instanceof String) {
            return sun.misc.Hashing.stringHash32((String) k);
        }

    h ^= k.hashCode(); // 为第一步：取hashCode值
    h ^= (h &gt;&gt;&gt; 20) ^ (h &gt;&gt;&gt; 12); 
    return h ^ (h &gt;&gt;&gt; 7) ^ (h &gt;&gt;&gt; 4);
}
方法二：
static int indexFor(int h, int length) {  //jdk1.7的源码，jdk1.8没有这个方法，但实现原理一样
     return h &amp; (length-1);  //第三步：取模运算
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>// jdk1.8
static final int hash(Object key) {   
     int h;
     return (key == null) ? 0 : (h = key.hashCode()) ^ (h &gt;&gt;&gt; 16);
    /* 
     h = key.hashCode() 为第一步：取hashCode值
     h ^ (h &gt;&gt;&gt; 16)  为第二步：高位参与运算
    */
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的 Hash 算法本质上就是三步：<strong>取key的 hashCode 值、根据 hashcode 计算出hash值、通过取模计算下标</strong>。其中，JDK1.7和1.8的不同之处，就在于第二步。我们来看下详细过程，以JDK1.8为例，n为table的长度。</p>
<p><img src="http://blog-img.coolsen.cn/img/image-20210112191920111.png" alt="image-20210112191920111"></p>
<h2 id="_12-hashmap-的put方法流程" tabindex="-1"><a class="header-anchor" href="#_12-hashmap-的put方法流程" aria-hidden="true">#</a> 12. HashMap 的put方法流程？</h2>
<p>简要流程如下：</p>
<ol>
<li>
<p>首先根据 key 的值计算 hash 值，找到该元素在数组中存储的下标；</p>
</li>
<li>
<p>如果数组是空的，则调用 resize 进行初始化；</p>
</li>
<li>
<p>如果没有哈希冲突直接放在对应的数组下标里；</p>
</li>
<li>
<p>如果冲突了，且 key 已经存在，就覆盖掉 value；</p>
</li>
<li>
<p>如果冲突后，发现该节点是红黑树，就将这个节点挂在树上；</p>
</li>
<li>
<p>如果冲突后是链表，判断该链表是否大于 8 ，如果大于 8 并且数组容量小于 64，就进行扩容；如果链表节点大于 8 并且数组的容量大于 64，则将这个结构转换为红黑树；否则，链表插入键值对，若 key 存在，就覆盖掉 value。</p>
<p><img src="http://blog-img.coolsen.cn/img/hashmap之put方法.jpg" alt="hashmap之put方法(JDK1.8)"></p>
</li>
</ol>
<h2 id="_13-hashmap-的扩容方式" tabindex="-1"><a class="header-anchor" href="#_13-hashmap-的扩容方式" aria-hidden="true">#</a> 13. HashMap 的扩容方式？</h2>
<p>HashMap 在容量超过负载因子所定义的容量之后，就会扩容。Java 里的数组是无法自动扩容的，方法是将 HashMap 的大小扩大为原来数组的两倍，并将原来的对象放入新的数组中。</p>
<p>那扩容的具体步骤是什么？让我们看看源码。</p>
<p>先来看下JDK1.7 的代码：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>void resize(int newCapacity) {   //传入新的容量
        Entry[] oldTable = table;    //引用扩容前的Entry数组
        int oldCapacity = oldTable.length;
        if (oldCapacity == MAXIMUM_CAPACITY) {  //扩容前的数组大小如果已经达到最大(2^30)了
            threshold = Integer.MAX_VALUE; //修改阈值为int的最大值(2^31-1)，这样以后就不会扩容了
            return;
        }

        Entry[] newTable = new Entry[newCapacity];  //初始化一个新的Entry数组
        transfer(newTable);                         //！！将数据转移到新的Entry数组里
        table = newTable;                           //HashMap的table属性引用新的Entry数组
        threshold = (int)(newCapacity * loadFactor);//修改阈值
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里就是使用一个容量更大的数组来代替已有的容量小的数组，transfer()方法将原有Entry数组的元素拷贝到新的Entry数组里。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>void transfer(Entry[] newTable) {
        Entry[] src = table;                   //src引用了旧的Entry数组
        int newCapacity = newTable.length;
        for (int j = 0; j &lt; src.length; j++) { //遍历旧的Entry数组
            Entry&lt;K,V&gt; e = src[j];             //取得旧Entry数组的每个元素
            if (e != null) {
                src[j] = null;//释放旧Entry数组的对象引用（for循环后，旧的Entry数组不再引用任何对象）
                do {
                    Entry&lt;K,V&gt; next = e.next;
                    int i = indexFor(e.hash, newCapacity); //！！重新计算每个元素在数组中的位置
                    e.next = newTable[i]; //标记[1]
                    newTable[i] = e;      //将元素放在数组上
                    e = next;             //访问下一个Entry链上的元素
                } while (e != null);
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>newTable[i] 的引用赋给了 e.next ，也就是使用了单链表的头插入方式，同一位置上新元素总会被放在链表的头部位置；这样先放在一个索引上的元素终会被放到 Entry 链的尾部(如果发生了 hash 冲突的话）。</p>
<h2 id="_14-一般用什么作为hashmap的key" tabindex="-1"><a class="header-anchor" href="#_14-一般用什么作为hashmap的key" aria-hidden="true">#</a> 14. 一般用什么作为HashMap的key?</h2>
<p>一般用Integer、String 这种不可变类当 HashMap 当 key，而且 String 最为常用。</p>
<ul>
<li>因为字符串是不可变的，所以在它创建的时候 hashcode 就被缓存了，不需要重新计算。这就是 HashMap 中的键往往都使用字符串的原因。</li>
<li>因为获取对象的时候要用到 equals() 和 hashCode() 方法，那么键对象正确的重写这两个方法是非常重要的,这些类已经很规范的重写了 hashCode() 以及 equals() 方法。</li>
</ul>
<h2 id="_15-hashmap为什么线程不安全" tabindex="-1"><a class="header-anchor" href="#_15-hashmap为什么线程不安全" aria-hidden="true">#</a> 15. HashMap为什么线程不安全？</h2>
<p><img src="http://blog-img.coolsen.cn/img/HashMap为什么线程不安全.png" alt=""></p>
<ul>
<li>多线程下扩容死循环。JDK1.7中的 HashMap 使用头插法插入元素，在多线程的环境下，扩容的时候有可能导致环形链表的出现，形成死循环。因此，JDK1.8使用尾插法插入元素，在扩容时会保持链表元素原本的顺序，不会出现环形链表的问题。</li>
<li>多线程的put可能导致元素的丢失。多线程同时执行 put 操作，如果计算出来的索引位置是相同的，那会造成前一个 key 被后一个 key 覆盖，从而导致元素的丢失。此问题在JDK 1.7和 JDK 1.8 中都存在。</li>
<li>put和get并发时，可能导致get为null。线程1执行put时，因为元素个数超出threshold而导致rehash，线程2此时执行get，有可能导致这个问题。此问题在JDK 1.7和 JDK 1.8 中都存在。</li>
</ul>
<p>具体分析可见我的这篇文章：<a href="https://mp.weixin.qq.com/s?__biz=Mzg4MjUxMTI4NA==&amp;mid=2247484436&amp;idx=1&amp;sn=eb677611e2ba1d10e3eb3ceb825bef02&amp;chksm=cf54d8cff82351d9cb1c6ad49b6df8b7f0eaa7b965e3be5546b449e71ce1ffccf47ae68f7bf7&amp;token=1920060057&amp;lang=zh_CN#rd" target="_blank" rel="noopener noreferrer">面试官：HashMap 为什么线程不安全？</a></p>
<h2 id="_16-concurrenthashmap-的实现原理是什么" tabindex="-1"><a class="header-anchor" href="#_16-concurrenthashmap-的实现原理是什么" aria-hidden="true">#</a> 16. ConcurrentHashMap 的实现原理是什么？</h2>
<p>ConcurrentHashMap  在 JDK1.7 和 JDK1.8  的实现方式是不同的。</p>
<p><strong>先来看下JDK1.7</strong></p>
<p>JDK1.7中的ConcurrentHashMap  是由 <code v-pre>Segment</code> 数组结构和 <code v-pre>HashEntry</code> 数组结构组成，即ConcurrentHashMap 把哈希桶切分成小数组（Segment ），每个小数组有 n 个 HashEntry 组成。</p>
<p>其中，Segment 继承了 ReentrantLock，所以 Segment 是一种可重入锁，扮演锁的角色；HashEntry 用于存储键值对数据。</p>
<p><img src="http://blog-img.coolsen.cn/img/ConcurrentHashMap-jdk1.7.png" alt=""></p>
<p>首先将数据分为一段一段的存储，然后给每一段数据配一把锁，当一个线程占用锁访问其中一个段数据时，其他段的数据也能被其他线程访问，能够实现真正的并发访问。</p>
<p><strong>再来看下JDK1.8</strong></p>
<p>在数据结构上， JDK1.8  中的ConcurrentHashMap  选择了与 HashMap 相同的<strong>数组+链表+红黑树</strong>结构；在锁的实现上，抛弃了原有的 Segment 分段锁，采用<code v-pre>CAS + synchronized</code>实现更加低粒度的锁。</p>
<p>将锁的级别控制在了更细粒度的哈希桶元素级别，也就是说只需要锁住这个链表头结点（红黑树的根节点），就不会影响其他的哈希桶元素的读写，大大提高了并发度。</p>
<p><img src="http://blog-img.coolsen.cn/img/ConcurrentHashMap-jdk1.8.png" alt=""></p>
<h2 id="_17-concurrenthashmap-的-put-方法执行逻辑是什么" tabindex="-1"><a class="header-anchor" href="#_17-concurrenthashmap-的-put-方法执行逻辑是什么" aria-hidden="true">#</a> 17. ConcurrentHashMap  的 put 方法执行逻辑是什么？</h2>
<p><strong>先来看JDK1.7</strong></p>
<p>首先，会尝试获取锁，如果获取失败，利用自旋获取锁；如果自旋重试的次数超过 64 次，则改为阻塞获取锁。</p>
<p>获取到锁后：</p>
<ol>
<li>将当前 Segment 中的 table 通过 key 的 hashcode 定位到 HashEntry。</li>
<li>遍历该 HashEntry，如果不为空则判断传入的 key 和当前遍历的 key 是否相等，相等则覆盖旧的 value。</li>
<li>不为空则需要新建一个 HashEntry 并加入到 Segment 中，同时会先判断是否需要扩容。</li>
<li>释放 Segment 的锁。</li>
</ol>
<p><strong>再来看JDK1.8</strong></p>
<p>大致可以分为以下步骤：</p>
<ol>
<li>根据 key 计算出 hash值。</li>
<li>判断是否需要进行初始化。</li>
<li>定位到 Node，拿到首节点 f，判断首节点 f：
<ul>
<li>如果为  null  ，则通过cas的方式尝试添加。</li>
<li>如果为 <code v-pre>f.hash = MOVED = -1</code> ，说明其他线程在扩容，参与一起扩容。</li>
<li>如果都不满足 ，synchronized 锁住 f 节点，判断是链表还是红黑树，遍历插入。</li>
</ul>
</li>
<li>当在链表长度达到8的时候，数组扩容或者将链表转换为红黑树。</li>
</ol>
<p>源码分析可看这篇文章：<a href="https://mp.weixin.qq.com/s?__biz=Mzg4MjUxMTI4NA==&amp;mid=2247484715&amp;idx=1&amp;sn=f5c3ad8e66122531a1c77efcb9cb50b7&amp;chksm=cf54d9f0f82350e637a51fa8bc679f6197d15e4c9703aac971150bfcc5437e867c3bcf3f409c&amp;token=1920060057&amp;lang=zh_CN#rd" target="_blank" rel="noopener noreferrer">面试 ConcurrentHashMap ，看这一篇就够了！</a></p>
<h2 id="_18-concurrenthashmap-的-get-方法是否要加锁-为什么" tabindex="-1"><a class="header-anchor" href="#_18-concurrenthashmap-的-get-方法是否要加锁-为什么" aria-hidden="true">#</a> 18. ConcurrentHashMap 的 get 方法是否要加锁，为什么？</h2>
<p>get 方法不需要加锁。因为 Node 的元素 val 和指针 next 是用 volatile 修饰的，在多线程环境下线程A修改结点的val或者新增节点的时候是对线程B可见的。</p>
<p>这也是它比其他并发集合比如 Hashtable、用 Collections.synchronizedMap()包装的 HashMap 安全效率高的原因之一。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>static class Node&lt;K,V&gt; implements Map.Entry&lt;K,V&gt; {
    final int hash;	
    final K key;
    //可以看到这些都用了volatile修饰
    volatile V val;
    volatile Node&lt;K,V&gt; next;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_19-get方法不需要加锁与volatile修饰的哈希桶有关吗" tabindex="-1"><a class="header-anchor" href="#_19-get方法不需要加锁与volatile修饰的哈希桶有关吗" aria-hidden="true">#</a> 19. get方法不需要加锁与volatile修饰的哈希桶有关吗？</h2>
<p>没有关系。哈希桶<code v-pre>table</code>用volatile修饰主要是保证在数组扩容的时候保证可见性。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>static final class Segment&lt;K,V&gt; extends ReentrantLock implements Serializable {

    // 存放数据的桶
    transient volatile HashEntry&lt;K,V&gt;[] table;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_20-concurrenthashmap-不支持-key-或者-value-为-null-的原因" tabindex="-1"><a class="header-anchor" href="#_20-concurrenthashmap-不支持-key-或者-value-为-null-的原因" aria-hidden="true">#</a> 20. ConcurrentHashMap  不支持 key 或者 value 为  null  的原因？</h2>
<p>我们先来说value 为什么不能为 null ，因为<code v-pre>ConcurrentHashMap </code>是用于多线程的 ，如果<code v-pre>map.get(key)</code>得到了 null ，无法判断，是映射的value是 null ，还是没有找到对应的key而为 null ，这就有了二义性。</p>
<p>而用于单线程状态的<code v-pre>HashMap</code>却可以用<code v-pre>containsKey(key)</code> 去判断到底是否包含了这个 null 。</p>
<p>我们用<strong>反证法</strong>来推理：</p>
<p>假设ConcurrentHashMap 允许存放值为 null 的value，这时有A、B两个线程，线程A调用ConcurrentHashMap .get(key)方法，返回为 null ，我们不知道这个 null 是没有映射的 null ，还是存的值就是 null 。</p>
<p>假设此时，返回为 null 的真实情况是没有找到对应的key。那么，我们可以用ConcurrentHashMap .containsKey(key)来验证我们的假设是否成立，我们期望的结果是返回false。</p>
<p>但是在我们调用ConcurrentHashMap .get(key)方法之后，containsKey方法之前，线程B执行了ConcurrentHashMap .put(key, null )的操作。那么我们调用containsKey方法返回的就是true了，这就与我们的假设的真实情况不符合了，这就有了二义性。</p>
<p>至于ConcurrentHashMap 中的key为什么也不能为 null 的问题，源码就是这样写的，哈哈。如果面试官不满意，就回答因为作者Doug不喜欢 null ，所以在设计之初就不允许了 null 的key存在。想要深入了解的小伙伴，可以看这篇文章<a href="https://mp.weixin.qq.com/s?__biz=MzIxNTQ4MzE1NA==&amp;mid=2247484354&amp;idx=1&amp;sn=80c92881b47a586eba9c633eb78d36f6&amp;chksm=9796d5bfa0e15ca9713ff9dc6e100593e0ef06ed7ea2f60cb984e492c4ed438d2405fbb2c4ff&amp;scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer">这道面试题我真不知道面试官想要的回答是什么</a></p>
<h2 id="_21-concurrenthashmap-的并发度是多少" tabindex="-1"><a class="header-anchor" href="#_21-concurrenthashmap-的并发度是多少" aria-hidden="true">#</a> 21. ConcurrentHashMap 的并发度是多少？</h2>
<p>在JDK1.7中，并发度默认是16，这个值可以在构造函数中设置。如果自己设置了并发度，ConcurrentHashMap 会使用大于等于该值的最小的2的幂指数作为实际并发度，也就是比如你设置的值是17，那么实际并发度是32。</p>
<h2 id="_22-concurrenthashmap-迭代器是强一致性还是弱一致性" tabindex="-1"><a class="header-anchor" href="#_22-concurrenthashmap-迭代器是强一致性还是弱一致性" aria-hidden="true">#</a> 22. ConcurrentHashMap 迭代器是强一致性还是弱一致性？</h2>
<p>与HashMap迭代器是强一致性不同，ConcurrentHashMap 迭代器是弱一致性。</p>
<p>ConcurrentHashMap 的迭代器创建后，就会按照哈希表结构遍历每个元素，但在遍历过程中，内部元素可能会发生变化，如果变化发生在已遍历过的部分，迭代器就不会反映出来，而如果变化发生在未遍历过的部分，迭代器就会发现并反映出来，这就是弱一致性。</p>
<p>这样迭代器线程可以使用原来老的数据，而写线程也可以并发的完成改变，更重要的，这保证了多个线程并发执行的连续性和扩展性，是性能提升的关键。想要深入了解的小伙伴，可以看这篇文章[为什么ConcurrentHashMap 是弱一致的](http://ifeve.com/ConcurrentHashMap -weakly-consistent/)</p>
<h2 id="_23-jdk1-7与jdk1-8-中concurrenthashmap-的区别" tabindex="-1"><a class="header-anchor" href="#_23-jdk1-7与jdk1-8-中concurrenthashmap-的区别" aria-hidden="true">#</a> 23. JDK1.7与JDK1.8 中ConcurrentHashMap 的区别？</h2>
<ul>
<li>数据结构：取消了Segment分段锁的数据结构，取而代之的是数组+链表+红黑树的结构。</li>
<li>保证线程安全机制：JDK1.7采用Segment的分段锁机制实现线程安全，其中segment继承自ReentrantLock。JDK1.8 采用CAS+Synchronized保证线程安全。</li>
<li>锁的粒度：原来是对需要进行数据操作的Segment加锁，现调整为对每个数组元素加锁（Node）。</li>
<li>链表转化为红黑树:定位结点的hash算法简化会带来弊端,Hash冲突加剧,因此在链表节点数量大于8时，会将链表转化为红黑树进行存储。</li>
<li>查询时间复杂度：从原来的遍历链表O(n)，变成遍历红黑树O(logN)。</li>
</ul>
<h2 id="_24-concurrenthashmap-和hashtable的效率哪个更高-为什么" tabindex="-1"><a class="header-anchor" href="#_24-concurrenthashmap-和hashtable的效率哪个更高-为什么" aria-hidden="true">#</a> 24. ConcurrentHashMap 和Hashtable的效率哪个更高？为什么？</h2>
<p>ConcurrentHashMap 的效率要高于Hashtable，因为Hashtable给整个哈希表加了一把大锁从而实现线程安全。而ConcurrentHashMap 的锁粒度更低，在JDK1.7中采用分段锁实现线程安全，在JDK1.8 中采用<code v-pre>CAS+Synchronized</code>实现线程安全。</p>
<h2 id="_25-说一下hashtable的锁机制" tabindex="-1"><a class="header-anchor" href="#_25-说一下hashtable的锁机制" aria-hidden="true">#</a> 25. 说一下Hashtable的锁机制 ?</h2>
<p>Hashtable是使用Synchronized来实现线程安全的，给整个哈希表加了一把大锁，多线程访问时候，只要有一个线程访问或操作该对象，那其他线程只能阻塞等待需要的锁被释放，在竞争激烈的多线程场景中性能就会非常差！</p>
<p><img src="http://blog-img.coolsen.cn/img/ConcurrentHashMap-hashtable.png" alt=""></p>
<h2 id="_26-多线程下安全的操作-map还有其他方法吗" tabindex="-1"><a class="header-anchor" href="#_26-多线程下安全的操作-map还有其他方法吗" aria-hidden="true">#</a> 26. 多线程下安全的操作 map还有其他方法吗？</h2>
<p>还可以使用<code v-pre>Collections.synchronizedMap</code>方法，对方法进行加同步锁</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>private static class SynchronizedMap&lt;K,V&gt;
        implements Map&lt;K,V&gt;, Serializable {
        private static final long serialVersionUID = 1978198479659022715L;

        private final Map&lt;K,V&gt; m;     // Backing Map
        final Object      mutex;        // Object on which to synchronize

        SynchronizedMap(Map&lt;K,V&gt; m) {
            this.m = Objects.requireNon null (m);
            mutex = this;
        }

        SynchronizedMap(Map&lt;K,V&gt; m, Object mutex) {
            this.m = m;
            this.mutex = mutex;
        }
    // 省略部分代码
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果传入的是 HashMap 对象，其实也是对 HashMap 做的方法做了一层包装，里面使用对象锁来保证多线程场景下，线程安全，本质也是对 HashMap 进行全表锁。<strong>在竞争激烈的多线程环境下性能依然也非常差，不推荐使用！</strong></p>
<h2 id="_27-hashset-和-hashmap-区别" tabindex="-1"><a class="header-anchor" href="#_27-hashset-和-hashmap-区别" aria-hidden="true">#</a> 27. HashSet 和 HashMap 区别?</h2>
<p><img src="http://blog-img.coolsen.cn/img/image-20210403193010949.png" alt=""></p>
<p>补充HashSet的实现：HashSet的底层其实就是HashMap，只不过我们<strong>HashSet是实现了Set接口并且把数据作为K值，而V值一直使用一个相同的虚值来保存</strong>。如源码所示：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>public boolean add(E e) {
    return map.put(e, PRESENT)==null;// 调用HashMap的put方法,PRESENT是一个至始至终都相同的虚值
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于HashMap的K值本身就不允许重复，并且在HashMap中如果K/V相同时，会用新的V覆盖掉旧的V，然后返回旧的V，那么在HashSet中执行这一句话始终会返回一个false，导致插入失败，这样就保证了数据的不可重复性。</p>
<h2 id="_28-collection框架中实现比较要怎么做" tabindex="-1"><a class="header-anchor" href="#_28-collection框架中实现比较要怎么做" aria-hidden="true">#</a> 28. Collection框架中实现比较要怎么做？</h2>
<p>第一种，实体类实现Comparable接口，并实现 compareTo(T t) 方法，称为内部比较器。</p>
<p>第二种，创建一个外部比较器，这个外部比较器要实现Comparator接口的 compare(T t1, T t2)方法。</p>
<h2 id="_29-iterator-和-listiterator-有什么区别" tabindex="-1"><a class="header-anchor" href="#_29-iterator-和-listiterator-有什么区别" aria-hidden="true">#</a> 29. Iterator 和 ListIterator 有什么区别？</h2>
<ul>
<li>遍历。使用Iterator，可以遍历所有集合，如Map，List，Set；但只能在向前方向上遍历集合中的元素。</li>
</ul>
<p>使用ListIterator，只能遍历List实现的对象，但可以向前和向后遍历集合中的元素。</p>
<ul>
<li>
<p>添加元素。Iterator无法向集合中添加元素；而，ListIteror可以向集合添加元素。</p>
</li>
<li>
<p>修改元素。Iterator无法修改集合中的元素；而，ListIterator可以使用set()修改集合中的元素。</p>
</li>
<li>
<p>索引。Iterator无法获取集合中元素的索引；而，使用ListIterator，可以获取集合中元素的索引。</p>
</li>
</ul>
<h2 id="_30-讲一讲快速失败-fail-fast-和安全失败-fail-safe" tabindex="-1"><a class="header-anchor" href="#_30-讲一讲快速失败-fail-fast-和安全失败-fail-safe" aria-hidden="true">#</a> 30. 讲一讲快速失败(fail-fast)和安全失败(fail-safe)</h2>
<p><strong>快速失败（fail—fast）</strong></p>
<ul>
<li>
<p>在用迭代器遍历一个集合对象时，如果遍历过程中对集合对象的内容进行了修改（增加、删除、修改），则会抛出Concurrent Modification Exception。</p>
</li>
<li>
<p>原理：迭代器在遍历时直接访问集合中的内容，并且在遍历过程中使用一个        modCount 变量。集合在被遍历期间如果内容发生变化，就会改变modCount的值。每当迭代器使用hashNext()/next()遍历下一个元素之前，都会检测modCount变量是否为expectedmodCount值，是的话就返回遍历；否则抛出异常，终止遍历。</p>
</li>
<li>
<p>注意：这里异常的抛出条件是检测到 modCount！=expectedmodCount 这个条件。如果集合发生变化时修改modCount值刚好又设置为了expectedmodCount值，则异常不会抛出。因此，不能依赖于这个异常是否抛出而进行并发操作的编程，这个异常只建议用于检测并发修改的bug。</p>
</li>
<li>
<p>场景：java.util包下的集合类都是快速失败的，不能在多线程下发生并发修改（迭代过程中被修改），比如HashMap、ArrayList 这些集合类。</p>
</li>
</ul>
<p><strong>安全失败（fail—safe）</strong></p>
<ul>
<li>
<p>采用安全失败机制的集合容器，在遍历时不是直接在集合内容上访问的，而是先复制原有集合内容，在拷贝的集合上进行遍历。</p>
</li>
<li>
<p>原理：由于迭代时是对原集合的拷贝进行遍历，所以在遍历过程中对原集合所作的修改并不能被迭代器检测到，所以不会触发Concurrent Modification Exception。</p>
</li>
<li>
<p>缺点：基于拷贝内容的优点是避免了Concurrent Modification Exception，但同样地，迭代器并不能访问到修改后的内容，即：迭代器遍历的是开始遍历那一刻拿到的集合拷贝，在遍历期间原集合发生的修改迭代器是不知道的。</p>
</li>
<li>
<p>场景：java.util.concurrent包下的容器都是安全失败，可以在多线程下并发使用，并发修改，比如：ConcurrentHashMap。</p>
</li>
</ul>
<h2 id="巨人的肩膀" tabindex="-1"><a class="header-anchor" href="#巨人的肩膀" aria-hidden="true">#</a> 巨人的肩膀</h2>
<p>https://juejin.cn/post/6844903966103306247</p>
<p>https://www.javazhiyin.com/71751.html</p>
<p>https://blog.csdn.net/qq_31780525/article/details/77431970</p>
<p>https://www.cnblogs.com/zeroingToOne/p/9522814.html</p>
</div></template>


