<template><div><h2 id="_1-使用spring框架的好处是什么" tabindex="-1"><a class="header-anchor" href="#_1-使用spring框架的好处是什么" aria-hidden="true">#</a> 1. 使用Spring框架的好处是什么？</h2>
<ul>
<li>**轻量：**Spring 是轻量的，基本的版本大约2MB</li>
<li>**控制反转：**Spring通过控制反转实现了松散耦合，对象们给出它们的依赖，而不是创建或查找依赖的对象们</li>
<li>**面向切面的编程(AOP)：**Spring支持面向切面的编程，并且把应用业务逻辑和系统服务分开</li>
<li>**容器：**Spring 包含并管理应用中对象的生命周期和配置</li>
<li>**MVC框架：**Spring的WEB框架是个精心设计的框架，是Web框架的一个很好的替代品</li>
<li>**事务管理：**Spring 提供一个持续的事务管理接口，可以扩展到上至本地事务下至全局事务（JTA）</li>
<li>**异常处理：**Spring 提供方便的API把具体技术相关的异常（比如由JDBC，Hibernate or JDO抛出的）转化为一致的unchecked 异常。</li>
</ul>
<h2 id="_2-什么是-spring-ioc-容器" tabindex="-1"><a class="header-anchor" href="#_2-什么是-spring-ioc-容器" aria-hidden="true">#</a> 2. 什么是 Spring IOC 容器？</h2>
<p>Spring 框架的核心是 Spring 容器。容器创建对象，将它们装配在一起，配置它们并管理它们的完整生命周期。Spring 容器使用依赖注入来管理组成应用程序的组件。容器通过读取提供的配置元数据来接收对象进行实例化，配置和组装的指令。该元数据可以通过 XML，Java 注解或 Java 代码提供。</p>
<p><img src="http://blog-img.coolsen.cn/img/3101171-33099411d16ca051.png" alt="image.png"></p>
<h2 id="_3-什么是依赖注入-可以通过多少种方式完成依赖注入" tabindex="-1"><a class="header-anchor" href="#_3-什么是依赖注入-可以通过多少种方式完成依赖注入" aria-hidden="true">#</a> 3. 什么是依赖注入？可以通过多少种方式完成依赖注入？</h2>
<p>在依赖注入中，您不必创建对象，但必须描述如何创建它们。您不是直接在代码中将组件和服务连接在一起，而是描述配置文件中哪些组件需要哪些服务。由 IoC 容器将它们装配在一起。</p>
<p>通常，依赖注入可以通过三种方式完成，即：</p>
<ul>
<li>构造函数注入</li>
<li>setter 注入</li>
<li>接口注入</li>
</ul>
<p>在 Spring Framework 中，仅使用构造函数和 setter 注入。</p>
<h2 id="_4-区分-beanfactory-和-applicationcontext" tabindex="-1"><a class="header-anchor" href="#_4-区分-beanfactory-和-applicationcontext" aria-hidden="true">#</a> 4. 区分 BeanFactory 和 ApplicationContext？</h2>
<table>
<thead>
<tr>
<th>BeanFactory</th>
<th>ApplicationContext</th>
</tr>
</thead>
<tbody>
<tr>
<td>它使用懒加载</td>
<td>它使用即时加载</td>
</tr>
<tr>
<td>它使用语法显式提供资源对象</td>
<td>它自己创建和管理资源对象</td>
</tr>
<tr>
<td>不支持国际化</td>
<td>支持国际化</td>
</tr>
<tr>
<td>不支持基于依赖的注解</td>
<td>支持基于依赖的注解</td>
</tr>
</tbody>
</table>
<p>BeanFactory和ApplicationContext的优缺点分析：</p>
<p>BeanFactory的优缺点：</p>
<ul>
<li>优点：应用启动的时候占用资源很少，对资源要求较高的应用，比较有优势；</li>
<li>缺点：运行速度会相对来说慢一些。而且有可能会出现空指针异常的错误，而且通过Bean工厂创建的Bean生命周期会简单一些。</li>
</ul>
<p>ApplicationContext的优缺点：</p>
<ul>
<li>优点：所有的Bean在启动的时候都进行了加载，系统运行的速度快；在系统启动的时候，可以发现系统中的配置问题。</li>
<li>缺点：把费时的操作放到系统启动中完成，所有的对象都可以预加载，缺点就是内存占用较大。</li>
</ul>
<h2 id="_5-区分构造函数注入和-setter-注入" tabindex="-1"><a class="header-anchor" href="#_5-区分构造函数注入和-setter-注入" aria-hidden="true">#</a> 5. 区分构造函数注入和 setter 注入</h2>
<table>
<thead>
<tr>
<th>构造函数注入</th>
<th>setter 注入</th>
</tr>
</thead>
<tbody>
<tr>
<td>没有部分注入</td>
<td>有部分注入</td>
</tr>
<tr>
<td>不会覆盖 setter 属性</td>
<td>会覆盖 setter 属性</td>
</tr>
<tr>
<td>任意修改都会创建一个新实例</td>
<td>任意修改不会创建一个新实例</td>
</tr>
<tr>
<td>适用于设置很多属性</td>
<td>适用于设置少量属性</td>
</tr>
</tbody>
</table>
<h2 id="_6-spring-提供了哪些配置方式" tabindex="-1"><a class="header-anchor" href="#_6-spring-提供了哪些配置方式" aria-hidden="true">#</a> 6. spring 提供了哪些配置方式？</h2>
<ul>
<li>基于 xml 配置</li>
</ul>
<p>bean 所需的依赖项和服务在 XML 格式的配置文件中指定。这些配置文件通常包含许多 bean 定义和特定于应用程序的配置选项。它们通常以 bean 标签开头。例如：</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code>&lt;bean id=&quot;studentbean&quot; class=&quot;org.edureka.firstSpring.StudentBean&quot;&gt;
 &lt;property name=&quot;name&quot; value=&quot;Edureka&quot;&gt;&lt;/property&gt;
&lt;/bean&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>基于注解配置</li>
</ul>
<p>您可以通过在相关的类，方法或字段声明上使用注解，将 bean 配置为组件类本身，而不是使用 XML 来描述 bean 装配。默认情况下，Spring 容器中未打开注解装配。因此，您需要在使用它之前在 Spring 配置文件中启用它。例如：</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code>&lt;beans&gt;
&lt;context:annotation-config/&gt;
&lt;!-- bean definitions go here --&gt;
&lt;/beans&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>基于 Java API 配置</li>
</ul>
<p>Spring 的 Java 配置是通过使用 @Bean 和 @Configuration 来实现。</p>
<ol>
<li>@Bean 注解扮演与 <code v-pre>&lt;bean /&gt;</code> 元素相同的角色。</li>
<li>@Configuration 类允许通过简单地调用同一个类中的其他 @Bean 方法来定义 bean 间依赖关系。</li>
</ol>
<p>例如：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>@Configuration
public class StudentConfig {
    @Bean
    public StudentBean myStudent() {
        return new StudentBean();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-spring-中的-bean-的作用域有哪些" tabindex="-1"><a class="header-anchor" href="#_7-spring-中的-bean-的作用域有哪些" aria-hidden="true">#</a> 7. Spring 中的 bean 的作用域有哪些?</h2>
<ul>
<li>singleton : 唯一 bean 实例，Spring 中的 bean 默认都是单例的。</li>
<li>prototype : 每次请求都会创建一个新的 bean 实例。</li>
<li>request : 每一次HTTP请求都会产生一个新的bean，该bean仅在当前HTTP request内有效。</li>
<li>session : ：在一个HTTP Session中，一个Bean定义对应一个实例。该作用域仅在基于web的Spring ApplicationContext情形下有效。</li>
<li>global-session： 全局session作用域，仅仅在基于portlet的web应用中才有意义，Spring5已经没有了。Portlet是能够生成语义代码(例如：HTML)片段的小型Java Web插件。它们基于portlet容器，可以像servlet一样处理HTTP请求。但是，与 servlet 不同，每个 portlet 都有不同的会话</li>
</ul>
<h2 id="_8-如何理解ioc和di" tabindex="-1"><a class="header-anchor" href="#_8-如何理解ioc和di" aria-hidden="true">#</a> 8. 如何理解IoC和DI？</h2>
<p>IOC就是控制反转，通俗的说就是我们不用自己创建实例对象，这些都交给Spring的bean工厂帮我们创建管理。这也是Spring的核心思想，通过面向接口编程的方式来是实现对业务组件的动态依赖。这就意味着IOC是Spring针对解决程序耦合而存在的。在实际应用中，Spring通过配置文件（xml或者properties）指定需要实例化的java类（类名的完整字符串），包括这些java类的一组初始化值，通过加载读取配置文件，用Spring提供的方法（getBean()）就可以获取到我们想要的根据指定配置进行初始化的实例对象。</p>
<ul>
<li>优点：IOC或依赖注入减少了应用程序的代码量。它使得应用程序的测试很简单，因为在单元测试中不再需要单例或JNDI查找机制。简单的实现以及较少的干扰机制使得松耦合得以实现。IOC容器支持勤性单例及延迟加载服务。</li>
</ul>
<p><strong>DI：DI—Dependency</strong> Injection，即“依赖注入”：组件之间依赖关系由容器在运行期决定，形象的说，即由容器动态的将某个依赖关系注入到组件之中。依赖注入的目的并非为软件系统带来更多功能，而是为了提升组件重用的频率，并为系统搭建一个灵活、可扩展的平台。通过依赖注入机制，我们只需要通过简单的配置，而无需任何代码就可指定目标需要的资源，完成自身的业务逻辑，而不需要关心具体的资源来自何处，由谁实现。</p>
<h2 id="_9-将一个类声明为spring的-bean-的注解有哪些" tabindex="-1"><a class="header-anchor" href="#_9-将一个类声明为spring的-bean-的注解有哪些" aria-hidden="true">#</a> 9. 将一个类声明为Spring的 bean 的注解有哪些?</h2>
<p>我们一般使用 @Autowired 注解自动装配 bean，要想把类标识成可用于 @Autowired 注解自动装配的 bean 的类,采用以下注解可实现：</p>
<ul>
<li>@Component ：通用的注解，可标注任意类为 Spring 组件。如果一个Bean不知道属于哪个层，可以使用@Component 注解标注。
8 @Repository : 对应持久层即 Dao 层，主要用于数据库相关操作。</li>
<li>@Service : 对应服务层，主要涉及一些复杂的逻辑，需要用到 Dao层。</li>
<li>@Controller : 对应 Spring MVC 控制层，主要用户接受用户请求并调用 Service 层返回数据给前端页面。</li>
</ul>
<h2 id="_10-spring-支持几种-bean-scope" tabindex="-1"><a class="header-anchor" href="#_10-spring-支持几种-bean-scope" aria-hidden="true">#</a> 10. spring 支持几种 bean scope？</h2>
<p>Spring bean 支持 5 种 scope：</p>
<ul>
<li><strong>Singleton</strong> - 每个 Spring IoC 容器仅有一个单实例。</li>
<li><strong>Prototype</strong> - 每次请求都会产生一个新的实例。</li>
<li><strong>Request</strong> - 每一次 HTTP 请求都会产生一个新的实例，并且该 bean 仅在当前 HTTP 请求内有效。</li>
<li><strong>Session</strong> - 每一次 HTTP 请求都会产生一个新的 bean，同时该 bean 仅在当前 HTTP session 内有效。</li>
<li><strong>Global-session</strong> - 类似于标准的 HTTP Session 作用域，不过它仅仅在基于 portlet 的 web 应用中才有意义。Portlet 规范定义了全局 Session 的概念，它被所有构成某个 portlet web 应用的各种不同的 portlet 所共享。在 global session 作用域中定义的 bean 被限定于全局 portlet Session 的生命周期范围内。如果你在 web 中使用 global session 作用域来标识 bean，那么 web 会自动当成 session 类型来使用。</li>
</ul>
<p>仅当用户使用支持 Web 的 ApplicationContext 时，最后三个才可用。</p>
<h2 id="_11-spring-中的-bean-生命周期" tabindex="-1"><a class="header-anchor" href="#_11-spring-中的-bean-生命周期" aria-hidden="true">#</a> 11. Spring 中的 bean 生命周期?</h2>
<p>Bean的生命周期是由容器来管理的。主要在创建和销毁两个时期。</p>
<p><img src="http://blog-img.coolsen.cn/img/1583675090641_51.png" alt=""></p>
<h3 id="创建过程" tabindex="-1"><a class="header-anchor" href="#创建过程" aria-hidden="true">#</a> 创建过程：</h3>
<p>1，实例化bean对象，以及设置bean属性；
2，如果通过Aware接口声明了依赖关系，则会注入Bean对容器基础设施层面的依赖，Aware接口是为了感知到自身的一些属性。容器管理的Bean一般不需要知道容器的状态和直接使用容器。但是在某些情况下是需要在Bean中对IOC容器进行操作的。这时候需要在bean中设置对容器的感知。SpringIOC容器也提供了该功能，它是通过特定的Aware接口来完成的。
比如BeanNameAware接口，可以知道自己在容器中的名字。
如果这个Bean已经实现了BeanFactoryAware接口，可以用这个方式来获取其它Bean。
（如果Bean实现了BeanNameAware接口，调用setBeanName()方法，传入Bean的名字。
如果Bean实现了BeanClassLoaderAware接口，调用setBeanClassLoader()方法，传入ClassLoader对象的实例。
如果Bean实现了BeanFactoryAware接口，调用setBeanFactory()方法，传入BeanFactory对象的实例。）
3，紧接着会调用BeanPostProcess的前置初始化方法postProcessBeforeInitialization，主要作用是在Spring完成实例化之后，初始化之前，对Spring容器实例化的Bean添加自定义的处理逻辑。有点类似于AOP。
4，如果实现了BeanFactoryPostProcessor接口的afterPropertiesSet方法，做一些属性被设定后的自定义的事情。
5，调用Bean自身定义的init方法，去做一些初始化相关的工作。
6，调用BeanPostProcess的后置初始化方法，postProcessAfterInitialization去做一些bean初始化之后的自定义工作。
7，完成以上创建之后就可以在应用里使用这个Bean了。</p>
<h3 id="销毁过程" tabindex="-1"><a class="header-anchor" href="#销毁过程" aria-hidden="true">#</a> 销毁过程：</h3>
<p>当Bean不再用到，便要销毁
1，若实现了DisposableBean接口，则会调用destroy方法；
2，若配置了destry-method属性，则会调用其配置的销毁方法；</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>主要把握创建过程和销毁过程这两个大的方面；
创建过程：首先实例化Bean，并设置Bean的属性，根据其实现的Aware接口（主要是BeanFactoryAware接口，BeanFactoryAware，ApplicationContextAware）设置依赖信息，
接下来调用BeanPostProcess的postProcessBeforeInitialization方法，完成initial前的自定义逻辑；afterPropertiesSet方法做一些属性被设定后的自定义的事情;调用Bean自身定义的init方法，去做一些初始化相关的工作;然后再调用postProcessAfterInitialization去做一些bean初始化之后的自定义工作。这四个方法的调用有点类似AOP。
此时，Bean初始化完成，可以使用这个Bean了。
销毁过程：如果实现了DisposableBean的destroy方法，则调用它，如果实现了自定义的销毁方法，则调用之。</p>
<h2 id="_12-什么是-spring-的内部-bean" tabindex="-1"><a class="header-anchor" href="#_12-什么是-spring-的内部-bean" aria-hidden="true">#</a> 12. 什么是 spring 的内部 bean？</h2>
<p>只有将 bean 用作另一个 bean 的属性时，才能将 bean 声明为内部 bean。为了定义 bean，Spring 的基于 XML 的配置元数据在 <code v-pre>&lt;property&gt;</code> 或 <code v-pre>&lt;constructor-arg&gt;</code> 中提供了 <code v-pre>&lt;bean&gt;</code> 元素的使用。内部 bean 总是匿名的，它们总是作为原型。</p>
<p>例如，假设我们有一个 Student 类，其中引用了 Person 类。这里我们将只创建一个 Person 类实例并在 Student 中使用它。</p>
<p>Student.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>public class Student {
    private Person person;
    //Setters and Getters
}
public class Person {
    private String name;
    private String address;
    //Setters and Getters
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>bean.xml</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code>&lt;bean id=“StudentBean&quot; class=&quot;com.edureka.Student&quot;&gt;
    &lt;property name=&quot;person&quot;&gt;
        &lt;!--This is inner bean --&gt;
        &lt;bean class=&quot;com.edureka.Person&quot;&gt;
            &lt;property name=&quot;name&quot; value=“Scott&quot;&gt;&lt;/property&gt;
            &lt;property name=&quot;address&quot; value=“Bangalore&quot;&gt;&lt;/property&gt;
        &lt;/bean&gt;
    &lt;/property&gt;
&lt;/bean&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_13-什么是-spring-装配" tabindex="-1"><a class="header-anchor" href="#_13-什么是-spring-装配" aria-hidden="true">#</a> 13. 什么是 spring 装配？</h2>
<p>当 bean 在 Spring 容器中组合在一起时，它被称为装配或 bean 装配。 Spring 容器需要知道需要什么 bean 以及容器应该如何使用依赖注入来将 bean 绑定在一起，同时装配 bean。</p>
<p>Spring 容器能够自动装配 bean。也就是说，可以通过检查 BeanFactory 的内容让 Spring 自动解析 bean 的协作者。</p>
<p>自动装配的不同模式：</p>
<ul>
<li><strong>no</strong> - 这是默认设置，表示没有自动装配。应使用显式 bean 引用进行装配。</li>
<li><strong>byName</strong> - 它根据 bean 的名称注入对象依赖项。它匹配并装配其属性与 XML 文件中由相同名称定义的 bean。</li>
<li><strong>byType</strong> - 它根据类型注入对象依赖项。如果属性的类型与 XML 文件中的一个 bean 名称匹配，则匹配并装配属性。</li>
<li><strong>构造函数</strong> - 它通过调用类的构造函数来注入依赖项。它有大量的参数。</li>
<li><strong>autodetect</strong> - 首先容器尝试通过构造函数使用 autowire 装配，如果不能，则尝试通过 byType 自动装配。</li>
</ul>
<h2 id="_14-自动装配有什么局限" tabindex="-1"><a class="header-anchor" href="#_14-自动装配有什么局限" aria-hidden="true">#</a> 14. 自动装配有什么局限？</h2>
<ul>
<li>覆盖的可能性 - 您始终可以使用 <code v-pre>&lt;constructor-arg&gt;</code> 和 <code v-pre>&lt;property&gt;</code> 设置指定依赖项，这将覆盖自动装配。</li>
<li>基本元数据类型 - 简单属性（如原数据类型，字符串和类）无法自动装配。</li>
<li>令人困惑的性质 - 总是喜欢使用明确的装配，因为自动装配不太精确。</li>
</ul>
<h2 id="_15-spring中出现同名bean怎么办" tabindex="-1"><a class="header-anchor" href="#_15-spring中出现同名bean怎么办" aria-hidden="true">#</a> 15. Spring中出现同名bean怎么办？</h2>
<ul>
<li>同一个配置文件内同名的Bean，以最上面定义的为准</li>
<li>不同配置文件中存在同名Bean，后解析的配置文件会覆盖先解析的配置文件</li>
<li>同文件中ComponentScan和@Bean出现同名Bean。同文件下@Bean的会生效，@ComponentScan扫描进来不会生效。通过@ComponentScan扫描进来的优先级是最低的，原因就是它扫描进来的Bean定义是最先被注册的~</li>
</ul>
<h2 id="_16-spring-怎么解决循环依赖问题" tabindex="-1"><a class="header-anchor" href="#_16-spring-怎么解决循环依赖问题" aria-hidden="true">#</a> 16. Spring 怎么解决循环依赖问题？</h2>
<p>spring对循环依赖的处理有三种情况：
①构造器的循环依赖：这种依赖spring是处理不了的，直 接抛出BeanCurrentlylnCreationException异常。
②单例模式下的setter循环依赖：通过“三级缓存”处理循环依赖。
③非单例循环依赖：无法处理。</p>
<p>下面分析单例模式下的setter循环依赖如何解决</p>
<p>Spring的单例对象的初始化主要分为三步：
<img src="http://blog-img.coolsen.cn/img/1584761413341_12.png" alt=""></p>
<p>（1）createBeanInstance：实例化，其实也就是调用对象的构造方法实例化对象</p>
<p>（2）populateBean：填充属性，这一步主要是多bean的依赖属性进行填充</p>
<p>（3）initializeBean：调用spring xml中的init 方法。</p>
<p>从上面讲述的单例bean初始化步骤我们可以知道，循环依赖主要发生在第一、第二部。也就是构造器循环依赖和field循环依赖。</p>
<p><img src="http://blog-img.coolsen.cn/img/1584758309616_10.png" alt=""></p>
<p>举例：A的某个field或者setter依赖了B的实例对象，同时B的某个field或者setter依赖了A的实例对象”这种循环依赖的情况。A首先完成了</p>
<p>初始化的第一步（createBeanINstance实例化），并且将自己提前曝光到singletonFactories中。</p>
<p>此时进行初始化的第二步，发现自己依赖对象B，此时就尝试去get(B)，发现B还没有被create，所以走create流程，B在初始化第一步的时候发现自己依赖了对象A，于是尝试get(A)，尝试一级缓存singletonObjects(肯定没有，因为A还没初始化完全)，尝试二级缓存earlySingletonObjects（也没有），尝试三级缓存singletonFactories，由于A通过ObjectFactory将自己提前曝光了，所以B能够通过</p>
<p>ObjectFactory.getObject拿到A对象(虽然A还没有初始化完全，但是总比没有好呀)，B拿到A对象后顺利完成了初始化阶段1、2、3，完全初始化之后将自己放入到一级缓存singletonObjects中。</p>
<p>此时返回A中，A此时能拿到B的对象顺利完成自己的初始化阶段2、3，最终A也完成了初始化，进去了一级缓存singletonObjects中，而且更加幸运的是，由于B拿到了A的对象引用，所以B现在hold住的A对象完成了初始化。</p>
<h2 id="_17-spring-中的单例-bean-的线程安全问题" tabindex="-1"><a class="header-anchor" href="#_17-spring-中的单例-bean-的线程安全问题" aria-hidden="true">#</a> 17. Spring 中的单例 bean 的线程安全问题？</h2>
<p>当多个用户同时请求一个服务时，容器会给每一个请求分配一个线程，这时多个线程会并发执行该请求对应的业务逻辑（成员方法），此时就要注意了，如果该处理逻辑中有对单例状态的修改（体现为该单例的成员属性），则必须考虑线程同步问题。
<strong>线程安全问题都是由全局变量及静态变量引起的。</strong>
若每个线程中对全局变量、静态变量只有读操作，而无写操作，一般来说，这个全局变量是线程安全的；若有多个线程同时执行写操作，一般都需要考虑线程同步，否则就可能影响线程安全.</p>
<p><strong>无状态bean和有状态bean</strong></p>
<ul>
<li>有状态就是有数据存储功能。有状态对象(Stateful Bean)，就是有实例变量的对象，可以保存数据，是非线程安全的。在不同方法调用间不保留任何状态。</li>
<li>无状态就是一次操作，不能保存数据。无状态对象(Stateless Bean)，就是没有实例变量的对象 .不能保存数据，是不变类，是线程安全的。</li>
</ul>
<p>在spring中无状态的Bean适合用不变模式，就是单例模式，这样可以共享实例提高性能。有状态的Bean在多线程环境下不安全，适合用Prototype原型模式。
Spring使用ThreadLocal解决线程安全问题。如果你的Bean有多种状态的话（比如 View Model 对象），就需要自行保证线程安全 。</p>
<h2 id="_18-什么是-aop" tabindex="-1"><a class="header-anchor" href="#_18-什么是-aop" aria-hidden="true">#</a> 18. 什么是 AOP？</h2>
<p>AOP(Aspect-Oriented Programming), 即 <strong>面向切面编程</strong>, 它与 OOP( Object-Oriented Programming, 面向对象编程) 相辅相成, 提供了与 OOP 不同的抽象软件结构的视角.
在 OOP 中, 我们以类(class)作为我们的基本单元, 而 AOP 中的基本单元是 <strong>Aspect(切面)</strong></p>
<h2 id="_19-aop-有哪些实现方式" tabindex="-1"><a class="header-anchor" href="#_19-aop-有哪些实现方式" aria-hidden="true">#</a> 19. AOP 有哪些实现方式？</h2>
<p>实现 AOP 的技术，主要分为两大类：</p>
<ul>
<li>静态代理 - 指使用 AOP 框架提供的命令进行编译，从而在编译阶段就可生成 AOP 代理类，因此也称为编译时增强；
<ul>
<li>编译时编织（特殊编译器实现）</li>
<li>类加载时编织（特殊的类加载器实现）。</li>
</ul>
</li>
<li>动态代理 - 在运行时在内存中“临时”生成 AOP 动态代理类，因此也被称为运行时增强。
<ul>
<li><code v-pre>JDK</code> 动态代理：通过反射来接收被代理的类，并且要求被代理的类必须实现一个接口 。JDK 动态代理的核心是 InvocationHandler 接口和 Proxy 类 。</li>
<li><code v-pre>CGLIB</code>动态代理： 如果目标类没有实现接口，那么 <code v-pre>Spring AOP</code> 会选择使用 <code v-pre>CGLIB</code> 来动态代理目标类 。<code v-pre>CGLIB</code> （ Code Generation Library ），是一个代码生成的类库，可以在运行时动态的生成某个类的子类，注意， <code v-pre>CGLIB</code> 是通过继承的方式做的动态代理，因此如果某个类被标记为 <code v-pre>final</code> ，那么它是无法使用 <code v-pre>CGLIB</code> 做动态代理的。</li>
</ul>
</li>
</ul>
<h2 id="_20-spring-aop-and-aspectj-aop-有什么区别" tabindex="-1"><a class="header-anchor" href="#_20-spring-aop-and-aspectj-aop-有什么区别" aria-hidden="true">#</a> 20. Spring AOP and AspectJ AOP 有什么区别？</h2>
<p>Spring AOP 基于动态代理方式实现；AspectJ 基于静态代理方式实现。
Spring AOP 仅支持方法级别的 PointCut；提供了完全的 AOP 支持，它还支持属性级别的 PointCut。</p>
<h2 id="_21-spring-框架中用到了哪些设计模式" tabindex="-1"><a class="header-anchor" href="#_21-spring-框架中用到了哪些设计模式" aria-hidden="true">#</a> 21. Spring 框架中用到了哪些设计模式？</h2>
<p><strong>工厂设计模式</strong> : Spring使用工厂模式通过 <code v-pre>BeanFactory</code>、<code v-pre>ApplicationContext</code> 创建 bean 对象。</p>
<p><strong>代理设计模式</strong> : Spring AOP 功能的实现。</p>
<p><strong>单例设计模式</strong> : Spring 中的 Bean 默认都是单例的。</p>
<p><strong>模板方法模式</strong> : Spring 中 <code v-pre>jdbcTemplate</code>、<code v-pre>hibernateTemplate</code> 等以 Template 结尾的对数据库操作的类，它们就使用到了模板模式。</p>
<p><strong>包装器设计模式</strong> : 我们的项目需要连接多个数据库，而且不同的客户在每次访问中根据需要会去访问不同的数据库。这种模式让我们可以根据客户的需求能够动态切换不同的数据源。</p>
<p><strong>观察者模式:</strong> Spring 事件驱动模型就是观察者模式很经典的一个应用。</p>
<p><strong>适配器模式</strong> :Spring AOP 的增强或通知(Advice)使用到了适配器模式、spring MVC 中也是用到了适配器模式适配<code v-pre>Controller</code>。</p>
<h2 id="_22-spring-事务实现方式有哪些" tabindex="-1"><a class="header-anchor" href="#_22-spring-事务实现方式有哪些" aria-hidden="true">#</a> 22. Spring 事务实现方式有哪些？</h2>
<ul>
<li>编程式事务管理：这意味着你可以通过编程的方式管理事务，这种方式带来了很大的灵活性，但很难维护。</li>
<li>声明式事务管理：这种方式意味着你可以将事务管理和业务代码分离。你只需要通过注解或者XML配置管理事务。</li>
</ul>
<h2 id="_23-spring框架的事务管理有哪些优点" tabindex="-1"><a class="header-anchor" href="#_23-spring框架的事务管理有哪些优点" aria-hidden="true">#</a> 23. Spring框架的事务管理有哪些优点？</h2>
<ul>
<li>
<p>它提供了跨不同事务api（如JTA、JDBC、Hibernate、JPA和JDO）的一致编程模型。</p>
</li>
<li>
<p>它为编程事务管理提供了比JTA等许多复杂事务API更简单的API。</p>
</li>
<li>
<p>它支持声明式事务管理。</p>
</li>
<li>
<p>它很好地集成了Spring的各种数据访问抽象。</p>
</li>
</ul>
<h2 id="_24-spring事务定义的传播规则" tabindex="-1"><a class="header-anchor" href="#_24-spring事务定义的传播规则" aria-hidden="true">#</a> 24. spring事务定义的传播规则</h2>
<ul>
<li>PROPAGATION_REQUIRED: 支持当前事务，如果当前没有事务，就新建一个事务。这是最常见的选择。</li>
<li>PROPAGATION_SUPPORTS: 支持当前事务，如果当前没有事务，就以非事务方式执行。</li>
<li>PROPAGATION_MANDATORY: 支持当前事务，如果当前没有事务，就抛出异常。</li>
<li>PROPAGATION_REQUIRES_NEW: 新建事务，如果当前存在事务，把当前事务挂起。</li>
<li>PROPAGATION_NOT_SUPPORTED: 以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。</li>
<li>PROPAGATION_NEVER: 以非事务方式执行，如果当前存在事务，则抛出异常。</li>
<li>PROPAGATION_NESTED:如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则进行与PROPAGATION_REQUIRED类似的操作。</li>
</ul>
<h2 id="_25-springmvc-工作原理了解吗" tabindex="-1"><a class="header-anchor" href="#_25-springmvc-工作原理了解吗" aria-hidden="true">#</a> 25. SpringMVC 工作原理了解吗?</h2>
<p><strong>原理如下图所示：</strong></p>
<p><img src="http://blog-img.coolsen.cn/img/SpingMVC-Process.jpg" alt="img"></p>
<p>上图的一个笔误的小问题：Spring MVC 的入口函数也就是前端控制器 <code v-pre>DispatcherServlet</code> 的作用是接收请求，响应结果。</p>
<p><strong>流程说明（重要）：</strong></p>
<ol>
<li>客户端（浏览器）发送请求，直接请求到 <code v-pre>DispatcherServlet</code>。</li>
<li><code v-pre>DispatcherServlet</code> 根据请求信息调用 <code v-pre>HandlerMapping</code>，解析请求对应的 <code v-pre>Handler</code>。</li>
<li>解析到对应的 <code v-pre>Handler</code>（也就是我们平常说的 <code v-pre>Controller</code> 控制器）后，开始由 <code v-pre>HandlerAdapter</code> 适配器处理。</li>
<li><code v-pre>HandlerAdapter</code> 会根据 <code v-pre>Handler</code>来调用真正的处理器开处理请求，并处理相应的业务逻辑。</li>
<li>处理器处理完业务后，会返回一个 <code v-pre>ModelAndView</code> 对象，<code v-pre>Model</code> 是返回的数据对象，<code v-pre>View</code> 是个逻辑上的 <code v-pre>View</code>。</li>
<li><code v-pre>ViewResolver</code> 会根据逻辑 <code v-pre>View</code> 查找实际的 <code v-pre>View</code>。</li>
<li><code v-pre>DispaterServlet</code> 把返回的 <code v-pre>Model</code> 传给 <code v-pre>View</code>（视图渲染）。</li>
<li>把 <code v-pre>View</code> 返回给请求者（浏览器）</li>
</ol>
<h2 id="_26-简单介绍-spring-mvc-的核心组件" tabindex="-1"><a class="header-anchor" href="#_26-简单介绍-spring-mvc-的核心组件" aria-hidden="true">#</a> 26. 简单介绍 Spring MVC 的核心组件</h2>
<p>那么接下来就简单介绍一下 <code v-pre>DispatcherServlet</code> 和九大组件（按使用顺序排序的）：</p>
<table>
<thead>
<tr>
<th style="text-align:left">组件</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">DispatcherServlet</td>
<td style="text-align:left">Spring MVC 的核心组件，是请求的入口，负责协调各个组件工作</td>
</tr>
<tr>
<td style="text-align:left">MultipartResolver</td>
<td style="text-align:left">内容类型( <code v-pre>Content-Type</code> )为 <code v-pre>multipart/*</code> 的请求的解析器，例如解析处理文件上传的请求，便于获取参数信息以及上传的文件</td>
</tr>
<tr>
<td style="text-align:left">HandlerMapping</td>
<td style="text-align:left">请求的处理器匹配器，负责为请求找到合适的 <code v-pre>HandlerExecutionChain</code> 处理器执行链，包含处理器（<code v-pre>handler</code>）和拦截器们（<code v-pre>interceptors</code>）</td>
</tr>
<tr>
<td style="text-align:left">HandlerAdapter</td>
<td style="text-align:left">处理器的适配器。因为处理器 <code v-pre>handler</code> 的类型是 Object 类型，需要有一个调用者来实现 <code v-pre>handler</code> 是怎么被执行。Spring 中的处理器的实现多变，比如用户处理器可以实现 Controller 接口、HttpRequestHandler 接口，也可以用 <code v-pre>@RequestMapping</code> 注解将方法作为一个处理器等，这就导致 Spring MVC 无法直接执行这个处理器。所以这里需要一个处理器适配器，由它去执行处理器</td>
</tr>
<tr>
<td style="text-align:left">HandlerExceptionResolver</td>
<td style="text-align:left">处理器异常解析器，将处理器（ <code v-pre>handler</code> ）执行时发生的异常，解析( 转换 )成对应的 ModelAndView 结果</td>
</tr>
<tr>
<td style="text-align:left">RequestToViewNameTranslator</td>
<td style="text-align:left">视图名称转换器，用于解析出请求的默认视图名</td>
</tr>
<tr>
<td style="text-align:left">LocaleResolver</td>
<td style="text-align:left">本地化（国际化）解析器，提供国际化支持</td>
</tr>
<tr>
<td style="text-align:left">ThemeResolver</td>
<td style="text-align:left">主题解析器，提供可设置应用整体样式风格的支持</td>
</tr>
<tr>
<td style="text-align:left">ViewResolver</td>
<td style="text-align:left">视图解析器，根据视图名和国际化，获得最终的视图 View 对象</td>
</tr>
<tr>
<td style="text-align:left">FlashMapManager</td>
<td style="text-align:left">FlashMap 管理器，负责重定向时，保存参数至临时存储（默认 Session）</td>
</tr>
</tbody>
</table>
<p>Spring MVC 对各个组件的职责划分的比较清晰。<code v-pre>DispatcherServlet</code> 负责协调，其他组件则各自做分内之事，互不干扰。</p>
<h2 id="_27-controller-注解有什么用" tabindex="-1"><a class="header-anchor" href="#_27-controller-注解有什么用" aria-hidden="true">#</a> 27. @Controller 注解有什么用？</h2>
<p><code v-pre>@Controller</code> 注解标记一个类为 Spring Web MVC <strong>控制器</strong> Controller。Spring MVC 会将扫描到该注解的类，然后扫描这个类下面带有 <code v-pre>@RequestMapping</code> 注解的方法，根据注解信息，为这个方法生成一个对应的<strong>处理器</strong>对象，在上面的 HandlerMapping 和 HandlerAdapter组件中讲到过。</p>
<p>当然，除了添加 <code v-pre>@Controller</code> 注解这种方式以外，你还可以实现 Spring MVC 提供的 <code v-pre>Controller</code> 或者 <code v-pre>HttpRequestHandler</code> 接口，对应的实现类也会被作为一个<strong>处理器</strong>对象</p>
<h2 id="_28-requestmapping-注解有什么用" tabindex="-1"><a class="header-anchor" href="#_28-requestmapping-注解有什么用" aria-hidden="true">#</a> 28. @RequestMapping 注解有什么用？</h2>
<p><code v-pre>@RequestMapping</code> 注解，在上面已经讲过了，配置<strong>处理器</strong>的 HTTP 请求方法，URI等信息，这样才能将请求和方法进行映射。这个注解可以作用于类上面，也可以作用于方法上面，在类上面一般是配置这个<strong>控制器</strong>的 URI 前缀</p>
<h2 id="_29-restcontroller-和-controller-有什么区别" tabindex="-1"><a class="header-anchor" href="#_29-restcontroller-和-controller-有什么区别" aria-hidden="true">#</a> 29. @RestController 和 @Controller 有什么区别？</h2>
<p><code v-pre>@RestController</code> 注解，在 <code v-pre>@Controller</code> 基础上，增加了 <code v-pre>@ResponseBody</code> 注解，更加适合目前前后端分离的架构下，提供 Restful API ，返回例如 JSON 数据格式。当然，返回什么样的数据格式，根据客户端的 <code v-pre>ACCEPT</code> 请求头来决定。</p>
<h2 id="_30-requestmapping-和-getmapping-注解的不同之处在哪里" tabindex="-1"><a class="header-anchor" href="#_30-requestmapping-和-getmapping-注解的不同之处在哪里" aria-hidden="true">#</a> 30. @RequestMapping 和 @GetMapping 注解的不同之处在哪里？</h2>
<ol>
<li><code v-pre>@RequestMapping</code>：可注解在类和方法上；<code v-pre>@GetMapping</code> 仅可注册在方法上</li>
<li><code v-pre>@RequestMapping</code>：可进行 GET、POST、PUT、DELETE 等请求方法；<code v-pre>@GetMapping</code> 是 <code v-pre>@RequestMapping</code> 的 GET 请求方法的特例，目的是为了提高清晰度。</li>
</ol>
<h2 id="_31-requestparam-和-pathvariable-两个注解的区别" tabindex="-1"><a class="header-anchor" href="#_31-requestparam-和-pathvariable-两个注解的区别" aria-hidden="true">#</a> 31. @RequestParam 和 @PathVariable 两个注解的区别</h2>
<p>两个注解都用于方法参数，获取参数值的方式不同，<code v-pre>@RequestParam</code> 注解的参数从请求携带的参数中获取，而 <code v-pre>@PathVariable</code> 注解从请求的 URI 中获取</p>
<h2 id="_32-返回-json-格式使用什么注解" tabindex="-1"><a class="header-anchor" href="#_32-返回-json-格式使用什么注解" aria-hidden="true">#</a> 32. 返回 JSON 格式使用什么注解？</h2>
<p>可以使用 <strong><code v-pre>@ResponseBody</code></strong> 注解，或者使用包含 <code v-pre>@ResponseBody</code> 注解的 <strong><code v-pre>@RestController</code></strong> 注解。</p>
<p>当然，还是需要配合相应的支持 JSON 格式化的 HttpMessageConverter 实现类。例如，Spring MVC 默认使用 MappingJackson2HttpMessageConverter。</p>
<h2 id="_33-什么是springmvc拦截器以及如何使用它" tabindex="-1"><a class="header-anchor" href="#_33-什么是springmvc拦截器以及如何使用它" aria-hidden="true">#</a> 33. 什么是springmvc拦截器以及如何使用它？</h2>
<p>Spring的处理程序映射机制包括处理程序拦截器，当你希望将特定功能应用于某些请求时，例如，检查用户主题时，这些拦截器非常有用。拦截器必须实现org.springframework.web.servlet包的HandlerInterceptor。此接口定义了三种方法：</p>
<ul>
<li>preHandle：在执行实际处理程序之前调用。</li>
<li>postHandle：在执行完实际程序之后调用。</li>
<li>afterCompletion：在完成请求后调用。</li>
</ul>
<h2 id="_34-spring-mvc-和-struts2-的异同" tabindex="-1"><a class="header-anchor" href="#_34-spring-mvc-和-struts2-的异同" aria-hidden="true">#</a> 34. Spring MVC 和 Struts2 的异同？</h2>
<p><strong>入口</strong>不同</p>
<ul>
<li>Spring MVC 的入门是一个 Servlet <strong>控制器</strong>。</li>
<li>Struts2 入门是一个 Filter <strong>过滤器</strong>。</li>
</ul>
<p><strong>配置映射</strong>不同，</p>
<ul>
<li>Spring MVC 是基于<strong>方法</strong>开发，传递参数是通过<strong>方法形参</strong>，一般设置为<strong>单例</strong>。</li>
<li>Struts2 是基于<strong>类</strong>开发，传递参数是通过<strong>类的属性</strong>，只能设计为<strong>多例</strong>。</li>
</ul>
<p><strong>视图</strong>不同</p>
<ul>
<li>Spring MVC 通过参数解析器是将 Request 对象内容进行解析成方法形参，将响应数据和页面封装成 <strong>ModelAndView</strong> 对象，最后又将模型数据通过 <strong>Request</strong> 对象传输到页面。其中，如果视图使用 JSP 时，默认使用 <strong>JSTL</strong> 。</li>
<li>Struts2 采用<strong>值栈</strong>存储请求和响应的数据，通过 <strong>OGNL</strong> 存取数据。</li>
</ul>
<h2 id="_35-rest-代表着什么" tabindex="-1"><a class="header-anchor" href="#_35-rest-代表着什么" aria-hidden="true">#</a> 35. REST 代表着什么?</h2>
<p>REST 代表着抽象状态转移，它是根据 HTTP 协议从客户端发送数据到服务端，例如：服务端的一本书可以以 XML 或 JSON 格式传递到客户端</p>
<p>可以看看 <a href="http://bit.ly/2zIGzWK" target="_blank" rel="noopener noreferrer">REST API design and development</a> ，知乎上的 <a href="https://www.zhihu.com/question/28557115" target="_blank" rel="noopener noreferrer">《怎样用通俗的语言解释 REST，以及 RESTful？》</a>了解。</p>
<h2 id="_36-什么是安全的-rest-操作" tabindex="-1"><a class="header-anchor" href="#_36-什么是安全的-rest-操作" aria-hidden="true">#</a> 36. 什么是安全的 REST 操作?</h2>
<p>REST 接口是通过 HTTP 方法完成操作</p>
<ul>
<li>一些 HTTP 操作是安全的，如 GET 和 HEAD ，它不能在服务端修改资源</li>
<li>换句话说，PUT、POST 和 DELETE 是不安全的，因为他们能修改服务端的资源</li>
</ul>
<p>所以，是否安全的界限，在于<strong>是否修改</strong>服务端的资源</p>
<h2 id="_37-rest-api-是无状态的吗" tabindex="-1"><a class="header-anchor" href="#_37-rest-api-是无状态的吗" aria-hidden="true">#</a> 37. REST API 是无状态的吗?</h2>
<p><strong>是的</strong>，REST API 应该是无状态的，因为它是基于 HTTP 的，它也是无状态的</p>
<p>REST API 中的请求应该包含处理它所需的所有细节。它<strong>不应该</strong>依赖于以前或下一个请求或服务器端维护的一些数据，例如会话</p>
<p><strong>REST 规范为使其无状态设置了一个约束，在设计 REST API 时，你应该记住这一点</strong></p>
<h2 id="_38-rest安全吗-你能做什么来保护它" tabindex="-1"><a class="header-anchor" href="#_38-rest安全吗-你能做什么来保护它" aria-hidden="true">#</a> 38. REST安全吗? 你能做什么来保护它?</h2>
<p>安全是一个宽泛的术语。它可能意味着消息的安全性，这是通过认证和授权提供的加密或访问限制提供的</p>
<p>REST 通常不是安全的，需要开发人员自己实现安全机制</p>
<h2 id="_39-为什么要用springboot" tabindex="-1"><a class="header-anchor" href="#_39-为什么要用springboot" aria-hidden="true">#</a> 39. 为什么要用SpringBoot?</h2>
<p>在使用Spring框架进行开发的过程中，需要配置很多Spring框架包的依赖，如spring-core、spring-bean、spring-context等，而这些配置通常都是重复添加的，而且需要做很多框架使用及环境参数的重复配置，如开启注解、配置日志等。Spring Boot致力于弱化这些不必要的操作，提供默认配置，当然这些默认配置是可以按需修改的，快速搭建、开发和运行Spring应用。</p>
<p>以下是使用SpringBoot的一些好处：</p>
<ul>
<li>自动配置，使用基于类路径和应用程序上下文的智能默认值，当然也可以根据需要重写它们以满足开发人员的需求。</li>
<li>创建Spring Boot Starter 项目时，可以选择选择需要的功能，Spring Boot将为你管理依赖关系。</li>
<li>SpringBoot项目可以打包成jar文件。可以使用Java-jar命令从命令行将应用程序作为独立的Java应用程序运行。</li>
<li>在开发web应用程序时，springboot会配置一个嵌入式Tomcat服务器，以便它可以作为独立的应用程序运行。（Tomcat是默认的，当然你也可以配置Jetty或Undertow）</li>
<li>SpringBoot包括许多有用的非功能特性（例如安全和健康检查）。</li>
</ul>
<h2 id="_40-spring-boot中如何实现对不同环境的属性配置文件的支持" tabindex="-1"><a class="header-anchor" href="#_40-spring-boot中如何实现对不同环境的属性配置文件的支持" aria-hidden="true">#</a> 40. Spring Boot中如何实现对不同环境的属性配置文件的支持？</h2>
<p>Spring Boot支持不同环境的属性配置文件切换，通过创建application-{profile}.properties文件，其中{profile}是具体的环境标识名称，例如：application-dev.properties用于开发环境，application-test.properties用于测试环境，application-uat.properties用于uat环境。如果要想使用application-dev.properties文件，则在application.properties文件中添加spring.profiles.active=dev。</p>
<p>如果要想使用application-test.properties文件，则在application.properties文件中添加spring.profiles.active=test。</p>
<h2 id="_41-spring-boot-的核心注解是哪个-它主要由哪几个注解组成的" tabindex="-1"><a class="header-anchor" href="#_41-spring-boot-的核心注解是哪个-它主要由哪几个注解组成的" aria-hidden="true">#</a> 41. Spring Boot 的核心注解是哪个？它主要由哪几个注解组成的？</h2>
<p>启动类上面的注解是@SpringBootApplication，它也是 Spring Boot 的核心注解，主要组合包含了以下 3 个注解：</p>
<p>@SpringBootConfiguration：组合了 @Configuration 注解，实现配置文件的功能。</p>
<p>@EnableAutoConfiguration：打开自动配置的功能，也可以关闭某个自动配置的选项，如关闭数据源自动配置功能： @SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })。</p>
<p>@ComponentScan：Spring组件扫描。</p>
<h2 id="_42-你如何理解-spring-boot-中的-starters" tabindex="-1"><a class="header-anchor" href="#_42-你如何理解-spring-boot-中的-starters" aria-hidden="true">#</a> 42. 你如何理解 Spring Boot 中的 Starters？</h2>
<p>Starters可以理解为启动器，它包含了一系列可以集成到应用里面的依赖包，你可以一站式集成 Spring 及其	他技术，而不需要到处找示例代码和依赖包。如你想使用 Spring JPA 访问数据库，只要加入 spring-boot-starter-data-jpa 启动器依赖就能使用了。</p>
<p>Starters包含了许多项目中需要用到的依赖，它们能快速持续的运行，都是一系列得到支持的管理传递性依赖。</p>
<h2 id="_43-spring-boot-starter-的工作原理是什么" tabindex="-1"><a class="header-anchor" href="#_43-spring-boot-starter-的工作原理是什么" aria-hidden="true">#</a> 43. Spring Boot Starter 的工作原理是什么？</h2>
<p>Spring Boot 在启动的时候会干这几件事情：</p>
<ul>
<li>Spring Boot 在启动时会去依赖的 Starter 包中寻找 resources/META-INF/spring.factories 文件，然后根据文件中配置的 Jar 包去扫描项目所依赖的 Jar 包。</li>
<li>根据 spring.factories 配置加载 AutoConfigure 类</li>
<li>根据 @Conditional 注解的条件，进行自动配置并将 Bean 注入 Spring Context</li>
</ul>
<p>总结一下，其实就是 Spring Boot 在启动的时候，按照约定去读取 Spring Boot Starter 的配置信息，再根据配置信息对资源进行初始化，并注入到 Spring 容器中。这样 Spring Boot 启动完毕后，就已经准备好了一切资源，使用过程中直接注入对应 Bean 资源即可</p>
<h2 id="_44-保护-spring-boot-应用有哪些方法" tabindex="-1"><a class="header-anchor" href="#_44-保护-spring-boot-应用有哪些方法" aria-hidden="true">#</a> 44. 保护 Spring Boot 应用有哪些方法？</h2>
<ul>
<li>在生产中使用HTTPS</li>
<li>使用Snyk检查你的依赖关系</li>
<li>升级到最新版本</li>
<li>启用CSRF保护</li>
<li>使用内容安全策略防止XSS攻击</li>
</ul>
<h2 id="_45-spring-、spring-boot-和-spring-cloud-的关系" tabindex="-1"><a class="header-anchor" href="#_45-spring-、spring-boot-和-spring-cloud-的关系" aria-hidden="true">#</a> 45. Spring 、Spring Boot 和 Spring Cloud 的关系?</h2>
<p>Spring 最初最核心的两大核心功能 Spring Ioc 和 Spring Aop 成就了 Spring，Spring 在这两大核心的功能上不断的发展，才有了 Spring 事务、Spring Mvc 等一系列伟大的产品，最终成就了 Spring 帝国，到了后期 Spring 几乎可以解决企业开发中的所有问题。</p>
<p>Spring Boot 是在强大的 Spring 帝国生态基础上面发展而来，发明 Spring Boot 不是为了取代 Spring ,是为了让人们更容易的使用 Spring 。</p>
<p>Spring Cloud 是一系列框架的有序集合。它利用 Spring Boot 的开发便利性巧妙地简化了分布式系统基础设施的开发，如服务发现注册、配置中心、消息总线、负载均衡、断路器、数据监控等，都可以用 Spring Boot 的开发风格做到一键启动和部署。</p>
<p>Spring Cloud 是为了解决微服务架构中服务治理而提供的一系列功能的开发框架，并且 Spring Cloud 是完全基于 Spring Boot 而开发，Spring Cloud 利用 Spring Boot 特性整合了开源行业中优秀的组件，整体对外提供了一套在微服务架构中服务治理的解决方案。</p>
<p>用一组不太合理的包含关系来表达它们之间的关系。</p>
<p>Spring ioc/aop &gt; Spring &gt; Spring Boot &gt; Spring Cloud</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<p>https://juejin.cn/post/6844903860658503693</p>
<p>https://www.cnblogs.com/jingmoxukong/p/9408037.html</p>
<p>http://www.ityouknow.com/springboot/2019/07/24/springboot-interview.html</p>
</div></template>


