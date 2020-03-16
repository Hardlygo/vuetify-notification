/*
 * @Author: PENGZY
 * @since: 2020-03-16 09:44:57
 * @lastTime: 2020-03-16 11:15:34
 * @LastAuthor: Do not edit
 * @moto: Be Curious!
 * @message: 
 */
import component from '../../components/MDialog.vue';
import {
  mergeOptions
} from '../../libs/plugin_helper'

let $vm;

const plugin = {
  install(vue, option = {}) {
    //try avoid  [Vuetify] Unable to locate target [data-app]
    // document.body.setAttribute('data-app', true);
    const MDialog = vue.extend(component);
    //初始化,单独地挂载组件到文档内
    if (!$vm) {
      $vm = new MDialog({
        // el: document.createElement('div'),
        vuetify:option.vuetify||{},
        propsData: {
          message: '',
          title: '',
          titleIcon: 'error',
        }
      });
    }

    const mdialog = {
      show(options) {
        if (typeof options === 'object') {
          mergeOptions($vm, options);
        }
        if (typeof options === 'object' && (options.onShow || options.onHide)) {
          options.onShow && options.onShow();
        }
        //先调用组件原本的监听
        this.$watcher && this.$watcher();
        this.$watcher = $vm.$watch('showValue', (val) => {
          if (!val && options && options.onHide) {
            options.onHide();
          }
        })
        //取消原组件的监听事件  
        $vm.$off('on-cancel');
        $vm.$off('on-confirm');
        //重新注册
        $vm.$on('on-cancel', () => {
          $vm.showValue = false;
          options && options.onCancel && options.onCancel();
        })
        $vm.$on('on-confirm', () => {
          $vm.showValue = false;
          options && options.onConfirm && options.onConfirm();
        })
        $vm.showValue = true
      },
      hide() {
        $vm.showValue = false;
      },
      isVisible() {
        return $vm.showValue
      }
    }

    // all vn's plugins are included in this.$vn
    if (!vue.$vn) {
      vue.$vn = {
        MDialog: mdialog
      }
    } else {
      vue.$vn.MDialog = mdialog;
    }

    vue.mixin({
      created: function () {
        this.$vn = vue.$vn
      },
      mounted() {
        //渲染完毕再添加到文档流
        // document.querySelector("#app").appendChild($vm.$el)
        // 或者，在文档之外渲染并且随后挂载
        var component = $vm.$mount();
        document.querySelector("#app").appendChild(component.$el);
      }
    })

  }
}
export default plugin
export const install = plugin.install
