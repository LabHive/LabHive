<template>
  <div>
    <h3 class="section">{{ $t("volunteerSkills") }}</h3>
    <CheckboxGroup name="skills" :data="labSkills" v-model="formData.details.skills"></CheckboxGroup>

    <h3 class="section">Weitere Informationen</h3>
    <b-form-group
      id="description"
      :state="val.validDescription(formData.description).valid"
      :invalid-feedback="$t('backend.formValidation.' + val.validDescription(formData.description).err.message)"
    >
      <b-form-textarea
        id="textarea"
        v-model="formData.description"
        placeholder="Weitere Informationen..."
        rows="4"
        max-rows="10"
        :state="!val.validDescription(formData.description).valid ? false: null"
      ></b-form-textarea>
    </b-form-group>

    <h3 class="section">Optionale Einwilligung</h3>
    <fieldset class="form-group">
      <div tabindex="-1" role="group" class="bv-no-focus-ring">
        <div class="custom-control custom-checkbox">
          <input
            id="processing"
            type="checkbox"
            name="processing"
            autocomplete="off"
            class="custom-control-input"
            v-model="formData.consent.publicContact"
          />
          <label for="processing" class="custom-control-label" v-html="$t('consentPublicContact')"></label>
        </div>
      </div>
    </fieldset>

    <template v-if="!profileUpdate">
      <NavButtons :disableSubmit="disableSubmit" :final="true"></NavButtons>
    </template>
  </div>
</template>

<script>
import registrationSection from "@/mixins/registrationSection";
import { labSkills } from "@/../dist-browser/lib/selectLists";
import CheckboxGroup from "@/components/CheckboxGroup";

export default {
  mixins: [registrationSection],
  data() {
    return {
      labSkills
    };
  },
  components: {
    CheckboxGroup
  }
};
</script>