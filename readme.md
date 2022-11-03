# MonoRepo design

分析研究大仓的管理设计方案。

## 假定工程结构
```
├── apps
│   ├── app-admin
│   ├── app-h5
│   │   ├── app-h5-1.x (版本)
│   │   └── app-h5-2.x (版本)
│   └── app-server
└── libs
    ├── eslint-config-monorepo
    │   ├── eslint-1.x (版本)
    │   └── eslint-2.x (版本)
    └── lib-utils
```

## 依赖关系
![img.png](img.png)

## 实验用的npm私有源搭建
使用工具 verdaccio
```bash
# 全局安装
npm i -g verdaccio

# 创建私仓目录
mkdir npm
cd npm

# 创建包存储目录
mkdir storay
# 创建认证文件
touch .htpasswd
# 创建verdaccio服务配置文件
touch config.yaml
```

配置认证用户名和密码，可以使用htpasswd生成，将生成的内容写入`.htpasswd`文件中
```bash
htpasswd -nb admin 123
```
> 这里提供一份简单的配置： user(admin)  password(123456)
```ini
admin:$apr1$DgwCjAIP$AFIVfwAS7dNPh8rewwfRA/
```

配置文件：`config.yaml`
```yaml
listen: 0.0.0.0:4873

storage: ./storage

auth:
  htpasswd:
    file: ./.htpasswd
    #file: /mnt/software/verdaccio/.htpasswd
    #Maximum amount of users allowed to register, defaults to "+inf".
    #You can set this to -1 to disable registration.
    max_users: -1

uplinks:
  taobao:
    url: https://registry.npm.taobao.org/

packages:
  '**':
    access: $all
    publish: $all
    unpublish: $all
    proxy: taobao
```

配置完成后，可以直接启动服务
```bash
verdaccio -c config.yaml
```

完成后可以访问：localhost:4873 来访问，npm包的发布及管理，可以使用admin这个账号。
