---
title: 'how to use wsl'
date: '2020-05-04T07:01:16+08:00'
tags:
    - other
    - wsl
    - win
categories:
    - HowToUse

---


<!-- TOC -->

- [1. WSL2 linux权限问题 chmod(): Operation not permitted](#1-wsl2-linux权限问题-chmod-operation-not-permitted)
  - [解决方法](#解决方法)

<!-- /TOC -->


# 1. WSL2 linux权限问题 chmod(): Operation not permitted

## 解决方法

最近在 WSL 下碰到PHP chmod(): Operation not permitted 这个问题，看起来是文件权限的问题，不过查看该文件的权限是 777，不知道是 Bug 还是什么原因导致的，Google 找了下，有说是 Windows 文件系统是 NTFS 的问题，Linux 挂载需要开启一些特性，解决办法是更改 wsl.conf文件。

```
sudo vim /etc/wsl.conf
```

添加挂载磁盘的一些默认设置。

```

# 2. 添加下面内容

[automount]
enabled = true
root = /mnt/
options = "metadata,umask=22,fmask=111"
mountFsTab = true
[filesystem]
umask = 022

```
更改重启之后，一些文件的权限会改为跟 Linux 权限一样，不再是默认的全部 777 了。

```
# 管理员权限启动windows cmd命令行
net.exe stop LxssManager
```


