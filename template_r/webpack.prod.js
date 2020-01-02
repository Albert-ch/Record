const merge = require('webpack-merge');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool:"cheap-module-source-map",
  output: {
    publicPath: "./"
    // publicPath: path.resolve(__dirname, "dist")
  },

  module:{
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
  },
}
);
