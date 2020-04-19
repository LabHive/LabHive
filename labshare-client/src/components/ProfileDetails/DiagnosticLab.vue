<i18n>
{
  "en": {
    "contactDetails": {
      "title": "Contact Details"
    },
    "other": {
      "title": "Other information"
    },
    "lookingFor": {
      "skills": { "title": "Wanted skills"},
      "equipment": { "title": "Wanted equipment"},
      "advice": { "title": "Wanted advice"}
    },
    "offers": {
      "advice": { "title": "Avilable advice" },
      "equipment": { "title": "Available equipment"}
    }
  },
  "de": {
  }
}
</i18n>

<template>
  <div class="details-view">
    <h1 class="mt-4">{{ profile.organization }}</h1>

    <h5 v-if="profile.organization"><a :href="profile.website" target="_blank">{{profile.website}}</a></h5>

    <div class="row">
      <div class="col-md">

        <div class="card details-card">
          <div class="card-body">
            <h5 class="card-title">{{ $t('contactDetails.title')}}</h5>
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
              <p class="card-text">Contact details are only avilable to logged in users.</p>
              <div class="links">
                <b-link class="btn btn-primary btn-sm" href="#/register">Sign up</b-link>
                <b-link class="btn btn-primary btn-sm" href="#/login">Login</b-link>
              </div>
            </template>
          </div>
        </div>

        <div class="card details-card">
          <div class="card-body">
            <h5 class="card-title">{{ $t('lookingFor.skills.title')}}</h5>
            <hr/>
            <ul>
              <li class="inline-item" v-for="s in profile.lookingFor.volunteerSkills" :key="s">
                {{ labSkillsList.find(element => element.value == s ).text }}
              </li>
            </ul>

          </div>
        </div>

        <div class="card details-card">
          <div class="card-body">
            <h5 class="card-title">{{ $t('lookingFor.equipment.title')}}</h5>
            <hr/>
            <ul>
              <li class="inline-item" v-for="s in profile.lookingFor.equipment" :key="s">
                {{ equipmentList.find(element => element.value == s ).text }}
              </li>
            </ul>

            <p v-if="profile.lookingFor.equipmentDescription">{{profile.lookingFor.equipmentDescription}}</p>
            
          </div>
        </div>

        <div class="card details-card">
          <div class="card-body">
            <h5 class="card-title">{{ $t('lookingFor.advice.title')}}</h5>
            <hr/>
            <ul>
              <li class="inline-item" v-for="s in profile.lookingFor.advice" :key="s">
                {{ adviceList.find(element => element.value == s ).text }}
              </li>
            </ul>

            <p v-if="profile.lookingFor.adviceDescription">{{profile.lookingFor.adviceDescription}}</p>
          </div>
        </div>
      
      </div>
      <div class="col-md">

        <div class="card details-card" v-if="profile.description">
          <div class="card-body">
            <h5 class="card-title">{{ $t('other.title')}}</h5>
            <hr/>
            <p>{{ profile.description }}</p>
          </div>
        </div>

        <div class="card details-card">
          <div class="card-body">
            <h5 class="card-title">{{ $t('offers.advice.title')}}</h5>
            <hr/>
            <ul>
              <li class="inline-item" v-for="s in profile.offers.advice" :key="s">
                {{ adviceList.find(element => element.value == s ).text }}
              </li>
            </ul>

            <p v-if="profile.offers.adviceDescription">{{profile.offers.adviceDescription}}</p>
          </div>
        </div>

        <div class="card details-card">
          <div class="card-body">
            <h5 class="card-title">{{ $t('offers.equipment.title')}}</h5>
            <hr/>
            <ul>
              <li class="inline-item" v-for="s in profile.offers.equipment" :key="s">
                {{ equipmentList.find(element => element.value == s ).text }}
              </li>
            </ul>

            <p v-if="profile.offers.equipmentDescription">{{profile.offers.equipmentDescription}}</p>
          </div>
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