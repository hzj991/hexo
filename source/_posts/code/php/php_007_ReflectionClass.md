---
title: 'PHP[007]:ReflectionClass'
date: '2018-10-27T17:48:40+08:00'
tags:
    - php
categories:
    - php

---




## 调用类私用方法
```php
<?php

class Cat
{
    private function want($see)
    {
        echo $see.$see.$see.PHP_EOL;
    }
}

$reflector = new ReflectionClass(Cat::class);
$instance  = $reflector->newInstance();
$method    = $reflector->getmethod('want');
$method->setAccessible(true);
$result = $method->invoke($instance, 'eat food ');
```

## 实例化不可实例的类

使用这个的原因是因为拆分老的业务代码中，有个一个 Aentity 依赖另一个 Bentity （在orm层中调用get_class），如果查询或者Bentity提供的创建方法会导致将其注册到 UnitOfWork 中，会导致最后的入库（虽然也有可能不入库），所以采用  ReflectionClass::newInstanceWithoutConstructor 实例化一个在 get_class 范围内等价的 entity ,并将其作为一个临时的参数对象代替 Bentity 维持代码的运作

```php
<?php
function println(String $str)
{
    echo($str.PHP_EOL);
}

class Dog
{
    protected $name;

    private function __construct($name = 'WangCai')
    {
        $this->name = $name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getName()
    {
        return $this->name;
    }
}

$reflector = new ReflectionClass(Dog::class);
$dog = $reflector->newInstanceWithoutConstructor();
$dog->setName('DeFu');
$class = get_class($dog);
println($class);
println($dog->getName());
```