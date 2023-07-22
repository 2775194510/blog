<template><div><p>首先先来说一下Git和Svn的区别。</p>
<h4 id="集中式-svn" tabindex="-1"><a class="header-anchor" href="#集中式-svn" aria-hidden="true">#</a> 集中式(svn)</h4>
<pre><code>svn因为每次存的都是差异 需要的硬盘空间会相对的小一点  可是回滚的速度会很慢
优点: 
    代码存放在单一的服务器上 便于项目的管理
缺点: 
    服务器宕机: 员工写的代码得不到保障
    服务器炸了: 整个项目的历史记录都会丢失
</code></pre>
<h4 id="分布式-git" tabindex="-1"><a class="header-anchor" href="#分布式-git" aria-hidden="true">#</a> 分布式(git)</h4>
<pre><code>git每次存的都是项目的完整快照 需要的硬盘空间会相对大一点
    (Git团队对代码做了极致的压缩 最终需要的实际空间比svn多不了太多 可是Git的回滚速度极快)
优点:
    完全的分布式
缺点:    
    学习起来比SVN陡峭
</code></pre>
<p>:::warning 主要为三层
<em><strong>本地项目工作区</strong></em>  -&gt;   <em><strong>暂存区</strong></em>  -&gt;   <em><strong>本地仓库</strong></em>  -&gt;   <em><strong>远程仓库</strong></em><br>
<code v-pre>git add .</code> 将当前 <strong>工作目录中的文件或文件夹</strong> 添加 <strong>到暂存区</strong>。<br>
<code v-pre>git commit -m &quot;注释&quot; </code> 将 <strong>暂存区的文件</strong> 提交到 <strong>本地仓库</strong>。<br>
<code v-pre>git push [remote] [branch]</code> 将 <strong>本地仓库文件</strong> 推送到 <strong>远程仓库</strong><br>
<strong>如果不创建分支、使用分支，则默认的都是<code v-pre>master</code>分支</strong>
:::</p>
<h2 id="_1-基础命令" tabindex="-1"><a class="header-anchor" href="#_1-基础命令" aria-hidden="true">#</a> 1:基础命令</h2>
<p><code v-pre>git config --global user.name &quot;xiaoze&quot;</code>:   配置开发人<br>
<code v-pre>git config --global user.email xiaoze@example.com </code>:   配置开发人邮箱<br>
<code v-pre>git config --list </code><br>
<code v-pre>git init</code>: 在当前目录中初始化Git仓库。<br>
<code v-pre>git clone [url]</code>: 克隆远程仓库。<br>
<code v-pre>git add [file]</code>: 将文件添加到暂存区。<br>
<code v-pre>git commit -m &quot;[message]&quot;</code>: 提交暂存区的更改到本地仓库并添加提交信息。<br>
<code v-pre>git status</code>: 查看当前工作区和暂存区的状态。<br>
<code v-pre>git  diff</code>     :  查看未暂存的修改<br>
<code v-pre>git  diff --cache</code> : 查看未提交的暂存<br>
<code v-pre>git  log  --oneline</code> : 查看提交记录<br>
<code v-pre>git log</code>: 查看提交历史。<br>
<code v-pre>git rm 要删除的文件  </code>  删除文件<br>
<code v-pre>git mv 老文件 新文件 </code>   重命名文件</p>
<h2 id="_2-分支和合并" tabindex="-1"><a class="header-anchor" href="#_2-分支和合并" aria-hidden="true">#</a> 2:分支和合并</h2>
<p>:::tip 提示
分支的本质其实就是一个<strong>提交对象</strong>!!!<br>
HEAD:<br>
是一个指针 它默认指向master分支 切换分支时其实就是让HEAD指向不同的分支<br>
每次有新的提交时 HEAD都会带着当前指向的分支 一起往前移动
:::
<code v-pre>git  log --oneline --decorate --graph --all</code> : 查看整个项目的分支图<br>
<code v-pre>git branch</code>: 查看本地分支。<br>
<code v-pre>git branch [branch]</code>: 创建一个新的分支。<br>
<code v-pre>git checkout [branch]</code>: 切换到一个分支。<br>
<code v-pre>git merge [branch]</code>: 将指定分支合并到当前分支。<br>
<code v-pre>git rebase [branch]</code>: 将当前分支的提交历史移动到指定分支的顶部。<br>
<code v-pre>git cherry-pick [commit]</code>: 将指定提交应用到当前分支 。<br>
<code v-pre>git branch -d name</code> : 删除空的分支 删除已经被合并的分支。<br>
<code v-pre>git branch -D name</code> : 强制删除分支  。</p>
<h2 id="_3-远程仓库" tabindex="-1"><a class="header-anchor" href="#_3-远程仓库" aria-hidden="true">#</a> 3:远程仓库</h2>
<p><code v-pre>git remote add [name] [url]</code>: 添加一个新的远程仓库。<br>
<code v-pre>git fetch [remote]</code>: 拉取远程仓库的更新。<br>
<code v-pre>git push [remote] [branch]</code>: 将本地分支推送到远程仓库。<br>
<code v-pre>git pull [remote] [branch]</code>: 拉取远程仓库的更新并合并到本地分支。</p>
<h2 id="_4-撤销更改" tabindex="-1"><a class="header-anchor" href="#_4-撤销更改" aria-hidden="true">#</a> 4:撤销更改</h2>
<p><code v-pre>git reset [file]</code>: 取消对文件的暂存。<br>
<code v-pre>git checkout [file]</code>: 撤销对文件的修改。<br>
<code v-pre>git revert [commit]</code>: 撤销指定提交的更改。</p>
<h2 id="_5-其他命令" tabindex="-1"><a class="header-anchor" href="#_5-其他命令" aria-hidden="true">#</a> 5:其他命令</h2>
<p><code v-pre>git tag [name]</code>: 给当前提交打标签。<br>
<code v-pre>git stash</code>: 将当前修改储存起来，以便稍后恢复。<br>
<code v-pre>git clean</code>: 从工作区中删除未跟踪的文件。</p>
<h2 id="_6-其他" tabindex="-1"><a class="header-anchor" href="#_6-其他" aria-hidden="true">#</a> 6:其他</h2>
<h3 id="_6-1-提交文件流程-不使用分支" tabindex="-1"><a class="header-anchor" href="#_6-1-提交文件流程-不使用分支" aria-hidden="true">#</a> 6.1 提交文件流程(不使用分支)</h3>
<div class="language-git line-numbers-mode" data-ext="git"><pre v-pre class="language-git"><code>1：先建立本地仓库  git init

2:将本地项目工作区的所有文件添加到缓存区 git add ./   (当然也可以添加某一个文件   git add 文件名)

3：将缓存区的文件提交到本地仓库 git commit -m &quot;注释&quot;（ 当然也可以用git -commit -a -m &quot;注释&quot; , 直接将文件添加到本地仓库，不用经历缓存区）

4：在Gitee上创建自己的new repository

5:将本地仓库关联到gitee上 git remote add origin+ 该仓库的地址

6：获取远程库与本地同步合并(如果远程库不为空必须做这一步，否则后面提交会失败) git pull --rebase origin master

7：将代码由本地仓库上传到Github远程仓库上  git push -u origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-提交文件流程-使用分支" tabindex="-1"><a class="header-anchor" href="#_6-2-提交文件流程-使用分支" aria-hidden="true">#</a> 6.2 提交文件流程(使用分支)</h3>
<blockquote>
<p>1.使用 git checkout -b &lt;branch-name&gt;</p>
</blockquote>
<p>命令创建并切换到一个新分支，分支名为 &lt;branch-name&gt;。</p>
<blockquote>
<p>2.然后，进行代码修改并使用 git add 命令将修改的文件添加到暂存区。</p>
</blockquote>
<blockquote>
<p>3.使用 git commit -m &quot;&lt;commit-message&gt;&quot; 命令提交修改，</p>
</blockquote>
<p>其中 &lt;commit-message&gt; 是本次提交的说明信息。</p>
<blockquote>
<p>4.<strong>如果需要继续修改代码，重复步骤2和步骤3。如果不需要继续修改，可以直接跳到步骤5。</strong></p>
</blockquote>
<blockquote>
<p>5.使用 git checkout main 命令切换回主分支（假设主分支名为 main）。此时，新创建的分支中的修改不会出现在主分支中。</p>
</blockquote>
<blockquote>
<p>6.使用 git merge &lt;branch-name&gt; 命令将新创建的分支合并到主分支中。</p>
</blockquote>
<p>其中 &lt;branch-name&gt; 是新创建的分支名。</p>
<blockquote>
<p>7.如果没有冲突，合并成功后可以使用 git branch -d &lt;branch-name&gt; 命令删除新创建的分支，此时新创建的分支中的修改已经被合并到主分支中。</p>
</blockquote>
<div class="language-git line-numbers-mode" data-ext="git"><pre v-pre class="language-git"><code>git checkout -b &lt;branch-name&gt;
# 在该分支下进行代码修改
git add .
git commit -m &quot;&lt;commit-message&gt;&quot;
# 继续进行代码修改和提交，直到不需要再修改为止
git checkout main
git merge &lt;branch-name&gt;
git branch -d &lt;branch-name&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-脚本一键推送文件-git-push-bat" tabindex="-1"><a class="header-anchor" href="#_6-3-脚本一键推送文件-git-push-bat" aria-hidden="true">#</a> 6.3 脚本一键推送文件(git-push.bat)</h3>
<div class="language-cmd line-numbers-mode" data-ext="cmd"><pre v-pre class="language-cmd"><code>@echo off

rem Add all changes to Git staging area
git add .

rem Commit changes with a message
git commit -m &quot;%1&quot;

rem Push changes to remote repository
git push

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如何使用？</p>
<blockquote>
<p><strong>直接在文件夹中 git-push.bat   &quot;注释就可以使用&quot;</strong></p>
</blockquote>
</div></template>


