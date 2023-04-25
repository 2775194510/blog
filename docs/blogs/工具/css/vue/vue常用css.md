---
title: 3-vue常用css总结
date: 2023-4-25
sidebar: auto
categories:
  - css
tags:
  - css

author: 胡昊泽
---

## 1：改变el-table表头背景色以及字体居中
```css
 :header-cell-style="{background:'#7ba8d7', color:'white', 'line-hight':'50px', 'text-align': 'center'}"
 将数据内容居中
 /deep/ .el-table .cell{
  text-align: center;
}
```

## 2：vue设置某一个页面背景色(图)
```javascript
    mounted() {
        document.querySelector('body').setAttribute('style', 'background-color:#f6f6f6')
    },
    beforeDestroy() {
        document.querySelector('body').removeAttribute('style')
    },
```

```javascript
  mounted() {
    let record = this.$route.query.item;
    this.detailMessage =  JSON.parse(decodeURIComponent(record))
    document.querySelector('body').setAttribute('style', "background-image: url("+require("../../assets/back.jpg")+");background-size: cover;" +
        "background-repeat: no-repeat")

  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
```