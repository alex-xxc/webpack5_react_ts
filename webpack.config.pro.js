/*
 * @Description: 
 * @version: 1.0
 * @Author: xxc
 * @Date: 2023-05-08 21:53:24
 * @LastEditors: xxc
 * @LastEditTime: 2023-05-21 21:45:29
 */
const baseConfig = require("./webpack.config.base.js");
const {merge} = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const {PurgeCSSPlugin} = require('purgecss-webpack-plugin')
const globAll = require('glob-all')
const TerserPlugin  = require('terser-webpack-plugin');

const proConfig = {
  mode: "production",
  // optimization:{
  //   minimize:true,
  //   minimizer:[
  //     // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
  //     // `...`,用这个来替换optimize-css-assets-webpack-plugin
  //     new CssMinimizerPlugin(),
  //     new TerserPlugin(),//js压缩
  //   ]
  // },
  plugins: [
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './public'), // 复制public下文件
          to: path.resolve(__dirname, './build'), // 复制到build目录中
          filter: source => {
            return !source.includes('index.html') // 忽略index.html
          }
        },
      ],
    }),
    new MiniCssExtractPlugin({//开发模式不推荐用，会影响热更新
      filename: 'css/[name][contenthash:8].css'
    }),
    // 去除没用到的css插件
    new PurgeCSSPlugin({
      paths: globAll.sync([
        `${path.join(__dirname, './src')}/**/*.tsx`,
        `${path.join(__dirname, './public')}/index.html`
      ]),
      safelist: {
        standard: [/^ant-/], // 过滤以ant-开头的类名，哪怕没用到也不删除
      }
    }),
  ],
  module: {
    rules: [
      
    ]
  }
}

module.exports = merge(baseConfig, proConfig);
