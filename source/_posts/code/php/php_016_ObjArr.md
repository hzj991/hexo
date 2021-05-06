---
title: 'PHP[016]:PHP 对象数组'
p: 'php/php_016_PHP 对象数组'
date: '2019-03-18T23:17:59+08:00'
tags:
    - php
categories:
    - php

---



```php
<?php

class Container implements ArrayAccess
{
    private $className = '';

    private $s = array();

    public function __construct($className)
    {
        if (!class_exists($className)) {
            throw new Exception('class is not found');
        }
        $this->className = $className;
    }

    public function offsetExists($key)
    {
        echo "you're trying to check if something exist" . PHP_EOL;
        return array_key_exists($key, $this->s);
    }

    public function offsetGet($key)
    {
        echo "you're trying to get something" . PHP_EOL;
        return isset($this->s[$key]) ? $this->s[$key] : '';
    }

    public function offsetSet($key, $value)
    {
        echo "you're trying to set something" . PHP_EOL;
        var_dump($value,$this->className);
        if ($value instanceof $this->className) {
            $this->s[$key] = $value;
        } else {
            throw new Exception('非法类型');
        }
    }

    public function offsetUnset($key)
    {
        echo "you're trying to unset something" . PHP_EOL;
        unset($this->s[$key]);
    }
}


class cat
{
    public $name = 'nihao';
}

$c = new Container(Cat::class);
$nihao = new Cat();



try {
    $c['asda'] = $nihao;
    $c['name'] = 'ben';
    // echo $c['name'] . PHP_EOL;
    // echo empty($c['age']) . PHP_EOL;
    // unset($c['name']);
    // echo empty($c['name']);
} catch (Exception $E) {
    echo $E->getMessage();
    echo $E->getLine();

}
var_dump($c);

function f(array $peole){

}

```