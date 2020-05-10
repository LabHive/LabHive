<i18n>
{
  "en": {
    "success": "Saved successfully",
    "requestResource": "Current Requests"
  },
  "de": {
    "success": "Erfolgreich gespeichert",
    "requestResource": "Aktueller Bedarf"
  }
}
</i18n>

<template>
  <div>
    <h1 style="margin-bottom: 30px">{{ $t("requestResource") }}</h1>
    <template v-if="updated || error">
      <b-alert v-if="updated" variant="success" show>{{ $t('success') }}</b-alert>
      <b-alert v-if="error" variant="error" show>{{ errorMsg }}</b-alert>
		</template>

    <b-form>
      <Request v-model="lookingFor" @submit="submit"></Request>
    </b-form>
    
  </div>
</template>

<script>
import Request from "@/components/Request"

export default {
  props: {},
  data() {
    return {
      lookingFor: {
        equipment: [],
        advice: [],
        equipmentDescription: "",
        adviceDescription: ""
      },
      updated: false,
      error: false,
      errorMsg: ""
    };
  },
  methods: {
    submit: function() {
      this.$http.post('profile', { 
					lookingFor: this.lookingFor
				}).then(() => {
					return this.$store.dispatch('getProfile')
        }).then(() => {
          this.updated = true;
					this.error = false;
        }).catch(error => {
          this.error = true;
          this.errorMsg = error.body.errorDescription;
					this.updated = false;
				});
    }
  },
  mounted: function() {
    if (this.$user && this.$user.lookingFor) {
      this.lookingFor = this.$user.lookingFor
    }
    else {
      this.$root.$once("gotProfile", (profile) => {
        if (profile.lookingFor) {
          this.lookingFor = profile.lookingFor
        }
      })
    }
  },
  components: {
    Request
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
