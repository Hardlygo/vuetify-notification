var path = require('path')
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV

// 为了方便在不同模式下的路径配置，我们配置三个map对象来匹配具体的模式，减少复杂的判断
// 三种基本模式
// 1 build - production 用于打包核心组件代码 别人引入的就是这个文件
// 2 dev - development 开发模式 调试你的组件
// 3 demo - 打包demo资源 打出来的js是包含完整的vue源码的,用于放到gitpages上的

const enteyMap = {
  production: './src/index.js',
  development: './src/main.js',
  demo: './src/main.js'
}
const pathMap = {
  production: './dist',
  development: './demo',
  demo: './demo'
}

const publicMap = {
  production: '/dist/',
  development: '/demo/',
  demo: '/demo/'
}

const externalMap = {
  production: {
    "vue": "vue",
    "vuetify/lib": "vuetify/lib",
    "@mdi/font/css/materialdesignicons.min.css": "@mdi/font/css/materialdesignicons.min.css"
  },
  development: {

  }
}




module.exports = {
  entry: [enteyMap[NODE_ENV]], // 引入路径 build模式下直接引入组件自身
  output: {
    path: path.resolve(__dirname, pathMap[NODE_ENV]), // 输出路径
    publicPath: publicMap[NODE_ENV], // 资源引入路径 为了方便我们的demo打包 开发模式和demo模式相同
    filename: 'vuetify-notification.js', // 你的组件名称
    library: 'VuetifyNotification', // 填写组件名称即可 人家可以通过这个名称来引入
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: externalMap[NODE_ENV],
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.s(c|a)ss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      // {
      //   test: /\.s(c|a)ss$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //     {
      //       loader: 'sass-loader',
      //       // Requires sass-loader@^7.0.0
      //       options: {
      //         implementation: require('sass'),
      //         sassOptions: {
      //           fiber: require('fibers'),
      //           indentedSyntax: true // optional
      //         },
      //       }
            
      //     }
      //   ]
      // },
      // {
      //   test: /\.styl(us)?$/,
      //   use: ['vue-style-loader',
      //     'css-loader', 'stylus-loader'
      //   ]
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            // 'styl': [
            //   'vue-style-loader',
            //   'css-loader', 'stylus-loader'
            // ],
            // 'stylus': [
            //   'vue-style-loader',
            //   'css-loader', 'stylus-loader'
            // ]
            // 'scss': [
            //   'vue-style-loader',
            //   'css-loader',
            //   'sass-loader'
            // ],
            // 'sass': [
            //   'vue-style-loader',
            //   'css-loader',
            //   'sass-loader?indentedSyntax'
            // ]
          }
          // other vue-loader options go here
        }
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[name].[ext]?[hash]'
      //   }
      // },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [new CleanWebpackPlugin()] //能自动清除output目录

}
