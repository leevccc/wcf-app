# 使用 Node.js 的官方镜像作为基础镜像
FROM node:18 as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock 文件到容器中
COPY package.json yarn.lock ./

# 执行 yarn install 安装项目依赖
RUN yarn install

# 复制整个项目到容器中
COPY . .

# 构建 Vue 3 项目
RUN yarn build

# 使用 Nginx 镜像作为运行时镜像
FROM nginx:latest

# 将构建好的静态文件复制到 Nginx 的默认文档根目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 复制自定义 Nginx 配置文件到容器中
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露容器内的端口，Nginx 默认监听 80 端口
EXPOSE 80

# Nginx 启动命令
CMD ["nginx", "-g", "daemon off;"]