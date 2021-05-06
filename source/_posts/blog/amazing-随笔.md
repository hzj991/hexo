---
title: 随笔合集
date: '2019-06-28T23:25:00+08:00'
tags:
    - DayDayUp
categories:
    - 随笔
---

<!-- TOC -->

- [关于douyin接口数据爬取工具总结 2020-03-17](#关于douyin接口数据爬取工具总结-2020-03-17)
  - [选取http抓包工具](#选取http抓包工具)
  - [选取android模拟器](#选取android模拟器)
  - [android 安装工具](#android-安装工具)
  - [动作模拟驱动组合](#动作模拟驱动组合)
  - [数据分析](#数据分析)
- [方法传递子组件 2020-01-31](#方法传递子组件-2020-01-31)
- [分布式和任务分配杂谈 2020-03-08](#分布式和任务分配杂谈-2020-03-08)
- [http与websocket端口共享 2019-07-15](#http与websocket端口共享-2019-07-15)
- [webpack有感 2019-06-29](#webpack有感-2019-06-29)
- [强类型的鸭子类型 2019-07-14](#强类型的鸭子类型-2019-07-14)
- [面向对象杂谈 2019-06-29](#面向对象杂谈-2019-06-29)
  - [起初，“面向对象”是专指在程序设计中采用封装、继承、多态等设计方法](#起初面向对象是专指在程序设计中采用封装继承多态等设计方法)
  - [圆形的太阳和圆形的眼睛有什么关系，游戏超级玛丽奥中山和云的其实是颜色不一样的图形他们又是什么关系](#圆形的太阳和圆形的眼睛有什么关系游戏超级玛丽奥中山和云的其实是颜色不一样的图形他们又是什么关系)
  - [面向对象的缺点不包括 ‘运行速度慢’](#面向对象的缺点不包括-运行速度慢)
  - [设计非教条](#设计非教条)
  - [人挪活，树挪死](#人挪活树挪死)
- [从数据绑定看现代库的本质 2019-06-28](#从数据绑定看现代库的本质-2019-06-28)
  - [双向绑定 （肤浅的例子）](#双向绑定-肤浅的例子)
  - [ioc 的多种实现途径 （php版本）](#ioc-的多种实现途径-php版本)
  - [构建延迟加载](#构建延迟加载)
- [了解spring 2018-12-18](#了解spring-2018-12-18)
  - [安装及启动](#安装及启动)
- [code sex 2018-11-04](#code-sex-2018-11-04)

<!-- /TOC -->

<!--more-->

# 关于douyin接口数据爬取工具总结 2020-03-17


*\*为我最终使用的工具*

## 选取http抓包工具 

- fiddler
- mitmproxy
- anyproxy *

## 选取android模拟器

- 逍遥模拟器 *

## android 安装工具

- xposed *
  - jesttrustme (劫持后可继续使用https) *

## 动作模拟驱动组合

- php+adb 模拟操作

## 数据分析

- 直接 grep anyproxy log 数据


-----

# 方法传递子组件 2020-01-31


`从实现上来看类似发布订阅，但从思路上来说并不完全一样，设计上侧重点有些许不同`

今天看React中传递方法给子组件，因为传递的是方法，父组件控制逻辑，子组件控制调用，潜意识认为这是一种不可靠，不易维护的方法，但是react是推荐这种方式的，于是进一步思考了一下。
发现每一步的职责都很清晰并没有混乱的发生

这个流程可以这样划分`子组件`包括子组件本身功能+触发，同时提供一个明确的绑定方式，并且明确回调中会传递的值，
`父组件`提供父组件相关操作，开发只需要对两个组件进行绑定即刻
如下php代码，下面绑定了一个匿名函数，模块的拼接者只需要按需转换即刻

```php
// 这里是对子组件的提交事件进行了绑定，当子组件进行提交操作的时候触发，会传递子组件预定义好的数据，这里进行处理转化，然后传入$f中
$s->submitBind(function ($value) use ($f) {
    $name = $value;
    $f->push(['name' => $name]);
});
```

与发布订阅，有些类似但又不同

下面是一段php父模块传递方法


```php
<?php

class Son
{

    private $value = '';

    private $callback = null;

    public function input($value)
    {
        $this->value = $value;
    }

    public function submit()
    {
        ($this->callback)($this->value);
    }

    public function submitBind($callback)
    {
        $this->callback = $callback;
    }
}

class Father
{
    public $state;

    public function __construct()
    {
        $this->state = [
            ['name' => 'xxx']
        ];
    }

    public function push($name)
    {
        $this->state[] = $name;
    }

    public function upload()
    {
        return  $this->state;
    }
}

$f = new Father();
$s = new Son();
$s->submitBind(function ($value) use ($f) {
    $name = $value;
    $f->push(['name' => $name]);
});

$s->input('小张');
$s->submit();



var_dump($f->upload());

```


-----

# 分布式和任务分配杂谈 2020-03-08


今天想给自己机子装个 RabbitMQ （不过感觉不在公司了，其实这个装的意义不是很大，个人写代码redis就足够了），然后想起分布式爬虫这个东西，因为之前听到其他人开发的时候用到了redis，于是就先想后查，觉得呢这个分布式爬虫的实现是基于redis的队列实现的，程序爬取一页后将将要爬取的东西塞到队列中，然后其他机器上的爬虫从队列中取任务继续进行其他任务。查询了一下原理也是这样的。于是就回想了一下过去接触的任务分配的方式吧。总的来说就是主动取，和主动分发着两种吧。

第一种就类似学校老师收到卷子后，找几个高年级的学生改卷子，然后每个人改的卷子是老师分给他的。比如ng的负载均衡。

第二种呢也是老师让高年级学生批改卷子，但是不一样的呢是老师只收卷子不负责具体哪个人改哪个卷子，所有的卷子摞起来，然后改卷子的人自己过来取，取的数量也是改卷子的人自己定。这种呢就像除了队列中任务一样，多跑几个脚本就是多个学生。日常开发这种用法比较多。而且比较简单，毕竟完全依靠队列的特性实现，不需要纠结任务的分配。

当然也有一些逗逼的方式。就是给脚本传参数然后也不要队列然后通过原始数据顺序取模进行分配。不过比较憨憨的是，一单想要加人或者减少人，就要告诉所有的任务，你取数据的方式要变啦，不然就会和别人取到同一个数据或者有数据跳过了。属于一口气吃成胖子的思路蛤蛤。



-----

# http与websocket端口共享 2019-07-15



Q:为什么 Socket.IO 可以让 WebSockets 和 HTTP 监听在同一端口

A:websocket, http 都是基于tcp实现的。websocket 的连接请求都是用的http。websocket和http是在一个层面上的东西

<!--more-->


微信的web客户端使用的是http keep-alive 进行数据的接受蛮有意思的。

日后填坑。


# webpack有感 2019-06-29



明天就要回乡了，抓紧看了下书（其实是被子都寄走了，晚上睡觉不舒服）
<!--more-->

从B站上看了一下webpack相关的教程，快看完的时候突然发现了另个角度和后端工具对标的地方（以前只是对标了一下composer和npm，这次比较细致）

| node                                     | php                              |
| ---------------------------------------- | -------------------------------- |
| 前端原生撸代码（这个阶段还没有用到node） | 原生撸代码                       |
| 使用node+npm                             | 使用composer                     |
| npm script                               | composer script                  |
| 使用了 node 的模块加载                   | 使用由composer实现的psr4自动加载 |
| 以下为模块和另一侧弱对标                 | 以下为模块和另一侧弱对标         |
| 使用webpack                              | 使用了ioc模块                    |
| 使用了sacc-load                          | 使用了request                    |
| 使用了axias                              | 使用guzzlehttp                   |
| 使用babel                                | 使用doctrine/annotations         |

经过上诉模块的组合知乎前端的代码变得风格不同于原生的html开发，同时右侧的php代码也变得不同于原生的php代码，左侧隔离了原生网络请求，大量原生html，以及对css语法，js语法的一定改变，右侧则是更改由直接写代码变为控制器代码，$_REQUEST变成了request类，curl变成了封装好的httpclient，语法上也加强了注释对代码的影响，增加更多的功能，如果右侧加上了doctrine/orm 则更进一步对数据库操作进行了隔离，至此编码层面上既有非原生php语法的补充又有新增模块的全局函数和对底层的高度封装，从这一角度来看，虽然前端的编码改变也好，辅助的工具也好，和后端技术的代一定成都上也大同小异，不同的地方也就是给人的感受把，作为一个phper从原生phper->使用composer->使用框架因为处于渐进所以对于代码的写法感受较为温和，而前端代码由于直接从原生看到了使用webpack的写法，所以感觉跨度比较大。但是仔细想一想其实都是经过长时间迭代对工具的高度封装所得。尤其是一些同级语法分析器（用php的实现的对php语法的分析器和用js实现的对js语法的分析器）更是让工具以及库的使用更加巧妙（这里指的是对语言本身语法的改变）。

不过语法的改变倒是挺有意思的事情，（php的语法分析库大多被引来制作静态检测）,scss,styl,twig,smarty(模板大多用的正则其实不应该算在这里面，但是从使用角度上来说又是一种语法的扩充)，
`“计算机科学领域的任何问题都可以通过增加一个间接的中间层来解决” “Any problem in computer science can be solved by anther layer of indirection.”`




# 强类型的鸭子类型 2019-07-14

[鸭子类型](https://zh.wikipedia.org/wiki/%E9%B8%AD%E5%AD%90%E7%B1%BB%E5%9E%8B)

`当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子。`

<!--more-->

这是一个比较有意思的话题，而且go中接口的特性是golang支持鸭子类型的基础，因为go时强类型语言所以在这里和php做个比照

```php
<?php

class A
{
    public function run()
    {

    }
}

class B
{
    public function run()
    {

    }
}


interface canListen
{
    public function listen();
}


class man implements canListen
{
    public function listen()
    {

        echo 1;
    }
}

class Dvd implements canListen
{
    public function listen()
    {

        return '1';
    }
}

```
A和B都事先了run方法，并且可以放入同一数组中循环调用
man和Dvd都实现了listen并且结成了canListen，但因为canListen没有对返回值做限定所以导致如果你希望让对应的对象给你返回一个字符串，可能并不行


```go
package main

// WhatIsCar as
type WhatIsCar interface {
	run()
	stop()
}

// Car as
type Car struct {
	name string
}

// ACar as
type ACar struct {
	Car
	fly string
}

// CCar as
type CCar struct {
	fly string
}

func (car Car) run() {
	println("Car can run")
}

func (car Car) stop() {
	println("Car can run")
}

func (car ACar) run() {
	println("ACar can run")
}

func (car CCar) run() {
	println("CCar can run")
}

// 当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子。
// 因为 go 是静态语言本身具备静态检测，所以鸭子类型带来的负面影响较小
func structTest() {

	var car WhatIsCar
	// car 实现了 whatiscar 的所以方法所以可以使用
	car = new(Car)

	car.run()

	// ACar 继承了 car ,并且重写了run方法 所以也可以使用
	car = new(ACar)

	// CCar 既没有继承 car ，也没有自行实现 whatiscar 的所有方法，没有实现接口，所以不能使用，故注释
	// car = new(CCar)

	car.run()
}
```

这也从一下方面反应了鸭子类型更多的时设计的一种而没有没有明确的好坏之说，相比于不严谨的弱类型代码，强类型的更严谨的约束了鸭子类型，使用上来说也相对安全一点。并且在OO的世界中抽象的角度不同可能得到的结论也不同。
从可能存在的缺陷角度上来说如果使用了鸭子类型，那么尽可能使用鸭子的特征，尽量避免使用非鸭子的特征，比如你让所有的鸭子进了马戏团，但是你又要所有的鸭子去开汽车，但是鸭子的接口没有开汽车这个规定，那么那些不会开车的鸭子就会让你车翻得很严重咯

![](/images/鸭子类型jfif.jfif)



# 面向对象杂谈 2019-06-29


## 起初，“面向对象”是专指在程序设计中采用封装、继承、多态等设计方法

看下面一段php代码
```php
<?php

function eat()
{
    echo 'eat';
}

function eatFood()
{
    eat();
}
function eatFood2()
{
    eat();
    eat();
}
```
<!--more-->
是不是和面向对象的继承封装多态差不多？虽然代码看着有点丑陋

再举例一个 oop 里面的一个设计模式`观察者`,php中有`declare(ticks=1);`这样一种用法，（这个写法的孪生兄弟pcntl_signal_dispatch()不是这次的重点）,它表示每执行多少语句去执行一下`register_tick_function`注册的方法或检测`pcntl_signal`信号量，是不是很适合用来实现观察者，但观察者的实现多大都是主动通知更改的时候触发了observer，而非被监听者观察到状态变化，因为从实现上来说，每执行一句就要观察一下状态是不是有点费劲呀，之后就演变成了发布订阅，因为服务端的业务代码大多数时候并没有实现真正的观察者。但是真正意义的观察者也是存在的，从实现角度上来说我们常用的守护进程大多都可以理解为观察者的实现，起进程，监控进程，发现挂掉就重启。

## 圆形的太阳和圆形的眼睛有什么关系，游戏超级玛丽奥中山和云的其实是颜色不一样的图形他们又是什么关系

许多人可能会说圆形是太阳的一个属性，山的型状和云的型状也是他们的属性，那太阳和眼睛存在关系码？云和山又有什么关系呢？很显然在这种地方组合的表现要更加明显。

所以我个人认为面向对象并非一个完美的理论，而实一个阶段性的由开发人员长期开发得出来的经验总结

## 面向对象的缺点不包括 ‘运行速度慢’

网上有人说面向对象的缺点里面包括了`运行速度慢`，这个观点简直就是放屁，因为面向对象的逻辑可以等价的转换为非面向对象的写法，所以无论是开发自己转换也好，还是语言底层自己转换也好，相同逻辑下效率是一样的，（个人反对因为现在计算机算力高，所以可以忽略某些问题，但面向对象本身是没有性能问题，即使有那也是编译器或解析器处理的问题，或编写语法转换器，所以这个缺点是不存在的，面向对象的缺点应该更多的观察它设计上的缺陷）。

## 设计非教条

如果不能优雅的实现设计模式，那么或者时机不到（没有合适的api，或者没有合适的库的支持（例如反射类推进了ioc,php词法分析推进了php编程上使用注解）），要么可能就是过于追求本本主义，走了弯路

## 人挪活，树挪死








# 从数据绑定看现代库的本质 2019-06-28

`这边文章目前没有想清楚如何表达只是作为一份草稿写来展示的`

编码中没有什么是加一层解决不了的，如果有就再加一层
<!--more-->
前端双向绑定的功能之一是由`Object.defineProperty`实现的 (可以并非唯一)

ioc 可以利用反射

闭包可以用来延迟加载

现在我们作为一个无法使用例如 vue 或者使用 lavarl 这样的框架或者库的时候我们应该如何实现类似的功能

## 双向绑定 （肤浅的例子）

监听所有的事件，在此基础上实现 set 和 get 的接口 从而实现事件的监听

## ioc 的多种实现途径 （php版本）

`控制反转（Inversion of Control，缩写为IoC），是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。其中最常见的方式叫做依赖注入（Dependency Injection，简称DI），还有一种方式叫“依赖查找”（Dependency Lookup）。通过控制反转，对象在被创建的时候，由一个调控系统内所有对象的外界实体将其所依赖的对象的引用传递给它。也可以说，依赖被注入到对象中`


- 反射类分析类整体
- 编写由php写成的语法分析器解析代码，分析出依赖的对象

控制反转容器的依赖查找即分析代码的依赖，并解决这些依赖，竟然如此其实即使没有反射api的存在，只要可以对代码进行分析就可以把依赖解决。

```php
<?php
namespace App\action;

class Cat
{
    public function eat(Food $food)
    {
        
    }
}

```
在php 框架之中大多框架的延迟加载是通过闭包实现的，下面是php延迟加载的一个简版php代码
```php
<?php

function buildLazyClass($className,$params)
{
    return function () use ($className,$params){
        new $className($params);
    }
}

```


```php
<?php
$lazyFood = buildLazyClass('Food')
if(is_callback($lazyFood)){
    return $lazyFood();
} else {
    return $lazyFood;
}
```
## 构建延迟加载 

如果一个语言没有实现闭包呢？ 那就只能自己想办法实现了
现在第一步用反射类或者语法分析器分解目标类，分析出依赖的对象，第二部是构建延迟加载类，例如下面
```php
<?php
class LazyFood 
{
    private $isBuild = false;
    private $food = null;

    public getFood()
    {
        if($this->isBuild) {
            return $food;
        } else {
            $this->food = new Food()
            $this->build = true;
            return $this->food;
        }
    }
}
```
这样就存在相同的业务编码，实现了相同的功能，相比之下如果使用了编译代码这一步，就可以想办法将执行代码中对依赖的分析解除，从而达到更高的效率



-----

# 了解spring 2018-12-18




今天安装了一下 spring cloud 并且运行得到了'hello world'，从第一个'hellow world'，到最中的spring cloud的开发过程和实现原理吧

[官网文档](https://docs.spring.io/spring-boot/docs/2.1.1.RELEASE/reference/htmlsingle/#boot-documentation)  
先说一种（可以忽略这个） [spring 下载路径](https://repo.spring.io/release/org/springframework/boot/spring-boot-cli/2.1.1.RELEASE/spring-boot-cli-2.1.1.RELEASE-bin.zip), 下载后使用目录bin下的spring.bat,可以运行简单的‘hello world’，由于没有采用任何依赖管理工具，就跳过这个详细讲解

## 安装及启动

> 使用linux 和 xos 的童鞋自己去官网文档看下安装教程哦，这里稍微加入点 windows 的安装过程

使用 windows 的同学可以先安装一个 [chocolatey](https://chocolatey.org/install)，这个工具是 windows 上的包管理工具，类似于 linux 上的 apt-get、yum ，使用 choco 也可以安装一些例如 notepad++ 这样的软件，感兴趣的童鞋可以自己试一下

使用 choco 安装 maven
```bat
choco install maven
```

首先创建一个 pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>com.example</groupId>
	<artifactId>myproject</artifactId>
	<version>0.0.1-SNAPSHOT</version>

	<!-- Inherit defaults from Spring Boot -->
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.1.1.RELEASE</version>
	</parent>

	<!-- Add typical dependencies for a web application -->
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
	</dependencies>

	<!-- Package as an executable jar -->
	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
```

这个文件给我的第一感觉有点类似于 php 的 composer （php 的包管理工具），略有不同的是 maven 引入到了本地仓库，而不是当前路径下创建一个文件存放，这个和 php 包管理就略有不同 ，在 windows 下 maven 引入的文件会默认导入到用户目录下的 .m2 文件夹下的，其中这个 .m2 的路径配置是 Maven 安装目录下的 config 中的 setting.xml。

创建一个 java 文件，位于项目根目录下 src/main/java/Example.java，接下来可以执行一下命令，然后访问 localhost:8080, 至此第一个 spring 程序就跑起来了

```.bat
# 查看
mvn dependency:tree
# 第一种运行方式
mvn package
java -jar target/myproject-0.0.1-SNAPSHOT.jar
# 第二种运行方式
mvn spring-boot:run
```



---------

# code sex 2018-11-04

>  我们来谈程序员对性的追求。  
- 可靠性(relibility)  
- 可读性(readability)  
- 可维护性(maintainability)  
- 可测试性(testability)  
- 可扩展性(extensibility)  
- 可移植性(portability)  
- 可伸缩性(scalbility)  
- 易用性(usability)  
- 可用性(avaliability)  
- 可重用性(reusability)  
- 互操作性(interoperability)  
- 可管理性(manageability)  
- 可支持性(supportability)  
- 一致性(consistency)  
- 安全性(security)  
- 性能(performance)  
- 稳定性(stability)  
- 精确性(accuracy)  
- 可客制性(customizability)  
- 魯棒性(robustness)  
   
   
from https://www.zhihu.com/question/29264868/answer/44134766
