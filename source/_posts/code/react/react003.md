---
title: 'React[003]样式'
date: '2020-01-29T18:44:00+08:00'
tags:
    - React
    - js
categories:
    - web

---




```
npm i classnames -S
npm i styled-components  -S
npm install -S prop-types 
```

<!--more-->

src/index.js

```js
import React, { Component } from 'react';
import { render } from 'react-dom'
import classNames from 'classnames';
import styled from 'styled-components'
import './index.css'

const Title = styled.h1`
    color:#f00
`

class App extends Component {
    render() {
        const style = { color: '#f00' }
        return (
            <div>
                <Title>元素中的样式</Title>
                <h1 > 元素中的样式 </h1>
                <ol>
                    <li style={style}>使用style内敛创建</ li>
                    <li className='has-text-red'>使用style内敛创建</ li>
                    <li className={classNames('a', { 'b': true, 'c': false })}>
                        要动态添加不同的className，就可以使用第三方的包,比如这个li标签只用a,b没有c
                    </li>
                </ol>
            </div>
        );
    }
}

render(
    <App />,
    document.querySelector('#root')
);
```

src/index.css


```css
.has-text-red {
    color: #f00
}
```

