<i18n>
{
  "en": {
    "title": "Details"
  },
  "de": {
    "title": "Einzelheiten"
  }
}
</i18n>

<template>
  <div class="details-view">
    <Volunteer v-if="profile && profile.role === 'volunteer'" :profile="profile" />
    <ResearchLab v-if="profile && profile.role === 'lab_research'" :profile="profile" />
    <DiagnosticLab v-if="profile && profile.role === 'lab_diag'" :profile="profile" />
  </div>
</template>

<script>

import Volunteer from '@/components/ProfileDetails/Volunteer'
import DiagnosticLab from '@/components/ProfileDetails/DiagnosticLab'
import ResearchLab from '@/components/ProfileDetails/ResearchLab'

export default {
  name: "Details",
  props: {
    profileData: Object
  },
  data() {
    return {
      profile: this.profileData
    }
  },
  mounted() {
    if(!this.profile) {
      this.getProfile(this.$attrs.id)
        .then( body => {
          this.profile = body.data;
        })
    }
  },
  methods: {
    getProfile(profileId) {
      return new Promise((res, rej) => {
        this.$http.get(`profile/${profileId}`).then(
          success => {
            res(success.body);
          },
          error => {
            rej(error);
            console.log(error);
          }
        );
      });
    }
  },
  components: {
    Volunteer,
    DiagnosticLab,
    ResearchLab
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /deep/ .details-card {
    margin-top: 2em;
  }
</style>
