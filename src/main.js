// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from '@/js/http.js'
import filters from '@/filter/filters.js'
import './assets/font-awesome/font-awesome.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { common } from '@/mixins/common.js'

Vue.use(ElementUI)	

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.mixin(common)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
	