<i18n>
{
  "en": {
    "optIn": "Optional Consents"
  },
  "de": {
    "optIn": "Optionale Einwilligungen",
    "disclaimer": "Ob Sie als Freiwillige:r in Diagnostikzentren arbeiten dürfen, bzw. freigestellt werden, müssen Sie eigenverantwortlich mit Ihrem Arbeitgeber klären. Wenn Sie von einem Diagnostikzentrum angefragt werden, obliegt die Arbeitsrechtliche Regelung Ihnen, Ihrem Arbeitgeber und dem betreffenden Diagnostikzentrum. LabHive übernimmt hier keine Verantwortung."
  }
}
</i18n>
<template>
  <div>
    <h3 class="section" v-if="profileUpdate">{{ $t("optIn") }}</h3>

    <b-row>
      <b-col sm="*" :md="5*2" :lg="4*2">
        <p v-html="$t('consentMail')"></p>
        <b-form-group
          :state="formData.consent.mailUpdates !== null"
          :invalid-feedback="$t('required')"
          :valid-feedback="'OK'"
        >
          <b-form-radio
            @change="$root.$emit('inputForm_changed')"
            v-model="formData.consent.mailUpdates"
            name="mailUpdates"
            :value="true"
          >{{ $t('agree') }}</b-form-radio>
          <b-form-radio
            @change="$root.$emit('inputForm_changed')"
            v-model="formData.consent.mailUpdates"
            name="mailUpdates"
            :value="false"
          >{{ $t('not_agree') }}</b-form-radio>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="*" :md="5*2" :lg="4*2">
        <p v-html="$t('consentPublicSearch')"></p>
        <b-form-group
          :state="formData.consent.publicSearch !== null"
          :invalid-feedback="$t('required')"
          :valid-feedback="'OK'"
        >
          <b-form-radio
            @change="$root.$emit('inputForm_changed')"
            v-model="formData.consent.publicSearch"
            name="publicSearch"
            :value="true"
          >{{ $t('agree') }}</b-form-radio>
          <b-form-radio
            @change="$root.$emit('inputForm_changed')"
            v-model="formData.consent.publicSearch"
            name="publicSearch"
            :value="false"
          >{{ $t('not_agree') }}</b-form-radio>
        </b-form-group>
      </b-col>
    </b-row>


    <template v-if="!profileUpdate">
      <b-row style="margin-bottom: -50px; margin-top: 30px;">
        <b-col sm="*" :md="5*2" :lg="4*2">
          <p style="font-size: 12px; color: rgba(0, 0, 0, 0.75);">
            {{ $t("disclaimer") }}
          </p>
        </b-col>
      </b-row>
      <NavButtons :disableSubmit="disableSubmit"></NavButtons>
    </template>
  </div>
</template>

<script>
import registrationSection from "@/mixins/registrationSection";
import { labSkills, qualification } from "@/../dist-browser/lib/selectLists";

export default {
  mixins: [registrationSection],
  data() {
    return {
      labSkills,
      qualification
    };
  },
};
</script>
