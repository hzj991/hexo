---
title: 'php[023]bison--php使用的的词法分析器'
date: '2020-01-20T21:14:00+08:00'
tags:
    - bison
    - php
categories:
    - other

---



[bison](http://www.gnu.org/software/bison/)


Bison 是一个通用解析器生成器，用于将无上下文的带注的语法转换为使用LALR（1） 解析器表的确定性 LR 或广义 LR （GLR） 解析器。作为实验功能，Bison 还可以生成IELR（1） 或规范 LR（1） 解析器表。精通 Bison 后，您可以使用它开发各种语言解析器，从简单的桌面计算器中使用的解析器到复杂的编程语言。

比森与Yacc是向上兼容的：所有正确编写的Yacc语法都应该与比森一起工作，没有变化。任何熟悉 Yacc 的人都应该能够使用比森，但没有什么麻烦。您需要精通 C 或C++编程才能使用 Bison。Java 也作为实验功能得到支持。


<!--more-->


wget 下载步骤跳过 （ps:要下就下最新的）


```
cd bison-3.5
./configure --prefix=/home/h/bison/bison-output
make && make install
```


# 未完次日补充




