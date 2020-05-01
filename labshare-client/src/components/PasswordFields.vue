<i18n>
{
  "en": {
    "0Password": "Too short",
    "1Password": "Too short, please also add numbers and special characters",
    "2Password": "Please also add numbers and special characters",
    "3Password": "Sufficiently secure, with more characters your password will become even more secure",
    "4Password": "Your password is very secure"

  },
  "de": {
    "0Password": "Zu kurz",
    "1Password": "Zu kurz, bitte fügen Sie auch Zahlen und Sonderzeichen hinzu",
    "2Password": "Bitte fügen Sie auch Zahlen und Sonderzeichen hinzu",
    "3Password": "Ausreichend sicher, mit mehr Zeichen wird ihr Passwort noch sicherer",
    "4Password": "Ihr Passwort ist sehr sicher"
  }
}
</i18n>

<template>
  <div>
    <InputForm
      name="password"
      v-model="password"
      :valFunc="pwVal"
      :invalidFeedback="feedback"
      :validFeedback="feedback"
      inType="password"
    ></InputForm>
  </div>
</template>

<script>
import zxcvbn from "zxcvbn";
import InputForm from "@/components/InputForm"

export default {
  props: {
    value: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
    };
  },
  computed: {
    password: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit("input", newValue)
      }
    }
  },
  methods: {
    pwVal(data) {
      let secure = false;
      if (data) {
        let result = zxcvbn(data);
        secure = result.score >= 3
      }

      let valid = data != "" && secure

      if (valid) {
        this.$emit('validPassword', true)
      }
      else {
        this.$emit('validPassword', false)
      }
      
      return {
        valid: valid
      };
    },
    feedback(data) {
      if (data) {
        let result = zxcvbn(data);
        return this.$t(`${result.score}Password`)
      }
      else {
        return this.$t("required");
      }
    }
  },
  components: {
    InputForm
  }
}
</script>