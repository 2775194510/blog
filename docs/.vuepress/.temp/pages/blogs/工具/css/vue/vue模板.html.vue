<template><div><p>:::warning 提示
小泽已经准备好一些vue2的模板，直接用就即可哦！
:::</p>
<h2 id="_1-点击按钮返回顶部-组件" tabindex="-1"><a class="header-anchor" href="#_1-点击按钮返回顶部-组件" aria-hidden="true">#</a> 1：点击按钮返回顶部(组件)</h2>
<h3 id="_1-1-实现思路" tabindex="-1"><a class="header-anchor" href="#_1-1-实现思路" aria-hidden="true">#</a> 1-1 实现思路</h3>
<blockquote>
<p>1：首先定义一个属性来控制该组件的<code v-pre>显示</code>和<code v-pre>隐藏 </code><br>
2：然后在<code v-pre>mounted()</code>方法中监听滚动条滚动实践<br>
3：获取当前滚动条的位置，当<code v-pre>大于</code>某一个值时<code v-pre>显示</code>，<code v-pre>小于</code>某一个值时<code v-pre>隐藏 </code><br>
4：使用的话直接在其他页面<code v-pre>注册</code>,然后直接使用就OK了</p>
</blockquote>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code>&lt;template&gt;
  &lt;div class=&quot;main&quot;&gt;
    &lt;div class=&quot;fixed-div animate__animated animate__bounceIn&quot; v-show=&quot;fixedDiv&quot; @click=&quot;fixedUp()&quot;&gt;
      &lt;p style=&quot;margin-top: 10px;margin-left: 14px;font-size: 20px&quot;&gt;up&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: &quot;toTop&quot;,
  data() {
    return {
      fixedDiv:false,
      currentScroll: 0
    }
  },
  created() {

  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    fixedUp(){
      let top = document.documentElement.scrollTop || document.body.scrollTop
      // 实现滚动效果
      const timeTop = setInterval(() =&gt; {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 20
        if (top &lt;= 0) {
          clearInterval(timeTop)
        }
        
      }, 10)
    },
    //滚动条滚动事件
    handleScroll() {
      this.currentScroll = window.pageYOffset //表示当前滚动的位置
      console.log(this.currentScroll)
      if (this.currentScroll &gt;= 100) { //当前滚动位置到达testref的时候，显示div（100作为调整用）
        this.fixedDiv = true;
      }
      if (this.currentScroll &lt;= 100) { //当前滚动位置到达testref的时候，显示div（100作为调整用）
        this.fixedDiv = false;
      }
    },
  },
}
&lt;/script&gt;

&lt;style scoped&gt;
.fixed-div {
  position:fixed;
  bottom:50px;
  right:50px;
  width: 50px;
  height: 50px;
  background-color: #1811d8;
  border-radius: 50%;
  z-index: 9999;
  cursor: pointer;
}

.fixed-div:hover {
  cursor: pointer;
  box-shadow: 0 0 5px rgb(0,140,255),
  0 0 25px rgb(0,140,255),
  0 0 50px rgb(0,140,255),
  0 0 100px rgb(0,140,255);
}
&lt;/style&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-轮播图模板" tabindex="-1"><a class="header-anchor" href="#_2-轮播图模板" aria-hidden="true">#</a> 2：轮播图模板</h2>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code>&lt;template&gt;
  &lt;div id=&quot;jump5&quot;&gt;
    &lt;div class=&quot;box5&quot;&gt;
      &lt;div class=&quot;section-04-abs&quot;&gt;CUSTOMER SAID&lt;/div&gt;
      &lt;div class=&quot;box5_title&quot;&gt;
        &lt;span&gt;客户说&lt;/span&gt;
        &lt;div&gt;听听51大师兄的用户如何评价平台&lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;box5_carousel&quot;&gt;
        &lt;el-carousel :interval=&quot;4000&quot; type=&quot;card&quot; height=&quot;500px&quot; width:=&quot;100%&quot;&gt;
          &lt;el-carousel-item v-for=&quot;(item, index) in data&quot; :key=&quot;index&quot;&gt;
            &lt;div class=&quot;item&quot;&gt;
              &lt;div class=&quot;medium&quot;&gt;
                &lt;div class=&quot;medium_text&quot; v-html=&quot;item.cuscontent&quot;&gt;&lt;/div&gt;
              &lt;/div&gt;
              &lt;div class=&quot;item_photo&quot;&gt;
                &lt;img :src=&quot;item.image&quot; alt=&quot;&quot; /&gt;
              &lt;/div&gt;
              &lt;div class=&quot;item_name&quot;&gt;{{ item.cusname }}&lt;/div&gt;
              &lt;div class=&quot;item_text&quot;&gt;{{ item.cuscompany }}&lt;/div&gt;
              &lt;div class=&quot;item_text&quot;&gt;{{ item.cusduty }}&lt;/div&gt;
            &lt;/div&gt;
          &lt;/el-carousel-item&gt;
        &lt;/el-carousel&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name:'test',
  data() {
    return {
      data: [
        {
          image:'./../assets/logo.png',
          cusname: '123456',
          cuscompany: '亚信',
          cuscontent:'学习使人快乐学习使人快乐学习使人快乐学习使人快乐学习使人快乐学习使人快乐学习使人快乐',
          cusduty: '学习使人快乐'
        },
        {
          image:'./../assets/logo.png',
          cusname: '123456',
          cuscompany: '亚信',
          cuscontent:'学习使人快乐学习使人快乐学习使人快乐学习使人快乐学习使人快乐学习使人快乐学习使人快乐',
          cusduty: '学习使人快乐'
        },
        {
          image:'./../assets/logo.png',
          cusname: '123456',
          cuscompany: '亚信',
          cuscontent:'学习使人快乐学习使人快乐学习使人快乐学习使人快乐学习使人快乐学习使人快乐学习使人快乐',
          cusduty: '听听51大师兄的用户如何评价平台'
        },
        {
          image:'./../assets/logo.png',
          cusname: '123456',
          cuscompany: '亚信',
          cuscontent:'学习使人快乐学习使人快乐学习使人快乐学习使人快乐学习使人快乐学习使人快乐学习使人快乐',
          cusduty: '学习使人快乐'
        }
      ],
    };
  },
  mounted () {
    window.scrollTo(0,0);
  },
};
&lt;/script&gt;
&lt;style scoped&gt;
@media (max-width: 414px) {
  ::v-deep .el-carousel__button{
    height: 4px !important;
    width: 15px !important;
  }
  .medium_text{font-size: 12px !important;}
  ::v-deep .el-carousel__container {
    height: 370px !important;
  }
}
@media (min-width: 1700px) {
  .box5_carousel { width: 28.5rem;}
}
&lt;/style&gt;
&lt;style  scoped&gt;
@media (max-width: 414px) {
  li.el-carousel__indicator.el-carousel__indicator--horizontal {
    padding: 0 4px !important;
  }
  .item_text {
    font-size: 12px !important;
  }
  .item_name {
    font-size: 16px !important;
  }
  .box5 {
    width: 100% !important;
    padding: 0.5rem !important;
  }
  .box5_carousel {
    width: 100% !important;
    margin-top: 0 !important;
  }
  .section-04-abs {
    font-size: 0.373rem !important;
    margin-bottom: 0.9rem !important;
  }
  .box5_title span {
    font-size: 0.8rem !important;
  }
  .medium {
    padding: 0.3rem !important;
  }
  .el-carousel__item span {
    font-size: 12px !important;
    line-height: 26px !important;
  }
}

#jump4{width: 100%;}
::v-deep .el-carousel__arrow {
  top: 38% !important;
}
::v-deep .el-carousel__button {
  width: 1rem;
  height: 0.2rem;
}
::v-deep .is-active .el-carousel__button {
  background: #6474e5;
}
.medium {
  border-radius: 0.555556rem;
  padding: 0.4rem;
  height: 6rem;
}
.el-carousel__item span {
  font-size: 20px;
  font-weight: 400;
  font-style: italic;
  line-height: 35px;
  text-align: center;
  width: 100%;
}
.medium:nth-child(2n) {
  background-color: #f3f7ff;
}
.medium:nth-child(2n + 1) {
  background: linear-gradient(90deg, #677af5, #3b4ae5);
  color: #fff;
}
* {
  font-family: PingFang SC;
}
.medium_text{
  font-size: 20px;
}
.box5 {
  width: 90%;
  padding: 1rem;
  margin: 0 auto;
}
  .box5_carousel {
    margin-top: 0.87037rem;
    margin: 0 auto;
  }
    .item {
      text-align: center;
    }
      .item_photo {
        overflow: hidden;
        background-color: #d7dee1;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin: 0 auto;
        border: 0.1rem solid white;
        margin-top: -0.8rem;
      }
        img{
          height: 100%;
        }

      .item_name {
        font-size: 18px;
        font-weight: 800;
        color: #6174f3;
        line-height: 45px;
      }
      .item_text {
        font-size: 14px;
        font-weight: 800;
        font-style: italic;
        color: #7b7b7b;
        line-height: 0.47037rem;
      }
  .section-04-abs {
    text-align: center;
    font-size: 40px;
    font-family: Base 05;
    font-weight: 400;
    color: #ebebeb;
    line-height: 44px;
    margin-bottom: 0.75rem;
  }
  .box5_title {
    text-align: center;
    font-size: 48px;
    font-weight: 800;
    color: #474747;
    line-height: 0.666667rem;
    margin-top: -1.5rem;
  }
    div {
      margin-top: 0.1rem;
      margin-bottom: 0.5rem;
      font-size: 16px;
      font-weight: 400;
      color: #2e4062;
      line-height: 0.666667rem;
    }


&lt;/style&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-整合腾讯地图" tabindex="-1"><a class="header-anchor" href="#_3-整合腾讯地图" aria-hidden="true">#</a> 3：整合腾讯地图</h2>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code>  &lt;!-- 引入腾讯地图public下面得index.html中 --&gt;
  &lt;script charset=&quot;utf-8&quot; src=&quot;https://map.qq.com/api/gljs?v=1.exp&amp;key=M6QBZ-METOS-MMVOL-6433Y-L7FPF-FUFFW&quot;&gt;&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>&lt;div id=&quot;container&quot;&gt;&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>&lt;script&gt;
    export default {
        name: 'FarmMap',
        data () {
            return {
            map: null,
            }
        },
        mounted() {
            this.initMap();
        },
        methods: {
            initMap() {
           	 	console.log(window); // 通过window获取
                var center = new window.TMap.LatLng(39.984120, 116.307484)
                //初始化地图
                var map = new window.TMap.Map(&quot;container&quot;, {
                    zoom: 18,//设置地图缩放级别
                    center: center,//设置地图中心点坐标
                    baseMap: {  // 设置卫星地图
                        type: 'satellite'
                    }
                });
                console.log(map);
            }
        }
    }
&lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


