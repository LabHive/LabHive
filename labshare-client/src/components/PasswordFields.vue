<i18n>
{
  "en": {
    "0Password": "Too short...",
    "1Password": "Still not complex enough... Please add more characters (also numbers and special characters are allowed)",
    "2Password": "Add more characters",
    "3Password": "Sufficient...",
    "4Password": "Unbreakable!"

  },
  "de": {
    "0Password": "Noch zu kurz...",
    "1Password": "Immernoch nicht lang genug... Bitte mehr Zeichen hinzufügen (Es sind auch Zahlen und Sonderzeichen erlaubt)",
    "2Password": "Füge mehr Zeichen hinzu",
    "3Password": "Ausreichend...",
    "4Password": "Unknackbar!"
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
      :verticalLabel="verticalLabel"
    ></InputForm>
    <InputForm
      name="repeatPassword"
      v-model="passwordRepeat"
      :valFunc="pwVal"
      :invalidFeedback="feedbackRepeat"
      :validFeedback="feedback"
      inType="password"
      :verticalLabel="verticalLabel"
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
    },
    verticalLabel: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      passwordRepeat: ""
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

      let valid = this.passwordRepeat == this.password && data != "" && secure
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
    },
    feedbackRepeat(data) {
      if (this.passwordRepeat && this.password && this.passwordRepeat !== this.password) {
        return this.$t('backend.formValidation.passwordMatch')
      }
      return this.feedback(data)
    }
  },
  components: {
    InputForm
  }
}
</script>