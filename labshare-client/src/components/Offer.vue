<i18n>
{
  "en": {
    "offerEquipment": "Offered Devices/Materials",
    "offerEquipmentDescription": "More detailed information about the devices/materials you can offer. Link to offered item on manufacturer website, order no, quantity, description, etc.",
    "offerAdvice": "Offered Advice/Know-How",
    "offerAdviceDescription": "More detailed information on the areas in which you can offer help",
    "offerRessource_sub": "If you can offer resources, you can enter them here. You can always change this later in your profile. Click on “Next” below if you do not have anything to share at present."
  },
  "de": {    
    "offerEquipment": "Anzubietende Geräte/Materialien",
    "offerEquipmentDescription": "Genauere Informationen über die angebotenden Geräte/Materialien. Link zum Produkt auf der Hersteller-Website, Bestellnummer, Anzahl, Beschreibung, etc.",
    "offerAdvice": "Anzubietende Beratung/Know-How",
    "offerAdviceDescription": "Genauere Informationen über die Themen, zu denen Sie Hilfe anbieten können",
    "offerRessource_sub": "Wenn Sie Ressourcen abzugeben haben, können Sie diese hier angeben. Sie können dies später jederzeit in Ihrem Profil ändern. Klicken Sie unten auf “Weiter”, wenn Sie aktuell nichts abgeben können."
  }
}
</i18n>
<template>
  <div>
    <p class="step-info-sub" v-if="registration">{{ $t("offerRessource_sub") }}</p>

    <b-row>
      <b-col sm="*" lg="5" order="1" order-lg="1">
        <h4>{{ $t("offerEquipment") }}</h4>
        <CheckboxGroup name="equip" cols="2" :data="equipment" v-model="offers.equipment"></CheckboxGroup>
      </b-col>

      <b-col sm="*" lg="5" offset-lg="1" order="3" order-lg="2">
        <h4>{{ $t("offerAdvice") }}</h4>
        <CheckboxGroup name="advice" cols="2" :data="advices" v-model="offers.advice"></CheckboxGroup>
      </b-col>

      <b-col sm="*" lg="5" order="2" order-lg="3">
        <b-form-group
          :state="val.validDescription(offers.equipmentDescription).valid"
          :invalid-feedback="$t('backend.formValidation.' + val.validDescription(offers.equipmentDescription).err.message)"
        >
          <b-form-textarea
            v-model="offers.equipmentDescription"
            :placeholder="$t('offerEquipmentDescription')"
            rows="4"
            max-rows="10"
            :state="!val.validDescription(offers.equipmentDescription).valid ? false: null"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
      

      <b-col sm="*" lg="5" offset-lg="1" offset-sm="0" order="4">
        <b-form-group
          :state="val.validDescription(offers.adviceDescription).valid"
          :invalid-feedback="$t('backend.formValidation.' + val.validDescription(offers.adviceDescription).err.message)"
        >
          <b-form-textarea
            v-model="offers.adviceDescription"
            :placeholder="$t('offerAdviceDescription')"
            rows="4"
            max-rows="10"
            :state="!val.validDescription(offers.adviceDescription).valid ? false: null"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
    </b-row>


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
    },
    registration: {
      type: Boolean,
      default: false
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
