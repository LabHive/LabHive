<i18n>
{
    "en": {
        "revokeConsent": "Revoke consent",
        "mail": "Receive no updates via email anymore.",
        "dataProcessing": "Sending my personal data to registered diagnostic centers and research laboratories.",
        "loginRequired": "Please log in and open the link again.",
        "success": "Success!",
        "invalidAction": "Invalid request"
    },
    "de": {
        "revokeConsent": "Einwilligung widerrufen",
        "mail": "Keine Updates per E-Mail erhalten.",
        "dataProcessing": "Datenweitergabe, an Diagnostikzentren und Forschungslabore unterbinden.",
        "loginRequired": "Bitte melden Sie sich an und rufen Sie den Link erneut auf.",
        "success": "Erfolgreich ausführt.",
        "invalidAction": "Ungültige Anfrage"
    }
}
</i18n>

<template>
  <div>
    <h1>{{ $t("revokeConsent") }}</h1>
    <template v-if="loaded">
      <b-alert variant="success" :show="!error">{{ $t("success") }}</b-alert>
      <b-alert variant="danger" :show="error">{{ errorMsg }}</b-alert>
    </template>

    <p v-if="$route.query.action == 'mailUpdates'">{{ $t("mail") }}</p>
    <p v-else-if="$route.query.action == 'publicSearch'">{{ $t("dataProcessing") }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      loaded: false,
      errorMsg: ""
    };
  },

  mounted() {
    if (!this.$authenticated) {
      this.error = true;
      this.errorMsg = this.$t("loginRequired");
      this.loaded = true;
      return;
    }

    if (!this.$route.query.action) {
      this.error = true;
      this.errorMsg = this.$t("invalidAction");
      this.loaded = true;
      return;
    }

    this.$http.post("profile/revoke?detail=" + this.$route.query.action).then(
      resp => {
        let body = resp.body;
        this.loaded = true;

        if (body.success) {
          this.error = false;
          this.loaded = true;
          return;
        }
        this.error = true;
        this.errorMsg = this.$t("backend." + body.errorDescription);
      },
      err => {
        this.error = true;
        this.loaded = true;
        this.errorMsg = this.$t("backend." + err.body.errorDescription);
      }
    );
  }
};
</script>


