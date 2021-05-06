---
title: 'PHP[入门]P17-php查询数据库'
date: '2017-01-01T09:01:17+08:00'
tags:
    - php
categories:
    - php

---



> 这是我早期的 php 学习笔记，php 的学习版本版本是 5.6、7，🐟2020/05/06年从有道笔记导出至此。


天龙八步：

1：链接数据库

2：判断数据是否链接成功

3：选择数据库

4：设置字符集

5：准备sql语句

6：执行sql语句

7: 解析结果集

8：关闭数据库 释放资源

\<?php

/\*

1.连接数据库

参数：

1).主机名：localhost //ip地址

2).用户名

3).密码

返回值：

成功：object;

失败：false;

\*/

\$link = mysqli\_connect(\'localhost\', \'root\', \'123456\');

//var\_dump(\$link);

/\*

2.判断链接是否成功

\*/

// if(\$link == false)

if (!\$link){

exit(\'数据库链接失败\');

}

/\*

3.选择数据库

参数：

1).\$link

2).databasename

返回值：

true false

\*/

\$db = mysqli\_select\_db(\$link, \'qf\_1701\');

// var\_dump(\$db);

if (!\$db) {

echo \'错误号:\' . mysqli\_errno(\$link);

echo \'错误信息:\' . mysqli\_error(\$link);

exit(\'数据库选择失败\');

}

/\*

4.设置字符集

//HTML utf-8 php utf8 mysql utf8

参数：

1).\$link

2).字符集 utf8

\*/

mysqli\_set\_charset(\$link, \'utf8\');

/\*

5.准备sql语句

//单独提出来sql语句:拼接sql 如果出错 可以直接输出sql语句 方便排错

\*/

\$sql = \'select \* from qf\_user\';

/\*

6执行sql语句

参数：

1).\$link

2).sql语句

返回值：

成功：object

失败：false

\*/

\$result = mysqli\_query(\$link, \$sql);

/\* var\_dump(\$result);

var\_dump(mysqli\_affected\_rows(\$link));

die; \*/

/\*

7.解析结果集

mysqli\_fetch\_\*

mysqli\_fetch\_assoc() //返回一条关联数组的数据

mysqli\_fetch\_array() //返回一条关联数组的数据

mysqli\_fetch\_row() // 返回一条索引数组的数据

mysqli\_affected\_rows() 返回执行受影响的行数
说明：增删改返回受影响行数，查询返回数据的和

mysqli\_num\_rows()//自己测试

mysqli\_insert\_id //更新数据时候 成功返回插入数据的id

\*/

date\_default\_timezone\_set(\'PRC\');

if (\$result && mysqli\_affected\_rows(\$link)) {

echo \'\<table width=800 border=1 align=center\>\';

echo \'\<caption\>用户信息\</caption\>\';

echo
\'\<tr\>\<td\>id\</td\>\<td\>用户名\</td\>\<td\>邮箱\</td\>\<td\>注册ip\</td\>\<td\>注册时间\</td\>\</tr\>\';

while (\$data = mysqli\_fetch\_assoc(\$result)) {

echo \'\<tr\>\';

echo\'\<td\>\' . \$data\[\'id\'\] . \'\</td\>\';

echo\'\<td\>\' . \$data\[\'username\'\] . \'\</td\>\';

echo\'\<td\>\' . \$data\[\'email\'\] . \'\</td\>\';

echo\'\<td\>\' . long2ip(\$data\[\'ip\'\]) . \'\</td\>\';

echo\'\<td\>\' . date(\'Y-m-d H:i:s\', \$data\[\'create\_time\'\]) .
\'\</td\>\';

echo \'\</tr\>\';

}

echo \'\</table\>\';

}

/\*

8.关闭数据库

\*/

mysqli\_close(\$link);
