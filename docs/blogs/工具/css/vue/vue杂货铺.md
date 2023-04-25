---
title: 1-vue杂货铺
date: 2023-4-25
sidebar: auto
categories:
  - vue
tags:
  - vue

author: 胡昊泽
---

## 1：获取当前系统日期
```javascript
  getNowDate() {
      const timeOne = new Date()
      const year = timeOne.getFullYear()
      let month = timeOne.getMonth() + 1
      let day = timeOne.getDate()
      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      const NOW_MONTHS_AGO = `${year}-${month}-${day}`
      return NOW_MONTHS_AGO
    }
```

## 2：el-table-column处理时间（1）
```html
<el-table-column
    prop="inTime"
    :formatter="dateFormat"
    label="时间">
</el-table-column>
```

```javascript
// 时间格式化
    dateFormat(row, column, cellValue, index) {
      const daterc = row[column.property];
      if (daterc) {
        const dateMat = new Date(daterc);
        const Y = dateMat.getFullYear() + "年 ";
        const M =
          dateMat.getMonth() + 1 < 10
            ? "0" + (dateMat.getMonth() + 1) + "月 "
            : dateMat.getMonth() + 1 + "月 ";
        const D =
          dateMat.getDate() < 10
            ? "0" + dateMat.getDate() + "日 "
            : dateMat.getDate() + "日 ";

        const H =
          dateMat.getHours() < 10
            ? "0" + dateMat.getHours() + ":"
            : dateMat.getHours() + ":";

        const F =
          dateMat.getMinutes() < 10
            ? "0" + dateMat.getMinutes() + ":"
            : dateMat.getMinutes() + ":";

        const S =
          dateMat.getSeconds() < 10
            ? "0" + dateMat.getSeconds() + ":"
            : dateMat.getSeconds() + "";

        return Y + M + D ;
      }
    },

```

## 2：el-table-column处理时间（2）

```html
 <el-table-column
    label="注册时间"
    align="center"
    width="150">
      <template slot-scope="scope">
        {{ parseTimes(scope.row.created, '{y}-{m}-{d} {h}:{i}:{s}') }}
      </template>
</el-table-column>
```

```javascript
export default {
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
```

```javascript
import { parseTime } from '../../utils'
```

```javascript
export function parseTime(time, cFormat) {
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
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

```

## 3：校验格式
### 3-1 合法url
```javascript
 const acceptUrlValidator = (rule, value, callBack) => {
      let url = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/[\]@!\$&'\*\+,;=.]+$/;
      if (value) {
        if (!url.test(value)) {
          callBack("请输入正确的接收地址");
        } else {
          callBack();
        }
      } else {
        callBack();
      }
    };
```
### 3-2 固定电话
```javascript
export function validateTelephone(rule,value,callback) { 
  const reg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
  if(!reg.test(value)){
    callback(new Error('请输入正确的固话'))
  }else{
    callback()
  }
}
```
### 3-3 统一信用社会代码
```javascript
export function validateCreditCode(rule,value,callback) { 
  const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/
  if(!reg.test(value)){
    callback(new Error('请输入正确的统一信用代码'))
  }else{
    callback()
  }
}
```
### 3-4 手机号码
```javascript
export function validatePhoneNumber(str) {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(str)
}
```
### 3-5 手机号码或固定电话
```javascript
export function validatePhTelNumber(str) {
  const reg = /^((\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14})|([1][3,4,5,6,7,8,9][0-9]{9})$/
  return reg.test(str)
}
```
### 3-6 电子邮箱
```javascript
export function validateEmail(str) {
  const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(str)
}
```
### 3-7 邮编
```javascript
export function validateZipCode(str) {
  const reg = /^[1-9][0-9]{5}$/
  return reg.test(str)
}
```
### 3-8 身份证
```javascript
export function validateIDCard(str) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(str)
}
```
### 3-9 银行卡号
```javascript
export function validateBank(str) {
  const reg = /^([1-9]{1})(\d{14}|\d{18}|\d{15})$/
  return reg.test(str)
}
```

## 4：拾色器
```html
 <el-tooltip class="item"  effect="dark" content="点击更换主题" placement="bottom">
      <el-color-picker v-model="backValue" @change="selectChange" classs="picker"></el-color-picker>
 </el-tooltip>
```

```javascript
 data() {
    return {
      backValue: '#b08989'
    }
  },

created(){
    //从本地存储中取到用户设置得背景色
    this.backValue = localStorage.getItem("NavBackColor");
  },

 methods: {
    //更换主题
    selectChange() {
      localStorage.setItem("NavBackColor",this.backValue)
      this.$message.success('主题更换成功')
    }
  }
```

## 5：引入外部三方库
### 5-1 element-ui
```npm
npm i element-ui -S


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
```

### 5-2 animate
```npm
npm install animate.css --save

import 'animate.css';
```

### 5-3 axios
```npm
npm install axios

import axios from "axios";
Vue.prototype.$axios = axios

```

### 5-4 sass-loader
```npm
npm install --save-dev sass-loader
npm install --save-dev node-sass
```
接着编辑 build 文件夹下的 webpack.base.conf.js 文件，在 rules 里面添加如下配置
```xml
{
  test: /\.sass$/,
  loaders: ['style', 'css', 'sass']
}
```
> 使用样例  

（1）首先在 src/assets 目录下新建一个 var.scss 文件，里面存放两个变量，内容如下：
```scss
$header-color: orange;
$header-size: 20px;
```
（2）在一个 vue 页面中我们引入这个 .scss 文件并使用，同时还用到了 Sass 的嵌套特性。
```vue
<template>
  <div id="header"><div>欢迎访问 hangge.com</div></div>
</template>
 
<script>
  export default {
    name: 'test',
    data() {
      return {}
    }
  }
</script>
 
<style lang="scss">
  @import '../assets/var.scss';
  #header {
    div {
      color: $header-color;
      font-size: $header-size;
    }
  }
</style>
```

## 6：滚动条滚到最底部调用方法，实现分页
```vue
 mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

    //滚动条滚动事件
    handleScroll() {
      let _this = this;
      let scrollHeight= document.documentElement.scrollHeight || document.body.scrollHeight; //获取滚动条的总高度
      let nowScotop = document.documentElement.clientHeight || document.body.clientHeight;  //可视区高度
      let wheight= document.documentElement.scrollTop || document.body.scrollTop; //获取距离顶部的距离
      if(nowScotop + wheight >= scrollHeight){
        //开始调用后台方法
        this.currentPage++;
        setTimeout(() => {
        getInitList(_this.form,_this.currentPage).then(res => {
          _this.frauleinUserList.push(...res.data.data.data)
          _this.total = res.data.data.total
          _this.$message.success("已加载下一页数据")
        })
        },500)
      }
    },
```

## 7：路由跳转
### 7-1 标签跳转 router-link
① 不传参
```vue
<li >
  <router-link to="user">点击验证动画效果 </router-link>   
</li>
```
② 跳转时传参  
// 先要配置路由  
path: '/user/:id'
```vue
<router-link :to="'/user/' + this.id"> <router-link/>
```
// 接收参数    
```vue
this.$route.params.id
```

### 7-2 事件跳转 this.$router.push()

描述：
      跳转到不同的url，但这个方法会向history栈添加一个记录，
  点击后退会返回到上一个页面。  
用法：  
① 字符串  `this.$router.push('/home')`
② 对象  `this.$router.push({path:'/home'})`  
③ query 传参，相当于get请求，页面跳转时参数会在地址栏中显示，通过`this.$route.query.id`获取
// 变成 /user?id=2
```javascript
this.$router.push({ 
    path:'/user',
    query:{
        id:this.id
    }
})
```
④ params 传参，相当于post请求，页面跳转时参数不会在地址栏中显示,通过`this.$route.params.id`获取
```javascript
this.$router.push({ 
    path:'/user',
    params:{
        id:this.id
    }
})
```
:::warning 注意
注：传参是 `router`，接收参数是 `route`
:::
### 7-3 this.$router.replace{path:'/user'}

描述：同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。  
### 7-4 this.$router.go(n)
描述：相对于当前页面向前或向后跳转多少个页面,类似 window.history.go(n)。n可为正数可为负数。正数返回上一个页面。  
// 在浏览器记录中前进1步，相当于history.forward()  
`this.$router.go(1)`

// 后退一步记录，等同于`history.back()`  
`this.$router.go(-1)`

// 前进三步记录  
`this.$router.go(3)`

// 如果history记录不够用，就会失败  
`this.$router.go(100)`  
`this.$router.go(-100)`   
### 7-5 this.router.forward() 前进一步
### 7-6 this.router.back() 回退一步
### 7-7 跳转时携带对象
```vue
  //跳往详情页
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
```