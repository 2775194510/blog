<template><div><h2 id="_1-apache-kafka是什么" tabindex="-1"><a class="header-anchor" href="#_1-apache-kafka是什么" aria-hidden="true">#</a> 1. Apache Kafka是什么？</h2>
<p>Apach Kafka是一款分布式流处理平台，用于实时构建流处理应用。它有一个核心的功能广为人知，即作为企业级的消息引擎被广泛使用（通常也会称之为消息总线message bus）。</p>
<h2 id="_2-kafka-的设计是什么样的" tabindex="-1"><a class="header-anchor" href="#_2-kafka-的设计是什么样的" aria-hidden="true">#</a> 2. Kafka 的设计是什么样的？</h2>
<p>Kafka 将消息以 topic 为单位进行归纳</p>
<p>将向 Kafka topic 发布消息的程序成为 producers.</p>
<p>将预订 topics 并消费消息的程序成为 consumer.</p>
<p>Kafka 以集群的方式运行，可以由一个或多个服务组成，每个服务叫做一个 broker.</p>
<p>producers 通过网络将消息发送到 Kafka 集群，集群向消费者提供消息</p>
<h2 id="_3-kafka-如何保证高可用" tabindex="-1"><a class="header-anchor" href="#_3-kafka-如何保证高可用" aria-hidden="true">#</a> 3. Kafka 如何保证高可用？</h2>
<p><code v-pre>Kafka</code> 的基本架构组成是：由多个 <code v-pre>broker</code> 组成一个集群，每个 <code v-pre>broker</code> 是一个节点；当创建一个 <code v-pre>topic</code> 时，这个 <code v-pre>topic</code> 会被划分为多个 <code v-pre>partition</code>，每个 <code v-pre>partition</code> 可以存在于不同的 <code v-pre>broker</code> 上，每个 <code v-pre>partition</code> 只存放一部分数据。</p>
<p>这就是<strong>天然的分布式消息队列</strong>，就是说一个 <code v-pre>topic</code> 的数据，是<strong>分散放在多个机器上的，每个机器就放一部分数据</strong>。</p>
<p>在 <code v-pre>Kafka 0.8</code> 版本之前，是没有 <code v-pre>HA</code> 机制的，当任何一个 <code v-pre>broker</code> 所在节点宕机了，这个 <code v-pre>broker</code> 上的 <code v-pre>partition</code> 就无法提供读写服务，所以这个版本之前，<code v-pre>Kafka</code> 没有什么高可用性可言。</p>
<p>在 <code v-pre>Kafka 0.8</code> 以后，提供了 <code v-pre>HA</code> 机制，就是 <code v-pre>replica</code> 副本机制。每个 <code v-pre>partition</code> 上的数据都会同步到其它机器，形成自己的多个 <code v-pre>replica</code> 副本。所有 <code v-pre>replica</code> 会选举一个 <code v-pre>leader</code> 出来，消息的生产者和消费者都跟这个 <code v-pre>leader</code> 打交道，其他 <code v-pre>replica</code> 作为 <code v-pre>follower</code>。写的时候，<code v-pre>leader</code> 会负责把数据同步到所有 <code v-pre>follower</code> 上去，读的时候就直接读 <code v-pre>leader</code> 上的数据即可。<code v-pre>Kafka</code> 负责均匀的将一个 <code v-pre>partition</code> 的所有 <code v-pre>replica</code> 分布在不同的机器上，这样才可以提高容错性。</p>
<p><img src="http://blog-img.coolsen.cn/img/Solve-MQ-Problem-With-Kafka-01.png" alt="img"></p>
<p>拥有了 <code v-pre>replica</code> 副本机制，如果某个 <code v-pre>broker</code> 宕机了，这个 <code v-pre>broker</code> 上的 <code v-pre>partition</code> 在其他机器上还存在副本。如果这个宕机的 <code v-pre>broker</code> 上面有某个 <code v-pre>partition</code> 的 <code v-pre>leader</code>，那么此时会从其 <code v-pre>follower</code> 中重新选举一个新的 <code v-pre>leader</code> 出来，这个新的 <code v-pre>leader</code> 会继续提供读写服务，这就有达到了所谓的高可用性。</p>
<p>写数据的时候，生产者只将数据写入 <code v-pre>leader</code> 节点，<code v-pre>leader</code> 会将数据写入本地磁盘，接着其他 <code v-pre>follower</code> 会主动从 <code v-pre>leader</code> 来拉取数据，<code v-pre>follower</code> 同步好数据了，就会发送 <code v-pre>ack</code> 给 <code v-pre>leader</code>，<code v-pre>leader</code> 收到所有 <code v-pre>follower</code> 的 <code v-pre>ack</code> 之后，就会返回写成功的消息给生产者。</p>
<p>消费数据的时候，消费者只会从 <code v-pre>leader</code> 节点去读取消息，但是只有当一个消息已经被所有 <code v-pre>follower</code> 都同步成功返回 <code v-pre>ack</code> 的时候，这个消息才会被消费者读到。</p>
<p><img src="https://gitee.com/dongzl/article-images/raw/master/2020/13-Solve-MQ-Problem-With-Kafka/Solve-MQ-Problem-With-Kafka-02.png" alt="img"></p>
<h2 id="_4-kafka-消息是采用-pull-模式-还是-push-模式" tabindex="-1"><a class="header-anchor" href="#_4-kafka-消息是采用-pull-模式-还是-push-模式" aria-hidden="true">#</a> 4. Kafka 消息是采用 Pull 模式，还是 Push 模式？</h2>
<p>生产者使用push模式将消息发布到Broker，消费者使用pull模式从Broker订阅消息。</p>
<p>push模式很难适应消费速率不同的消费者，如果push的速度太快，容易造成消费者拒绝服务或网络拥塞；如果push的速度太慢，容易造成消费者性能浪费。但是采用pull的方式也有一个缺点，就是当Broker没有消息时，消费者会陷入不断地轮询中，为了避免这点，kafka有个参数可以让消费者阻塞知道是否有新消息到达。</p>
<h2 id="_5-kafka-与传统消息系统之间的区别" tabindex="-1"><a class="header-anchor" href="#_5-kafka-与传统消息系统之间的区别" aria-hidden="true">#</a> 5. Kafka 与传统消息系统之间的区别</h2>
<ul>
<li>
<p>Kafka 持久化日志，这些日志可以被重复读取和无限期保留</p>
</li>
<li>
<p>Kafka 是一个分布式系统：它以集群的方式运行，可以灵活伸缩，在内部通过复制数据提升容错能力和高可用性</p>
</li>
<li>
<p>Kafka 支持实时的流式处理</p>
</li>
</ul>
<h2 id="_6-什么是消费者组" tabindex="-1"><a class="header-anchor" href="#_6-什么是消费者组" aria-hidden="true">#</a> 6. 什么是消费者组？</h2>
<p>消费者组是Kafka独有的概念，即消费者组是Kafka提供的可扩展且具有容错性的消费者机制。</p>
<p>但实际上，消费者组（Consumer Group）其实包含两个概念，作为队列，消费者组允许你分割数据处理到一组进程集合上（即一个消费者组中可以包含多个消费者进程，他们共同消费该topic的数据），这有助于你的消费能力的动态调整；作为发布-订阅模型（publish-subscribe），Kafka允许你将同一份消息广播到多个消费者组里，以此来丰富多种数据使用场景。</p>
<p>需要注意的是：在消费者组中，多个实例共同订阅若干个主题，实现共同消费。同一个组下的每个实例都配置有相同的组ID，被分配不同的订阅分区。当某个实例挂掉的时候，其他实例会自动地承担起它负责消费的分区。 因此，消费者组在一定程度上也保证了消费者程序的高可用性。</p>
<p><a href="http://dockone.io/uploads/article/20201024/7b359b7a1381541fbacf3ecf20dfb347.jpg" target="_blank" rel="noopener noreferrer"><img src="http://dockone.io/uploads/article/20201024/7b359b7a1381541fbacf3ecf20dfb347.jpg" alt="1.jpg"></a></p>
<h2 id="_7-在kafka中-zookeeper的作用是什么" tabindex="-1"><a class="header-anchor" href="#_7-在kafka中-zookeeper的作用是什么" aria-hidden="true">#</a> 7. 在Kafka中，ZooKeeper的作用是什么？</h2>
<p>目前，Kafka使用ZooKeeper存放集群元数据、成员管理、Controller选举，以及其他一些管理类任务。之后，等KIP-500提案完成后，Kafka将完全不再依赖于ZooKeeper。</p>
<ul>
<li>“存放元数据”是指主题分区的所有数据都保存在 ZooKeeper 中，且以它保存的数据为权威，其他 “人” 都要与它保持对齐。</li>
<li>“成员管理” 是指 Broker 节点的注册、注销以及属性变更，等等。</li>
<li>“Controller 选举” 是指选举集群 Controller，而其他管理类任务包括但不限于主题删除、参数配置等。</li>
</ul>
<p>KIP-500 思想，是使用社区自研的基于Raft的共识算法，替代ZooKeeper，实现Controller自选举。</p>
<h2 id="_8-解释下kafka中位移-offset-的作用" tabindex="-1"><a class="header-anchor" href="#_8-解释下kafka中位移-offset-的作用" aria-hidden="true">#</a> 8. 解释下Kafka中位移（offset）的作用</h2>
<p>在Kafka中，每个主题分区下的每条消息都被赋予了一个唯一的ID数值，用于标识它在分区中的位置。这个ID数值，就被称为位移，或者叫偏移量。一旦消息被写入到分区日志，它的位移值将不能被修改。</p>
<h2 id="_9-kafka-为什么那么快" tabindex="-1"><a class="header-anchor" href="#_9-kafka-为什么那么快" aria-hidden="true">#</a> 9. kafka 为什么那么快？</h2>
<ul>
<li>Cache Filesystem Cache PageCache缓存</li>
<li><code v-pre>顺序写</code>：由于现代的操作系统提供了预读和写技术，磁盘的顺序写大多数情况下比随机写内存还要快。</li>
<li><code v-pre>Zero-copy</code>：零拷技术减少拷贝次数</li>
<li><code v-pre>Batching of Messages</code>：批量量处理。合并小的请求，然后以流的方式进行交互，直顶网络上限。</li>
<li><code v-pre>Pull 拉模式</code>：使用拉模式进行消息的获取消费，与消费端处理能力相符。</li>
</ul>
<h2 id="_10-kafka-producer发送数据-ack为0-1-1分别是什么意思" tabindex="-1"><a class="header-anchor" href="#_10-kafka-producer发送数据-ack为0-1-1分别是什么意思" aria-hidden="true">#</a> 10. kafka producer发送数据，ack为0，1，-1分别是什么意思？</h2>
<ul>
<li><code v-pre>1</code>（默认） 数据发送到Kafka后，经过leader成功接收消息的的确认，就算是发送成功了。在这种情况下，如果leader宕机了，则会丢失数据。</li>
<li><code v-pre>0</code> 生产者将数据发送出去就不管了，不去等待任何返回。这种情况下数据传输效率最高，但是数据可靠性确是最低的。</li>
<li><code v-pre>-1</code>producer需要等待ISR中的所有follower都确认接收到数据后才算一次发送完成，可靠性最高。当ISR中所有Replica都向Leader发送ACK时，leader才commit，这时候producer才能认为一个请求中的消息都commit了。</li>
</ul>
<h2 id="_11-kafka如何保证消息不丢失" tabindex="-1"><a class="header-anchor" href="#_11-kafka如何保证消息不丢失" aria-hidden="true">#</a> 11. Kafka如何保证消息不丢失?</h2>
<p>首先需要弄明白消息为什么会丢失，对于一个消息队列，会有 <code v-pre>生产者</code>、<code v-pre>MQ</code>、<code v-pre>消费者</code> 这三个角色，在这三个角色数据处理和传输过程中，都有可能会出现消息丢失。</p>
<p><img src="http://blog-img.coolsen.cn/img/Solve-MQ-Problem-With-Kafka-03.png" alt="img"></p>
<p>消息丢失的原因以及解决办法：</p>
<h3 id="消费者异常导致的消息丢失" tabindex="-1"><a class="header-anchor" href="#消费者异常导致的消息丢失" aria-hidden="true">#</a> 消费者异常导致的消息丢失</h3>
<p>消费者可能导致数据丢失的情况是：消费者获取到了这条消息后，还未处理，<code v-pre>Kafka</code> 就自动提交了 <code v-pre>offset</code>，这时 <code v-pre>Kafka</code> 就认为消费者已经处理完这条消息，其实消费者才刚准备处理这条消息，这时如果消费者宕机，那这条消息就丢失了。</p>
<p>消费者引起消息丢失的主要原因就是消息还未处理完 <code v-pre>Kafka</code> 会自动提交了 <code v-pre>offset</code>，那么只要关闭自动提交 <code v-pre>offset</code>，消费者在处理完之后手动提交 <code v-pre>offset</code>，就可以保证消息不会丢失。但是此时需要注意重复消费问题，比如消费者刚处理完，还没提交 <code v-pre>offset</code>，这时自己宕机了，此时这条消息肯定会被重复消费一次，这就需要消费者根据实际情况保证幂等性。</p>
<h3 id="生产者数据传输导致的消息丢失" tabindex="-1"><a class="header-anchor" href="#生产者数据传输导致的消息丢失" aria-hidden="true">#</a> 生产者数据传输导致的消息丢失</h3>
<p>对于生产者数据传输导致的数据丢失主常见情况是生产者发送消息给 <code v-pre>Kafka</code>，由于网络等原因导致消息丢失，对于这种情况也是通过在 <strong>producer</strong> 端设置 <strong>acks=all</strong> 来处理，这个参数是要求 <code v-pre>leader</code> 接收到消息后，需要等到所有的 <code v-pre>follower</code> 都同步到了消息之后，才认为本次写成功了。如果没满足这个条件，生产者会自动不断的重试。</p>
<h3 id="kafka-导致的消息丢失" tabindex="-1"><a class="header-anchor" href="#kafka-导致的消息丢失" aria-hidden="true">#</a> Kafka 导致的消息丢失</h3>
<p><code v-pre>Kafka</code> 导致的数据丢失一个常见的场景就是 <code v-pre>Kafka</code> 某个 <code v-pre>broker</code> 宕机，，而这个节点正好是某个 <code v-pre>partition</code> 的 <code v-pre>leader</code> 节点，这时需要重新重新选举该 <code v-pre>partition</code> 的 <code v-pre>leader</code>。如果该 <code v-pre>partition</code> 的 <code v-pre>leader</code> 在宕机时刚好还有些数据没有同步到 <code v-pre>follower</code>，此时 <code v-pre>leader</code> 挂了，在选举某个 <code v-pre>follower</code> 成 <code v-pre>leader</code> 之后，就会丢失一部分数据。</p>
<p>对于这个问题，<code v-pre>Kafka</code> 可以设置如下 4 个参数，来尽量避免消息丢失：</p>
<ul>
<li>给 <code v-pre>topic</code> 设置 <code v-pre>replication.factor</code> 参数：这个值必须大于 <code v-pre>1</code>，要求每个 <code v-pre>partition</code> 必须有至少 <code v-pre>2</code> 个副本；</li>
<li>在 <code v-pre>Kafka</code> 服务端设置 <code v-pre>min.insync.replicas</code> 参数：这个值必须大于 <code v-pre>1</code>，这个参数的含义是一个 <code v-pre>leader</code> 至少感知到有至少一个 <code v-pre>follower</code> 还跟自己保持联系，没掉队，这样才能确保 <code v-pre>leader</code> 挂了还有一个 <code v-pre>follower</code> 节点。</li>
<li>在 <code v-pre>producer</code> 端设置 <code v-pre>acks=all</code>，这个是要求每条数据，必须是写入所有 <code v-pre>replica</code> 之后，才能认为是写成功了；</li>
<li>在 <code v-pre>producer</code> 端设置 <code v-pre>retries=MAX</code>（很大很大很大的一个值，无限次重试的意思）：这个参数的含义是一旦写入失败，就无限重试，卡在这里了。</li>
</ul>
<h2 id="_13-kafka-如何保证消息的顺序性" tabindex="-1"><a class="header-anchor" href="#_13-kafka-如何保证消息的顺序性" aria-hidden="true">#</a> 13. Kafka 如何保证消息的顺序性</h2>
<p>在某些业务场景下，我们需要保证对于有逻辑关联的多条MQ消息被按顺序处理，比如对于某一条数据，正常处理顺序是<code v-pre>新增-更新-删除</code>，最终结果是数据被删除；如果消息没有按序消费，处理顺序可能是<code v-pre>删除-新增-更新</code>，最终数据没有被删掉，可能会产生一些逻辑错误。对于如何保证消息的顺序性，主要需要考虑如下两点：</p>
<ul>
<li>如何保证消息在 <code v-pre>Kafka</code> 中顺序性；</li>
<li>如何保证消费者处理消费的顺序性。</li>
</ul>
<h3 id="如何保证消息在-kafka-中顺序性" tabindex="-1"><a class="header-anchor" href="#如何保证消息在-kafka-中顺序性" aria-hidden="true">#</a> 如何保证消息在 Kafka 中顺序性</h3>
<p>对于 <code v-pre>Kafka</code>，如果我们创建了一个 <code v-pre>topic</code>，默认有三个 <code v-pre>partition</code>。生产者在写数据的时候，可以指定一个 <code v-pre>key</code>，比如在订单 <code v-pre>topic</code> 中我们可以指定订单 <code v-pre>id</code> 作为 <code v-pre>key</code>，那么相同订单 <code v-pre>id</code> 的数据，一定会被分发到同一个 <code v-pre>partition</code> 中去，而且这个 <code v-pre>partition</code> 中的数据一定是有顺序的。消费者从 <code v-pre>partition</code> 中取出来数据的时候，也一定是有顺序的。通过制定 <code v-pre>key</code> 的方式首先可以保证在 <code v-pre>kafka</code> 内部消息是有序的。</p>
<h3 id="如何保证消费者处理消费的顺序性" tabindex="-1"><a class="header-anchor" href="#如何保证消费者处理消费的顺序性" aria-hidden="true">#</a> 如何保证消费者处理消费的顺序性</h3>
<p>对于某个 <code v-pre>topic</code> 的一个 <code v-pre>partition</code>，只能被同组内部的一个 <code v-pre>consumer</code> 消费，如果这个 <code v-pre>consumer</code> 内部还是单线程处理，那么其实只要保证消息在 <code v-pre>MQ</code> 内部是有顺序的就可以保证消费也是有顺序的。但是单线程吞吐量太低，在处理大量 <code v-pre>MQ</code> 消息时，我们一般会开启多线程消费机制，那么如何保证消息在多个线程之间是被顺序处理的呢？对于多线程消费我们可以预先设置 <code v-pre>N</code> 个内存 <code v-pre>Queue</code>，具有相同 <code v-pre>key</code> 的数据都放到同一个内存 <code v-pre>Queue</code> 中；然后开启 <code v-pre>N</code> 个线程，每个线程分别消费一个内存 <code v-pre>Queue</code> 的数据即可，这样就能保证顺序性。当然，消息放到内存 <code v-pre>Queue</code> 中，有可能还未被处理，<code v-pre>consumer</code> 发生宕机，内存 <code v-pre>Queue</code> 中的数据会全部丢失，这就转变为上面提到的<strong>如何保证消息的可靠传输</strong>的问题了。</p>
<h2 id="_14-kafka中的isr、ar代表什么-isr的伸缩指什么" tabindex="-1"><a class="header-anchor" href="#_14-kafka中的isr、ar代表什么-isr的伸缩指什么" aria-hidden="true">#</a> 14. Kafka中的ISR、AR代表什么？ISR的伸缩指什么？</h2>
<ul>
<li><code v-pre>ISR</code>：In-Sync Replicas 副本同步队列</li>
<li><code v-pre>AR</code>:Assigned Replicas 所有副本</li>
</ul>
<p>ISR是由leader维护，follower从leader同步数据有一些延迟（包括<code v-pre>延迟时间replica.lag.time.max.ms</code>和<code v-pre>延迟条数replica.lag.max.messages</code>两个维度，当前最新的版本0.10.x中只支持<code v-pre>replica.lag.time.max.ms</code>这个维度），任意一个超过阈值都会把follower剔除出ISR，存入OSR（Outof-Sync Replicas）列表，新加入的follower也会先存放在OSR中。</p>
<blockquote>
<p>AR=ISR+OSR。</p>
</blockquote>
<h2 id="_15-描述下-kafka-中的领导者副本-leader-replica-和追随者副本-follower-replica-的区别" tabindex="-1"><a class="header-anchor" href="#_15-描述下-kafka-中的领导者副本-leader-replica-和追随者副本-follower-replica-的区别" aria-hidden="true">#</a> 15. 描述下 Kafka 中的领导者副本（Leader Replica）和追随者副本（Follower Replica）的区别</h2>
<p>Kafka副本当前分为领导者副本和追随者副本。只有Leader副本才能对外提供读写服务，响应Clients端的请求。Follower副本只是采用拉（PULL）的方式，被动地同步Leader副本中的数据，并且在Leader副本所在的Broker宕机后，随时准备应聘Leader副本。</p>
<p>加分点：</p>
<ul>
<li>强调Follower副本也能对外提供读服务。自Kafka 2.4版本开始，社区通过引入新的Broker端参数，允许Follower副本有限度地提供读服务。</li>
<li>强调Leader和Follower的消息序列在实际场景中不一致。通常情况下，很多因素可能造成Leader和Follower之间的不同步，比如程序问题，网络问题，broker问题等，短暂的不同步我们可以关注（秒级别），但长时间的不同步可能就需要深入排查了，因为一旦Leader所在节点异常，可能直接影响可用性。</li>
</ul>
<p>注意：之前确保一致性的主要手段是高水位机制（HW），但高水位值无法保证Leader连续变更场景下的数据一致性，因此，社区引入了Leader Epoch机制，来修复高水位值的弊端。</p>
<h2 id="_16-分区leader选举策略有几种" tabindex="-1"><a class="header-anchor" href="#_16-分区leader选举策略有几种" aria-hidden="true">#</a> 16. 分区Leader选举策略有几种？</h2>
<p>分区的Leader副本选举对用户是完全透明的，它是由Controller独立完成的。你需要回答的是，在哪些场景下，需要执行分区Leader选举。每一种场景对应于一种选举策略。</p>
<ul>
<li>OfflinePartition Leader选举：每当有分区上线时，就需要执行Leader选举。所谓的分区上线，可能是创建了新分区，也可能是之前的下线分区重新上线。这是最常见的分区Leader选举场景。</li>
<li>ReassignPartition Leader选举：当你手动运行kafka-reassign-partitions命令，或者是调用Admin的alterPartitionReassignments方法执行分区副本重分配时，可能触发此类选举。假设原来的AR是[1，2，3]，Leader是1，当执行副本重分配后，副本集合AR被设置成[4，5，6]，显然，Leader必须要变更，此时会发生Reassign Partition Leader选举。</li>
<li>PreferredReplicaPartition Leader选举：当你手动运行kafka-preferred-replica-election命令，或自动触发了Preferred Leader选举时，该类策略被激活。所谓的Preferred Leader，指的是AR中的第一个副本。比如AR是[3，2，1]，那么，Preferred Leader就是3。</li>
<li>ControlledShutdownPartition Leader选举：当Broker正常关闭时，该Broker上的所有Leader副本都会下线，因此，需要为受影响的分区执行相应的Leader选举。</li>
</ul>
<p>这4类选举策略的大致思想是类似的，即从AR中挑选首个在ISR中的副本，作为新Leader。</p>
<h2 id="_17-kafka的哪些场景中使用了零拷贝-zero-copy" tabindex="-1"><a class="header-anchor" href="#_17-kafka的哪些场景中使用了零拷贝-zero-copy" aria-hidden="true">#</a> 17. Kafka的哪些场景中使用了零拷贝（Zero Copy）？</h2>
<p>在Kafka中，体现Zero Copy使用场景的地方有两处：基于mmap的索引和日志文件读写所用的TransportLayer。</p>
<p>先说第一个。索引都是基于MappedByteBuffer的，也就是让用户态和内核态共享内核态的数据缓冲区，此时，数据不需要复制到用户态空间。不过，mmap虽然避免了不必要的拷贝，但不一定就能保证很高的性能。在不同的操作系统下，mmap的创建和销毁成本可能是不一样的。很高的创建和销毁开销会抵消Zero Copy带来的性能优势。由于这种不确定性，在Kafka中，只有索引应用了mmap，最核心的日志并未使用mmap机制。</p>
<p>再说第二个。TransportLayer是Kafka传输层的接口。它的某个实现类使用了FileChannel的transferTo方法。该方法底层使用sendfile实现了Zero Copy。对Kafka而言，如果I/O通道使用普通的PLAINTEXT，那么，Kafka就可以利用Zero Copy特性，直接将页缓存中的数据发送到网卡的Buffer中，避免中间的多次拷贝。相反，如果I/O通道启用了SSL，那么，Kafka便无法利用Zero Copy特性了。</p>
<h2 id="_18-为什么kafka不支持读写分离" tabindex="-1"><a class="header-anchor" href="#_18-为什么kafka不支持读写分离" aria-hidden="true">#</a> 18. 为什么Kafka不支持读写分离？</h2>
<p>在 Kafka 中，生产者写入消息、消费者读取消息的操作都是与 leader 副本进行交互的，从 而实现的是一种主写主读的生产消费模型。</p>
<p>Kafka 并不支持主写从读，因为主写从读有 2 个很明 显的缺点:</p>
<ul>
<li><strong>数据一致性问题</strong>。数据从主节点转到从节点必然会有一个延时的时间窗口，这个时间 窗口会导致主从节点之间的数据不一致。某一时刻，在主节点和从节点中 A 数据的值都为 X， 之后将主节点中 A 的值修改为 Y，那么在这个变更通知到从节点之前，应用读取从节点中的 A 数据的值并不为最新的 Y，由此便产生了数据不一致的问题。</li>
<li><strong>延时问题</strong>。类似 Redis 这种组件，数据从写入主节点到同步至从节点中的过程需要经历<code v-pre>网络→主节点内存→网络→从节点内存</code>这几个阶段，整个过程会耗费一定的时间。而在 Kafka 中，主从同步会比 Redis 更加耗时，它需要经历<code v-pre>网络→主节点内存→主节点磁盘→网络→从节点内存→从节点磁盘</code>这几个阶段。对延时敏感的应用而言，主写从读的功能并不太适用。</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<p>http://dockone.io/article/10853</p>
<p>https://segmentfault.com/a/1190000023716306</p>
<p>https://dongzl.github.io/2020/03/16/13-Solve-MQ-Problem-With-Kafka/index.html</p>
</div></template>


