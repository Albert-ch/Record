const path = require('path');
const merge = require('webpack-merge');
const webpack = require("webpack");
const common = require('./webpack.common.js');


const q = merge(common, {
  mode: "development",
  devtool:"cheap-module-eval-source-map",// 开发环境配置
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "./dist"),
    host: "0.0.0.0", // 可以使用手机访问
    port: 9999,
    historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
    proxy: {
      // 代理到后端的服务地址，会拦截所有以api开头的请求地址
      "/api": "http://localhost:3000"
    }
  }
})


module.exports =  q;