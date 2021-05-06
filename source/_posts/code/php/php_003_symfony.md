---
title: 'PHP[003]:symfony'
date: '2018-10-27T17:48:36+08:00'
tags:
    - php
categories:
    - php

---




```
composer create-project symfony/skeleton my-project
cd my-project
composer require symfony/web-server-bundle --dev
composer require annotations         # 注释分析
composer require symfony/orm-pack
composer require symfony/maker-bundle --dev
composer require --dev symfony/profiler-pack # 开发调试工具
composer require sensio/framework-extra-bundle # 自动查询
composer require doctrine/doctrine-fixtures-bundle --dev  # 测试数据
composer require symfony/messenger
composer require symfony/serializer-pack #待定
```


### 起步
```shell
#symfony 提供两种项目 symfony/skeleton 是轻量的， symfony/website-skeleton 是比较重的，具有较全的web功能
#选择轻量的面向 api 和 console 的 symfony/skeleton 起步
#使用 composer 安装symfony
composer create-project symfony/skeleton my-project
#使用 symfony-cli 安装symfony
symfony new xz_symfony
```

symfony[Configuring a Web Server](https://symfony.com/doc/current/setup/web_server_configuration.html)  
symfony[Requirements for Running Symfony](https://symfony.com/doc/current/reference/requirements.html)  
进入项目安装开发时使用的 web server 组件  
```shell
cd xz_symfony
composer require symfony/web-server-bundle --dev
```

```shell
composer require annotations         # 注释分析
php bin/console debug:router         # 查看所有的路由
composer require symfony/twig-bundle # symfony 的模板引擎
php bin/console debug:autowiring     # 查看所有可以注入的服务

```

[The Symfony MakerBundle](https://symfony.com/doc/current/bundles/SymfonyMakerBundle/index.html)
```shell
composer require symfony/maker-bundle --dev          # 引入 maker-bundle
php bin/console make:controller BrandNewController   # 创建一个新的控制器
```

```
php bin/console config:dump-reference framework
```

```
composer require symfony/orm-pack
composer require symfony/maker-bundle --dev
php bin/console doctrine:database:create
php bin/console list doctrine
php bin/console make:entity
php bin/console make:migration
```

```
php bin/console doctrine:query:sql 'SELECT * FROM product'
composer require sensio/framework-extra-bundle # 自动查询
composer require doctrine/doctrine-fixtures-bundle --dev  # 测试数据
php bin/console doctrine:fixtures:load
```


next
```
# 全局唯一id
# fixtures 文件的生成位置
php bin/console make:fixtures

```