---
title: how to use hexo
date: '2020-01-19T23:26:00+08:00'
tags:
    - other
categories:
    - HowToUse

---

<!-- TOC -->

- [搓手手](#搓手手)
  - [开发点评系统](#开发点评系统)
  - [编写迁移脚本](#编写迁移脚本)

<!-- /TOC -->
<!--more-->

# 搓手手

## 开发点评系统

周末两天用 symfony 写了个小的点评系统，接入到 hexo 搭建的博客上，下面放上 git 地址

`https://github.com/hzjoyous/api.nonodi.com`
前端代码 --baseUri要替换成自己的--
```html

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>blog</title>
</head>

<body>

    <style type="text/css">
        @charset "utf-8";

        #commentsProvidedHzj {
            padding: 10px;
            border-top: 2px solid #cccccc;
            border-bottom: 2px solid #cccccc;
            font-family: "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "WenQuanYi Micro Hei", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif;
            letter-spacing: 0.05em;
        }

        #commentsProvidedHzj .avatar {
            width: 10%;
            float: left;
            padding-top: 7px;
        }

        #commentsProvidedHzj .comment-info {
            width: 85%;
            float: left;
            line-height: 1em;
            margin-left: 10px;
        }

        #commentsProvidedHzj .comment-info .nickname {
            font-size: 18px;
            font-weight: bold;
            line-height: 1.5em;
        }

        #commentsProvidedHzj .comment-info .time {
            font-size: 13px;
            color: #999999;
        }

        #commentsProvidedHzj .comment-info .content {
            border-top: 2px dotted #cccccc;
            padding-top: 5px;
            font-size: 15px;
            font-weight: 300;
            line-height: 1.5em;
            width: auto;
        }

        #commentsProvidedHzj .comment-info a.reply {
            display: block;
            float: right;
            font-size: 14px;
            color: #999999;
            cursor: pointer;
        }

        #commentsProvidedHzj input,
        #commentsProvidedHzj textarea,
        #commentsProvidedHzj button {
            border: none;
            box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
            border-radius: 2px;
        }

        #commentsProvidedHzj input {
            width: 28%;
            margin: 0;
            padding: 5px;
            margin-right: 2%;
            height: 32px;
            font-size: 18px;
            line-height: 32px;
        }

        @media only screen and (max-width: 720px) {

            #commentsProvidedHzj input,
            #commentsProvidedHzj textarea {
                border: 1px solid #cccccc;
            }

            #commentsProvidedHzj input {
                width: 27%;
            }
        }

        @media only screen and (max-width: 400px) {
            #commentsProvidedHzj input {
                margin-right: 1%;
            }
        }

        @media only screen and (max-width: 350px) {
            #commentsProvidedHzj input {
                margin-right: 0;
            }
        }

        #commentsProvidedHzj textarea {
            width: 96%;
            font-size: 18px;
            line-height: 24px;
            margin-top: 10px;
            padding: 5px;
        }

        #commentsProvidedHzj button {
            width: 10%;
            margin-left: 5px;
            margin-top: 10px;
            appearance: button;
            cursor: pointer;
            color: #fff;
            background-color: #5cb85c;
            border-color: #4cae4c;
            height: 32px;
            min-width: 80px;
        }
    </style>

    <div id="commentsProvidedHzj">
        <div class="commment">
            <div v-for="comment in info" class="comment">
                <div class="avatar"><img :src="comment.avatarUri" alt="nihao avatar"></div>
                <div class="comment-info">
                    <div class="nickname">${comment.nickname}</div>
                    <div class="time">${comment.createTime}</div>
                    <div class="content">${comment.content}</div>
                    <a class="reply" herf="#submit4hzj">回复</a>
                </div>
            </div>
        </div>
        <div style="clear: both; height: 30px;"></div>
        <div class="submit">
            <input type="text" class="nickname" v-model="submit.nickname" placeholder="nickname（必填）">
            <input type="text" class="email" v-model="submit.email" placeholder="email">
            <input type="text" class="website" v-model="submit.website" placeholder="website">
            <br>
            <textarea name="" id="submit4hzj" cols="30" rows="10" class="content" v-model="submit.content"
                placeholder="content（必填）"></textarea>
            <button v-on:click="submitComment()">提交评论</button>
        </div>
    </div>
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue"></script> -->
    <script src="https://vuejs.org/js/vue.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
        $app = new Vue({
            delimiters: ['${', '}'],
            el: '#commentsProvidedHzj',
            data: {
                info: null,
                submit: {
                    'nickname': '',
                    'email': '',
                    'website': '',
                    'uuid': '',
                    'content': ''
                },
                baseUri: 'https://xxx.xxx.com',
            },
            mounted() {
                var identity = window.location.href;

                axios.get(this.baseUri + '/comments', {
                    params: {
                        uuid: this.submit.uuid,
                        identity: identity
                    }
                }).then(response => (
                    this.info = response.data.value.comments,
                    this.submit.uuid = response.data.value.uuid
                ))
                    .catch(error => console.log(error))

            },
            methods: {
                submitComment: function () {
                    axios.get(this.baseUri + '/addComment', {
                        params: {
                            nickname: this.submit.nickname,
                            email: this.submit.email,
                            website: this.submit.website,
                            uuid: this.submit.uuid,
                            content: this.submit.content
                        }
                    })
                        .then(response => (console.log(response.data)))
                        .catch(error => console.log(error))

                    var identity = window.location.href;
                    axios.get(this.baseUri + '/comments', {
                        params: {
                            uuid: this.submit.uuid,
                            identity: identity
                        }
                    }).then(response => (
                        this.info = response.data.value.comments,
                        this.submit.uuid = response.data.value.uuid
                    ))
                        .catch(error => console.log(error))
                        
                }
            }
        });
    </script>
</body>

</html>
```


## 编写迁移脚本
 
之前由于用不惯hexo自带的生成文章的方式于是单独写了个php文件辅助生成，由于写的比较匆忙导致也有些bug。时间推移就想改进以下，因为不想在hexo中大量引入php，于是决定废弃这个项目中的php运行文件。（个人看法是不希望php项目中夹杂node工具，node项目中也不要夹杂php工具，这样容易使项目所有功能都跑起来依赖的基建比较多，增加别人参考的成本）



这里先放上之前的php脚本

phelper.php 里面主要部分就是创建文件夹，创建默认文件，日期，和用vscode唤起

```php
<?php

$blogPath = __DIR__ . DIRECTORY_SEPARATOR . 'source' . DIRECTORY_SEPARATOR . '_posts' . DIRECTORY_SEPARATOR;

if (isset($argv[1]) && isset($argv[2])) {
    $blogName = $argv[2];
    $blogNamespace = $argv[1];
} else if (isset($argv[1])) {
    $blogName = $argv[1];
    $blogNamespace = 'other';
} else {
    $blogName = date('Y_m_d') . "杂谈";
    $blogNamespace = 'other';
}

$createTime = date('Y-m-d H:i:s');



$content = "---\n";
$content .= "title: " . $blogName . "\n";
$content .= "date: " . $createTime . "\n";
$content .= "tags: " . 'other' . "\n";
$content .= "categories: " . 'other' . "\n";
$content .= "---\n";
$content .= "

<!--more-->

";
$newBlogFilePath =  $blogPath . DIRECTORY_SEPARATOR . $blogNamespace . DIRECTORY_SEPARATOR . 'z_' . $blogName . '.md';
if (file_exists($newBlogFilePath) == 1) {
    $newBlogFilePath =  $blogPath . DIRECTORY_SEPARATOR . $blogNamespace . DIRECTORY_SEPARATOR . 'z_' . $blogName . time() . '.md';
}



file_put_contents($newBlogFilePath, $content, 8);
echo realpath($newBlogFilePath);
echo PHP_EOL;

exec('code '.$newBlogFilePath);
```

如果我继续使用php编写cli脚本的话，我可能就会期望选用 symfony/console 来定制我需要的交互式命令，因为决定不使用php，所以我需要在npm中寻找对应的包，**毕竟都不是新型语言，所以在这种辅助类工具开发上，一旦需求变高，找轮子要优于造轮子**，首先我在[npm](https://www.npmjs.com/)中搜索 command 和 console ,但是结果显示的包更新日期都比在数个月以上了。所以决定更换查找方式。于是决定先参考以下vue-cli引用了类似的包，这里用的everything进行的查询

![EveryThing搜索结果](/images/2020/未命名1579419556.png)

打开该目录，进入bin文件夹下打开vue（win下可执行文件都是.exe后缀，直接可运行的脚本大多都是.bat然后驱动一个其他脚本语言的脚本，所以这个文件大概率就是个node编写的脚本）

打开bin/vue

```
#!/usr/bin/env node

const program = require('commander')

program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'generate a new project from a template')
  .command('list', 'list available official templates')
  .command('build', 'prototype a new project')
  .command('create', '(for v3 warning only)')

program.parse(process.argv)
```

这个文件中引入了commander，于是我们可以去npm查以下这个包，查询结果

![npm中commander查询结果](/images/2020/QQ截图20200119154714.png)

最后一次更新也比较近（虽然这不是评价一个包好坏的标准）。

进入文档查询。然后就比较失望了，这个commander只提供了参数式的使用方式并没有提供交互式的cli方式。所以并不满足我的需求。

下一步直接查询`node 交互式cli`，然后在第一个结果中看到有人指出了inquirer，chalk这两个包，接下来又到知乎逛了以下，了解了以下inquirer和commander，基本确认inquirer、chalk、commander这三个包是我需要的扩展。也比较主流，只是觉得并不像symfony/console对控制台提供的那样全面一些吧，symfony/console提供了参数式、交互式及一定程度的美化、也提供了一些进度条呀，table之类的展示方式。感觉未来node的这三个包也会被其他开发整合到一起来使用。


