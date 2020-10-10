<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("registration.steps.consent.title") }}</h3>

    <b-row class="consent-section">
      <b-col sm="*" :md="5*2" :lg="4*2" style="padding: 0">
        <b-form-checkbox 
          v-model="formData.consent.mailUpdates"
          name="mailCheckbox"
          :value="true"
          :unchecked-value="false"
          ><div style="max-width: 600px" v-html="$t('registration.steps.consent.mail')"></div></b-form-checkbox>
      </b-col>
    </b-row>

    <b-row style="margin-top: 30px" v-if="!profileUpdate">
      <b-col sm="*" :md="5*2" :lg="4*2">
        <div v-html="$t('registration.steps.consent.dataProcessingInformation')"></div>
      </b-col>
    </b-row>


    <template v-if="!profileUpdate">
      <NavButtons :disableSubmit="disableSubmit" :final="true"></NavButtons>
    </template>
  </div>
</template>

<script>
import registrationSection from "@/mixins/registrationSection";
import { labSkills, qualification } from "@/../dist-browser/lib/selectLists";

export default {
  mixins: [registrationSection],
  data() {
    return {
      labSkills,
      qualification
    };
  },
};
</script>
