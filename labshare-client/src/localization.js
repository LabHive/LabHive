import messages from './Localization/de.json'
import enMessages from './Localization/en.json'
import VueI18n from "vue-i18n";
import Vue from 'vue'

let locale = localStorage.getItem('locale')
if (!locale) {
  locale = navigator.language || navigator.userLanguage
  locale = locale.toLowerCase()
  if (locale.indexOf("de") > -1) {
    locale = "de"
  } else if (locale.indexOf("es") > -1) {
    locale = "es"
  } else {
    locale = "en"
  }
}

const loadedLanguages = ['de', 'en']

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: "de",
  fallbackLocale: "en",
  silentFallbackWarn: true,
  messages: {
    de: messages,
    en: enMessages
  }
})


if (locale !== "de") {
  loadLanguageAsync(locale)
}

function setI18nLanguage (lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang) {
  // If the same language
  if (lang === 'cn') {
    i18n.fallbackLocale = "cn"
    i18n.setLocaleMessage(lang, {})
    i18n.locale = lang
    return
  }

  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "lang-[request]" */ `./Localization/${lang}.json`).then(
    messages => {
      i18n.setLocaleMessage(lang, messages)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
  )
}
