const { resolve } = require('path');
//处理html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
//把css从js抽离成单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩 css 
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  entry: './main.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 创建style标签，将样式放入
          // 'style-loader', 
          // 这个loader取代style-loader。作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到js文件中
          'css-loader',
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
      },
      {
        test: /\.less$/,
        use: [
          // 创建style标签，将样式放入
          // 'style-loader', 
          // 这个loader取代style-loader。作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到js文件中
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss 的插件
                require('postcss-preset-env')()]
            }
          },
          'less-loader'
        ]
      },
      /*语法检查： eslint-loader eslint 注意：只检查自己写的源代码，第三方的库是不用检查的 
      npm install --save-dev eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import
      设置检查规则： package.json 中 eslintConfig 中设置~
       "eslintConfig": { "extends": "airbnb-base" } airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复 eslint 的错误 
          fix: true
        }
      }
    ]
  },
  plugins: [
    //处理html模板
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    //把css从js抽离成单独文件
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css'
    }),
    // 压缩 css 
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'development'
};
