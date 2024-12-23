# 使用 Node.js 20 作为构建环境
FROM node:20-alpine as builder

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 yarn.lock 文件
COPY package.json yarn.lock ./

# 安装依赖并清理缓存
RUN yarn install --frozen-lockfile && yarn cache clean

# 复制所有源代码
COPY . .

# 构建应用
RUN yarn build

# 使用轻量级的 Nginx 镜像作为生产环境
FROM nginx:alpine

# 从构建阶段复制构建结果到 Nginx 的静态文件目录
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# 复制自定义 Nginx 配置文件（如果有的话）
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
