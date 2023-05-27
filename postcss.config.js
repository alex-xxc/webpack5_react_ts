const autoprefixer = require('autoprefixer');
module.exports = {
  plugins: [
    autoprefixer({
      //postcss 使用autoprefixer 添加前缀的标准
      overrideBrowserslist: ["last 2 versions",">1%"]
    })
  ]
}