(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{688:function(t,a,s){"use strict";s.r(a);var e=s(1),n=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("首先先来说一下Git和Svn的区别。")]),t._v(" "),a("h4",{attrs:{id:"集中式-svn"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#集中式-svn"}},[t._v("#")]),t._v(" 集中式(svn)")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("svn因为每次存的都是差异 需要的硬盘空间会相对的小一点  可是回滚的速度会很慢\n优点: \n    代码存放在单一的服务器上 便于项目的管理\n缺点: \n    服务器宕机: 员工写的代码得不到保障\n    服务器炸了: 整个项目的历史记录都会丢失\n")])])]),a("h4",{attrs:{id:"分布式-git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#分布式-git"}},[t._v("#")]),t._v(" 分布式(git)")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("git每次存的都是项目的完整快照 需要的硬盘空间会相对大一点\n    (Git团队对代码做了极致的压缩 最终需要的实际空间比svn多不了太多 可是Git的回滚速度极快)\n优点:\n    完全的分布式\n缺点:    \n    学习起来比SVN陡峭\n")])])]),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"title"},[t._v("主要为三层")]),a("p",[a("em",[a("strong",[t._v("本地项目工作区")])]),t._v("  ->   "),a("em",[a("strong",[t._v("暂存区")])]),t._v("  ->   "),a("em",[a("strong",[t._v("本地仓库")])]),t._v("  ->   "),a("em",[a("strong",[t._v("远程仓库")])]),a("br"),t._v(" "),a("code",[t._v("git add .")]),t._v(" 将当前 "),a("strong",[t._v("工作目录中的文件或文件夹")]),t._v(" 添加 "),a("strong",[t._v("到暂存区")]),t._v("。"),a("br"),t._v(" "),a("code",[t._v('git commit -m "注释"')]),t._v(" 将 "),a("strong",[t._v("暂存区的文件")]),t._v(" 提交到 "),a("strong",[t._v("本地仓库")]),t._v("。"),a("br"),t._v(" "),a("code",[t._v("git push [remote] [branch]")]),t._v(" 将 "),a("strong",[t._v("本地仓库文件")]),t._v(" 推送到 "),a("strong",[t._v("远程仓库")]),a("br"),t._v(" "),a("strong",[t._v("如果不创建分支、使用分支，则默认的都是"),a("code",[t._v("master")]),t._v("分支")])])]),a("h2",{attrs:{id:"_1-基础命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-基础命令"}},[t._v("#")]),t._v(" 1:基础命令")]),t._v(" "),a("p",[a("code",[t._v('git config --global user.name "xiaoze"')]),t._v(":   配置开发人"),a("br"),t._v(" "),a("code",[t._v("git config --global user.email xiaoze@example.com")]),t._v(":   配置开发人邮箱"),a("br"),t._v(" "),a("code",[t._v("git config --list")]),a("br"),t._v(" "),a("code",[t._v("git init")]),t._v(": 在当前目录中初始化Git仓库。"),a("br"),t._v(" "),a("code",[t._v("git clone [url]")]),t._v(": 克隆远程仓库。"),a("br"),t._v(" "),a("code",[t._v("git add [file]")]),t._v(": 将文件添加到暂存区。"),a("br"),t._v(" "),a("code",[t._v('git commit -m "[message]"')]),t._v(": 提交暂存区的更改到本地仓库并添加提交信息。"),a("br"),t._v(" "),a("code",[t._v("git status")]),t._v(": 查看当前工作区和暂存区的状态。"),a("br"),t._v(" "),a("code",[t._v("git diff")]),t._v("     :  查看未暂存的修改"),a("br"),t._v(" "),a("code",[t._v("git diff --cache")]),t._v(" : 查看未提交的暂存"),a("br"),t._v(" "),a("code",[t._v("git log --oneline")]),t._v(" : 查看提交记录"),a("br"),t._v(" "),a("code",[t._v("git log")]),t._v(": 查看提交历史。"),a("br"),t._v(" "),a("code",[t._v("git rm 要删除的文件")]),t._v("  删除文件"),a("br"),t._v(" "),a("code",[t._v("git mv 老文件 新文件")]),t._v("   重命名文件")]),t._v(" "),a("h2",{attrs:{id:"_2-分支和合并"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-分支和合并"}},[t._v("#")]),t._v(" 2:分支和合并")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"},[t._v("提示")]),a("p",[t._v("分支的本质其实就是一个"),a("strong",[t._v("提交对象")]),t._v("!!!"),a("br"),t._v("\nHEAD:"),a("br"),t._v("\n是一个指针 它默认指向master分支 切换分支时其实就是让HEAD指向不同的分支"),a("br"),t._v("\n每次有新的提交时 HEAD都会带着当前指向的分支 一起往前移动")])]),a("p",[a("code",[t._v("git log --oneline --decorate --graph --all")]),t._v(" : 查看整个项目的分支图"),a("br"),t._v(" "),a("code",[t._v("git branch")]),t._v(": 查看本地分支。"),a("br"),t._v(" "),a("code",[t._v("git branch [branch]")]),t._v(": 创建一个新的分支。"),a("br"),t._v(" "),a("code",[t._v("git checkout [branch]")]),t._v(": 切换到一个分支。"),a("br"),t._v(" "),a("code",[t._v("git merge [branch]")]),t._v(": 将指定分支合并到当前分支。"),a("br"),t._v(" "),a("code",[t._v("git rebase [branch]")]),t._v(": 将当前分支的提交历史移动到指定分支的顶部。"),a("br"),t._v(" "),a("code",[t._v("git cherry-pick [commit]")]),t._v(": 将指定提交应用到当前分支 。"),a("br"),t._v(" "),a("code",[t._v("git branch -d name")]),t._v(" : 删除空的分支 删除已经被合并的分支。"),a("br"),t._v(" "),a("code",[t._v("git branch -D name")]),t._v(" : 强制删除分支  。")]),t._v(" "),a("h2",{attrs:{id:"_3-远程仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-远程仓库"}},[t._v("#")]),t._v(" 3:远程仓库")]),t._v(" "),a("p",[a("code",[t._v("git remote add [name] [url]")]),t._v(": 添加一个新的远程仓库。"),a("br"),t._v(" "),a("code",[t._v("git fetch [remote]")]),t._v(": 拉取远程仓库的更新。"),a("br"),t._v(" "),a("code",[t._v("git push [remote] [branch]")]),t._v(": 将本地分支推送到远程仓库。"),a("br"),t._v(" "),a("code",[t._v("git pull [remote] [branch]")]),t._v(": 拉取远程仓库的更新并合并到本地分支。")]),t._v(" "),a("h2",{attrs:{id:"_4-撤销更改"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-撤销更改"}},[t._v("#")]),t._v(" 4:撤销更改")]),t._v(" "),a("p",[a("code",[t._v("git reset [file]")]),t._v(": 取消对文件的暂存。"),a("br"),t._v(" "),a("code",[t._v("git checkout [file]")]),t._v(": 撤销对文件的修改。"),a("br"),t._v(" "),a("code",[t._v("git revert [commit]")]),t._v(": 撤销指定提交的更改。")]),t._v(" "),a("h2",{attrs:{id:"_5-其他命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-其他命令"}},[t._v("#")]),t._v(" 5:其他命令")]),t._v(" "),a("p",[a("code",[t._v("git tag [name]")]),t._v(": 给当前提交打标签。"),a("br"),t._v(" "),a("code",[t._v("git stash")]),t._v(": 将当前修改储存起来，以便稍后恢复。"),a("br"),t._v(" "),a("code",[t._v("git clean")]),t._v(": 从工作区中删除未跟踪的文件。")]),t._v(" "),a("h2",{attrs:{id:"_6-其他"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-其他"}},[t._v("#")]),t._v(" 6:其他")]),t._v(" "),a("h3",{attrs:{id:"_6-1-提交文件流程-不使用分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-提交文件流程-不使用分支"}},[t._v("#")]),t._v(" 6.1 提交文件流程(不使用分支)")]),t._v(" "),a("div",{staticClass:"language-git line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-git"}},[a("code",[t._v("1：先建立本地仓库  git init\n\n2:将本地项目工作区的所有文件添加到缓存区 git add ./   (当然也可以添加某一个文件   git add 文件名)\n\n3：将缓存区的文件提交到本地仓库 git commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"注释"')]),t._v("（ 当然也可以用git -commit -a -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"注释"')]),t._v(" , 直接将文件添加到本地仓库，不用经历缓存区）\n\n4：在Gitee上创建自己的new repository\n\n5:将本地仓库关联到gitee上 git remote add origin+ 该仓库的地址\n\n6：获取远程库与本地同步合并(如果远程库不为空必须做这一步，否则后面提交会失败) git pull --rebase origin master\n\n7：将代码由本地仓库上传到Github远程仓库上  git push -u origin master\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])]),a("h3",{attrs:{id:"_6-2-提交文件流程-使用分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-2-提交文件流程-使用分支"}},[t._v("#")]),t._v(" 6.2 提交文件流程(使用分支)")]),t._v(" "),a("blockquote",[a("p",[t._v("1.使用 git checkout -b <branch-name>")])]),t._v(" "),a("p",[t._v("命令创建并切换到一个新分支，分支名为 <branch-name>。")]),t._v(" "),a("blockquote",[a("p",[t._v("2.然后，进行代码修改并使用 git add 命令将修改的文件添加到暂存区。")])]),t._v(" "),a("blockquote",[a("p",[t._v('3.使用 git commit -m "<commit-message>" 命令提交修改，')])]),t._v(" "),a("p",[t._v("其中 <commit-message> 是本次提交的说明信息。")]),t._v(" "),a("blockquote",[a("p",[t._v("4."),a("strong",[t._v("如果需要继续修改代码，重复步骤2和步骤3。如果不需要继续修改，可以直接跳到步骤5。")])])]),t._v(" "),a("blockquote",[a("p",[t._v("5.使用 git checkout main 命令切换回主分支（假设主分支名为 main）。此时，新创建的分支中的修改不会出现在主分支中。")])]),t._v(" "),a("blockquote",[a("p",[t._v("6.使用 git merge <branch-name> 命令将新创建的分支合并到主分支中。")])]),t._v(" "),a("p",[t._v("其中 <branch-name> 是新创建的分支名。")]),t._v(" "),a("blockquote",[a("p",[t._v("7.如果没有冲突，合并成功后可以使用 git branch -d <branch-name> 命令删除新创建的分支，此时新创建的分支中的修改已经被合并到主分支中。")])]),t._v(" "),a("div",{staticClass:"language-git line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-git"}},[a("code",[t._v("git checkout -b <branch-name>\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 在该分支下进行代码修改")]),t._v("\ngit add .\ngit commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"<commit-message>"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 继续进行代码修改和提交，直到不需要再修改为止")]),t._v("\ngit checkout main\ngit merge <branch-name>\ngit branch -d <branch-name>\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])]),a("h3",{attrs:{id:"_6-3-脚本一键推送文件-git-push-bat"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-3-脚本一键推送文件-git-push-bat"}},[t._v("#")]),t._v(" 6.3 脚本一键推送文件(git-push.bat)")]),t._v(" "),a("div",{staticClass:"language-cmd line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('@echo off\n\nrem Add all changes to Git staging area\ngit add .\n\nrem Commit changes with a message\ngit commit -m "%1"\n\nrem Push changes to remote repository\ngit push\n\n')])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br")])]),a("p",[t._v("如何使用？")]),t._v(" "),a("blockquote",[a("p",[a("strong",[t._v('直接在文件夹中 git-push.bat   "注释就可以使用"')])])])])}),[],!1,null,null,null);a.default=n.exports}}]);