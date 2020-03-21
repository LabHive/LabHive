<template>
  <div class="register">
      <LabshareForm :formDefinition="form" @formcomplete="register"/>
  </div>
</template>

<script>
import LabshareForm from '../components/LabshareForm'

export default {
  name: "Register",
  props: {},
  data: function() {
    return {
      form: [
        {
          title: "Persönliche Daten",
          formElements: [
            { type: "text", name: "firstname", label: "Vorname", value: "", submit: true },
            { type: "desc", title: "Test Title", description: "Lorem ipsum", submit: false },
            { type: "text", name: "lastname", label: "Nachname", value: "", submit: true },
            { type: "select", name: "select box", options: ["1","2","3"], value: "", submit: true },
            { type: "checkbox", name: "knowledge", options: ["RNA", "DNA"], value: [], submit: true }
          ]
        }
      ]
    };
  },
  methods: {
      register: function (data) {
          console.log("data", data)
      }
  },
  components: {
      LabshareForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
