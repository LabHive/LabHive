<i18n>
    {
    "en":{
    "requestResource": "Request a Resource",
    "requestVolunteerSkills": "Request Volunteer Skills",
    "requestEquipment": "Request Equipment",
    "equipmentDescription": "Description of the Requested Equipment",
    "requestAdvice":"Request Advice and Know-How",
    "adviceDescription": "Description of Requested Advice"
    },
    "de":{
    "requestResource": "Eine Ressource anfragen",
    "requestVolunteerSkills": "Qualifizierte Freiwillige mit Fähigkeiten anfragen",
    "requestEquipment": "Equipment anfragen",
    "equipmentDescription": "Beschreibung des angefragten Equipments",
    "requestAdvice":"Beratung und Know-How anfragen",
    "adviceDescription": "Beschreibung der/s angefragten Beratung/Know-Hows"
    }
    }
</i18n>
<template>
  <div>
    <h2>{{ $t("requestResource") }}</h2>

    <h3>{{ $t("requestVolunteerSkills") }}</h3>
    <CheckboxGroup name="humans" cols="2" :data="labSkills" v-model="lookingFor.volunteerSkills"></CheckboxGroup>

    <h3>{{ $t("requestEquipment") }}</h3>
    <CheckboxGroup name="equip" cols="2" :data="equipment" v-model="lookingFor.equipment"></CheckboxGroup>

    <b-form-group
      id="equipmentDescription"
      :state="val.validDescription(lookingFor.equipmentDescription).valid"
      :invalid-feedback="$t('backend.formValidation.' + val.validDescription(lookingFor.equipmentDescription).err.message)"
    >
      <b-form-textarea
        id="equipmentDescription"
        v-model="lookingFor.equipmentDescription"
        :placeholder="$t('requestEquipmentDescription')"
        rows="4"
        max-rows="10"
        :state="!val.validDescription(lookingFor.equipmentDescription).valid ? false: null"
      ></b-form-textarea>
    </b-form-group>

    <h3>{{ $t("requestAdvice") }}</h3>
    <CheckboxGroup name="advice" cols="2" :data="advices" v-model="lookingFor.advice"></CheckboxGroup>
    <b-form-group
      id="adviceDescription"
      :state="val.validDescription(lookingFor.adviceDescription).valid"
      :invalid-feedback="$t('backend.formValidation.' + val.validDescription(lookingFor.adviceDescription).err.message)"
    >
      <b-form-textarea
        id="adviceDescription"
        v-model="lookingFor.adviceDescription"
        :placeholder="$t('requestAdviceDescription')"
        rows="4"
        max-rows="10"
        :state="!val.validDescription(lookingFor.adviceDescription).valid ? false: null"
      ></b-form-textarea>
    </b-form-group>

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
