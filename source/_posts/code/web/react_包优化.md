---
title: react_包优化
date: '2020-02-12T01:33:51+08:00'
tags:
    - web
    - js
    - php
    - lazyload
categories:
    - other

---



把一个react项目打包发布到了githubpage上，结果加载速度异常的慢，同比hexo生成的博客项目，加载速度尚可，打开network分析，两者差距较大，
react项目的js文件将近1m，但是react的首屏出了一个nav和一段文字描述，其实并没有什么东西。而hexo项目本身文字较多，但js文件累加不足100k。导致react项目在带宽较低的情况下体验极差（我的腾讯云也只有1mbps理论上也需要将近10s才能加载完成）。因为引入库有限，所以对库文件进行分步引入分析。

react项目引入了 react本身 + ant 库 + echarts 库 + 其他

其中ant + echarts 占比 80%

react清单

- react 40kb +
- ant 245kb +
- react.qr 6kb 
- echarts 272 （不引用地图资源）
- echarts  chinamap world map  320  kb -> main.js
- 业务产生main.js < 3kb

*内容较多展开查看*

<!--more-->


*通过懒加载可以实现这个我已经知道，现在是探究一下到底是什么东西导致懒加载可以生效呢？*


# 文件引入探索

首先有两个js文件 ， 其中一个加入`console.log(1111)`但不被任何文件import
第二个文件加入`console.log(2222)`同时被引入，结果如下，222很明显在构建后的文件，111却不存在
![222存在](/images/2020/未命名1581421863.png)

![111不存在](/images/2020/未命名1581421895.png)

在这提一下为什么做这个测试，这个结果有的人可能不做就能想到，但是我过去可能被我经历的一些优化方式所干扰，所以导致希望测一下。我所说的干扰场景就是比如php的部分静态检测工具可以针对单文件检测，单文件扫描，php的某些框架可以对单文件进行优化。就拿js一些语法库扩展库来说一样。php的部分框架是可以在安装依赖后构建缓存文件，这些缓存文件就是优化后的php代码，将一部分带有注解类的文件转为高效并且是真正运行的php代码，还有一些xml,yaml的转换，都是单文件转换。所以采用这种方式的可以给工具的开发者带来不用关心引用路径的问题。但是单页面打包并不是这样，他类似于传统文件的构建，或者c的编译，转换器会从入口文件开始对所有从入口文件。

举个单线思考的例子

开发php的时候或者仅仅是开发基于http的网络请求时大多数开发考虑的是单线逻辑，就是另个同级文件不会对我所开发的业务产生影响（比较片面，如果是发布订阅模式的话，许多统计的订阅者会有先后顺序，也会有一定干扰）。如果有人要访问一个基于php-fpm运行下的php代码，那么他的过程是`入口->引导/框架基础处理/中间件处理->控制器->业务逻辑1->->业务逻辑2->->业务逻辑3`,当然这条路是服务端提供的规则，前端传入规则（参数）来走通的。非这条路线中的文件是不会被访问和加载的。

类比来讲。web端的项目更多是引入了但是没有被调用。（如引入了一个ui框架但是你只使用了button组件）

这个打包过程类似一个树的遍历，从入口文件开始，import就是指针。通过这种方式就可以所有引入的文件进行编译。


# 懒加载探索

懒加载/延迟加载的本质是将目的资源的通行证/目录先进行存储，之后通过通行证/目录调用。实现上也种类也有多种，如服务端数据的懒加载可以先将类型和id作为变量存储，如果需要使用这个对象则通过事先存储的类型和id进行转换，也可以构建闭包，使用时将闭包展开即刻。第二种也就是react所说的高阶组件（这种方式在php框架大多作为功能的延迟加载存在）。下面附上一段react延迟加载的手动实现

```js
import React, { Component } from 'react'

const Loadable = ({
  loader,
  loading: Loading
}) => {
  return class LoadableComponent extends Component {
    state = {
      LoadedComponent: null
    }
    componentDidMount() {
      loader()
        .then(resp => {
          this.setState({
            LoadedComponent: resp.default
          })
        })
    }
    render() {
      const {
        LoadedComponent
      } = this.state
      return (
        LoadedComponent
        ?
        <LoadedComponent />
        :
        <Loading />
      )
    }
  }  
}
export default Loadable
```

代码逻辑是传入一个延迟加载的闭包loader`()=>import('./About')`和一个loading(就是一个loading显示的组件)
只用调用这个组件的时候才会真正的去破怪掉loader真正去执行`import('./About')`

但是~核心内容并没有探究到~~~~~~~~~~~~~~这知识代码的逻辑的懒加载，仅仅是懒加载完全可能是业务逻辑的懒加载，完全不代表文件的懒加载，更不代表主文件减少

其实这个也比较号理解，就是切割点的查找。
a(b(c(d(()=>{f}))))
就比如上述调用，当我语法解析器或其他分析工具分析到一个闭包中的引用时，我就可以对其进行分割。实现文件上的剪切，打到不可告人的咪咪

皮一下很开心

