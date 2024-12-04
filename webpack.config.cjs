const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx', // 入口文件
  output: {
    filename: '[name].[contenthash].js', // 使用内容哈希来优化缓存
    path: path.resolve(__dirname, 'dist'), // 输出目录
    clean: true, // 在每次构建前清理 /dist 文件夹
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // 添加 .jsx 扩展名
    alias: {
      '@': path.resolve(__dirname, 'src'), // 添加路径别名，方便导入
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'), // 服务器根目录
    compress: true, // 启用 gzip 压缩
    port: 9000, // 服务器端口号
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'], // 需要代理的请求路径
        target: 'http://localhost:3000', // 目标API服务器
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html', // HTML 模板文件
      favicon: 'public/favicon.ico', // 添加 favicon
    }),
  ],
  mode: 'development',
};
