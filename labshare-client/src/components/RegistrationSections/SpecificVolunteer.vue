<i18n>
{
  "en": {
    "ready": "I am ready to volunteer! (Can be changed at any point in the profile settings)",
    "qualification": "Training and Degrees",
    "qualification_sub": "Please select all that apply.",
    "volunteerSkills": "Skills",
    "furtherInfo": "Further Information",
    "optIn": "Optional Consents",
    "availability": "Availability"
  },
  "de": {
    "ready": "Ich bin zum Aushelfen verfügbar! (Kann jederzeit in den Profileinstellungen geändert werden)",
    "qualification": "Ausbildung und Abschlüsse",
    "qualification_sub": "Bitte wählen Sie alle Zutreffenden aus.",
    "volunteerSkills": "Fähigkeiten",
    "furtherInfo": "Weitere Informationen",
    "optIn": "Optionale Einwilligungen",
    "availability": "Verfügbarkeit"
  }
}
</i18n>
<template>
  <div>
    <h3 class="section">{{ $t("qualification") }}</h3>
    <CheckboxGroup
      required
      name="qualification"
      :data="qualification"
      v-model="formData.details.qualifications"
      :label="$t('qualification_sub')"
    ></CheckboxGroup>

    <h3 class="section">{{ $t("volunteerSkills") }}</h3>
    <CheckboxGroup name="skills" :data="labSkills" v-model="formData.details.skills"></CheckboxGroup>

    <h3 class="section">{{$t("optIn")}}</h3>
    <p v-html="$t('consentPublicSearch')"></p>
    <b-form-group
      :state="formData.consent.publicSearch !== null"
      :invalid-feedback="$t('required')"
      :valid-feedback="'OK'"
    >
      <b-form-radio
        @change="$root.$emit('inputForm_changed')"
        v-model="formData.consent.publicSearch"
        name="publicSearch"
        :value="true"
      >{{ $t('agree') }}</b-form-radio>
      <b-form-radio
        @change="$root.$emit('inputForm_changed')"
        v-model="formData.consent.publicSearch"
        name="publicSearch"
        :value="false"
      >{{ $t('not_agree') }}</b-form-radio>
    </b-form-group>

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

    <h3 class="section">{{ $t("availability") }}</h3>
    <b-form-group>
      <b-form-checkbox
        id="readyToHelp"
        v-model="formData.availability"
        name="readyToHelp"
      >{{ $t("ready") }}</b-form-checkbox>
    </b-form-group>

    <h3 class="section">{{$t("furtherInfo")}}</h3>
    <b-form-group
      id="description"
      :state="val.validDescription(formData.description).valid"
      :invalid-feedback="$t('backend.formValidation.' + val.validDescription(formData.description).err.message)"
    >
      <b-form-textarea
        id="textarea"
        v-model="formData.description"
        placeholder="Weitere Informationen..."
        rows="4"
        max-rows="10"
        :state="!val.validDescription(formData.description).valid ? false: null"
      ></b-form-textarea>
    </b-form-group>

    <p v-html="$t('disclaimerRegistration')"></p>

    <template v-if="!profileUpdate">
      <NavButtons :disableSubmit="disableSubmit" :final="true"></NavButtons>
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
