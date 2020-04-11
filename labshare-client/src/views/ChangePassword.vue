<i18n>
{
  "en": {
    "oldPassword": "Current Password"
  },
  "de": {
    "title": "Change password",
    "successMessage": "Password updated",
    "loadingMessage": "Please wait",
    "pleaseEnterYourPasswordMessage": "Please enter your current password",
    "passwordTooShortMessage": "The password minimum length is 6 characters",
    "passwordsDoesNotMatchMessage": "The passwords doesn't match",
    "oldPassword": "Aktuelles Passwort"
  }
}
</i18n>

<template>
  <div class="profile">
    <h1>{{ $t("title") }}</h1>

    <template v-if="updated">
      <div class="alert alert-success">{{ $t("successMessage") }}</div>
    </template>

    <template v-if="loading">
      <div class="alert alert-warning">{{ $t("loadingMessage") }}</div>
    </template>

    <template v-if="!updated && !loading">
      <div v-if="error" class="alert alert-danger">{{ error }}</div>

      <div class="row">
        <b-form class="col-md-6">
          <b-form-group id="password" :label="$t('oldPassword')">
            <b-form-input type="password" v-model="formData.oldPassword"></b-form-input>
          </b-form-group>

          <Password v-model="formData.newPassword" verticalLabel @validPassword="valid"></Password>

          <b-button variant="primary" @click="submit" :disabled="disableSubmit">{{ $t("save") }}</b-button>
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
        oldPassword: "",
        newPassword: ""
      }
    };
  },

  methods: {
    submit: function() {
      this.error = null;
      this.loading = true;
      this.$http.post("change-password", this.formData).then(() => {
          this.updated = true;
          this.loading = false;
          setTimeout(() => (this.updated = false), 3000);
        },
        error => {
          this.error = error.body.errorDescription;
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
