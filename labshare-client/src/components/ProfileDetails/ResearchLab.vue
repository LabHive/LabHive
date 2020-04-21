<i18n>
{
  "en": {
    "contactDetails": {
      "title": "Contact Details",
      "not_available": "Contact details are only available to Diagnostic Lab users."
    },
    "other": {
      "title": "Other information"
    },
    "offers": {
      "advice": { "title": "Offers advice" },
      "equipment": { "title": "Offers equipment"}
    }
  },
  "de": {
    "contactDetails": {
      "title": "Kontaktinformationen",
      "not_available": "Kontaktinformationen sind nur für eingeloggte Labore sichtbar."
    },
    "other": {
      "title": "Weitere Informationen"
    },
    "offers": {
      "advice": { "title": "Hilfe anzubieten" },
      "equipment": { "title": "Equipment anzubieten"}
    }
  }
}
</i18n>

<template>
  <div class="details-view">
    <h1 class="mt-4">{{ profile.organization }}</h1>

    <h5 v-if="profile.organization"><a :href="profile.website" target="_blank">{{profile.website}}</a></h5>

    <div class="card-columns">
      
      <div class="card details-card">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="user-alt" /> {{ $t('contactDetails.title')}}</h5>
          <hr/>
          <template v-if="profile.contact">
            <p>{{profile.contact.firstname}} {{profile.contact.lastname}}</p>
            <dl class="row">
              <dt class="col-sm-1"><font-awesome-icon icon="envelope" /></dt>
              <dd class="col-sm-11"><b-link :href="`mailto:${profile.contact.email}`">{{profile.contact.email}}</b-link></dd>

              <dt class="col-sm-1"><font-awesome-icon icon="phone" /></dt>
              <dd class="col-sm-11">{{ profile.contact.phone || 'Not given'}}</dd>

              <dt class="col-sm-1"><font-awesome-icon icon="map-marker" /></dt>
              <dd class="col-sm-11">
                {{ profile.address.zipcode }} {{ profile.address.city}},
                {{ profile.address.street }}
              </dd>
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

      <div class="card details-card" v-if="profile.description">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="info-circle" /> {{ $t('other.title')}}</h5>
          <hr/>
          <p>{{ profile.description }}</p>
        </div>
      </div>
      
      <div class="card details-card" v-if="profile.offers.advice.length > 0 || profile.offers.adviceDescription">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="hands-helping" /> {{ $t('offers.advice.title')}}</h5>
          <hr/>
          <ul>
            <li class="inline-item" v-for="s in profile.offers.advice" :key="s">
              {{ s }}
            </li>
          </ul>

          <p v-if="profile.offers.adviceDescription">{{profile.offers.adviceDescription}}</p>
        </div>
      </div>

      <div class="card details-card" v-if="profile.offers.equipment.length > 0 || profile.offers.equipmentDescription">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="cubes" /> {{ $t('offers.equipment.title')}}</h5>
          <hr/>
          <ul>
            <li class="inline-item" v-for="s in profile.offers.equipment" :key="s">
              {{ s }}
            </li>
          </ul>

          <p v-if="profile.offers.equipmentDescription">{{profile.offers.equipmentDescription}}</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { labSkills, equipment, advices } from "@/../dist-browser/lib/selectLists";
export default {
  name: "ResearchLab",
  props: {
    profile: Object
  },
  data() {
    return {
      title: this.profile.organization,
      labSkillsList: labSkills,
      equipmentList: equipment,
      adviceList: advices
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