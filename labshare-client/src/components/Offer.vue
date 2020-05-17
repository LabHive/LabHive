<template>
  <div>
    <p class="step-info-sub" v-if="registration">{{ $t('profile.offer.subTitle') }}</p>

    <b-row>
      <b-col sm="*" lg="5" order="1" order-lg="1">
        <h4>{{ $t('profile.offer.equipment') }}</h4>
        <CheckboxGroup name="equipment" cols="2" :data="equipment" v-model="offers.equipment"></CheckboxGroup>
      </b-col>

      <b-col sm="*" lg="5" offset-lg="1" order="3" order-lg="2">
        <h4>{{ $t('profile.offer.advice') }}</h4>
        <CheckboxGroup name="advice" cols="2" :data="advices" v-model="offers.advice"></CheckboxGroup>
      </b-col>

      <b-col sm="*" lg="5" order="2" order-lg="3">
        <b-form-group
          :state="val.validDescription(offers.equipmentDescription).valid"
          :invalid-feedback="$t('backend.formValidation.' + val.validDescription(offers.equipmentDescription).err.message)"
        >
          <b-form-textarea
            v-model="offers.equipmentDescription"
            :placeholder="$t('profile.offer.equipmentDescription')"
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
            :placeholder="$t('profile.offer.adviceDescription')"
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
