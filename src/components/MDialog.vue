<template>
  <div>
    <v-dialog v-model="showValue" persistent :mini-width="minWidth" :max-width="maxWidth">
      <v-card color="primary" v-if="type==='loading'">
        <v-card-text class="py-2">
          {{message}}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
      <v-card v-if="type==='confirm'">
        <v-card-title primary-title
          :class='["py-3", "darken-2", "white--text",titleBarColor?titleBarColor:"light-blue"]'>
          <span class="subtitle-1 font-weight-light">{{title}}</span>
        </v-card-title>
        <v-card-text class="headline lighten-2 py-4 px-3">
          <v-layout align-center justify-center style="white-space:normal; word-break:normal;overflow:hidden;">
            <v-icon size="28" light v-if="titleIcon" :color="iconColor">
              {{ titleIcon == 'error' ? "mdi-alert-circle" : titleIcon }}
            </v-icon>
            <!-- <v-icon color="red">mdi-close</v-icon> -->
            <div style="text-align:left"  class="subheading" v-html="message">
            </div>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class='elevation-0 white--text' v-if="showConfirm" color="light-blue" @click.stop="_onConfirm">
            {{comfirmText}}</v-btn>
          <v-btn class='elevation-0 white--text ' v-if="showCancel" color="light-blue" @click.stop="_onCancel">
            {{cancelText}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    VSnackbar
  } from "vuetify/lib";
  export default {
    name: "m-dialog",
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
      VSnackbar
    },
    data: vm => ({
      showValue: false
    }),
    props: {
      status: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: "confirm"
      },
      maxWidth: {
        type: [String, Number],
        default: 400
      },
      minWidth: {
        type: [String, Number],
        default: 400
      },
      message: String,
      title: String,
      titleIcon: String,
      showConfirm: {
        type: Boolean,
        default: true
      },
      showCancel: {
        type: Boolean,
        default: true
      },
      titleBarColor: {
        type: String,
        default: "light-blue"
      },
      iconColor: {
        type: String,
        default: "blue"
      },
      comfirmText: {
        type: String,
        default: "确定"
      },
      cancelText: {
        type: String,
        default: "取消"
      }
    },
    watch: {
      status: {
        handler: val => {
          this.showValue = val;
        },
        immediate: true
      },
      showValue(val) {
        //val为true表明打开
        if (val) {
          this._onShow();
        } else {
          this._onHide();
        }
      }
    },
    methods: {
      _onShow() {
        this.status = true;
        this.$emit("on-show");
      },
      _onHide() {
        this.status = false;
        this.$emit("on-hide");
      },
      _onCancel() {
        this.$emit("on-cancel");
      },
      _onConfirm() {
        this.$emit("on-confirm");
      }
    }
  };

</script>
