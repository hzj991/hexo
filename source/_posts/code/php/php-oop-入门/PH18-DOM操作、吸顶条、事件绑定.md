---
title: 'PHP[OOP入门]PH18-DOM操作、吸顶条、事件绑定'
date: '2017-01-01T09:02:18+08:00'
tags:
    - php
categories:
    - php

---



> 该部分为 php 面向对象的入门部分，较为肤浅且参杂过分已经不是主流的知识。

> 这是我早期的 php 学习笔记，php 的学习版本版本是 5.6、7，🐟2020/05/06年从有道笔记导出至此。


day18-DOM操作、吸顶条、事件绑定

\<html\>

\<head\>

\<meta charset=\'utf-8\'\>

\</head\>

\<body\>

\</body\>

\</html\>

1、全选、全不选、反选

2、处理className兼容

IETester(用来查看所有ie浏览器的兼容性)

//getElementsByName 必须是document对象

getElementById 必须是document对象

getElementsByTagName document和父对象都可以

getElementsByClassName document和父对象都可以

3、DOM节点操作

children 所有的子对象 (直接子节点)

parentNode 父对象

火狐或者谷歌

firstElementChild 长子

lastElementChild 老幺

previousElementSibling 哥哥

nextElementSibling 弟弟

IE 6/7/8

firstChild

lastChild

previousSibling

nextSibling

tagName //得到标签名，得到的为大写的标签名

4、添加删除节点

createElement 添加节点 只能通过document来添加

removeChild 删除节点 父对象或者document都可以

appendChild 追加节点

insertBefore 插入节点

div中添加图片

5、setAttribute getAttribute

通过点和中括号只能获取官方属性

通过上面两个可以获取自定义的和官方的

6、添加上传文件

7、弹出图片

8、吸顶条

offsetTop 距离顶部的值

offsetLeft 距离左边的值

offsetWidth 宽度

offsetHeight 高度

以上属性，只能读取，不能设置

onscroll事件

clientWidth : 在h5标准下，获取使用documentElement 不在的话使用body

clientHeight : 在h5标准下，获取使用documentElement 不在的话使用body

document.body.scrollTop : 获取卷起的高度

吸顶条实现

吸顶条抖动问题

9、右底部广告、短信倒计时

右下角弹出大娟

思考：qq头像资料
