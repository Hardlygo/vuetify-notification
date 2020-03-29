/*
 * @Author: PENGZY
 * @since: 2020-03-29 02:02:47
 * @lastTime: 2020-03-29 17:22:49
 * @LastAuthor: Do not edit
 * @FilePath: \rx-guilind:\workspace\JS\vuetify-notification\babel.config.js
 * @moto: Be Curious!
 * @message: 总之，@babel/env是需要的用来转换es6+语法，@babel/plugin-transform-runtime用来优化，他自动带了ployfill功能这个ployfill是只用来重写helper帮助转换API的。故不能代替@babel/env
 * @babel/env用来转换es6+的高级语法如箭头函数，ployfill用来垫平浏览器转换API如promise
 *
 */

console.log("babel start to load...", `now run in ${process.env["NODE_ENV"]}`);

let babelConfig = {};
if (process.env["NODE_ENV"] === "development") {
  //生产环境配置,使用@babel/env提供的预设
  babelConfig = {
    presets: [
      [
        "@babel/env",
        {
          "modules": false,
          //还可以配置target以只引入目标环境相应的polyfill
          //   "corejs": { //这里只要配置了corejs并且下载了core-js就可以不需要下载@babel/ployfill（里面包含了core-js和regenerator-runtime）
          //     "version": 2,
          //     "proposals": false
          //   },
          "useBuiltIns": "usage", //只引入目标环境用到的api
          "debug": true
        }
      ]
    ],
    plugins: []
  };

} else {
  //设想：在生产环境中用户会有自己配置的babel，@babel/env交由用户配置，故在生产环境不配置@babel/env
  //开发环境配置，使用@babel/plugin-transform-runtime减少体积，并且不影响用户公共环境
  babelConfig = {
    presets: [
      ["@babel/env", {
        "modules": false,
        "debug": true
      }]
    ],
    plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          "absoluteRuntime": false,
        //   "corejs": {//这会加大编译后的体积
        //     "version": 2,
        //     "proposals": false
        //   },
          "helpers": true,
          "regenerator": true,
          "useESModules": false,
        //   "version": "^7.9.2",
          "debug": true
        }
      ]
    ]
  };

}

module.exports = babelConfig;
