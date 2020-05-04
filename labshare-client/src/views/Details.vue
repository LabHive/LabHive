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
      profile_raw: this.profileData
    }
  },
  mounted() {
    if(!this.profile_raw) {
      this.getProfile(this.$attrs.id)
        .then( body => {
          this.profile_raw = body.data
        })
    }
  },
  computed: {
    profile() {
      if (!this.profile_raw) return null
      const p = this.profile_raw;

      if (p.lookingFor?.equipment) {
        p.lookingFor.equipment = this.localizeFields(p.lookingFor.equipment)
      }
      if (p.lookingFor?.advice) {
        p.lookingFor.advice = this.localizeFields(p.lookingFor.advice)
      }
      if (p.lookingFor?.volunteerSkills) {
        p.lookingFor.volunteerSkills = this.localizeFields(p.lookingFor.volunteerSkills)
      }
      if (p.offers?.equipment) {
        p.offers.equipment = this.localizeFields(p.offers.equipment)
      }
      if (p.offers?.advice) {
        p.offers.advice = this.localizeFields(p.offers.advice)
      }
      if (p.details?.qualifications) {
        p.details.qualifications = this.localizeFields(p.details.qualifications)
      }
      if (p.details?.skills) {
        p.details.skills = this.localizeFields(p.details.skills)
      }

      return p
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
    },
    localizeFields(arr) {
      return arr.map((x) => {
        return this.$t(x)
      })
      .sort()
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
  /deep/ .card-columns{
    column-count: 2;
  }

  @media(max-width: 992px) {
    /deep/ .card-columns {
      column-count: 1;
    }
  }

  /deep/ .card-title {
    color: #6D6F78;
    font-size: 16px;
    font-weight: normal;
  }
</style>
