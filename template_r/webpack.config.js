const path = require('path');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: "development",
  devtool:"cheap-module-eval-source-map",// 开发环境配置
  // devtool:"cheap-module-source-map",   // 线上生成配置

  entry: ["./src/index.js"],
  output: {
      // 输出目录
      path: path.join(__dirname, "dist"),
      // 文件名称
      filename: "bundle.js",
      publicPath: "./"
      // publicPath: path.resolve(__dirname, "dist")
  },
  
  module:{
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              singleton: true   // 处理为单个的style标签
            }
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          }
        ],
        include: path.resolve(__dirname, 'src'),
        // include: path.join(__dirname, '/node_modules/antd'),
        // exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          }, 
          // MiniCssExtractPlugin.loader,
          {
            loader: "css-loader" // translates CSS into CommonJS
          }, 
          {
            loader: "postcss-loader",
            // options: {
            //     plugins: () => autoprefixer({
            //         browsers: ['last 3 versions', '> 1%']
            //     })
            // }
          }, 
          {
            loader: "less-loader"
          }
        ],
        // include: path.resolve(__dirname, 'src'),
        // exclude: /node_modules/
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     {
      //       loader: "style-loader",
      //       // options: {
      //       //   singleton: true   // 处理为单个的style标签
      //       // }
      //     },
      //     {
      //       loader: "css-loader"
      //     },
      //     {
      //       loader: "sass-loader"
      //     }
      //   ],
      //   include: path.resolve(__dirname, 'src'),
      //   exclude: /node_modules/
      // },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: 'fonts/',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html', // 最终创建的文件名
      template: path.join(__dirname, 'src/template.html') // 指定模板路径
    }),

    new webpack.HotModuleReplacementPlugin(),

    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    //   chunkFilename: "[id].css"
    // }),

    // 全局变量
    new webpack.ProvidePlugin({
      // antd: "antd",
    }),

    // 定义环境变量
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),

  ],
  resolve: {
    extensions: [ '.js', '.jsx'],
    alias: {
      "@": path.join(__dirname, "src"),
      "pages": path.join(__dirname, "src/pages"),
    },
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
  //   },
  // },
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
}