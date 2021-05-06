---
title: 'PHP[OOP入门]PH21-ajax(灰常重要)'
date: '2017-01-01T09:02:21+08:00'
tags:
    - php
categories:
    - php

---



> 该部分为 php 面向对象的入门部分，较为肤浅且参杂过分已经不是主流的知识。

> 这是我早期的 php 学习笔记，php 的学习版本版本是 5.6、7，🐟2020/05/06年从有道笔记导出至此。


day21-ajax(灰常重要)

1、应用场景

asynchronous javascript and xml === ajax

注册用户的时候，要写用户名，写了用户名之后，只要你的光标离开这个input框，我就立马知道你这用户名是否被注册过（ajax）
让ajax去和服务器进行交互，交互完毕之后，收到服务器返回的结果，根据结果我再判断页面到底应该显示什么

页面没有刷新

在当前页面中通过ajax和服务器进行交互，达到局部刷新的效果

2、ajax使用

使用起来非常的简单，ajax就是js中的一个对象，通过调用这个对象的方法就完成了和服务器的交互

创建对象

谷歌、火狐、Opera、IE7以上

var xhr = new XMLHttpRequest(); //主流浏览器中创建ajax对象的方式

var xhr = new ActiveXObject("Microsoft.XMLHTTP"); //垃圾浏览器的方式

var xhr = new ActiveXObject("Msxml2.XMLHTTP");

var xhr = new ActiveXObject("Msxml2.XMLHTTP.3.0");

var xhr = new ActiveXObject("Msxml2.XMLHTTP.5.0");

var xhr = new ActiveXObject("Msxml2.XMLHTTP.6.0"); //IE维护的最高版本

get方式

xhr.open(\'get\', \'1.php?username=goudan&password=123\');

xhr.send();

post方式

xhr.open(\'post\', \'post.php\');

xhr.setRequestHeader(\'content-type\',
\'application/x-www-form-urlencoded\');

xhr.send(\'username=goudan&password=123\');

onreadystatechange ：当ajax状态改变的时候触发这个事件

readyState（01234） : ajax的状态

0：初始化

1：执行了open方法

2：执行了send方法

3：得到了部分响应数据

4：得到了全部的响应数据

这里面我们关心的就是4，到4的时候数据就过来了

status:http的状态码 200

responseText：现在都是使用这个

responseXML：这个现在已经不用了

将JSON字符串转化为js对象

//第一种方式

var obj = JSON.parse(xhr.responseText);

//第二种方式

var obj = eval(\'(\' + xhr.responseText + \')\');

将js对象转化为JSON格式的字符串

var str = JSON.stringify(obj);

3、ajax函数封装

encodeURIComponent

4、同步和异步

同步：前端在等待请求结果，结果来了之后代码再往下进行

异步：前端不等待请求结果，结果来了直接执行提前写好的回调函数即可

【注】事件绑定的代码我们都要写到open方法的上面。

5、跨域

localhost 127.0.0.1 不是同一个域

localhost www.wokao.com

(1)

在php文件中中写如下代码

header(\'Access-Control-Allow-Origin:\*\');

(2)jsonp json with padding

6、用户注册
