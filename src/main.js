import Vue from 'vue'
import App from './App.vue'

import Dialog from './components/common/Dialog/dialog.js'
import Toast from './components/common/Toast/toast.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(Dialog)
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
