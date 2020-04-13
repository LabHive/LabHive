<i18n>
{
    "en": {
    "labName": "Laboratory Name",
    "labWebsite": "Laboratory Homepage",
    "firstName": "First Name",
    "lastName": "Last Name",
    "phone": "Phone Number",
    "contactInfo": "Contact Information",
    "address": "Address",
    "city": "City",
    "zipcode": "Zipcode",
    "street": "Street",
    "password": "Password",
    "repeatPassword": "Repeat your password",
    "email": "E-Mail address",
    "officialEmail": "Institutional e-mail address"
    },
    "de":{
    "labName": "Laborname",
    "labWebsite": "Labor-Homepage",
    "firstName": "Vorname",
    "lastName": "Nachname",
    "phone": "Telefonnummer",
    "contactInfo": "Kontaktinformationen",
    "address": "Adresse",
    "city": "Stadt",
    "zipcode": "Postleitzahl",
    "street": "Strasse",
    "password": "Passwort",
    "repeatPassword": "Passwort wiederholen",
    "email": "E-Mail-Adresse",
    "officialEmail": "E-Mail-Adresse des Instituts"
    }
    }
</i18n>

<template>
  <b-form-group
    :id="name"
    :label="$t(name)"
    :state="validator(valFunc)"
    :invalid-feedback="invalidFeedback ? invalidFeedback(model) : feedback(valFunc)"
    :valid-feedback="validFeedback ? validFeedback(model) : 'OK'"
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
    },
    invalidFeedback: {
      default: null,
    },
    validFeedback: {
      default: null,
    },
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