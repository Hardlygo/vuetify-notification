// src/plugins/vuetify.js
import Vue from 'vue'
import Vuetify, {
  VApp,
  VCard,
  VDialog,
  VCardText,
  VCardTitle,
  VProgressLinear,
  VLayout,
  VIcon,
  VDivider,
  VCardActions,
  VSpacer,
  VBtn,
  VSnackbar,
} from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.min.css' // Ensure you are using css-loader

Vue.use(Vuetify, {
  theme: {
    dark: true,
  },
  icons: {
    iconfont: 'mdi'
  },
  components: {
    VApp,
    VCard,
    VDialog,
    VCardText,
    VCardTitle,
    VProgressLinear,
    VLayout,
    VIcon,
    VDivider,
    VCardActions,
    VSpacer,
    VBtn,VSnackbar
  }
})

const opts = {
}

export default new Vuetify(opts)
