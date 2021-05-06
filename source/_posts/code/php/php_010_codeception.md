---
title: 'PHP[010]:codeception'
date: '2018-10-27T17:48:43+08:00'
tags:
    - php
categories:
    - php

---


# codeception

创建单元测试
```shell
$.\vendor\bin\codecept run g:test unit src/CouponAccountClient
# Test was created in C:\Users\hzj\Desktop\xz\xz_stub-client\tests\unit\src\CouponAccountClientTest.php
```
运行单元测试
```shell
$  .\vendor\bin\codecept run  tests\unit\src\CouponAccountClientTest.php
Codeception PHP Testing Framework v2.5.1
Powered by PHPUnit 7.3.5 by Sebastian Bergmann and contributors.
Running with seed:


Unit Tests (1) -------------------------------------------------------------------------------------------------------------------------------------------

+ CouponAccountClientTest: Some feature (0.03s)
-------------------------------------------------------------------------------------------------------------------------------------------

Time: 749 ms, Memory: 10.00MB

OK (1 test, 0 assertions)

```
