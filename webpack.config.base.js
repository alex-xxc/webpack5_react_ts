/*
 * @Description: 
 * @version: 1.0
 * @Author: xxc
 * @Date: 2023-04-24 21:40:52
 * @LastEditors: xxc
 * @LastEditTime: 2023-05-21 17:03:56
 */
//webpack 基于nodejs
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV;//环境 development, production
const isEnvDevelopment = NODE_ENV === 'development';//开发环境
const isEnvProduction = NODE_ENV === 'production';//生产环境
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';//生产环境是否生产map

module.exports = {
  //入口 执行构建的入口 项目入口
  entry:"./src/index.tsx",//或者 ["./src/index.js","./src/other.js"]但这不是多入口
  //此种写法和上面是一样的，上面是简写
  // entry:{
  //   main: "./src/index.js"
  // },
  //多入口写法,有多入口就要有多出口，不能指定名称
  // entry:{
  //   index: "./src/index.js",
  //   other: "./src/other.js"
  // },
  //出口
  output:{
    //构建的资源放在哪？必须是绝对路径
    path: path.resolve(__dirname,"./build"),
    //构建的资源的名称，生成的文件名
    filename:"[name]-[hash:8].js",
    // publicPath:"https://www.baidu.cn/asset",静态资源路径，自动带上前缀
    clean: true,//webpack4需要配置clean-webpack-plugin删除build文件，webpack5内置了。
  },
  devtool:isEnvDevelopment?"eval-cheap-module-source-map":shouldUseSourceMap?"cheap-module-source-map":false,
  resolve: {
    //查找第三方依赖的目录
    modules: [
      path.resolve(__dirname, './node_modules')
    ],
    alias: {
      //减少查找过程
      //别名
      "@": path.resolve(__dirname, "./src"),
      "react": path.resolve(__dirname, "./node_modules/react/umd/react.production.min.js"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom/umd/react-dom.production.min.js")
    },
    extensions: [".js", ".jsx", ".json", "ts", ".tsx"],//强烈带上后缀，查找耗时的
  },
  externals: {//排除第三模块，走cdn，不打包到bundle里
    //key是包名 value是全局变量
    jquery: 'jQuery',
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        //压缩HTML文件
        removeComments: true,//移除HTML中的注释
        collapseWhitespace: true,//删除空白符与换行符
        minifyCSS: true,//压缩内连css
        minifyJS: true,//压缩内连js
      }
    })
  ],
  //处理不认识的模块（文件），Webpack 默认只⽀持.json 和 .js模块 不⽀持 不认识其他格式的模块
  module:{
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src'),
        use: [
          isEnvDevelopment?'style-loader':MiniCssExtractPlugin.loader, 
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './src'),
        use: [
          isEnvDevelopment?'style-loader':MiniCssExtractPlugin.loader, 
          'css-loader',
          //只要在css-loader之后都可以
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        include: path.resolve(__dirname, './src'),
        use: [
          isEnvDevelopment?'style-loader':MiniCssExtractPlugin.loader, 
          'css-loader', 
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        include: path.resolve(__dirname, './src'),
        type: "asset",
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          }
        },
        generator:{ 
          filename:'images/[name].[contenthash:6][ext]'
        },
      },
      {
        test: /\.(eot|ttf|woff2?|svg)$/,
        include: path.resolve(__dirname, './src'),
        type: "asset/resource",
        generator: {
          filename: "font/[name]_[hash:8].[ext]",
        },
      },
      {
        test: /\.[jt]sx?$/,
        include: path.resolve(__dirname, './src'),
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
          }
        ]
      }
    ]
  },
  // 开启webpack持久化存储缓存
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
}