<i18n>
{
  "en": {
    "registration": "Register",
    "registerSubtitle": "Please register to access all functionalities of LabHive.",
    "complete": "Thank you for your registration!",
    "labActivation": "Since you registered as diagnostic center or research laboratory, we verify your account manually. This takes some time, but you will receive an email, when it is done.",
    "prospectiveRole": "Please select your user group.",
    "roleHelper": "Qualified Volunteers",
    "roleDiagnosticLab": "Diagnostic Centers",
    "roleLab": "Research Laboratories",
    "yourMail": "your E-Mail address",
    "confirmationMail": "We have sent a link to confirm the registration to <strong>{mail}</strong>. Please click on this link to activate your account."
  },

  "de": {
    "registration": "Registrieren",
    "registerSubtitle": "Registrieren Sie sich, um alle Funktionalitäten von LabHive nutzen zu können.",
    "complete": "Registrierung erfolgreich!",
    "labActivation": "Da Sie sich als Diagnostikzentrum oder Forschungslabor registriert haben, verifizieren wir Ihren Account zusätzlich manuell. Dies kann eine Weile dauern. Wenn Ihr Account von uns verifiziert wurde und einsatzbereit ist, erhalten Sie eine E-Mail.",
    "prospectiveRole": "Bitte wählen Sie Ihre Nutzergruppe.",
    "roleHelper": "Qualifizierte Freiwillige",
    "roleDiagnosticLab": "Diagnostikzentren",
    "roleLab": "Forschungslabore",
    "yourMail": "deine E-Mail-Adresse",
    "confirmationMail": "Wir haben einen Link zur Bestätigung der Registrierung an <strong>{mail}</strong> geschickt. Bitte klicken Sie auf diesen Link, um ihr Konto freizuschalten."
  }
}
</i18n>
<template>
  <div class="register">

    <template v-if="!registrationComplete">
      <h1 style="margin-bottom: 16px">{{$t("registration")}}</h1>
      <p style="margin-bottom: 48px">{{ $t("registerSubtitle") }}</p>

      <RegistrationProgress v-if="!registrationComplete" v-model="step" :role="role"></RegistrationProgress>
    </template>
    

    <template v-if="registrationComplete">
      <div style="margin: 70px auto 70px auto; max-width: 510px; text-align: center">
        <p style="font-size: 22px">{{ $t("complete") }}</p>
        <figure>
          <img
            style="margin-top: 40px"
            class="img-fluid"
            src="../assets/registrationComplete.svg"
            :alt="$t('registrationComplete')"
            width="227"
          />
        </figure>  
        <p style="margin-top: 55px" v-html="this.$t('confirmationMail', { mail: formData.contact ? formData.contact.email : $t('yourMail') })"></p>
        <p v-if="role != forms.VOLUNTEER">{{ $t("labActivation") }}</p>
      </div>
    </template>

    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

    <div key="step-one" v-if="step === 0 && !registrationComplete">
      <p class="step-info-sub">{{ $t("prospectiveRole") }}</p>
      <b-container fluid>
        <b-row>
          <b-col class="text-center" cols lg="4" md="4" sm="12">
            <b-button
                  variant="primary"
                  @click="loadForm(forms.VOLUNTEER)"
                >{{$t("roleHelper")}}</b-button>
            <figure class="text-center">
              <img
                src="../assets/decoration-3-1.svg"
                alt="Illustration"
                width="170"
                height="150"
              />
            </figure>
            <p class="text-center" style="padding: 0 15px">
                {{$t("Textqualif-vol")}}
            </p>
          </b-col>

          <b-col class="text-center" cols lg="4" md="4" sm="12">
            <b-button
                  variant="primary"
                  @click="loadForm(forms.DIAGNOSTIC_LAB)"
                >{{$t("roleDiagnosticLab")}}</b-button>
            <figure class="text-center">
              <img
                src="../assets/decoration-3-2.svg"
                alt="Illustration"
                width="170"
                height="150"
              />
            </figure>
            <p class="text-center" style="padding: 0 15px">
                {{$t("Textdiag-cent")}}
            </p>
          </b-col>

          <b-col class="text-center" cols lg="4" md="4" sm="12">
            <b-button
                  variant="primary"
                  @click="loadForm(forms.LAB)"
                >{{$t("roleLab")}}</b-button>
            <figure class="text-center">
              <img
                src="../assets/decoration-3-3.svg"
                alt="Illustration"
                width="170"
                height="150"
              />
            </figure>
            <p class="text-center" style="padding: 0 15px">
                {{$t("Textres-lab")}}
            </p>
          </b-col>

        </b-row>

      </b-container>
    </div>

    <div v-else-if="!registrationComplete">
      <router-view id="router" ref="routerA" @formcomplete="register" @updateStep="updateStep" :role="role" :step="step"></router-view>
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
      step: 0,
      formData: {}
    };
  },
  computed: {
    val() {
      return Validator;
    },
    role() {
      if (this.$route.name === 'pageRegister') {
        return ''
      }

      return this.$route.name.replace("register/", "")
    }
  },
  methods: {
    updateStep(val) {
      console.log(val)
      let route = this.$route
      route.params.id = val

      if (val === 0) {
        this.$router.push({name: "pageRegister"})
        return
      }
      
      this.$router.push(route)
    },
    register: function(formData) {
      this.formData = formData
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
          this.error = this.$t('backend.formValidation.' + err.body.errorDescription);
        }
      );
    },
    loadForm(form) {
      this.registrationForm = form
      if (this.$route.path.indexOf(form) == -1)
        this.$router.push(this.$route.path + '/' + form + '/1')
    },
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRoute", to)
    if (to.name == "pageRegister") {
      this.step = 0
      this.registrationComplete = false
      this.registrationForm = ""
      this.error = null
    }
      
    else if (to.params.id)
      this.step = parseInt(to.params.id)
    else
      this.step = 2

    next()
  },
  mounted() {
    if (this.$route.params.id) {
      this.step = 0
      this.$router.replace({name: "pageRegister"})
    }
  },
  watch: {
    step(newVal, oldVal) {
      let router = this.$refs.routerA
      if (router) {
        if (newVal < oldVal)
          router.$emit("updateTransition", "back")
        else 
          router.$emit("updateTransition", "forward")
      }
      
      if (newVal === 0) {
        this.$router.push({name: "pageRegister"})
      }
      else {
        this.updateStep(newVal)
      }
    }
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
