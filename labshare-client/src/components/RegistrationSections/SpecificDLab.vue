<i18n>
    {
    "en":{
    "section": "Further Information",
    "furtherInfo": "Further Information"
    },
    "de":{
    "section": "Weitere Informationen",
    "furtherInfo": "Weitere Informationen"
    }
    }
</i18n>
<template>
  <div>

    <h3 class="section">{{$t("section")}}</h3>
    <b-form-group
      id="description"
      :state="val.validDescription(formData.description).valid"
      :invalid-feedback="$t('backend.formValidation.' + val.validDescription(formData.description).err.message)"
    >
      <b-form-textarea
        id="textarea"
        v-model="formData.description"
        :placeholder="$t('furtherInfo')"
        rows="4"
        max-rows="10"
        :state="!val.validDescription(formData.description).valid ? false: null"
      ></b-form-textarea>
    </b-form-group>

    <template v-if="!profileUpdate">
      <NavButtons :disableSubmit="disableSubmit" :final="true"></NavButtons>
    </template>
  </div>
</template>

<script>
import registrationSection from "@/mixins/registrationSection";

//import CheckboxGroup from "@/components/CheckboxGroup";

export default {
  mixins: [registrationSection],
  data() {
    return {

    };
  },
  components: {
  //  CheckboxGroup
  }
};
</script>
