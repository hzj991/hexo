---
title: 'PHP[014]:IOC(依赖反转控制容器)'
p: php/php_013_IOC
date: '2019-03-18T23:17:57+08:00'
tags:
    - php
categories:
    - php

---



```php
<?php

/**
 * @author
 * ioc
 */
class Container
{
    protected $binds;

    protected $instances;

    public function bind($abstract, $concrete)
    {
        if ($concrete instanceof Closure) {
            $this->binds[$abstract] = $concrete;
        } else {
            $this->instances[$abstract] = $concrete;
        }
    }

    public function make($abstract, $parameters = [])
    {
        if (isset($this->instances[$abstract])) {
            return $this->instances[$abstract];
        }

        array_unshift($parameters, $this);

        return call_user_func_array($this->binds[$abstract], $parameters);
    }
}

class Superman
{
    protected $module;

    public function __construct(SuperModuleInterface $module)
    {
        $this->module = $module;
    }
}

class man
{
    public $age;
    public function __construct()
    {
        $this->age = 10;
    }
}

interface SuperModuleInterface
{
    /**
     * 超能力激活方法
     *
     * 任何一个超能力都得有该方法，并拥有一个参数
     *@param array $target 针对目标，可以是一个或多个，自己或他人
     */
    public function activate(array $target);
}


/**
 * X-超能量
 */
class XPower implements SuperModuleInterface
{
    public function activate(array $target)
    {
        // 这只是个例子。。具体自行脑补
    }
}

/**
 * 终极炸弹 （就这么俗）
 */
class UltraBomb implements SuperModuleInterface
{
    public function activate(array $target)
    {
        // 这只是个例子。。具体自行脑补
    }
}

// 创建一个容器（后面称作超级工厂）
$container = new Container();

// 向该 超级工厂 添加 超人 的生产脚本
$container->bind('superman', function ($container, $moduleName) {
    return new Superman($container->make($moduleName));
});

// 向该 超级工厂 添加 超能力模组 的生产脚本
$container->bind('xpower', function ($container) {
    return new XPower;
});

// 同上
$container->bind('ultrabomb', function ($container) {
    return new UltraBomb;
});

$container->bind('man', null);

var_dump($container);

// ******************  华丽丽的分割线  **********************
// 开始启动生产
$superman_1 = $container->make('superman', ['xpower']);
$superman_2 = $container->make('superman', ['ultrabomb']);
$superman_3 = $container->make('superman', ['xpower']);
$superman_4 = $concrete->make('man');
// ...随意添加

var_dump($superman_1, $superman_2, $superman_3);
```