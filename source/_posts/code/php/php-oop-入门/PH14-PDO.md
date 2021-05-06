---
title: 'PHP[OOP入门]PH14-PDO'
date: '2017-01-01T09:02:14+08:00'
tags:
    - php
categories:
    - php

---



> 该部分为 php 面向对象的入门部分，较为肤浅且参杂过分已经不是主流的知识。

> 这是我早期的 php 学习笔记，php 的学习版本版本是 5.6、7，🐟2020/05/06年从有道笔记导出至此。


day14-PDO

1、概述

pdo就是用来连接数据库的 mysqli是用来连接数据库的

使用pdo可以连接其他的数据库，连接方法不变

pdo可以用来连接所有的数据库，但是前提你要安装对应的驱动

pdo的扩展库 mysql和pdo的驱动

mysql oracle sqlserver

2、使用（手册）

3个类 PDO PDOStatement PDOException

连接

try {

\$dsn = \'mysql:host=localhost;dbname=fen;charset=utf8\';

//如果连接失败。pdo内部会自动的抛出异常

\$pdo = new PDO(\$dsn, \'root\', \'1234567\');

echo \'连接数据库成功\<br /\>\';

} catch (PDOException \$e) {

echo \$e-\>getMessage();

}

获取和设置信息

setAttribute

在下面讲解pdo的时候设置看看

getAttribute

可以获取一些信息，都是pdo为我们提供的常量

PDO::ATTR\_AUTOCOMMIT

PDO::ATTR\_CLIENT\_VERSION

PDO::ATTR\_SERVER\_INFO

PDO::ATTR\_DRIVER\_NAME

错误模式

默认模式：pdo有两个方法供我们使用 errorCode errorInfo

警告模式：\$pdo-\>setAttribute(PDO::ATTR\_ERRMODE,
PDO::ERRMODE\_WARNING);

异常模式：\$pdo-\>setAttribute(PDO::ATTR\_ERRMODE, PDO::ERRMODE\_);

我们需要将sql语句的执行放到try中来执行

PDO执行sql语句

query=\>查询=》要结果集的

返回的是PDOStatement对象，可以通过遍历对象查看所有结果，该结果关联和索引都有

exec=\>增删改=》不要结果集的，要受影响的行数

事务处理

什么叫做事务？

wo 0+500

li 1000-500

这两条语句必须都执行成功才能完成交易，如果有一条语句失败，那么交易就失败，所有的状态都要恢复（回滚）。这种就叫做一个事务

myisam:不支持

innodb:支持事务

小利给爱斌转500块钱

PDO::beginTransaction --- 启动一个事务

PDO::commit --- 提交一个事务

PDO::rollBack --- 回滚一个事务

预处理类 预处理语句

优点：效率、安全（sql注入）

PDOStatement

prepare 预处理sql语句

execute 执行sql语句

增删改

查（结果集）

PDO::FETCH\_BOTH

PDO::FETCH\_ASSOC

PDO::FETCH\_NUM

PDO::FETCH\_OBJ

setFetchMode 设置默认的提取模式

绑定列(了解)

3、虚拟主机

1、点击配置

2、在 httpd.conf 中，将下列打开

vhost\_alias\_module

rewrite\_module

Include conf/extra/httpd-vhosts.conf
