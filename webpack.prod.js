const merge = require('webpack-merge');
var webpack = require('webpack');
const common = require('./webpack.common');
module.exports = merge(common, {
  module: {
    rules: [{
      test: /\.js$/,
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
