# sky-secret
> 信息加密存储系统

### 配置项
* 登录地址：app.loginUrl (默认：`/login`)
* Session服务器：app.session-service.url
* 缓存服务器：app.cache-service.url
* 权限服务器：app.priv-service.url

### 启动服务
运行 org.scy.secret.App

需要引用`jcoms`、`cache_api`、`priv_api`

### 打包
mvn clean package -f pom.xml -P prod   
IDEL 配置选项 Profiles 为 prod

### 部署
安装网络`docker network create -d bridge --subnet 172.2.2.0/24 mynet`

本地执行`./build/deploy_remote`

或登录服务器，进入`build`目录，执行`./deploy`命令
