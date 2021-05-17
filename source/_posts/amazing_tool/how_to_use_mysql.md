---
title: how to use mysql
date: '2018-11-04T23:25:38+08:00'
tags:
    - database
categories:
    - HowToUse
---

<!-- TOC -->

- [mysql 密码重置那些事儿](#mysql-密码重置那些事儿)
- [mysql 8.0 导致的 pdo 链接问题](#mysql-80-导致的-pdo-链接问题)
- [crud](#crud)
  - [create](#create)
    - [alter](#alter)
  - [insert](#insert)
  - [read](#read)
  - [update](#update)
  - [delete](#delete)
  - [other](#other)
- [思考](#思考)
- [删除一个数据库所有表](#删除一个数据库所有表)

<!-- /TOC -->


<!--more-->



# mysql 密码重置那些事儿

好久没有整理云服务器，今天上去把前端代码和服务端代码进行了一下拆分，结果发现忘记了mysql的密码（真·很久没有用过）~,于是去查了一下MySQL的密码重置操作，
[MySQL(root用户)密码重置](https://www.cnblogs.com/jiunadianshi/articles/2007102.html)，
其实就是除了正常的启动 MySQL 之外还可以通过 MySQL 提供的另个可执行文件进行安全启动，我的安装的版本是 mysqld_safe ，找不到的同学可以先用 which mysql 然后进入 mysql 的安装目录查找带有 safe 的可执行文件，执行后通过密码重置语句进行更改就可以愉快的继续使用了
```mysql
use mysql
update user set password=password("new_pass") where user="root";
flush privileges
```

# mysql 8.0 导致的 pdo 链接问题
```shell
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;
```


# crud

create
- create
- alter
- insert
read
- select
update
- update
delete
- delete
- truncate

## create

```sql
-- 创建数据库
create database simple_demo;
-- 选择数据库
use simple_demo;
-- 创建表
CREATE TABLE `users` (
    `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '车场ID' ,
    `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `email_verified_at` timestamp NULL DEFAULT NULL,
    `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT NULL,
    `updated_at` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10790252 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 展示建表语句 + /G 为格式化输出
show create table users
show create table users\G
desc users
desc users\G

```

### alter

```sql
-- 去除索引
alter table users drop index `users_email_unique`;
-- 增加字段
alter table user add age int ;
-- 更改字段类型
alter table user modify s int;
-- 更改字段名+字段类型
alter table user change s sex int;
```


## insert

```sql
-- 插入一条数据，且对应字段
insert into `bookorder` (`id`,`price`) values("123",123.12);
-- 插入一条数据，且对应默认字段
insert into `bookorder` values("123",123.12);
-- 插入多条数据，且对应默认字段
insert into `bookorder` values("123",123.12),values("124",123.12);

```


## read

```sql
-- 查询所有数据
select * from bookorder;
-- 别名
select * from bookorder as b;
-- id升序 ，限制10条
select * from bookorder as b order by id limit 10;
-- id降序，从第10条起取3条数据
select * from bookorder as b order by id desc limit 10,3;
-- 内联
select * from loginunit as l inner join loginUnit as address on l.id = address.luid;
-- 左连接，即使右边数据没有
select * from loginunit as l left join smartlock as s on l.id = s.luid;
-- adderssid 字段非 null 的 并且 city 为 1或2或3
select * from loginunit where addressid is not null and city in (1,2,3);
```


## update

```sql
update bookorder set status='wait' where status='pay';
```

## delete

```sql
-- 删除数据，索引不重置
delete from bookorder where createtime >'2019-01-01';
-- 删除数据，重置索引
truncate table bookorder;
```


## other 

```sql
-- 统计某table占用空间，其中TABLE_SCHEMA为数据库名，TABLE_NAME为表名
select
TABLE_NAME,
concat(truncate(data_length/1024/1024,2),' MB') as data_size,
concat(truncate(index_length/1024/1024,2),' MB') as index_size
from information_schema.tables
where TABLE_SCHEMA = 'simple_laravel'
order by data_length desc;

Alter table tabname drop primary key(col)
drop index idxname
create view viewname as select statement
drop view viewname

select count as totalcount from table1
求和：select sum(field1) as sumvalue from table1
平均：select avg(field1) as avgvalue from table1
最大：select max(field1) as maxvalue from table1
最小：select min(field1) as minvalue from table1



```



# 思考

之前出过一次因为因为主库写入数量过多而从库数量不少，但是带宽不够导致的主从同步延迟严重的问题，所以想到了一个树状多层级的mysql主从同步结构，之后有时间可能会用虚拟机进行一下模拟

这篇 blog 主要从带宽的角度来讨论这个问题。

平常常见的一主多从结构

![](/images/简单主从同步.jpg)

在上图中假设每台 myql 的上传速度均为 U1,下载速度均为D1，master为1台，salve位n台，从主库到从库同步时，主库下载占用带宽忽略不计，从库上传带宽忽略不计，此时分析无延迟同步的速度为 U1/n,每台从库的下载带宽浪费为 D1-(U1/n) ，一旦数据超过U1/n每秒则会产生主从延迟。这种模式比较像平时用的usb扩展坞，转接线之类的情况，一个usb3.0接口分成3个3.0接口其实只是接收方变多了，但是由于传送方的带宽没有变化，会导致copy的总时间没有发生任何变化。体现到数据库上就会产生所谓的主从延迟。就像在学校同学们会互相拷贝软件一样，大家都会选择先从某个同学那拷贝第一份，之后每个拷贝过的同学都具备将信息传递给其他人的能力，从而提交拷贝效率<br>

我想到的比较常见的树状拓扑结构，如下
<!--more-->

![](/images/树状主从同步.jpg)

下图中从根节点开始每个节点都有属于salve，每个节点除根节点外都作为上层master的salve接收上层master传来的数据，同时为下层salve传输数据。
这样的好处是减少了master对上传带宽的要求，如上述简单主从同步中每个master的上传带宽为 salve数量n\*salve的下载带宽 ，每次增加从库都会给需要给唯一的master增加带宽，容易导致master的带宽变成一个无底洞。树型接口的好处是定好一组结构就可以无线的扩展下取，每个节点的上传带宽和下载带宽都是一个定制（前提需要确定一个节点需要挂在几个子节点）。相比简单的一主多从，底层的同步是经过了更多的节点，例如深度为4的情况下最长的路线是master->salve(1,1)->salve(2,1)->salve(3,1),会天然的产生一定的延迟，所以需要具体情况具体分析。

---

*注*：这次讨论的话题主要是有关mysql同步带宽的问题，其中master的写入带宽，树状分布情况下同意结点即作master，又做salve时，用户查询所占用的下载带宽并没有进行深入讨论。仅对同步结构改造减轻一主多从，master承担的带宽压力。因为本职工作并非db所以只是进行了一下浅显的分析/

*后记*：这个问题最后线上的解决方案是让写数据的脚本设置的慢一点，同时加大线上带宽。但是从问题产生的原因上来说并没有消除因为带宽导致主从延迟的隐患（这次是选择了减少脚本写入的量，如果由于用户写入过于频繁那有当如何限制？限制每分钟只能有一定量用户可以进行写入操作吗？），同时由于没有对线上服务器做流量规划导致今后是否因为从库更多导致带宽又不够用了，或者由于master出问题，但是代替的master没有设置足够的带宽，导致一替代原有master就立刻产生更严重的主从延迟问题？







# 删除一个数据库所有表

```
SHOW FULL TABLES WHERE table_type = 'BASE TABLE';

```
然后一个一个drop 。
查看的laravel源码



