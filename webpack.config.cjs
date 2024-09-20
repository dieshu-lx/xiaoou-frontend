const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx', //入口文件
  output: {
    filename: 'bundle.js', //输出文件名
    path: path.resolve(__dirname, 'dist'), //输出目录
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], //配置解析文件，解析ts、tsx、js文件
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'), //服务器根目录
    compress: true, //是否启用gzip压缩
    port: 9000, //服务器端口号
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html', //HTML模版文件
    }),
  ],
  mode: 'development',
};
