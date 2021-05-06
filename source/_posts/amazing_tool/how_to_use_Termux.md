---
title: 'how to use Termux'
date: '2020-01-09T01:01:21+08:00'
tags:
    - linux
    - tool
categories:
    - HowToUse

---
<!-- TOC -->

- [Termux](#termux)
  - [起步](#起步)
  - [开启ssh](#开启ssh)
  - [安装环境](#安装环境)
- [最后](#最后)

<!-- /TOC -->

<!--more-->


# Termux  

Termux是一个Android下一个高级的终端模拟器, 开源且不需要root, 支持apt管理软件包，十分方便安装软件包, 完美支持Python, PHP, Ruby, Go, Nodejs, MySQL等。随着智能设备的普及和性能的不断提升，如今的手机、平板等的硬件标准已达到了初级桌面计算机的硬件标准, 用心去打造完全可以把手机变成一个强大的工具.

## 起步

安装Termux，推荐google play

更换清华源 
```
sed -i 's@^\(deb.*stable main\)$@#\1\ndeb https://mirrors.tuna.tsinghua.edu.cn/termux stable main@' $PREFIX/etc/apt/sources.list
apt update && apt upgrade
```

[Termux 镜像使用帮助](https://mirror.tuna.tsinghua.edu.cn/help/termux/)

## 开启ssh

手机端

```
# 安装服务
apt install openssh
# 开启服务
sshd
# 导入公钥
cat id_rsa.pub >> authorized_keys
# 查看ip
ifconfig -a
# 查看用户
whoami
```

客户端（pc）
```
ssh xxx@xxx.xxx.xxx.xxx -p 8022
```


[通过ssh登录到手机 Termux](https://www.cnblogs.com/abeen/p/9911987.html)

##  安装环境

默认环境目录结构与常用ubuntu，centos目录不同，且apt有些使用上的其他问题，采取使用proot使用ubuntu，termux可运行htop等，proot中不可运行htop等

```
apt install wget proot
apt install screenfetch
mkdir -p ~/jails/ubuntu
cd ~/jails/ubuntu
wget https://raw.githubusercontent.com/Neo-Oli/termux-ubuntu/master/ubuntu.sh
chmod +x ubuntu.sh
./ubuntu.sh
./start-ubuntu.sh
```


进入 ubuntu 

```
# 忽略每次出现的提示
root@localhost:~# touch ~/.hushlogin
apt update
apt install vim software-properties-common
```
[安卓上用Termux终端模拟器安装MC Forge 1.12.2服务器!](https://www.wandouip.com/t5i108801/)
```
$ screenfetch

     ╲ ▁▂▂▂▁ ╱
       ▄███████▄
      ▄██ ███ ██▄        OnePlus_3T
     ▄███████████▄       OS: Android 8.0.0
  ▄█ ▄▄▄▄▄▄▄▄▄▄▄▄▄ █▄    Device: ONEPLUS A3010 (OnePlus3T)
  ██ █████████████ ██    ROM: ONEPLUS A3010_28_180621
  ██ █████████████ ██    Baseband: msm
  ██ █████████████ ██    Kernel: aarch64 Linux 3.18.66-perf+
  ██ █████████████ ██    Uptime:
     █████████████       CPU: Qualcomm Technologies, Inc MSM8996pro
      ███████████        GPU: Qualcomm Technologies, Inc MSM8996pro
       ██     ██         RAM: 2627MiB / 5739MiB
       ██     ██
```

安装环境php

```
add-apt-repository ppa:ondrej/php
apt-get update
apt-get install php7.4 php7.4-fpm php7.4-mysql php7.4-gd php7.4-mbstring
#(安装pecl的依赖忘记了，其他需要的扩展自行安装，使用pecl有点慢，不知道是不是编译的问题)
```

[[PHP] Ubuntu快速安装起PHP7.4](https://www.cnblogs.com/taoshihan/p/11795605.html)

安装node,从官网下载x64不行的话，下载arm包进行安装

```
wget https://npm.taobao.org/mirrors/node/v12.14.1/node-v12.14.1-linux-arm64.tar.xz
tar -xvf node-v12.14.1-linux-arm64.tar.xz
echo "
export PATH=$PATH:/usr/local/node/bin
export PATH=$PATH:/root/bin
" >> ~/.bashrc
source ~/.bashrc
```


```
apt install nginx
apt install php7.4-fpm
```

【注】linux下1024一下端口需要root权限，由于并不打算将手机进行root，所以需要改nginx.conf的server端口，同理上面ssh连接也没有使用22，而实使用的8022

nginx，php-fpm未进行调优，测试比较惨烈。测试swoole、node

rswoole.php

```
<?php
$http = new swoole_http_server("0.0.0.0", 8080);

$http->on("start", function ($server) {
            echo "Swoole http server is started at http://127.0.0.1:8080\n";
});

$http->on("request", function ($request, $response) {
            $response->header("Content-Type", "text/plain");
                $response->end("Hello World\n");
});

$http->start();
```

howtorun
```
php rswoole.php
```


node.js
```
//引入http模块
var http = require("http");
//设置主机名
var hostName = '0.0.0.0';
//设置端口
var port = 8080;
var server = http.createServer(function(req,res){
            res.setHeader('Content-Type','text/plain');
            res.end("hello nodejs");

});
server.listen(port,hostName,function(){
            console.log(`服务器运行在http://${hostName}:${port}`);
});
```

howtorun

```
node node.js
```


在同一局域网中进行压测
swoole
```
PS D:\WorkSpace\GoPath\bin> .\bombardier.exe -c 1000 -n 1000000 "http://192.168.0.103:8080/"
Bombarding http://192.168.0.103:8080/ with 1000000 request(s) using 1000 connection(s)
 1000000 / 1000000 [=========================================================================================================================================================================] 100.00% 14853/s 1m7s
Done!
Statistics        Avg      Stdev        Max
  Reqs/sec     14888.71    6029.68   39199.76
  Latency       67.08ms    65.80ms      7.18s
  HTTP codes:
    1xx - 0, 2xx - 1000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:     3.29MB/s
```

头一次node和swoole差这么大，不知道环境哪里影响了。

```
PS D:\WorkSpace\GoPath\bin> .\bombardier.exe -c 1000 -n 1000000 "http://192.168.0.103:8080/"
Bombarding http://192.168.0.103:8080/ with 1000000 request(s) using 1000 connection(s)
 1000000 / 1000000 [=========================================================================================================================================================================] 100.00% 6135/s 2m42s
Done!
Statistics        Avg      Stdev        Max
  Reqs/sec      6135.45    1840.50   30283.66
  Latency      162.87ms    69.88ms      9.53s
  HTTP codes:
    1xx - 0, 2xx - 1000000, 3xx - 0, 4xx - 0, 5xx - 0
    others - 0
  Throughput:     1.19MB/s
```

# 最后

```
root@localhost:~# screenfetch
awk: cannot open /proc/fb (Permission denied)
                          ./+o+-       root@localhost
                  yyyyy- -yyyyyy+      OS: Ubuntu 19.04 disco
               ://+//////-yyyyyyo      Kernel: aarch64 Linux 3.18.66-perf+
           .++ .:/++++++/-.+sss/`      Uptime:
         .:++o:  /++++++++/:--:/-      Packages: 372
        o:+o+:++.`..```.-/oo+++++/     Shell: bash 5.0.3
       .:+o:+o/.          `+sssoo+/    CPU: 4x Qualcomm Technologies, Inc MSM8996pro
  .++/+:+oo+o:`             /sssooo.   GPU:
 /+++//+:`oo+o               /::--:.   RAM: 2487MiB / 5739MiB
 \+/+o+++`o++o               ++////.
  .++.o+++oo+:`             /dddhhh.
       .+.o+oo:.          `oddhhhh+
        \+.++o+o``-````.:ohdhhhhh+
         `:o+++ `ohhhhhhhhyo++os:
           .o:`.syhhhhhhh/.oo++o`
               /osyyyyyyo++ooo+++/
                   ````` +oo+++o\:
                          `oo++.
```
某问题的啦
<!--more-->

