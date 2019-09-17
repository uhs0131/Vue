const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
  mode:'development',
  devtool:'eval',   // hidden-source-map 운영시 자주 사용
  resolve:{
    extensions:['.js', '.vue'],
  },
  entry:{
    app: path.join(__dirname, 'main.js'),
  },
  module:{
      rules:[{
        test:/\.vue$/,
        use:'vue-loader',           // loader : js 가 아닌 것을 js 로 통합하는 역할(메인)
      },
      {
        test:/\.css$/,
        use:['vue-style-loader', 'css-loader',]
      }
    ],
  },
  plugins:[
    new VueLoaderPlugin(),      // plugin : 최종 js 를 만들기 전에 부가적으로 필요한 작업을 하는 역할
  ],
  output:{
    filename:'[name].js',
    path:path.join(__dirname, 'dist'),
  },
}
