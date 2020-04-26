<i18n>
{
  "en": {
    "optIn": "Optional Consents",
    "dataProcessingInformation": "By finishing the registration your data will be processed by LabHive. Your specified contact information is only visible for registered and internally verified research and diagnostic laboratories. Currently, registered volunteers have no possibility to respond to requests from diagnostic laboratories to prevent an increased E-mail flow. We are working on a solution that solves this problem for both sides. As a diagnostic laboratory you can however find volunteers through the search function, view their contact data and contact them.<br/>Further information can be found in our <a href=\"/#/privacyPolicy\">privacy policy</a>."
  },
  "de": {
    "optIn": "Optionale Einwilligungen",
    "dataProcessingInformation": "<p>Durch das Abschließen der Registrierung werden Ihre Daten von LabHive verarbeitet. Ihre angegebenen Kontaktinformationen sind nur für registrierte und von uns verifizierte Forschungs- und Diagnostiklabore sichtbar. Registrierte Helfer*innen haben momentan noch keine Möglichkeit auf Suchanfragen von Seiten der Diagnostiklabore zu reagieren, um ein erhöhtes E-Mail Aufkommen für diese zu vermeiden. Wir arbeiten jedoch an einer Lösung für beide Seiten. Als Diagnostiklabor können Sie allerdings Helfer*innen über die Suchfunktion finden, deren Kontaktdaten sehen und diese kontaktieren.</p><p>Weitere Informationen finden Sie in unserer <a href=\"/#/privacyPolicy\">Datenschutzerklärung</a>.</p>"
  }
}
</i18n>
<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("optIn") }}</h3>
    <p class="step-info-sub"></p>

    <b-row>
      <b-col sm="*" :md="5*2" :lg="4*2">
        <p v-html="$t('consentMail')"></p>
        <b-form-group
          :state="formData.consent.mailUpdates !== null"
          :invalid-feedback="$t('required')"
          :valid-feedback="'OK'"
        >
          <b-form-radio
            @change="$root.$emit('inputForm_changed')"
            v-model="formData.consent.mailUpdates"
            name="mailUpdates"
            :value="true"
          >{{ $t('agree') }}</b-form-radio>
          <b-form-radio
            @change="$root.$emit('inputForm_changed')"
            v-model="formData.consent.mailUpdates"
            name="mailUpdates"
            :value="false"
          >{{ $t('not_agree') }}</b-form-radio>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row style="margin-top: 30px">
      <b-col sm="*" :md="5*2" :lg="4*2">
        <div v-html="$t('dataProcessingInformation')"></div>
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
