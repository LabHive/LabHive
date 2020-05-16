<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("registration.steps.contact.title") }}</h3>
    <p v-else class="step-info-sub" style="max-width: 60%" v-html="$t('registration.steps.contact.subTitle')"></p>

    <b-row>

      <!-- Header Affiliation -->
      <b-col v-bind="large" order-md="1" order="1">
        <h4>{{ $t("registration.steps.contact.affiliation") }}</h4>
      </b-col>

      <!-- Header Contact Person -->
      <b-col v-bind="large" order-md="2" order="7" class="second-header">
        <h4>{{ $t("registration.steps.contact.contactPerson") }}</h4>
      </b-col>


      <!-- ROW-END -->
      <div class="w-100 order-md-3"></div>


      <!-- LabName -->
      <b-col v-bind="large" order-md="4" order="2">
        <InputForm
          :name="role == 'lab_diag' ? 'registration.steps.contact.textfieldPlaceholders.labName' : 'registration.steps.contact.textfieldPlaceholders.instituteName'"
          v-model="formData.organization"
          :valFunc="val.validOrganization"
        ></InputForm>
      </b-col>

      <!-- FirstName -->
      <b-col v-bind="small" order-md="5" order="8">
        <InputForm
          name="registration.steps.contact.textfieldPlaceholders.firstName"
          v-model="formData.contact.firstname"
          :valFunc="val.validFirstname"
        ></InputForm>
      </b-col>

      <!-- LastName -->
      <b-col v-bind="small" order-md="6" order="9">
        <InputForm
          name="registration.steps.contact.textfieldPlaceholders.lastName" 
          v-model="formData.contact.lastname" 
          :valFunc="val.validLastname"
        ></InputForm>
      </b-col>


      <!-- ROW-END -->
      <div class="w-100 order-md-7"></div>


      <!-- Website -->
      <b-col v-bind="large" order-md="8" order="3">
        <InputForm
          :name="role == 'lab_diag' ? 'registration.steps.contact.textfieldPlaceholders.labWebsite' : 'registration.steps.contact.textfieldPlaceholders.instituteWebsite'"
          v-model="formData.website"
          :valFunc="val.validUrl"
          :required="false"
        ></InputForm>
      </b-col>

      <!-- Phone -->
      <b-col v-bind="large" order-md="9" order="10">
        <InputForm 
          name="registration.steps.contact.textfieldPlaceholders.phone" 
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
          name="registration.steps.contact.textfieldPlaceholders.zipcode" 
          v-model="formData.address.zipcode" 
          :valFunc="val.validZipcode"
        ></InputForm>
      </b-col>

      <div class="w-100 order-md-12"></div>

      <!-- City -->
      <b-col v-bind="large" order-md="13" order="5">
        <InputForm 
          name="registration.steps.contact.textfieldPlaceholders.city" 
          v-model="formData.address.city" 
          :valFunc="val.validCity"
        ></InputForm>
      </b-col>

      <div class="w-100 order-md-14"></div>

      <!-- Street -->
      <b-col v-bind="large" order-md="15" order="6">
        <InputForm 
          name="registration.steps.contact.textfieldPlaceholders.street" 
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
