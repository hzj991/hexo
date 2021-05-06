---
title: 'PHP[入门]P01~06html'
date: '2017-01-01T09:01:01+08:00'
tags:
    - php
categories:
    - php

---



> 这是我早期的 php 学习笔记，php 的学习版本版本是 5.6、7，🐟2020/05/06年从有道笔记导出至此。

<!-- TOC -->

- [B/S和C/S的简单认识](#bs和cs的简单认识)
- [网页的工作原理](#网页的工作原理)
- [认识标签](#认识标签)
- [全局架构标签](#全局架构标签)
  - [body常用属性](#body常用属性)
  - [字体修饰标记(如下都是双边标记)](#字体修饰标记如下都是双边标记)
    - [排版标记](#排版标记)
  - [实体符号](#实体符号)
  - [无序列表](#无序列表)
  - [自定义列表](#自定义列表)
- [HTML再认识](#html再认识)
  - [URL](#url)
  - [超链接](#超链接)
  - [图片img](#图片img)
  - [音频 视频](#音频-视频)
  - [表格](#表格)
- [CSS初认识](#css初认识)
  - [CSS](#css)
  - [使用css的好处](#使用css的好处)
  - [css的三种链接方式](#css的三种链接方式)
    - [行内样式](#行内样式)
    - [内联样式](#内联样式)
    - [外部样式](#外部样式)
  - [css语法格式和注释](#css语法格式和注释)
  - [选择器](#选择器)
  - [尺寸设置](#尺寸设置)
- [CSS](#css-1)
  - [vertical-align](#vertical-align)
  - [背景](#背景)
  - [列表](#列表)
  - [布局](#布局)
  - [边框](#边框)
  - [盒子模型](#盒子模型)
  - [内外边距](#内外边距)

<!-- /TOC -->

<!-- more -->


# B/S和C/S的简单认识

client-server : 客户端服务器模式

开发成本比较高、不易于维护、在客户端部署一套软件，服务器端也要部署

browser-server : 浏览器服务器模式

# 网页的工作原理

通过域名或者 ip 然后访问服务器 服务器解析请求返回的是一个html文件

浏览器将 html 文件解析成一个图文并茂的网页

html 文件的组成部分: html css js(javascript)

HTML 是 Hypertext Markup Language

组织->文件夹和搜索选项->查看->隐藏已知文件的扩展名（去掉不选中）

# 认识标签

格式：

`<标签名 属性名1="属性值1" 属性名2="属性值2">要显示的内容</标签名>`

标签注意事项：

以`<\>`开始，中间放的是标签名

属性跟属性之间 用空格隔开

属性值 可以用双引号 单引号 或者不引 我建议使用双引号

`marquee(direction,scrollamount,width,height,loop)`

标签的分类：

双边标签 `<marquee></marquee>`

单边标签 `<br />`:换行

# 全局架构标签

```html
<html>
  <head>
    <title>是网页的标题</title>
    <meta charset="utf-8" />
  </head>
  <body>要显示在网页的所有内容</body>
</html><!-- 这是注释 -->

```

设置字符集 ：告诉浏览器以utf-8编码格式显示

出现乱码：

- 文件的编码的格式（编辑器中选择utf-8无bom） 
- 在head头部 增加 `<meta charset="utf-8">` 
- 浏览器中：修改编码 

## body常用属性
| tag         | desc                                   |
| ----------- | -------------------------------------- |
| bgcolor     | 背景颜色                               |
| background  | 网页的背景图片                         |
| text        | 字体颜色（控制body体中所有的文字颜色） |
| left-margin | 左边距                                 |
| top-margin  | 上边距                                 |
| link        | 正常状态显示的颜色                     |
| vlink       | 访问过后的状态                         |
| alink       | 鼠标点击时候的状态                     |

## 字体修饰标记(如下都是双边标记)

`<font></font>`

size: 字体大小 属性值是：1-7  
face：字体 (楷体，微软雅黑....)  
color: 字体颜色  
颜色： `#000000` 前两位是红色 中间是绿色 结尾两位是蓝色  

```html
<b></b>：字体加粗(strong)
<i></i>：斜体显示字体(em,cite)
<u></u>: 是下划线
<s></s>: 删除线
<sub></sub>：下标
<sup></sup>：上标
```

### 排版标记

```html
<p>段落标记</p> 会自称一行（段）
<span>行标签</span>
<br />:换行
<nobr />：不换行
<hr />水平线：(align: 对其方式 属性值：center left right color：颜色 width：宽 size：粗细尺寸)
<h1>标题</h1>（从h1到h6）通常网页中只会有一个h1
<h6><h6>(align)
<pre>原样输出</pre>（在学php时候 经常使用输出数据的时候进行格式化）
```

## 实体符号

诸如 "<" 之类的符号在HTML中拥有特殊的含义，所以在文本中使用它们。
> &nbsp; (空格) &lt; &gt; &amp;&copy;&trade; &reg; &times; &divide;
```html
&nbsp; 空格
&lt; （<）
&gt; (>)
&amp;
&copy;
&trade;
&reg; &times; &divide;
```

## 无序列表
```html
<ul>
    <li> </li>
    <li> </li>
    <li> </li>
    <li> </li>
</ul>
```

type:
- disc：默认的黑心圆样式
- circle：空心圆
- square: 实心方块

10.有序列表
> <ol>
>     <li></li>
>     <li></li>
>     <li></li>
> </ol>

```html
<ol>
    <li></li>
    <li></li>
    <li></li>
</ol>
```

`type`: 1 A a I  
`start`: 要显示列表的起始位置

## 自定义列表

> <dl>
>   <dt>我是简介名</dt>
>   <dd>幸福的孩子</dd>
>   <dd>杜海涛</dd>
>   <dd>刘翔</dd>
> </dl>

```html
<dl>
    <dt>我是简介名</dt>
    <dd>幸福的孩子</dd>
    <dd>杜海涛</dd>
    <dd>刘翔</dd>
</dl>
```

class id style name 他们四个都是属性名 配合我们的 css 跟 js

**基本上每个标签都有这四个属性**

动态网页：

数据内容展示出来是有变化的，比如：银行 账户余额（每个人都不一样）

静态网页：

做内容展示，所有人访问都是一样叫静态网页

# HTML再认识

nobr:

双标签 `<nobr>`中间的内容不允许换行，这就是nobr`</nobr>`

## URL

Uniform Resource Locator 统一资源定位符

组成部分： 协议 地址 端口号 文件 参数

协议：`http://` `https://` `file://` `ftp://` `smtp://` 邮件传输协议 `news://`

地址：`www.baidu.com` 域名 `ip` (cmd -> ping 域名)

端口号：(:80) web http://默认的端口号是80 范围：0-65535
通常已经被使用：0-1024

https: 443 ftp: 21 smtp:// 25

文件：要请求的文件 默认一般是：index.html

参数：以？开始 后边跟的就是参数 形式：键1=值1&键2=值2

如果有多个参数的时候 中间用&隔开

http://www.baidu.com:80/index.html?word=qianfeng&sex=1

## 超链接

```html
<a href="" ></a>

href:要跳转的地址

title: 就是鼠标放上去时候显示的内容（变成小手的时候）

target：_self 在本窗口打开 _blank 在新窗口打开

锚点：

<a href="#锚点名"></a>

<a name="锚点名"></a>

了解（id="锚点名"）
```

## 图片img

src资源地址

绝对路径：

网络绝对：https://www.baidu.com/img/bd_logo1.png

磁盘绝对：C:/wamp64/www/1701/day02-html/code/ly.jpg

(也可以使用/)

站点绝对：

https://www.baidu.com/bd_logo1.png

bd_logo.png == https://www.baidu.com/bd_logo1.png == https://www.baidu.com

相对路径：

以当前html文件为一个基准 寻找图片所在的位置 （路径）

`./` 在同一级目录（通常可以省略）

`../` 表示上一级目录(上两级 `../../` 层级多用绝对路径)

alt:当图片加载失败的时候显示的内容

title：鼠标悬停时候显示的内容

width height

【注】当只设置一个宽或者一个高的时候 图片会等比例缩放
如果给定了宽和高就会失帧 会变形

热点地图(了解 ，掌握最好) usemap

## 音频 视频

audio:

src：

controls:控制条

loop: 循环播放

autoplay:自动播放

video:

width height

src、controls、loop、autoplay

## 表格

table:

bgcolor:表格的背景颜色

border：边框

bordercolor:边框颜色

align：表格的显示 对其方式

cellspacing:单元格间距

cellpadding：单元格中的内容跟边框的距离

width，height

tr:width,height,

align:水平距离

valign：垂直方向 top bottom middle

th\--td:width,height,align,valign,

rowspan:

colspan:

caption:

valign: top middle bottom

day03-表单

表格

tel

colspan:合并列，需要将同一行的那个td给干掉

rowspan:合并行，需要将下一行的那个td给干掉

url参数作用:

a标签扩展：

```html
<a href="tel:132603519038">dadianhua</a>

<a href="mailto:wanglijuan@1000phone.com">发送邮件</a>
```

1：`iframe(width\height\src\name\frameborder\scrolling)`  
frameborder: 0/1  
scrolling: `no`/`yes`/`auto`  
2: `frameset(cols\rows\frameborder\border\bordercolor\noresize)`
`frame(src\name\scrolling)`  
3: form表单  
用途：获取有意义的信息，用户键入信息（注册，登陆，留言等等）    
属性:(action/method/enctype(multipart/form-data)/target)    
基本用途：   
form:    
action:提交的地址   
method:提交的方式  
默认：get(在url中显示?参数) post  
【注】:拉取信息是时候一般使用get  
post:用户提交数据的时候使用  
enctype=\"multipart/form-data\"  
现在记住这个，是上传文件的时候必须使用一个属性  
target：打开提交页面的方式  

(1)input

属性:(

type：类型

size:宽

value：输入框的默认值（一般的时候不写，因为就是让用户键入信息）

maxlength：允许键入的最大长度

readonly：只读

disabled：禁用状态

> :一般时候是用在只能看不能二次修改的值的时候（注册公司名）

placeholder：提示信息 placeholder=\"默认提示的信息\"

name:非常重要 要提交的内容的键)

type(

text:文本信息

password：密码

radio：单选框

> 必须name值 name要一样

必须value 一般使用习惯：1男 2女 0未知或者保密

```
radio(<label for="id名">详细见代码</label> checked)

checkbox(checked)
```

> 说明:必须有name属性 属性值必须： eg:like

value

submit

hidden：区分，不让用户看见的值用

file:上传文件时候使用

)

跳过这个坑：name属性一定要给

value

input（必须放在form中）

button：最多时候配合js使用

reset:重置按钮 （清空表单input中用户键入的内容）

```
<button>提交按钮<button\>
```

(2)select(multiple size name)

下拉菜单

> ：name

option((value selected))

> ：value

(3)textarea(cols rows)

双边标记：\<textarea\>默认中间不要有空格或者回车\</textarea\>

**提交的都是意义的数据 不包括`<p\></p>`**

4:头元素

`<link rel="stylesheet" type="text/css" href="1.css" />`

链接外部的css样式

`<meta charset="utf-8" />`

SEO:搜索引擎优化

`<meta name="keywords" content= "" />`

堆积网站关键字，用来提高网站的排名

`<meta name= "description" content= "" />`

关于本网站的描述信息

`<meta http-equiv="refresh" content= "3;url=http://www.baidu.com " />`

在几秒以后跳转

5: 无意义的标签

- div 
- span
- footer
- header
- section

都是双标签

# CSS初认识

## CSS

层叠样式表，Cascading Style Sheet

网页中HTML CSS JavaScript的分工

html:负责网页中的内容展示 由标签组成

css：负责网页的排版 将内容友好的展示出来

js: 负责网页的特效，一些动画效果 比如说轮播图

## 使用css的好处

可以重复层叠样式 达到我们最终想要展示效果

单独分离出来便于管理跟重复调用

可以提高访问速度 节省服务器的流量开支

## css的三种链接方式

### 行内样式

格式： `style="属性名1:属性值1;属性名2:属性值2;"`

### 内联样式  

格式: 在head头中增加
```js
<style type="text/css">
选择器{
    属性:属性值;
}
</style>
```
### 外部样式

格式：`<link rel="stylesheet" type="text/css" href="css文件的路径" />`,里面的格式，跟内联样式一样

```css
选择器{
    属性:属性值;
}
```

## css语法格式和注释
```css
选择器{
    属性:属性值;
}
 /* CSS的注释 */
```

## 选择器

自定义名规则：数字 字母 下划线 不能以数字开始

标签选择器：所有的标签都可以做标签选择器 如果使用了标签选择器 当前网页中用这个标签的元素都增加了样式

class选择器：

在标签内增加class属性 属性值自定义 在CSS样式中使用如下

`.class属性名{样式}`

一个元素可以有多个class名 中间用空格隔开

id选择器：

在标签内增加id属性 属性值自定义 在CSS中使用如下

`#id名{样式}`

**注**:通常一个网页中id名是唯一

组合选择器:

标签选择器,class，id选择器.... 形式 ：选择器与选择器之间用逗号隔开

将多个元素增加共同的样式
```
eg: p,.meixi,#daishu{

font-size:35px;

}
```
层级选择器：使用具有层级关系 可以从父类找到子类找到孙子类 增加样式

选择器用空格隔开

伪类选择器:`(link,hover,active,visited,focus,first-child,last-child)`

一般用于给 某些选择器增加特殊效果比如 a链接

超链接状态顺序：

`a:link{}` 正常状态下（默认状态）  
`a:visited{}` 访问之后的样式  
`a:hover{}` 鼠标悬停的时候的样式  
`a:active{}` 鼠标点击时候的样式  

注意，`a:hover` 必须位于 `a:link` 和 `a:visited` 之后，`a:active` 必须位于 `a:hover` 之后

可靠的顺序是：`l(link)ov(visited)e` `h(hover)a(active)te`, 即用喜欢和讨厌两个词来概括

focus:使用一般配合input `input:focus{样式}`

first-child:必须子元素中第一个是要增加样式的元素

last-child:必须子元素中最后一个是要增加的样式的元素

(IEl不支持的时候 可以声明doctype(大写))

属性选择器:

形式： `input[type="password"]{样式}`

`a[title]{样式}`

`*` 通配符:给页面上所有的元素增加样式

`[选择器优先级]`

`*`<标签选择器<`class`<`id`

## 尺寸设置

只有块标签才有宽和高 div p section

width height min-height max-height min-width max-width

单位：

`%`:使用的是父级 的百分比

`px`:像素 一个点就是一个像素

`em`:设置的是当前元素的父级的字体尺寸

`rem`： html中的尺寸 倍数

最长使用的字体尺寸: `12px` `14px` `16px`

7.常用属性

字体：

`font-style`：normal 默认状态 italic斜体

`font-weight`：normal默认状态 bold 加粗

`font-size`： 字体的大小 谷歌 默认是16px; 最小支持12px;

`font-family`:楷体 微软雅黑

`font`: style weight size family

文本:

`text-indent`:文本的缩进 最好用em 一般都是2em

`text-align`：文本的水平对齐方式 left right center

`white-space`: nowrap; (了解) 强行在一行显示内容

`text-overflow`:clip超出部分直接截断 ellipsis：超出部分显示'...'

配合overflow:hidden使用

text-decoration(

overline:上划线

line-through：中划线

underline:下划线 none)

text-shadow: 水平偏移的值 垂直偏移值 模糊程度 颜色

line-height：行高 当块标签的高和行高设置值一样会垂直居中

vertical-align：

# CSS

## vertical-align

## 背景

background-color： 背景颜色

background-image: url(图片地址)

background-repeat(

repeat：默认平铺

no-repeat:不平铺

repeat-x：横向平铺

repeat-y:纵向平铺

repeat-y:纵向平铺

)

background-attachment(

fixed：（了解）相对窗口固定，当显示该div的时候，背景图才显示出来

local：背景图会随着内容的滚动而滚动

scroll：默认属性，背景图不会随着内容的滚动而滚动

)

background-position：一定要有一个背景图 background-image属性（left、center、right、top、bottom、xy值）

简写形式：background:url(erha.jpg) no-repeat pink;

## 列表

list-style：none

list-style-image:url()

list-style-position：inside列表项目标记放置在文本以内/outside

list-style-type

## 布局

float：浮动 left right none

clear: 用于清除浮动 both

display:把块元素变成行元素 也可以把行元素变成块元素(

none

inline-block:切换为行内块

block：切换为块

inline：切换为行内元素

none：让标签消失，位置也不再

)

visibility：(visible、hidden:隐藏元素，但是位置依然存在)

overflow（

visible:默认不做处理

hidden:超出部分隐藏、

scroll:超出部分出现滚动条

auto:自动判断 如果有内容超出处彰显滚动条，如果没有就不显示滚动条

）

position（

relative：相对自身文档流中的位置进行定位

absolute：相对定位 会脱离文档流 当想从父级定位 在父级中使用position:relative

static:默认属性

fixed:相对于当前窗口的

）

z-index：设置元素的层叠顺序 值越大越在上边，这个属性的测试需要都为absolute或者fixed的才有效

如下属性只有当定位是relative、absolute、fixed时有效

top

right

bottom

left

## 边框

border

border-width

border-style(

dotted:点线

solid:实线

dashed:虚线

double:双线

border-color：边框颜色

border-radius:

给一个值：全部变

给两个值：对角

三个值: 左上 右上左下 右下

box-shadow:边框的阴影效果

## 盒子模型

## 内外边距

padding:内边距

padding-top

padding-right

padding-bottom

padding-left

margin:外边距

margin: 0 auto;

margin-top

margin-right

margin-left

margin-bottom