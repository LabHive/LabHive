<i18n>
    {
    "en": {
    "profile": "Profile",
    "profileUpdated": "Profile updated"
    },
    "de": {
    "profile": "Profil",
    "profileUpdated": "Profil aktualisiert"
    }
    }
</i18n>
<template>
  <div class="profile">
    <h1>{{ $t("profile") }}</h1>
    <template v-if="updated">
      <div class="alert alert-success" role="alert">
        {{ $t("profileUpdated") }}
      </div>
    </template>
    <template v-else>
      <div v-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      
      <component :is="form" @formcomplete="save" :profileUpdate="true" :role="profile.role"></component>
    </template>
  </div>
</template>

<script>
import LabDiagForm from "../components/LabDiagForm";
import LabResearchForm from "../components/LabResearchForm";
import VolunteerForm from "../components/VolunteerForm";

export default {
  name: "Profile",
  props: {},
  data: function() {
    return {
      updated: false,
      error: null
    };
  },
  computed: {
    profile: function() {
      return this.$user;
    },
    form() {
      if (this.profile.role === 'volunteer') {
        return "VolunteerForm"
      }
      else if (this.profile.role === 'lab_research') {
        return "LabResearchForm"
      }
      else if (this.profile.role === 'lab_diag') {
        return "LabDiagForm"
      }
      else return ""
    }
  },
  methods: {
    save: function(data) {
      this.$store.dispatch("updateProfile", data).then(
        () => {
          this.updated = true;
          setTimeout(() => (this.updated = false), 3000);
        },
        err => {
          this.error = err.body.errorDescription;
        }
      );
    }
  },
  components: {
    LabDiagForm,
    LabResearchForm,
    VolunteerForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
