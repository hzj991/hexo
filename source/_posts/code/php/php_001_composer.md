---
title: 'PHP[001]:Composer'
date: '2018-10-27T17:48:32+08:00'
tags:
    - php
categories:
    - php

---



> https://github.com/slince/composer-registry-manager

```php
$ composer repo:ls
  composer       https://packagist.org
  phpcomposer    https://packagist.phpcomposer.com
* composer-proxy https://packagist.composer-proxy.org
  laravel-china  https://packagist.laravel-china.org
```

```
$ composer repo:use
Please select your favorite registry (defaults to composer)
  [0] composer
  [1] phpcomposer
  [2] composer-proxy
  [3] laravel-china
 >
```

```
$ composer repo:use phpcomposer
```