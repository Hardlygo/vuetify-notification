var path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
module.exports = merge(common, {
  //mode: 'development',webpack3.x不支持mode语法
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  module:{
    rules:[{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.resolve(__dirname, 'node_modules/vuetify'), // 指定需要转译的文件夹
    }]
  }
});
