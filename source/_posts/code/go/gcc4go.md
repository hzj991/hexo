---
title: 'cgo''s gcc in windows'
date: '2020-05-18T18:27:43+08:00'
tags:
    - other
categories:
    - other

---



> GCC原名为GNU C语言编译器（GNU C Compiler），只能处理C语言。但其很快扩展，变得可处理C++，后来又扩展为能够支持更多编程语言，如Fortran、Pascal、Objective -C、Java、Ada、Go以及各类处理器架构上的汇编语言等，所以改名GNU编译器套件

MinGW-w64下载地址：[https://sourceforge.net/projects/mingw-w64/files/](https://sourceforge.net/projects/mingw-w64/files/)

选择合适的版本

- i686纯32位版供32位win系统使用
- x86_64是64位系统用的版本
- seh结尾是纯64位编译
- sjlj结尾是32 64两种编译，需加-m32或-m64参数
- posix通常用于跨平台，比win32兼容性好一些

最终下载版本`x86_64-posix-sjlj`

解压后bin目录加入到环境变量


