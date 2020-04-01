import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'

import Index from './views/Index'
import Login from './views/Login'
import ForgotPassword from './views/ForgotPassword';
import ResetPassword from './views/ResetPassword';
import Register from './views/Register'
import List from './views/List'
import UeberUns from './views/UeberUns'
import Profile from './views/Profile'
import ChangePassword from './views/ChangePassword'
import Imprint from './views/Imprint'
import DataProtection from './views/DataProtection'
import Request from './views/Request'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login, meta: { redirectLoggedIn: '/'} },
  { path: '/register', component: Register, meta: { redirectLoggedIn: '/'}},
  { path: '/reset-password', component: ResetPassword },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/ueber-uns', component: UeberUns},
  { path: '/dataProtection', component: DataProtection },
  { path: '/imprint', component: Imprint },
  { path: '/search', component: List },
  
  { path: '/profile', component: Profile, meta: { auth: true } },
  { path: '/request', component: Request, meta: { auth: true } },
  { path: '/change-password', component: ChangePassword, meta: { auth: true } },
  { path: '/list', component: List, meta: { auth: true } },
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
