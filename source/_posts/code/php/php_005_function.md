---
title: 'PHP[005]:function'
date: '2018-10-27T17:48:38+08:00'
tags:
    - php
categories:
    - php

---



```php
<?php
ob_start();
debug_print_backtrace($needBacktrace === 2 ? 1 : 0);
$trace = ob_get_contents();
ob_end_clean();
```

```php
<?php
define('PROJECT_START', microtime(true));
$message = [
    'memory_used'  => memory_get_usage(),
    'running_time' => (microtime(true) - PROJECT_START),
    'action_name'  => $actionName
];
```