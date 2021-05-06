---
title: 408_cpp_classNode
date: '2020-08-22T18:22:08+08:00'
tags:
    - other
categories:
    - other

---




## 利用class析构函数简化内存回收方式

```cpp
#include <iostream>
using namespace std;
#define random(x) (rand() % x)
class NewNode
{
public:
    NewNode *next = NULL;
    int data = 0;
    NewNode(int data = 0)
    {
        this->data = data;
    }
    ~NewNode()
    {
        cout << "正在释放data为" << data << "的数据" << endl;
        delete (next);
        cout << "释放完成data为" << data << "的数据" << endl;
    }
};

int main()
{
    NewNode *head, *node;
    head = node = new NewNode();
    for (int i = 1; i < 10; i++)
    {
        node->next = new NewNode(i);
        node = node->next;
    }
    node = head->next;
    while (node != NULL)
    {
        cout << node->data << "\t";
        node = node->next;
    }
    cout<<endl;

    delete(head);
}
```


<!--more-->


