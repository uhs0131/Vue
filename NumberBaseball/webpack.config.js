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
        loader:'vue-loader',
      }],
  },
  plugins:[
    new VueLoaderPlugin(),
  ],
  output:{
    filename:'[name].js',
    path:path.join(__dirname, 'dist'),
  },
}
