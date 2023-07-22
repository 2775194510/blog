<template><div><p>::: tip 学习背景
<strong>话说为什么要学习jQuery，这种老的技术在当时真的很好用，但是在当今前后端分离得情况下，使用它的人群也越来越少，但是小泽还是得学习它，如果不是为了工作需要，小泽大概不会在这个上面浪费时间~~~</strong>
:::</p>
<p>::: warning 学习方法
在这里主要学习主要是通过 <em><strong><a href="https://www.runoob.com/jquery/jquery-tutorial.html" target="_blank" rel="noopener noreferrer">菜鸟教程</a></strong></em> 来学习，学习时间大概是两个小时左右，就差不多了，这个技术真的不难，就是不常用会忘记，哎，真的让人头大。
:::</p>
<h1 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> 基本语法：</h1>
<p>在这里安装什么的就不用说了，直接就开始上重要知识。</p>
<h2 id="_1-jquery教程" tabindex="-1"><a class="header-anchor" href="#_1-jquery教程" aria-hidden="true">#</a> 1：jQuery教程</h2>
<h3 id="_1-1-jquery语法" tabindex="-1"><a class="header-anchor" href="#_1-1-jquery语法" aria-hidden="true">#</a> 1-1 jQuery语法</h3>
<div class="language-javascrpt line-numbers-mode" data-ext="javascrpt"><pre v-pre class="language-javascrpt"><code>&lt;!-- jQuery 入口函数: --&gt;
$(document).ready(function(){
    // 执行代码
});
或者
$(function(){
    // 执行代码
});	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>::: warning 为什么代码都需要放在jQuery的入口函数中执行？
实例中的所有 jQuery 函数位于一个 document ready 函数中,这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码，即在 DOM 加载完成后才可以对 DOM 进行操作。
:::</p>
<h3 id="_1-2-jquery选择器" tabindex="-1"><a class="header-anchor" href="#_1-2-jquery选择器" aria-hidden="true">#</a> 1-2 jQuery选择器</h3>
<ul>
<li>jQuery 选择器允许您对 HTML 元素组或单个元素进行操作。</li>
<li>jQuery 选择器基于元素的 id、类、类型、属性、属性值等&quot;查找&quot;（或选择）HTML 元素。 它基于已经存在的 CSS 选择器，除此之外，它还有一些自定义的选择器。</li>
<li>jQuery 中所有选择器都以美元符号开头：$()。</li>
</ul>
<h4 id="_1-2-1-元素选择器" tabindex="-1"><a class="header-anchor" href="#_1-2-1-元素选择器" aria-hidden="true">#</a> 1-2-1 元素选择器</h4>
<p>jQuery 元素选择器基于元素名选取元素。</p>
<blockquote>
<p>在页面中选取所有 <em><strong>p</strong></em> 标签元素:</p>
</blockquote>
<div class="language-javascrpt line-numbers-mode" data-ext="javascrpt"><pre v-pre class="language-javascrpt"><code>$(&quot;p&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>实例 用户点击按钮后，所有 <em><strong>p</strong></em> 元素都隐藏：</p>
</blockquote>
<div class="language-javascrpt line-numbers-mode" data-ext="javascrpt"><pre v-pre class="language-javascrpt"><code>$(document).ready(function(){
  $(&quot;button&quot;).click(function(){
    $(&quot;p&quot;).hide();
  });
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-2-id-选择器" tabindex="-1"><a class="header-anchor" href="#_1-2-2-id-选择器" aria-hidden="true">#</a> 1-2-2 id 选择器</h4>
<ul>
<li>jQuery #id 选择器通过 HTML 元素的 id 属性选取指定的元素。</li>
<li>页面中元素的 id 应该是唯一的，所以您要在页面中选取唯一的元素需要通过 #id 选择器。</li>
</ul>
<blockquote>
<p>通过 id 选取元素语法如下</p>
</blockquote>
<div class="language-javascrpt line-numbers-mode" data-ext="javascrpt"><pre v-pre class="language-javascrpt"><code>$(&quot;#test&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>实例 当用户点击按钮后，有 id=&quot;test&quot; 属性的元素将被隐藏：</p>
</blockquote>
<div class="language-javascrpt line-numbers-mode" data-ext="javascrpt"><pre v-pre class="language-javascrpt"><code>$(document).ready(function(){
  $(&quot;button&quot;).click(function(){
    $(&quot;#test&quot;).hide();
  });
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-2-3-class-选择器" tabindex="-1"><a class="header-anchor" href="#_1-2-3-class-选择器" aria-hidden="true">#</a> 1-2-3 .class 选择器</h4>
<ul>
<li>jQuery 类选择器可以通过指定的 class 查找元素。</li>
</ul>
<blockquote>
<p>语法如下：</p>
</blockquote>
<div class="language-javascrpt line-numbers-mode" data-ext="javascrpt"><pre v-pre class="language-javascrpt"><code>$(&quot;.test&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>实例 用户点击按钮后所有带有 class=&quot;test&quot; 属性的元素都隐藏：</p>
</blockquote>
<div class="language-javascrpt line-numbers-mode" data-ext="javascrpt"><pre v-pre class="language-javascrpt"><code>$(document).ready(function(){
  $(&quot;button&quot;).click(function(){
    $(&quot;.test&quot;).hide();
  });
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>更多实例</p>
</blockquote>
<table>
<thead>
<tr>
<th>语法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>$(&quot;*&quot;)</td>
<td>选取所有元素</td>
</tr>
<tr>
<td>$(this)</td>
<td>选取当前 HTML 元素</td>
</tr>
<tr>
<td>$(&quot;p.intro&quot;)</td>
<td>选取 class 为 intro 的  &lt;p&gt;  元素</td>
</tr>
<tr>
<td>$(&quot;p:first&quot;)</td>
<td>选取第一个 &lt;p&gt; 元素</td>
</tr>
<tr>
<td>$(&quot;ul li:first&quot;)</td>
<td>选取每个 &lt;ul&gt; 元素的第一个 &lt;li&gt; 元素</td>
</tr>
<tr>
<td>$(&quot;ul li:first-child&quot;)</td>
<td>选取每个 &lt;ul&gt; 元素的第一个 &lt;li&gt; 元素</td>
</tr>
<tr>
<td>$(&quot;[\href]&quot;)</td>
<td>选取带有 href 属性的元素</td>
</tr>
<tr>
<td>$(&quot;a[target='_blank']&quot;)</td>
<td>选取所有 target 属性值等于 &quot;_blank&quot; 的 &lt;a&gt; 元素</td>
</tr>
<tr>
<td>$(&quot;a[target!='_blank']&quot;)</td>
<td>选取所有 target 属性值不等于 &quot;_blank&quot; 的 &lt;a&gt; 元素</td>
</tr>
<tr>
<td>$(&quot;:button&quot;)</td>
<td>选取所有 type=&quot;button&quot; 的 &lt;input&gt; 元素 和 &lt;button&gt; 元素</td>
</tr>
<tr>
<td>$(&quot;tr:even&quot;)</td>
<td>选取偶数位置的 &lt;tr&gt; 元素</td>
</tr>
<tr>
<td>$(&quot;tr:odd&quot;)</td>
<td>选取奇数位置的 &lt;tr&gt; 元素</td>
</tr>
</tbody>
</table>
<h2 id="_2-jquery效果" tabindex="-1"><a class="header-anchor" href="#_2-jquery效果" aria-hidden="true">#</a> 2：jQuery效果</h2>
<h3 id="_2-1-显示和隐藏" tabindex="-1"><a class="header-anchor" href="#_2-1-显示和隐藏" aria-hidden="true">#</a> 2-1 显示和隐藏</h3>
<blockquote>
<p>通过 jQuery，您可以使用 <code v-pre>show()</code> 和 <code v-pre>hide()</code> 方法来隐藏和显示 HTML 元素.</p>
</blockquote>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
     &lt;meta charset=&quot;utf-8&quot;&gt;
     &lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;&lt;/script&gt;
     &lt;script&gt;
        $(document).ready(function(){
           $(&quot;#hide&quot;).click(function(){
           $(&quot;p&quot;).hide();
        });
        $(&quot;#show&quot;).click(function(){
           $(&quot;p&quot;).show();
        });
        });
     &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
      &lt;p&gt;如果你点击“隐藏” 按钮，我将会消失。&lt;/p&gt;
      &lt;button id=&quot;hide&quot;&gt;隐藏&lt;/button&gt;
      &lt;button id=&quot;show&quot;&gt;显示&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><em><strong>语法：</strong></em><br>
<code v-pre>$(selector).hide(speed,callback);</code><br>
<code v-pre>$(selector).show(speed,callback);</code></p>
</blockquote>
<blockquote>
<p>回调函数 中间只可以有 <code v-pre>&quot;linear&quot;</code> 和 <code v-pre>&quot;swing&quot;</code></p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;.hidebtn&quot;).click(function(){
    $(&quot;div&quot;).hide(1000,&quot;linear&quot;,function(){
      alert(&quot;Hide() 方法已完成!&quot;);
    });
  });
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>::: tip
<em><strong>jQuery toggle()</strong></em>
通过 jQuery，您可以使用 <code v-pre>toggle()</code> 方法来切换 <code v-pre>hide()</code> 和 <code v-pre>show()</code> 方法。
显示被隐藏的元素，并隐藏已显示的元素：
:::</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;button&quot;).click(function(){
  $(&quot;p&quot;).toggle();
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-淡入淡出" tabindex="-1"><a class="header-anchor" href="#_2-2-淡入淡出" aria-hidden="true">#</a> 2-2 淡入淡出</h3>
<ul>
<li><code v-pre>fadeIn()</code>     用于淡入已隐藏的元素。</li>
<li><code v-pre>fadeOut()</code>    用于淡出可见元素。</li>
<li><code v-pre>fadeToggle()</code>  可以在 fadeIn() 与 fadeOut() 方法之间进行切换。</li>
<li><code v-pre>fadeTo()</code>  允许渐变为给定的不透明度（值介于 0 与 1 之间）</li>
</ul>
<blockquote>
<p>实例</p>
</blockquote>
<p><code v-pre>fadeIn()</code>  取以下值：&quot;slow&quot;、&quot;fast&quot; 或毫秒</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> $(&quot;button&quot;).click(function(){
    $(&quot;#div1&quot;).fadeIn();
    $(&quot;#div2&quot;).fadeIn(&quot;slow&quot;);
    $(&quot;#div3&quot;).fadeIn(3000);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>fadeOut()</code>  取以下值：&quot;slow&quot;、&quot;fast&quot; 或毫秒</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> $(&quot;button&quot;).click(function(){
    $(&quot;#div1&quot;).fadeOut();
    $(&quot;#div2&quot;).fadeOut(&quot;slow&quot;);
    $(&quot;#div3&quot;).fadeOut(3000);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>fadeToggle()</code>  取以下值：&quot;slow&quot;、&quot;fast&quot; 或毫秒</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> $(&quot;button&quot;).click(function(){
    $(&quot;#div1&quot;).fadeToggle();
    $(&quot;#div2&quot;).fadeToggle(&quot;slow&quot;);
    $(&quot;#div3&quot;).fadeToggle(3000);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-滑动" tabindex="-1"><a class="header-anchor" href="#_2-3-滑动" aria-hidden="true">#</a> 2-3 滑动</h3>
<ul>
<li><code v-pre>slideDown()</code>  用于向下滑动元素。</li>
<li><code v-pre>slideUp()</code>  用于向上滑动元素。</li>
<li><code v-pre>slideToggle()</code> 在 slideDown() 与 slideUp() 方法之间进行切换。</li>
</ul>
<blockquote>
<p>实例</p>
</blockquote>
<p><code v-pre>slideDown()</code>  取以下值：&quot;slow&quot;、&quot;fast&quot; 或毫秒</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> $(&quot;#flip&quot;).click(function(){
    $(&quot;#panel&quot;).slideDown();
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>slideUp()</code>  取以下值：&quot;slow&quot;、&quot;fast&quot; 或毫秒</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> $(&quot;#flip&quot;).click(function(){
    $(&quot;#panel&quot;).slideUp();
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>slideToggle()</code>  取以下值：&quot;slow&quot;、&quot;fast&quot; 或毫秒</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;#flip&quot;).click(function(){
   $(&quot;#panel&quot;).slideToggle();
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-动画" tabindex="-1"><a class="header-anchor" href="#_2-4-动画" aria-hidden="true">#</a> 2-4 动画</h3>
<blockquote>
<p><code v-pre>animate() 方法</code> 用于创建自定义动画</p>
</blockquote>
<blockquote>
<p>语法 <code v-pre>$(selector).animate({params},speed,callback);</code></p>
</blockquote>
<ul>
<li>必需的 params 参数定义形成动画的 CSS 属性。</li>
<li>可选的 speed 参数规定效果的时长。它可以取以下值：&quot;slow&quot;、&quot;fast&quot; 或毫秒。</li>
<li>可选的 callback 参数是动画完成后所执行的函数名称。</li>
<li>下面的例子演示 animate() 方法的简单应用。它把 &lt;div&gt; 元素往右边移动了 250 像素：</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;button&quot;).click(function(){
    $(&quot;div&quot;).animate({left:'250px'});
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>操作多个属性</strong></em></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;button&quot;).click(function(){
   $(&quot;div&quot;).animate({
       left:'250px',
       opacity:'0.5',
       height:'150px',
       width:'150px'
   });
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>::: warning 警告
可以用 <code v-pre>animate()</code>  方法来操作所有 CSS 属性吗？<br>
是的，几乎可以！不过，需要记住一件重要的事情：当使用 animate() 时，必须使用 Camel 标记法书写所有的属性名，比如，必须使用 paddingLeft 而不是 padding-left，使用 marginRight 而不是 margin-right，等等。
同时，色彩动画并不包含在核心 jQuery 库中。
如果需要生成颜色动画，您需要从 jquery.com 下载 颜色动画 插件。
:::
<em><strong>使用相对值</strong></em></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;button&quot;).click(function(){
  $(&quot;div&quot;).animate({
     left:'250px',
     height:'+=150px',
     width:'+=150px'
  });
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>使用预定义的值</strong></em><br>
您甚至可以把属性的动画值设置为 &quot;show&quot;、&quot;hide&quot; 或 &quot;toggle&quot;：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> $(&quot;button&quot;).click(function(){
   $(&quot;div&quot;).animate({
     height:'toggle'
   });
 });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>使用队列功能</strong></em><br>
这意味着如果您在彼此之后编写多个 <code v-pre>animate()</code> 调用，jQuery 会创建包含这些方法调用的&quot;内部&quot;队列。然后逐一运行这些 animate 调用。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;button&quot;).click(function(){
   var div=$(&quot;div&quot;);
   div.animate({height:'300px',opacity:'0.4'},&quot;slow&quot;);
   div.animate({width:'300px',opacity:'0.8'},&quot;slow&quot;);
   div.animate({height:'100px',opacity:'0.4'},&quot;slow&quot;);
   div.animate({width:'100px',opacity:'0.8'},&quot;slow&quot;);
 });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-html" tabindex="-1"><a class="header-anchor" href="#_3-html" aria-hidden="true">#</a> 3：html</h2>
<h3 id="_3-1-获取内容和属性" tabindex="-1"><a class="header-anchor" href="#_3-1-获取内容和属性" aria-hidden="true">#</a> 3.1 获取内容和属性</h3>
<blockquote>
<p>获得内容 - <code v-pre>text()</code>、<code v-pre>html()</code> 以及 <code v-pre>val()</code></p>
</blockquote>
<ul>
<li>text() - 设置或返回所选元素的文本内容</li>
<li>html() - 设置或返回所选元素的内容（包括 HTML 标签）</li>
<li>val() - 设置或返回表单字段的值<br>
下面的例子演示如何通过 jQuery text() 和 html() 方法来获得内容</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;
&lt;/script&gt;
&lt;script&gt;
    $(document).ready(function(){
       $(&quot;#btn1&quot;).click(function(){
          alert(&quot;Text: &quot; + $(&quot;#test&quot;).text());
        });
       $(&quot;#btn2&quot;).click(function(){
          alert(&quot;HTML: &quot; + $(&quot;#test&quot;).html());
        });
      });
&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;p id=&quot;test&quot;&gt;这是段落中的 &lt;b&gt;粗体&lt;/b&gt; 文本。&lt;/p&gt;
    &lt;button id=&quot;btn1&quot;&gt;显示文本&lt;/button&gt;
    &lt;button id=&quot;btn2&quot;&gt;显示 HTML&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的例子演示如何通过 jQuery val() 方法获得输入字段的值：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;head&gt;
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;
&lt;/script&gt;
&lt;script&gt;
    $(document).ready(function(){
       $(&quot;button&quot;).click(function(){
           alert(&quot;值为: &quot; + $(&quot;#test&quot;).val());
       });
    });
&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;p&gt;名称: &lt;input type=&quot;text&quot; id=&quot;test&quot; value=&quot;小泽学习赏金&quot;&gt;&lt;/p&gt;
    &lt;button&gt;显示值&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>获取属性 - <code v-pre>attr()</code></p>
<p>jQuery <code v-pre>attr()</code> 方法用于获取属性值。</p>
</blockquote>
<p>下面的例子演示如何获得链接中 href 属性的值：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;
&lt;/script&gt;
&lt;script&gt;
    $(document).ready(function(){
        $(&quot;button&quot;).click(function(){
           alert($(&quot;#runoob&quot;).attr(&quot;href&quot;));
        });
      });
&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
      &lt;p&gt;&lt;a href=&quot;http://www.runoob.com&quot; id=&quot;runoob&quot;&gt;点击获取属性值&lt;/a&gt;&lt;/p&gt;
      &lt;button&gt;显示 href 属性的值&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-设置内容和属性" tabindex="-1"><a class="header-anchor" href="#_3-2-设置内容和属性" aria-hidden="true">#</a> 3.2 设置内容和属性</h3>
<p>下面的例子演示如何通过 text()、html() 以及 val() 方法来设置内容：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;
&lt;/script&gt;
&lt;script&gt;
$(document).ready(function(){
  $(&quot;#btn1&quot;).click(function(){
    $(&quot;#test1&quot;).text(&quot;Hello world!&quot;);
  });
  $(&quot;#btn2&quot;).click(function(){
    $(&quot;#test2&quot;).html(&quot;&lt;b&gt;Hello world!&lt;/b&gt;&quot;);
  });
  $(&quot;#btn3&quot;).click(function(){
    $(&quot;#test3&quot;).val(&quot;RUNOOB&quot;);
  });
});
&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;p id=&quot;test1&quot;&gt;这是一个段落。&lt;/p&gt;
    &lt;p id=&quot;test2&quot;&gt;这是另外一个段落。&lt;/p&gt;
    &lt;p&gt;输入框: &lt;input type=&quot;text&quot; id=&quot;test3&quot; value=&quot;小泽认真奋进&quot;&gt;&lt;/p&gt;
    &lt;button id=&quot;btn1&quot;&gt;设置文本&lt;/button&gt;
    &lt;button id=&quot;btn2&quot;&gt;设置 HTML&lt;/button&gt;
    &lt;button id=&quot;btn3&quot;&gt;设置值&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>text()</code>、<code v-pre>html()</code> 以及 <code v-pre>val()</code> 的回调函数</p>
<p>上面的三个 jQuery 方法：text()、html() 以及 val()，同样拥有回调函数。回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。</p>
</blockquote>
<p>下面的例子演示带有回调函数的 text() 和 html()：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;
&lt;/script&gt;
&lt;script&gt;
  $(document).ready(function(){
    $(&quot;#btn1&quot;).click(function(){
       $(&quot;#test1&quot;).text(function(i,origText){
             return &quot;旧文本: &quot; + origText + &quot; 新文本: Hello world! (index: &quot; + i + &quot;)&quot;; 
       });
     });

    $(&quot;#btn2&quot;).click(function(){
       $(&quot;#test2&quot;).html(function(i,origText){
           return &quot;旧 html: &quot; + origText + &quot; 新 html: Hello &lt;b&gt;world!&lt;/b&gt; (index: &quot; + i + &quot;)&quot;; 
       });
    });

  });
&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
      &lt;p id=&quot;test1&quot;&gt;这是一个有 &lt;b&gt;粗体&lt;/b&gt; 字的段落。&lt;/p&gt;
      &lt;p id=&quot;test2&quot;&gt;这是另外一个有 &lt;b&gt;粗体&lt;/b&gt; 字的段落。&lt;/p&gt;
      &lt;button id=&quot;btn1&quot;&gt;显示 新/旧 文本&lt;/button&gt;
      &lt;button id=&quot;btn2&quot;&gt;显示 新/旧 HTML&lt;/button&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>设置属性 - <code v-pre>attr()</code></p>
<p>jQuery attr() 方法也用于设置/改变属性值<br>
下面的例子演示如何改变（设置）链接中 href 属性的值：</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;
&lt;/script&gt;
&lt;script&gt;
    $(document).ready(function(){
        $(&quot;button&quot;).click(function(){
          $(&quot;#runoob&quot;).attr(&quot;href&quot;,&quot;http://www.runoob.com/jquery&quot;);
        });
    });
&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;p&gt;&lt;a href=&quot;http://www.runoob.com&quot; id=&quot;runoob&quot;&gt;菜鸟教程&lt;/a&gt;&lt;/p&gt;
    &lt;button&gt;修改 href 值&lt;/button&gt;
    &lt;p&gt;点击按钮修改后，可以点击链接查看链接地址是否变化。&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>::: tip 提示
<code v-pre>attr()</code> 方法也允许您同时设置多个属性。
:::
下面的例子演示如何同时设置 <code v-pre>href</code> 和 <code v-pre>title</code> 属性：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;
&lt;/script&gt;
&lt;script&gt;
$(document).ready(function(){
  $(&quot;button&quot;).click(function(){
    $(&quot;#runoob&quot;).attr({
      &quot;href&quot; : &quot;http://www.runoob.com/jquery&quot;,
      &quot;title&quot; : &quot;jQuery 教程&quot;
    });
	// 通过修改的 title 值来修改链接名称
	title =  $(&quot;#runoob&quot;).attr('title');
	$(&quot;#runoob&quot;).html(title);
  });
});
&lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;p&gt;&lt;a href=&quot;http://www.runoob.com&quot; id=&quot;runoob&quot;&gt;菜鸟教程&lt;/a&gt;&lt;/p&gt;
    &lt;button&gt;修改 href 和 title&lt;/button&gt;
    &lt;p&gt;点击按钮修改后，可以查看 href 和 title 是否变化。&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>attr()</code> 的回调函数</p>
<p>jQuery 方法 <code v-pre>attr()</code>，也提供回调函数。回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。</p>
</blockquote>
<p>下面的例子演示带有回调函数的 attr() 方法：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt; 
&lt;title&gt;666&lt;/title&gt; 
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
$(document).ready(function(){
    $(&quot;button&quot;).click(function(){
        $(&quot;#runoob&quot;).attr(&quot;href&quot;, function(i, origValue){
            return origValue + &quot;/jquery&quot;;
        });
    });
});
&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;p&gt;&lt;a href=&quot;http://www.runoob.com&quot; id=&quot;runoob&quot;&gt;菜鸟教程&lt;/a&gt;&lt;/p&gt;

    &lt;button&gt;修改 href 值&lt;/button&gt;

    &lt;p&gt;点击按钮修改后，可以点击链接查看 href 属性是否变化。&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-添加元素" tabindex="-1"><a class="header-anchor" href="#_3-3-添加元素" aria-hidden="true">#</a> 3.3 添加元素</h3>
<blockquote>
<p>添加新的HTML内容</p>
</blockquote>
<ul>
<li>append() - 在被选元素的结尾插入内容</li>
<li>prepend() - 在被选元素的开头插入内容</li>
<li>after() - 在被选元素之后插入内容</li>
<li>before() - 在被选元素之前插入内容</li>
</ul>
<blockquote>
<p><code v-pre>append()</code> 方法</p>
</blockquote>
<p>append() 方法在被选元素的结尾插入内容（仍然在该元素的内部）。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>  $(&quot;p&quot;).append(&quot;追加文本&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>prepend()</code> 方法</p>
</blockquote>
<p>prepend() 方法在被选元素的开头插入内容。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>  $(&quot;p&quot;).prepend(&quot;在开头追加文本&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>通过 <code v-pre>append()</code> 和 <code v-pre>prepend()</code> 方法添加若干新元素</p>
</blockquote>
<p>在上面的例子中，我们只在被选元素的开头/结尾插入文本/HTML。</p>
<p>不过，append() 和 prepend() 方法能够通过参数接收无限数量的新元素。可以通过 jQuery 来生成文本/HTML（就像上面的例子那样），或者通过 JavaScript 代码和 DOM 元素。</p>
<p>在下面的例子中，我们创建若干个新元素。这些元素可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建。然后我们通过 append() 方法把这些新元素追加到文本中（对 prepend() 同样有效）：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>  function appendText(){
    var txt1=&quot;&lt;p&gt;文本-1。&lt;/p&gt;&quot;;              // 使用 HTML 标签创建文本
    var txt2=$(&quot;&lt;p&gt;&lt;/p&gt;&quot;).text(&quot;文本-2。&quot;);  // 使用 jQuery 创建文本
    var txt3=document.createElement(&quot;p&quot;);
    txt3.innerHTML=&quot;文本-3。&quot;;               // 使用 DOM 创建文本 text with DOM
    $(&quot;body&quot;).append(txt1,txt2,txt3);        // 追加新元素
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>after()</code> 和 <code v-pre>before()</code> 方法</p>
</blockquote>
<p><code v-pre>after()</code> 方法在被选元素之后插入内容。
<code v-pre>before()</code> 方法在被选元素之前插入内容</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;img&quot;).after(&quot;在后面添加文本&quot;);
$(&quot;img&quot;).before(&quot;在前面添加文本&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>通过<code v-pre>after()</code> 和 <code v-pre>before()</code> 方法添加若干新元素</p>
</blockquote>
<p><code v-pre>after()</code> 和 <code v-pre>before()</code> 方法能够通过参数接收无限数量的新元素。可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建新元素。</p>
<p>在下面的例子中，我们创建若干新元素。这些元素可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建。然后我们通过 <code v-pre>after()</code> 方法把这些新元素插到文本中（对 <code v-pre>before()</code> 同样有效）：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>function afterText()
{
    var txt1=&quot;&lt;b&gt;I &lt;/b&gt;&quot;;                    // 使用 HTML 创建元素
    var txt2=$(&quot;&lt;i&gt;&lt;/i&gt;&quot;).text(&quot;love &quot;);     // 使用 jQuery 创建元素
    var txt3=document.createElement(&quot;big&quot;);  // 使用 DOM 创建元素
    txt3.innerHTML=&quot;jQuery!&quot;;
    $(&quot;img&quot;).after(txt1,txt2,txt3);          // 在图片后添加文本
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-删除元素" tabindex="-1"><a class="header-anchor" href="#_3-4-删除元素" aria-hidden="true">#</a> 3.4 删除元素</h3>
<p>::: warning 删除元素/内容
:::
如需删除元素和内容，一般可使用以下两个 jQuery 方法：</p>
<ul>
<li>remove() - 删除被选元素（及其子元素）</li>
<li>empty() - 从被选元素中删除子元素</li>
</ul>
<blockquote>
<p>jQuery <code v-pre>remove()</code> 方法</p>
</blockquote>
<p>jQuery <code v-pre>remove()</code> 方法删除被选元素及其子元素。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;#div1&quot;).remove();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>jQuery <code v-pre>empty()</code> 方法</p>
</blockquote>
<p>jQuery <code v-pre>empty()</code> 方法删除被选元素的子元素。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;#div1&quot;).empty();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>过滤被删除的元素</p>
</blockquote>
<p>jQuery <code v-pre>remove()</code> 方法也可接受一个参数，允许您对被删元素进行过滤。</p>
<p>该参数可以是任何 jQuery 选择器的语法。</p>
<p>下面的例子删除 class=&quot;italic&quot; 的所有 &lt;p&gt; 元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;p&quot;).remove(&quot;.italic&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-5-获取并设置-css-类" tabindex="-1"><a class="header-anchor" href="#_3-5-获取并设置-css-类" aria-hidden="true">#</a> 3.5 获取并设置 CSS 类</h3>
<ul>
<li>addClass() - 向被选元素添加一个或多个类</li>
<li>removeClass() - 从被选元素删除一个或多个类</li>
<li>toggleClass() - 对被选元素进行添加/删除类的切换操作</li>
<li>css() - 设置或返回样式属性</li>
</ul>
<blockquote>
<p>jQuery <code v-pre>addClass()</code> 方法</p>
</blockquote>
<p>下面的例子展示如何向不同的元素添加 class 属性。当然，在添加类时，您也可以选取多个元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;button&quot;).click(function(){
  $(&quot;h1,h2,p&quot;).addClass(&quot;blue&quot;);
  $(&quot;div&quot;).addClass(&quot;important&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您也可以在 addClass() 方法中规定多个类：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;button&quot;).click(function(){
  $(&quot;body div:first&quot;).addClass(&quot;important blue&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>jQuery <code v-pre>removeClass()</code> 方法</p>
</blockquote>
<p>下面的例子演示如何在不同的元素中删除指定的 class 属性:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;button&quot;).click(function(){
  $(&quot;h1,h2,p&quot;).removeClass(&quot;blue&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>jQuery <code v-pre>toggleClass()</code> 方法</p>
</blockquote>
<p>下面的例子将展示如何使用 jQuery <code v-pre>toggleClass()</code> 方法。该方法对被选元素进行添加/删除类的切换操作：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;button&quot;).click(function(){
  $(&quot;h1,h2,p&quot;).toggleClass(&quot;blue&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-css-方法" tabindex="-1"><a class="header-anchor" href="#_3-6-css-方法" aria-hidden="true">#</a> 3.6 css() 方法</h3>
<blockquote>
<p>返回 CSS 属性</p>
</blockquote>
<p>如需返回指定的 CSS 属性的值，请使用如下语法：</p>
<p><code v-pre>css(&quot;propertyname&quot;);</code></p>
<p>下面的例子将返回首个匹配元素的 background-color 值：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;p&quot;).css(&quot;background-color&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>设置 CSS 属性</p>
</blockquote>
<p>如需设置指定的 CSS 属性，请使用如下语法：</p>
<p><code v-pre>css(&quot;propertyname&quot;,&quot;value&quot;);</code></p>
<p>下面的例子将为所有匹配元素设置 background-color 值：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;p&quot;).css(&quot;background-color&quot;,&quot;yellow&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>设置多个 CSS 属性</p>
</blockquote>
<p>如需设置多个 CSS 属性，请使用如下语法：</p>
<p><code v-pre>css({&quot;propertyname&quot;:&quot;value&quot;,&quot;propertyname&quot;:&quot;value&quot;,...});</code></p>
<p>下面的例子将为所有匹配元素设置 background-color 和 font-size：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(&quot;p&quot;).css({&quot;background-color&quot;:&quot;yellow&quot;,&quot;font-size&quot;:&quot;200%&quot;});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-遍历" tabindex="-1"><a class="header-anchor" href="#_4-遍历" aria-hidden="true">#</a> 4：遍历</h2>
<ul>
<li>parent()</li>
<li>parents()</li>
<li>parentsUntil()</li>
</ul>
<h3 id="_4-1-祖先" tabindex="-1"><a class="header-anchor" href="#_4-1-祖先" aria-hidden="true">#</a> 4.1 祖先</h3>
<blockquote>
<p><code v-pre>parent()</code> 方法</p>
</blockquote>
<p>parent() 方法返回被选元素的直接父元素。</p>
<p>该方法只会向上一级对 DOM 树进行遍历。</p>
<p>下面的例子返回每个 &lt;span&gt; 元素的直接父元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;span&quot;).parent();
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>parents()</code> 方法</p>
</blockquote>
<p>parents() 方法返回被选元素的所有祖先元素，它一路向上直到文档的根元素 (&lt;html&gt;)。</p>
<p>下面的例子返回所有 &lt;span&gt; 元素的所有祖先：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;span&quot;).parents();
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您也可以使用可选参数来过滤对祖先元素的搜索。</p>
<p>下面的例子返回所有 &lt;span&gt; 元素的所有祖先，并且它是 &lt;ul&gt; 元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;span&quot;).parents(&quot;ul&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>parentsUntil()</code> 方法</p>
</blockquote>
<p>parentsUntil() 方法返回介于两个给定元素之间的所有祖先元素。</p>
<p>下面的例子返回介于 &lt;span&gt; 与 &lt;div\ &gt; 元素之间的所有祖先元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;span&quot;).parentsUntil(&quot;div&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2-后代" tabindex="-1"><a class="header-anchor" href="#_4-2-后代" aria-hidden="true">#</a> 4.2 后代</h3>
<blockquote>
<p><code v-pre>children()</code> 方法</p>
</blockquote>
<p><code v-pre>children()</code> 方法返回被选元素的所有直接子元素。</p>
<p>该方法只会向下一级对 DOM 树进行遍历。</p>
<p>下面的例子返回每个 &lt;div&gt; 元素的所有直接子元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;div&quot;).children();
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您也可以使用可选参数来过滤对子元素的搜索。</p>
<p>下面的例子返回类名为 &quot;1&quot; 的所有 &lt;p&gt; 元素，并且它们是 &lt;div&gt; 的直接子元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;div&quot;).children(&quot;p.1&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>find()</code> 方法</p>
</blockquote>
<p><code v-pre>find()</code> 方法返回被选元素的后代元素，一路向下直到最后一个后代。</p>
<p>下面的例子返回属于 &lt;div&gt; 后代的所有 &lt;span&gt; 元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;div&quot;).find(&quot;span&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的例子返回 &lt;div&gt; 的所有后代：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;div&quot;).find(&quot;*&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-同胞" tabindex="-1"><a class="header-anchor" href="#_4-3-同胞" aria-hidden="true">#</a> 4.3 同胞</h3>
<ul>
<li>siblings()</li>
<li>next()</li>
<li>nextAll()</li>
<li>nextUntil()</li>
<li>prev()</li>
<li>prevAll()</li>
<li>prevUntil()</li>
</ul>
<blockquote>
<p><code v-pre>siblings()</code> 方法</p>
</blockquote>
<p><code v-pre>siblings()</code> 方法返回被选元素的所有同胞元素。</p>
<p>下面的例子返回 &lt;h2&gt; 的所有同胞元素</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;style&gt;
.siblings *
{ 
	display: block;
	border: 2px solid lightgrey;
	color: lightgrey;
	padding: 5px;
	margin: 15px;
}
&lt;/style&gt;
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;
&lt;/script&gt;
&lt;script&gt;
   $(document).ready(function(){
	    $(&quot;h2&quot;).siblings().css({&quot;color&quot;:&quot;red&quot;,&quot;border&quot;:&quot;2px solid red&quot;});
    });
&lt;/script&gt;
&lt;/head&gt;
&lt;body class=&quot;siblings&quot;&gt;
    &lt;div&gt;div (父元素)
         &lt;p&gt;p&lt;/p&gt;
         &lt;span&gt;span&lt;/span&gt;
         &lt;h2&gt;h2&lt;/h2&gt;
         &lt;h3&gt;h3&lt;/h3&gt;
         &lt;p&gt;p&lt;/p&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您也可以使用可选参数来过滤对同胞元素的搜索。</p>
<p>下面的例子返回属于 &lt;h2&gt; 的同胞元素的所有 &lt;p&gt; 元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;style&gt;
.siblings *
{ 
	display: block;
	border: 2px solid lightgrey;
	color: lightgrey;
	padding: 5px;
	margin: 15px;
}
&lt;/style&gt;
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;
&lt;/script&gt;
&lt;script&gt;
    $(document).ready(function(){
        $(&quot;h2&quot;).siblings(&quot;p&quot;).css({&quot;color&quot;:&quot;red&quot;,&quot;border&quot;:&quot;2px solid red&quot;});
    });
&lt;/script&gt;
&lt;/head&gt;
&lt;body class=&quot;siblings&quot;&gt;
    &lt;div&gt;div (父元素)
        &lt;p&gt;p&lt;/p&gt;
        &lt;span&gt;span&lt;/span&gt;
        &lt;h2&gt;h2&lt;/h2&gt;
        &lt;h3&gt;h3&lt;/h3&gt;
        &lt;p&gt;p&lt;/p&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>next()</code> 方法</p>
</blockquote>
<p><code v-pre>next()</code> 方法返回被选元素的下一个同胞元素。</p>
<p>该方法只返回一个元素。</p>
<p>下面的例子返回 &lt;h2&gt; 的下一个同胞元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;style&gt;
.siblings *
{ 
	display: block;
	border: 2px solid lightgrey;
	color: lightgrey;
	padding: 5px;
	margin: 15px;
}
&lt;/style&gt;
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;
&lt;/script&gt;
&lt;script&gt;
    $(document).ready(function(){
      	$(&quot;h2&quot;).next().css({&quot;color&quot;:&quot;red&quot;,&quot;border&quot;:&quot;2px solid red&quot;});
    });
&lt;/script&gt;
&lt;/head&gt;
&lt;body class=&quot;siblings&quot;&gt;
    &lt;div&gt;div (父元素)
        &lt;p&gt;p&lt;/p&gt;
        &lt;span&gt;span&lt;/span&gt;
        &lt;h2&gt;h2&lt;/h2&gt;
        &lt;h3&gt;h3&lt;/h3&gt;
        &lt;p&gt;p&lt;/p&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>nextAll()</code> 方法</p>
</blockquote>
<p><code v-pre>nextAll()</code> nextAll() 方法返回被选元素的所有跟随的同胞元素。</p>
<p>下面的例子返回 &lt;h2&gt; 的所有跟随的同胞元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;style&gt;
.siblings *
{ 
	display: block;
	border: 2px solid lightgrey;
	color: lightgrey;
	padding: 5px;
	margin: 15px;
}
&lt;/style&gt;
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;
&lt;/script&gt;
&lt;script&gt;
  $(document).ready(function(){
	  $(&quot;h2&quot;).nextAll().css({&quot;color&quot;:&quot;red&quot;,&quot;border&quot;:&quot;2px solid red&quot;});
  });
&lt;/script&gt;
&lt;/head&gt;
&lt;body class=&quot;siblings&quot;&gt;
    &lt;div&gt;div (父元素)
        &lt;p&gt;p&lt;/p&gt;
        &lt;span&gt;span&lt;/span&gt;
        &lt;h2&gt;h2&lt;/h2&gt;
        &lt;h3&gt;h3&lt;/h3&gt;
        &lt;p&gt;p&lt;/p&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>nextUntil()</code> 方法</p>
</blockquote>
<p><code v-pre>nextUntil()</code> 方法返回介于两个给定参数之间的所有跟随的同胞元素。</p>
<p>下面的例子返回介于 &lt;h2&gt; 与 &lt;h6&gt; 元素之间的所有同胞元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;style&gt;
.siblings *
{ 
	display: block;
	border: 2px solid lightgrey;
	color: lightgrey;
	padding: 5px;
	margin: 15px;
}
&lt;/style&gt;
&lt;script src=&quot;https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js&quot;&gt;
&lt;/script&gt;
&lt;script&gt;
  $(document).ready(function(){
	  $(&quot;h2&quot;).nextUntil(&quot;h6&quot;).css({&quot;color&quot;:&quot;red&quot;,&quot;border&quot;:&quot;2px solid red&quot;});
  });
&lt;/script&gt;
&lt;/head&gt;
&lt;body class=&quot;siblings&quot;&gt;
    &lt;div&gt;div (父元素)
        &lt;p&gt;p&lt;/p&gt;
        &lt;span&gt;span&lt;/span&gt;
        &lt;h2&gt;h2&lt;/h2&gt;
        &lt;h3&gt;h3&lt;/h3&gt;
        &lt;h4&gt;h4&lt;/h4&gt;
        &lt;h5&gt;h5&lt;/h5&gt;
        &lt;h6&gt;h6&lt;/h6&gt;
        &lt;p&gt;p&lt;/p&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4-过滤" tabindex="-1"><a class="header-anchor" href="#_4-4-过滤" aria-hidden="true">#</a> 4.4 过滤</h3>
<p>::: tip 提示
三个最基本的过滤方法是：<code v-pre>first()</code>, <code v-pre>last()</code> 和 <code v-pre>eq()</code>，它们允许您基于其在一组元素中的位置来选择一个特定的元素。</p>
<p>其他过滤方法，比如 <code v-pre>filter()</code> 和 <code v-pre>not()</code> 允许您选取匹配或不匹配某项指定标准的元素。
:::</p>
<blockquote>
<p><code v-pre>first()</code> 方法</p>
</blockquote>
<p><code v-pre>first()</code> 方法返回被选元素的首个元素。</p>
<p>下面的例子选取首个 &lt;div&gt; 元素内部的第一个 &lt;p&gt; 元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;div p&quot;).first();
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>last()</code> 方法</p>
</blockquote>
<p><code v-pre>last()</code>  方法返回被选元素的最后一个元素。</p>
<p>下面的例子选择最后一个 &lt;div&gt; 元素中的最后一个 &lt;p&gt; 元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;div p&quot;).last();
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>eq()</code> 方法</p>
</blockquote>
<p><code v-pre>eq()</code> 方法返回被选元素中带有指定索引号的元素。</p>
<p>索引号从 0 开始，因此首个元素的索引号是 0 而不是 1。下面的例子选取第二个 &lt;p&gt; 元素（索引号 1）</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;p&quot;).eq(1);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>filter()</code> 方法</p>
</blockquote>
<p><code v-pre>filter()</code> 方法允许您规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。</p>
<p>下面的例子返回带有类名 &quot;url&quot; 的所有 &lt;p&gt; 元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;p&quot;).filter(&quot;.url&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>not()</code> 方法</p>
</blockquote>
<p><code v-pre>not()</code> 方法返回不匹配标准的所有元素。</p>
<p>提示：not() 方法与 filter() 相反。</p>
<p>下面的例子返回不带有类名 &quot;url&quot; 的所有 &lt;p&gt; 元素：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>$(document).ready(function(){
  $(&quot;p&quot;).not(&quot;.url&quot;);
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


