<i18n>
{
  "en": {
    "optIn": "Optional Consents",
    "disclaimer": "Whether you are allowed to work as a volunteer in a diagnostic centre or whether you are released from work, you must clarify this with your employer on your own responsibility. If you are requested to work in a diagnostic centre, you, your employer and the diagnostic centre concerned are responsible for labour law. LabHive does not take any responsibility for this."
  },
  "de": {
    "optIn": "Optionale Einwilligungen",
    "disclaimer": "Ob Sie als Freiwillige:r in Diagnostikzentren arbeiten dürfen, bzw. freigestellt werden, müssen Sie eigenverantwortlich mit Ihrem Arbeitgeber klären. Wenn Sie von einem Diagnostikzentrum angefragt werden, obliegt die Arbeitsrechtliche Regelung Ihnen, Ihrem Arbeitgeber und dem betreffenden Diagnostikzentrum. LabHive übernimmt hier keine Verantwortung."
  }
}
</i18n>
<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("optIn") }}</h3>

    <b-row class="consent-section">
      <b-col sm="*" :md="5*2" :lg="4*2" style="padding: 0">
        <b-form-checkbox 
          v-model="formData.consent.mailUpdates"
          name="mailCheckbox"
          :value="true"
          :unchecked-value="false"
          ><div style="max-width: 600px" v-html="$t('consentMail')"></div></b-form-checkbox>
      </b-col>
    </b-row>

    <b-row class="consent-section">
      <b-col sm="*" :md="5*2" :lg="4*2" style="padding: 0">
        <b-form-checkbox 
          v-model="formData.consent.publicSearch"
          name="searchCheckbox"
          :value="true"
          :unchecked-value="false"
          ><div style="max-width: 600px" v-html="$t('consentPublicSearch')"></div></b-form-checkbox>
      </b-col>
    </b-row>

    <template v-if="!profileUpdate">
      <b-row style="margin-bottom: -50px; margin-top: 30px;">
        <b-col sm="*" :md="5*2" :lg="4*2">
          <p style="font-size: 12px; color: rgba(0, 0, 0, 0.75);">
            {{ $t("disclaimer") }}
          </p>
        </b-col>
      </b-row>
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