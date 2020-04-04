import Vue from "vue";
import Vuex from "vuex";
import router from "./router.js";
import store from "./store";
import App from "./App.vue";
import "./http";
import "leaflet/dist/leaflet.css";
import profile_load_mixin from "./mixins/profile_fetch";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueI18n from "vue-i18n";
import { localization } from "./localization";

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(Vuex);
Vue.mixin(profile_load_mixin);
Vue.use(VueI18n);

new Vue({
  router,
  store,
  i18n: new VueI18n(localization),
  render: h => h(App)
}).$mount("#app");
