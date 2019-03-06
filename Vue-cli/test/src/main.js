// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Qs from 'qs'

Vue.prototype.axios = axios
Vue.prototype.Qs = Qs



Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template:'<App/>'
})
axios.defaults.baseURL = 'https://ec.51macc.com';
