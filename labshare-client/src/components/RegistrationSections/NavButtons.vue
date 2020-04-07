<i18n>
{
  "en": {
    "back": "Back",
    "next": "Next",
    "submit": "Submit"
  },
  "de": {
    "back": "Zurück",
    "next": "Weiter",
    "submit": "Registrieren"
  }
}
</i18n>
<template>
  <div>
    <b-button variant="primary" v-if="!hideBack" @click="$parent.$emit('previousState')">{{ $t("back") }}</b-button>
    <b-button
      style="float: right"
      variant="primary"
      @click="$parent.$emit('nextState')"
      :disabled="disableSubmit"
      v-if="!final"
    >{{ $t("next") }}</b-button>

    <b-button
      style="float: right"
      variant="success"
      @click="$parent.$emit('submit')"
      :disabled="disableSubmit"
      v-if="final"
    >{{ $t("submit") }}</b-button>
  </div>
</template>

<script>
export default {
  props: {
    disableSubmit: {
      type: Boolean,
      default: true
    },
    hideBack: {
      type: Boolean,
      default: false
    },
    final: {
      type: Boolean,
      default: false
    }
  }
};
</script>