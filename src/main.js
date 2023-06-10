import Vue from 'vue'

import App from './App'
import store from './store'
import router from './router'

import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/icons' // icon
import '@/permission' // permission control

import * as filters from "./utils/filter/index"

// 全局过滤器
Object.keys(filters).forEach(e => {
  Vue.filter(e, filters[e]);
});


if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale, size: 'mini' })
// 中文版 element-ui
Vue.use(ElementUI, { size: 'mini' })

// 修改 el-dialog 默认点击遮照不关闭
ElementUI.Dialog.props.closeOnClickModal.default = false;



Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
