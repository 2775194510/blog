<template><div><h2 id="_1-filter的使用" tabindex="-1"><a class="header-anchor" href="#_1-filter的使用" aria-hidden="true">#</a> 1：filter的使用</h2>
<h3 id="_1-1-语法" tabindex="-1"><a class="header-anchor" href="#_1-1-语法" aria-hidden="true">#</a> 1-1 语法</h3>
<p><a href="https://v2.cn.vuejs.org/v2/guide/filters.html" target="_blank" rel="noopener noreferrer">学习链接</a><br>
Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：<em><strong>双花括号插值</strong></em>和 <em><strong>v-bind 表达式</strong></em> (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>&lt;!-- 在双花括号中 --&gt;
{{ message | capitalize }}

&lt;!-- 在 `v-bind` 中 --&gt;
&lt;div v-bind:id=&quot;rawId | formatId&quot;&gt;&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以在一个组件的选项中定义本地的过滤器：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者在创建 Vue 实例之前全局定义过滤器：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>当全局过滤器和局部过滤器重名时，会采用局部过滤器。</strong></p>
</blockquote>
<p>过滤器函数总接收表达式的值 (之前的操作链的结果) 作为 <strong>第一个参数</strong> 。在上述例子中，<code v-pre>capitalize</code> 过滤器函数将会收到 <code v-pre>message</code> 的值作为第一个参数。</p>
<p>过滤器可以串联：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>{{ message | filterA | filterB }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个例子中，<code v-pre>filterA</code> 被定义为接收单个参数的过滤器函数，表达式 <code v-pre>message</code> 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 <code v-pre>filterB</code>，将 <code v-pre>filterA</code> 的结果传递到 <code v-pre>filterB</code> 中。</p>
<p>过滤器是 JavaScript 函数，因此可以接收参数：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>{{ message | filterA('arg1', arg2) }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里，<code v-pre>filterA</code> 被定义为接收三个参数的过滤器函数。其中 <code v-pre>message</code> 的值作为第一个参数，普通字符串 <code v-pre>'arg1'</code> 作为第二个参数，表达式 <code v-pre>arg2</code> 的值作为第三个参数。</p>
<h3 id="_1-2-用法" tabindex="-1"><a class="header-anchor" href="#_1-2-用法" aria-hidden="true">#</a> 1-2 用法</h3>
<p>::: warning 问题1：如何使用filter来过滤到集合中不需要的元素？
:::</p>
<ul>
<li>① 使用 <strong>计算属性（Computed Properties）</strong> 来实现。</li>
</ul>
<blockquote>
<p>计算属性（Computed Properties）：您可以在组件中定义计算属性，该属性根据集合和过滤条件动态计算出一个新的数组。计算属性会根据依赖的数据自动更新。</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>export default {
  data() {
    return {
      collection: [/* Your collection data */],
      filterCriteria: 'some value' // Filter criteria
    }
  },
  computed: {
    filteredCollection() {
      return this.collection.filter(item =&gt; item.property === this.filterCriteria)
    }
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们定义了一个 <strong>计算属性 filteredCollection</strong> ，它返回一个根据过滤条件   <strong>filterCriteria</strong> 过滤后的新数组。</p>
<ul>
<li>② <strong>过滤器（Filters）</strong>：您也可以使用过滤器对集合进行过滤，它可以在模板中直接使用。</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>export default {
  data() {
    return {
      collection: [/* Your collection data */],
      filterCriteria: 'some value' // Filter criteria
    }
  },
  filters: {
    filterByCriteria(items) {
      return items.filter(item =&gt; item.property === this.filterCriteria)
    }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们定义了一个名为 <strong>filterByCriteria</strong> 的过滤器，它接收集合作为输入，并返回一个根据过滤条件过滤后的新数组。</p>
</div></template>


