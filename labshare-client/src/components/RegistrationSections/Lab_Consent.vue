<i18n>
{
  "en": {
    "optIn": "Optional Consents",
    "dataProcessingInformation": "<p>By finishing the registration your data will be processed by LabHive. Your specified contact information is only visible for registered and internally verified research and diagnostic centers.</p><p>Registered volunteers have no possibility to respond to requests from diagnostic centers to prevent an increased E-mail flow. As a diagnostic center you can however find volunteers through the search function, view their contact data and contact them.</p><p>Further information can be found in our <a href=\"/#/privacyPolicy\">privacy policy</a>.</p>"
  },
  "de": {
    "optIn": "Optionale Einwilligungen",
    "dataProcessingInformation": "<p>Durch das Abschließen der Registrierung werden Ihre Daten von LabHive verarbeitet. Ihre angegebenen Kontaktinformationen sind nur für registrierte und von uns verifizierte Forschungs- und Diagnostikzentren sichtbar.</p><p>Registrierte Helfer:innen haben keine Möglichkeit auf Suchanfragen von Seiten der Diagnostikzentren zu reagieren, um ein erhöhtes E-Mail Aufkommen für diese zu vermeiden. Als Diagnostikzentrum können Sie Helfer:innen über die Suchfunktion finden, deren Kontaktdaten sehen und diese kontaktieren.</p><p>Weitere Informationen finden Sie in unserer <a href=\"/#/privacyPolicy\">Datenschutzerklärung</a>.</p>"
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

    <b-row style="margin-top: 30px" v-if="!profileUpdate">
      <b-col sm="*" :md="5*2" :lg="4*2">
        <div v-html="$t('dataProcessingInformation')"></div>
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
