# 使用 Node.js 20 作为构建环境
FROM node:20 as builder

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 yarn.lock 文件
COPY package.json yarn.lock ./
# 安装依赖
RUN yarn install --frozen-lockfile
# 复制所有源代码
COPY . .
# 构建应用
RUN yarn build

# 使用 Nginx 作为生产环境
FROM nginx:latest

# 从构建阶段复制构建结果到 Nginx 的静态文件目录
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD [ "nginx", "-g", "daemon off;" ]
