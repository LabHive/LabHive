<i18n>
{
  "en":{
    "contact": "Affiliation & Contact",
    "contact_sub": "Please provide your contact details. We share contact information such as last name, email address and phone number with verified diagnostic centers and research laboratories only.",
    "affiliation": "Your Affiliation",
    "contactPerson": "Contact Person"
  },
  "de":{
    "contact": "Affiliation & Kontaktperson",
    "contact_sub": "Bitte geben Sie ihre Kontaktdaten an. Wir teilen personenbezogene Daten wie Name, E-Mail Adresse und Telefonnummer nur mit verifizierten Diagnostikzentren und Forschungslaboren",
    "affiliation": "Ihre Affiliation",
    "contactPerson": "Kontaktperson"
  }
}
</i18n>
<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("contact") }}</h3>
    <p class="step-info-sub" style="max-width: 60%">{{ $t("contact_sub") }}</p>

    <b-row cols="1">

      <!-- Header Affiliation -->
      <b-col v-bind="large" order-md="1" order="1">
        <h4>{{ $t("affiliation") }}</h4>
      </b-col>

      <!-- Header Contact Person -->
      <b-col v-bind="large" offset-xl="1" order-md="2" order="5" class="second-header">
        <h4>{{ $t("contactPerson") }}</h4>
      </b-col>


      <!-- ROW-END -->


      <!-- LabName -->
      <b-col v-bind="large" order-md="3" order="2">
        <InputForm
          name="labName"
          v-model="formData.organization"
          :valFunc="val.validOrganization"
        ></InputForm>
      </b-col>

      <!-- FirstName -->
      <b-col v-bind="small" offset-xl="1" order-md="4" order="6">
        <InputForm
          name="firstName"
          v-model="formData.contact.firstname"
          :valFunc="val.validFirstname"
        ></InputForm>
      </b-col>

      <!-- LastName -->
      <b-col v-bind="small" order-md="5" order="7">
        <InputForm
          name="lastName" 
          v-model="formData.contact.lastname" 
          :valFunc="val.validLastname"
        ></InputForm>
      </b-col>


      <!-- ROW-END -->


      <!-- Website -->
      <b-col v-bind="large" order-md="6" order="3" style="margin-bottom: 16px;">
        <InputForm
          name="instituteWebsite"
          v-model="formData.website"
          :valFunc="val.validUrl"
          :required="false"
        ></InputForm>
      </b-col>

      <!-- Phone -->
      <b-col v-bind="large" offset-xl="1" order-md="7" order="8" style="margin-bottom: 16px;">
        <InputForm 
          name="phone" 
          v-model="formData.contact.phone" 
          :valFunc="val.validPhone" 
          :required="false"
        ></InputForm>
      </b-col>


      <!-- ROW-END -->


      <!-- Zipcode -->
      <b-col v-bind="large" order-md="8" order="4">
        <InputForm 
          name="zipcode" 
          v-model="formData.address.zipcode" 
          :valFunc="val.validZipcode"
        ></InputForm>
      </b-col>

      <!-- Street -->
      <b-col v-bind="large" offset-xl="1" order-md="9" order="9">
        <InputForm 
          name="street" 
          v-model="formData.address.street" 
          :valFunc="val.validStreet"
        ></InputForm>
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
  mixins: [registrationSection],
  data() {
    return {
      large: {
        sm: "*",
        md: 6,
        xl: 4
      },
      small: {
        sm: "*",
        md: 3,
        xl: 2
      }
    }
  },
};
</script>

<style lang="scss" scoped>

@media(max-width: 768px) {
  .second-header {
    margin-top: 30px
  } 
}

</style>
