import res from './src/js/index'
import print from "./src/js/print"
import print2 from "./src/js/print2"
import './src/css/index.css';
import './src/css/index.less';
import './src/others/iconfont.css'
document.write('hello world')
console.log(res)();
console.log('21323');
//为了可以自动隔离js更新，我们使用
if (module.hot) {
  // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效a
  const files = require.context('./src/js', true, /\.js$/);
  console.log(files);
  files.keys().map(key => {
    console.log('./src/js'+key.replace('.',''));
    module.hot.accept('./src/js' + key.replace('.', ''), function () {
      // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
      // 会执行后面的回调函数
      // console.log(key);
      // key.replace('./js', '')()
      // console.log(key.replace('./js', ''));
      console.log(key);
    });
  })
}
