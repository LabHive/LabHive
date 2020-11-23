<template>
  <div>
    <h1>{{ $t("updateAvailability.title") }}</h1>
    <template v-if="loaded">
      <b-alert variant="success" :show="!error">{{ $t("updateAvailability.successMessage") }}</b-alert>
      <b-alert variant="danger" :show="error">{{ errorMsg }}</b-alert>
    </template>

    <p v-if="$route.query.status == '1'">{{ $t('updateAvailability.available') }}</p>
    <p v-else-if="$route.query.status == '0'">{{ $t('updateAvailability.not_available') }}</p>
    <p>{{ $t("updateAvailability.update_notice") }}</p>
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
      this.errorMsg = this.$t("updateAvailability.invalidRequest");
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


