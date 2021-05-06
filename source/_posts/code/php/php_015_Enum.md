---
title: 'PHP[015]:PHP Enum'
p: 'php/php_015_PHP Enum'
date: '2019-03-18T23:17:58+08:00'
tags:
    - php
categories:
    - php

---



```php
<?php

abstract class Enum
{
    protected $value;

    protected static $enumList = [];

    public function __construct($enum)
    {
        $enumClassName = get_called_class();
        if (isset(self::$enumList[$enumClassName])) {
            $enumList = self::$enumList[$enumClassName];
        } else {
            $objClass = new \ReflectionClass($enumClassName);
            $enumList = $objClass->getConstants();
            self::$enumList[$enumClassName] = $enumList;
        }
        if (!in_array($enum, $enumList, true)) {
            throw new Exception('Error Type');
        }
        $this->value = $enum;
    }

    public function __set($name, $value)
    {
        if ($name === 'value') {
            $enumClassName = get_called_class();
            if (!in_array($value, self::$enumList[$enumClassName], true)) {
                throw new Exception('Error Value');
            }
            $this->value = $value;
        } else {
            throw new Exception('Error Type');
        }
    }

    public function __get($name)
    {
        if ($name === 'value') {
            return $this->value;
        } else {
            throw new Exception('Error Type');
        }
    }

    public function __invoke($enum)
    {
        $enumClassName = get_called_class();
        if (!in_array($enum, self::$enumList[$enumClassName], true)) {
            throw new Exception('Error Value');
        }
        $this->value = $enum;
    }
}

class Day extends Enum
{
    const MON = 'MON';
    const TUE = 'TUE';
    const WED = 'WED';
    const THU = 'THU';
    const FRI = 'FRI';
    const SAT = 'SAT';
    const SUN = 'SUN ';
}

$day = new Day(Day::FRI);


echo $day->value;

try{
    $day->value = Day::MON;
} catch(Exception $e){
    var_dump($e);
}


try{
    $day->value = 'nihao';
} catch(Exception $e){
    var_dump($e->getMessage());
}


```