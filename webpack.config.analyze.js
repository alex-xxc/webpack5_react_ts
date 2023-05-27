/*
 * @Description: 
 * @version: 1.0
 * @Author: xxc
 * @Date: 2023-05-15 22:02:48
 * @LastEditors: xxc
 * @LastEditTime: 2023-05-21 10:37:31
 */
const proConfig = require('./webpack.config.pro.js');
const {merge} = require("webpack-merge");

//webpack5已经不用speed-measure-webpack-plugin
// const SpeedMeasurePlugin  = require("speed-measure-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

module.exports = merge(proConfig, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})