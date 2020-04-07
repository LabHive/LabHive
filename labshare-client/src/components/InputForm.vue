<i18n>
{
  "en": {
    
  },
  "de": {
    
  }
}
</i18n>

<template>
  <b-form-group
    :id="name"
    :label="$t(name)"
    :state="validator(valFunc)"
    :invalid-feedback="feedback(valFunc)"
    valid-feedback="OK"
    :label-cols-sm="verticalLabel ? null: 3"
  >
    <b-form-input :type="inType" :id="name" :placeholder="placeholder" v-model="model" :state="validator(valFunc)" trim :validated="true" @change="$emit('change')"></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  name: "InputForm",
  props: {
    name: String,
    value: String,
    valFunc: {
      default: () => { return { valid: null } },
      type: Function
    },
    inType: {
      default: 'text',
      type: String
    },
    placeholder: String,
    verticalLabel: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit("input", newValue);
        this.$root.$emit("inputForm_changed", newValue);
      }
    }
  },
  methods: {
    validator(meth) {
      let a = meth(this.model);
      if (a.valid) {
        if (this.timeout) clearTimeout(this.timeout); 
        this.timeout = setTimeout(() => {
          this.$emit("valid")
        }, 300);
        if (a.value === "") return null
      }
      return a.valid;
    },
    feedback(meth) {
      if (this.model === '') {
        return this.$t("required")
      }
      let a = meth(this.model);
      if (a.err && a.err.message !== "") {
        return this.$t("backend.formValidation." + a.err.message);
      }
      return "";
    }
  }
};
</script>