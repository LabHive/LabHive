import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'

import Index from './views/Index'
import Login from './views/Login'
import Register from './views/Register'
import List from './views/List'
import UeberUns from './views/UeberUns'
import Profile from './views/Profile'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Index, meta: { redirectLoggedIn: '/list'} },
  { path: '/login', component: Login, meta: { redirectLoggedIn: '/list'} },
  { path: '/register', component: Register, meta: { redirectLoggedIn: '/list'}},
  { path: '/ueber-uns', component: UeberUns},
  { path: '/list', component: List, meta: { auth: true } },
  { path: '/profile', component: Profile, meta: { auth: true } }
];
const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  // Take people to login if needed
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.authenticated) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }

  // Take people to serch when logged in
  if(to.matched.some(record => record.meta.redirectLoggedIn)) {
    if(store.getters.authenticated){
      next(to.meta.redirectLoggedIn)
      return
    } else {
      next()
    }
  }

})

export default router;
