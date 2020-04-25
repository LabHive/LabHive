<i18n>
{
  "en":{
    "contact": "Contact & Availability",
    "contact_sub": "Bitte geben Sie ihre Kontaktdaten und Verfügbarkeit an. Wir teilen sensible Daten wie Nachname, E-Mail Adresse und Telefonnummer nur mit verifizierten Diagnostikzentren.",
    "available": "Yes, I am available to help.",
    "not_available": "No, I am currently not available."
  },
  "de":{
    "contact": "Kontakt & Verfügbarkeit",
    "contact_sub": "Bitte geben Sie ihre Kontaktdaten und Verfügbarkeit an. Wir teilen sensible Daten wie Nachname, E-Mail Adresse und Telefonnummer nur mit verifizierten Diagnostikzentren.",
    "available": "Ja, ich bin derzeit zum Aushelfen verfügbar.",
    "not_available": "Nein, ich bin derzeit nicht zum Aushelfen verfügbar."
  }
}
</i18n>
<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("contact") }}</h3>
    <p style="max-width: 75%">{{ $t("contact_sub") }}</p>

    <b-row>
      <b-col sm="*" md="5" lg="4">
        <InputForm
          name="firstName"
          v-model="formData.contact.firstname"
          :valFunc="val.validFirstname"
        ></InputForm>
      </b-col>
      <b-col sm="*" md="5" lg="4">
        <InputForm
          name="lastName" 
          v-model="formData.contact.lastname" 
          :valFunc="val.validLastname"
        ></InputForm>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="*" md="5" lg="4">
        <InputForm 
          name="zipcode" 
          v-model="formData.address.zipcode" 
          :valFunc="val.validZipcode"
        ></InputForm>
      </b-col>
      <b-col sm="*" md="5" lg="4">
        <InputForm 
          name="phone" 
          v-model="formData.contact.phone" 
          :valFunc="val.validPhone" 
          :required="false"
        ></InputForm>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="*" :md="5*2" :lg="4*2">
        <InputForm
          name="instituteName"
          v-model="formData.organization"
          :valFunc="val.validOrganization"
          :required="false"
        ></InputForm>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="*" :md="5*2" :lg="4*2">
        <InputForm
          name="instituteWebsite"
          v-model="formData.website"
          :valFunc="val.validUrl"
          :required="false"
        ></InputForm>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="*" :md="5*2" :lg="4*2">
        <b-form-group
          :state="formData.availability !== null"
          :invalid-feedback="$t('required')"
          :valid-feedback="'OK'"
        >
          <b-form-radio
            @change="$root.$emit('inputForm_changed')"
            v-model="formData.availability"
            name="availability"
            :value="true"
          >{{ $t('available') }}</b-form-radio>
          <b-form-radio
            @change="$root.$emit('inputForm_changed')"
            v-model="formData.availability"
            name="availability"
            :value="false"
          >{{ $t('not_available') }}</b-form-radio>
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

export default {
  mixins: [registrationSection]
};
</script>

<style lang="scss" scoped>
p {
  max-width: 75%;

  @media(max-width: 576px) {
    max-width: 100% !important;
  }
}
</style>
