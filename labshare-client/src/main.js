import Vue from "vue";
import Vuex from "vuex";
import router from "./router.js";
import store from "./store";
import App from "./App.vue";
import "./http";
import "leaflet/dist/leaflet.css";
import profile_load_mixin from "./mixins/profile_fetch";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { i18n } from "./localization";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faUserAlt, faSearch, faCubes, faHandsHelping, faEnvelope, faPhone, faMapMarker, faVial, faGraduationCap, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Sanitize from '@/components/Sanitize.vue'

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Font Awesome Library
library.add(faTwitter, faGithub, faUserAlt, faSearch, faCubes, faHandsHelping, faEnvelope, faPhone, faMapMarker, faVial, faGraduationCap, faInfoCircle)

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(Vuex);
Vue.mixin(profile_load_mixin);

Vue.prototype.$sanitize = function(html) {
  const c = Vue.extend(Sanitize)
  const instance = new c({propsData: {html: html}})
  instance.$mount()
  return instance.$el.outerHTML
}

new Vue({
  created () {
    AOS.init({
      offset: 32,
    });
  },
  router,
  store,
  i18n: i18n,
  render: h => h(App)
}).$mount("#app");

if (process.env.ENABLE_DEV) {
  Vue.config.devtools = true 
}
