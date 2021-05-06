---
title: 'PHP[入门]P07-PHP初认识'
date: '2017-01-01T09:01:07+08:00'
tags:
    - php
categories:
    - php

---

<!-- TOC -->

- [day07PHP初认识](#day07php初认识)
  - [PHP运行原理](#php运行原理)
  - [wampServer使用介绍](#wampserver使用介绍)
  - [访问](#访问)
  - [php文件格式与语法格式](#php文件格式与语法格式)
  - [变量](#变量)
  - [打印 输出](#打印-输出)
  - [数据类型](#数据类型)

<!-- /TOC -->

<!-- more -->

> 这是我早期的 php 学习笔记，php 的学习版本版本是 5.6、7，🐟2020/05/06年从有道笔记导出至此。


# day07PHP初认识

PHP：Hypertext Preprocessor 超文本预处理器

## PHP运行原理

运行在服务器端的脚本语言 可以内嵌在html中

必须要有的，服务器（apache） 数据库（mysql） php引擎

集成开发环境:

PHPstudy WAMPServer XAMPP

运行

## wampServer使用介绍

修改`www/index.php`

```php
$projectContents .= 'http://localhost/'.$file.$UrlPort.'/"';
$projectContents .= 'http://localhost/'.$UrlPort.'/'.$file.'/"';
```

www是放我们写的php文件 必须都放在www

运行:禁止双击

修改完配置文件不管是php.ini还是我们的httpd.conf都要重启服务

重新安装bbs

第一步:去install.lock 删除掉

第二步：数据库名字不要跟上次一样

phpinfo(); php扩展和配置信息等

## 访问

localhost 本机主机名

127.0.0.1 本机ip

局域网访问：Require all granted

第一步：关闭防火墙

第二部：修改apache `wamp64\bin\apache\apache2.4.17\conf\httpd.conf`

看自己的ip地址:

控制台 `cmd->ipconfig->ipv4` 就是你的ip地址

PHP是模块化的引擎

## php文件格式与语法格式

标准风格 `<?php 中间是php代码 ?>` 但是去过这个文件是纯 php 代码的时候 `<?php`

段标记风格 `<? ?>` 修改`php.ini` 将 `short_open_tag=on` 重启服务(一般不使用 知道记住就行)

简写风格:`<?= 1;?>` 等价 `<?php echo 1;?>`

`$_SERVER['REMOTE_ADDR'];` 获取当前访问用户的ip地址

`$_SERVER['HTTP_REFERER'];` 上一级页面的地址（父级）上一级页面的来源地址

注释：

`/* 中间是注释这是块注释 */`

`//` 单行注释

`#` 单行注释

每条语句结束加上`;`

## 变量

在程序的运行中可以存储值的 在程序的运行中其值改变的

声明变量:

必须以`$`开始

变量名是自定义的

规则：

以数字，字母，下划线组成  
不能以数字开始  
变量名严格区分大小写  

说明:  
变量名要见名识意思（首选英文，就用全拼）   
驼峰命名法 `$Name` `$userName`  
下划线命名法 `$user_name`  

四种操作:

定义: `$num = 5;`  
改变值：直接赋值 `$num = 10;`  
干掉变量: `unset(变量名);`  
判断这个变量是否存在:`isset(变量名);`  

## 打印 输出

`echo` :不是函数 是语法结构 输出变量值 输出多个变量用逗号隔开

`print()`:打印一个变量 一般不使用 print \$num;

`print_r()`：可以打印一个变量或者一个数组 同样也不经常使用但是要知道

`var_dump()`:打印一个变量或者一个数组时候经常使用
因为会打印出详细信息包括数据的类型和值 经常使用的

## 数据类型

标量：

整型：int integer 负数也是 就是整数

浮点: float/double 就是小数 科学计数法

【注】千万尽量不要用浮点型数作比较

布尔：bool boolean

false 等价于 0  
true 等价于 1  

一般用于判断的时候

eg: 

```php
$num = false;

if ($num) {

echo 111;

}
```

字符串: str string

用单引号跟双引号引起来的都是字符串

单引号和双引号的区别：

- 双引号解析变量，单引号不解析变量
- 单引号效率比双引号高 （建议能用单引号，就不用双引号）
- 双引号中放变量的时候 要有分隔符（推荐完美用{}）
- 双引号中不能有双引号，单引号中不能有单引号 如果需要的话请转义
- 单双引号可以相互嵌套 原样输出
- 单引号不转义字符 支持`\\` `\'`
- 双引号支持转义字符 eg：`\n` `\r`
- 双引号中使用单引号引起来变量会被解析

拼接字符串：

用口水`'.'` 拼接

eg:

`$str="wwww'$str1'";`

定界符:"heredoc"
```php
$str = <<<"ABCD"

bug是不易被发"现"你们经常出现的是错误dwjhrke

ABCD;

[注]:相当于双引号的字符串 但是这里面支持使用双引号

'nowdoc'

$str = <<<'ABCD';
```

```
bug是不易被发'现'你们经常出现的是错误

dwjhrke

ABCD;
```


**注**:开始必须有<<<'ASS' 结尾必须顶格

混合(复合)：

数组 `array` 一组数据的集合

对象 `object` 一组有关系的数据个体

特殊：

空 `null` ：空就是null null就是空

产生 `null` 的三种方式

1.直接给变量赋值为 `null`

2.直接定义一个空变量 eg:`$num`;

3.`unset()`;直接干掉

资源:`resource`

`gettype()`

`empty()`

`empty` 和 `isset` 的区别

程序的执行流程:默认从上到下执行

思考，查阅：

`echo`和`print` ,`print_r`的区别？
