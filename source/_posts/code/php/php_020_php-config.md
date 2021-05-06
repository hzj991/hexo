---
title: 'PHP[020]:--with-php-config'
p: php/--with-php-config
date: '2020-01-15T23:20:09+08:00'
tags:
    - php
categories:
    - php

---



```
configure: WARNING: unrecognized options: --with-php-config
```

原因：不应该在php源码根目录执行编译命令

例如需要安装readline扩展，应执行以下步骤

```
# 进入对应的php扩展源码目录
cd ext/readline
# 运行phpize，该命令会生成./configure
xxx/xxx/xxx/xxx/phpize
./configure --with-readline
```