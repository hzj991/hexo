---
title: 'PHP[入门]P18-php封装mysql函数'
date: '2017-01-01T09:01:18+08:00'
tags:
    - php
categories:
    - php

---



> 这是我早期的 php 学习笔记，php 的学习版本版本是 5.6、7，🐟2020/05/06年从有道笔记导出至此。


\<?php

function dbConnect(\$host, \$user, \$pwd, \$dbname, \$charset)

{

\$link = mysqli\_connect(\$host, \$user, \$pwd);

if (!\$link) {

return false;

}

\$db = mysqli\_select\_db(\$link, \$dbname);

if (!\$db) {

return false;

}

mysqli\_set\_charset(\$link, \$charset);

return \$link;

}

function dbInsert(\$link, \$table, \$data)

{

//字段

\$fields = array\_keys(\$data);//取所有key

\$fields = join(\',\', \$fields);

\$values = array\_values(\$data);

\$values = vTostr(\$values);

\$values = join(\',\', \$values);

\$sql =\"insert into \$table(\$fields) values(\$values)\";

\$result = mysqli\_query(\$link, \$sql);

if (\$result && mysqli\_affected\_rows(\$link)) {

return mysqli\_insert\_id(\$link);

} else {

return false;

}

}

function dbDelete(\$link, \$table, \$where)

{

if (empty(\$where)) {

return false;

}

//作业 ，补充是数组的情况 and

\$sql =\"delete from \$table where \$where\";

\$result = mysqli\_query(\$link, \$sql);

if (\$result && mysqli\_affected\_rows(\$link)) {

return mysqli\_affected\_rows(\$link);

} else {

return false;

}

}

function dbUpdate(\$link, \$table, \$data,\$where)

{

if (empty(\$where)) {

return false;

}

\$data = vTostr(\$data);

\$data = vUpdate(\$data);

\$data = join(\',\', \$data);

\$sql = \"update \$table set \$data where \$where\";

\$result = mysqli\_query(\$link, \$sql);

if(\$result && mysqli\_affected\_rows(\$link)) {

return mysqli\_affected\_rows(\$link);

} else {

return false;

}

}

function dbSelect(\$link, \$table, \$fields = \'\*\', \$where = null,
\$order = null, \$limit = null)

{

// fields where order by limit 0,5

if (is\_array(\$fields)) {

\$fields = join(\',\', \$fields);

}

if (\$where) {

\$where = \" where \" . \$where;

}

if (\$order) {

\$where .= \" order by \" . \$order;

}

if (\$limit) {

\$where .= \" limit \" . \$limit;

}

\$sql =\"select \$fields from \$table \$where\";

\$result = mysqli\_query(\$link, \$sql);

if (\$result && mysqli\_affected\_rows(\$link)) {

return mysqli\_fetch\_all(\$result, MYSQLI\_ASSOC);

} else {

return false;

}

}

function vTostr(\$values)

{

foreach(\$values as \$k =\> \$v) {

if (is\_string(\$v)) {

\$v = \"\'\" . \$v . \"\'\";

\$values\[\$k\] = \$v;

}

}

return \$values;

}

function vUpdate(\$data)

{

foreach (\$data as \$k =\> \$v) {

\$data\[\$k\] = \$k . \'=\' . \$v;

}

return \$data;

}
