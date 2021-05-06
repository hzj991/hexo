---
title: 'c/c++[00X]:KMP'
date: '2019-07-02T22:18:09+08:00'
tags:
    - c
categories:
    - c

---



kmp 的 next 串分析

| a | b | a | a | b | c | a | c |
|---|---|---|---|---|---|---|---|
| 0 | 1 | 1 | 2 | 2 | 3 | 1 | 2 |

| a  | b    | a     | a      | b       | c        | a         | c         |
|----|------|-------|--------|---------|----------|-----------|-----------|
| '' | 'a'  | 'ab'  | 'aba'  | 'abaa'  | 'abaab'  | 'abaabc'  | 'abaabca' |
| '' | 'ax' | 'abx' | 'abax' | 'abaax' | 'abaabx' | 'abaabax' | 'abaabcx' |
| '' | 'x'  | 'x'   | 'ax'   | 'ax'    | 'abx'    | 'x'       | 'ax'      |

<!--more-->

```php
<?php

/**
 * 教材 数据结构 c 语言伪代码
 * void get_next(SString T,int next[])
 * {
 *      i = 1; next[1] = 0; j = 0;
 *      while(i<T[0]){
 *          if(j==0 || T[i] == T[j])
 *          {
 *              ++i;
 *              ++j;
 *              next[i]=j;
 *          }
 *          else
 *          {
 *              j = next[j]
 *          }
 *      }
 * }
 * 
 */

/**
 * 下述代码为正确的可执行php代码，与上述伪代码不一样的是，$str 的字符串下标是从0 开始，所以将$i,$j的匹配位置迁移1位，
 * 因为next也是从0开始存储所以循环应在 $i<$lenght-1开始
 * （next[0]作为起点未在循环内赋值，循环内赋值皆为$i+1的下表，故可以做到将next[0]~next[$lenght-1]全部赋值成功 ,）
 */
function getNext_success($str)
{
    $next = [];
    $lenght = strlen($str);
    $next[0] = -1;
    $i = 0;
    $j = -1;
    while ($i < $lenght-1) {
        if ($j === -1 || $str[$i] === $str[$j]) {
            $i += 1;
            $j += 1;
            $next[$i] = $j;
        } else {
            $j = $next[$j];
        }
    }


    foreach ($next as $num) {
        echo $num . "\t";
    }
    echo "\n";
}


/**
 * 教材的字符串下表 1 开始 0 下标代表着该字符串长度（这好像不是c吧(lll￢ω￢)）
 * 所以第一个函数的错误发生于j=0 , 因为j=0下表在下述代码中是字符串的首位所以如果用j=0作为j的初始值则会导致少匹配一位，
 * 导致实际使用的字串为s[1]~s[n]
 */
function getNext_error($str)
{
    $next = [];
    $lenght = strlen($str);
    $next[1] = 0;
    $i = 1;
    $j = 0;
    while ($i < $lenght) {
        if ($j === 0 || $str[$i] === $str[$j]) {
            $j += 1;
            $i += 1;
            $next[$i] = $j;
        } else {
            $j = $next[$j];
        }
    }
    foreach ($next as $num) {
        echo $num . "\t";
    }
    echo "\n";
}

/**
 * 这是第二个错误，他的输出的next 为  0       1       2       3       4       5       6       7 
 * 虽然起点为$i=0; $j =-1;但是由于第一次匹配未能成功导致将$j=0,致使$i=0,$j=0开始匹配，
 * 而kmp中next每次循环所求是前缀，
 */
function getNext_error2($str)
{
    $next = [];
    $lenght = strlen($str);
    $next[0] = 0;
    $i = 0;
    $j = -1;
    while ($i < $lenght-1) {
        if ($j === 0 || $str[$i] === $str[$j]) {
            $i += 1;
            $j += 1;
            $next[$i] = $j;
        } else {
            $j = $next[$j];
        }
    }


    foreach ($next as $num) {
        echo $num . "\t";
    }
    echo "\n";
}


$str4kmp = 'abaabcac';
$str4kmp ='11111111';
getNext_error($str4kmp);
getNext_error2($str4kmp);
getNext_success($str4kmp);


```

c语言版本
```c++
#include <iostream>
#include <string.h>
#include <stdio.h>

using namespace std;
int next_ac[1000005];
char s1[1000005];
char s2[1000005];
void getNext(char *s)
{

    memset(next_ac,-1,sizeof(next_ac));
    int sl = strlen(s);
    int i = 0;
    int j = -1;

    /**
    sl-1 这里循环次数
    */
    while(i<sl-1)
    {
        if(j== -1 || s[i] == s[j])
        {
            i+=1;
            j+=1;
            next_ac[i] = j;
        }
        else
        {
            j = next_ac[j];
        }
    }
}

int kmp(char *s1,char *s2)
{
    int sl1 = strlen(s1);
    int sl2 = strlen(s2);
    getNext(s2);
    int i=0,j=0;
    while(i<sl1 && j<sl2)
    {
        if(j==-1||s1[i]==s2[j])
        {
            j++;
            i++;
        }
        else
        {
            j = next_ac[j];
        }
    }
    if(j==sl2)
    {
        return i-j+1;
    }
    else
    {
        return -1;
    }
}



int main()
{
    std::ios::sync_with_stdio(false);
    int z = -1;
    while(cin>>s1)
    {
        cin>>s2;
        z= kmp(s1,s2);
        cout<<z<<endl;
    }
    return 0;
}

/***************************************************
User name: loop0875
Result: Accepted
Take time: 72ms
Take Memory: 1408KB
Submit time: 2019-07-02 14:31:44
****************************************************/
```

过程中，有一趟代码我给把 = 写成了 == 导致next全变成了 -1，但是对于测试数据缺没问题，提交wa，其实如果next都为-1的情况下，kmp的部分在某些情况下可以正常运行，只要本身不存在回溯可以成功的情况，是可以运行的，因为next全是-1，这就导致一旦出错就会把字串从头开始匹配，但是被匹配串缺还保持当前位置导致的当然问题导致的原因还是因为粗心导致的

```c++
void getNext(char *s)
{

    memset(next_ac,-1,sizeof(next_ac));
    int sl = strlen(s);
    int i = 0;
    int j = -1;

    /**
    sl-1 这里循环次数
    */
    while(i<sl-1)
    {
        if(j== -1 || s[i] == s[j])
        {
            i+=1;
            j+=1;
            /**************这里是出错的地点********************/
            next_ac[i] == j;
            /**********************************/
        }
        else
        {
            j = next_ac[j];
        }
    }
}

```