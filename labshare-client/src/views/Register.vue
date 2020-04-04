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
    "roleDiagnosticLab": "Diagnostic Lab",
    "roleLab": "Forschungslabor",
    "labInfo": "Labor Informationen",
    "labName": "Name des Labors",
    "street": "Straße"
  }
}
</i18n>
<template>
  <div class="register">
    <h1>{{$t("registration")}}</h1>
    
    <template v-if="registrationComplete">
      <h2>{{$t("complete")}}</h2>
    </template>

    <br/><br/><br/>

    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

    <transition name="fade" mode="out-in" v-if="!registrationComplete">
      <div key="step-one" v-if="loadedForm === 0">
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
                @click="loadedForm = 1; abc = forms.HELPER"
              >{{$t("roleHelper")}}</b-button>
            </b-col>
            <b-col cols="4">
              <b-button 
                block 
                size="lg" 
                variant="primary" 
                @click="loadedForm = 1; abc = forms.DIAGNOSTIC_LAB"
              >{{$t("roleDiagnosticLab")}}</b-button>
            </b-col>
            <b-col cols="4">
              <b-button 
                block 
                size="lg" 
                variant="primary" 
                @click="loadedForm = 1; abc = forms.LAB"
              >{{$t("roleLab")}}</b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
      
      <div key="step-two" v-if="loadedForm === 1">
        <h3 class="section">{{ $t("loginInfo") }}</h3>
        
        <InputForm
          name="email"
          v-model="formData.contact.email"
          :valFunc="val.validEmail"
          inType="email"
        />

        <InputForm 
          name="password" 
          v-model="formData.password" 
          :valFunc="pwVal" 
          inType="password"
        />

        <InputForm
          name="repeatPassword"
          v-model="passwordRepeat"
          :valFunc="pwVal"
          inType="password"
        />

        <b-button variant="primary" type="button" @click="loadedForm = 2">{{ $t("save") }}</b-button>
      </div>

      <div key="step-three" v-if="loadedForm === 2">
        <h3 class="section">{{ $t("contactInfo") }}</h3>
      
        <InputForm
          name="firstName"
          v-model="formData.contact.firstname"
          :valFunc="val.validFirstname"
        />

        <InputForm name="lastName" v-model="formData.contact.lastname" :valFunc="val.validLastname" />
        <InputForm name="phone" v-model="formData.contact.phone" :valFunc="val.validPhone" />

        <h3 class="section">{{ $t("labInfo") }}</h3>
        
        <InputForm name="labName" v-model="formData.name" :valFunc="val.validOrganization" />
        <InputForm name="city" v-model="formData.address.city" :valFunc="val.validCity" />
        <InputForm name="zipcode" v-model="formData.address.zipcode" :valFunc="val.validZipcode" />
        <InputForm name="street" v-model="formData.address.street" :valFunc="val.validStreet" />

        <h3 class="section">Weitere Informationen</h3>
        
        <b-form-group
          id="description"
          :state="val.validDescription(formData.description).valid"
          :invalid-feedback="$t('backend.formValidation.' + val.validDescription(formData.description).err.message)"
        >
          <b-form-textarea
            id="textarea"
            v-model="formData.description"
            placeholder="Weitere Informationen..."
            rows="4"
            max-rows="10"
            :state="!val.validDescription(formData.description).valid ? false: null"
          ></b-form-textarea>
        </b-form-group>

        <b-button variant="primary" type="button" @click="loadedForm = 3">{{ $t("save") }}</b-button>
      </div>

      <div key="step-four" v-if="loadedForm === 3">
        <div>
          <label>
            <input type="checkbox" checked="checked" />
            I accept the terms
          </label>
        </div>
        <br/>
        <b-button variant="primary" type="button" @click="register()">{{ $t("save") }}</b-button>
      </div>
    </transition>
  </div>
</template>

<script>
import { Validator } from "../../dist-browser/lib/validation";
import InputForm from "../components/InputForm";

export default {
  name: "Register",
  props: {},
  data: function() {
    return {
      forms: {
        ROLE: 0,
        HELPER: 1,
        LAB: 2,
        DIAGNOSTIC_LAB: 3
      },
      error: null,
      loadedForm: 0,
      registrationComplete: false,
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
        password: "",
        consent: {
          processing: true,
          publicContact: true
        }
      },
      passwordRepeat: "",
      disableSubmit: true
    };
  },
  computed: {
    val() {
      return Validator;
    }
  },
  methods: {
    register: function() {
      const data = this.formData;
      console.log(data);

      let role = this.loadedForm == this.forms.HELPER ? "volunteer" : "lab_diag";

      this.$http.post("registration", data, { params: { role: role } }).then(
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
    pwVal(data) {
      return {
        valid: this.passwordRepeat == this.formData.password && data != ""
      };
    }
  },
  components: {
    InputForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
