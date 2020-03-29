/*
 * @Author: PENGZY
 * @since: 2020-03-16 09:44:57
 * @lastTime: 2020-03-29 14:59:14
 * @LastAuthor: Do not edit
 * @FilePath: \rx-guilind:\workspace\JS\vuetify-notification\src\main.js
 * @moto: Be Curious!
 * @message: 
 */
// import '@babel/polyfill';//'使用了@babel/preset-env不需要再加ployfill'

import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'

import MDialog from './component_plugins/MDialog'
import MSnackBar from './component_plugins/MSnackBar'
Vue.use(MDialog,{vuetify});
Vue.use(MSnackBar,{vuetify});


// 新增API
new Promise(() => {})


new Vue({
  el: '#app',
  vuetify,
  render: h => h(App),
  mounted() {
    
  },
})
