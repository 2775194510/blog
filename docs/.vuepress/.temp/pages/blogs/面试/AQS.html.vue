<template><div><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h2>
<p>Java中的大部分同步类（Lock、Semaphore、ReentrantLock等）都是基于AbstractQueuedSynchronizer（简称为AQS）实现的。AQS是一种提供了原子式管理同步状态、阻塞和唤醒线程功能以及队列模型的简单框架。</p>
<p>在AQS中的锁类型有两种：分别是**「Exclusive(独占锁)**「和」**Share(共享锁)」**。</p>
<p><strong>「独占锁」<strong>就是</strong>「每次都只有一个线程运行」</strong>，例如<code v-pre>ReentrantLock</code>。</p>
<p><strong>「共享锁」<strong>就是</strong>「同时可以多个线程运行」</strong>，如<code v-pre>Semaphore、CountDownLatch、ReentrantReadWriteLock</code>。</p>
<h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2>
<p>AQS核心思想是，如果被请求的共享资源空闲，那么就将当前请求资源的线程设置为有效的工作线程，将共享资源设置为锁定状态；如果共享资源被占用，则调用<code v-pre>LockSupport().park()方法将Node中的线程状态改为WAITING，等待被唤醒或被中断</code> ，就需要一定的阻塞等待唤醒机制来保证锁分配。这个机制主要用的是CLH队列的变体实现的，将暂时获取不到锁的线程加入到队列中。</p>
<p>CLH：Craig、Landin and Hagersten队列，是单向链表，AQS中的队列是CLH变体的虚拟双向队列（FIFO），AQS是通过将每条请求共享资源的线程封装成一个节点来实现锁的分配。</p>
<p>主要原理图如下：</p>
<p><img src="https://p0.meituan.net/travelcube/7132e4cef44c26f62835b197b239147b18062.png" alt="img"></p>
<p>AQS使用一个Volatile的int类型的成员变量来表示同步状态，通过内置的FIFO队列来完成资源获取的排队工作，通过CAS完成对State值的修改。</p>
<p>在FIFO队列中，<strong>「头节点占有锁」</strong>，也就是头节点才是锁的持有者，尾指针指向队列的最后一个等待线程节点，除了头节点和尾节点，节点之间都有**「前驱指针」<strong>和</strong>「后继指针」**</p>
<p>在AQS中维护了一个**「共享变量state」**，标识当前的资源是否被线程持有，多线程竞争的时候，会去判断state是否为0，尝试的去把state修改为1</p>
<h3 id="_1-aqs数据结构" tabindex="-1"><a class="header-anchor" href="#_1-aqs数据结构" aria-hidden="true">#</a> 1. AQS数据结构</h3>
<p>AQS中最基本的数据结构——Node，Node即为上面CLH变体队列中的节点。</p>
<p><img src="https://p1.meituan.net/travelcube/960271cf2b5c8a185eed23e98b72c75538637.png" alt="img"></p>
<p>解释一下几个方法和属性值的含义：</p>
<table>
<thead>
<tr>
<th style="text-align:left">方法和属性值</th>
<th style="text-align:left">含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">waitStatus</td>
<td style="text-align:left">当前节点在队列中的状态</td>
</tr>
<tr>
<td style="text-align:left">thread</td>
<td style="text-align:left">表示处于该节点的线程</td>
</tr>
<tr>
<td style="text-align:left">prev</td>
<td style="text-align:left">前驱指针</td>
</tr>
<tr>
<td style="text-align:left">predecessor</td>
<td style="text-align:left">返回前驱节点，没有的话抛出npe</td>
</tr>
<tr>
<td style="text-align:left">nextWaiter</td>
<td style="text-align:left">指向下一个处于CONDITION状态的节点（由于本篇文章不讲述Condition Queue队列，这个指针不多介绍）</td>
</tr>
<tr>
<td style="text-align:left">next</td>
<td style="text-align:left">后继指针</td>
</tr>
</tbody>
</table>
<p>线程两种锁的模式：</p>
<table>
<thead>
<tr>
<th style="text-align:left">模式</th>
<th style="text-align:left">含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">SHARED</td>
<td style="text-align:left">表示线程以共享的模式等待锁</td>
</tr>
<tr>
<td style="text-align:left">EXCLUSIVE</td>
<td style="text-align:left">表示线程正在以独占的方式等待锁</td>
</tr>
</tbody>
</table>
<p>waitStatus有下面几个枚举值：</p>
<table>
<thead>
<tr>
<th style="text-align:left">枚举</th>
<th style="text-align:left">含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">0</td>
<td style="text-align:left">当一个Node被初始化的时候的默认值</td>
</tr>
<tr>
<td style="text-align:left">CANCELLED</td>
<td style="text-align:left">为1，表示线程获取锁的请求已经取消了</td>
</tr>
<tr>
<td style="text-align:left">CONDITION</td>
<td style="text-align:left">为-2，表示节点在等待队列中，节点线程等待唤醒</td>
</tr>
<tr>
<td style="text-align:left">PROPAGATE</td>
<td style="text-align:left">为-3，当前线程处在SHARED情况下，该字段才会使用</td>
</tr>
<tr>
<td style="text-align:left">SIGNAL</td>
<td style="text-align:left">为-1，表示线程已经准备好了，就等资源释放了</td>
</tr>
</tbody>
</table>
<h3 id="_2-同步状态state" tabindex="-1"><a class="header-anchor" href="#_2-同步状态state" aria-hidden="true">#</a> 2. 同步状态State</h3>
<p>了解一下AQS的同步状态——State。AQS中维护了一个名为state的字段，意为同步状态，是由Volatile修饰的，用于展示当前临界资源的获锁情况。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>// java.util.concurrent.locks.AbstractQueuedSynchronizer

private volatile int state;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面提供了几个访问这个字段的方法：</p>
<table>
<thead>
<tr>
<th style="text-align:left">方法名</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">protected final int getState()</td>
<td style="text-align:left">获取State的值</td>
</tr>
<tr>
<td style="text-align:left">protected final void setState(int newState)</td>
<td style="text-align:left">设置State的值</td>
</tr>
<tr>
<td style="text-align:left">protected final boolean compareAndSetState(int expect, int update)</td>
<td style="text-align:left">使用CAS方式更新State</td>
</tr>
</tbody>
</table>
<p>这几个方法都是Final修饰的，说明子类中无法重写它们。我们可以通过修改State字段表示的同步状态来实现多线程的独占模式和共享模式（加锁过程）。</p>
<p><img src="https://p0.meituan.net/travelcube/27605d483e8935da683a93be015713f331378.png" alt="img"></p>
<p><img src="https://p0.meituan.net/travelcube/3f1e1a44f5b7d77000ba4f9476189b2e32806.png" alt="img"></p>
<h3 id="_3-线程加入等待队列" tabindex="-1"><a class="header-anchor" href="#_3-线程加入等待队列" aria-hidden="true">#</a> 3. 线程加入等待队列</h3>
<p>ReentrantLock中公平锁和非公平锁在底层是相同的，这里以非公平锁为例进行分析。</p>
<p>在非公平锁中，有一段这样的代码：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// java.util.concurrent.locks.ReentrantLock

static final class NonfairSync extends Sync {
	...
	final void lock() {
		if (compareAndSetState(0, 1))
			setExclusiveOwnerThread(Thread.currentThread());
		else
			acquire(1);
	}
  ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看一下这个Acquire是怎么写的：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// java.util.concurrent.locks.AbstractQueuedSynchronizer

public final void acquire(int arg) {
	if (!tryAcquire(arg) &amp;&amp; acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
		selfInterrupt();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先会调用 tryAcquire(arg) 方法，这个方法是需要同步组件自己实现的。 该方法保证线程安全的获取同步状态， tryAcquire(arg) 返回 true 表示获取成功也就正常退出了。否则会 构造同步节点（独占式Node.EXCLUSIVE）并通过 <code v-pre>addWaiter(Node mode)</code> 方法将加入到同步队列的尾部，最后调用<code v-pre>acquireQueued(final Node node, int arg)</code> 通过 “死循环”的方式获取同步状态。如果获取不到则阻塞节点中对应的线程，而被阻塞后的唤醒只能依靠前驱节点出队或者阻塞线程被中断来实现。</p>
<p>再看一下tryAcquire方法：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// java.util.concurrent.locks.AbstractQueuedSynchronizer

protected boolean tryAcquire(int arg) {
	throw new UnsupportedOperationException();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出，这里只是AQS的简单实现，具体获取锁的实现方法是由各自的公平锁和非公平锁单独实现的（以ReentrantLock为例）。如果该方法返回了True，则说明当前线程获取锁成功，就不用往后执行了；如果获取失败，就需要加入到等待队列中。</p>
<h4 id="加入队列的时机" tabindex="-1"><a class="header-anchor" href="#加入队列的时机" aria-hidden="true">#</a> 加入队列的时机</h4>
<p>当执行Acquire(1)时，会通过tryAcquire获取锁。在这种情况下，如果获取锁失败，就会调用addWaiter加入到等待队列中去。</p>
<h4 id="如-何加入队列" tabindex="-1"><a class="header-anchor" href="#如-何加入队列" aria-hidden="true">#</a> 如 何加入队列</h4>
<p>获取锁失败后，会执行addWaiter(Node.EXCLUSIVE)加入等待队列，具体实现方法如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>// java.util.concurrent.locks.AbstractQueuedSynchronizer

private Node addWaiter(Node mode) {
	Node node = new Node(Thread.currentThread(), mode);
	// Try the fast path of enq; backup to full enq on failure
	Node pred = tail;
	if (pred != null) {
		node.prev = pred;
		if (compareAndSetTail(pred, node)) {
			pred.next = node;
			return node;
		}
	}
	enq(node);
	return node;
}
private final boolean compareAndSetTail(Node expect, Node update) {
	return unsafe.compareAndSwapObject(this, tailOffset, expect, update);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主要的流程如下：</p>
<ul>
<li>通过当前的线程和锁模式新建一个节点。</li>
<li>Pred指针指向尾节点Tail。</li>
<li>将New中Node的Prev指针指向Pred。</li>
<li>通过compareAndSetTail方法，完成尾节点的设置。这个方法主要是对tailOffset和Expect进行比较，如果tailOffset的Node和Expect的Node地址是相同的，那么设置Tail的值为Update的值。</li>
</ul>
<p>当出现锁竞争以及释放锁的时候，AQS同步队列中的节点会发生变化，首先看一下添加节点的场景。</p>
<p>这里会涉及到两个变化</p>
<ul>
<li>新的线程封装成Node节点追加到同步队列中，设置prev节点以及修改当前节点的前置节点的next节点指向自己</li>
<li>通过CAS讲tail重新指向新的尾部节点</li>
</ul>
<p><img src="https://segmentfault.com/img/remote/1460000017372072?w=648&amp;h=228" alt="节点添加到同步队列"></p>
<h3 id="_4-等待队列中线程出队列时机" tabindex="-1"><a class="header-anchor" href="#_4-等待队列中线程出队列时机" aria-hidden="true">#</a> 4. 等待队列中线程出队列时机</h3>
<p>前驱是头结点，就获取到了同步状态。</p>
<p>head节点表示获取锁成功的节点，当头结点在释放同步状态时，会唤醒后继节点，如果后继节点获得锁成功，会把自己设置为头结点，节点的变化过程如下
<img src="https://segmentfault.com/img/remote/1460000017372073?w=624&amp;h=208" alt="移除节点的变化">
这个过程也是涉及到两个变化</p>
<ul>
<li>修改head节点指向下一个获得锁的节点</li>
<li>新的获得锁的节点，将prev的指针指向null</li>
</ul>
<p>这里有一个小的变化，就是设置head节点不需要用CAS，原因是设置head节点是由获得锁的线程来完成的，而同步锁只能由一个线程获得，所以不需要CAS保证，只需要把head节点设置为原首节点的后继节点，并且断开原head节点的next引用即可</p>
<img src="https://static001.geekbang.org/infoq/8c/8c2e42fd4ba626727fdb0e1488f4352c.png" alt="img" style="zoom: 50%;" />
<h2 id="代码设计" tabindex="-1"><a class="header-anchor" href="#代码设计" aria-hidden="true">#</a> 代码设计</h2>
<p>AQS的设计模式采用的模板方法模式，子类通过继承的方式，实现它的抽象方法来管理同步状态，对于子类而言它并没有太多的活要做，AQS提供了大量的模板方法来实现同步，主要是分为三类：独占式获取和释放同步状态、共享式获取和释放同步状态、查询同步队列中的等待线程情况。自定义子类使用AQS提供的模板方法就可以实现自己的同步语义。</p>
<h3 id="独占式同步状态获取" tabindex="-1"><a class="header-anchor" href="#独占式同步状态获取" aria-hidden="true">#</a> 独占式同步状态获取</h3>
<p>acquire(int arg)方法为AQS提供的模板方法，该方法为独占式获取同步状态，但是该方法对中断不敏感，也就是说由于线程获取同步状态失败加入到CLH同步队列中，后续对线程进行中断操作时，线程不会从同步队列中移除。代码如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    public final void acquire(int arg) {
        if (!tryAcquire(arg) &amp;&amp;
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
            selfInterrupt();
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>各个方法定义如下：</p>
<ol>
<li>tryAcquire：去尝试获取锁，获取成功则设置锁状态并返回true，否则返回false。该方法自定义同步组件自己实现，该方法必须要保证线程安全的获取同步状态。</li>
<li>addWaiter：如果tryAcquire返回FALSE（获取同步状态失败），则调用该方法将当前线程加入到CLH同步队列尾部。</li>
<li>acquireQueued：当前线程会根据公平性原则来进行阻塞等待（自旋）,直到获取锁为止；并且返回当前线程在等待过程中有没有中断过。</li>
<li>selfInterrupt：产生一个中断。</li>
</ol>
<h3 id="独占式同步状态释放" tabindex="-1"><a class="header-anchor" href="#独占式同步状态释放" aria-hidden="true">#</a> 独占式同步状态释放</h3>
<p>当线程获取同步状态后，执行完相应逻辑后就需要释放同步状态。AQS提供了release(int arg)方法释放同步状态：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    public final boolean release(int arg) {
        if (tryRelease(arg)) {
            Node h = head;
            if (h != null &amp;&amp; h.waitStatus != 0)
                unparkSuccessor(h);
            return true;
        }
        return false;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该方法同样是先调用自定义同步器自定义的tryRelease(int arg)方法来释放同步状态，释放成功后，会调用unparkSuccessor(Node node)方法唤醒后继节点（如何唤醒LZ后面介绍）。 这里稍微总结下：</p>
<blockquote>
<p>在AQS中维护着一个FIFO的同步队列，当线程获取同步状态失败后，则会加入到这个CLH同步队列的对尾并一直保持着自旋。在CLH同步队列中的线程在自旋时会判断其前驱节点是否为首节点，如果为首节点则不断尝试获取同步状态，获取成功则退出CLH同步队列。当线程执行完逻辑后，会释放同步状态，释放后会唤醒其后继节点。</p>
</blockquote>
<h3 id="共享式同步状态获取" tabindex="-1"><a class="header-anchor" href="#共享式同步状态获取" aria-hidden="true">#</a> 共享式同步状态获取</h3>
<p>AQS提供acquireShared(int arg)方法共享式获取同步状态：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    public final void acquireShared(int arg) {
        if (tryAcquireShared(arg) &lt; 0)
            //获取失败，自旋获取同步状态
            doAcquireShared(arg);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面程序可以看出，方法首先是调用tryAcquireShared(int arg)方法尝试获取同步状态，如果获取失败则调用doAcquireShared(int arg)自旋方式获取同步状态，共享式获取同步状态的标志是返回 &gt;= 0 的值表示获取成功。</p>
<p>获取同步状态如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    private void doAcquireShared(int arg) {
        /共享式节点
        final Node node = addWaiter(Node.SHARED);
        boolean failed = true;
        try {
            boolean interrupted = false;
            for (;;) {
                //前驱节点
                final Node p = node.predecessor();
                //如果其前驱节点，获取同步状态
                if (p == head) {
                    //尝试获取同步
                    int r = tryAcquireShared(arg);
                    if (r &gt;= 0) {
                        setHeadAndPropagate(node, r);
                        p.next = null; // help GC
                        if (interrupted)
                            selfInterrupt();
                        failed = false;
                        return;
                    }
                }
                if (shouldParkAfterFailedAcquire(p, node) &amp;&amp;
                        parkAndCheckInterrupt())
                    interrupted = true;
            }
        } finally {
            if (failed)
                cancelAcquire(node);
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>tryAcquireShared(int arg)方法尝试获取同步状态，返回值为int，当其 &gt;= 0 时，表示能够获取到同步状态，这个时候就可以从自旋过程中退出。 acquireShared(int arg)方法不响应中断，与独占式相似，AQS也提供了响应中断、超时的方法，分别是：acquireSharedInterruptibly(int arg)、tryAcquireSharedNanos(int arg,long nanos)，这里就不做解释了。</p>
<h3 id="共享式同步状态释放" tabindex="-1"><a class="header-anchor" href="#共享式同步状态释放" aria-hidden="true">#</a> 共享式同步状态释放</h3>
<p>获取同步状态后，需要调用release(int arg)方法释放同步状态，方法如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    public final boolean releaseShared(int arg) {
        if (tryReleaseShared(arg)) {
            doReleaseShared();
            return true;
        }
        return false;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为可能会存在多个线程同时进行释放同步状态资源，所以需要确保同步状态安全地成功释放，一般都是通过CAS和循环来完成的。</p>
<h2 id="疑问" tabindex="-1"><a class="header-anchor" href="#疑问" aria-hidden="true">#</a> 疑问</h2>
<p>Q：某个线程获取锁失败的后续流程是什么呢？</p>
<p>A：存在某种排队等候机制，线程继续等待，仍然保留获取锁的可能，获取锁流程仍在继续。</p>
<p>Q：既然说到了排队等候机制，那么就一定会有某种队列形成，这样的队列是什么数据结构呢？</p>
<p>A：是CLH变体的FIFO双端队列。</p>
<p>Q：处于排队等候机制中的线程，什么时候可以有机会获取锁呢？</p>
<p>A：前驱结点是头结点，并且当前线程获取锁成功</p>
<p>Q：如果处于排队等候机制中的线程一直无法获取锁，需要一直等待么？还是有别的策略来解决这一问题？</p>
<p>A：线程所在节点的状态会变成取消状态，取消状态的节点会从队列中释放</p>
<p>Q：Lock函数通过Acquire方法进行加锁，但是具体是如何加锁的呢？</p>
<p>A：AQS的Acquire会调用tryAcquire方法，tryAcquire由各个自定义同步器实现，通过tryAcquire完成加锁过程。</p>
<ul>
<li>那AQS只能用来实现独占且公平锁吗？显然不是，AQS又是如何实现非公平锁和共享锁的呢？ 其实AQS无论用来实现什么锁，这些锁本质的区别就是在于获取共享资源访问权的方式不同 ，而独占且公平的锁很明显获取访问权的方式是通过FIFO队列的顺序（即请求访问共享资源的顺序），而共享锁也是一样，只是可以获取访问权的线程数多了些；那么非公平锁是如何实现的呢？其实也很简单，就是舍弃队列的FIFO特性，只要持有共享资源的线程释放了锁，所有的在同步队列中的线程都会通过CAS操作去竞争锁；</li>
</ul>
<h2 id="reentrantlock" tabindex="-1"><a class="header-anchor" href="#reentrantlock" aria-hidden="true">#</a> ReentrantLock</h2>
<p>加锁：</p>
<ul>
<li>通过ReentrantLock的加锁方法Lock进行加锁操作。</li>
<li>会调用到内部类Sync的Lock方法，由于Sync#lock是抽象方法，根据ReentrantLock初始化选择的公平锁和非公平锁，执行相关内部类的Lock方法，本质上都会执行AQS的Acquire方法。</li>
<li>AQS的Acquire方法会执行tryAcquire方法，但是由于tryAcquire需要自定义同步器实现，因此执行了ReentrantLock中的tryAcquire方法，由于ReentrantLock是通过公平锁和非公平锁内部类实现的tryAcquire方法，因此会根据锁类型不同，执行不同的tryAcquire。</li>
<li>tryAcquire是获取锁逻辑，获取失败后，会执行框架AQS的后续逻辑，跟ReentrantLock自定义同步器无关。</li>
</ul>
<p>解锁：</p>
<ul>
<li>通过ReentrantLock的解锁方法Unlock进行解锁。</li>
<li>Unlock会调用内部类Sync的Release方法，该方法继承于AQS。</li>
<li>Release中会调用tryRelease方法，tryRelease需要自定义同步器实现，tryRelease只在ReentrantLock中的Sync实现，因此可以看出，释放锁的过程，并不区分是否为公平锁。</li>
<li>释放成功后，所有处理由AQS框架完成，与自定义同步器无关。</li>
</ul>
<p>通过上面的描述，大概可以总结出ReentrantLock加锁解锁时API层核心方法的映射关系。</p>
<p><img src="https://p0.meituan.net/travelcube/f30c631c8ebbf820d3e8fcb6eee3c0ef18748.png" alt="img"></p>
<h3 id="非公平锁" tabindex="-1"><a class="header-anchor" href="#非公平锁" aria-hidden="true">#</a> 非公平锁</h3>
<p>非公平锁则没有这些规则，是<strong>抢占模式</strong>，每来一个人不会去管队列如何，直接尝试获取锁。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>static final class NonfairSync extends Sync {
    private static final long serialVersionUID = 7316153563782823691L;

    final void lock() {
        // 不管是否有线程在AQS的FIFO队列中排队等待，直接执行一次CAS操作竞争锁
        if (compareAndSetState(0, 1))
            setExclusiveOwnerThread(Thread.currentThread());
        else
        // CAS失败，则准备进入FIFO队列，在进入队列之前，还有一次机会，
        // AQS的acquire方法通过调用tryAcquire再给当前线程一次机会，此时再失败则进入队列等待
            acquire(1);
    }

    protected final boolean tryAcquire(int acquires) {
        return nonfairTryAcquire(acquires);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>非公平模式下每个线程都有2次机会(CAS操作)插队竞争锁，2次均失败之后才会进入FIFO队列等待，然后公平锁模式下，线程是不允许插队竞争锁的， 只要FIFO队列中有线程在等待，则当前竞争锁的线程必须进入队列等待，这就是为什么公平锁的吞吐比非公平锁低的原因。</p>
<p>重要的区别是在尝试获取锁时<code v-pre>tryAcquire(arg)</code>，非公平锁是不需要判断队列中是否还有其他线程，也是直接尝试获取锁：</p>
<pre><code>    final boolean nonfairTryAcquire(int acquires) {
        final Thread current = Thread.currentThread();
        int c = getState();
        if (c == 0) {
            //没有 !hasQueuedPredecessors() 判断
            if (compareAndSetState(0, acquires)) {
                setExclusiveOwnerThread(current);
                return true;
            }
        }
        else if (current == getExclusiveOwnerThread()) {
            int nextc = c + acquires;
            if (nextc &lt; 0) // overflow
                throw new Error(&quot;Maximum lock count exceeded&quot;);
            setState(nextc);
            return true;
        }
        return false;
    }
</code></pre>
<h3 id="公平锁" tabindex="-1"><a class="header-anchor" href="#公平锁" aria-hidden="true">#</a> 公平锁</h3>
<p>首先看下获取锁的过程：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    public void lock() {
        sync.lock();
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到是使用 <code v-pre>sync</code>的方法，而这个方法是一个抽象方法，具体是由其子类(<code v-pre>FairSync</code>)来实现的，以下是公平锁的实现:</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>        final void lock() {
            acquire(1);
        }
        
        //AbstractQueuedSynchronizer 中的 acquire()
        public final void acquire(int arg) {
        if (!tryAcquire(arg) &amp;&amp;
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
            selfInterrupt();
    	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一步是尝试获取锁(<code v-pre>tryAcquire(arg)</code>),这个也是由其子类实现：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>        protected final boolean tryAcquire(int acquires) {
            final Thread current = Thread.currentThread();
            int c = getState();
            if (c == 0) {
                if (!hasQueuedPredecessors() &amp;&amp;
                    compareAndSetState(0, acquires)) {
                    setExclusiveOwnerThread(current);
                    return true;
                }
            }
            else if (current == getExclusiveOwnerThread()) {
                int nextc = c + acquires;
                if (nextc &lt; 0)
                    throw new Error(&quot;Maximum lock count exceeded&quot;);
                setState(nextc);
                return true;
            }
            return false;
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先会判断 <code v-pre>AQS</code> 中的 <code v-pre>state</code> 是否等于 0，0 表示目前没有其他线程获得锁，当前线程就可以尝试获取锁。</p>
<p><strong>注意</strong>:尝试之前会利用 <code v-pre>hasQueuedPredecessors()</code> 方法来判断 AQS 的队列中中是否有其他线程，如果有则不会尝试获取锁(<strong>这是公平锁特有的情况</strong>)。</p>
<p>如果队列中没有线程就利用 CAS 来将 AQS 中的 state 修改为1，也就是获取锁，获取成功则将当前线程置为获得锁的独占线程(<code v-pre>setExclusiveOwnerThread(current)</code>)。</p>
<p>如果 <code v-pre>state</code> 大于 0 时，说明锁已经被获取了，则需要判断获取锁的线程是否为当前线程(<code v-pre>ReentrantLock</code> 支持重入)，是则需要将 <code v-pre>state + 1</code>，并将值更新。</p>
<p><strong>写入队列</strong></p>
<p>如果 <code v-pre>tryAcquire(arg)</code> 获取锁失败，则需要用 <code v-pre>addWaiter(Node.EXCLUSIVE)</code> 将当前线程写入队列中。</p>
<p>写入之前需要将当前线程包装为一个 <code v-pre>Node</code> 对象(<code v-pre>addWaiter(Node.EXCLUSIVE)</code>)。</p>
<p><strong>释放锁</strong></p>
<p>公平锁和非公平锁的释放流程都是一样的：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>protected final boolean tryRelease(int releases) {
    int c = getState() - releases;
    // 非持有锁的线程调用此方法直接抛出异常
    if (Thread.currentThread() != getExclusiveOwnerThread())
        throw new IllegalMonitorStateException();
    boolean free = false;
    // 状态为0，表示锁完全释放，此时需清除AOS中的线程记录
    if (c == 0) {
        free = true;
        setExclusiveOwnerThread(null);
    }
    setState(c);
    return free;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先会判断当前线程是否为获得锁的线程，由于是重入锁所以需要将 <code v-pre>state</code> 减到 0 才认为完全释放锁。</p>
<p>释放之后需要调用 <code v-pre>unparkSuccessor(h)</code> 来唤醒被挂起的线程。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<p>https://tech.meituan.com/2019/12/05/aqs-theory-and-apply.html</p>
<p>https://xie.infoq.cn/article/7e9a2689d223acaab1636f93d</p>
<p>http://cmsblogs.com/?hmsr=toutiao.io&amp;p=2197&amp;utm_medium=toutiao.io&amp;utm_source=toutiao.io</p>
<p>https://blog.csdn.net/zl1zl2zl3/article/details/82215563</p>
<p>https://youendless.com/post/reentrantlock/</p>
</div></template>


