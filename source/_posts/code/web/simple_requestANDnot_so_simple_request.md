---
title: 'simple request / not so simplerequest'
date: '2020-02-26T21:32:34+08:00'
tags:
    - other
    - Network protocol
categories:
    - knowledge
---



浏览器将CORS请求分成两类：简单请求 simple request 和非简单请求not-so-simple request。
只要同时满足以下两大条件，就属于简单请求。
```
（1) 请求方法是以下三种方法之一：
    HEAD
    GET
    POST
（2）HTTP的头信息不超出以下几种字段：   
    Accept
    Accept-Language
    Content-Language
    Last-Event-ID
    Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
```
那么对于非简单请求，浏览器会首先发送一个options嗅探。

这里不做示范。直接上一段php解决非简单请求的方法

```php
header("Access-Control-Allow-Headers:*")
```

直接设置会导致浏览器请求两次，所以还需要一些其他处理，防止重复请求

> 浏览器规定真。。。

<!--more-->


