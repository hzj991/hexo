---
title: jsx
date: '2020-02-05T20:40:18+08:00'
tags:
    - other
categories:
    - other

---



首先看一段原生php代码（不了解php没关系，下面就是一个原生html内嵌了一段php代码，在服务端，php的解释器会将php代码转换成html）

```php
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<?php
foreach(['a','b','c'] as $content){
    echo "
    <div>
    {$content}
    </div>
    ";
}
?>
</body>
</html>
```

客户端接收源码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <div>
    a
    </div>
    
    <div>
    b
    </div>
    
    <div>
    c
    </div>
    </body>
</html>
```

虽然现如今的php项目很少有这种代码了，但是过去，还有现在的一些单页面用php写的工具仍然有这种写法，一段html文本中内嵌了php代码，php或php-fpm将其中的`<?php xxx ?>`解析运行然后返回客户端。


接下来我们在看一下react的`public/index.html`和`src/index.js`

```html
<div id="root"></div>
```

```js
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```


其中
```js
<h1>Hello, {name}</h1>
```
这一段就是js和html的混合体，从是现实上感觉更像模板引擎，从使用上更像是html的增强，或者js的增强，就好比内嵌`<?php  xxx ?>`既像html的增强，也像php增强。编码上更加的方便直观。

[jsx](https://zh-hans.reactjs.org/docs/introducing-jsx.html)

确实挺不错。

代码合久必分分久必合?


<!--more-->


