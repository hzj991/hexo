---
title: laravel-auth
toc: true
date: 2021-03-23 22:27:35
thumbnail: https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20190919221611.png
tags:
  - other
  - blog
categories:
  - other

---

laravel 的 auth 生效流程

laravel `bootstrap\app` 中分别注册了 http 的中间件，和 ServiceProvider (服务提供者) 这两个东西。 
但是在实际的生命周期中， 服务提供者  ServiceProvider 会先于 http 中间件先执行。 而 AuthServiceProvider 从结果上来说，可以认为他默认的行为是通过约定的方式，从 request 中获取 api_token 的值，然后在数据库中查询此 api_token 是否存在对应的 user 并设置在 auth 的一个属性。当你在 Authenticate 这个 http 中间件中调用 `$this->auth->guard($guard)->guest()` 实际上就是判断当前 auth 的 user 属性是否存在。不存在说明之前用 api_token 并没有查到 user 。所以如果需要定制化这一块，比如更换 token 的传输方式，或者 user 的获取方式， 需要更改服务提供者就可以。一般情况下不需要更改中间件。如果你需要给某些账户可以跳过中间件也可以在 http 中间件的代码的修改。不过一般来说是不需要修改中间件的。


<!--more-->


