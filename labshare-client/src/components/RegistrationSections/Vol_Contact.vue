<i18n>
{
  "en":{
    "contact": "Contact & Availability",
    "contact_sub": "Please provide your contact details and availability. We share sensitive information such as last name, email address and phone number with verified diagnostic centers only.",
    "available": "Yes, I am currently available for helping out.",
    "not_available": "No, I am currently not available for helping out."
  },
  "de":{
    "contact": "Kontakt & Verfügbarkeit",
    "contact_sub": "Bitte geben Sie ihre Kontaktdaten und aktuelle Verfügbarkeit an. Wir teilen sensible Daten wie Nachname, E-Mail Adresse und Telefonnummer nur mit verifizierten Diagnostikzentren.",
    "available": "Ja, ich bin derzeit zum Aushelfen verfügbar.",
    "not_available": "Nein, ich bin derzeit nicht zum Aushelfen verfügbar."
  }
}
</i18n>
<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("contact") }}</h3>
    <p class="step-info-sub" style="max-width: 60%">{{ $t("contact_sub") }}</p>

    <b-row>
      <!-- FirstName -->
      <b-col sm="*" md="5" lg="4">
        <InputForm
          name="firstName"
          v-model="formData.contact.firstname"
          :valFunc="val.validFirstname"
        ></InputForm>
      </b-col>

      <!-- LastName -->
      <b-col sm="*" md="5" lg="4">
        <InputForm
          name="lastName" 
          v-model="formData.contact.lastname" 
          :valFunc="val.validLastname"
        ></InputForm>
      </b-col>
    </b-row>

    <b-row>
      <!-- Zipcode -->
      <b-col sm="*" md="5" lg="4">
        <InputForm 
          name="zipcode" 
          v-model="formData.address.zipcode" 
          :valFunc="val.validZipcode"
        ></InputForm>
      </b-col>

      <!-- Phone -->
      <b-col sm="*" md="5" lg="4">
        <InputForm 
          name="phone" 
          v-model="formData.contact.phone" 
          :valFunc="val.validPhone" 
          :required="false"
        ></InputForm>
      </b-col>
    </b-row>

    <!-- LabName -->
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

    <!-- Website -->
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

    <b-row style="margin-top: 16px">

      <!-- Availability -->
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
