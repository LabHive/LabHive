<i18n>
{
  "en": {},
  "de": {
    "profile": "Profile",
    "profileUpdated": "Profile updated"
  }
}
</i18n>
<template>
  <div class="profile">
    <h1>{{$t('profile')}}</h1>

    <template v-if="updated">
      <h2>{{$t('profileUpdated')}}</h2>
    </template>
    <template v-else>
      <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
      <HelperForm v-if="profile.role === 'human'" :profileUpdate="true" @formcomplete="save" />
      <LabForm v-if="profile.role === 'lab'" :profileUpdate="true" @formcomplete="save" />
    </template>
  </div>
</template>

<script>
import LabForm from "../components/LabForm";
import HelperForm from "../components/HelperForm";

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
      return this.$store.state.profile;
    }
  },
  methods: {
    save: function(data) {
      this.$store.dispatch("updateProfile", data).then(
        () => {
          this.updated = true;
        },
        err => {
          this.error = err.body.errorDescription;
        }
      );
    }
  },
  components: {
    LabForm,
    HelperForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.p-button {
  width: 100%;
  min-height: 100px;
}
.profile {
  padding-top: 20px;
}
</style>
