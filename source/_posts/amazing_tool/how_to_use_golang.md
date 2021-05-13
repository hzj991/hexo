---
title: how to use golang
toc: true
date: 2021-01-27 10:02:08
thumbnail: https://cdn.jsdelivr.net/gh/removeif/blog_image/img/2019/20190919221611.png
tags:
  - other
  - blog
categories:
  - other

---

<!-- TOC -->

- [go环境设置](#go环境设置)
	- [go get 代理设置](#go-get-代理设置)
	- [go env](#go-env)
- [基础](#基础)
- [包推荐](#包推荐)
- [练习](#练习)
- [闭包练习](#闭包练习)
- [gin](#gin)
- [gorm](#gorm)
	- [gorm 分表写法](#gorm-分表写法)

<!-- /TOC -->

<!--more-->

# go环境设置

## go get 代理设置

- 对应的shell代理设置，cmd/powershell
- git代理设置

```
set http_proxy=http://127.0.0.1:1081
set https_proxy=http://127.0.0.1:1081
$ENV:http_proxy="http://127.0.0.1:1081"
$ENV:https_proxy="http://127.0.0.1:1081"
git config --global http.proxy http://127.0.0.1:1081
git config --global https.proxy http://127.0.0.1:1081
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## go env

go 1.13提供了 go env -w命令来写环境变量
```
go env -w XXX="XXX"
go env -u XXX
```


win: `用户\AppData\Roaming\go\env`
linux: ` /root/.config/go/env`




# 基础

# 包推荐

# 练习

# 闭包练习
```go
package main 
func add(x1, x2 int) func(x3 int, x4 int) (int, int, int) {
	i := 0
	return func(x3 int, x4 int) (int, int, int) {
		i++
		return i, x1 + x2, x3 + x4
	}
}
```

# gin

# gorm

## gorm 分表写法

假设 `user` 按照 `uid` 分表。
**关键点**：设置`db.Table`，同时在查询前调用`Scopes`，因为`Scopes`传递的是闭包，所以可以编写一个构建闭包的函数进行设置。

```go

type KUser struct {
	ID              uint32    `gorm:"primaryKey;column:id;type:int(10) unsigned;not null"`              // 用户表自增id
	UId             uint64    `gorm:"unique;column:uid;type:bigint(20) unsigned;not null"`              // 用户中心passId
	NickName        string    `gorm:"column:nick_name;type:varchar(255);not null;default:''"`           // 用户昵称
}

func (u KUser) getSuffixByUid() uint64 {
	return u.UId % uint64(32)
}

type kUserRepository struct {
}

var kur *kUserRepository

func init() {
	kur = new(kUserRepository)
}

func setGetSuffix(suffix int) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		return db.Table("user_" + types.ToString(suffix))
	}
}

func setGetSuffixByUid(uid int64) func(db *gorm.DB) *gorm.DB {
	return setGetSuffix(getSuffixByUid(uid))
}

func getSuffixByUid(uid int64) int {
	return types.ToInt(uid % 32)
}

func (kur kUserRepository) FindBySuffix(suffix int) []KUser {
	var kUsers []KUser
	r := dbPool.GetDB().Scopes(setGetSuffix(suffix)).Find(&kUsers)
	fmt.Println(r.Error)
	return kUsers
}

func GetKUserRepository() *kUserRepository {
	return kur
}

```