<i18n>
{
  "en": {
    
    "requestVolunteerSkills": "Request Volunteer Skills",
    "requestEquipment": "Needed Devices/Reagents",
    "requestEquipmentDescription": "More detailed information about the devices required. Manufacturer, quantity, etc.",
    "equipmentDescription": "Description of the requested devices",
    "requestAdvice":"Needed Advice/Know-How",
    "requestAdviceDescription":"More detailed information about the areas in which you need help",
    "adviceDescription": "Description of requested Advice",
    "requestRessource_sub": "If you need resources, you can list them here. You can always change this later in your profile. Click on “Next” below if currently you do not need anything."
  },
  "de": {
    "requestVolunteerSkills": "Qualifizierte Freiwillige anfragen",
    "requestEquipment": "Benötigte Geräte/Reagenzien",
    "requestEquipmentDescription": "Genauere Informationen über die benötigten Geräte. Welche Hersteller, Anzahl, etc.",
    "equipmentDescription": "Beschreibung des angefragten Equipments",
    "requestAdvice":"Benötigte Beratung/Know-How",
    "requestAdviceDescription":"Genauere Informationen über die Themen, bei denen Sie Hilfe benötigen",
    "adviceDescription": "Beschreibung der/s angefragten Beratung/Know-Hows",
    "requestRessource_sub": "Wenn sie Ressourcen benötigen, können Sie diese hier angeben. Sie können dies später jederzeit in ihrem Profil ändern. Klicken sie unten auf “Weiter”, wenn Sie aktuell nichts benötigen."
  }
}
</i18n>
<template>
  <div>
    <p class="step-info-sub" v-if="registration">{{ $t("requestRessource_sub") }}</p>

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
