---
title: how to use docker
date: '2019-01-02T00:25:59+08:00'
tags:
    - tool
    - linux
    - windows
categories:
    - tool

---


`wsl2` 后可以配合` docker desktop `在本地环境快速搭建 `redis`/`mongodb`/`mysql`/`nginx`/`php` 等环境的部署。

# docker 
[dockerhubformysql](https://hub.docker.com/_/mysql?tab=tags)

```sh
docker search mysql
```

拉取 docker images

```
docker pull mysql:latest
```

查看本地镜像
```
docker images
```

# docker-compose

docker-compose up -d 


```yml
version: '3'
services: #表示这是一组服务 
  redis:
    image: redis
    container_name: redis
    restart: always #docker服务重启后nginx的docker容器也重启
    ports:
    - "6379:6379" #映射的端口，redis容器的6379端口映射到本地的6379端口，可以通过ip:6379访问容器
    networks:
      db_local: #应用docker网络的名称
        ipv4_address: 192.170.129.111 #分配的局域网ip
    volumes:
    # 挂载数据目录  
    - D:\WorkSpace\work-docker\docker-data\redis\data:/data
    # links:
    # - php # 连接php的docker容器 会在host文件生成 php 192.170.1.101(php 容器的局域网ip)
  mysql:
    image: mysql #应用的mysql的镜像名称
    container_name: mysql #应用的mysql的镜像名称
    restart: always #docker服务重启后nginx的docker容器也重启
    ports:
    - "3306:3306" #映射的端口，redis容器的6379端口映射到本地的6379端口，可以通过ip:6379访问容器
    environment:
      MYSQL_ROOT_PASSWORD: root_password # root用户的密码
      MYSQL_USER: user # 创建新用户
      MYSQL_PASSWORD: user_password # 新用户的密码
    volumes: 
    # - D:\WorkSpace\work-docker\docker-data\mysql-conf:/etc/mysql #本地mysql映射到docker
    - D:\WorkSpace\work-docker\docker-data\mysql\data:/var/lib/mysql #本地mysql映射到docker
    networks:
      db_local: #应用docker网络的名称
        ipv4_address: 192.170.129.112 #分配的局域网ip
  mongo:
    image: mongo
    container_name: mongo
    restart: always #docker服务重启后nginx的docker容器也重启
    ports:
    - "27017:27017" #映射的端口，redis容器的6379端口映射到本地的6379端口，可以通过ip:6379访问容器
    volumes:
    # 挂载数据目录  
    - D:\WorkSpace\work-docker\docker-data\mongodb\db:/data/db
    networks:
      db_local: #应用docker网络的名称
        ipv4_address: 192.170.129.113 #分配的局域网ip
networks:
  db_local:
    driver: bridge #网络类型
    ipam:
      config:
      - subnet: 192.170.129.0/17 #区域网ip
```