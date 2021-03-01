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
      //!处理css文件
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
      //!处理less文件
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'less-loader'
        ]
      },
     
      //!处理图片资源
      {
        // 问题：默认处理不了html中img图片
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader
        // 下载 url-loader file-loader
        // url- loader 允许你有条件地将文件转换为内联的 base - 64 URL(当文件小于给定的阈值) 
        // 这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file - loader 处理。
        // （虽然代码没有配置 file - loader，但还是需要使用 npm i file - loader - D 安装），
        // 并且会将配置的选项传递给 file - loader（也就是说上面可以配置 name、outputPath 等选项）
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64处理
          // 优点: 减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          // 输出路径以及名字
          // [hash:10]取图片的hash的前10位
          //[name]是指原来的名字
          // [ext]取文件原来扩展名
          name: '../img/[name].[hash:8].[ext]'
        }
      },
       //!处理html
      //将HTML导出为字符串。当编译器需要时，HTML被最小化。
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader'   //0.5.5版本
      },
      //!处理其他资源
      {
        // 排除html|js|css|less|jpg|png|gif|vue资源
        exclude: /\.(html|js|css|less|jpg|png|gif|vue)$/,
        loader: 'file-loader',
        options: {
          // 当加载的图片小于limit时，会将图片编译成base64字符串形式
          //当加载的土拍你大于limit时，需要使用file-loader模块进行加载
          // 输出路径以及名字
          // [hash:10]取图片的hash的前10位
          //[name]是指原来的名字
          // [ext]取文件原来扩展名
          name: '../media/[name].[hash:8].[ext]'
        }
      },
    ]
  },
  //插件配置
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    //打包html模板
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）,默认复制到output目录
      template: './src/index.html',
      //输出路径以及重命名
      filename:'../index.html'
    })
  ],
  //开发环境 
  mode: 'development'
};