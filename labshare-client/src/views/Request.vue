<i18n>
{
  "en": {
    "equip": "Search for devices",
    "advice": "Search for advices",
    "humans": "Search for volunteers",
    "request": "File a Request",
    "success": "Saved successfully"
  },
  "de": {
    "equip": "Suche nach Geräten",
    "advice": "Suche nach Wissen",
    "humans": "Suche nach Freiwilligen Helfern",
    "request": "Anfrage stellen",
    "success": "Erfolgreich gespeichert"
  }
}
</i18n>

<template>
  <div>
    <h1>{{ $t('request') }}</h1>
    <template v-if="updated || error">
      <b-alert v-if="updated" variant="success" show>{{ $t('success') }}</b-alert>
      <b-alert v-if="error" variant="error" show>{{ $(errorMsg) }}</b-alert>
		</template>
    <b-form @submit="submit">
      <h3>{{ $t("humans") }}</h3>
      <CheckboxGroup name="humans" cols="2" :data="labSkills" v-model="lookingFor.humanSkills"></CheckboxGroup>

      <h3>{{ $t("equip") }}</h3>
      <CheckboxGroup name="equip" cols="3" :data="equipment" v-model="lookingFor.equipment"></CheckboxGroup>

      <h3>{{ $t("advice") }}</h3>
      <b-button variant="primary" type="submit">Save</b-button>
    </b-form>
    
  </div>
</template>

<script>
import {
  labSkills,
  equipment,
  advices
} from "../../dist-browser/lib/selectLists";
import CheckboxGroup from '../components/CheckboxGroup'

export default {
  name: "Search",
  props: {},
  data() {
    return {
      lookingFor: {
        humanSkills: [],
        equipment: [],
        advice: []
      },
      labSkills,
      equipment,
      advices,
      updated: false,
      error: false,
      errorMsg: ""
    };
  },
  methods: {
    submit: function(event) {
      event.preventDefault();
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
    CheckboxGroup
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
