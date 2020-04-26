<i18n>
{
  "en": {
    "requestResource": "Request a Resource",
    "requestVolunteerSkills": "Request Volunteer Skills",
    "requestEquipment": "Request Devices and Equipment",
    "requestEquipmentDescription": "More specific information about the equipment you need. How many devices? Which manufacutres work for you?",
    "equipmentDescription": "Description of the requested Devices",
    "requestAdvice":"Request Advice and Know-How",
    "requestAdviceDescription":"More specific information about the topics you need help with.",
    "adviceDescription": "Description of requested Advice"
  },
  "de": {
    "requestResource": "Eine Ressource anfragen",
    "requestVolunteerSkills": "Qualifizierte Freiwillige anfragen",
    "requestEquipment": "Benötigte Geräte/Reagenzien",
    "requestEquipmentDescription": "Genauere Informationen über die benötigten Geräte. Welche Hersteller, Anzahl, etc.",
    "equipmentDescription": "Beschreibung des angefragten Equipments",
    "requestAdvice":"Benötigte Beratung/Know-How",
    "requestAdviceDescription":"Genauere Informationen, über die Themen, bei denen Sie Hilfe gebrauchen",
    "adviceDescription": "Beschreibung der/s angefragten Beratung/Know-Hows"
  }
}
</i18n>
<template>
  <div>
    <h2 v-if="!registration">{{ $t("requestResource") }}</h2>
    <p v-else class="step-info-sub">Bitte geben Sie ihre Kontaktdaten an. Wir teilen personenbezogene Daten wie Name, E-Mail Adresse und Telefonnummer nur mit verfizierten Diagnostikzentren.</p>

    <b-row>
      <b-col sm="*" lg="5" order="1" order-lg="1">
        <h4>{{ $t("requestEquipment") }}</h4>
        <CheckboxGroup name="equip" cols="2" :data="equipment" v-model="lookingFor.equipment"></CheckboxGroup>
      </b-col>

      <b-col sm="*" lg="5" offset-lg="1" order="3" order-lg="2">
        <h4>{{ $t("requestAdvice") }}</h4>
        <CheckboxGroup name="advice" cols="2" :data="advices" v-model="lookingFor.advice"></CheckboxGroup>
      </b-col>

      <b-col sm="*" lg="5" order="2" order-lg="3">
        <b-form-group
          :state="val.validDescription(lookingFor.equipmentDescription).valid"
          :invalid-feedback="$t('backend.formValidation.' + val.validDescription(lookingFor.equipmentDescription).err.message)"
        >
          <b-form-textarea
            v-model="lookingFor.equipmentDescription"
            :placeholder="$t('requestEquipmentDescription')"
            rows="4"
            max-rows="10"
            :state="!val.validDescription(lookingFor.equipmentDescription).valid ? false: null"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
      

      <b-col sm="*" lg="5" offset-lg="1" offset-sm="0" order="4">
        <b-form-group
          :state="val.validDescription(lookingFor.adviceDescription).valid"
          :invalid-feedback="$t('backend.formValidation.' + val.validDescription(lookingFor.adviceDescription).err.message)"
        >
          <b-form-textarea
            v-model="lookingFor.adviceDescription"
            :placeholder="$t('requestAdviceDescription')"
            rows="4"
            max-rows="10"
            :state="!val.validDescription(lookingFor.adviceDescription).valid ? false: null"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
    </b-row>
    

    <b-button variant="primary" @click="$emit('submit')" v-if="showSubmit">Save</b-button>
  </div>
</template>

<script>
import { labSkills, equipment, advices } from "@/../dist-browser/lib/selectLists"
import { Validator } from "@/../dist-browser/lib/validation";
import CheckboxGroup from "@/components/CheckboxGroup"

export default {
  props: {
    value: Object,
    showSubmit: {
      type: Boolean,
      default: true
    },
    registration: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lookingFor: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    },
    val() {
      return Validator;
    },
  },
  data() {
    return {
      labSkills,
      equipment,
      advices
    }
  },
  components: {
    CheckboxGroup
  }
}
</script>

<style scoped>

</style>
