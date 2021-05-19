---
title: 我的2021
toc: true
date: 2021-01-28 12:06:35
top: 9
tags:
  other
  blog
categories:
  other
thumbnail: /images/2021/岁月的童话2.jpg
---

![岁月的童话](/images/2021/岁月的童话1.jpg)

![岁月的童话](/images/2021/岁月的童话2.jpg)

<!--more-->

<!-- TOC -->

- [2021/05/19 星期三](#20210519-星期三)
- [2021/05/16 星期日](#20210516-星期日)
- [2021/05/03 星期一](#20210503-星期一)
- [2021/04/36 星期一](#20210436-星期一)
- [2021/04/24 星期六 去参加扶风国王子的婚礼](#20210424-星期六-去参加扶风国王子的婚礼)
- [2021/04/17 星期六](#20210417-星期六)
- [2021/04/09 星期五](#20210409-星期五)
- [2021/04/08 星期四](#20210408-星期四)
- [2021/04/04 清明节](#20210404-清明节)
- [2021/03/28 星期日](#20210328-星期日)
- [2021/03/27 星期六](#20210327-星期六)
- [2021/03/26 星期六](#20210326-星期六)
- [2021/03/17 星期三](#20210317-星期三)
- [2021/03/17 星期二](#20210317-星期二)
- [2021/03/12 星期五](#20210312-星期五)
- [2021/03/08 星期一](#20210308-星期一)
- [2021/02/24 星期三](#20210224-星期三)
- [2021/02/19 星期五](#20210219-星期五)
- [2021/02/15 星期一](#20210215-星期一)
- [2021/01/30 星期六](#20210130-星期六)
- [2021/01/28 星期四](#20210128-星期四)

<!-- /TOC -->


# 2021/05/19 星期三

旧代码中的高级代码的存留问题

# 2021/05/16 星期日

**知乎收藏夹整理大作战**  

[pacvim](https://github.com/jmoon018/pacvim)  
>  PacVim：一个学习 vim 命令的命令行游戏
	


# 2021/05/03 星期一

宅了三天，晚上去了一趟东方明珠

![东方明珠2](/images/2021/东方明珠2.jpg)
![陆家嘴_商店高达](/images/2021/陆家嘴_商店高达.jpg)
![陆家嘴_商店高达2](/images/2021/陆家嘴_商店高达2.jpg)

# 2021/04/36 星期一

wsl2 不夸系统访问 io 表现正常

# 2021/04/24 星期六 去参加扶风国王子的婚礼

去参加扶风国王子的婚礼

# 2021/04/17 星期六

终于是个平安的周末，进行了入职体检

# 2021/04/09 星期五

去了发热门诊


# 2021/04/08 星期四

晚上发烧了，睡得很热

# 2021/04/04 清明节 

今天体检机构放假，所以需要下周体检了

# 2021/03/28 星期日

早上初试，下午复试，结束的比较早，坐飞机回上海了
  
# 2021/03/27 星期六

早上出发，晚上9点到达兰州，10点入住，背了背题

# 2021/03/26 星期六

接到调剂信息，购买了去兰州的票

# 2021/03/17 星期三

# 2021/03/17 星期二

去看了传说中的木核老师

# 2021/03/12 星期五
# 2021/03/08 星期一

面了4天半，下雨挺多的

# 2021/02/24 星期三

> 嚯，原来是你小子

今天用 `gin+gorm` 组合来进行压测，结果基本上是没法测试。一开始以为是链接未关闭导致的阻塞。但是没有数据库请求的链接是没有问题的。各种工具试了一遍。一开始是`bombardier`压测，后来用`ab`测试，都是跟抽筋一样。最后查的`mysql`连接数。  
如下
```sh
mysql>  show status like "%connect%";
+-------------------------------------------------------+---------------------+
| Variable_name                                         | Value               |
+-------------------------------------------------------+---------------------+
| Aborted_connects                                      | 1                   |
| Connection_errors_accept                              | 0                   |
| Connection_errors_internal                            | 0                   |
| Connection_errors_max_connections                     | 0                   |
| Connection_errors_peer_address                        | 0                   |
| Connection_errors_select                              | 0                   |
| Connection_errors_tcpwrap                             | 0                   |
| Connections                                           | 172                 |
| Locked_connects                                       | 0                   |
| Max_used_connections                                  | 27                  |
| Max_used_connections_time                             | 2021-02-24 00:14:24 |
| Mysqlx_connection_accept_errors                       | 0                   |
| Mysqlx_connection_errors                              | 0                   |
| Mysqlx_connections_accepted                           | 0                   |
| Mysqlx_connections_closed                             | 0                   |
| Mysqlx_connections_rejected                           | 0                   |
| Performance_schema_session_connect_attrs_longest_seen | 128                 |
| Performance_schema_session_connect_attrs_lost         | 0                   |
| Ssl_client_connects                                   | 0                   |
| Ssl_connect_renegotiates                              | 0                   |
| Ssl_finished_connects                                 | 0                   |
| Threads_connected                                     | 26                  |
+-------------------------------------------------------+---------------------+
```
但是我gorm里面设置的链接数为100，导致数据库连接出现了阻塞。将连接数调小之后，压测顺利进行。因为最后设置的为20。数据尚可。
扩大`mysql`的链接数后，应该可以更多。

# 2021/02/19 星期五

> 今天晚上可是算blogs好好整理了一波

[欢迎来到超级微小的编译器!](https://github.com/jamiebuilds/the-super-tiny-compiler)

[中文翻译版](https://github.com/YongzeYao/the-super-tiny-compiler-CN)

> 代码作妖记

go 的 `add(1)(2)(3)` 算是写出来了。就是混入了一些奇怪的东西

```go

package main
func main(){
  fmt.Println(add(1,2,3).(func(n ...int) interface{})(1).(func(n ...int) interface{})(2).(func(n ...int) interface{})().(int))
}

func add(n ...int) interface{} {
	if len(n)==1 {
		return n[0]
	} else {
		sum:=0
		for _,value:=range n{
			sum+=value
		}
		return func(newN...int) interface {}{
			newN = append(newN,sum)
			return add(newN...)
		}
	}
}
```

# 2021/02/15 星期一

嚯，今天用[https://github.com/oxequa/realize](https://github.com/oxequa/realize),这个工具可真是一波三折，`go get` 后提示依赖有问题，issue里面有人也提出这个问题，是关闭GO111MODULE,反正我用了，还是无效，他的那个依赖在 `gopkg.in`直接打开地址也是404，最后还是对master的代码`git clone`+`go install`一把梭。不过看了本地的许多包，好像都是把所有的tag都拉取下来了。不知道这个设计的摸底是为了啥。
问题解决了，很好。

# 2021/01/30 星期六

> 只有记性好的人才会记得自己忘记了什么，而记性差的人是不记得自己忘记了什么

# 2021/01/28 星期四

> 下午好困

picgo感觉很不稳定，与其在picgo的基础基于github上做一个图库，倒不如直接本地用单文件做一个web服务进行更全面的管理。定制化更高。个人使用的话，应该不会超过1w张图吧。过去qq空间的图片乱七八糟拍了很多年的数量估计。数量应该不会有巨大影响。

> 多则惑少则得
 
今天上午整理了一下之前的博客，因为都是断断续续写的，所以比较零散。有的也比较重复文章太多导致有些时候查找起来不是很方便，有些分类已经随着各种零散记录的增加变得不再合。所以做了一些合并，整理成了 **how to use** 这个分类，当然以后其他的记录可能会变成篇少字多方便查阅。

y~~
![how_to_use](https://cdn.jsdelivr.net/gh/hzjoyous/pic-respository/image/20210128/1611838098704.png)
