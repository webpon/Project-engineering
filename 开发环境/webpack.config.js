// node 内置核心模块，用来处理路径问题
const { resolve } = require('path');
//打包html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //入口
  entry: './main.js',
  // 入口文件 
  // 输出配置 
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出文件路径
    path: resolve(__dirname, 'build/js')
  },
  // loader配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同loader处理
      // 处理less css需要安装npm i css - loader style - loader less - loader less - D 
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次执行
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader'
        ]
      }
    ]
  },
  //插件配置
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）,默认复制到output目录
      template: './src/index.html'
    })
  ],
  //开发环境 
  mode: 'development'
};