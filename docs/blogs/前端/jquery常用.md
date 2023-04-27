---
title: 2-常用语法
date: 2023-4-26
sidebar: auto
categories:
  - jQuery
tags:
  - jQuery
author: 胡昊泽
---

## 1：url参数
### 1-1 如何从url取出参数
```javascript
const searchParams = new URLSearchParams(window.location.search); 
const sourceId = searchParams.get('source_id'); 
console.log(sourceId);
```

### 1-2 如何向url中追加、更新、删除参数
```javascript
// 获取当前页面URL
const url = new URL(window.location.href);

// 向URL中添加新的查询参数
url.searchParams.append('new_param', 'new_value');

// 更新现有查询参数的值
url.searchParams.set('source_id', 'new_source_id');

// 删除名为source_id的查询参数
url.searchParams.delete('source_id');

// 打印更新后的URL
console.log(url.href);
```

:::warning  问题1：new URLSearchParams  和new URL().searchParams有什么区别吗?
`new URLSearchParams()`和`new URL().searchParams`都是用于解析和操作URL查询参数的方法，它们的区别在于使用的方式不同。

`new URLSearchParams()`是一个构造函数，它接受一个字符串或一个对象作为参数，并返回一个`URLSearchParams`对象。您可以使用这个对象来解析和操作URL查询参数。

**请注意**，`new URL().searchParams`只适用于当前页面URL，而`new URLSearchParams()`可以用于任何URL字符串。
:::