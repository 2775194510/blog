<template><div><h2 id="_1-url参数" tabindex="-1"><a class="header-anchor" href="#_1-url参数" aria-hidden="true">#</a> 1：url参数</h2>
<h3 id="_1-1-如何从url取出参数" tabindex="-1"><a class="header-anchor" href="#_1-1-如何从url取出参数" aria-hidden="true">#</a> 1-1 如何从url取出参数</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>const searchParams = new URLSearchParams(window.location.search); 
const sourceId = searchParams.get('source_id'); 
console.log(sourceId);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-如何向url中追加、更新、删除参数" tabindex="-1"><a class="header-anchor" href="#_1-2-如何向url中追加、更新、删除参数" aria-hidden="true">#</a> 1-2 如何向url中追加、更新、删除参数</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>// 获取当前页面URL
const url = new URL(window.location.href);

// 向URL中添加新的查询参数
url.searchParams.append('new_param', 'new_value');

// 更新现有查询参数的值
url.searchParams.set('source_id', 'new_source_id');

// 删除名为source_id的查询参数
url.searchParams.delete('source_id');

// 打印更新后的URL
console.log(url.href);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::warning  问题1：new URLSearchParams  和new URL().searchParams有什么区别吗?
<code v-pre>new URLSearchParams()</code>和<code v-pre>new URL().searchParams</code>都是用于解析和操作URL查询参数的方法，它们的区别在于使用的方式不同。</p>
<p><code v-pre>new URLSearchParams()</code>是一个构造函数，它接受一个字符串或一个对象作为参数，并返回一个<code v-pre>URLSearchParams</code>对象。您可以使用这个对象来解析和操作URL查询参数。</p>
<p><strong>请注意</strong>，<code v-pre>new URL().searchParams</code>只适用于当前页面URL，而<code v-pre>new URLSearchParams()</code>可以用于任何URL字符串。
:::</p>
</div></template>


