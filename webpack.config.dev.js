/*
 * @Description: 
 * @version: 1.0
 * @Author: xxc
 * @Date: 2023-05-08 21:53:14
 * @LastEditors: xxc
 * @LastEditTime: 2023-05-28 09:19:12
 */
const baseConfig = require("./webpack.config.base.js");
const { merge } = require("webpack-merge");
const path = require("path");


const devConfig = {
  mode: 'development',
  devServer: {
    client: {
      overlay: false
    },
    open: true,
    port: 3000,
    // hot: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080'
      }
    }
  },
  plugins: [
    
  ]
}

module.exports = merge(baseConfig, devConfig)
