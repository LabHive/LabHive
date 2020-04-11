<i18n>
{
    "en": {},
    "de": {
        "title": "Reset password",
        "successMessage": "Password updated",
        "loadingMessage": "Please wait",
        "passwordTooShortMessage": "The password minimum length is 6 characters",
        "passwordsDoesNotMatchMessage": "The passwords doesn't match",
        "back": "Back to login"
    }
}
</i18n>

<template>
  <div class="profile">
    <h1>{{ $t("title") }}</h1>

    <template v-if="updated">
      <div class="alert alert-success">{{ $t("successMessage") }}</div>

      <div class="my-3">
        <router-link to="/login">{{ $t('back') }}</router-link>
      </div>
    </template>

    <template v-if="loading">
      <div class="alert alert-warning">{{ $t("loadingMessage") }}</div>
    </template>

    <template v-if="!updated && !loading">
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div class="row">
        <b-form @submit="submit" class="col-md-6">
          <Password v-model="formData.newPassword" verticalLabel @validPassword="valid"></Password>
          <b-button variant="primary" :disabled="disableSubmit" type="submit">{{ $t("save") }}</b-button>
        </b-form>
      </div>
    </template>
  </div>
</template>

<script>
import Password from "@/components/PasswordFields";

export default {
  name: "ChangePassword",
  data: function() {
    return {
      updated: false,
      loading: false,
      error: null,
      disableSubmit: true,
      formData: {
        token: "",
        newPassword: ""
      }
    };
  },

  mounted() {
    if (this.$route.query.token) {
      this.formData.token = this.$route.query.token;
    }
  },

  methods: {
    submit: function(evt) {
      evt.preventDefault()
      this.error = null;
      this.loading = true;
      this.$http
        .post("reset-password?token=" + this.formData.token, {
          newPassword: this.formData.newPassword
        })
        .then(() => {
            this.updated = true;
            this.loading = false;
            setTimeout(() => (this.updated = false), 3000);
          },
          error => {
            this.error = this.$t('backend.' + error.body.errorDescription);
            this.loading = false;
          }
        );
    },
    valid(valid) {
      this.disableSubmit = !valid;
    }
  },
  components: {
    Password
  }
};
</script>

