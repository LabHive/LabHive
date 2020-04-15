<i18n>
    {
    "en":{
    "section": "Further Information",
    "furtherInfo": "Further Information",
    "optIn": "Optional Consent",
    "dataProcessingInformation": "By finishing the registration your data will be processed by LabHive. Your specified contact information is only visible for registered and internally verified research and diagnostic laboratories. Currently, registered volunteers have no possibility to respond to requests from diagnostic laboratories to prevent an increased E-mail flow. We are working on a solution that solves this problem for both sides. As a diagnostic laboratory you can however find volunteers through the search function, view their contact data and contact them.<br/>Further information can be found in our <a href=\"/#/privacyPolicy\">privacy policy</a>."
    },
    "de":{
    "section": "Weitere Informationen",
    "furtherInfo": "Weitere Informationen",
    "optIn": "Optionale Einwilligung",
    "dataProcessingInformation": "<p>Durch das Abschließen der Registrierung werden Ihre Daten von LabHive verarbeitet. Ihre angegebenen Kontaktinformationen sind nur für registrierte und von uns verifizierte Forschungs- und Diagnostiklabore sichtbar. Registrierte Helfer*innen haben momentan noch keine Möglichkeit auf Suchanfragen von Seiten der Diagnostiklabore zu reagieren, um ein erhöhtes E-Mail Aufkommen für diese zu vermeiden. Wir arbeiten jedoch an einer Lösung für beide Seiten. Als Diagnostiklabor können Sie allerdings Helfer*innen über die Suchfunktion finden, deren Kontaktdaten sehen und diese kontaktieren.<br/>Weitere Informationen finden Sie in unserer <a href=\"/#/privacyPolicy\">Datenschutzerklärung</a>.</p>"
    }
    }
</i18n>
<template>
  <div>

    <h3 class="section">{{$t("optIn")}}</h3>
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

    <div v-html="$t('dataProcessingInformation')"></div>


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
