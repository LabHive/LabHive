<i18n>
{
  "en": {
    "registration": "Registration",
    "complete": "Thank you for registering!"
  },
  "de": { 
    "registration": "Registrierung",
    "complete": "Danke für deine Registrierung!",
    "prospectiveRole": "Als was möchtest du dich registrieren?",
    "roleHelper": "Helfer",
    "roleLab": "Labor"
    }
}
</i18n>
<template>
  <div class="register">
    <h1>{{$t("registration")}}</h1>
    <template v-if="registrationComplete">
      <h2>{{$t("complete")}}</h2>
    </template>
    <template v-else-if="!loadedForm">
      <b-row>
        <b-col cols="12">
          <p class="lead text-center">{{$t("prospectiveRole")}}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col cols="auto">
          <b-button
            size="lg"
            variant="primary"
            @click="loadedForm = forms.HELPER"
          >{{$t("roleHelper")}}</b-button>
        </b-col>
        <b-col cols="auto">
          <b-button size="lg" variant="primary" @click="loadedForm = forms.LAB">{{$t("roleLab")}}</b-button>
        </b-col>
        <b-col></b-col>
      </b-row>
    </template>
    <div v-else>
      <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
      <HelperForm v-if="loadedForm === forms.HELPER" @formcomplete="register" />
      <LabForm v-if="loadedForm === forms.LAB" @formcomplete="register" />
    </div>
  </div>
</template>

<script>
import LabForm from "../components/LabForm";
import HelperForm from "../components/HelperForm";

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
      error: null,
      loadedForm: 0,
      registrationComplete: false
    };
  },
  methods: {
    register: function(data) {
      console.log(data);

      let role = this.loadedForm == this.forms.HELPER ? "human" : "lab";

      this.$http.post("registration", data, { params: { role: role } }).then(
        resp => {
          let data = resp.body;
          if (data.success) {
            this.registrationComplete = true;
            this.error = null
          }
        },
        err => {
          this.error = err.body.errorDescription;
        }
      );
    }
  },
  components: {
    LabForm,
    HelperForm
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
  padding-top: 20px;
}
</style>
