<i18n>
{
  "en": {
    "labName": "Laboratory Name",
    "labWebsite": "Laboratory Homepage",
    "instituteName": "Institute/University",
    "instituteWebsite": "Website of your Institute/University",
    "firstName": "First Name",
    "lastName": "Last Name",
    "phone": "Phone Number",
    "contactInfo": "Contact Information",
    "address": "Address",
    "city": "City",
    "zipcode": "Zipcode",
    "street": "Street",
    "password": "Password",
    "repeatPassword": "Repeat your Password",
    "email": "E-Mail Address",
    "officialEmail": "Institutional e-mail address"
  },
  "de":{
    "labName": "Laborname",
    "labWebsite": "Labor-Homepage",
    "instituteName": "Institut/Universität",
    "instituteWebsite": "Website des Instituts/der Universität",
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
    :state="validator(valFunc, 'form')"
    :invalid-feedback="invalidFeedback ? invalidFeedback(model) : feedback(valFunc)"
    :valid-feedback="validFeedback ? validFeedback(model) : 'OK'"
  >
    <b-form-input :type="inType" :id="name" :placeholder="' '" v-model="model" :state="validator(valFunc, 'field')" trim :validated="true" @change="$emit('change')"></b-form-input>
    <label>{{ $t(name) }}</label>
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
    invalidFeedback: {
      default: null,
    },
    validFeedback: {
      default: null,
    },
    required: {
      default: true
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
    validator(meth, type) {
      if (type === 'field' && this.model === "") return null;
      
      let a = meth(this.model, this.name);
      console.log(this.name, a.value, this.model)
      if (a.valid) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.$emit("valid")
        }, 300);
        if (this.model === "" && this.required) return false
        if (a.value === "") return null
      }
      if (!this.required && a.value === "")
        return null
      return a.valid;
    },
    feedback(meth) {
      if (this.model === '') {
        if (this.required)
          return this.$t("required")
        return ""
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
<style lang="scss" scoped>

.form-group {
  position: relative;
}

.form-group input,
.form-group label {
  padding: .75rem .75rem;
}

.form-group input {
  height: 50px
}

.form-group label {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  pointer-events: none;
}

.form-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-group input:-ms-input-placeholder {
  color: transparent;
}

.form-group input::-ms-input-placeholder {
  color: transparent;
}

.form-group input::-moz-placeholder {
  color: transparent;
}

.form-group input::placeholder {
  color: transparent;
}

.form-group input:not(:placeholder-shown) {
  padding-top: calc(.75rem + .75rem * (2 / 3));
  padding-bottom: calc(.75rem / 3);
}

.form-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(.75rem / 3);
  padding-bottom: calc(.75rem / 3);
  font-size: 12px;
  color: #777;
}
</style>