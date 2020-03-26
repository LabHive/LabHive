<template>
  <div class="register">
    <h1>Registrieren</h1>
      <template v-if="registrationComplete">
        <h2>Danke für deine Registrierung!</h2>
      </template>
      <template v-else-if="!loadedForm">
        <div class="row">
          <div class="col-12">
            <p class="lead text-center">Wie möchtest du uns unterstützen?</p>
          </div>
          <div class="col-6">
            <Button label="Helfer" @click="loadedForm = forms.HELPER" />
          </div>
          <div class="col-6">
            <Button label="Labor" @click="loadedForm = forms.LAB" />
          </div>
        </div>
      </template>
      <div v-else>
        <HelperForm v-if="loadedForm === forms.HELPER" @formcomplete="register"/>
        <LabForm v-if="loadedForm === forms.LAB" @formcomplete="register"/>
      </div>
  </div>
</template>

<script>
import LabForm from '../components/LabForm'
import HelperForm from '../components/HelperForm'
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
      registrationComplete: false
    };
  },
  methods: {
      register: function (data) {
        console.log(data)
      
        let role = this.loadedForm == this.forms.HELPER ? 'human': 'lab'

        this.$http.post('registration', data, {params: {role: role}})
        .then(resp => {
          let data = resp.body
          if (data.success) {
            this.registrationComplete = true
            this.$store.commit('clearError')
          }
        }, err => {
          this.$store.commit('setError', err.body.errorDescription)
        })
      }
  },
  components: {
      LabForm,
      HelperForm,
      Button
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.p-button {
  width: 100%;
  min-height: 100px;
}
.register {
  padding-top: 50px;
}
</style>
