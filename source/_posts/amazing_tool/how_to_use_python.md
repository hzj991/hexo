---
title: 'python[001]:install'
date: '2019-03-18T23:20:09+08:00'
tags:
    - python
categories:
    - HowToUse
---



```python

```

由于使用环境为 windows（虽然子系统安装了，但是是为了安装基于 python 的进程管理工具，并非使用 python 在 linux 下开发），所以很简单的啦~，这里略过
需要注意的是 pip 的使用
```
pip install NumPy 
pip install Pandas 
pip install Matplotlib 
```

**迁移模块**

```
pip freeze > requirement.txt
pip install -r requirement.txt
```

这个迁移方式不是很习惯


## python闭包写法

```py
def func()
    return 
def func1():
    def func():
        return 1
    return func

func2 = func1()
print(func2)

```