<i18n>
{
  "en": {
    "contactInfo": "Contact Information",
    "address": "Address"
  },
  "de": {
    "contactInfo": "Kontakt Informationen",
    "address": "Adresse"
  }
}
</i18n>
<template>
  <div>
    <h3 class="section">{{ $t("contactInfo") }}</h3>
    <InputForm
      :name="role === 'lab_diag' ? 'labName': 'instituteName'"
      v-model="formData.organization"
      :valFunc="val.validOrganization"
    ></InputForm>

    <InputForm
      :name="role === 'lab_diag' ? 'labWebsite': 'instituteWebsite'"
      v-model="formData.website"
      :valFunc="val.validUrl"
      :required="role === 'volunteer' ? false : true"
    ></InputForm>

    <InputForm name="firstName" v-model="formData.contact.firstname" :valFunc="val.validFirstname"></InputForm>

    <InputForm name="lastName" v-model="formData.contact.lastname" :valFunc="val.validLastname"></InputForm>

    <InputForm name="phone" v-model="formData.contact.phone" :valFunc="val.validPhone" :required="false"></InputForm>

    <h3 class="section">{{ $t("address") }}</h3>
    <InputForm name="city" v-model="formData.address.city" :valFunc="val.validCity"></InputForm>

    <InputForm name="zipcode" v-model="formData.address.zipcode" :valFunc="val.validZipcode"></InputForm>

    <InputForm v-if="role !== 'volunteer'" name="street" v-model="formData.address.street" :valFunc="val.validStreet"></InputForm>

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