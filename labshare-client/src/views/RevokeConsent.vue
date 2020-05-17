<template>
  <div>
    <h1>{{ $t("revokeConsent.title") }}</h1>
    <template v-if="loaded">
      <b-alert variant="success" :show="!error">{{ $t("general.executedSuccessfully") }}</b-alert>
      <b-alert variant="danger" :show="error">{{ errorMsg }}</b-alert>
    </template>

    <p v-if="$route.query.action == 'mailUpdates'">{{ $t("revokeConsent.mail") }}</p>
    <p v-else-if="$route.query.action == 'publicSearch'">{{ $t("revokeConsent.dataProcessing") }}</p>
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
      this.errorMsg = this.$t("revokeConsent.loginRequired");
      this.loaded = true;
      return;
    }

    if (!this.$route.query.action) {
      this.error = true;
      this.errorMsg = this.$t("general.invalidRequest");
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


