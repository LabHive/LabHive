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
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(newValue) {
        console.log("new input")
        this.$emit("input", newValue);
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