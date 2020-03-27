import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'

import Index from './views/Index'
import Login from './views/Login'
import Register from './views/Register'
import List from './views/List'
import UeberUns from './views/UeberUns'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login },
  { path: '/register', component: Register},
  { path: '/ueber-uns', component: UeberUns},
  { path: '/list', component: List, meta: { auth: true } }
];
const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.authenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router;
