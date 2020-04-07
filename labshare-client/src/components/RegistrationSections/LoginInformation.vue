
<template>
  <div>
    <h3 class="section">{{ $t("loginInfo") }}</h3>
    <InputForm
      :name="role === 'volunteer' ? 'email' : 'officialEmail'"
      v-model="formData.contact.email"
      :valFunc="val.validEmail"
      inType="email"
    ></InputForm>

    <template v-if="!profileUpdate">
      <InputForm name="password" v-model="formData.password" :valFunc="pwVal" inType="password"></InputForm>
      <InputForm name="repeatPassword" v-model="passwordRepeat" :valFunc="pwVal" inType="password"></InputForm>
    </template>

    <template v-if="!profileUpdate">
      <NavButtons :disableSubmit="disableSubmit" :hideBack="true"></NavButtons>
    </template>
  </div>
</template>

<script>
import registrationSection from "@/mixins/registrationSection";

export default {
  mixins: [registrationSection],
  data() {
    return {
      passwordRepeat: "",
    };
  },
  methods: {
    pwVal(data) {
      return {
        valid: this.passwordRepeat == this.formData.password && data != "",
        err: {
          message: "passwordMatch"
        }
      };
    }
  },
};
</script>