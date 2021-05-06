---
title: how to use svn
toc: true
date: 2020-01-28 11:21:20
tags:
  - svn
  - blog
categories:
  - HowToUse

---

<!-- TOC -->

- [回滚](#回滚)
- [合并分支](#合并分支)
- [svn 根据提交人过滤 / sed 命令的使用](#svn-根据提交人过滤--sed-命令的使用)
- [匹配文件后缀为 .jpg 的文件并且删除](#匹配文件后缀为-jpg-的文件并且删除)
- [grep and kill](#grep-and-kill)
- [svn 如何实现vimdiff](#svn-如何实现vimdiff)

<!-- /TOC -->

<!--more-->



# 回滚
```sh 
svn merge -rhead:[old version] [file]
#将file 的 old 版本合并到当前 
```

# 合并分支
```sh
svn --dry-run merge -r51744:head svn://svn1.idc.xiaozhu.com/xiaozhu/webV2/branches/dev/r_neworderv2-hanzhijie-2018-09-13
#展示效果不实际执行
svn  merge -r51744:head svn://svn1.idc.xiaozhu.com/xiaozhu/webV2/branches/dev/r_neworderv2-hanzhijie-2018-09-13
#将指定svn -r51744 到head 的所有变化 合并到当前本地仓库
```



# svn 根据提交人过滤 / sed 命令的使用
```sh
svn log --limit 10 -v | sed -n '/username/,/-----$/ p' 
```

# 匹配文件后缀为 .jpg 的文件并且删除
```sh
find ./ -name '*.jpg'  | xargs rm 
```
# grep and kill
```sh
ps -ef|grep "zhaoyinfan/supervisor" | grep -v grep | awk '{print $1}' | xargs kill -9
```

# svn 如何实现vimdiff
```sh
vim ~/.subversion/config

diff-cmd = /usr/local/bin/svndiff
```

```sh
#!/bin/sh
#配置你喜欢的diff程序路径 svndiff
 DIFF="vimdiff"
#SVN diff命令会传入两个文件的参数 
 LEFT=${6}
 RIGHT=${7}
# 拼接成diff命令所需要的命令格式
 $DIFF $LEFT $RIGHT
```