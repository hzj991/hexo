---
title: 'php[025]发布composer'
date: '2021-05-17T22:14:00+08:00'
tags:
    - php
categories:
    - other

---


# 准备工作

- 拥有自己的github帐号
- packagist.org授权github登录

# 创建包项目

`mkdir packname && cd packname`

## 创建composer.json文件

手动创建 || composer init


## 创建git

## 开始写自己的类库


## 提交git

```
git add -A 
git commit -m 'first commit'
```

## 设置包版本

```
git tag v0.0.1
```

## 设置git仓库地址，然后上传

```
git branch -M main
git remote add origin 仓库地址
git push -u origin main
```

# Submit package

## 输入git仓库地址Check，然后Submit，至此发布成功！


# other 
[https://packagist.org/](https://packagist.org/)
关联git仓库地址成功后会自动设置Webhooks(钩子)，每次提交代码会自动更新到Packagist上没有自动设置的可以自己手动设置打开git仓库`->settings->Webhooks->Add webhook`  
三个参数Payload URL：https://packagist.org/api/github?username=自己的用户名   
Content type：application/json    
Secret：从packagist->profile里获取    
