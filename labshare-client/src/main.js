import Vue from 'vue'
import Vuex from 'vuex'
import router from './router.js'
import store from './store'
import App from './App.vue'
import './http'

Vue.config.productionTip = false

Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')