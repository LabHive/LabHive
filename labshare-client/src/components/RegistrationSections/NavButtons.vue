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
    <b-row style="margin-top: 44px">
      <b-col cols="auto">
        <b-button variant="secondary" v-if="!hideBack" @click="$parent.$emit('previousState')">{{ $t("back") }}</b-button>
      </b-col>
      <b-col cols="auto">
        <b-button
          variant="primary"
          @click="$parent.$emit('nextState')"
          :disabled="disableSubmit"
          v-if="!final"
        >{{ $t("next") }}</b-button>
        <b-button
          variant="success"
          @click="$parent.$emit('submit')"
          :disabled="disableSubmit"
          v-else
        >{{ $t("submit") }}</b-button>
      </b-col>
    </b-row>
    
    
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

<style lang="scss" scoped>
.col-auto {
  padding-right: 0;
}
</style>