<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("registration.steps.qualification.title") }}</h3>
    <p class="step-info-sub" v-else>{{ $t("registration.steps.qualification.subTitle") }}</p>

    <CheckboxGroup
      required
      name="qualifications"
      :data="qualification"
      v-model="formData.details.qualifications"
      :label="profileUpdate ? $t('registration.steps.qualification.subTitle'): null"
    ></CheckboxGroup>


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
