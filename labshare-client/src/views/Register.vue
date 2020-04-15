<i18n>
    {
    "en": {
    "registration": "Registration",
    "complete": "Thank you for your registration!",
    "activation": "To activate your account, click the link in the email that we sent to you.",
    "prospectiveRole": "In which role would you like to register?",
    "roleHelper": "Volunteer",
    "roleDiagnosticLab": "Diagnostic Laboratory",
    "roleLab": "Research Laboratory"
    },

    "de": {
    "registration": "Registrierung",
    "complete": "Danke für deine Registrierung!",
    "activation": "Um Ihren Account zu aktivieren, klicken Sie bitte auf den Link in der E-Mail, die wir Ihnen geschickt haben.",
    "prospectiveRole": "Als was möchtest du dich registrieren?",
    "roleHelper": "Helfer",
    "roleDiagnosticLab": "Diagnostiklabor",
    "roleLab": "Forschungslabor"
    }
    }
</i18n>
<template>
  <div class="register">
    <h1>{{$t("registration")}}</h1>
    <b-progress variant="success" v-if="registrationForm && !registrationComplete" height="4px" :value="progress"></b-progress>

    <template v-if="registrationComplete">
      <h2>{{$t("complete")}}</h2>
      <p>{{$t("activation")}}</p>
    </template>

    <br />

    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

    <div key="step-one" v-if="!registrationForm">
      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <p class="lead text-center">{{$t("prospectiveRole")}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4">
            <b-button
              block
              size="lg"
              variant="primary"
              @click="registrationForm = forms.VOLUNTEER"
            >{{$t("roleHelper")}}</b-button>
          </b-col>
          <b-col cols="4">
            <b-button
              block
              size="lg"
              variant="primary"
              @click="registrationForm = forms.DIAGNOSTIC_LAB"
            >{{$t("roleDiagnosticLab")}}</b-button>
          </b-col>
          <b-col cols="4">
            <b-button
              block
              size="lg"
              variant="primary"
              @click="registrationForm = forms.LAB"
            >{{$t("roleLab")}}</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div v-else-if="!registrationComplete">
      <component :is="registrationForm" @formcomplete="register" @updateProgress="updateProgress" :role="role"></component>
    </div>

  </div>
</template>

<script>
import { Validator } from "@/../dist-browser/lib/validation";
//import InputForm from "../components/InputForm";
import VolunteerForm from "@/components/VolunteerForm.vue";
import LabDiagForm from "@/components/LabDiagForm.vue";
import LabResearchForm from "@/components/LabResearchForm.vue";

export default {
  name: "Register",
  props: {},
  data: function() {
    return {
      forms: {
        ROLE: 0,
        VOLUNTEER: "VolunteerForm",
        LAB: "LabResearchForm",
        DIAGNOSTIC_LAB: "LabDiagForm"
      },
      error: null,
      registrationComplete: false,
      registrationForm: "",
      passwordRepeat: "",
      disableSubmit: true,
      progress: 0
    };
  },
  computed: {
    val() {
      return Validator;
    },
    role() {
      let role = ""
      if (this.registrationForm === this.forms.VOLUNTEER) {
        role = "volunteer"
      } else if (this.registrationForm === this.forms.LAB) {
        role = "lab_research"
      }
      else if (this.registrationForm === this.forms.DIAGNOSTIC_LAB) {
        role = "lab_diag"
      }
      else {
        console.error("invalid role")
      }
      return role
    }
  },
  methods: {
    updateProgress(val) {
      this.progress = val
    },
    register: function(formData) {
      this.$http.post("registration", formData, { params: { role: this.role } }).then(
        resp => {
          let data = resp.body;
          console.log(data);

          if (data.success) {
            this.registrationComplete = true;
            this.error = null;
          }
        },
        err => {
          this.error = err.body.errorDescription;
        }
      );
    }
  },
  components: {
    //InputForm
    VolunteerForm,
    LabDiagForm,
    LabResearchForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
