---
title: react-router/react-router-dom二级目录写法
date: '2020-02-14T06:30:36+08:00'
tags:
    - react
categories:
    - web

---




**注意第一种方法是react-route,二三种方法是react-router-dom，但是第二种方法个人不推荐**
*目前博客的jsx语法显示有些缺陷*

三种写法，第一种根据react-router但是我没有写成功
```jsx
 <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path="/messages/:id" component={Message} />
        {/* 跳转 /inbox/messages/:id 到 /messages/:id */}
        <Redirect from="messages/:id" to="/messages/:id" />
      </Route>
    </Route>
  </Router>
```

第二种，b站教学视频，可以运行正确，但是失去层级意义，代码有冗余信息
个人认为这是一种错误写法，为了要起到二级目录的效果，所有的path都要写成二级目录的形式才能生效，导致该写法Switch中直接在Children编写相同，所以不要用这种写法

```jsx
<Router>
    <Switch>
    {/* 下面的Route组件的path没有生效
    */}
    <Route path="/admin" render={
            () => {
                return (
                    <Switch>
                        <Route path="/admin/" component={Admin} exact />
                        <Route path="/admin/article" component={Article} />
                        {/* 下面的不能正确匹配 */}
                        <Route path="/articleEdit" component={ArticleEdit} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/setting" component={Setting} />
                    </Switch>
                )
            }
        } />
    </Switch>
</Router>
```

第三种，嵌套一目了然，同react-router但是可运行,有层级结构，代码简洁。推荐

```jsx
<Router>
    <Switch>

        {/* to do 结构待优化 */}
        <Route component={Home} path='/home' exact />
        <Router basename="/admin">
            <Switch>
                <Route path="/" component={Admin} exact />
                <Route path="/article" component={Article} />
                {/* 下面的不能正确匹配 */}
                <Route path="/articleEdit" component={ArticleEdit} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/setting" component={Setting} />

            </Switch>
        </Router>
    </Switch>
</Router>

```

<!--more-->


