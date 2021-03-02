const { resolve } = require('path');
//处理html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
//把css从js抽离成单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩 css 
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 定义nodejs环境变量：决定使用browserslist的哪个环境,这个browserslist是处理js兼容性使用的
process.env.NODE_ENV = 'production';
//复用Loader
const commonCssLoader = [
  // 创建style标签，将样式放入
  // 'style-loader', 
  // 这个loader取代style-loader。作用：提取js中的css成单独文件
  MiniCssExtractPlugin.loader,
  // 将css文件整合到js文件中
  'css-loader',
  //!css兼容性处理
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        // postcss 的插件
        require('postcss-preset-env')()]
    }
  }
]
module.exports = {
  entry: './main.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      //!css处理
      {
        test: /\.css$/,
        use: [...commonCssLoader]
      },
      //!less处理
      {
        test: /\.less$/,
        use: [...commonCssLoader,'less-loader']
      },
      //!js语法检查
      /*语法检查： eslint-loader eslint 注意：只检查自己写的源代码，第三方的库是不用检查的 
      npm install --save-dev eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import
      设置检查规则： package.json 中 eslintConfig 中设置~
       "eslintConfig": { "extends": "airbnb-base" } airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 优先执行 
        enforce: 'pre',
        options: {
          // 自动修复 eslint 的错误 
          fix: true
        }
      },
      //!js兼容性处理
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // npm install --save- dev babel - loader @babel/core @babel/preset - env @babel/polyfill core-js
          // 预设：指示 babel 做怎么样的兼容性处理 
          presets: [['@babel/preset-env', {
            // 按需加载 
            useBuiltIns: 'usage',
            // 指定 core-js 版本 
            corejs: { version: 3 },
            // 指定兼容性做到哪个版本浏览器 
            targets: { chrome: '60', firefox: '60', ie: '9', safari: '10', edge: '17' }
          }]]
        }
      },
      //!处理其他资源
      {
        exclude: /\.(js|css|less|html|jpg|png|gif|vue)/,
        loader: 'file-loader',
        options: {
          // 当加载的图片小于limit时，会将图片编译成base64字符串形式
          //当加载的土拍你大于limit时，需要使用file-loader模块进行加载
          // [hash:10]取图片的hash的前10位
          //[name]是指原来的名字
          // [ext]取文件原来扩展名
          name: '[name].[hash:8].[ext]',
          // 输出文件夹，相对于build文件下
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    //!处理html模板
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩 html 代码 
      minify: {
        // 移除空格 
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    }),
    //!把css从js抽离成单独文件
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css'
    }),
    //! 压缩 css 
    new OptimizeCssAssetsWebpackPlugin()
  ],
  // 生产环境下会自动压缩 js 代码
  mode: 'production'
};
