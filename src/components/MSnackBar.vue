<template>
  <div>
    <v-snackbar v-model="showValue" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line=" mode === 'multi-line'"
      :right=" x === 'right'" :timeout=" timeout" :top=" y === 'top'" :color=" color" :vertical=" mode === 'vertical'">
      {{ text }}
      <v-btn text :color="closeBtnColor" v-if=" showCloseBtn" @click="_setClose">
        关闭
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
  import {
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
  export default {
    name: "m-snackbar",
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
      VBtn,
      VSnackbar,
    },
    props: {
      color: {
        default: 'green',
        type: String
      },
      mode: {
        default: 'multi-line',
        type: String
      },
      show: {
        default: false,
        type: Boolean
      },
      text: {
        default: 'Hello, I\'m a snackbar',
        type: String
      },
      timeout: {
        default: 6000,
        type: Number
      },
      x: {
        type: String,
        default: null
      },
      y: {
        type: String,
        default: 'top'
      },
      showCloseBtn: {
        default: true,
        type: Boolean
      },
      closeBtnColor: {
        default: 'pink',
        type: String
      }
    },
    data() {
      return {
        showValue: false
      }
    },
    watch: {
      show: {
        handler(val) {
          this.showValue = val;
        },
        immediate: true
      }
    },
    methods: {
      _setClose() {
        this.showValue = false;
        this.$emit('on-close');
      }
    }
  }

</script>
