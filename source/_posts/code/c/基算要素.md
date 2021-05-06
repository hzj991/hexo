---
title: 基算要素
date: '2021-01-14T05:29:18+08:00'
tags:
    - other
categories:
    - other

---




- [tip](#tip)
  - [input&output](#inputoutput)
  - [让gcc的cin和scanf一样快](#让gcc的cin和scanf一样快)
  - [不要用局部变量地址返回地址](#不要用局部变量地址返回地址)
  - [一个简单的函数辅助理解c++中指针和数组的联系](#一个简单的函数辅助理解c中指针和数组的联系)
- [algorithm](#algorithm)
  - [指针&单链表链表](#指针单链表链表)
    - [sudtoj-1138:单链表操作A](#sudtoj-1138单链表操作a)
    - [sdutoj-1139:单链表操作B](#sdutoj-1139单链表操作b)
    - [sdutoj-2054:双向链表](#sdutoj-2054双向链表)
    - [sdutoj-2121:链表排序](#sdutoj-2121链表排序)
    - [循环链表（略）](#循环链表略)
  - [贪心](#贪心)
    - [活动选择问题](#活动选择问题)
  - [[]完全背包](#完全背包)
  - [[]动态规划(01背包)](#动态规划01背包)
  - [二叉树](#二叉树)
    - [sdutoj-2136:数据结构实验之二叉树的建立与遍历](#sdutoj-2136数据结构实验之二叉树的建立与遍历)
    - [数据结构实验之求二叉树后序遍历和层次遍历](#数据结构实验之求二叉树后序遍历和层次遍历)
  - [多叉树](#多叉树)
  - [多叉树构建英文字典](#多叉树构建英文字典)
  - [排序](#排序)
  - [快排](#快排)
  - [二分查找](#二分查找)
  - [kmp](#kmp)
  - [dfs/bfs](#dfsbfs)
  - [迪杰斯特拉/弗洛伊德](#迪杰斯特拉弗洛伊德)
  - [克鲁斯卡尔/普瑞姆](#克鲁斯卡尔普瑞姆)
  
    
<!--more-->
  
  
# tip  
  
## input&output
  
  
| stdin     | stdout    |
| --------- | --------- |
| scanf()   | printf()  |
| gets()    | puts()    |
| getchar() | putchar() |
  
  
## 让gcc的cin和scanf一样快
  
```gcc
ios::sync_with_stdio(false);
std::cin.tie(0);
```
  
## 不要用局部变量地址返回地址
  
```gcc
int* func(){
    int arr[2] = {}
    return arr;
}
```
  
这是错误的，从函数本身的意义来说，该函数应该返回一个指针，但是函数体内的arr是一个临时变量，所以返回arr后会由于临时变量的销毁导致函数返回的地址是一个无意义地址。所以要将`int arr`静态化，或者改为全局函数

```
int arr1[2] = {};
int* func1(){

    arr1[0] = 0;
    arr1[1] = 0;
    return arr1;
}


int* func2(){
    static int arr2[2] = {};
    return arr2;
}
```

## 一个简单的函数辅助理解c++中指针和数组的联系

```c
#include <iostream>
#include <stdio.h>
using namespace std;
int t = 0;
void ceshi(char *p)
{
    t++;
    if (t > 11)
    {
        return;
    }
    else
    {
        cout << p[0];
        cout << endl;
        ceshi(p + 1);
    }
}
int main()
{
    
    char str[] = "0123456789";
    ceshi(str);
    return 0;
}
```
  
# algorithm
  
## 指针&单链表链表 

### [sudtoj-1138:单链表操作A](https://acm.sdut.edu.cn/onlinejudge3/problems/1138)

`Description
输入n个整数，先按照数据输入的顺序建立一个带头结点的单链表，再输入一个数据m,将单链表中的值为m的结点全部删除。分别输出建立的初始单链表和完成删除后的单链表。`

**Input**<br>
第一行输入数据个数n；  <br>
第二行依次输入n个整数；  <br>
第三行输入欲删除数据m。  <br>
**Output**<br>
第一行输出原始单链表的长度；<br>
第二行依次输出原始单链表的数据；<br>
第三行输出完成删除后的单链表长度；<br>
第四行依次输出完成删除后的单链表数据。<br>
**Sample**<br>
**Input**<br>
```
10
56 25 12 33 66 54 7 12 33 12
12
```
**Output**
```
10
56 25 12 33 66 54 7 12 33 12
7
56 25 33 66 54 7 33
```

**solutions**
```c
#include <iostream>
#include <stdio.h>
using namespace std;

bool equal(int a, int b)
{
    return a == b;
}

struct node
{
    int data;
    node *next = NULL;
};

node *create(int i)
{
    node *head;
    node *p;
    head = new node();
    p = head;
    while (i--)
    {
        p->next = new node();
        p = p->next;
        cin >> p->data;
    }
    return head;
}

/**
 * 创建逆序链表
 */
node *createR(int i)
{

    node *head = new node();
    node *p;
    while (i--)
    {
        p = new node();
        cin >> p->data;
        p->next = head->next;
        head->next = p;
    }
    return head;
}

node *delRepeatNode(node *head)
{
    node *p, *q, *t4del;
    p = head;
    while (p->next != NULL)
    {
        p = p->next;
        q = p;
        while (q->next != NULL)
        {
            if (equal(q->next->data, p->data))
            {
                t4del = q->next;
                q->next = q->next->next;
                delete (t4del);
            }
            else
            {
                q = q->next;
            }
        }
    }
    return head;
}

node *delByData(node *head, int delData)
{
    node *p, *t4del;
    p = head;
    while (p->next != NULL)
    {
        if (p->next->data == delData)
        {

            t4del = p->next;
            p->next = p->next->next;
            delete (t4del);
        }
        else
        {
            p = p->next;
        }
    }
    return head;
}
int getCount(node *head)
{
    node *p = head;
    int counter = 0;
    while (p->next != NULL)
    {
        p = p->next;
        counter++;
    }
    return counter;
}
void printNodeList(node *head)
{
    node *p = head;
    int counter = 0;
    while (p->next != NULL)
    {
        cout << p->next->data;
        if (p->next->next != NULL)
        {
            cout << " ";
        }
        p = p->next;
    }
    cout << endl;
}
void testA()
{
    int n = 0;
    int waitDelData = 0;
    cin >> n;
    node *head = create(n);
    cin >> waitDelData;
    cout << getCount(head) << endl;
    printNodeList(head);
    head = delByData(head, waitDelData);
    cout << getCount(head) << endl;
    printNodeList(head);
}
void testB()
{
    int n = 0;
    cin >> n;
    node *head = createR(n);
    cout << getCount(head) << endl;
    printNodeList(head);
    head = delRepeatNode(head);
    cout << getCount(head) << endl;
    printNodeList(head);
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    testA();
    // testB();
    return 0;
}
```

### [sdutoj-1139:单链表操作B](https://acm.sdut.edu.cn/onlinejudge3/problems/1139)

**Description**<br>
按照数据输入的相反顺序（逆位序）建立一个单链表，并将单链表中重复的元素删除（值相同的元素只保留最后输入的一个）。
**Input**<br>
第一行输入元素个数n；<br>
第二行输入n个整数。<br>
**Output**<br>
第一行输出初始链表元素个数；<br>
第二行输出按照逆位序所建立的初始链表；<br>
第三行输出删除重复元素后的单链表元素个数；<br>
第四行输出删除重复元素后的单链表。<br>
**Sample**<br>
**Input**<br> 
```
10
21 30 14 55 32 63 11 30 55 30
```
**Output** 
```
10
30 55 30 11 63 32 55 14 30 21
7
30 55 11 63 32 14 21
```

解答为上述代码的testB函数

### [sdutoj-2054:双向链表](https://acm.sdut.edu.cn/onlinejudge3/problems/2054)

```c
#include <iostream>
#include <stdio.h>
using namespace std;

bool equal(int a, int b)
{
    return a == b;
}

struct node
{
    int data;
    node *next = NULL;
    node *last = NULL;
};

node *create(int i)
{
    node *head;
    node *p;
    head = new node();
    p = head;
    while (i--)
    {
        p->next = new node();
        p->next->last = p;
        p = p->next;
        cin >> p->data;
    }
    return head;
}

void findLastAndNext(node *head, int data)
{
    node *p = head;
    while (p->next != NULL)
    {
        if (p->next->data == data)
        {
            if (p != head)
            {
                cout << p->data;
            }
            if (p != head && p->next->next != NULL)
            {
                cout << " ";
            }
            if (p->next->next != NULL)
            {
                cout << p->next->next->data;
            }
            cout<<endl;
        }
        p = p->next;
    }
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n = 0;
    int m = 0;
    cin >> n;
    cin >> m;
    node *head = create(n);
    int findData;
    while (m--)
    {
        cin >> findData;
        findLastAndNext(head, findData);
    }
    return 0;
}

```

### [sdutoj-2121:链表排序](https://acm.sdut.edu.cn/onlinejudge3/problems/2121)

```c
#include <iostream>
using namespace std;

struct node
{
    int data;
    node *next;
};
node *creat(int n)
{
    node *head, *p, *tail;
    head = new node;
    head->next = NULL;
    tail = head;
    while (n--)
    {
        p = new node;
        cin >> p->data;
        p->next = NULL;
        tail->next = p;
        tail = p;
    }
    return (head);
}

node *sortlist(node *head)
{
    node *q, *p;
    int temp;
    for (p = head->next; p != NULL; p = p->next)
    {
        for (q = p->next; q != NULL; q = q->next)
        {
            if (p->data > q->data)
            {
                temp = q->data;
                q->data = p->data;
                p->data = temp;
            }
        }
    }
    return head;
}
void printNodeList(node *head)
{
    node *r;
    r = head;
    while (r->next->next != NULL)
    {
        cout << r->next->data << " ";
        r = r->next;
    }
    cout << r->next->data << endl;
}
int main()
{
    ios::sync_with_stdio(false);
    cin.tie(0);
    node *head, *r;
    int n;
    cin >> n;
    head = creat(n);
    head = sortlist(head);
    printNodeList(head);
    return 0;
}
```

### 循环链表（略）

## 贪心

### [活动选择问题](https://acm.sdut.edu.cn/onlinejudge3/problems/2073)

**Description**<br>
 sdut 大学生艺术中心每天都有n个活动申请举办，但是为了举办更多的活动，必须要放弃一些活动，求出每天最多能举办多少活动。<br>

**Input**<br>
输入第一行为申请的活动数n(n<100)，从第2行到n+1行，每行两个数，是每个活动的开始时间b，结束时间e；<br>

**Output**<br>
 输出每天最多能举办的活动数。<br>

**Sample**<br>
**Input** <br>
```
12
15 20
15 19
8 18
10 15
4 14
6 12
5 10
2 9
3 8
0 7
3 4
1 3
```
**Output** <br>
```
5
```
```c
#include <iostream>
#include <stdio.h>
using namespace std;

struct actionTime
{
    int startTime = 0;
    int endTime = 0;
};

int main()
{
    int n = 0;
    actionTime actionTimeList[200] = {};
    actionTime tmpActionTime;
    while (int scanfResult = scanf("%d", &n))
    {
        if (scanfResult == EOF)
        {
            break;
        }
        for (int i = 0; i < n; i++)
        {
            cin >> actionTimeList[i].startTime >> actionTimeList[i].endTime;
        }
        for (int i = 0; i < n - 1; i++)
        {
            for (int j = 0; j < n - i - 1; j++)
            {
                if (actionTimeList[j].endTime > actionTimeList[j + 1].endTime)
                {
                    tmpActionTime = actionTimeList[j];
                    actionTimeList[j] = actionTimeList[j + 1];
                    actionTimeList[j + 1] = tmpActionTime;
                }
            }
        }
        // cout << "##############" << endl;
        // for (int i = 0; i < n; i++)
        // {
        //     cout << actionTimeList[i].startTime << " " << actionTimeList[i].endTime << endl;
        // }

        int j = 0;
        int sum = 1;
        for (int i = 1; i < n; i++)
        {
            if (actionTimeList[i].startTime >= actionTimeList[j].endTime)
            {
                sum++;
                j = i;
            }
        }
        cout << sum << endl;
    }
    return 0;
}
```
## []完全背包
## []动态规划(01背包)
## 二叉树 

### [sdutoj-2136:数据结构实验之二叉树的建立与遍历](https://acm.sdut.edu.cn/onlinejudge3/problems/2136)

```c
#include <iostream>
#include <stdio.h>
#include <string.h>
using namespace std;

struct node
{
    char data;
    node *left = NULL;
    node *right = NULL;
};

char charList[60] = "";
int charListP = 0;
node *create()
{

    char data = charList[charListP];
    charListP++;
    if (data != ',')
    {
        node *p = new node();
        p->data = data;
        p->left = create();
        p->right = create();
        return p;
    }
    else
    {
        return NULL;
    }
}

void proOrder(node *p)
{
    cout << p->data;
    if (p->left)
    {
        proOrder(p->left);
    }
    if (p->right)
    {
        proOrder(p->right);
    }
}

void inOrder(node *p)
{

    if (p->left)
    {
        inOrder(p->left);
    }

    cout << p->data;
    if (p->right)
    {
        inOrder(p->right);
    }
}
void lastOrder(node *p)
{
    if (p->left)
    {
        lastOrder(p->left);
    }
    if (p->right)
    {
        lastOrder(p->right);
    }
    cout << p->data;
}
int leafCounter = 0;
void initLeafCounter()
{
    leafCounter = 0;
}
void getLeafCount(node *p)
{
    if (p->left)
    {
        getLeafCount(p->left);
    }
    if (p->right)
    {
        getLeafCount(p->right);
    }
    if (p->left == NULL && p->right == NULL)
    {
        leafCounter++;
    }
}

int deepCounter = 0;
void initDeepCounter()
{
    deepCounter = 0;
}
void getDeep(node *p, int nowDeep = 0)
{
    nowDeep += 1;
    if (p->left)
    {
        getDeep(p->left, nowDeep);
    }
    if (p->right)
    {
        getDeep(p->right, nowDeep);
    }
    if (p->left == NULL && p->right == NULL)
    {
        if (nowDeep > deepCounter)
        {
            deepCounter = nowDeep;
        }
    }
}
int main()
{
    while (cin >> charList)
    {
        charListP = 0;
        node *head;
        head = create();
        // proOrder(head);
        // cout << endl;
        inOrder(head);
        cout << endl;
        lastOrder(head);
        cout << endl;
        initLeafCounter();
        getLeafCount(head);
        cout << leafCounter << endl;
        initDeepCounter();
        getDeep(head);
        cout << deepCounter << endl;
    }
}
```

### [数据结构实验之求二叉树后序遍历和层次遍历](https://acm.sdut.edu.cn/onlinejudge3/problems/2137)

> 其中层次遍历有循环多次比较深度和**队列**两种方式实现

```c
#include <iostream>
#include <stdio.h>
#include <string.h>
using namespace std;

struct node
{
    char data;
    node *left = NULL;
    node *right = NULL;
};

/**
 * 一切以构造先序构造条件为优先
 */
node *create(char *pre, char *in, int len)
{
    bool isNode = len > 0;
    // 判断当前pre字符串是否为空
    if (isNode)
    {
        /***
         * ROOT LEFT***** RIGHT*****
         * LEFT***** ROOT RIGHT*****
         */
        node *p = new node();
        p->data = pre[0];
        int leftNodeNum = 0;
        int rightNodeNum = 0;

        while (pre[0] != in[leftNodeNum])
        {
            leftNodeNum++;
        }
        // 下标0为起点所以找到root时正好为left的长度

        rightNodeNum = len - leftNodeNum - 1;

        p->left = create(pre + 1, in, leftNodeNum);

        p->right = create(pre + 1 + leftNodeNum, in + leftNodeNum + 1, rightNodeNum);

        return p;
    }
    else
    {
        return NULL;
    }
}

void lastOrder(node *head)
{
    if (head != NULL)
    {
        lastOrder(head->left);
        lastOrder(head->right);
        cout << head->data;
    }
}
int deepCounter = 0;
void getDeep(node *p, int nowDeep = 0)
{
    nowDeep += 1;
    if (p->left)
    {
        getDeep(p->left, nowDeep);
    }
    if (p->right)
    {
        getDeep(p->right, nowDeep);
    }
    if (p->left == NULL && p->right == NULL)
    {
        if (nowDeep > deepCounter)
        {
            deepCounter = nowDeep;
        }
    }
}

int findDeep = 0;
void deepOrder(node *head, int nowDeep)
{
    if (nowDeep > findDeep)
    {
        return;
    }
    if (head != NULL)
    {
        if (nowDeep == findDeep)
        {
            cout << head->data;
        }
        deepOrder(head->left, nowDeep + 1);
        deepOrder(head->right, nowDeep + 1);
    }
}

void initDeepFunction()
{
    deepCounter = 0;
    findDeep = 0;
}

struct queueList
{
    node *data;
    queueList *next;
};

queueList *tail;
queueList *queueHead;
void insertQueueList(node *data)
{
    tail->data = data;
    tail->next = new queueList();
    tail = tail->next;
}

node *pushQueueList()
{
    queueList *waitDelNode = queueHead->next;
    node *data = waitDelNode->data;
    queueHead->next = queueHead->next->next;
    delete (waitDelNode);
    return data;
}

void deepOrderByQueue(node *treeHead)
{
    queueHead = new queueList();
    queueHead->next = new queueList();
    tail = queueHead->next;
    insertQueueList(treeHead);
    while (queueHead->next != tail)
    {

        node *waitShow = pushQueueList();
        if (waitShow->left != NULL)
        {
            insertQueueList(waitShow->left);
        }
        if (waitShow->right != NULL)
        {
            insertQueueList(waitShow->right);
        }
        cout << waitShow->data;
    }
}

int main()
{

    char proStr[100];
    char inStr[100];
    int num = 0;
    cin >> num;
    while (num--)
    {
        cin >> proStr;
        cin >> inStr;
        node *head;
        head = create(proStr, inStr, strlen(proStr));
        lastOrder(head);
        cout << endl;

        // 利用层级多次调用遍历函数
        // initDeepFunction();
        // getDeep(head);
        // for (findDeep = 1; findDeep <= deepCounter; findDeep++)
        // {
            // deepOrder(head, 1);
        // }
        // cout << endl;

        // 利用队列深度遍历
        deepOrderByQueue(head);
        cout << endl;
    }
    return 0;
}

```


## 多叉树 
## 多叉树构建英文字典
## 排序
## 快排 
## 二分查找
## kmp
## dfs/bfs
## 迪杰斯特拉/弗洛伊德
## 克鲁斯卡尔/普瑞姆

