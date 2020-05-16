import messages from './Localization/de.json'
import VueI18n from "vue-i18n";
import Vue from 'vue'

let locale = localStorage.getItem('locale')
if (!locale) {
  locale = 'de'
}

const loadedLanguages = ['de']
console.log(messages)

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: "de",
  fallbackLocale: "de",
  silentFallbackWarn: true,
  messages: {
    de: messages
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
