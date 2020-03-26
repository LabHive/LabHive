<template>
  <div class="lab-form">
    <h3>Contact details</h3>
    
    <span class="p-float-label form-element-spacer">
      <InputText id="firstName" type="text" v-model="formData.contact.firstname" />
      <label for="firstName">First name</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="lastName" type="text" v-model="formData.contact.lastName" />
      <label for="lastName">Last name</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="phone" type="text" v-model="formData.contact.phone" />
      <label for="phone">Phone</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="email" type="text" v-model="formData.contact.email" />
      <label for="email">Email</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="password" type="password" v-model="formData.password" />
      <label for="password">Password</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="name" type="text" v-model="formData.name" />
      <label for="name">Labore/Institut</label>
    </span>    

    <h3>Location</h3>

    <span class="p-float-label form-element-spacer">
      <InputText id="city" type="text" v-model="formData.address.city" />
      <label for="city">City</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="zipcode" type="text" v-model="formData.address.zipcode" />
      <label for="zipcode">Zipcode</label>
    </span>

    <h3>Skills</h3>

    <div class="checkbox-group form-element-spacer">
      <template v-for="(option, key) in labSkills">
        <div class="checkbox" :key="key">
          <Checkbox
            :id="key"
            :inputId="key"
            :name="key"
            :value="key"
            v-model="formData.details.skils"
          />
          <label class="p-checkbox-label" :for="key">{{ option }}</label>
        </div>
      </template>
    </div>

    <span class="p-float-label form-element-spacer">
      <InputText id="description" type="text" v-model="formData.description" />
      <label for="description">Comments</label>
    </span>
  

    <Button
      icon="pi pi-chevron-right"
      iconPos="right"
      label="Registrieren"
      @click="submit"
    />
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";

export default {
  name: 'HelperForm',
  data: function() {
    return {
      formData: {
        address: {
          city: "",
          zipcode: ""
        },
        contact: {
          email: "",
          phone: "",
          firstname: "",
          lastname: "",
        },
        password: "",
        description: "",
        details: {
          skils: []
        },
        availability: true
      },
      labSkills: {
        sample_processing: "Vor/Aufbereitung klinischer Proben",
        rna: "RNA isolation (Mit Kit)",
        qpcr: "qPCR",
        bsl2: "Arbeit unter BSL2 Regulationen/Sicherheitsstandards",
        bsl3: "Arbeit unter BSL3 Regulationen/Sicherheitsstandards",
        sample_collection: "klinische Erfahrung (Probenkollektion)"
      }
    }
  },
  components: {
    InputText,
    Checkbox,
    Button
  },
  methods: {
    submit: function() {
      this.$emit('formcomplete', this.formData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
