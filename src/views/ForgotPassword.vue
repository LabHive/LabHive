<template>
  <div class="profile">
    <h1>{{ $t("forgotPassword.title") }}</h1>

    <p class="my-4">{{ $t("forgotPassword.pleaseEnterYourEmailMessage") }}.</p>

    <template v-if="updated">
      <div class="alert alert-success">{{ $t("forgotPassword.successMessage") }}</div>
    </template>

    <template v-if="loading">
      <div class="alert alert-warning">{{ $t("general.loading") }}</div>
    </template>

    <template v-if="!updated && !loading">
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div class="row">
        <b-form @submit="submit" class="col-md-6">

          <InputForm name="general.emailAddress" v-model="formData.email" :valFunc="val.validEmail" trim></InputForm>

          <div class="my-3">
            <router-link to="/login">{{ $t("general.to_login") }}</router-link>
          </div>

          <b-button variant="primary" type="submit">{{ $t("general.submit") }}</b-button>
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
        this.error = this.$t("forgotPassword.pleaseEnterYourEmailMessage");
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
