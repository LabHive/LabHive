import Vue from 'vue'
import Vuex from 'vuex'
import VueAuth from '@websanova/vue-auth'
import VueResource from 'vue-resource'
import router from './router.js'
import store from './store'
import auth from './auth'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueResource);
if (process.env.NODE_ENV == 'production') {
  Vue.http.options.root = '/api/v1';
}
else {
  Vue.http.options.root = 'http://localhost:5000/api/v1';
}

Vue.use(Vuex);
Vue.use(VueAuth, auth);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')