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
        p.lookingFor.localized_equipment = this.localizeFields(p.lookingFor.equipment, "equipment")
      }
      if (p.lookingFor?.advice) {
        p.lookingFor.localized_advice = this.localizeFields(p.lookingFor.advice, "advice")
      }
      if (p.offers?.equipment) {
        p.offers.localized_equipment = this.localizeFields(p.offers.equipment, "equipment")
      }
      if (p.offers?.advice) {
        p.offers.localized_advice = this.localizeFields(p.offers.advice, "advice")
      }
      if (p.details?.qualifications) {
        p.details.localized_qualifications = this.localizeFields(p.details.qualifications, "qualifications")
      }
      if (p.details?.skills) {
        p.details.localized_skills = this.localizeFields(p.details.skills, "skills")
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
    localizeFields(arr, identifier) {
      return arr.map((x) => {
        return this.$t(`checkboxes.${identifier}.${x}`)
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

  /deep/ .nextRow {
    margin-top: 10px;
  }
</style>
