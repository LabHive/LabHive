<i18n>
{
  "en": {
    "defaultTitle": "Volunteer",
    "contactDetails": {
      "title": "Contact Details",
      "not_available": "Contact details are only available to Diagnostic Lab users."
    },
    "skills": {
      "title": "Skills"
    },
    "qualifications": {
      "title": "Qualifications"
    },
    "other": {
      "title": "Other information"
    }
  },
  "de": {
    "defaultTitle": "Qualifizierte*r Freiwillige*r",
    "contactDetails": {
      "title": "Kontaktinformationen",
      "not_available": "Kontaktinformationen sind nur für eingeloggte Labore sichtbar."
    },
    "skills": {
      "title": "Fähigkeiten"
    },
    "qualifications": {
      "title": "Qualifikation"
    },
    "other": {
      "title": "Andere Informationen"
    }
  }
}
</i18n>

<template>
  <div class="details-view">
    <h1 class="mt-4">{{ title || $t('defaultTitle') }}</h1>

    <h5 v-if="profile.organization"><a :href="profile.website" target="_blank">{{profile.organization}}</a></h5>

    <div class="card-columns">
      <div class="card details-card">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="user-alt" /> {{ $t('contactDetails.title') }}</h5>
          <hr/>
          <template v-if="profile.contact">
            <dl class="row">
              <dt class="col-sm-1"><font-awesome-icon icon="envelope" /></dt>
              <dd class="col-sm-11"><b-link :href="`mailto:${profile.contact.email}`">{{profile.contact.email}}</b-link></dd>

              <dt class="col-sm-1"><font-awesome-icon icon="phone" /></dt>
              <dd class="col-sm-11">{{ profile.contact.phone || 'Not given'}}</dd>

              <dt class="col-sm-1"><font-awesome-icon icon="map-marker" /></dt>
              <dd class="col-sm-11">{{ profile.address.zipcode }} {{ profile.address.city}}</dd>
            </dl>
          </template>
          <template v-else>
            <p class="card-text">{{ $t('contactDetails.not_available') }}</p>
            <div class="links">
              <b-link class="btn btn-primary btn-sm" href="#/register">{{ $t("signUp") }}</b-link>
              <b-link class="btn btn-primary btn-sm" href="#/login">{{ $t("login") }}</b-link>
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
      labSkillsList: labSkills
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