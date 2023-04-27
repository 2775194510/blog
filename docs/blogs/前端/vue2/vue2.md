---
title: 1-常用语法
date: 2023-4-27
sidebar: auto
categories:
  - 前端
tags:
  - vue2
---

## 1：filter的使用
### 1-1 语法
[学习链接](https://v2.cn.vuejs.org/v2/guide/filters.html)   
Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。过滤器可以用在两个地方：***双花括号插值***和 ***v-bind 表达式*** (后者从 2.1.0+ 开始支持)。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示：
```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```
你可以在一个组件的选项中定义本地的过滤器：  
```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```
或者在创建 Vue 实例之前全局定义过滤器：  
```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```
> **当全局过滤器和局部过滤器重名时，会采用局部过滤器。**

过滤器函数总接收表达式的值 (之前的操作链的结果) 作为 **第一个参数** 。在上述例子中，`capitalize` 过滤器函数将会收到 `message` 的值作为第一个参数。

过滤器可以串联：  
```html
{{ message | filterA | filterB }}
```

在这个例子中，`filterA` 被定义为接收单个参数的过滤器函数，表达式 `message` 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 `filterB`，将 `filterA` 的结果传递到 `filterB` 中。

过滤器是 JavaScript 函数，因此可以接收参数：
```html
{{ message | filterA('arg1', arg2) }}
```

这里，`filterA` 被定义为接收三个参数的过滤器函数。其中 `message` 的值作为第一个参数，普通字符串 `'arg1'` 作为第二个参数，表达式 `arg2` 的值作为第三个参数。

### 1-2 用法

::: warning 问题1：如何使用filter来过滤到集合中不需要的元素？
:::
- ① 使用 **计算属性（Computed Properties）** 来实现。  
> 计算属性（Computed Properties）：您可以在组件中定义计算属性，该属性根据集合和过滤条件动态计算出一个新的数组。计算属性会根据依赖的数据自动更新。
```js
export default {
  data() {
    return {
      collection: [/* Your collection data */],
      filterCriteria: 'some value' // Filter criteria
    }
  },
  computed: {
    filteredCollection() {
      return this.collection.filter(item => item.property === this.filterCriteria)
    }
  }
}

```

在上面的例子中，我们定义了一个 **计算属性 filteredCollection** ，它返回一个根据过滤条件   **filterCriteria** 过滤后的新数组。

- ② **过滤器（Filters）**：您也可以使用过滤器对集合进行过滤，它可以在模板中直接使用。  
```js
export default {
  data() {
    return {
      collection: [/* Your collection data */],
      filterCriteria: 'some value' // Filter criteria
    }
  },
  filters: {
    filterByCriteria(items) {
      return items.filter(item => item.property === this.filterCriteria)
    }
  }
}
```
在上面的例子中，我们定义了一个名为 **filterByCriteria** 的过滤器，它接收集合作为输入，并返回一个根据过滤条件过滤后的新数组。



