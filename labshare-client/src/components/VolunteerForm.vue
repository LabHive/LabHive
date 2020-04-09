<i18n>
{
  "en": {},
  "de": {
    "address": "Wohnort",
    "competencies": "Fähigkeiten",
    "organization": "Organisation",
    "skills": "Erfahrungen in folgenden Bereichen",
    "bsl2": "Arbeit unter BSL2 Regulationen/Sicherheitsstandards",
    "bsl3": "Arbeit unter BSL3 Regulationen/Sicherheitsstandards",
    "sample_processing": "Vor/Aufbereitung klinischer Proben",
    "rna_isolation": "RNA isolation (Mit Kit)",
    "qpcr": "qPCR",
    "sample_collection": "Klinische Erfahrung (Probenkollektion)"
  }
}
</i18n>
<template>
  <div class="volunteer-form">
    <b-form @submit="submit">
      <template v-if="!profileUpdate">
        <transition :name="transition" mode="out-in">
          <component
            :is="formSection"
            v-model="formData"
            :role="role"
            @nextState="nextFormSection"
            @previousState="previousFormSection"
            :profileUpdate="profileUpdate"
            @submit="submit"
          ></component>
        </transition>
      </template>

      <template v-else>
        <div v-for="i in formSections" :key="i">
          <component
            :is="i"
            v-model="formData"
            :role="role"
            @nextState="nextFormSection"
            @previousState="previousFormSection"
            :profileUpdate="profileUpdate"
          ></component>
        </div>
        <b-button variant="primary" @click="submit" :disabled="disableSubmit">{{ $t("save") }}</b-button>
      </template>
      
    </b-form>
  </div>
</template>

<script>
import registrationForm from "@/mixins/registrationForm";

export default {
  name: "VolunteerForm",
  mixins: [registrationForm],
  data: function() {
    return {
      formData: {
        address: {
          city: "",
          zipcode: ""
        },
        contact: {
          email: "",
          phone: "",
          firstname: "",
          lastname: ""
        },
        password: "",
        description: "",
        details: {
          skills: [],
          qualification: ""
        },
        organization: "",
        availability: true,
        consent: {
          processing: true,
          publicContact: false
        }
      },
      formSections: [
        "LoginInformation",
        "PersonalInformation",
        "SpecificVolunteer"
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section {
  margin-top: 50px;
}

.forward-enter-active,
.forward-leave-active {
  transition: all 0.2s ease;
}
.forward-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.forward-enter {
  opacity: 0;
  transform: translateX(400px);
}

.back-enter-active,
.back-leave-active {
  transition: all 0.2s ease;
}
.back-leave-to {
  opacity: 0;
  transform: translateX(400px);
}

.back-enter {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
