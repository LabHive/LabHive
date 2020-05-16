<template>
  <div class="locale-changer">
    <b-nav-item-dropdown right :text="$t('general.language')">
      <template v-for="(v, k) in langs">
        <b-dropdown-item :key="k" @click="setLocale(k)">
        {{ v }}
        </b-dropdown-item>
      </template>
    </b-nav-item-dropdown>
  </div>
</template>

<script>
import { loadLanguageAsync } from '@/localization.js'
const langs = {
  de: "Deutsch",
  en: "English"
};
export default {
  name: "locale-change",
  data() {
    return {
      langs,
    };
  },
  computed: {
    getLanguage: function() {
      return langs[this.$i18n.locale]
    }
  },
  methods: {
    setLocale: function(val) {
      loadLanguageAsync(val)
      localStorage.setItem("locale", val);
    }
  },
  mounted() {
    document.documentElement.setAttribute('lang', this.$i18n.locale);
  }
};
</script>
