---
title: 'how to use vargrant'
date: '2018-11-04T23:25:38+08:00'
tags:
    - tool
    - Vargrant
categories:
    - HowToUse

---



```
$ vagrant init      # 初始化    
$ vagrant up        # 启动虚拟机  
$ vagrant halt      # 关闭虚拟机  
$ vagrant reload    # 重启虚拟机  
$ vagrant ssh       # SSH 至虚拟机  
$ vagrant suspend   # 挂起虚拟机  
$ vagrant resume    # 唤醒虚拟机  
$ vagrant status    # 查看虚拟机运行状态  
$ vagrant destroy   # 销毁当前虚拟机  
#box管理命令  
$ vagrant box list    # 查看本地box列表  
$ vagrant box add     # 添加box到列表  
$ vagrant box remove  # 从box列表移除   
```
```
# 更改Homestead.yaml 后 执行以下指令，进行重新配置
vagrant.exe up --provision

==> homestead-7: Machine already provisioned. Run `vagrant provision` or use the `--provision`
```





