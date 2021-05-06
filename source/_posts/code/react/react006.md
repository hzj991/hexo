---
title: 'React[006]:事件'
date: '2020-01-31T13:37:00+08:00'
tags:
    - React
    - js
categories:
    - web

---



**this.xxx.bind(this,pram)**
**方法的传递**

App.js


```js

···
constructor() {
    super()
    this.state = {
      title: '待办事项',
      desc: '今日是，今日比',
      article: '<div>asdasd<i>asdasdasdasd</i></div>',
      todos: [
        {
          id: 1,
          title: '吃饭',
          assignee: 'leo',
          isCompleted: true
        }, {
          id: 2,
          title: '睡觉',
          assignee: 'xiaoming',
          isCompleted: false
        },
      ]
    }
  }

  addTodo = (todoTitle) => {
    console.log(todoTitle)
    this.setState({
      // push 返回的是数组长度，非数组
      // todos: this.state.todos.push({
      //   id: Math.random(),
      //   title: todoTitle,
      //   assignee: 'xxx',
      //   isCompleted: false
      // })
      todos: this.state.todos.concat({
        id: Math.random(),
        title: todoTitle,
        assignee: 'xxx',
        isCompleted: false
      })
    
    })
  }
···
        <TodoInput
          btnText="Add"
          addTodo={this.addTodo}
        />
···
```

input.js

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TodoInput extends Component {
    static propTypes = {
        btnText: PropTypes.string
    }
    static defaultProps = {
        btnText: '添加todo'
    }
    constructor() {
        super();
        this.state = {
            inputValue: 'asdas'
        }
        // this.handleAddClickUseBind = this.handleAddClickUseBind.bind(this)
    }
    handleInputChange = (e) => {
        console.log(e.currentTarget.value);
        this.setState({
            inputValue: e.currentTarget.value
        })
    }

    handleAddClickUseBind() {
        console.log(this.state)
    }

    handleAddClickTest = (id) => {
        console.log(id)
        console.log(this.state)
    }

    handleAddClick = () => {
        this.props.addTodo(this.state.inputValue)
    }

    render() {
        return (
            <div>
                <input type="input" value={this.state.inputValue} onChange={this.handleInputChange}></input>
                <button onClick={this.handleAddClick}>{this.props.btnText}</button>
                <br />
                other test
                <button onClick={this.handleAddClickTest}>{this.props.btnText}</button>
                <button onClick={this.handleAddClickUseBind.bind(this, 123)}>{this.props.btnText}:usebind</button>
                <button onClick={() => { console.log(this.state) }}>{this.props.btnText}:use()->{'{'}{'}'}</button>
                <button onClick={this.handleAddClickTest.bind(this, 1234)}>{this.props.btnText}:use()->{'{'}{'}'}</button>


            </div>
        )
    }
}

```

<!--more-->


