<template>
  <div class="details-view">
    <h1 class="mt-4">{{ profile.organization }}</h1>

    <h5 v-if="profile.organization"><a :href="profile.website" target="_blank">{{profile.website}}</a></h5>

    <div class="card-columns">
      
      <div class="card details-card">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="user-alt" /> {{ $t('searchDetails.contactDetails.title')}}</h5>
          <hr/>
          <template v-if="profile.contact">
            <p>{{profile.contact.firstname}} {{profile.contact.lastname}}</p>
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
              <b-col cols="10">{{ profile.address.zipcode }} {{ profile.address.city}}, {{ profile.address.street }}</b-col>
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

      <div class="card details-card" v-if="profile.description">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="info-circle" /> {{ $t('searchDetails.other.title')}}</h5>
          <hr/>
          <p>{{ profile.description }}</p>
        </div>
      </div>

      <div class="card details-card" v-if="profile.lookingFor.equipment.length > 0 || profile.lookingFor.equipmentDescription">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="search" /> {{ $t('searchDetails.lookingFor.equipment.title')}}</h5>
          <hr/>
          <ul>
            <li class="inline-item" v-for="s in profile.lookingFor.equipment" :key="s">
              {{ s }}
            </li>
          </ul>

          <p v-if="profile.lookingFor.equipmentDescription">{{profile.lookingFor.equipmentDescription}}</p>
          
        </div>
      </div>

      <div class="card details-card" v-if="profile.lookingFor.advice.length > 0 || profile.lookingFor.adviceDescription">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="search" /> {{ $t('searchDetails.lookingFor.advice.title')}}</h5>
          <hr/>
          <ul>
            <li class="inline-item" v-for="s in profile.lookingFor.advice" :key="s">
              {{ s }}
            </li>
          </ul>

          <p v-if="profile.lookingFor.adviceDescription">{{profile.lookingFor.adviceDescription}}</p>
        </div>
      </div>

      <div class="card details-card" v-if="profile.offers.advice.length > 0 || profile.offers.adviceDescription">
        <div class="card-body">
          <h5 class="card-title"><font-awesome-icon icon="hands-helping" /> {{ $t('searchDetails.offers.advice.title')}}</h5>
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
          <h5 class="card-title"><font-awesome-icon icon="cubes" /> {{ $t('searchDetails.offers.equipment.title')}}</h5>
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
  name: "DiagnosticLab",
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