---
title: 'React[004] Component+数据传递'
date: '2020-01-30T17:51:00+08:00'
tags:
    - React
    - js
categories:
    - web

---



src/components/Header/index.js

```js
import React from 'react'

export default function Header() {
    return (
        <h1>
            待办事项列表
        </h1>
    )
}

```

src/components/index.js

```js
export {default as Header} from './Header'
```

src/App.js
```js
import React, { Component } from 'react'
import {
  Header
} from './components'

export default class App extends Component {
  render() {
    return (
      <>
        <h1>app</h1>
        <Header />
      </>
    )
  }
}

```

src/index.js

```js
import React from 'react'
import {render} from 'react-dom'

import App from './App'

render(
    <App/>,
    document.querySelector('#root')
)
```


<!--more-->


数据传递

App.js

```js
import React, { Component } from 'react'
import {
  TodoHeader,
  TodoInput,
  TodoList
} from './components'

export default class App extends Component {
  // state = {
  //   title: '待办事项'
  // }

  constructor() {
    super()
    this.state = {
      title: '待办事项',
      desc: '今日是，今日比'
    }
  }
  render() {
    return (
      <>
        <h1>app</h1>
        <TodoHeader
          desc={this.state.desc}
          x={1}
          y={2}
          z={3}
        >
          {this.state.title}
        </TodoHeader>
        <TodoInput btnText="Add" />
        <TodoList />
      </>
    )
  }
}
```

components/TodoHeader/index.js
```js
import React from 'react'
import PropTypes from 'prop-types'

export default function TodoHeader(props) {

    console.log(props)
    return (
        <>
            <h1>
                {props.children}
            </h1>
            <h3>
                {props.desc}
            </h3>
            <p> {props.x + props.y} </p>

        </>
    )
}

TodoHeader.propTypes = {
    desc: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number.isRequired,
    children: PropTypes.string.isRequired
}

```
