import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'

import MDialog from './component_plugins/MDialog'
import MSnackBar from './component_plugins/MSnackBar'
Vue.use(MDialog,{vuetify});
Vue.use(MSnackBar,{vuetify});

new Vue({
  el: '#app',
  vuetify,
  render: h => h(App),
  mounted() {
    
  },
})
