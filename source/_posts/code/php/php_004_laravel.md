---
title: 'PHP[004]:laravel 5.5'
date: '2018-10-27T17:48:36+08:00'
tags:
    - php
categories:
    - php

---



```
运行 Laravel Mix
Laravel Mix 一款前端任务自动化管理工具，使用了工作流的模式对制定好的任务依次执行。Mix 提供了简洁流畅的 API，让你能够为你的 Laravel 应用定义 Webpack 编译任务。Mix 支持许多常见的 CSS 与 JavaScript 预处理器，通过简单的调用，你可以轻松地管理前端资源。

使用 Mix 很简单，首先你需要使用以下命令安装 npm 依赖即可。我们将使用 Yarn 来安装依赖，在这之前，因为国内的网络原因，我们还需为 Yarn 配置安装加速：

$ yarn config set registry https://registry.npm.taobao.org
使用 Yarn 安装依赖：

$ yarn install
安装成功后，运行以下命令即可：

$ npm run watch-poll
watch-poll 会在你的终端里持续运行，监控 resources 文件夹下的资源文件是否有发生改变。在 watch-poll 命令运行的情况下，一旦资源文件发生变化，Webpack 会自动重新编译。

注意：在后面的课程中，我们需要保证 npm run watch-poll 一直处在执行状态中。
```


```php
7. 线上部署须知
在开发环境中，我们为了测试方便，直接在命令行里调用 artisan horizon 进行队列监控。然而在生产环境中，我们需要配置一个进程管理工具来监控 artisan horizon 命令的执行，以便在其意外退出时自动重启。当服务器部署新代码时，需要终止当前 Horizon 主进程，然后通过进程管理工具来重启，从而使用最新的代码。

简而言之，生产环境下使用队列需要注意以下两个问题：

使用 Supervisor 进程工具进行管理，配置和使用请参照 文档 进行配置；
每一次部署代码时，需 artisan horizon:terminate 然后再 artisan horizon 重新加载代码。
```