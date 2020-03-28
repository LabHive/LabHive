import Vue from 'vue'
import Vuex from 'vuex'
import router from './router.js'
import store from './store'
import App from './App.vue'
import './http'
import profile_load_mixin from './mixins/profile_fetch'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Vuex);
Vue.mixin(profile_load_mixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')