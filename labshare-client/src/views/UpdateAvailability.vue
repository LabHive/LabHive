<i18n>
{
  "en": {
    "success": "Success!",
    "invalidRequest": "Invalid Request",
    "updateAvailability": "Update Availability",
    "available": "Update availability status to: 'Currently available'",
    "not_available": "Update availability status to: 'Not available'",
    "update_notice": "You can change the status when you are logged in in your profile settings."
  },
  "de": {
    "success": "Erfolgreich ausführt.",
    "invalidRequest": "Ungültige Anfrage",
    "updateAvailability": "Verfügbarkeitsstatus aktualisieren",
    "available": "Aktualisiere Verfügbarkeitsstatus auf: 'Zum Aushelfen verfügbar'",
    "not_available": "Aktualisiere Verfügbarkeitsstatus auf: 'Nicht verfügbar'",
    "update_notice": "Loggen Sie sich ein, um den Status jederzeit in Ihren Profileinstellungen zu ändern."
  }
}
</i18n>

<template>
  <div>
    <h1>{{ $t("updateAvailability") }}</h1>
    <template v-if="loaded">
      <b-alert variant="success" :show="!error">{{ $t("success") }}</b-alert>
      <b-alert variant="danger" :show="error">{{ errorMsg }}</b-alert>
    </template>

    <p v-if="$route.query.status == '1'">{{ $t('available') }}</p>
    <p v-else-if="$route.query.status == '0'">{{ $t('not_available') }}</p>
    <p>{{ $t("update_notice") }}</p>
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
    const status = this.$route.query.status
    const id = this.$route.query.id
    if (!status || !id) {
      this.error = true;
      this.errorMsg = this.$t("invalidRequest");
      this.loaded = true;
      return;
    }

    this.$http.post(`profile/${id}/updateAvailability?status=${status}`).then(
      resp => {
        let body = resp.body;
        this.loaded = true;

        if (body.success) {
          this.error = false;
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


