---
title: 'React_Webpack_alias&&vscode_use_alias'
date: '2020-02-07T07:17:57+08:00'
tags:
    - React
    - vscode
    - js
    - web
categories:
    - other

---



今天看react的项目目录里view和components是分开的，但是view里面有引用components的组件，然后from'../../xxxx'这种丑陋的引用路径就冒出来了。

之前使用laravel的时候记得里面的js资源（laravel里面的前端资源真是一条龙。全栈工具箱。。。），有用`@`代替路径，于是进行了查找`react 别名` `react alias` ，查找的结果是customize-cra、react-app-rewired 这两个库，一个用于更改webpack的alias ，一个用于代替react-scripts,

具体使用比较简单，引入上述包后，创建config-overrides.js在项目根目录下

```js
const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')
const resolve = dir => path.join(__dirname, '.', dir)

module.exports = override(
    addWebpackAlias({
        ['@']: resolve('src')
    })
)
```

这样就可以稍微美化一下引用路径

然后问题就来了，vscode不知道你这个别名的路径了

(○´･д･)ﾉ fuck

不过这种东西查一下总是有办法的，而且办法超乎寻常的简单。。

在项目目录下创建一个jsconfig.json

```json
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "exclude": [
        "build"
    ]
}
```

万事大吉 🐂🍺






<!--more-->


