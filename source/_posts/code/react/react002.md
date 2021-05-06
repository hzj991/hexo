---
title: 'React[002]:jsx'
date: '2020-01-29T18:45:00+08:00'
tags:
    - React
    - js
categories:
    - web

---



js/jsx/js=>jsx

src/index.js

```js
import React, { Component} from "react";

import { render } from 'react-dom';


// 表示一个虚拟DOM树的方式
// const app = {
//     tag: 'div',
//     attrs: {
//         className: 'app',
//         id: 'appRoot'
//     },
//     Children: [
//         {
//             tag: 'h1',
//             attrs: {
//                 className:'title'
//             },
//             Children:[
//                 'js原理'
//             ]
//         },
//         {
//             tag:'p',
//             attrs:null,
//             Children:[
//                 '类组件时继承React.Comopnent的'
//             ]
//         }
//     ]
// };

// 使用类的形式创建的组件
// class App extends Component {
//     render() {
//         console.log(this.props)
//         return (
//             <div className="app" id="appRoot">
//                 <h1 className="title">!!!</h1>
//                 <p>{this.props.desc}</p>
//             </div>
//         )
//     }
// }
// const app = new App({
//     desc: '类组件时继承React.Comopnent的'
// }).render()


// 所以react在真正渲染的时候会把z真正的react代码生成js代码
class App extends Component { 
    render(){
        // React.createElement 用于创建元素
        return React.createElement(
            'div',
            {
                className:'app',
                id:'appRoot'
            },
            React.createElement(
                'h1',
                {
                    className:'title'
                },
                'jsx原理'
            ),
            React.createElement(
                'p',
                null,
                '类组件时继承React.Comopnent的'
            )
        );
    }
}


render(
    <App desc="类组件时继承React.Comopnent的" />,
    document.querySelector('#root')
)


```