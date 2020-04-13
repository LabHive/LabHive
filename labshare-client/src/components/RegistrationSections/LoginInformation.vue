<i18n>
    {
    "en":{
    "loginInfo": "Login Information"
    },
    "de":{
    "loginInfo": "Login Information"
    }
    }
</i18n>
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
      <Password v-model="formData.password"></Password>
    </template>

    <template v-if="!profileUpdate">
      <NavButtons :disableSubmit="disableSubmit" :hideBack="true"></NavButtons>
    </template>
  </div>
</template>

<script>
import registrationSection from "@/mixins/registrationSection";
import Password from "@/components/PasswordFields";

export default {
  mixins: [registrationSection],
  components: {
    Password
  }
};
</script>
