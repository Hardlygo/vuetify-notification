/*
 * @Author: PENGZY
 * @since: 2020-03-16 09:41:26
 * @lastTime: 2020-03-28 23:35:55
 * @LastAuthor: Do not edit
 * @文件相对于项目的路径: \rx-guilind:\workspace\JS\vuetify-notification\webpack.prod.js
 * @moto: Be Curious!
 * @message: 
 */
const merge = require('webpack-merge');
var webpack = require('webpack');
const common = require('./webpack.common');
module.exports = merge(common, {
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
    }, ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      comments: false,
      compress: {
        warnings: false
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // 把没用的function干掉了，代码看起来更好看
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
});
