---
title: 'PHP[013]:fp'
p: php/php_013_fp
date: '2019-03-18T23:17:56+08:00'
tags:
    - php
categories:
    - php

---



```php
<?php
function add(...$ints)
{
    return $func = function (...$int) use (&$func, &$ints) {
        if (count($int) === 0) {
            return array_sum($ints);
        } else {
            $ints = array_merge($int, $ints);
            return $func;
        }
    };
}

$r = add(1, 2, 3)(4)(5)(1, 2, 3, 4, 5)();

echo '结果:' . $r;
```