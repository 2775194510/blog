<template><div><h2 id="_1-布局" tabindex="-1"><a class="header-anchor" href="#_1-布局" aria-hidden="true">#</a> 1：布局</h2>
<h3 id="_1-1-div固定在底部并且居中" tabindex="-1"><a class="header-anchor" href="#_1-1-div固定在底部并且居中" aria-hidden="true">#</a> 1-1 div固定在底部并且居中</h3>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code>  position: absolute;
  bottom: 50px;
  left: 50%;
  -webkit-transform: translatex(-50%);transform:translatex(-50%);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-div水平垂直居中" tabindex="-1"><a class="header-anchor" href="#_1-2-div水平垂直居中" aria-hidden="true">#</a> 1-2 div水平垂直居中</h3>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code>display: flex;
justify-content: center;
align-items: center;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-图片" tabindex="-1"><a class="header-anchor" href="#_2-图片" aria-hidden="true">#</a> 2：图片</h2>
<h3 id="_2-1-照片铺满div" tabindex="-1"><a class="header-anchor" href="#_2-1-照片铺满div" aria-hidden="true">#</a> 2-1 照片铺满div</h3>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code>  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url(./../assets/jiawu.png);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-颜色" tabindex="-1"><a class="header-anchor" href="#_3-颜色" aria-hidden="true">#</a> 3：颜色</h2>
<h3 id="_3-1-p标签设置渐变色字体" tabindex="-1"><a class="header-anchor" href="#_3-1-p标签设置渐变色字体" aria-hidden="true">#</a> 3-1 p标签设置渐变色字体</h3>
<p><code v-pre> &lt;p data-text=&quot;主要业务&quot;&gt;主要业务&lt;/p&gt;</code></p>
<div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code>  .wangzhan{
  position: relative;
  margin: auto;
  margin-top: 20px;
  font-size: 3rem;
  word-spacing: 0.2em;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  color: transparent;
  background-color: #b20724;
  background-clip: text;
}
.wangzhan::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-image: linear-gradient(120deg, transparent 0%, transparent 6rem, white 11rem, transparent 11.15rem, transparent 15rem, rgba(255, 255, 255, 0.3) 20rem, transparent 25rem, transparent 27rem, rgba(255, 255, 255, 0.6) 32rem, white 33rem, rgba(255, 255, 255, 0.3) 33.15rem, transparent 38rem, transparent 40rem, rgba(255, 255, 255, 0.3) 45rem, transparent 50rem, transparent 100%);
  background-clip: text;
  background-size: 150% 100%;
  background-repeat: no-repeat;
  animation: shine 5s infinite linear;
}

@keyframes shine {
  0% {
    background-position: 50% 0;
  }
  100% {
    background-position: -190% 0;
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


