<template><div><h2 id="_1-改变el-table表头背景色以及字体居中" tabindex="-1"><a class="header-anchor" href="#_1-改变el-table表头背景色以及字体居中" aria-hidden="true">#</a> 1：改变el-table表头背景色以及字体居中</h2>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code> :header-cell-style=&quot;{background:'#7ba8d7', color:'white', 'line-hight':'50px', 'text-align': 'center'}&quot;
 将数据内容居中
 /deep/ .el-table .cell{
  text-align: center;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-vue设置某一个页面背景色-图" tabindex="-1"><a class="header-anchor" href="#_2-vue设置某一个页面背景色-图" aria-hidden="true">#</a> 2：vue设置某一个页面背景色(图)</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>    mounted() {
        document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    beforeDestroy() {
        document.querySelector('body').removeAttribute('style')
    },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>  mounted() {
    let record = this.$route.query.item;
    this.detailMessage =  JSON.parse(decodeURIComponent(record))
    document.querySelector('body').setAttribute('style', &quot;background-image: url(&quot;+require(&quot;../../assets/back.jpg&quot;)+&quot;);background-size: cover;&quot; +
        &quot;background-repeat: no-repeat&quot;)

  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


