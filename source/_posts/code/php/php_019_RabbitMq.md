---
title: 'PHP[018]:RabbitMq'
p: php/php_018_RabbitMq
date: '2019-03-19T23:20:09+08:00'
tags:
    - php
categories:
    - php

---




# rabbitMq

## exchange
| type    | 作用                        |
|---------|-----------------------------|
| fanout  | 绑定即 接收                 |
| direct  | 绑定并匹配符合时 接收       |
| topic   | 绑定并模糊匹配符合时接收    |
| headers | 绑定并匹配headers规则时接收 |

exchange 和 exchange 是多对多的关系

exchange 和 queue 也是多对多的关系

`树挪死，人挪活`

mq 的具体使用还是看场景，从业务严格的程度来说 direct 和 headers 都是比较不错的交换机类型，尽管`书本上说 headers 比 topic 慢`，但是 headers 的扩展性和可读性在某些业务场景下比 topic 要好很多。

毕竟一天 8000 订单 ，按照一个订单的生命周期可以发送 create,pay,confirm,waitcheckin,checkin 这些事件，且每个单子都可以发出这些事件，一天不过 8000*5 = 40000。是一个比较可控的范围

用 headers 表示一个订单的 bookfrom 和 lodgeUnitType 是比较容易的
```php
$headers = [
    'actionType'=>'xxx',
    'bookFrom'=>'xxxxx',
    'lodgeUnit'=>'xxx',
];
``` 
如果用 topic 表示的话，就变得丑陋很多
```php
<?php
$topoc = "actionType:{$actionType};bookFrom:{$bookFrom};lodgeUnitType:{$lodgeUnitType}";
```
并且规则的书写也不如 headers 来的直接，明确。