#### 使用```vuetify-notification```

```vuetify-notification```是基于vuetify2.0 以及mdi字体封装的一个提示提醒组件，目的在于在项目中以最简便的编程式调用。(打包后仅有10k，欢迎使用vuetifyUI的朋友们使用，如若发现bug也欢迎指正，谢谢，多多star喔~)
 
##### 食用步骤</br>
0.众所周知，当我们自定义组件时需要自己封装还有在其他每个调用到的其他组件中引入，还要在template中标明标签，在这里使用到了编程式的思想，只需要在全局main.js里面引入一次即可全局在有vue实例的地方用简短的js实现调用，一劳永逸，你可以在一些比如需要提示的地方或者请求返回的地方调用。
1. 
```npm i -s vuetify-notification@latest```

2. 在项目的main.js中引入（目前该库提供了两个组件，diaolog与snackbar且都是基于vuetify编写，故当你需要自定义一些类如文字大写颜色等请参考vuetify的官网）
```javascript {highlight=20}
import {
	MDialogPlugin,
	MSnackBarPlugin,
} from 'vuetify-notification'; //使用过程中请确保您下载并注册了vuetify和@mdi
Vue.use(MDialogPlugin, {
	vuetify
});//dialog插件的添加方式
Vue.use(MSnackBarPlugin, {
	vuetify
});//snackbar插件的添加方式

```
3. 只要在main.js中添加了即可在代码中的任何地方以最简单的方式在vue文件或者js文件中调用
```dialog```

~~~javascript
//打开dialog
    this.$vn.MDialog.show({
					title: "我的dialog",
					titleIcon: "error",
					message: "你好66666666",
					onCancel() {
						console.log(1) // 非当前 vm
					},
					onConfirm() {
						console.log(2)
                    }
                    
                });
//关闭(可以主动调用也可以根据dialog内的确定或取消按钮关闭)
this.$vn.MDialog.hide()
~~~
```show```函数的入参对象相关属性方法如下：</br>

属性|默认值|类型|描述
----|-----|----|----|
type|confirm|String|
message||String|    
title||String|
titleIcon||String|
showConfirm|true|Boolean|     
showCancel|true| Boolean|   
titleBarColor|light-blue|String|
iconColor|blue|String|
onConfirm|undefined|function|点击确定后的回调方法|
onCancel|undefined|function|点击取消后的回调方法|   
comfirmText|确定|String|确定按钮的文字
cancelText|取消|String|取消按钮的文字


```snackbar```
~~~ javascript{highlight=10}
    //打开
	this.$vn.MSnackbar.show({
					text: 'hello'
				})
~~~
属性|默认值|类型|描述
----|-----|----|----|
color|green|String
mode|multi-line|String
text|Hello, I\'m a snackbar|String
timeout|6000|Number
x |null|String    
y|top|String    
showCloseBtn|true|Boolean    
closeBtnColor|pink|String

```presented by:今天星期五```（请尊重别人的劳动）

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
