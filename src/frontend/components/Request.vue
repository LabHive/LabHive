<template>
  <div>
    <p class="step-info-sub" v-if="registration">{{ $t("profile.request.subTitle") }}</p>

    <b-row>
      <b-col sm="*" lg="5" order="1" order-lg="1">
        <h4>{{ $t("profile.request.equipment") }}</h4>
        <CheckboxGroup name="equipment" cols="2" :data="equipment" v-model="lookingFor.equipment"></CheckboxGroup>
      </b-col>

      <b-col sm="*" lg="5" offset-lg="1" order="3" order-lg="2">
        <h4>{{ $t("profile.request.advice") }}</h4>
        <CheckboxGroup name="advice" cols="2" :data="advices" v-model="lookingFor.advice"></CheckboxGroup>
      </b-col>

      <b-col sm="*" lg="5" order="2" order-lg="3">
        <b-form-group
          :state="val.validDescription(lookingFor.equipmentDescription).valid"
          :invalid-feedback="$t('backend.formValidation.' + val.validDescription(lookingFor.equipmentDescription).err.message)"
        >
          <b-form-textarea
            v-model="lookingFor.equipmentDescription"
            :placeholder="$t('profile.request.equipmentDescription')"
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
            :placeholder="$t('profile.request.adviceDescription')"
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
import { labSkills, equipment, advices } from "@lib/selectLists"
import { Validator } from "@lib/validation";
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
