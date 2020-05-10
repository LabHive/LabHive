<i18n>
{
	"en": {
		"title": "Forgot Password",
		"successMessage": "If the e-mail address is registered, you will receive an e-mail from us shortly.",
		"loadingMessage": "Please wait...",
		"pleaseEnterYourEmailMessage": "Please enter your e-mail address",
		"submit": "Submit",
		"back": "Back to login"
	},
	"de": {
		"title": "Passwort vergessen",
		"successMessage": "Sie werden von uns in Kürze eine E-Mail erhalten, sofern ein Konto für diese E-Mail-Adresse im System hinterlegt ist.",
		"loadingMessage": "Bitte warten...",
		"pleaseEnterYourEmailMessage": "Bitte geben Sie Ihre E-Mail-Adresse ein.",
		"submit": "Abschicken",
		"back": "Zurück zum Login"
  }
}
</i18n>

<template>
  <div class="profile">
    <h1>{{ $t("title") }}</h1>

    <p class="my-4">{{ $t('pleaseEnterYourEmailMessage') }}.</p>

    <template v-if="updated">
      <div class="alert alert-success">{{ $t("successMessage") }}</div>
    </template>

    <template v-if="loading">
      <div class="alert alert-warning">{{ $t("loadingMessage") }}</div>
    </template>

    <template v-if="!updated && !loading">
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div class="row">
        <b-form @submit="submit" class="col-md-6">

          <InputForm name="email" v-model="formData.email" :valFunc="val.validEmail" trim></InputForm>

          <div class="my-3">
            <router-link to="/login">{{ $t('back') }}</router-link>
          </div>

          <b-button variant="primary" type="submit">{{ $t("submit") }}</b-button>
        </b-form>
      </div>
    </template>
  </div>
</template>

<script>
import InputForm from "@/components/InputForm";
import { Validator } from "@/../dist-browser/lib/validation";

export default {
  name: "ForgotPassword",
  data: function() {
    return {
      updated: false,
      loading: false,
      error: null,
      formData: {
        email: ""
      },
      val: Validator
    };
  },

  methods: {
    submit: function(ev) {
      ev.preventDefault()
      this.error = null;

      if (this.formData.email === "") {
        this.error = this.$t("pleaseEnterYourEmailMessage");
      } else {
        this.loading = true;

        this.$http
          .post("forgot-password", {
            email: this.formData.email
          })
          .then(() => {
              this.updated = true;
              this.loading = false;
            },
            error => {
              this.error = this.$t("backend." + error.body.errorDescription);
              this.loading = false;
            }
          );
      }
    }
  },
  components: {
    InputForm
  }
};
</script>
