import Vue from "vue";
import Vuex from "vuex";
import router from "./router.js";
import store from "./store";
import App from "./App.vue";
import "./http";
import profile_load_mixin from "./mixins/profile_fetch";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueI18n from "vue-i18n";

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
  i18n: new VueI18n({
    locale: "de",
    fallbackLocale: "de",
    messages: {
      en: {},
      de: {
        loginInfo: "Login Informationen",
        contactInfo: "Kontakt Informationen",
        register: "Registrieren",
        save: "Speichern",
        email: "E-Mail Adresse",
        password: "Passwort",
        repeatPassword: "Passwort wiederholen",
        firstName: "Vorname",
        lastName: "Nachname",
        phone: "Telefonnummer",
        city: "Ort",
        postCode: "Postleitzahl",
        consentProcessing:
          "Ich bin damit einverstanden, dass meine Daten von labHive Testshare zum Zweck der Weiterleitung an Labore oder Institute für die Möglichkeit einer Zusammenarbeit im Rahmen der SARS-CoV-2 Pandemie erhoben, verarbeitet und gespeichert werden. Das Recht zum Widerruf und meine Rechte gemäß Art. 15 DS-GVO sind von der Einwilligung unberührt. Weitere Hinweise finden Sie in unserer Datenschutzerklärung.",
        consentContact:
          "Ich bin damit einverstanden, dass meine Kontaktdaten für registrierte Labore oder Institute der Platform über die Suchfunktion einsehbar sind."
      }
    }
  }),
  render: h => h(App)
}).$mount("#app");
