---
title: 'PHP[012]:TypeCode'
p: php/php_012_typeCode
date: '2018-10-27T17:48:45+08:00'
tags:
    - php
categories:
    - php

---



如何利用php严格模式写出理想的代码

php限定类型
```php
function returnIntByBool(bool $param):int
{
    if($param){
        $result = 1;
    } else {
        $result = 2;
    }
    return $result;
}
```

php严格模式开启
```php
declare (strict_types = 1);
```



```php

<?php
declare (strict_types = 1);

function returnArr($param) : array
{
    if ($param) {
        return [];
    }
}

try {
    var_dump(returnArr(1));
} catch (\Throwable $e) {
    echo ($e->getMessage());
}

try {
    var_dump(returnArr(0));
} catch (\Throwable $e) {
    echo ($e->getMessage() . PHP_EOL);
}

function returnArrByBoolean(bool $param) : array
{
    if ($param) {
        return [];
    }
}


try {
    var_dump(returnArrByBoolean(1));
} catch (\Throwable $e) {
    echo ($e->getMessage() . PHP_EOL);
}

try {
    var_dump(returnArrByBoolean(true));
} catch (\Throwable $e) {
    echo ($e->getMessage() . PHP_EOL);
}


function returnArrayByBooleanUseFormat(bool $param) : array
{
    $result = [];
    if ($param) {
        $result = ['param' => true];
    }
    return $result;
}

try {
    var_dump(returnArrayByBooleanUseFormat(true));
} catch (\Throwable $e) {
    echo ($e->getMessage() . PHP_EOL);
}


try {
    var_dump(returnArrayByBooleanUseFormat(false));
} catch (\Throwable $e) {
    echo ($e->getMessage() . PHP_EOL);
}

```