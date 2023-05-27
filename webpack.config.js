/*
 * @Description: 
 * @version: 1.0
 * @Author: xxc
 * @Date: 2023-04-24 21:40:52
 * @LastEditors: xxc
 * @LastEditTime: 2023-05-14 15:53:15
 */
//webpack 基于nodejs
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  //上下文 项目的打包路径，一般不动，默认值，必须是绝对路径，可以改
  //context:process.cwd(),//默认值，下面entry不用输入绝对路径就是有这个默认存在指定上下文
  //开发模式 生产模式 production
  mode:"development",
  //入口 执行构建的入口 项目入口
  entry:"./src/index.js",//或者 ["./src/index.js","./src/other.js"]但这不是多入口
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
  },
  devtool:'source-map',//开发模式默认开启了sourceMap
  resolve: {
    //查找第三方依赖的目录
    modules: [
      path.resolve(__dirname, './node_modules')
    ],
    alias: {
      //减少查找过程
      //别名
      "@": path.resolve(__dirname, "./src/style"),
      react: path.resolve(__dirname, "./node_modules/react/umd/react.production.min.js"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom/umd/react-dom.production.min.js")
    },
    // extensions: [".js", ".jsx", ".json", "ts", ".tsx"],//强烈带上后缀，查找耗时的
  },
  externals: {//排除第三模块，走cdn，不打包到bundle里
    //key是模块名  value:模块使用的名称 import jQuery from 'jquery'
    jquery: 'jQuery'
  },
  //插件，作用于webpack整个打包周期，主要用于增强打包
  devServer:{
    open: true,
    port: 3000,
    // hot: true,
    proxy:{
      '/api':{
        target: 'http://127.0.0.1:8080'
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({//开发模式不推荐用，会影响热更新
    //   filename: 'css/[name][chunkhash:8].css'
    // }),
    // new optimizeCssAssetsWebpackPlugin({//压缩css
    //   cssProcessor: require("cssnano"),//cssnano是postcss的依赖，所以直接引入即可
    //   cssProcessorOptions: {
    //     discardComments: { removeAll: true }
    //   }
    // }),
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
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  //处理不认识的模块（文件），Webpack 默认只⽀持.json 和 .js模块 不⽀持 不认识其他格式的模块
  module:{
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src'),
        use: [
          'style-loader', 
          // MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './src'),
        use: [
          'style-loader', 
          // MiniCssExtractPlugin.loader,
          'css-loader',
          {//只要在css-loader之后都可以
            loader: 'postcss-loader'
          }, 
          'less-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        include: path.resolve(__dirname, './src'),
        use: [
          'style-loader', 
          // MiniCssExtractPlugin.loader, 
          'css-loader', 
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        include: path.resolve(__dirname, './src'),
        use:{
          loader: 'url-loader',//也可使用file-loader,url-loader包含了所有file-loader的功能
          //使用url-loader的原因主要是他支持limit，根据文件大小选择不同的打包方式，base64或者输出为文件
          options:{
            name: '[name]_[hash:8].[ext]',
            //打包所放的位置
            outputPath: 'images/',
            //推荐小体积资源转换成base64
            limit: 10 * 1024,//单位时字节 1024 = 1kb，此代表小于等于2kb转换成base64
          }
        }
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
}