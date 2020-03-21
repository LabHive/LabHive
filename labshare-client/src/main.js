import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import store from './store'

import App from './App.vue'
import Index from './views/Index'
import Login from './views/Login'
import Register from './views/Register'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login },
  { path: '/register', component: Register}
];

const router = new VueRouter({ routes });

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
