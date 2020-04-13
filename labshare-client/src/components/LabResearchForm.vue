<i18n>
    {
    "en": {
    "save": "Save"
    },
    "de": {
    "save": "Speichern"
    }
    }
</i18n>

<template>
  <div class="lab_diag-form">
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
        <div v-for="i in updateFormSections" :key="i">
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
  name: "LabDiagForm",
  mixins: [registrationForm],
  data: function() {
    return {
      formData: {
        address: {
          city: "",
          zipcode: "",
          street: ""
        },
        contact: {
          firstname: "",
          lastname: "",
          email: "",
          phone: ""
        },
        organization: "",
        description: "",
        password: "",
        website: "",
        consent: {
          processing: true,
          publicContact: false
        },
        offers: {
          equipment: [],
          advice: [],
          equipmentDescription: "",
          adviceDescription: ""
        }
      },
      formSections: [
        "LoginInformation",
        "PersonalInformation",
        "Lab_Offer",
        "SpecificDLab",
      ],
    };
  },
  computed: {
    updateFormSections() {
      return [
        "LoginInformation",
        "PersonalInformation",
        "SpecificDLab",
      ]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section {
  margin-top: 50px;
}

.forward-enter-active, .forward-leave-active {
  transition: all .2s ease;
}
.forward-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.forward-enter {
  opacity: 0;
  transform: translateX(400px);
}


.back-enter-active, .back-leave-active {
  transition: all .2s ease;
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
