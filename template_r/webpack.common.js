const path = require('path');
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: ["./src/index.js"],
  output: {
      // 输出目录
      path: path.join(__dirname, "dist"),
      // 文件名称
      filename: "bundle.js",
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
}