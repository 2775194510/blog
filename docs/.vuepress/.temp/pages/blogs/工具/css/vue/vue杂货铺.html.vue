<template><div><h2 id="_1-获取当前系统日期" tabindex="-1"><a class="header-anchor" href="#_1-获取当前系统日期" aria-hidden="true">#</a> 1：获取当前系统日期</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>  getNowDate() {
      const timeOne = new Date()
      const year = timeOne.getFullYear()
      let month = timeOne.getMonth() + 1
      let day = timeOne.getDate()
      month = month &lt; 10 ? '0' + month : month
      day = day &lt; 10 ? '0' + day : day
      const NOW_MONTHS_AGO = `${year}-${month}-${day}`
      return NOW_MONTHS_AGO
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-el-table-column处理时间-1" tabindex="-1"><a class="header-anchor" href="#_2-el-table-column处理时间-1" aria-hidden="true">#</a> 2：el-table-column处理时间（1）</h2>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>&lt;el-table-column
    prop=&quot;inTime&quot;
    :formatter=&quot;dateFormat&quot;
    label=&quot;时间&quot;&gt;
&lt;/el-table-column&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>// 时间格式化
    dateFormat(row, column, cellValue, index) {
      const daterc = row[column.property];
      if (daterc) {
        const dateMat = new Date(daterc);
        const Y = dateMat.getFullYear() + &quot;年 &quot;;
        const M =
          dateMat.getMonth() + 1 &lt; 10
            ? &quot;0&quot; + (dateMat.getMonth() + 1) + &quot;月 &quot;
            : dateMat.getMonth() + 1 + &quot;月 &quot;;
        const D =
          dateMat.getDate() &lt; 10
            ? &quot;0&quot; + dateMat.getDate() + &quot;日 &quot;
            : dateMat.getDate() + &quot;日 &quot;;

        const H =
          dateMat.getHours() &lt; 10
            ? &quot;0&quot; + dateMat.getHours() + &quot;:&quot;
            : dateMat.getHours() + &quot;:&quot;;

        const F =
          dateMat.getMinutes() &lt; 10
            ? &quot;0&quot; + dateMat.getMinutes() + &quot;:&quot;
            : dateMat.getMinutes() + &quot;:&quot;;

        const S =
          dateMat.getSeconds() &lt; 10
            ? &quot;0&quot; + dateMat.getSeconds() + &quot;:&quot;
            : dateMat.getSeconds() + &quot;&quot;;

        return Y + M + D ;
      }
    },

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-el-table-column处理时间-2" tabindex="-1"><a class="header-anchor" href="#_2-el-table-column处理时间-2" aria-hidden="true">#</a> 2：el-table-column处理时间（2）</h2>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code> &lt;el-table-column
    label=&quot;注册时间&quot;
    align=&quot;center&quot;
    width=&quot;150&quot;&gt;
      &lt;template slot-scope=&quot;scope&quot;&gt;
        {{ parseTimes(scope.row.created, '{y}-{m}-{d} {h}:{i}:{s}') }}
      &lt;/template&gt;
&lt;/el-table-column&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>export default {
  name: 'ConnUser',
  parseTimes: parseTime,
  data() {},
  methods:{
    //处理时间戳
    parseTimes(time, cFormat) {
      return parseTime(time, cFormat)
    },
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>import { parseTime } from '../../utils'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) =&gt; {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length &gt; 0 &amp;&amp; value &lt; 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-校验格式" tabindex="-1"><a class="header-anchor" href="#_3-校验格式" aria-hidden="true">#</a> 3：校验格式</h2>
<h3 id="_3-1-合法url" tabindex="-1"><a class="header-anchor" href="#_3-1-合法url" aria-hidden="true">#</a> 3-1 合法url</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> const acceptUrlValidator = (rule, value, callBack) =&gt; {
      let url = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/[\]@!\$&amp;'\*\+,;=.]+$/;
      if (value) {
        if (!url.test(value)) {
          callBack(&quot;请输入正确的接收地址&quot;);
        } else {
          callBack();
        }
      } else {
        callBack();
      }
    };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-固定电话" tabindex="-1"><a class="header-anchor" href="#_3-2-固定电话" aria-hidden="true">#</a> 3-2 固定电话</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>export function validateTelephone(rule,value,callback) { 
  const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
  if(!reg.test(value)){
    callback(new Error('请输入正确的固话'))
  }else{
    callback()
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-统一信用社会代码" tabindex="-1"><a class="header-anchor" href="#_3-3-统一信用社会代码" aria-hidden="true">#</a> 3-3 统一信用社会代码</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>export function validateCreditCode(rule,value,callback) { 
  const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/
  if(!reg.test(value)){
    callback(new Error('请输入正确的统一信用代码'))
  }else{
    callback()
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4-手机号码" tabindex="-1"><a class="header-anchor" href="#_3-4-手机号码" aria-hidden="true">#</a> 3-4 手机号码</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>export function validatePhoneNumber(str) {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(str)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-手机号码或固定电话" tabindex="-1"><a class="header-anchor" href="#_3-5-手机号码或固定电话" aria-hidden="true">#</a> 3-5 手机号码或固定电话</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>export function validatePhTelNumber(str) {
  const reg = /^((\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14})|([1][3,4,5,6,7,8,9][0-9]{9})$/
  return reg.test(str)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-电子邮箱" tabindex="-1"><a class="header-anchor" href="#_3-6-电子邮箱" aria-hidden="true">#</a> 3-6 电子邮箱</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>export function validateEmail(str) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(str)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-7-邮编" tabindex="-1"><a class="header-anchor" href="#_3-7-邮编" aria-hidden="true">#</a> 3-7 邮编</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>export function validateZipCode(str) {
  const reg = /^[1-9][0-9]{5}$/
  return reg.test(str)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-8-身份证" tabindex="-1"><a class="header-anchor" href="#_3-8-身份证" aria-hidden="true">#</a> 3-8 身份证</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>export function validateIDCard(str) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(str)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-9-银行卡号" tabindex="-1"><a class="header-anchor" href="#_3-9-银行卡号" aria-hidden="true">#</a> 3-9 银行卡号</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>export function validateBank(str) {
  const reg = /^([1-9]{1})(\d{14}|\d{18}|\d{15})$/
  return reg.test(str)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-拾色器" tabindex="-1"><a class="header-anchor" href="#_4-拾色器" aria-hidden="true">#</a> 4：拾色器</h2>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code> &lt;el-tooltip class=&quot;item&quot;  effect=&quot;dark&quot; content=&quot;点击更换主题&quot; placement=&quot;bottom&quot;&gt;
      &lt;el-color-picker v-model=&quot;backValue&quot; @change=&quot;selectChange&quot; classs=&quot;picker&quot;&gt;&lt;/el-color-picker&gt;
 &lt;/el-tooltip&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> data() {
    return {
      backValue: '#b08989'
    }
  },

created(){
    //从本地存储中取到用户设置得背景色
    this.backValue = localStorage.getItem(&quot;NavBackColor&quot;);
  },

 methods: {
    //更换主题
    selectChange() {
      localStorage.setItem(&quot;NavBackColor&quot;,this.backValue)
      this.$message.success('主题更换成功')
    }
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-引入外部三方库" tabindex="-1"><a class="header-anchor" href="#_5-引入外部三方库" aria-hidden="true">#</a> 5：引入外部三方库</h2>
<h3 id="_5-1-element-ui" tabindex="-1"><a class="header-anchor" href="#_5-1-element-ui" aria-hidden="true">#</a> 5-1 element-ui</h3>
<div class="language-npm line-numbers-mode" data-ext="npm"><pre v-pre class="language-npm"><code>npm i element-ui -S


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-animate" tabindex="-1"><a class="header-anchor" href="#_5-2-animate" aria-hidden="true">#</a> 5-2 animate</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install animate.css --save

import 'animate.css';
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3-axios" tabindex="-1"><a class="header-anchor" href="#_5-3-axios" aria-hidden="true">#</a> 5-3 axios</h3>
<ul>
<li>① 在 <strong>main.js</strong> 中引入axios</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install axios

import axios from &quot;axios&quot;;
import './permission'
import store from './store'
Vue.prototype.$axios = axios
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>② 编写 <strong>http.js</strong> 文件来实现前后置拦截</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>import axios from 'axios';

const http = axios.create();

// 请求拦截器
http.interceptors.request.use(config =&gt; {
  // 在发送请求之前的逻辑处理
  // 可以修改请求配置，添加请求头等
  //config.headers.Authorization = token
  return config;
}, error =&gt; {
  // 请求错误处理
  return Promise.reject(error);
});

// 响应拦截器
http.interceptors.response.use(response =&gt; {
  // 在获取到响应数据之后的逻辑处理
  // 可以对响应数据进行处理、错误处理等

  return response;
}, error =&gt; {
  // 响应错误处理
  return Promise.reject(error);
});

export default http;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>③ 编写 <strong>permission.js</strong> 来实现路由跳转时检查token</li>
</ul>
<blockquote>
<p><code v-pre>token</code> 已经存储到了 <code v-pre>localStorage</code> 中，所以需要编写 <code v-pre>store/index.js</code> (需要用到vuex)</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem(&quot;userInfo&quot;))
    //sessionStorage中得userInfo是序列化得字符串，这里要将他反序列化成对象。
  },
  mutations: {
    SET_TOKEN: (state, token) =&gt; {
      state.token = token
      localStorage.setItem(&quot;token&quot;, token)
    },
    SET_USERINFO: (state, userInfo) =&gt; {
      state.userInfo = userInfo
      //sessionStorage中不可以存入对象，所以要将他序列化
      sessionStorage.setItem(&quot;userInfo&quot;, JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) =&gt; {
      localStorage.setItem(&quot;token&quot;, '')
      sessionStorage.setItem(&quot;userInfo&quot;, JSON.stringify(''))
      state.userInfo = {}
    }
  },
  getters: {
    getUser: state =&gt; {
      return state.userInfo
    }
  },
  actions: {},
  modules: {}
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>import router from &quot;./router&quot;;
// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) =&gt; {
    console.log(to)
    if (to.matched.some(record =&gt; record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        const token = localStorage.getItem(&quot;token&quot;)
        console.log(&quot;------------&quot; + token)
        if (token) { // 判断当前的token是否存在 ； 登录存入的token
            if (to.path === '/login') {
            } else {
                next()
            }
        } else {
            alert(&quot;您的权限不足，请您登录！&quot;)
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-4-sass-loader" tabindex="-1"><a class="header-anchor" href="#_5-4-sass-loader" aria-hidden="true">#</a> 5-4 sass-loader</h3>
<div class="language-npm line-numbers-mode" data-ext="npm"><pre v-pre class="language-npm"><code>npm install --save-dev sass-loader
npm install --save-dev node-sass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接着编辑 build 文件夹下的 webpack.base.conf.js 文件，在 rules 里面添加如下配置</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code>{
  test: /\.sass$/,
  loaders: ['style', 'css', 'sass']
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>使用样例</p>
</blockquote>
<p>（1）首先在 src/assets 目录下新建一个 var.scss 文件，里面存放两个变量，内容如下：</p>
<div class="language-scss line-numbers-mode" data-ext="scss"><pre v-pre class="language-scss"><code>$header-color: orange;
$header-size: 20px;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>（2）在一个 vue 页面中我们引入这个 .scss 文件并使用，同时还用到了 Sass 的嵌套特性。</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code>&lt;template&gt;
  &lt;div id=&quot;header&quot;&gt;&lt;div&gt;欢迎访问 hangge.com&lt;/div&gt;&lt;/div&gt;
&lt;/template&gt;
 
&lt;script&gt;
  export default {
    name: 'test',
    data() {
      return {}
    }
  }
&lt;/script&gt;
 
&lt;style lang=&quot;scss&quot;&gt;
  @import '../assets/var.scss';
  #header {
    div {
      color: $header-color;
      font-size: $header-size;
    }
  }
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-滚动条滚到最底部调用方法-实现分页" tabindex="-1"><a class="header-anchor" href="#_6-滚动条滚到最底部调用方法-实现分页" aria-hidden="true">#</a> 6：滚动条滚到最底部调用方法，实现分页</h2>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code> mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

    //滚动条滚动事件
    handleScroll() {
      let _this = this;
      let scrollHeight= document.documentElement.scrollHeight || document.body.scrollHeight; //获取滚动条的总高度
      let nowScotop = document.documentElement.clientHeight || document.body.clientHeight;  //可视区高度
      let wheight= document.documentElement.scrollTop || document.body.scrollTop; //获取距离顶部的距离
      if(nowScotop + wheight &gt;= scrollHeight){
        //开始调用后台方法
        this.currentPage++;
        setTimeout(() =&gt; {
        getInitList(_this.form,_this.currentPage).then(res =&gt; {
          _this.frauleinUserList.push(...res.data.data.data)
          _this.total = res.data.data.total
          _this.$message.success(&quot;已加载下一页数据&quot;)
        })
        },500)
      }
    },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-路由跳转" tabindex="-1"><a class="header-anchor" href="#_7-路由跳转" aria-hidden="true">#</a> 7：路由跳转</h2>
<h3 id="_7-1-标签跳转-router-link" tabindex="-1"><a class="header-anchor" href="#_7-1-标签跳转-router-link" aria-hidden="true">#</a> 7-1 标签跳转 router-link</h3>
<p>① 不传参</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code>&lt;li &gt;
  &lt;router-link to=&quot;user&quot;&gt;点击验证动画效果 &lt;/router-link&gt;   
&lt;/li&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>② 跳转时传参<br>
// 先要配置路由<br>
path: '/user/:id'</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code>&lt;router-link :to=&quot;'/user/' + this.id&quot;&gt; &lt;router-link/&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>// 接收参数</p>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code>this.$route.params.id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_7-2-事件跳转-this-router-push" tabindex="-1"><a class="header-anchor" href="#_7-2-事件跳转-this-router-push" aria-hidden="true">#</a> 7-2 事件跳转 this.$router.push()</h3>
<p>描述：
跳转到不同的url，但这个方法会向history栈添加一个记录，
点击后退会返回到上一个页面。<br>
用法：<br>
① 字符串  <code v-pre>this.$router.push('/home')</code>
② 对象  <code v-pre>this.$router.push({path:'/home'})</code><br>
③ query 传参，相当于get请求，页面跳转时参数会在地址栏中显示，通过<code v-pre>this.$route.query.id</code>获取
// 变成 /user?id=2</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>this.$router.push({ 
    path:'/user',
    query:{
        id:this.id
    }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>④ params 传参，相当于post请求，页面跳转时参数不会在地址栏中显示,通过<code v-pre>this.$route.params.id</code>获取</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>this.$router.push({ 
    path:'/user',
    params:{
        id:this.id
    }
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>:::warning 注意
注：传参是 <code v-pre>router</code>，接收参数是 <code v-pre>route</code>
:::</p>
<h3 id="_7-3-this-router-replace-path-user" tabindex="-1"><a class="header-anchor" href="#_7-3-this-router-replace-path-user" aria-hidden="true">#</a> 7-3 this.$router.replace{path:'/user'}</h3>
<p>描述：同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。</p>
<h3 id="_7-4-this-router-go-n" tabindex="-1"><a class="header-anchor" href="#_7-4-this-router-go-n" aria-hidden="true">#</a> 7-4 this.$router.go(n)</h3>
<p>描述：相对于当前页面向前或向后跳转多少个页面,类似 window.history.go(n)。n可为正数可为负数。正数返回上一个页面。<br>
// 在浏览器记录中前进1步，相当于history.forward()<br>
<code v-pre>this.$router.go(1)</code></p>
<p>// 后退一步记录，等同于<code v-pre>history.back()</code><br>
<code v-pre>this.$router.go(-1)</code></p>
<p>// 前进三步记录<br>
<code v-pre>this.$router.go(3)</code></p>
<p>// 如果history记录不够用，就会失败<br>
<code v-pre>this.$router.go(100)</code><br>
<code v-pre>this.$router.go(-100)</code></p>
<h3 id="_7-5-this-router-forward-前进一步" tabindex="-1"><a class="header-anchor" href="#_7-5-this-router-forward-前进一步" aria-hidden="true">#</a> 7-5 this.router.forward() 前进一步</h3>
<h3 id="_7-6-this-router-back-回退一步" tabindex="-1"><a class="header-anchor" href="#_7-6-this-router-back-回退一步" aria-hidden="true">#</a> 7-6 this.router.back() 回退一步</h3>
<h3 id="_7-7-跳转时携带对象" tabindex="-1"><a class="header-anchor" href="#_7-7-跳转时携带对象" aria-hidden="true">#</a> 7-7 跳转时携带对象</h3>
<div class="language-vue line-numbers-mode" data-ext="vue"><pre v-pre class="language-vue"><code>  //跳往详情页
    goDetail(item){
      this.$router.push({
        name:'frauleinDetail',
        query:{
          item:encodeURIComponent(JSON.stringify(item))
        }
      })
      // console.log(item)
    },

    
  //接受参数
  mounted() {
    let record = this.$route.query.item;
    this.item =  JSON.parse(decodeURIComponent(record))
    console.log(this.item)
  },
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


