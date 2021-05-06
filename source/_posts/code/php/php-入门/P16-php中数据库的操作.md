---
title: 'PHP[入门]P16-php中数据库的操作'
date: '2017-01-01T09:01:16+08:00'
tags:
    - php
categories:
    - php

---



> 这是我早期的 php 学习笔记，php 的学习版本版本是 5.6、7，🐟2020/05/06年从有道笔记导出至此。


day16

1.mysql函数

使用方式：

select 函数(字段名) as 字段别名 from tablename ;

注：尽量不用

as 给字段起别名

2.分组：

select count(age) as count ,age from tablename group by 字段名;

select count(age) as count ,age from tablename group by 字段名 having
条件;

分组以后数据再次过滤 条件使用having

3.链接：

内连接：

隐式链接：select 表1.字段 \[as 别名\], 表n.字段 from 表1 \[别名\], 表n
where 条件;

显示链接:select 表1.字段 \[as 别名\], 表n.字段 from 表1 \[别名\] join
表n on 条件;

表1 inner join 表2 on 条件

表1 join 表2 on 条件

inner一般使用习惯是可以省略掉的

外链接：

左连接：select 表1.字段 \[as 别名\], 表n.字段 from 表1 \[别名\] left
join 表n on 条件;

说明：以左边表数据为准进行匹配查询 如果右边对应表没有对应数据 null

右链接：select 表1.字段 \[as 别名\], 表n.字段 from 表1 \[别名\] right
join 表n on 条件;

select guser.username,goods.name \...\.....

说明：以什么方式关联就以什么表为主

4.子查询

以一个结果集作为另一个查询的一部分或者是条件

select \* from user where gid in (select gid from goods);

5.全外链接(记录联合)

将讲个关联查询结果合并到一起，没有对应的数据时候 用null

select \* from guser lu left join goods lg on lu.gid=lg.gid union select
\* from guser ru right join goods rg on ru.gid = rg.gid;

union 是将 union all 后的结果进行一次distinct，去除重复记录后的结果

6.修改更新：

update money set balance=balance-500 where userid = 15;

update 要操作的字段名 set 字段名=字段名(实际的意义指字段里的对应值)-190
where 条件

两个表同时修改

update user u, goods g set u.gid=0, g.price=1799 where u.id=8 and
u.gid=g.gid;

说明： 先将user表里 gid 值 把user表中id为8的用户gid改成0
然后运用关联gid值 就是拿到的user gid 再把goods修改

7.清空表记录

1.delete 删除 说明： 索引也就通常说的id 是自增的使用delete删除数据
id保留 再添加数据时候从删除前的id+1

2.truncate table user; 说明：与delete的区别就是
清空数据时候连索引值一起清空。

8.权限控制(了解)：

show grants;显示用户

创建用户：

create user 'username'@'host' identified by 'password';

赋予操作权限：

grant 权限 \[privileges\] on 库.表 to 用户\@主机 \[identified by
'密码'\];

刷新：

flush privileges;

剥夺权限：

revoke select on test.\* from 'aaa'@'%';

说明：

\* 代表操作索引的表

% 代表模糊匹配

all 所有操作（insert delete select update）

9.事务

默认的配置autocommit值是1 自动提交

将set autocommit=0;以后意思是手动提交; commit

开启事务：

begin; //如果begin不好使时候可以使用set autocommit=0;

提交事务：

commit;

回滚：

rollback;

10.导入导出

导出：mysqldump -uroot -p 数据库 \> xxx.sql

// 一定是退出mysql

导入：mysql -uroot -p 数据库 \< xxx.sql

//注意： 一定新建一个数据库
