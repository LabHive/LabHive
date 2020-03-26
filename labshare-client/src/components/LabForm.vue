<template>
  <div class="lab-form">
    <span class="p-float-label form-element-spacer">
      <InputText id="name" type="text" v-model="formData.name" />
      <label for="name">Labore/Institut</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="description" type="text" v-model="formData.description" />
      <label for="description">Description</label>
    </span>

    <h3>Address</h3>

    <span class="p-float-label form-element-spacer">
      <InputText id="city" type="text" v-model="formData.address.city" />
      <label for="city">City</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="zipcode" type="text" v-model="formData.address.zipcode" />
      <label for="zipcode">Zipcode</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="street" type="text" v-model="formData.address.street" />
      <label for="street">Street</label>
    </span>

    <h3>Contact details</h3>
    
    <span class="p-float-label form-element-spacer">
      <InputText id="firstName" type="text" v-model="formData.contact.firstname" />
      <label for="firstName">First name</label>
    </span>

    <span class="p-float-label form-element-spacer">
      <InputText id="lastName" type="text" v-model="formData.contact.lastname" />
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

    <div style="color: red" v-if="error.state">
      {{ error.description }}
    </div>
    <Button
      icon="pi pi-chevron-right"
      iconPos="right"
      label="Registrieren"
      @click="submit"
    />
  </div>
</template>

<script>
import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default {
  name: 'LabForm',
  data: function () {
      return {
        formData: {
          address: {
            city: "",
            zipcode: "",
            street: ""
          },
          contact: {
            firstname: "",
            lastname: "",
            email: "",
            phone: ""
          },
          name: "",
          description: "",
          password: ""
        }
      }
  },
  computed: {
    error() {
      return this.$store.state.error
    }
  },
  methods: {
      submit: function() {
        this.$emit('formcomplete', this.formData)
      },
  },
  components: {
    Button,
    InputText
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
