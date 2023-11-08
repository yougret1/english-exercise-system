import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI, { Message } from 'element-ui'
import axios from './api/request/request'
import storage from './store/storage'
import 'element-ui/lib/theme-chalk/index.css'
import './config/polyfill' // 注意文件路径
import * as ECharts from 'echarts'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts = ECharts
Vue.prototype.$http = axios
Vue.prototype.$storage = storage
Vue.prototype.$message = Message
new Vue({
  strict: false,
  router,
  render: (h) => h(App)
}).$mount('#app')
