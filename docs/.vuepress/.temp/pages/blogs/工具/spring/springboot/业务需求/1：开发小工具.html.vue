<template><div><h2 id="_1-获取对象集合中的-的某一个字段-然后将其转成字符串-并用-隔开" tabindex="-1"><a class="header-anchor" href="#_1-获取对象集合中的-的某一个字段-然后将其转成字符串-并用-隔开" aria-hidden="true">#</a> 1：获取<code v-pre>对象集合</code>中的 的某一个字段，然后将其转成字符串，并用，隔开</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>List&lt;YourObject&gt; objects = ...; // 获取到对象集合
String result = objects.stream()
                       .map(YourObject::getField) // 抽取字段
                       .map(Object::toString) // 转成字符串
                       .collect(Collectors.joining(&quot;, &quot;)); // 拼接字符串

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-获取带-的字符串-将其转成list集合" tabindex="-1"><a class="header-anchor" href="#_2-获取带-的字符串-将其转成list集合" aria-hidden="true">#</a> 2：获取带，的字符串，将其转成List集合</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>List&lt;String&gt; acctNoList = Arrays.asList(acctNo.split(&quot;,&quot;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


