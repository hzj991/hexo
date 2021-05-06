---
title: 'React[001]:初体验'
date: '2020-01-28T23:01:00+08:00'
tags:
    - React
    - js
categories:
    - web

---



# 小样儿挺别致呀，写起来的感觉

安装nodejs,npm,npx

vscode 插件

```
ES7 React/Redux/GraphQL/React-Native snippets
```

如果网差，可能安装失败

```
npx create-react-app simple-react-web
cd simple-react-web
mv src src-bak
mkdir src
cd src
touch index.js
```

```
npm i classnames -S
npm i styled-components  -S
npm install -S prop-types 
```

index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'

// const createApp = (props) => {
//     return (
//         <div>
//             {/*sadasdasd */}
//             <h1>Welcome {props.title}</h1>
//         </div>
//     )
// }

// const app = createApp({
//     title: 'my react'
// })

const App = (props) => {
    return (
        <div>
            {/*sadasdasd */}
            <h1>Welcome {props.title}</h1>
            <p> 写起来很别致呀{props.title}</p>
            <p title={props.title}></p>
        </div>
    )
}


ReactDOM.render(
    <App title='1901' />
    ,
    document.querySelector('#root')
)
```

挺别致

<!--more-->


