<i18n>
{
  "en": {
    "volunteerSkills": "Skills",
    "furtherInfo": "Further Information",
    "volunteerSkills_sub": "Please specify your skills, you can change them later in your profile.",
    "description": "Further information, other skills, availability, etc."
  },
  "de": {
    "volunteerSkills": "Fähigkeiten",
    "furtherInfo": "Weitere Informationen",
    "volunteerSkills_sub": "Bitte geben Sie ihre Fähigkeiten an. Diese können später jederzeit im Profil geändert werden.",
    "description": "Weitere Informationen, andere Fähigkeiten, Verfügbarkeit, etc."
  }
}
</i18n>
<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("volunteerSkills") }}</h3>
    <p class="step-info-sub" v-else>{{ $t("volunteerSkills_sub") }}</p>
    <CheckboxGroup 
      name="skills"
      :data="labSkills" 
      v-model="formData.details.skills"
      :label="profileUpdate ? $t('volunteerSkills_sub') : null"
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
            :placeholder="$t('description')"
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
import { labSkills, qualification } from "@/../dist-browser/lib/selectLists";
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
