---
title: 'React[007]:生命周期'
date: '2020-01-31T23:36:00+08:00'
tags:
    - React
    - js
categories:
    - web

---



[文档](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)
[图](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

<!--more-->

太偷懒了哈

```js
import React, { PureComponent } from 'react'
const noop = () => { }
export default class TodoItem extends PureComponent {
```

`PureComponent` 代替 `Component` 或者 用以下代码进行渲染优化

```js
shouldComponentUpdate(nextProps, _nextState) {
    return nextProps.isCompleted !== this.props.isCompleted;
}
```


