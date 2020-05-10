<i18n>
{
  "en": {
    "defaultTitle": "Volunteer",
    "contactDetails": {
      "title": "Contact Details",
      "not_available": "Contact details are only available to registered diagnostic centers or research laboratories users."
    },
    "skills": {
      "title": "Skills"
    },
    "qualifications": {
      "title": "Qualifications"
    },
    "other": {
      "title": "Other information"
    },
    "notAvailableAnymore": "Not available anymore",
    "notAvailableAnymore_warning": "<p>This action omits the person from search results. We will then send them an e-mail informing them that the option has been set for their profile.</p><p>Within 3 days they can confirm or dispute this. If no action is taken, after this time, the profile will no longer be found in the search.</p><p>Thank you very much for your help!</p><p>Do you want to proceed?</p>"
  },
  "de": {
    "defaultTitle": "Qualifizierte:r Freiwillige:r",
    "contactDetails": {
      "title": "Kontaktinformationen",
      "not_available": "Kontaktinformationen sind nur für eingeloggte Diagnostikzentren oder Forschungslabore sichtbar."
    },
    "skills": {
      "title": "Fähigkeiten"
    },
    "qualifications": {
      "title": "Qualifikation"
    },
    "other": {
      "title": "Andere Informationen"
    },
    "notAvailableAnymore": "Nicht mehr verfügbar",
    "notAvailableAnymore_warning": "<p>Durch diesen Vorgang, wird die Person aus der Suche ausgeblendet. Sie bekommt von uns nun eine E-Mail zugesendet, in der wir sie darauf hinweisen, dass die Aktion für ihr Profil ausgelöst wurde.</p><p>Innerhalb von 3 Tagen kann sie diesen Vorgang bestätigen oder ablehen. Wenn keine Reaktion stattfindet, wird dieses Profil nach dieser Übergangsfrist nicht mehr in der Suche zu finden sein.</p><p>Vielen Dank für Ihre Mithilfe!</p><p>Wollen Sie diese Aktion durchführen?</p>"
  }
}
</i18n>

<template>
  <div class="details-view">
    <h1 class="mt-4">{{ title || $t('defaultTitle') }}</h1>

    <b-alert variant="danger" :show="error == true">{{ msg }}</b-alert>
    <b-alert variant="success" :show="error == false">{{ msg }}</b-alert>

    <h5 v-if="profile.organization"><a :href="profile.website" target="_blank">{{profile.organization}}</a></h5>

    <b-modal
      id="confirm"
      :title="$t('notAvailableAnymore')"
      :ok-title="$t('yes')"
      :cancel-title="$t('no')"
      ok-variant="primary"
      @ok="notAvailableNotice"
    >
      <p v-html="$t('notAvailableAnymore_warning')"></p>
    </b-modal>

    <div class="card-columns">
      <div class="card details-card">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="user-alt" /> {{ $t('contactDetails.title') }}</h5>
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
                <b-button variant="primary" style="margin: 0" v-b-modal.confirm>{{ $t("notAvailableAnymore") }}</b-button>
              </b-col>
            </b-row>
          </template>
          <template v-else>
            <p class="card-text">{{ $t('contactDetails.not_available') }}</p>
            <div class="links" v-if="!$authenticated">
              <b-link class="btn btn-primary btn-sm" to="/register">{{ $t("signUp") }}</b-link>
              <b-link class="btn btn-primary btn-sm" to="/login">{{ $t("login") }}</b-link>
            </div>
          </template>
        </div>
      </div>

      <div class="card details-card" v-if="profile.details.skills.length > 0">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="vial" /> {{ $t('skills.title')}}</h5>
          <hr/>
          <ul>
            <li class="inline-item" v-for="s in profile.details.skills" :key="s">
              {{ s }}
            </li>
          </ul>
        </div>
      </div>

      <div class="card details-card" v-if="profile.details.qualifications.length > 0">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="graduation-cap" /> {{ $t('qualifications.title')}}</h5>
          <hr/>
          <ul>
            <li class="inline-item" v-for="s in profile.details.qualifications" :key="s">
              {{ s }}
            </li>
          </ul>
        </div>
      </div>

      <div class="card details-card" v-if="profile.description">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="info-circle" /> {{ $t('other.title')}}</h5>
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
      errorMsg: ""
    }
  },
  methods: {
    notAvailableNotice() {
      this.$http.post(`profile/${this.profile.slug}/notAvailableNotice`).then(() => {
        this.error = false;
        this.msg = this.$t("backend.success")
      }, err => {
        this.error = true;
        this.msg = this.$t("backend." + err.body.errorDescription)
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