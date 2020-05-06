<i18n>
{
  "en":{
    "contact": "Affiliation & Contact",
    "contact_sub": "Please enter your contact details. <strong>We need this data to be able to verify you.</strong> We only share personal data such as name, e-mail address and telephone number with other verified diagnostic centres and research laboratories.",
    "affiliation": "Your Affiliation",
    "contactPerson": "Contact Person"
  },
  "de":{
    "contact": "Affiliation & Kontaktperson",
    "contact_sub": "Bitte geben Sie Ihre Kontaktdaten an. <strong>Diese Daten benötigen wir, um Sie verifizieren zu können.</strong> Wir teilen personenbezogene Daten wie Name, E-Mail-Adresse und Telefonnummer nur mit anderen verifizierten Diagnostikzentren und Forschungslaboren.",
    "affiliation": "Ihre Affiliation",
    "contactPerson": "Kontaktperson"
  }
}
</i18n>
<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("contact") }}</h3>
    <p class="step-info-sub" style="max-width: 60%" v-html="$t('contact_sub')"></p>

    <b-row>

      <!-- Header Affiliation -->
      <b-col v-bind="large" order-md="1" order="1">
        <h4>{{ $t("affiliation") }}</h4>
      </b-col>

      <!-- Header Contact Person -->
      <b-col v-bind="large" order-md="2" order="7" class="second-header">
        <h4>{{ $t("contactPerson") }}</h4>
      </b-col>


      <!-- ROW-END -->
      <div class="w-100 order-md-3"></div>


      <!-- LabName -->
      <b-col v-bind="large" order-md="4" order="2">
        <InputForm
          :name="role == 'lab_diag' ? 'labName' : 'instituteName'"
          v-model="formData.organization"
          :valFunc="val.validOrganization"
        ></InputForm>
      </b-col>

      <!-- FirstName -->
      <b-col v-bind="small" order-md="5" order="8">
        <InputForm
          name="firstName"
          v-model="formData.contact.firstname"
          :valFunc="val.validFirstname"
        ></InputForm>
      </b-col>

      <!-- LastName -->
      <b-col v-bind="small" order-md="6" order="9">
        <InputForm
          name="lastName" 
          v-model="formData.contact.lastname" 
          :valFunc="val.validLastname"
        ></InputForm>
      </b-col>


      <!-- ROW-END -->
      <div class="w-100 order-md-7"></div>


      <!-- Website -->
      <b-col v-bind="large" order-md="8" order="3">
        <InputForm
          :name="role == 'lab_diag' ? 'labWebsite' : 'instituteWebsite'"
          v-model="formData.website"
          :valFunc="val.validUrl"
          :required="false"
        ></InputForm>
      </b-col>

      <!-- Phone -->
      <b-col v-bind="large" order-md="9" order="10">
        <InputForm 
          name="phone" 
          v-model="formData.contact.phone" 
          :valFunc="val.validPhone" 
          :required="false"
        ></InputForm>
      </b-col>


      <!-- ROW-END -->
      <div class="w-100 order-md-10"></div>


      <!-- Zipcode -->
      <b-col v-bind="large" order-md="11" order="4">
        <InputForm 
          name="zipcode" 
          v-model="formData.address.zipcode" 
          :valFunc="val.validZipcode"
        ></InputForm>
      </b-col>

      <div class="w-100 order-md-12"></div>

      <!-- City -->
      <b-col v-bind="large" order-md="13" order="5">
        <InputForm 
          name="city" 
          v-model="formData.address.city" 
          :valFunc="val.validCity"
        ></InputForm>
      </b-col>

      <div class="w-100 order-md-14"></div>

      <!-- Street -->
      <b-col v-bind="large" order-md="15" order="6">
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

@media (min-width: 768px) {
  .order-md-13 {
    -webkit-box-ordinal-group: 14;
    -ms-flex-order: 13;
    order: 13;
  }

  .order-md-14 {
    -webkit-box-ordinal-group: 15;
    -ms-flex-order: 14;
    order: 14;
  }

  .order-md-15 {
    -webkit-box-ordinal-group: 16;
    -ms-flex-order: 15;
    order: 15;
  }

  .order-md-16 {
    -webkit-box-ordinal-group: 17;
    -ms-flex-order: 16;
    order: 16;
  }
}

</style>
