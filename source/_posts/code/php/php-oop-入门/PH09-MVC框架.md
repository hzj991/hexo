---
title: 'PHP[OOP入门]PH09-MVC框架'
date: '2017-01-01T09:02:09+08:00'
tags:
    - php
categories:
    - php

---



> 该部分为 php 面向对象的入门部分，较为肤浅且参杂过分已经不是主流的知识。

> 这是我早期的 php 学习笔记，php 的学习版本版本是 5.6、7，🐟2020/05/06年从有道笔记导出至此。


day09-MVC框架

1、mvc概念

model view controller

2、psr规范

psr1：基础编程规范

psr2：编码风格规范

psr3：日志接口规范

psr4：自动加载规范

3、单一入口（简单路由）

index.php?m=index&a=index

pathinfo index.php/index/index

spl\_autoload\_register

\_\_autoload(\$className)

4、框架目录架构

app

model

UserModel.php

view

user

login.html

register.html

index

index.html

about.html

controller

Controller.php

UserController.php

IndexController.php

config

config.php

vendor

lib

Model.php

Page.php

Tpl.php

public

css

js

fonts

editor

cache

缓存

5、命名空间映射

将命名空间和目录结构对应起来叫做命名空间映射

今天的代码命名空间的映射是一一对应的，大家可以自己改进代码，将一个命名空间对应多个目录？

\'model\' =\> \'app/model/\'

\'model\\test\' =\> \'app/model/lala\'

\'controller\' =\> \'app/controller/\'

\'vendor\' =\> \'vendor/lib\'

6、MarkDown介绍
