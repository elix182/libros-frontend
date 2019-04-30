// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueCookies from 'vue-cookies'
import Axios from 'axios'

Vue.use(Vuetify, {
  theme: {
    primary: '#009688',
    secondary: '#4caf50',
    accent: '#607d8b',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    success: '#8bc34a'
  }
})
Vue.use(VueCookies)

Vue.config.productionTip = false
Axios.defaults.baseURL = 'http://localhost:8000/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
