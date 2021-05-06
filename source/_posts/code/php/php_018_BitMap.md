---
title: 'PHP[018]:BitMap'
p: php/php_018_BitMap
date: '2019-03-19T23:20:09+08:00'
tags:
    - php
categories:
    - php

---



BitMap算法
```
<?php
$redisHost     = '127.0.0.1';
$redisPassWord = '';
$redisPort     = 6379;


$redis = new \Redis();
$redis->connect($redisHost, $redisPort);
$redis->setOption(\Redis::OPT_READ_TIMEOUT, -1);
$redisPassWord && $redis->auth($redisPassWord);
$cacheKey = 'asdhasdhsjahdjahdjkahs';
$maxOffSet = 4294967296;
$redis->setBit($cacheKey, 7, 0);

// 高危。。。 如果值很小调用get 没有问题，如果值很大，则会出现没有反应的情况
$result = $redis->get($cacheKey);
$result = $redis->getbit($cacheKey, 13000);

$start = microtime(true);
sleep(1);

echo (microtime(true) - $start) . PHP_EOL;
$start = microtime(true);
$result = $redis->bitCount($cacheKey);
echo (microtime(true) - $start) . PHP_EOL;
```