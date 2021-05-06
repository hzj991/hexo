---
title: 'PHP[OOP入门]PH19-BOM、表单'
date: '2017-01-01T09:02:19+08:00'
tags:
    - php
categories:
    - php

---



> 该部分为 php 面向对象的入门部分，较为肤浅且参杂过分已经不是主流的知识。

> 这是我早期的 php 学习笔记，php 的学习版本版本是 5.6、7，🐟2020/05/06年从有道笔记导出至此。


day19-BOM、表单

\<html\>

\<head\>

\<meta charset=\'utf-8\'\>

\</head\>

\<body\>

\</body\>

\</html\>

BOM：browser object model 没有标准

window的属性和方法

document

history

location

navigator

event

setInterval

setTimeout

DOM：document object model w3c(标准统一)

1、事件

事件绑定

addEventListener(事件 \'click\', 方法) 主流浏览器

attachEvent(事件 \'onclick\', 方法) 垃圾(ie)浏览器

removeEventListener

detachEvent

事件对象

事件映射到js中也是一个对象，这个对象的获取方法不一样

主流获取对象方式：在闭包中写一个参数ev

ie浏览器获取方式：是window的一个属性 window.event

//兼容性写法获取事件对象

var oEvent = ev \|\| event;

取消事件冒泡 cancelBubble\\stopPropagation()

上面两个都是event事件的属性和方法

cancelBubble：属性设置为true 均可以

stopPropagation()：方法 谷歌、火狐可以，ie不可以

子对象绑架父对象

事件源对象

srcElement 谷歌和ie可以 火狐不可以

target 谷歌和火狐可以 ie不可以

拖拽效果

获取鼠标的x和y坐标

oEvent.clientX, oEvent.clientY

键盘事件

event.keyCode

2、小游戏

3、小知识点

禁止鼠标右键（oncontextmenu）

超链接和点击事件同时触发

表单里面的 type=submit有默认提交的功能，也可以阻止

return false; //万能方法

下面两个有的不行，慎重使用

oEvent.returnValue=false

oEvent.preventDefault()

4、window对象

打印效果

window.print();

弹窗效果：window.alert\\window.confirm\\window.prompt

打开和关闭

open

close

history

back()

go()

location

href,protocol,hostname,port,pathname,search

location.href

reload();

navigator

navigator.appName　　 Web浏览器全称 都是netscape

navigator.appVersion　　Web浏览器厂商和版本的详细字符串

navigator.userAgent　　 客户端绝大部分信息

navagator.platform　　　浏览器运行所在的操作系统

5、正则对象

简单

6、表单对象

三种查找方法

submit()方法

method属性

action属性

失去焦点得到焦点

js验证表单内容

附加功能：

积分功能：黄瓜5 西瓜3 葡萄1

吃完：弹出小红旗

开始：10 ====》（20-100）

封装pdo版本的model类
