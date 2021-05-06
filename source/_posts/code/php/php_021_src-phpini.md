---
title: 'php[021]:关于phpini加载相对路径(php源码)'
date: '2020-01-20T18:18:00+08:00'
tags:
    - php
categories:
    - php

---



*起因：之前曾编译了一份php，在目录xxx.xxx.xx/下，由于文件夹名字冗余信息过度，该改名为xxx.xx/改名后运行执行php发现扩展没有被加载，执行php --ini 发现php.ini的加载路径为原来安装时的绝对路径并且为固定值*


php编译安装默认设置php.ini的路径为`PREFIX/lib`即安装路径下的lib目录，也可以使用`--with-config-file-path`参数指定一个新的路径，这里测试一个指定的相对路径

```
./configure --prefix=/mnt/d/WorkSpace/hzj/php-src-p/php7.4.1output    --with-config-file-path="../"
```

编译完成后在`/mnt/d/WorkSpace/hzj/php-src-p/php7.4.1output `中创建一个php.ini，看是否可以加载

当目录为`/mnt/d/WorkSpace/hzj/php-src-p/php7.4.1output/bin/php`时，可以加载php.ini,其他目录则不可，所以说明两点，第一点是编写的相对路径生效了，第二点，生效的相对路径是对执行目录而言，而不是对执行文件而言。

```
h@Happy:/mnt/d/WorkSpace/hzj/php-src-p/php7.4.1output/bin$ ./php --ini
Configuration File (php.ini) Path: ../
Loaded Configuration File:         /mnt/d/WorkSpace/hzj/php-src-p/php7.4.1output/php.ini
Scan for additional .ini files in: (none)
Additional .ini files parsed:      (none)
```

这里开始查询源码文件夹下的的代码,首先搜索关键字符串`Configuration File (php.ini) Path`
查找到`sapi\cli\php_cli.c`文件中
```
zend_printf("Configuration File (php.ini) Path: %s\n", PHP_CONFIG_FILE_PATH);
zend_printf("Loaded Configuration File:         %s\n", php_ini_opened_path ? php_ini_opened_path : "(none)");
zend_printf("Scan for additional .ini files in: %s\n", php_ini_scanned_path  ? php_ini_scanned_path : "(none)");
zend_printf("Additional .ini files parsed:      %s\n", php_ini_scanned_files ? php_ini_scanned_files : "(none)");
break;
```

查找变量`PHP_CONFIG_FILE_PATH`
在`main\build-defs.h`
```h
#define PHP_SYSCONFDIR          "/mnt/d/WorkSpace/hzj/php-src-p/php7.4.1output/etc"
#define PHP_LOCALSTATEDIR       "/mnt/d/WorkSpace/hzj/php-src-p/php7.4.1output/var"
#define PHP_CONFIG_FILE_PATH    "../"
#define PHP_CONFIG_FILE_SCAN_DIR    ""
```

可见该文件为`./configure`生成的的相关宏，由于实及加载为`php.ini`，所以查询变量`php_ini_opened_path`

`php_cli.c`中
```c

PHPAPI extern char *php_ini_opened_path;
PHPAPI extern char *php_ini_scanned_path;
PHPAPI extern char *php_ini_scanned_files;

```

`php_ini.c`
```
PHPAPI char *php_ini_opened_path=NULL;
```

`php_ini.c`
```
	if (fp) {
		zend_file_handle fh;
		zend_stream_init_fp(&fh, fp, filename);
		RESET_ACTIVE_INI_HASH();

		zend_parse_ini_file(&fh, 1, ZEND_INI_SCANNER_NORMAL, (zend_ini_parser_cb_t) php_ini_parser_cb, &configuration_hash);

		{
			zval tmp;

			ZVAL_NEW_STR(&tmp, zend_string_init(fh.filename, strlen(fh.filename), 1));
			zend_hash_str_update(&configuration_hash, "cfg_file_path", sizeof("cfg_file_path")-1, &tmp);
			if (opened_path) {
				zend_string_release_ex(opened_path, 0);
			} else {
				efree((char *)fh.filename);
			}
			php_ini_opened_path = zend_strndup(Z_STRVAL(tmp), Z_STRLEN(tmp));
		}
	}
```

此时已将追到了赋值所在

网上找了了一份获取文件执行路径的代码
```c
#include <stdio.h>
#include<string.h>
#include<unistd.h>

int main()
{
    char szBuf[128];
    char szPath[128];

    memset(szBuf, 0x00, sizeof( szBuf));
    memset( szPath, 0x00, sizeof(szPath));

    getcwd(szBuf, sizeof(szBuf)-1);
    printf("buf:%s\n", szBuf);

    int ret =  readlink("/proc/self/exe", szPath, sizeof(szPath)-1 );
    printf("ret:%d\n", ret);
    printf("path:%s\n", szPath);

    return 0;
}
```

下一步尝试替换此处，使的php可以加载安装目录下相对路径中的php.ini
