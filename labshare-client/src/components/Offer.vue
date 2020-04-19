<i18n>
    {
    "en":{
    "offerResource": "Offer a resource",
    "offerEquipment": "Offer devices and reagents",
    "offerEquipmentDescription": "Further information about the devices you can offer. Manufacturer, website of the devices, quantity, etc.",
    "offerAdvice": "Offer advice and know-how",
    "offerAdviceDescription": "Further information about the help you can offer."
    },
    "de":{
    "offerResource": "Ressourcen abgeben",
    "offerEquipment": "Geräte und Reagenzien anbieten",
    "offerEquipmentDescription": "Weiter Informationen über die abzugebenen Geräte. Hersteller, Website des Herstellers, Anzahl der Geräte, etc.",
    "offerAdvice": "Beratung und Know-How anbieten",
    "offerAdviceDescription": "Weitere Informationen, wie Sie Hilfe anbieten können."
    }
    }
</i18n>
<template>
  <div>
    <h2>{{ $t("offerResource") }}</h2>
    <h3>{{ $t("offerEquipment") }}</h3>
    <CheckboxGroup name="equip" cols="2" :data="equipment" v-model="offers.equipment"></CheckboxGroup>
    <b-form-group
      id="equipmentDescription"
      :state="val.validDescription(offers.equipmentDescription).valid"
      :invalid-feedback="$t('backend.formValidation.' + val.validDescription(offers.equipmentDescription).err.message)"
    >
      <b-form-textarea
        id="equipmentDescription"
        v-model="offers.equipmentDescription"
        :placeholder="$t('offerEquipmentDescription')"
        rows="4"
        max-rows="10"
        :state="!val.validDescription(offers.equipmentDescription).valid ? false: null"
      ></b-form-textarea>
    </b-form-group>


    <h3>{{ $t("offerAdvice") }}</h3>
    <CheckboxGroup name="advice" cols="2" :data="advices" v-model="offers.advice"></CheckboxGroup>
    <b-form-group
      id="adviceDescription"
      :state="val.validDescription(offers.adviceDescription).valid"
      :invalid-feedback="$t('backend.formValidation.' + val.validDescription(offers.adviceDescription).err.message)"
    >
      <b-form-textarea
        id="adviceDescription"
        v-model="offers.adviceDescription"
        :placeholder="$t('offerAdviceDescription')"
        rows="4"
        max-rows="10"
        :state="!val.validDescription(offers.adviceDescription).valid ? false : null"
      ></b-form-textarea>
    </b-form-group>

    <b-button variant="primary" @click="$emit('submit')" v-if="showSubmit">Save</b-button>
  </div>
</template>

<script>
import {
  labSkills,
  equipment,
  advices
} from "@/../dist-browser/lib/selectLists";
import { Validator } from "@/../dist-browser/lib/validation";
import CheckboxGroup from "@/components/CheckboxGroup";

export default {
  props: {
    value: Object,
    showSubmit: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    offers: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    },
    val() {
      return Validator;
    }
  },
  data() {
    return {
      labSkills,
      equipment,
      advices
    };
  },
  components: {
    CheckboxGroup
  }
};
</script>
