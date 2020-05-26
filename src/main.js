// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Axios from "axios"
import animate from 'animate.css'

// import VueResource from 'vue-resource'

import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import './assets/bootstrap-3.3.7-dist/js/bootstrap.min.js'

// Vue.use(VueResource)

Vue.use(animate);
Vue.prototype.$axios = Axios;
// Vue.prototype.HOST = '/api';
// Vue.prototype.HOST = 'https://sky.donghuajinyun.com';
// Vue.prototype.HOST = 'http://172.18.2.138:8082';
// Vue.prototype.HOST = 'https://cmsservice.chsla.org.cn';
Vue.prototype.HOST = 'http://192.168.1.8:8082';
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
