---
title: password
date: '2020-02-25T03:10:43+08:00'
tags:
    - other
categories:
    - other

---



两段示例，以作使用php自带加密方法的迁移之备

```php
<?php

$password = '123456';


$i = 10;
while($i--){

    $hash =  password_hash($password, PASSWORD_BCRYPT);
    echo $hash.PHP_EOL;
}

$hash = '$2a$10$PLRjN06j9QTztJ24evbLvOKcPOw6mBR5ARgcwQECkfN4p.Co.i/te';
var_dump(password_verify($password,  $hash));

```

```go
package main
 
import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
)
 
func PasswordHash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}
 
func PasswordVerify(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
 
func main() {
	password := "123456"
	hash, _ := PasswordHash(password)
 
	fmt.Println("密码:", password)
	fmt.Println("hash:", hash)
 
	match := PasswordVerify(password, hash)
	fmt.Println("验证:", match)
}
```
<!--more-->


