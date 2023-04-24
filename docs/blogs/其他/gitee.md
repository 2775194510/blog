---
title: 【gitee】1：gitee基本语法
date: 2023-4-22
sidebar: auto
categories:
  - gitee
tags:
  - gitee
author: 胡昊泽
---

首先先来说一下Git和Svn的区别。
#### 集中式(svn)

    svn因为每次存的都是差异 需要的硬盘空间会相对的小一点  可是回滚的速度会很慢
    优点: 
        代码存放在单一的服务器上 便于项目的管理
    缺点: 
        服务器宕机: 员工写的代码得不到保障
        服务器炸了: 整个项目的历史记录都会丢失

#### 分布式(git)

    git每次存的都是项目的完整快照 需要的硬盘空间会相对大一点
        (Git团队对代码做了极致的压缩 最终需要的实际空间比svn多不了太多 可是Git的回滚速度极快)
    优点:
        完全的分布式
    缺点:    
        学习起来比SVN陡峭
:::warning 主要为三层 
***本地项目工作区***  ->   ***暂存区***  ->   ***本地仓库***  ->   ***远程仓库***  
`git add .` 将当前 **工作目录中的文件或文件夹** 添加 **到暂存区**。   
`git commit -m "注释" ` 将 **暂存区的文件** 提交到 **本地仓库**。  
`git push [remote] [branch]` 将 **本地仓库文件** 推送到 **远程仓库**  
**如果不创建分支、使用分支，则默认的都是`master`分支**
:::
## 1:基础命令
`git config --global user.name "xiaoze"`:   配置开发人  
`git config --global user.email xiaoze@example.com `:   配置开发人邮箱    
`git config --list `  
`git init`: 在当前目录中初始化Git仓库。    
`git clone [url]`: 克隆远程仓库。    
`git add [file]`: 将文件添加到暂存区。    
`git commit -m "[message]"`: 提交暂存区的更改到本地仓库并添加提交信息。    
`git status`: 查看当前工作区和暂存区的状态。  
`git  diff`     :  查看未暂存的修改  
`git  diff --cache` : 查看未提交的暂存  
`git  log  --oneline` : 查看提交记录    
`git log`: 查看提交历史。  
`git rm 要删除的文件  `  删除文件  
`git mv 老文件 新文件 `   重命名文件
## 2:分支和合并

:::tip 提示
分支的本质其实就是一个**提交对象**!!!  
HEAD:   
    是一个指针 它默认指向master分支 切换分支时其实就是让HEAD指向不同的分支  
    每次有新的提交时 HEAD都会带着当前指向的分支 一起往前移动
:::
`git  log --oneline --decorate --graph --all` : 查看整个项目的分支图   
`git branch`: 查看本地分支。  
`git branch [branch]`: 创建一个新的分支。  
`git checkout [branch]`: 切换到一个分支。  
`git merge [branch]`: 将指定分支合并到当前分支。  
`git rebase [branch]`: 将当前分支的提交历史移动到指定分支的顶部。  
`git cherry-pick [commit]`: 将指定提交应用到当前分支 。  
`git branch -d name` : 删除空的分支 删除已经被合并的分支。  
`git branch -D name` : 强制删除分支  。  
## 3:远程仓库  
`git remote add [name] [url]`: 添加一个新的远程仓库。  
`git fetch [remote]`: 拉取远程仓库的更新。  
`git push [remote] [branch]`: 将本地分支推送到远程仓库。  
`git pull [remote] [branch]`: 拉取远程仓库的更新并合并到本地分支。  
## 4:撤销更改  
`git reset [file]`: 取消对文件的暂存。  
`git checkout [file]`: 撤销对文件的修改。  
`git revert [commit]`: 撤销指定提交的更改。  
## 5:其他命令  
`git tag [name]`: 给当前提交打标签。  
`git stash`: 将当前修改储存起来，以便稍后恢复。  
`git clean`: 从工作区中删除未跟踪的文件。  
## 6:其他
### 6.1 提交文件流程(不使用分支)
```git
1：先建立本地仓库  git init

2:将本地项目工作区的所有文件添加到缓存区 git add ./   (当然也可以添加某一个文件   git add 文件名)

3：将缓存区的文件提交到本地仓库 git commit -m "注释"（ 当然也可以用git -commit -a -m "注释" , 直接将文件添加到本地仓库，不用经历缓存区）

4：在Gitee上创建自己的new repository

5:将本地仓库关联到gitee上 git remote add origin+ 该仓库的地址

6：获取远程库与本地同步合并(如果远程库不为空必须做这一步，否则后面提交会失败) git pull --rebase origin master

7：将代码由本地仓库上传到Github远程仓库上  git push -u origin master
```

### 6.2 提交文件流程(使用分支)

> 1.使用 git checkout -b \<branch-name\>   

命令创建并切换到一个新分支，分支名为 \<branch-name\>。

> 2.然后，进行代码修改并使用 git add 命令将修改的文件添加到暂存区。

> 3.使用 git commit -m "\<commit-message\>" 命令提交修改，

其中 \<commit-message\> 是本次提交的说明信息。

> 4.**如果需要继续修改代码，重复步骤2和步骤3。如果不需要继续修改，可以直接跳到步骤5。**

> 5.使用 git checkout main 命令切换回主分支（假设主分支名为 main）。此时，新创建的分支中的修改不会出现在主分支中。

> 6.使用 git merge \<branch-name\> 命令将新创建的分支合并到主分支中。

其中 \<branch-name\> 是新创建的分支名。

> 7.如果没有冲突，合并成功后可以使用 git branch -d \<branch-name\> 命令删除新创建的分支，此时新创建的分支中的修改已经被合并到主分支中。

```git
git checkout -b <branch-name>
# 在该分支下进行代码修改
git add .
git commit -m "<commit-message>"
# 继续进行代码修改和提交，直到不需要再修改为止
git checkout main
git merge <branch-name>
git branch -d <branch-name>
```

### 6.3 脚本一键推送文件(git-push.bat)  
```cmd
@echo off

rem Add all changes to Git staging area
git add .

rem Commit changes with a message
git commit -m "%1"

rem Push changes to remote repository
git push

```
 如何使用？  

> **直接在文件夹中 git-push.bat   "注释就可以使用"**



