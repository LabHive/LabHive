import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store'

const Index = () => import('./views/Index')
const Login = () => import('./views/Login')
const ForgotPassword = () => import('./views/ForgotPassword')
const ResetPassword = () => import('./views/ResetPassword')
const Register = () => import('./views/Register')
const Search = () => import('./views/Search')
const Details = () => import('./views/Details')
const UeberUns = () => import('./views/UeberUns')
const Profile = () => import('./views/Profile')
const ChangePassword = () => import('./views/ChangePassword')
const Imprint = () => import('./views/Imprint')
const PrivacyPolicy = () => import('./views/PrivacyPolicy')
const Request = () => import('./views/Request')
const Offer = () => import('./views/Offer')
const Activation = () => import('./views/Activation')
const Admin = () => import('./views/Admin')
const LoginAdmin = () => import('./views/LoginAdmin')
const RevokeConsent = () => import('./views/RevokeConsent')
const LabDiagForm = () => import('./components/RegistrationForms/LabDiagForm')
const LabResearchForm = () => import('./components/RegistrationForms/LabResearchForm')
const VolunteerForm = () => import('./components/RegistrationForms/VolunteerForm')

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'pageAboutLabhive', component: Index },
  { path: '/login', name: 'pageLogin', component: Login, meta: { redirectLoggedIn: '/'} },
  { path: '/admin-login', component: LoginAdmin, meta: { redirectLoggedIn: '/admin' } },
  { path: '/register', name: 'pageRegister', component: Register, meta: { redirectLoggedIn: '/'}, children: [
    {path: 'lab_diag/:id', name: 'register/lab_diag', component: LabDiagForm, meta: { redirectLoggedIn: '/'}},
    {path: 'lab_research/:id', name: 'register/lab_research', component: LabResearchForm, meta: { redirectLoggedIn: '/'}},
    {path: 'volunteer/:id', name: 'register/volunteer', component: VolunteerForm, meta: { redirectLoggedIn: '/'}}
  ]},
  { path: '/reset-password', component: ResetPassword },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/ueber-uns', name: 'pageAboutUs', component: UeberUns},
  { path: '/privacyPolicy', component: PrivacyPolicy },
  { path: '/imprint', component: Imprint },
  { path: '/search', name: 'pageSearch', component: Search },
  { path: '/details/:id', name: 'details', component: Details, props: true },
  { path: '/activate', component: Activation },
  
  { path: '/profile', component: Profile, meta: { auth: true } },
  { path: '/revokeConsent', component: RevokeConsent, meta: { auth: true } },
  { path: '/admin', component: Admin, meta: { auth: true } },
  { path: '/request', component: Request, meta: { auth: true } },
  { path: '/offer', component: Offer, meta: { auth: true } },
  { path: '/change-password', component: ChangePassword, meta: { auth: true } },
];
const router = new VueRouter({ 
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

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
