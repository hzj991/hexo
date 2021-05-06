---
title: 'React[005]传值给子组件'
date: '2020-01-30T23:12:00+08:00'
tags:
    - React
    - js
categories:
    - web

---



index.js
外部老生畅谈
主要是循环用到了`array.map`
组件需要一层层传递
如果需要透传可以使用`{...todo}`

TodoItemList

```js
import React, { Component } from 'react'
import TodoItem from "./TodoItem";

export default class TodoList extends Component {
    render() {
        console.log(this.props)
        return (
            <ul>
                {
                    this.props.todos.map(todo => {
                        return (
                            <TodoItem
                                key={todo.id}
                                {...todo}
                            />
                            // <TodoItem
                            //     key={todo.id}
                            //     id={todo.id}
                            //     title={todo.title}
                            //     isCompleted={todo.isCompleted}
                            // />
                        )
                    })
                }
            </ul>
        )
    }
}

```

TodoItem

```js
import React, { Component } from 'react'

export default class TodoItem extends Component {
    render() {
        return (
            <li>
                {this.props.title}{this.props.isCompleted ? '已完成' : '未完成'}
            </li>
        )
    }
}

```

数据改变

```js
import React, { Component } from 'react'

export default class Like extends Component {
    constructor() {
        super()
        this.state = {
            isLiked: false
        }
    }

    handleLikedClick = () => {
        // 这种方式再react中是不允许的，这种方式会改变数据但是不会改变展示
        // this.state.isLiked = !this.state.isLiked;
        // 要修改数据就是用setState的方法

        // 方法一
        // this.setState({
        //     isLiked: !this.state.isLiked
        // })

        console.log('setstate外部先驱的this.state.isLiked:', this.state.isLiked)
        // 方法二
        this.setState((prevState) => {
            console.log(prevState)
            console.log('setstate内部的this.state.isLiked:', this.state.isLiked)
            return {
                isLiked: !prevState.isLiked
            }
        }, () => {
            // 由于setState 是异步的，所以要获取最新的state需要在回调中获取
            console.log(this.state)
        })
        console.log('setstate外部后续的this.state.isLiked:', this.state.isLiked)

    }

    render() {
        return (
            <div>
                <span onClick={this.handleLikedClick}>
                    {this.state.isLiked.toString()}: {this.state.isLiked ? '取消❤️' : '喜欢'}
                </span>
            </div>
        )
    }
}

```