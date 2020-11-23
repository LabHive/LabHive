<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("registration.steps.skills.title") }}</h3>
    <p class="step-info-sub" v-else>{{ $t("registration.steps.skills.subTitle") }}</p>
    <CheckboxGroup 
      name="skills"
      :data="labSkills" 
      v-model="formData.details.skills"
      :label="profileUpdate ? $t('registration.steps.skills.subTitle_update') : null"
      cols="3"
    ></CheckboxGroup>

    <b-row>
      <b-col lg="8" xl="7" md="10" sm="*">
        <b-form-group
          id="description"
          :state="val.validDescription(formData.description).valid"
          :invalid-feedback="$t('backend.formValidation.' + val.validDescription(formData.description).err.message)"
        >
          <b-form-textarea
            id="textarea"
            v-model="formData.description"
            :placeholder="$t('registration.steps.skills.description')"
            rows="4"
            max-rows="10"
            :state="!val.validDescription(formData.description).valid ? false: null"
          ></b-form-textarea>
        </b-form-group>
      </b-col>

    </b-row>
    

    <template v-if="!profileUpdate">
      <NavButtons :disableSubmit="disableSubmit"></NavButtons>
    </template>
  </div>
</template>

<script>
import registrationSection from "@/mixins/registrationSection";
import { labSkills, qualification } from "@lib/selectLists";
import CheckboxGroup from "@/components/CheckboxGroup";

export default {
  mixins: [registrationSection],
  data() {
    return {
      labSkills,
      qualification
    };
  },
  components: {
    CheckboxGroup
  }
};
</script>
