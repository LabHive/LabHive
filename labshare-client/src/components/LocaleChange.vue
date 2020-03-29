<template>
  <div class="locale-changer">
    <b-form-select id v-model="$i18n.locale">
      <b-form-select-option
        v-for="(lang, i) in langs"
        :key="`Lang${i}`"
        :value="lang.code"
      >{{ lang.label }}</b-form-select-option>
    </b-form-select>
  </div>
</template>

<script>
const langs = [
  { label: "Deutsch", code: "de" },
  { label: "English", code: "en" }
];
export default {
  name: "locale-change",
  data() {
    return {
      langs
    };
  }
};
</script>