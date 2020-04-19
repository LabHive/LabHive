<i18n>
{
  "en": {
    "defaultTitle": "Volunteer",
    "contactDetails": {
      "title": "Contact Details"
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
    "defaultTitle": "Freiwillige"
  }
}
</i18n>

<template>
  <div class="details-view">
    <h1 class="mt-4">{{ title || $t('defaultTitle') }}</h1>

    <div class="row">
      <div class="col-md">

        <div class="card details-card">
          <div class="card-body">
            <h5 class="card-title">{{ $t('contactDetails.title')}}</h5>
            <hr/>
            <template v-if="$authenticated">
            </template>
            <template v-else>
              <p class="card-text">Contact details are only avilable to registered users.</p>
              <div class="links">
                <b-link class="btn btn-primary btn-sm" href="#/register">Sign up</b-link>
                <b-link class="btn btn-primary btn-sm" href="#/login">Login</b-link>
              </div>
            </template>
          </div>
        </div>

        <div class="card details-card">
          <div class="card-body">
            <h5 class="card-title">{{ $t('skills.title')}}</h5>
            <hr/>
            <ul>
              <li class="inline-item" v-for="s in profile.details.skills" :key="s">
                {{ labSkillsList.find(element => element.value == s ).text }}
              </li>
            </ul>
          </div>
        </div>
      
      </div>
      <div class="col-md">

        <div class="card details-card">
          <div class="card-body">
            <h5 class="card-title">{{ $t('qualifications.title')}}</h5>
            <hr/>
            <ul>
              <li class="inline-item" v-for="q in profile.details.qualifications" :key="q">
                {{ qualificationList.find(element => element.value == q ).text }}
              </li>
            </ul>
          </div>
        </div>

        <div class="card details-card">
          <div class="card-body">
            <h5 class="card-title">{{ $t('other.title')}}</h5>
            <hr/>
            <p>{{ profile.description }}</p>
          </div>
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
      title: null,
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