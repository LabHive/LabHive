<template>
  <div>
    <b-row style="margin-top: 44px">
      <b-col cols="auto">
        <b-button variant="secondary" v-if="!hideBack" @click="$parent.$emit('previousState')">{{ $t("general.back") }}</b-button>
      </b-col>
      <b-col cols="auto">
        <b-button
          variant="primary"
          @click="$parent.$emit('nextState')"
          :disabled="disableSubmit"
          v-if="!final"
        >{{ $t("general.next") }}</b-button>
        <b-button
          variant="success"
          @click="$parent.$emit('submit')"
          :disabled="disableSubmit"
          v-else
        >{{ $t("registration.submit") }}</b-button>
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