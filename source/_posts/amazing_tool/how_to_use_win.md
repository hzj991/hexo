---
title: how to use win
toc: true
date: 2021-01-28 11:05:19
tags:
  - win
  - blog
categories:
  - HowToUse
---



- [如何设置开机启动项](#如何设置开机启动项)
- [代理设置](#代理设置)
  - [cmd代理设置和恢复（win 下推荐使用 powershell）](#cmd代理设置和恢复win-下推荐使用-powershell)
  - [powershell代理设置](#powershell代理设置)
- [软件推荐](#软件推荐)
  - [TrafficMonitor](#trafficmonitor)
  - [Everything](#everything)
  - [pandoc](#pandoc)
- [net](#net)
  - [端口查看](#端口查看)



<!--more-->




# 如何设置开机启动项

windows 设置开启启动
除了设置注册表这种比较不够win的方式，还可以将执行文件的快捷方式放入启动目录，这样也可以做到开机启动
```
C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup
C:\Users\{usename}\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
注册表
```

# 代理设置

## cmd代理设置和恢复（win 下推荐使用 powershell）
```bat
set http_proxy=socks5://127.0.0.1:10010
set https_proxy=socks5://127.0.0.1:10010

set http_proxy_user=user
set http_proxy_pass=pass

set https_proxy_user=user
set https_proxy_pass=pass


set http_proxy=
set https_proxy=
```


## powershell代理设置
```ps1
Set-Item Env:http_proxy "http://127.0.0.1:1080"  
Set-Item Env:https_proxy "http://127.0.0.1:1080"


Remove-Item Env:http_proxy
Remove-Item Env:https_proxy
```

# 软件推荐

## TrafficMonitor 

> **TrafficMonitor 简介**
> Traffic Monitor是一款用于Windows平台的网速监控悬浮窗软件，可以显示当前网速、CPU及内存利用率，支持嵌入到任务栏显示，支持更换皮肤、历史流量统计等功能。

[github地址](https://github.com/zhongyang219/TrafficMonitor)
[download地址](https://github.com/zhongyang219/TrafficMonitor/releases)

## Everything

> 基于名称快速定位文件和文件夹。

[Everything-voidtools](https://www.voidtools.com/zh-cn/)




## pandoc 

一个word转md的软件

```sh
pandoc -s example.docx -t markdown -o example.md
```



# net

## 端口查看

```
netstat -ano
netstat -ano |findstr "端口号"
tasklist |findstr "进程id号"
# taskkill /f /t /im "进程id或者进程名称"
```


