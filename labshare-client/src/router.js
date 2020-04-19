import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'

import Index from './views/Index'
import Login from './views/Login'
import ForgotPassword from './views/ForgotPassword';
import ResetPassword from './views/ResetPassword';
import Register from './views/Register'
import Search from './views/Search'
import UeberUns from './views/UeberUns'
import Profile from './views/Profile'
import ChangePassword from './views/ChangePassword'
import Imprint from './views/Imprint'
import PrivacyPolicy from './views/PrivacyPolicy'
import Request from './views/Request'
import Offer from './views/Offer'
import Activation from './views/Activation'
import Admin from './views/Admin'
import LoginAdmin from './views/LoginAdmin'
import RevokeConsent from './views/RevokeConsent'

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'pageAboutLabhive', component: Index },
  { path: '/login', name: 'pageLogin', component: Login, meta: { redirectLoggedIn: '/'} },
  { path: '/admin-login', component: LoginAdmin, meta: { redirectLoggedIn: '/admin' } },
  { path: '/register', name: 'pageRegister', component: Register, meta: { redirectLoggedIn: '/'}},
  { path: '/reset-password', component: ResetPassword },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/ueber-uns', name: 'pageAboutUs', component: UeberUns},
  { path: '/privacyPolicy', component: PrivacyPolicy },
  { path: '/imprint', component: Imprint },
  { path: '/search', name: 'pageSearch', component: Search },
  { path: '/activate', component: Activation },
  
  { path: '/profile', component: Profile, meta: { auth: true } },
  { path: '/revokeConsent', component: RevokeConsent, meta: { auth: true } },
  { path: '/admin', component: Admin, meta: { auth: true } },
  { path: '/request', component: Request, meta: { auth: true } },
  { path: '/offer', component: Offer, meta: { auth: true } },
  { path: '/change-password', component: ChangePassword, meta: { auth: true } },
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
