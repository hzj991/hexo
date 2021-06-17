---
title: 'php[026]性能分析xhprof'
date: '2021-06-17 06:27:06'
tags:
    - php
categories:
    - other
---

# php 层次式性能分析器
  
  
[php官网xhprof介绍](https://www.php.net/manual/zh/book.xhprof.php)  
[pecl_xhprof](http://pecl.php.net/package/xhprof)

目前xhprof有着比较新的更新，pecl显示是原来版本fork后的版本。不过一致到8都提供了支持。所以可以在开发测试环境使用来分析代码的运行状况


# install

> 如果不能直接下周或许需要 sudo pecl install xhprof ，或者先进行 pecl 的更新

```
pecl install xhprof
```

之后将`extension=xhprof.so` 加入对应的 `php.ini`（注意区分fpm和cli的ini配置是否相同）

接着可以配合已经浅封装的php代码进行分析  
[https://github.com/phacility/xhprof](https://github.com/phacility/xhprof)  

其中如果是web项目可以进行双入口控制，在另一个入口中引入原来的入口。这样对原有代码污染。


如新的 `index.php`

```php
<?php
xhprof_enable(XHPROF_FLAGS_CPU + XHPROF_FLAGS_MEMORY);

require __DIR__ . '/../ifang_php_forgelogin/phpapps/forgelogin/src/public/index.php';


$xhprof_data = xhprof_disable();

$XHPROF_ROOT = __DIR__;
include_once $XHPROF_ROOT . "/xhprof_lib/utils/xhprof_lib.php";
include_once $XHPROF_ROOT . "/xhprof_lib/utils/xhprof_runs.php";

$xhprof_runs = new XHProfRuns_Default();
$run_id      = $xhprof_runs->save_run($xhprof_data, "xhprof_testing");

$str = "http://localhost/xhprof/xhprof_html/index.php?run={$run_id}&source=xhprof_testing\n";

file_put_contents(__DIR__.'/tmp.log',$str);
```


# 图形化显示依赖graphviz

安装graphviz
```
apt update 
apt install graphviz
```

