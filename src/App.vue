<!--
 * @Author: PENGZY
 * @since: 2020-03-16 09:44:57
 * @lastTime: 2020-04-01 10:07:42
 * @LastAuthor: Do not edit
 * @moto: Be Curious!
 * @message: 
 -->
<template>
  <v-app dark>
    <div>
      <h1>{{ msg }}</h1>
      <h2>Essential Links</h2>
      <ul>
        <li><a
            href="https://vuejs.org"
            target="_blank"
          >Core Docs</a></li>
        <li><a
            href="https://forum.vuejs.org"
            target="_blank"
          >Forum</a></li>
        <li><a
            href="https://chat.vuejs.org"
            target="_blank"
          >Community Chat</a></li>
        <li><a
            href="https://twitter.com/vuejs"
            target="_blank"
          >Twitter</a></li>
      </ul>
      <h2>Ecosystem</h2>
      <ul>
        <li><a
            href="http://router.vuejs.org/"
            target="_blank"
          >vue-router</a></li>
        <li><a
            href="http://vuex.vuejs.org/"
            target="_blank"
          >vuex</a></li>
        <li><a
            href="http://vue-loader.vuejs.org/"
            target="_blank"
          >vue-loader</a></li>
        <li><a
            href="https://github.com/vuejs/awesome-vue"
            target="_blank"
          >awesome-vue</a></li>
      </ul>
      <v-btn @click.stop="showDialog">点击</v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    showDialog() {
      this.$vn.MDialog.show({
        title: "我的dialog",
        titleIcon: "mdi-close",
        iconColor: "red",
        message: "你好66666666出错了未能校验身份嘻嘻嘻",
        titleBarColor: "red",
        cancelText: "关闭",
        onCancel() {
          console.log(1); // 非当前 vm
        },
        onConfirm() {
          console.log(2);
        }
      });

      // this.$vn.MDialog.show({
      //   type:'loading',
      //   message: "数据加载中...",
      //   titleBarColor: "red",
      // });

      // this.$vn.MSnackbar.show({
      //   text: 'hello'
      // })
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
