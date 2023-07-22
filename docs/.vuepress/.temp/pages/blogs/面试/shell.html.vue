<template><div><h1 id="_1-shell脚本入门" tabindex="-1"><a class="header-anchor" href="#_1-shell脚本入门" aria-hidden="true">#</a> 1：shell脚本入门</h1>
<h2 id="一-hello-world" tabindex="-1"><a class="header-anchor" href="#一-hello-world" aria-hidden="true">#</a> 一：hello，world</h2>
<p>1：首先，创建一个专门学习shell得文件夹</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>mkdir shellTest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2：创建第一个hello.sh文件</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>touch hello.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3：进入文件中编辑</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>vim hello.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>输入  
#!/bin/bash
echo &quot;hello,world!&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4：运行hello.sh脚本文件</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>bash hello.sh   或者  . hello.sh     或者   ./hello.sh(前提是要有权限，如果没有权限，执行chmod +x hello.sh)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="@source/blogs/面试/images/image-20220811221410374.png" alt="image-20220811221410374" style="zoom:67%;" />
<h2 id="二-传入参数" tabindex="-1"><a class="header-anchor" href="#二-传入参数" aria-hidden="true">#</a> 二：传入参数</h2>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>$0:  	表示当前脚本文件名称
$1:		表示第一个参数位置进行传参
$2:		表示第二个参数位置进行传参
$#:		表示传入参数得数量
$@:		表示所有得参数名称    （将所有看作一个整体）
$*:		表示所有得参数名称	 （将每个参数区分对待）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建  parameter.sh  文件</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>vim parameter.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>写入脚本数据</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>#!/bin/bash
echo '=========$n=========='
echo script name : $0
echo 1st parameter : $1
echo 2st parameter : $2
echo '=========$#=========='
echo parameter number: $#
echo '=========$@=========='
echo $@
echo '=========$*=========='
echo $*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：</p>
<p><img src="@source/blogs/面试/images/image-20220811233121839.png" alt="image-20220811233121839"></p>
<h2 id="三-运算符。" tabindex="-1"><a class="header-anchor" href="#三-运算符。" aria-hidden="true">#</a> 三：运算符。</h2>
<p>1：基本格式</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>$((运算式))    或者   $[运算式]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2：练习</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>一：简单
echo $[5 * 2]       在这个里面有没有空格是一样得
echo $((5+2))
二：稍微复杂
a=$[5+2]           =左右不能有空格
echo $a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/blogs/面试/images/image-20220812092108567.png" alt="image-20220812092108567"></p>
<p><img src="@source/blogs/面试/images/image-20220812092148437.png" alt="image-20220812092148437"></p>
<p><img src="@source/blogs/面试/images/image-20220812092319405.png" alt="image-20220812092319405"></p>
<p>3：案例实操</p>
<p>计算（2+3）* 4 的值。</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>s=$[(2+3)*4]
echo $s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/blogs/面试/images/image-20220812092810460.png" alt="image-20220812092810460"></p>
<p>4：shell脚本中实操</p>
<p>传入两个参数，并且返回他们的和</p>
<p>（1）：创建add.sh</p>
<p>（2）：编辑add.sh</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>#!/bin/bash
sum=$[$1 + $2]
echo sum=$sum
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（3）：保存并且退出</p>
<p>（4）：改变脚本权限</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>chmod +x add.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>（5）：运行脚本</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>./add.sh 25 35
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="@source/blogs/面试/images/image-20220812093818840.png" alt="image-20220812093818840" style="zoom:67%;" />
<h2 id="四-条件判断" tabindex="-1"><a class="header-anchor" href="#四-条件判断" aria-hidden="true">#</a> 四：条件判断</h2>
<img src="@source/blogs/面试/images/image-20220812094550942.png" alt="image-20220812094550942" style="zoom:67%;" />
<img src="@source/blogs/面试/images/image-20220812095538878.png" alt="image-20220812095538878" style="zoom:80%;" />
<p>测试。</p>
<p><img src="@source/blogs/面试/images/image-20220812095005568.png" alt="image-20220812095005568"></p>
<p>五：流程控制。</p>
<img src="@source/blogs/面试/images/image-20220812143045105.png" alt="image-20220812143045105" style="zoom:67%;" />
<p>注意事项：</p>
<ul>
<li>[ 条件判断式 ]，中括号和条件判断式之间必须有空格</li>
<li>if 后要有空格</li>
</ul>
<h3 id="_1-if单分支" tabindex="-1"><a class="header-anchor" href="#_1-if单分支" aria-hidden="true">#</a> 1：if单分支</h3>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>if [ 条件 ] ; then   ; fi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="@source/blogs/面试/images/image-20220812141348696.png" alt="image-20220812141348696"></p>
<p>1：编写if_test.sh脚本(其中有x的话是确保输入空时不报错。)</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>#!/bin/bash

if [ &quot;$1&quot;x = &quot;xiaoze&quot;x ]
then
        echo &quot;welcome,xiaoze&quot;
fi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2：添加执行权限</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>chmod +x if_test.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3：测试脚本</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>./if_test.sh xiaoze
./if_test.sh xiaorui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/blogs/面试/images/image-20220812142841208.png" alt="image-20220812142841208"></p>
<p>多个参数判断</p>
<p>1：if_test.sh编写脚本。</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>vim if_test.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2：编写脚本</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>#!/bin/bash

if [ &quot;$1&quot;x = &quot;xiaoze&quot;x ]
then
        echo &quot;welcome,xiaoze&quot;
fi

#输入第二个参数表示年龄，判断属于那个阶段
if [ $2 -lt 18 ]
then
        echo &quot;未成年人&quot;
else
        echo &quot;成年人&quot;
fi

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3：测试</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>./if_test xiaoze 25
./if_test xiaoze 17
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/blogs/面试/images/image-20220812144143003.png" alt="image-20220812144143003"></p>
<h3 id="_2-if多分支。" tabindex="-1"><a class="header-anchor" href="#_2-if多分支。" aria-hidden="true">#</a> 2：if多分支。</h3>
<p>1：改变if_test.sh脚本</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>vim if_test.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2：编写脚本</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>#!/bin/bash

if [ &quot;$1&quot;x = &quot;xiaoze&quot;x ]
then
        echo &quot;welcome,xiaoze&quot;
fi

#输入第二个参数表示年龄，判断属于那个阶段
if [ $2 -lt 18 ]
then
        echo &quot;未成年人&quot;
elif [ $2 -lt 35 ]
then
        echo &quot;中年人&quot;
else
        echo &quot;成年人&quot;
fi

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3：测试。</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>./if_test xiaoze 34
./if_test xiaoze 36
./if_test xiaoze 17
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/blogs/面试/images/image-20220812144800926.png" alt="image-20220812144800926"></p>
<h3 id="_3-case多分支" tabindex="-1"><a class="header-anchor" href="#_3-case多分支" aria-hidden="true">#</a> 3：case多分支</h3>
<img src="@source/blogs/面试/images/image-20220812145545518.png" alt="image-20220812145545518" style="zoom:67%;" />
<p>1：创建case.sh脚本文件</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>vim case.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2：编辑</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>#!/bin/bash
case $1 in
1)
        echo &quot;one&quot;
;;
2)
        echo &quot;two&quot;
;;
3)
        echo &quot;three&quot;
;;
*)
        echo &quot;number else&quot;
;;
esac

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3：添加可执行权限</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>chmod +x case.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4：测试。</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>./case.sh 2
./case.sh 3
./case.sh 4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="@source/blogs/面试/images/image-20220812150228375.png" alt="image-20220812150228375"></p>
<h3 id="_4-for循环" tabindex="-1"><a class="header-anchor" href="#_4-for循环" aria-hidden="true">#</a> 4：for循环</h3>
<p>输入i，然后返回从1加到i的值。</p>
<p>1：创建sum_for.sh</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>vim sun_for.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2：编写脚本</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>#!/bin/bash

for (( i=1; i &lt;= $1; i++ ))
do
        sum=$[ $sum + $i ]
done

echo $sum

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3：添加运行权限</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>chmod +x sum_for.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4：测试</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>./sum_for.sh 100   //应该返回5050
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="@source/blogs/面试/images/image-20220812151742582.png" alt="image-20220812151742582"></p>
<h3 id="_5-while-循环" tabindex="-1"><a class="header-anchor" href="#_5-while-循环" aria-hidden="true">#</a> 5：<strong>while</strong> <strong>循环</strong></h3>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>while [ 条件判断式 ] 
do 
	程序 
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从 1 加到 100</p>
<div class="language-linux line-numbers-mode" data-ext="linux"><pre v-pre class="language-linux"><code>[atguigu@hadoop101 shells]$ touch while.sh 
[atguigu@hadoop101 shells]$ vim while.sh 
#!/bin/bash 
sum=0 
i=1 
while [ $i -le 100 ] 
do 
	sum=$[$sum+$i] 
	i=$[$i+1] 
done 
echo $sum 
[atguigu@hadoop101 shells]$ chmod 777 while.sh 
[atguigu@hadoop101 shells]$ ./while.sh 5050
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-read-读取控制台输入" tabindex="-1"><a class="header-anchor" href="#_6-read-读取控制台输入" aria-hidden="true">#</a> 6：<strong>read</strong> <strong>读取控制台输入</strong></h3>
<img src="@source/blogs/面试/images/image-20220812163801982.png" alt="image-20220812163801982" style="zoom:67%;" />
<img src="@source/blogs/面试/images/image-20220812163822985.png" alt="image-20220812163822985" style="zoom:67%;" /></div></template>


