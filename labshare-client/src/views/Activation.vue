<i18n>
{
    "en": {},
    "de": {
        "title": "Aktivierung",
        "successMessage": "Aktivierung erfolgreich",
        "loadingMessage": "Bitte warten...",
        "login": "Zum Login"
    }
}
</i18n>

<template>
  <div class="profile">
    <h1>{{ $t("title") }}</h1>

    <template v-if="updated">
      <p>{{ $t("successMessage") }}</p>
    </template>

    <template v-if="loading">
      <p>{{ $t("loadingMessage") }}</p>
    </template>

    <template v-if="!updated && !loading">
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </template>

    <div>
      <router-link to="/login">{{ $t('login') }}</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return {
      updated: false,
      loading: false,
      error: null,
      token: ""
    };
  },

  mounted() {
    if (this.$route.query.token) {
      this.token = this.$route.query.token;
      this.submit();
    }
  },

  methods: {
    submit: function() {
      this.error = null;
      this.loading = true;
      this.$http
        .post("activate?token=" + this.token, {
          token: this.token
        })
        .then(
          () => {
            this.updated = true;
            this.loading = false;
          },
          error => {
            this.error = this.$t("backend." + error.body.errorDescription);
            this.loading = false;
          }
        );
    },
    valid(valid) {
      this.disableSubmit = !valid;
    }
  }
};
</script>

