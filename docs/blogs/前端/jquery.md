---
title: 【jQuery】1-基本语法
date: 2023-4-19
categories:
  - jQuery
tags:
  - jQuery
author: 胡昊泽
---

::: tip 学习背景
**话说为什么要学习jQuery，这种老的技术在当时真的很好用，但是在当今前后端分离得情况下，使用它的人群也越来越少，但是小泽还是得学习它，如果不是为了工作需要，小泽大概不会在这个上面浪费时间~~~**
:::

::: warning 学习方法
  在这里主要学习主要是通过 ***[菜鸟教程](https://www.runoob.com/jquery/jquery-tutorial.html)*** 来学习，学习时间大概是两个小时左右，就差不多了，这个技术真的不难，就是不常用会忘记，哎，真的让人头大。
:::
# 基本语法：
在这里安装什么的就不用说了，直接就开始上重要知识。
## 1：jQuery教程
### 1-1 jQuery语法
```javascrpt 		
<!-- jQuery 入口函数: -->
$(document).ready(function(){
    // 执行代码
});
或者
$(function(){
    // 执行代码
});	
```
::: warning 为什么代码都需要放在jQuery的入口函数中执行？
实例中的所有 jQuery 函数位于一个 document ready 函数中,这是为了防止文档在完全加载（就绪）之前运行 jQuery 代码，即在 DOM 加载完成后才可以对 DOM 进行操作。
:::
### 1-2 jQuery选择器
- jQuery 选择器允许您对 HTML 元素组或单个元素进行操作。
- jQuery 选择器基于元素的 id、类、类型、属性、属性值等"查找"（或选择）HTML 元素。 它基于已经存在的 CSS 选择器，除此之外，它还有一些自定义的选择器。
- jQuery 中所有选择器都以美元符号开头：$()。
#### 1-2-1 元素选择器
jQuery 元素选择器基于元素名选取元素。

> 在页面中选取所有 ***p*** 标签元素:
```javascrpt
$("p")
```
> 实例 用户点击按钮后，所有 ***p*** 元素都隐藏：
```javascrpt
$(document).ready(function(){
  $("button").click(function(){
    $("p").hide();
  });
});
```
#### 1-2-2 id 选择器
- jQuery #id 选择器通过 HTML 元素的 id 属性选取指定的元素。
- 页面中元素的 id 应该是唯一的，所以您要在页面中选取唯一的元素需要通过 #id 选择器。

> 通过 id 选取元素语法如下
```javascrpt
$("#test")
```
> 实例 当用户点击按钮后，有 id="test" 属性的元素将被隐藏：
```javascrpt
$(document).ready(function(){
  $("button").click(function(){
    $("#test").hide();
  });
});
```
#### 1-2-3 .class 选择器
- jQuery 类选择器可以通过指定的 class 查找元素。

> 语法如下：
```javascrpt
$(".test")
```
> 实例 用户点击按钮后所有带有 class="test" 属性的元素都隐藏：
```javascrpt
$(document).ready(function(){
  $("button").click(function(){
    $(".test").hide();
  });
});
```
> 更多实例

|  语法  |  描述  | 
|----|----|
| $("*") | 选取所有元素 |
| $(this) | 选取当前 HTML 元素 |
| $("p.intro") | 选取 class 为 intro 的  \<p\>  元素 |
| $("p:first") | 选取第一个 \<p\> 元素 |
| $("ul li:first") | 选取每个 \<ul\> 元素的第一个 \<li\> 元素 |
| $("ul li:first-child") | 选取每个 \<ul\> 元素的第一个 \<li\> 元素 |
| $("[\href\]") | 选取带有 href 属性的元素 |
| $("a[target='\_blank\']") | 选取所有 target 属性值等于 "_blank" 的 \<a\> 元素 |
| $("a[target!='\_blank\']") | 选取所有 target 属性值不等于 "_blank" 的 \<a\> 元素 |
| $(":button") | 选取所有 type="button" 的 \<input\> 元素 和 \<button\> 元素 |
| $("tr:even") | 选取偶数位置的 \<tr\> 元素 |
| $("tr:odd") | 选取奇数位置的 \<tr\> 元素 |

## 2：jQuery效果
###   2-1 显示和隐藏   
> 通过 jQuery，您可以使用 `show()` 和 `hide()` 方法来隐藏和显示 HTML 元素.
```html
<!DOCTYPE html>
<html>
<head>
     <meta charset="utf-8">
     <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
     <script>
        $(document).ready(function(){
           $("#hide").click(function(){
           $("p").hide();
        });
        $("#show").click(function(){
           $("p").show();
        });
        });
     </script>
</head>
<body>
      <p>如果你点击“隐藏” 按钮，我将会消失。</p>
      <button id="hide">隐藏</button>
      <button id="show">显示</button>
</body>
</html>
```
> ***语法：***  
> `$(selector).hide(speed,callback);`  
> `$(selector).show(speed,callback);`

> 回调函数 中间只可以有 `"linear"` 和 `"swing"`
```javascript
$(document).ready(function(){
  $(".hidebtn").click(function(){
    $("div").hide(1000,"linear",function(){
      alert("Hide() 方法已完成!");
    });
  });
});
```

::: tip 
***jQuery toggle()***
通过 jQuery，您可以使用 `toggle()` 方法来切换 `hide()` 和 `show()` 方法。
显示被隐藏的元素，并隐藏已显示的元素：
:::
```javascript
$("button").click(function(){
  $("p").toggle();
});
```

###   2-2 淡入淡出
- `fadeIn()`     用于淡入已隐藏的元素。
- `fadeOut()`    用于淡出可见元素。
- `fadeToggle()`  可以在 fadeIn() 与 fadeOut() 方法之间进行切换。
- `fadeTo()`  允许渐变为给定的不透明度（值介于 0 与 1 之间）
  
> 实例

 `fadeIn()`  取以下值："slow"、"fast" 或毫秒
 ```javascript
  $("button").click(function(){
     $("#div1").fadeIn();
     $("#div2").fadeIn("slow");
     $("#div3").fadeIn(3000);
});
 ```

  `fadeOut()`  取以下值："slow"、"fast" 或毫秒
 ```javascript
  $("button").click(function(){
     $("#div1").fadeOut();
     $("#div2").fadeOut("slow");
     $("#div3").fadeOut(3000);
});
 ```

  `fadeToggle()`  取以下值："slow"、"fast" 或毫秒
 ```javascript
  $("button").click(function(){
     $("#div1").fadeToggle();
     $("#div2").fadeToggle("slow");
     $("#div3").fadeToggle(3000);
});
 ```

 ### 2-3 滑动
 - `slideDown()`  用于向下滑动元素。
 - `slideUp()`  用于向上滑动元素。
 - `slideToggle()` 在 slideDown() 与 slideUp() 方法之间进行切换。

  
> 实例

 `slideDown()`  取以下值："slow"、"fast" 或毫秒
 ```javascript
  $("#flip").click(function(){
     $("#panel").slideDown();
});
 ```

  `slideUp()`  取以下值："slow"、"fast" 或毫秒
 ```javascript
  $("#flip").click(function(){
     $("#panel").slideUp();
});
 ```

  `slideToggle()`  取以下值："slow"、"fast" 或毫秒
 ```javascript
 $("#flip").click(function(){
    $("#panel").slideToggle();
});
 ```

 ### 2-4 动画
 > `animate() 方法` 用于创建自定义动画

 > 语法 `$(selector).animate({params},speed,callback);`

 - 必需的 params 参数定义形成动画的 CSS 属性。
 - 可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
 - 可选的 callback 参数是动画完成后所执行的函数名称。
 - 下面的例子演示 animate() 方法的简单应用。它把 \<div\> 元素往右边移动了 250 像素：
  ```javascript
  $("button").click(function(){
      $("div").animate({left:'250px'});
  });
  ```
  ***操作多个属性***
  ```javascript
  $("button").click(function(){
     $("div").animate({
         left:'250px',
         opacity:'0.5',
         height:'150px',
         width:'150px'
     });
  });
  ```

   ::: warning 警告
  可以用 `animate()`  方法来操作所有 CSS 属性吗？  
  是的，几乎可以！不过，需要记住一件重要的事情：当使用 animate() 时，必须使用 Camel 标记法书写所有的属性名，比如，必须使用 paddingLeft 而不是 padding-left，使用 marginRight 而不是 margin-right，等等。
  同时，色彩动画并不包含在核心 jQuery 库中。
  如果需要生成颜色动画，您需要从 jquery.com 下载 颜色动画 插件。
  :::
  ***使用相对值***
  ```javascript
  $("button").click(function(){
    $("div").animate({
       left:'250px',
       height:'+=150px',
       width:'+=150px'
    });
  });
  ```

  ***使用预定义的值***  
  您甚至可以把属性的动画值设置为 "show"、"hide" 或 "toggle"：
 ```javascript
  $("button").click(function(){
    $("div").animate({
      height:'toggle'
    });
  });
  ```

***使用队列功能***  
  这意味着如果您在彼此之后编写多个 `animate()` 调用，jQuery 会创建包含这些方法调用的"内部"队列。然后逐一运行这些 animate 调用。
 ```javascript
 $("button").click(function(){
    var div=$("div");
    div.animate({height:'300px',opacity:'0.4'},"slow");
    div.animate({width:'300px',opacity:'0.8'},"slow");
    div.animate({height:'100px',opacity:'0.4'},"slow");
    div.animate({width:'100px',opacity:'0.8'},"slow");
  });
  ```

## 3：html
### 3.1 获取内容和属性
> 获得内容 - `text()`、`html()` 以及 `val()`
- text() - 设置或返回所选元素的文本内容
- html() - 设置或返回所选元素的内容（包括 HTML 标签）
- val() - 设置或返回表单字段的值  
下面的例子演示如何通过 jQuery text() 和 html() 方法来获得内容
```javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
    $(document).ready(function(){
       $("#btn1").click(function(){
          alert("Text: " + $("#test").text());
        });
       $("#btn2").click(function(){
          alert("HTML: " + $("#test").html());
        });
      });
</script>
</head>

<body>
    <p id="test">这是段落中的 <b>粗体</b> 文本。</p>
    <button id="btn1">显示文本</button>
    <button id="btn2">显示 HTML</button>
</body>
</html>
```
下面的例子演示如何通过 jQuery val() 方法获得输入字段的值：
```javascript
<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
    $(document).ready(function(){
       $("button").click(function(){
           alert("值为: " + $("#test").val());
       });
    });
</script>
</head>

<body>
    <p>名称: <input type="text" id="test" value="小泽学习赏金"></p>
    <button>显示值</button>
</body>
</html>
```

> 获取属性 - `attr()`
> 
> jQuery `attr()` 方法用于获取属性值。

下面的例子演示如何获得链接中 href 属性的值：
```javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
    $(document).ready(function(){
        $("button").click(function(){
           alert($("#runoob").attr("href"));
        });
      });
</script>
</head>

<body>
      <p><a href="http://www.runoob.com" id="runoob">点击获取属性值</a></p>
      <button>显示 href 属性的值</button>
</body>
</html>
```
### 3.2 设置内容和属性
下面的例子演示如何通过 text()、html() 以及 val() 方法来设置内容：
```javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
$(document).ready(function(){
  $("#btn1").click(function(){
    $("#test1").text("Hello world!");
  });
  $("#btn2").click(function(){
    $("#test2").html("<b>Hello world!</b>");
  });
  $("#btn3").click(function(){
    $("#test3").val("RUNOOB");
  });
});
</script>
</head>

<body>
    <p id="test1">这是一个段落。</p>
    <p id="test2">这是另外一个段落。</p>
    <p>输入框: <input type="text" id="test3" value="小泽认真奋进"></p>
    <button id="btn1">设置文本</button>
    <button id="btn2">设置 HTML</button>
    <button id="btn3">设置值</button>
</body>
</html>
```
> `text()`、`html()` 以及 `val()` 的回调函数
> 
> 上面的三个 jQuery 方法：text()、html() 以及 val()，同样拥有回调函数。回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。

下面的例子演示带有回调函数的 text() 和 html()：
```javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
  $(document).ready(function(){
    $("#btn1").click(function(){
       $("#test1").text(function(i,origText){
             return "旧文本: " + origText + " 新文本: Hello world! (index: " + i + ")"; 
       });
     });

    $("#btn2").click(function(){
       $("#test2").html(function(i,origText){
           return "旧 html: " + origText + " 新 html: Hello <b>world!</b> (index: " + i + ")"; 
       });
    });

  });
</script>
</head>

<body>
      <p id="test1">这是一个有 <b>粗体</b> 字的段落。</p>
      <p id="test2">这是另外一个有 <b>粗体</b> 字的段落。</p>
      <button id="btn1">显示 新/旧 文本</button>
      <button id="btn2">显示 新/旧 HTML</button>
</body>
</html>
```
> 设置属性 - `attr()`
>
> jQuery attr() 方法也用于设置/改变属性值  
下面的例子演示如何改变（设置）链接中 href 属性的值：
```javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
    $(document).ready(function(){
        $("button").click(function(){
          $("#runoob").attr("href","http://www.runoob.com/jquery");
        });
    });
</script>
</head>

<body>
    <p><a href="http://www.runoob.com" id="runoob">菜鸟教程</a></p>
    <button>修改 href 值</button>
    <p>点击按钮修改后，可以点击链接查看链接地址是否变化。</p>
</body>
</html>
```
::: tip 提示
`attr()` 方法也允许您同时设置多个属性。
:::
下面的例子演示如何同时设置 `href` 和 `title` 属性：  
```javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("#runoob").attr({
      "href" : "http://www.runoob.com/jquery",
      "title" : "jQuery 教程"
    });
	// 通过修改的 title 值来修改链接名称
	title =  $("#runoob").attr('title');
	$("#runoob").html(title);
  });
});
</script>
</head>

<body>
    <p><a href="http://www.runoob.com" id="runoob">菜鸟教程</a></p>
    <button>修改 href 和 title</button>
    <p>点击按钮修改后，可以查看 href 和 title 是否变化。</p>
</body>
</html>
```
> `attr()` 的回调函数
>
> jQuery 方法 `attr()`，也提供回调函数。回调函数有两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。
  
下面的例子演示带有回调函数的 attr() 方法：
```javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>666</title> 
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
<script>
$(document).ready(function(){
    $("button").click(function(){
        $("#runoob").attr("href", function(i, origValue){
            return origValue + "/jquery";
        });
    });
});
</script>
</head>
<body>
    <p><a href="http://www.runoob.com" id="runoob">菜鸟教程</a></p>

    <button>修改 href 值</button>

    <p>点击按钮修改后，可以点击链接查看 href 属性是否变化。</p>
</body>
</html>
```
### 3.3 添加元素
> 添加新的HTML内容
- append() - 在被选元素的结尾插入内容
- prepend() - 在被选元素的开头插入内容
- after() - 在被选元素之后插入内容
- before() - 在被选元素之前插入内容
> `append()` 方法    

append() 方法在被选元素的结尾插入内容（仍然在该元素的内部）。
```javascript
  $("p").append("追加文本");
```

> `prepend()` 方法    

prepend() 方法在被选元素的开头插入内容。
```javascript
  $("p").prepend("在开头追加文本");
```

> 通过 `append()` 和 `prepend()` 方法添加若干新元素    

在上面的例子中，我们只在被选元素的开头/结尾插入文本/HTML。

不过，append() 和 prepend() 方法能够通过参数接收无限数量的新元素。可以通过 jQuery 来生成文本/HTML（就像上面的例子那样），或者通过 JavaScript 代码和 DOM 元素。

在下面的例子中，我们创建若干个新元素。这些元素可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建。然后我们通过 append() 方法把这些新元素追加到文本中（对 prepend() 同样有效）：
```javascript
  function appendText(){
    var txt1="<p>文本-1。</p>";              // 使用 HTML 标签创建文本
    var txt2=$("<p></p>").text("文本-2。");  // 使用 jQuery 创建文本
    var txt3=document.createElement("p");
    txt3.innerHTML="文本-3。";               // 使用 DOM 创建文本 text with DOM
    $("body").append(txt1,txt2,txt3);        // 追加新元素
}
```

> `after()` 和 `before()` 方法   

`after()` 方法在被选元素之后插入内容。
`before()` 方法在被选元素之前插入内容
```javascript
$("img").after("在后面添加文本");
$("img").before("在前面添加文本");
```

> 通过`after()` 和 `before()` 方法添加若干新元素   

`after()` 和 `before()` 方法能够通过参数接收无限数量的新元素。可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建新元素。

在下面的例子中，我们创建若干新元素。这些元素可以通过 text/HTML、jQuery 或者 JavaScript/DOM 来创建。然后我们通过 `after()` 方法把这些新元素插到文本中（对 `before()` 同样有效）：
```javascript
function afterText()
{
    var txt1="<b>I </b>";                    // 使用 HTML 创建元素
    var txt2=$("<i></i>").text("love ");     // 使用 jQuery 创建元素
    var txt3=document.createElement("big");  // 使用 DOM 创建元素
    txt3.innerHTML="jQuery!";
    $("img").after(txt1,txt2,txt3);          // 在图片后添加文本
}
```
### 3.4 删除元素 
::: warning 删除元素/内容
:::
如需删除元素和内容，一般可使用以下两个 jQuery 方法：
- remove() - 删除被选元素（及其子元素）
- empty() - 从被选元素中删除子元素
> jQuery `remove()` 方法

jQuery `remove()` 方法删除被选元素及其子元素。
```javascript
$("#div1").remove();
```

> jQuery `empty()` 方法

jQuery `empty()` 方法删除被选元素的子元素。
```javascript
$("#div1").empty();
```

> 过滤被删除的元素

jQuery `remove()` 方法也可接受一个参数，允许您对被删元素进行过滤。

该参数可以是任何 jQuery 选择器的语法。

下面的例子删除 class="italic" 的所有 \<p\> 元素：
```javascript
$("p").remove(".italic");
```
### 3.5 获取并设置 CSS 类 
- addClass() - 向被选元素添加一个或多个类
- removeClass() - 从被选元素删除一个或多个类
- toggleClass() - 对被选元素进行添加/删除类的切换操作
- css() - 设置或返回样式属性
  
> jQuery `addClass()` 方法

下面的例子展示如何向不同的元素添加 class 属性。当然，在添加类时，您也可以选取多个元素：

```javascript
$("button").click(function(){
  $("h1,h2,p").addClass("blue");
  $("div").addClass("important");
});
```
您也可以在 addClass() 方法中规定多个类：
```javascript
$("button").click(function(){
  $("body div:first").addClass("important blue");
});
```

> jQuery `removeClass()` 方法

下面的例子演示如何在不同的元素中删除指定的 class 属性:
```javascript
$("button").click(function(){
  $("h1,h2,p").removeClass("blue");
});
```

> jQuery `toggleClass()` 方法

下面的例子将展示如何使用 jQuery `toggleClass()` 方法。该方法对被选元素进行添加/删除类的切换操作：

```javascript
$("button").click(function(){
  $("h1,h2,p").toggleClass("blue");
});
```
### 3.6 css() 方法 
> 返回 CSS 属性

如需返回指定的 CSS 属性的值，请使用如下语法：

`css("propertyname");`

下面的例子将返回首个匹配元素的 background-color 值：

```javascript
$("p").css("background-color");
```

> 设置 CSS 属性

如需设置指定的 CSS 属性，请使用如下语法：

`css("propertyname","value");`

下面的例子将为所有匹配元素设置 background-color 值：

```javascript
$("p").css("background-color","yellow");
```

> 设置多个 CSS 属性

如需设置多个 CSS 属性，请使用如下语法：

`css({"propertyname":"value","propertyname":"value",...});`

下面的例子将为所有匹配元素设置 background-color 和 font-size：

```javascript
$("p").css({"background-color":"yellow","font-size":"200%"});
```
## 4：遍历

- parent()
- parents()
- parentsUntil()
### 4.1 祖先 
> `parent()` 方法

parent() 方法返回被选元素的直接父元素。

该方法只会向上一级对 DOM 树进行遍历。

下面的例子返回每个 \<span\> 元素的直接父元素：

```javascript
$(document).ready(function(){
  $("span").parent();
});
``` 

> `parents()` 方法

parents() 方法返回被选元素的所有祖先元素，它一路向上直到文档的根元素 (\<html\>)。

下面的例子返回所有 \<span\> 元素的所有祖先：

```javascript
$(document).ready(function(){
  $("span").parents();
});
```
您也可以使用可选参数来过滤对祖先元素的搜索。

下面的例子返回所有 \<span\> 元素的所有祖先，并且它是 \<ul\> 元素：
```javascript
$(document).ready(function(){
  $("span").parents("ul");
});
```
> `parentsUntil()` 方法

parentsUntil() 方法返回介于两个给定元素之间的所有祖先元素。

下面的例子返回介于 \<span\> 与 \<div\ > 元素之间的所有祖先元素：

```javascript
$(document).ready(function(){
  $("span").parentsUntil("div");
});
```
### 4.2 后代
> `children()` 方法

`children()` 方法返回被选元素的所有直接子元素。

该方法只会向下一级对 DOM 树进行遍历。

下面的例子返回每个 \<div\> 元素的所有直接子元素：

```javascript
$(document).ready(function(){
  $("div").children();
});
```
您也可以使用可选参数来过滤对子元素的搜索。

下面的例子返回类名为 "1" 的所有 \<p\> 元素，并且它们是 \<div\> 的直接子元素：
```javascript
$(document).ready(function(){
  $("div").children("p.1");
});
```

> `find()` 方法

`find()` 方法返回被选元素的后代元素，一路向下直到最后一个后代。

下面的例子返回属于 \<div\> 后代的所有 \<span\> 元素：

```javascript
$(document).ready(function(){
  $("div").find("span");
});
```
下面的例子返回 \<div\> 的所有后代：

```javascript
$(document).ready(function(){
  $("div").find("*");
});
```
### 4.3 同胞
- siblings()
- next()
- nextAll()
- nextUntil()
- prev()
- prevAll()
- prevUntil()
  
> `siblings()` 方法

`siblings()` 方法返回被选元素的所有同胞元素。

下面的例子返回 \<h2\> 的所有同胞元素

```javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
.siblings *
{ 
	display: block;
	border: 2px solid lightgrey;
	color: lightgrey;
	padding: 5px;
	margin: 15px;
}
</style>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
   $(document).ready(function(){
	    $("h2").siblings().css({"color":"red","border":"2px solid red"});
    });
</script>
</head>
<body class="siblings">
    <div>div (父元素)
         <p>p</p>
         <span>span</span>
         <h2>h2</h2>
         <h3>h3</h3>
         <p>p</p>
    </div>
</body>
</html>
```
您也可以使用可选参数来过滤对同胞元素的搜索。

下面的例子返回属于 \<h2\> 的同胞元素的所有 \<p\> 元素：

```javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
.siblings *
{ 
	display: block;
	border: 2px solid lightgrey;
	color: lightgrey;
	padding: 5px;
	margin: 15px;
}
</style>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
    $(document).ready(function(){
        $("h2").siblings("p").css({"color":"red","border":"2px solid red"});
    });
</script>
</head>
<body class="siblings">
    <div>div (父元素)
        <p>p</p>
        <span>span</span>
        <h2>h2</h2>
        <h3>h3</h3>
        <p>p</p>
    </div>
</body>
</html>
```
> `next()` 方法

`next()` 方法返回被选元素的下一个同胞元素。

该方法只返回一个元素。

下面的例子返回 \<h2\> 的下一个同胞元素：

```javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
.siblings *
{ 
	display: block;
	border: 2px solid lightgrey;
	color: lightgrey;
	padding: 5px;
	margin: 15px;
}
</style>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
    $(document).ready(function(){
      	$("h2").next().css({"color":"red","border":"2px solid red"});
    });
</script>
</head>
<body class="siblings">
    <div>div (父元素)
        <p>p</p>
        <span>span</span>
        <h2>h2</h2>
        <h3>h3</h3>
        <p>p</p>
    </div>
</body>
</html>
```

> `nextAll()` 方法

`nextAll()` nextAll() 方法返回被选元素的所有跟随的同胞元素。

下面的例子返回 \<h2\> 的所有跟随的同胞元素：

```javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
.siblings *
{ 
	display: block;
	border: 2px solid lightgrey;
	color: lightgrey;
	padding: 5px;
	margin: 15px;
}
</style>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
  $(document).ready(function(){
	  $("h2").nextAll().css({"color":"red","border":"2px solid red"});
  });
</script>
</head>
<body class="siblings">
    <div>div (父元素)
        <p>p</p>
        <span>span</span>
        <h2>h2</h2>
        <h3>h3</h3>
        <p>p</p>
    </div>
</body>
</html>
```

> `nextUntil()` 方法

`nextUntil()` 方法返回介于两个给定参数之间的所有跟随的同胞元素。

下面的例子返回介于 \<h2\> 与 \<h6\> 元素之间的所有同胞元素：

```javascript
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
.siblings *
{ 
	display: block;
	border: 2px solid lightgrey;
	color: lightgrey;
	padding: 5px;
	margin: 15px;
}
</style>
<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js">
</script>
<script>
  $(document).ready(function(){
	  $("h2").nextUntil("h6").css({"color":"red","border":"2px solid red"});
  });
</script>
</head>
<body class="siblings">
    <div>div (父元素)
        <p>p</p>
        <span>span</span>
        <h2>h2</h2>
        <h3>h3</h3>
        <h4>h4</h4>
        <h5>h5</h5>
        <h6>h6</h6>
        <p>p</p>
    </div>
</body>
</html>
```
### 4.4 过滤 
::: tip 提示
三个最基本的过滤方法是：`first()`, `last()` 和 `eq()`，它们允许您基于其在一组元素中的位置来选择一个特定的元素。

其他过滤方法，比如 `filter()` 和 `not()` 允许您选取匹配或不匹配某项指定标准的元素。
:::
 
 > `first()` 方法

`first()` 方法返回被选元素的首个元素。

下面的例子选取首个 \<div\> 元素内部的第一个 \<p\> 元素：

```javascript
$(document).ready(function(){
  $("div p").first();
});
```
> `last()` 方法

`last()`  方法返回被选元素的最后一个元素。

下面的例子选择最后一个 \<div\> 元素中的最后一个 \<p\> 元素：

```javascript
$(document).ready(function(){
  $("div p").last();
});
```
> `eq()` 方法

`eq()` 方法返回被选元素中带有指定索引号的元素。

索引号从 0 开始，因此首个元素的索引号是 0 而不是 1。下面的例子选取第二个 \<p\> 元素（索引号 1）

```javascript
$(document).ready(function(){
  $("p").eq(1);
});
```
> `filter()` 方法

`filter()` 方法允许您规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。

下面的例子返回带有类名 "url" 的所有 \<p\> 元素：

```javascript
$(document).ready(function(){
  $("p").filter(".url");
});
```
> `not()` 方法

`not()` 方法返回不匹配标准的所有元素。

提示：not() 方法与 filter() 相反。

下面的例子返回不带有类名 "url" 的所有 \<p\> 元素：

```javascript
$(document).ready(function(){
  $("p").not(".url");
});
```



