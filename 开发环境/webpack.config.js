const { resolve } = require('path');
// node 内置核心模块，用来处理路径问题
module.exports = {
  //入口
  entry: './main.js',
  // 入口文件 
  // 输出配置 
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出文件路径配置 
    path: resolve(__dirname, 'build/js')
  }, mode: 'development'
  //开发环境 
};