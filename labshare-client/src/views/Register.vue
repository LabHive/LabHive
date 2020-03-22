<template>
  <div class="register">
      <template v-if="!loadedForm">
        <Button label="Helfer" @click="loadedForm = forms.HELPER" />
        <Button label="Labor" @click="loadedForm = forms.LAB" />
      </template>
      <LabshareForm v-if="loadedForm === forms.HELPER" :formDefinition="formHelper" @formcomplete="register"/>
      <LabshareForm v-if="loadedForm === forms.LAB" :formDefinition="formLab" @formcomplete="register"/>
  </div>
</template>

<script>
import LabshareForm from '../components/LabshareForm'
import Button from 'primevue/button'

export default {
  name: "Register",
  props: {},
  data: function() {
    return {
      forms: {
        ROLE: 0,
        HELPER: 1,
        LAB: 2
      },
      loadedForm: 0,
      formLab: [
        {
          title: "Account",
          formElements: [
            { type: "text", name: "email", label: "Email", value: "", submit: true },
            { type: "password", name: "password", label: "Password", value: "", submit: true },
          ]
        },
        {
          title: "Persönliche Daten",
          formElements: [
            { type: "text", name: "firstname", label: "Vorname", value: "", submit: true },
            { type: "text", name: "lastname", label: "Nachname", value: "", submit: true },
            { type: "desc", title: "Erreichbarkeit", description:"Damit Labore die schnell und einfach kontaktieren können gib bitte deine Telefonnummer an. Natürlich nur wenn du möchtest." , submit: false },
            { type: "text", name: "phone", label: "Telefon", value: "", submit: true },
          ]
        },
        {
          title: "Deine Fähigkeiten",
          formElements: [
            { type: "desc", title: "Wir benötigen deine Fähigkeiten", description:"damit wir dir passende Labore anzeigen können und diese dich finden können" , submit: false },
            { type: "checkbox", name: "knowledge", options: ["RNA-Extraktion","RT-PCR"], value: [], submit: true }
          ]
        },
      ],
      formHelper: [
        {
          title: "Account",
          formElements: [
            { type: "text", name: "email", label: "Email", value: "", submit: true },
            { type: "password", name: "password", label: "Password", value: "", submit: true },
          ]
        },
        {
          title: "Persönliche Daten",
          formElements: [
            { type: "text", name: "firstname", label: "Vorname", value: "", submit: true },
            { type: "text", name: "lastname", label: "Nachname", value: "", submit: true },
            { type: "desc", title: "Erreichbarkeit", description:"Damit Labore die schnell und einfach kontaktieren können gib bitte deine Telefonnummer an. Natürlich nur wenn du möchtest." , submit: false },
            { type: "text", name: "phone", label: "Telefon", value: "", submit: true },
          ]
        },
        {
          title: "Deine Fähigkeiten",
          formElements: [
            { type: "desc", title: "Wir benötigen deine Fähigkeiten", description:"damit wir dir passende Labore anzeigen können und diese dich finden können" , submit: false },
            { type: "checkbox", name: "knowledge", options: ["RNA-Extraktion","RT-PCR"], value: [], submit: true }
          ]
        },
      ],
    };
  },
  methods: {
      register: function (data) {
          console.log("data", data)
      }
  },
  components: {
      LabshareForm,
      Button
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
