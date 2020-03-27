import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from './views/Index'
import Login from './views/Login'
import Register from './views/Register'
import List from './views/List'
import UeberUns from './views/UeberUns'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login, meta: { auth: false } },
  { path: '/register', component: Register, meta: { auth: false }},
  { path: '/ueber-uns', component: UeberUns},
  { path: '/list', component: List, meta: { auth: true } }
];
const router = new VueRouter({ routes });

// TODO: This results in `uncaught exception: Object` when routing, but vue-auth pluign requires it :/
// Vue.router = router;

export default router;
