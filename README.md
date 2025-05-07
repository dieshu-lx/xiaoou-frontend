## 依赖版本说明

本模版基于 Node.js 20、react-18 搭建

## 依赖

    ```bash
    yarn
    ```

## 开发

    ```bash
    yarn dev
    ```

> 占用端口 9000，修改端口请前往 ./webpack.config.cjs > devServer.port

## 格式检查及自动修复

    ```bash
    yarn lint
    ```

## 构建

    ```bash
    yarn build
    ```

## 清除缓存

    ```bash
    yarn clean
    ```

> 运行该命令会清除 yarn 缓存，并且会删除 node_modules 并重新安装依赖

## 使用Dockerfile构建镜像

    ```bash
    docker build -t xiaoou-frontend .
    ```

> 初次构建镜像时使用，理论上仅需要构建一次

## 使用Dockerfile运行容器

    ```bash
    docker compose up
    ```

> 容器启动后，会使用volumes挂载dist目录，后续只需要在本地build，重启容器即可，不需要重新构建镜像,访问地址：http://localhost:10000

## lint规范

**保存时会自动修复的问题**

1.未使用的导入 2.导入排序

**推荐目录结构**

开发新页面请在 ./src/page 文件夹下进行，开发公共组件请在 ./src/components 文件夹下进行，如果要开发非公共组件请在对应的页面目录下新建components目录进行。

**开发需知**

新增页面后需要在 ./src/App.tsx 文件下新增路由
