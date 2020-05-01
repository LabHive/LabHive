<i18n>
{
  "en": {
    "qualification": "Qualification",
    "qualification_sub": "Please state your qualification(s)."
  },
  "de": {
    "qualification": "Qualifikation",
    "qualification_sub": "Bitte geben Sie ihre Qualifikation(en) an."
  }
}
</i18n>
<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("qualification") }}</h3>
    <p class="step-info-sub" v-else>{{ $t("qualification_sub") }}</p>

    <CheckboxGroup
      required
      name="qualification"
      :data="qualification"
      v-model="formData.details.qualifications"
      :label="profileUpdate ? $t('qualification_sub'): null"
    ></CheckboxGroup>


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
