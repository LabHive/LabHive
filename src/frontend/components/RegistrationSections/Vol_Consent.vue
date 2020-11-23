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

    <b-row class="consent-section">
      <b-col sm="*" :md="5*2" :lg="4*2" style="padding: 0">
        <b-form-checkbox 
          v-model="formData.consent.publicSearch"
          name="searchCheckbox"
          :value="true"
          :unchecked-value="false"
          ><div style="max-width: 600px" v-html="$t('registration.steps.consent.search')"></div></b-form-checkbox>
      </b-col>
    </b-row>

    <template v-if="!profileUpdate">
      <b-row style="margin-bottom: -50px; margin-top: 30px;">
        <b-col sm="*" :md="5*2" :lg="4*2">
          <p style="font-size: 12px; color: rgba(0, 0, 0, 0.75);">
            {{ $t("registration.steps.consent.volunteerDisclaimer") }}
          </p>
        </b-col>
      </b-row>
      <NavButtons :disableSubmit="disableSubmit" :final="true"></NavButtons>
    </template>
  </div>
</template>

<script>
import registrationSection from "@/mixins/registrationSection";
import { labSkills, qualification } from "@lib/selectLists";

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