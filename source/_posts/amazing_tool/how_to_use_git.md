---
title: how to use git
toc: true
date: 2020-01-28 11:20:57
tags:
  - git
  - blog
categories:
  - HowToUse

---

<!-- TOC -->

- [git config set](#git-config-set)
- [git 代理的设置和取消](#git-代理的设置和取消)
- [初始化仓库提交并push至远程仓库](#初始化仓库提交并push至远程仓库)
- [切换远程分支](#切换远程分支)
- [使用 vimdiff 进行 git diff](#使用-vimdiff-进行-git-diff)
- [清除提交记录缓存](#清除提交记录缓存)
- [win下换行问题处理](#win下换行问题处理)
- [如果经常产生文件属性变更的情况，可以设置](#如果经常产生文件属性变更的情况可以设置)
- [几乎所有的 git 撤销](#几乎所有的-git-撤销)
- [如何使用 vimdiff 来 git diff /svn diff](#如何使用-vimdiff-来-git-diff-svn-diff)
- [账号修改后推送拉取问题](#账号修改后推送拉取问题)
- [oh-my-zsh git 慢/卡顿问题解决](#oh-my-zsh-git-慢卡顿问题解决)
- [账号每次输入问题](#账号每次输入问题)
- [同时push 多个地址](#同时push-多个地址)
- [dns 设置](#dns-设置)
- [rebase](#rebase)

<!-- /TOC -->

<!--more-->



# git config set
```sh
git config user.name 'github用户名'  
git config user.email '邮箱'  
```

# git 代理的设置和取消
```sh
git config --global http.proxy http://127.0.0.1:11000
git config --global https.proxy http://127.0.0.1:11000

git config --global --unset http.proxy
git config --global --unset https.proxy
```

# 初始化仓库提交并push至远程仓库

```sh
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:hzj991/hexo.git
git push -u origin master
```

# 切换远程分支

```sh
git remote rm origin
git remote add origin git@github.com:hzj991/hexo-next.git
git push --set-upstream origin master
```

# 使用 vimdiff 进行 git diff

```sh
git config --global diff.tool vimdiff
git config --global difftool.prompt false
git config --global alias.d difftool
```
# 清除提交记录缓存

```sh
git rm --cached application.log
git rm -r --cached .  
git add .gitignore  
git commit -m "update .gitignore"  
git remote add origin git@23123.com
git remote prune origin
#也就是说你可以刷新本地仓库与远程仓库的保持这些改动的同步
```

# win下换行问题处理

> 如果是linux和windows混合开发，很容易会遇到行尾换行符的问题，windows下默认是\r\n，linux下是\n。如果没做处理，git提交时很有可能产生问题，解决办法为设置git config的 core.autocrlf，
```sh
git config --global core.autocrlf true # 表示自动更换crlf，windows下如果checkout是\n，则自动换为\r\n，在提交时在自动换回\n
git config --global core.autocrlf input # 自动把\r\n换为\n
git config --global core.autocrlf false # 就是不作处理
# 如果已经产生了\r\n，merge时产生问题，可以设置
git config merge.renormalize true # merge时忽略行尾对比
如果只需要执行一次merge可以是用命令
git merge -s recursive -X ignore-space-at-eol origin/master
# 还可以设置crlf安全检查
git config --global core.safecrlf true # 禁止提交混合\n和\r\n的文件
git config --global core.safecrlf false # 允许提交
git config --global core.safecrlf warn # 提交时产生警告
```

# 如果经常产生文件属性变更的情况，可以设置
git config --global core.filemode false

# [几乎所有的 git 撤销](http://blog.jobbole.com/87700/)

```sh
cd /home/users/hzj/tmpgit/web/                                                                                                                                                                                
git checkout master                                                                                                                                                                                                 
oldTimetime=$(date -d "3 days ago" +%Y_%m_%d_%H)                                                                                                                                                                    
git branch -d hotfix/hzj/${oldTimetime}                                                                                                                                                                       
git push origin --delete hotfix/hzj/${oldTimetime}                                                                                                                                                            
git pull                                                                                                                                                                                                            
time=$(date "+%Y_%m_%d_%H")                                                                                                                                                                                         
branchName=hotfix/xxx/${time}                                                                                                                                                                                 
git checkout -b ${branchName}                                                                                                                                                                                       
git pull                                                                                                                                                                                                            
git push origin ${branchName}:${branchName}     
```


# 如何使用 vimdiff 来 git diff /svn diff

```sh
#git 如何实现vimdiff
git config --global diff.tool vimdiff
git config --global difftool.prompt false
git config --global alias.d difftool
```


# 账号修改后推送拉取问题

原因：将gitee和github的登录邮箱更换了，导致推送代码出现认证失败，需要重置账号密码

> 执行权限不够可以切换至管理员权限执行

```
git config --system --unset credential.helper
```


# oh-my-zsh git 慢/卡顿问题解决

设置 oh-my-zsh 不读取文件变化信息（在 git 项目目录执行下列命令）
如果你还觉得慢，可以再设置 oh-my-zsh 不读取任何 git 信息
```
git config --global --add oh-my-zsh.hide-dirty 1

git config --add oh-my-zsh.hide-status 1
```

# 账号每次输入问题
如果我们git clone的下载代码的时候是连接的https://而不是git@git (ssh)的形式，当我们操作git pull/push到远程的时候，

总是提示我们输入账号和密码才能操作成功，频繁的输入账号和密码会很麻烦，也特别烦恼。
```
git config --global credential.helper store
```

# 同时push 多个地址

```
git remote set-url --add origin https://github.com/hzjoyous/SimpleHexoBlog.git

```
# dns 设置

```
查询dns
http://tool.chinaz.com/dns/
设置对应host
```


# rebase 
```
git pull --rebase 
git rebase xxxx
# 冲突解决后
git rebase --continue 
```