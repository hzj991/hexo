---
title: 'PHP[OOP入门]PH16-DOM操作、事件、选项卡'
date: '2017-01-01T09:02:16+08:00'
tags:
    - php
categories:
    - php

---



> 该部分为 php 面向对象的入门部分，较为肤浅且参杂过分已经不是主流的知识。

> 这是我早期的 php 学习笔记，php 的学习版本版本是 5.6、7，🐟2020/05/06年从有道笔记导出至此。


day16-DOM操作、事件、选项卡

\<html\>

\<head\>

\<meta charset=\'utf-8\'\>

\</head\>

\<body\>

\</body\>

\</html\>

数组声明

声明方式数字下标

var arr1 = \[\'张国荣\', \'林俊杰\', \'beyond\', \'陈奕迅\'\];

这种就是索引数组，js中没有关联数组

追加方式字符串下标

arr1\[\'kobe\'\] = 24;

可以通过这种方式给数组对象增加属性，就类似于php中的关联数组

获取数组长度

arr.length 但是只能获取索引数组的长度

数组遍历：for for in

for 只能遍历索引数组

for in 会遍历数组中所有的键

数组常用方法：push pop shift unshift join reverse slice

arr1.push

对象创建三种方法

Object

json格式

json\_encode

json\_decode

function

1、js核心

css有很多属性，我们通过js找到对应的对象。然后为事件添加一些对应的方法，再触发这个事件的时候，就会执行对应的方法

事件是官方为我们提供好的

方法是需要我们自己写的

2、DOM操作（document object model）文档对象模型

document.getElementById()

根据id找到对象，根据需求（哪些事件）修改对象的属性即可

3、常用事件

onmouseover 鼠标悬停事件

onmouseout 鼠标离开

onmouseup 鼠标弹出

onmousedown 鼠标按下

onmousemove 鼠标移动

onclick 点击事件

ondblclick 双击事件

onblur input框 失去焦点

onfocus 得到焦点

4、简单效果

获取对象属性，获取对象的style

获取类名：oDiv.className

获取宽度：oDiv.style.width

获取背景色: oDiv.style.backgroundColor

css中带杠的，在js中属性名变为小驼峰

获取标签文本

innerHTML:获取标签和内容

innerText：只获取文本信息

点和中括号区别

点： 只能获取对象已有的属性，点后面只能根存在的属性名

中括号：都可以。

使用点的地方肯定可以使用中括号，使用中括号的地方不一定能使用点

添加事件

多种方法，看代码

显示隐藏图片

控制div的display属性， none block之间修改即可

this

就是当前对象，可以通过方法直接传递过去 onclick=\"change(this)\"

表单内容控制（onblur、onfocus）

onload加载

当整个页面加载结束之后，调用window.onload方法

点击事件的函数都要写在onload的外面，否则找不到该方法

5、通过className Name Tag获取对象

getElementById

document.getElementsByClassName //得到的是一个集合，下标从0开始

document.getElementsByName

document.getElementsByTagName 这些得到的都是集合，需要通过下标来依次访问

6、选项卡、滑动门(重点)

8、获取非行内样式
