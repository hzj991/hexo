---
title: 'TS''s enum'
date: '2020-01-28T00:27:00+08:00'
tags:
    - other
categories:
    - other

---



```ts
enum Color {Red, Green, Blue}
```

```js
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
```

```js
// 声明
var color;
// 闭包实现enum的赋值
var setColorEnum = function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
}

// 调用闭包赋值 这里是分了两部，第一步判断Color是否存在，如果不存在将color声明为一个对象，对象的数值操作相当于引用操作，直接会改变原值，

if(Color || (Color = {})){
    Color["Red"] = 0;
    Color[Color["Red"]] = "Red";
}

```


由于php中直接声明的变量obj是obj，array是array。所以需要先创建一个enum类实现array接口这样就可以实现与上述代码相同的赋值行为。代码如下

```php
<?php

class enum implements ArrayAccess
{
    private $container = array();
    public function offsetSet($offset, $value)
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }
    public function offsetExists($offset)
    {
        return isset($this->container[$offset]);
    }
    public function offsetUnset($offset)
    {
        unset($this->container[$offset]);
    }
    public function offsetGet($offset)
    {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }
}

$Color;

(function ($Color) {
    $Color[$Color->Red = 0] = "Red";
    $Color[$Color->Green = 1] = "Green";
    $Color[$Color->Blue = 2] = "Blue";
})(($Color = new enum()));

var_dump($Color);
var_dump($Color->Red);
var_dump($Color->Green);
var_dump($Color->Blue);
var_dump($Color[0]);
var_dump($Color[1]);
var_dump($Color[2]);

```

终端输出

```
object(enum)#2 (4) {
  ["container":"enum":private]=>
  array(3) {
    [0]=>
    string(3) "Red"
    [1]=>
    string(5) "Green"
    [2]=>
    string(4) "Blue"
  }
  ["Red"]=>
  int(0)
  ["Green"]=>
  int(1)
  ["Blue"]=>
  int(2)
}
int(0)
int(1)
int(2)
string(3) "Red"
string(5) "Green"
string(4) "Blue"
```