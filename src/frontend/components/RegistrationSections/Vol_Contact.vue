<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("registration.steps.contact.title_volunteer") }}</h3>
    <p class="step-info-sub" style="max-width: 60%">{{ $t("registration.steps.contact.subTitle_volunteer") }}</p>

    <b-row>
      <!-- FirstName -->
      <b-col sm="*" md="5" lg="4">
        <InputForm
          name="registration.steps.contact.textfieldPlaceholders.firstName"
          v-model="formData.contact.firstname"
          :valFunc="val.validFirstname"
        ></InputForm>
      </b-col>

      <!-- LastName -->
      <b-col sm="*" md="5" lg="4">
        <InputForm
          name="registration.steps.contact.textfieldPlaceholders.lastName" 
          v-model="formData.contact.lastname" 
          :valFunc="val.validLastname"
        ></InputForm>
      </b-col>
    </b-row>

    <b-row>
      <!-- Zipcode -->
      <b-col sm="*" md="5" lg="4" order="1" order-md="1">
        <InputForm 
          name="registration.steps.contact.textfieldPlaceholders.zipcode" 
          v-model="formData.address.zipcode" 
          :valFunc="val.validZipcode"
        ></InputForm>
      </b-col>

      <!-- Phone -->
      <b-col sm="*" md="5" lg="4" order="3" order-md="2">
        <InputForm 
          name="registration.steps.contact.textfieldPlaceholders.phone" 
          v-model="formData.contact.phone" 
          :valFunc="val.validPhone" 
          :required="false"
        ></InputForm>
      </b-col>

      <div class="w-100 order-md-3"></div>

      <!-- City -->
      <b-col sm="*" md="5" lg="4" offset="0" order="2" order-md="4">
        <InputForm 
          name="registration.steps.contact.textfieldPlaceholders.city" 
          v-model="formData.address.city" 
          :valFunc="val.validCity" 
          :required="true"
        ></InputForm>
      </b-col>
    </b-row>

    <!-- LabName -->
    <b-row>
      <b-col sm="*" :md="5*2" :lg="4*2">
        <InputForm
          name="registration.steps.contact.textfieldPlaceholders.instituteName"
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
          name="registration.steps.contact.textfieldPlaceholders.instituteWebsite"
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
          :invalid-feedback="$t('general.required')"
          :valid-feedback="'OK'"
        >
          <b-form-radio
            @change="$root.$emit('inputForm_changed')"
            v-model="formData.availability"
            name="availability"
            :value="true"
          >{{ $t('registration.steps.contact.available') }}</b-form-radio>
          <b-form-radio
            @change="$root.$emit('inputForm_changed')"
            v-model="formData.availability"
            name="availability"
            :value="false"
          >{{ $t('registration.steps.contact.not_available') }}</b-form-radio>
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
