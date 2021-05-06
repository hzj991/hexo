---
title: JekyllToHexo
date: '2018-11-05T02:31:58+08:00'
tags:
    - other
categories:
    - other

---


# githubPage 博客迁移

>  从 jeyll 到 hexo

hexo 的中文文档较为健全，我这里就只引入一下我参考部署相关的一些参考网站，
```
https://hexo.io/zh-cn/
http://theme-next.iissnan.com/getting-started.html
```

# 个人补充

> jeyll 和 hexo 虽然从效果上看都可以将个人博客部署到 githubPage , 但个人看来在部署上还是有实现上的差别, jeyll 是基于 reby 由模板引擎渲染生成, hexo 则是将一整套静态网页部署到github。(个人感觉在 jeyll 投入过多，只是在重复的学习后端轮子的使用，倒不如切换到 hexo)

关于 hexo 的部署，网上有详细的操作，这里只是对 hexo generator repo 保存的补充，当使用 git 引入别的 themes 时，如果对themes 进行改动时，要注意将 themes 进行保存提交 ，一个方案是将 themes 单独作为一个项目保存， 另一个方案是将该主题的仓库清除，并入 hexo generator repo 保存，命令如下
```shell
git rm -r --cached some-directory
git commit -m "Remove the now ignored directory some-directory"
git push -u origin master
```

参考:  
[github上文件夹都是灰色-解决办法](https://blog.csdn.net/XIAOZHUXMEN/article/details/51536967?locationNum=11)
[使用hexo，如果换了电脑怎么更新博客？](https://www.zhihu.com/question/21193762)
[Hexo Next主题 设置圆形头像并旋转](https://www.cnblogs.com/zjcao/p/9275103.html)

# hexo hello world


Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/deployment.html)

