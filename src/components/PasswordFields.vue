<template>
  <div>
    <InputForm
      name="general.password"
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
        return this.$t(`passwordStrength.${result.score}Password`)
      }
      else {
        return this.$t("general.required");
      }
    }
  },
  components: {
    InputForm
  }
}
</script>