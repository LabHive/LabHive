<i18n>
{
  "en": {
    "equip": "Search for devices/reagents",
    "advice": "Search for advice",
    "humans": "Search for volunteers",
    "request": "File a request",
    "success": "Saved successfully"
  },
  "de": {
    "equip": "Suche nach Geräten/Reagenzien",
    "advice": "Suche nach Ratschlägen/Wissen",
    "humans": "Suche nach Freiwilligen Helfer*innen",
    "request": "Anfrage stellen",
    "success": "Erfolgreich gespeichert"
  }
}
</i18n>

<template>
  <div>
    <template v-if="updated || error">
      <b-alert v-if="updated" variant="success" show>{{ $t('success') }}</b-alert>
      <b-alert v-if="error" variant="error" show>{{ errorMsg }}</b-alert>
		</template>
    
    <b-form>
      <Offer v-model="offers" @submit="submit"></Offer>
    </b-form>
    
  </div>
</template>

<script>
import Offer from "@/components/Offer"

export default {
  props: {},
  data() {
    return {
      offers: {
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
					offers: this.offers
				}).then(() => {
					return this.$store.dispatch('getProfile')
        }).then(() => {
          this.updated = true;
					this.error = false;
        }).catch(error => {
          this.error = true;
          this.errorMsg = this.$t('backend.' + error.body.errorDescription);
					this.updated = false;
				});
    }
  },
  mounted: function() {
    if (this.$user && this.$user.offers) {
      this.offers = this.$user.offers
    }
    else {
      this.$root.$once("gotProfile", (profile) => {
        if (profile.offers) {
          this.offers = profile.offers
        }
      })
    }
  },
  components: {
    Offer
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
