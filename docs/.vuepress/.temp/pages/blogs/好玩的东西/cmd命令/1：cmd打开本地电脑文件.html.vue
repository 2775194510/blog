<template><div><p>::: warning cmd命令
<strong>vuepress-theme-reco</strong>因为每次都要打开不同地方的文件，很麻烦，所以有没有一种方式，我可以在窗口输入不同的数字来打开不同的文件呢？ ~~~ 当然可以的啦！
:::</p>
<h2 id="_1-创建bat命令脚本" tabindex="-1"><a class="header-anchor" href="#_1-创建bat命令脚本" aria-hidden="true">#</a> 1：创建bat命令脚本</h2>
<h2 id="_2-编写脚本" tabindex="-1"><a class="header-anchor" href="#_2-编写脚本" aria-hidden="true">#</a> 2：编写脚本</h2>
<div class="language-cmd line-numbers-mode" data-ext="cmd"><pre v-pre class="language-cmd"><code>@chcp 65001 
@echo off
::title
title 小泽的面试资料：

@echo.

@echo. ~获取Java基础，       请输入1:
@echo. ~获取JVM基础，        请输入2:
@echo. ~获取linux基础，      请输入3:
@echo.
@echo. ~获取MySQL基础，      请输入4:
@echo. ~获取redis基础，      请输入5:
@echo. ~获取Spring基础，     请输入6:
@echo. ~获取SpringMVC基础，  请输入7:
@echo.
@echo. ~获取SpringBoot基础， 请输入8:
@echo. ~获取Mybatis基础，    请输入9:
@echo. ~获取git基础，        请输入10:
@echo.
@echo. ~获取SpringCloud基础，请输入11:
@echo. ~获取计算机网络基础， 请输入12:
@echo. ~获取操作系统基础，   请输入13:
@echo.
@echo. ~获取设计模式基础，   请输入14:
@echo.
@echo. -------------------------------------------------------毕业相关------------------------------------------------
@echo. ~打开毕业设计项目，   请输入15:

set /p number=请输入数字：
:loop
if %number%==1 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\java&quot;
) else if %number%==2 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\JVM&quot;
) else if %number%==3 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\Linux&quot;
) else if %number%==4 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\MySQL&quot;
) else if %number%==5 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\Redis&quot;
) else if %number%==6 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\Spring&quot;
) else if %number%==7 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\SpringMVC&quot;
) else if %number%==8 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\SpringBoot&quot;
) else if %number%==9 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\Mybatis&quot;
) else if %number%==10 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\git&quot;
) else if %number%==11 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\SpringCloud&quot;
) else if %number%==12 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\计算机网络&quot;
) else if %number%==13 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\操作系统&quot;
) else if %number%==14 (
    start &quot;&quot; &quot;G:\YouZe\SearchWeek\面试\设计模式&quot;
) else if %number%==15 (
    start &quot;&quot; &quot;G:\YouZe\毕设资料\毕业论文&quot;
) 

set /p number=请继续  输入数字：
goto loop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


