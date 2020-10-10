<template>
  <div class="details-view">
    <h1 class="mt-4">{{ title || $tc('general.volunteer', 1) }}</h1>

    <b-alert variant="danger" :show="error == true">{{ msg }}</b-alert>
    <b-alert variant="success" :show="error == false">{{ msg }}</b-alert>

    <h5 v-if="profile.organization"><a :href="profile.website" target="_blank">{{profile.organization}}</a></h5>

    <b-modal
      id="confirm"
      :title="$t('searchDetails.notAvailableAnymore')"
      :ok-title="$t('general.yes')"
      :cancel-title="$t('general.no')"
      ok-variant="primary"
      @ok="notAvailableNotice"
    >
      <p v-html="$t('searchDetails.notAvailableAnymore_warning')"></p>
    </b-modal>

    <div class="card-columns">
      <div class="card details-card">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="user-alt" /> {{ $t('searchDetails.contactDetails.title') }}</h5>
          <hr/>
          <template v-if="profile.contact">
            <b-row>
              <b-col cols="1"><font-awesome-icon icon="envelope" /></b-col>
              <b-col cols="10"><b-link :href="`mailto:${profile.contact.email}`">{{profile.contact.email}}</b-link></b-col>
              <div class="w-100 nextRow"></div>
              <template v-if="profile.contact.phone">
                <b-col cols="1"><font-awesome-icon icon="phone" /></b-col>
                <b-col cols="10">{{ profile.contact.phone }}</b-col>
              </template>
              <div class="w-100 nextRow"></div>
              <b-col cols="1"><font-awesome-icon icon="map-marker" /></b-col>
              <b-col cols="10">{{ profile.address.zipcode }} {{ profile.address.city}}</b-col>
            </b-row>
            <b-row style="margin-top: 1.25rem">
              <b-col cols="auto">
                <b-button variant="primary" style="margin: 0" v-b-modal.confirm>{{ $t('searchDetails.notAvailableAnymore') }}</b-button>
              </b-col>
            </b-row>
          </template>
          <template v-else>
            <p class="card-text">{{ $t('searchDetails.contactDetails.not_available') }}</p>
            <div class="links" v-if="!$authenticated">
              <b-link class="btn btn-primary btn-sm" to="/register">{{ $t('general.signUp') }}</b-link>
              <b-link class="btn btn-primary btn-sm" to="/login">{{ $t('general.login') }}</b-link>
            </div>
          </template>
        </div>
      </div>

      <div class="card details-card" v-if="profile.details.skills.length > 0">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="vial" /> {{ $t('registration.steps.skills.title')}}</h5>
          <hr/>
          <ul>
            <li class="inline-item" v-for="s in profile.details.localized_skills" :key="s">
              {{ s }}
            </li>
          </ul>
        </div>
      </div>

      <div class="card details-card" v-if="profile.details.qualifications.length > 0">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="graduation-cap" /> {{ $t('registration.steps.qualification.title')}}</h5>
          <hr/>
          <ul>
            <li class="inline-item" v-for="s in profile.details.localized_qualifications" :key="s">
              {{ s }}
            </li>
          </ul>
        </div>
      </div>

      <div class="card details-card" v-if="profile.description">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="info-circle" /> {{ $t('searchDetails.other.title')}}</h5>
          <hr/>
          <p>{{ profile.description }}</p>
        </div>
      </div>
        
    </div>

  </div>
</template>

<script>
import { labSkills, qualification } from "@/../dist-browser/lib/selectLists";
export default {
  name: "Volunteer",
  props: {
    profile: Object
  },
  data() {
    return {
      title: this.profile.contact ? `${this.profile.contact.firstname} ${this.profile.contact.lastname}` : null,
      qualificationList: qualification,
      labSkillsList: labSkills,
      error: null,
      msg: ""
    }
  },
  methods: {
    notAvailableNotice() {
      this.$http.post(`profile/${this.profile.slug}/notAvailableNotice`).then(() => {
        this.error = false;
        this.msg = this.$t('backend.success')
      }, err => {
        this.error = true;
        this.msg = this.$t('backend.' + err.body.errorDescription)
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.inline-item {
}
.links > a{
  margin-right:1em;
}
</style>