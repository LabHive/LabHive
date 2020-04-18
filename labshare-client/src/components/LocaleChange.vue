<i18n>
{
  "en": {
    "language": "Language"
  },
  "de": {
    "language": "Sprache"
  }
}
</i18n>

<template>
  <div class="locale-changer">
    <b-nav-item-dropdown right :text="$t('language')">

      <template v-for="(v, k) in langs">
        <b-dropdown-item :key="k" @click="setLocale(k)">
        {{ v }}
        </b-dropdown-item>
      </template>
    </b-nav-item-dropdown>
  </div>
</template>

<script>
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
      this.$i18n.locale = val;
      localStorage.setItem("locale", val);
    }
  }
};
</script>