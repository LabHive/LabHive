<i18n>
    {
    "en": {
    "registration": "Registration",
    "complete": "Thank you for your registration!",
    "activation": "To activate your account, click the link in the email that we sent to you.",
    "labActivation": "Since you registered as laboratory, we verify your account manually. This takes some time, but you will receive an email, when it is done.",
    "prospectiveRole": "In which role would you like to register?",
    "roleHelper": "Qualified Volunteer",
    "roleDiagnosticLab": "Diagnostic Centers",
    "roleLab": "Research Laboratory"
    },

    "de": {
    "registration": "Registrierung",
    "complete": "Danke für Ihre Registrierung!",
    "activation": "Um Ihren Account zu aktivieren, klicken Sie bitte auf den Link in der E-Mail, die wir Ihnen geschickt haben.",
    "labActivation": "Da Sie sich als Labor registriert haben, verifizieren wir Ihren Account zusätzlich manuell. Dies kann eine Weile dauern, wenn Ihr Account von uns verifiziert wurde und einsatzbereit ist, erhalten Sie eine E-Mail.",
    "prospectiveRole": "Als was möchten Sie sich registrieren?",
    "roleHelper": "Qualifizierte Freiwillige",
    "roleDiagnosticLab": "Diagnostikzentrum",
    "roleLab": "Forschungslabor"
    }
    }
</i18n>
<template>
  <div class="register">
    <h1 style="margin-bottom: 16px">{{$t("registration")}}</h1>
    <p>Registrieren Sie sich, um alle Funktionalitäten von LabHive nutzen zu können</p>

    <RegistrationProgress v-model="step" :role="role"></RegistrationProgress>

    <template v-if="registrationComplete">
      <h2>{{$t("complete")}}</h2>
      <p>{{$t("activation")}}<template v-if="role != forms.VOLUNTEER"><br>{{ $t("labActivation") }}</template></p>
    </template>

    <br />

    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

    <div key="step-one" v-if="role === ''">
      <b-container fluid>
        <b-row>
          <b-col id="prospectiveRole" cols="12">
            <p class="lead">{{$t("prospectiveRole")}}</p>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="*" md="3">
            <b-row>
              <b-col sm="*">
                <b-button
                  variant="primary"
                  @click="loadForm(forms.VOLUNTEER)"
                >{{$t("roleHelper")}}</b-button>
              </b-col>
              <b-col sm="*">
                {{$t('Textqualif-vol')}}
              </b-col>
            </b-row>
          </b-col>

          <b-col><hr></b-col>
          <b-col sm="*" md="3">
            <b-row>
              <b-col sm="*">
                <b-button
                  variant="primary"
                  @click="loadForm(forms.DIAGNOSTIC_LAB)"
                >{{$t("roleDiagnosticLab")}}</b-button>
              </b-col>
              <b-col sm="*">
                {{$t('Textdiag-cent')}}
              </b-col>
            </b-row>
          </b-col>
          
          <b-col><hr></b-col>
          
          <b-col sm="*" md="3">
            <b-row>
              <b-col sm="*">
                <b-button
                  variant="primary"
                  @click="loadForm(forms.LAB)"
                >{{$t("roleLab")}}</b-button>
              </b-col>
              <b-col sm="*">
                {{$t('Textres-lab')}}
              </b-col>
            </b-row>
          </b-col>
        </b-row>

      </b-container>
    </div>

    <div v-else-if="!registrationComplete">
      <router-view @formcomplete="register" @updateProgress="updateProgress" :role="role"></router-view>
    </div>

  </div>
</template>

<script>
import { Validator } from "@/../dist-browser/lib/validation";
import RegistrationProgress from "@/components/RegistrationProgress";

export default {
  name: "Register",
  props: {},
  data: function() {
    return {
      forms: {
        VOLUNTEER: "volunteer",
        LAB: "lab_research",
        DIAGNOSTIC_LAB: "lab_diag"
      },
      error: null,
      registrationComplete: false,
      registrationForm: "",
      passwordRepeat: "",
      disableSubmit: true,
      step: 1,
    };
  },
  computed: {
    val() {
      return Validator;
    },
    role() {
      if (this.$route.name === 'pageRegister') return ''

      let role = this.$route.name.replace("register/", "")

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
    },
    loadForm(form) {
      this.registrationForm = form;
      this.$router.push(this.$route.path + '/' + form)
    },
  },
  components: {
    RegistrationProgress
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.row.mt {
  margin-top: 0px;

  @media(min-width: 768px) {
    margin-top: 40px
  }
}

hr {
  @media(min-width: 768px) {
    display: none
  }
}

.btn {
  line-height: 20px;

  @media(max-width: 768px) {
    max-width: 300px;
  }
}

#prospectiveRole {
  padding: 0;
}

.lead {
  margin-bottom: 24px;
}
</style>
