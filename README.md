## 安装
拷贝配置文件, 开发环境为 `.env.development` 生产环境为 `.env.production`
```shell
cp .env.exmaple .env.production
```

注意配置里有个 `VITE_DEV_MOCK`, 对生产环境也有影响. 配置如果为 true, axios 的请求参数会以 json 的格式发送; 
否则, 参数会以 form-data 的形式发送. 
在**开发环境**中, 这个配置决定是否使用 mock 虚拟请求(新建的 mock 需要设置这个开关, 参考已有的 mock).

### docker 部署
拷贝 nginx 配置文件, 并编辑配置
```shell
cp nginx.demo.conf nginx.conf
vim nginx.conf
```

创建镜像
```shell
docker build -t wcf-app .
```

创建并运行容器
```shell
docker run -d -p 80:80 wcf-app
```