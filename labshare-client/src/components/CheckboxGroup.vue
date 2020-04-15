<i18n>
{
  "en": {
    "bsl1": "Work under BSL1 regulations/safety standards",
    "bsl2": "Work under BSL2 regulations/safety standards",
    "bsl3": "Work under BSL3 regulations/safety standards",
    "bsl4": "Work under BSL4 regulations/safety standards",
    "qpcr": "qPCR",
    "rnaExperience_isolation": "Work with RNA (esp. isolation with kit)",
    "sample_processing": "(Pre-)Processing of clinical samples",
    "elisa": "ELISA",
    "primerProduction": "Primer production",
    "dataAnalysis": "Data analysis",

    "calibratedPipetteSet": "Calibrated pipette set",
    "rtThermocycler": "Thermocycler RT",
    "qpcrThermocycler": "Thermocycler qPCR",
    "primerProduction": "Primer production",
    "reverseTransKit": "Reverse transcriptase kit",
    "pcrMasterMix": "PCR master mix",
    "rnaExtractionDevice": "RNA extraction device",
    "rnaExtractionKit": "RNA extraction kit",

    "virology": "Virology",
    "rnaExperience_isolation": "Work with RNA (esp. isolation with kit)",
    "qPCR": "qPCR in general",
    "elisa": "ELISA",
    "protocolProduction": "Writing of protocols",

    "jobTraining": "Training and Degrees, please select all that apply",
    "mtla": "MTLA",
    "bta_cta": "BTA/CTA",
    "bachelor": "Bachelor (completed)",
    "master": "Master (completed)",
    "doctorate": "PhD-student",
    "postdoc": "Postdoc",
    "groupLeader": "Group leader",
    "other": "Andere"
  },
  "de": {
    "bsl1": "Arbeit unter BSL1 Bedingungen/Sicherheitsstandards",
    "bsl2": "Arbeit unter BSL2 Bedingungen/Sicherheitsstandards",
    "bsl3": "Arbeit unter BSL3 Bedingungen/Sicherheitsstandards",
    "bsl4": "Arbeit unter BSL4 Bedingungen/Sicherheitsstandards",
    "qpcr": "qPCR",
    "rnaExperience_isolation": "Arbeit mit RNA (insbes. Isolation mit Kit)",
    "sample_processing": "Vor/Aufbereitung klinischer Proben",
    "elisa": "ELISA",
    "primerProduction": "Primerherstellung",
    "dataAnalysis": "Datenanalyse",

    "calibratedPipetteSet": "Calibrated Pipette Set",
    "rtThermocycler": "Thermocycler RT",
    "qpcrThermocycler": "Thermocycler qPCR",
    "primerProduction": "Primerherstellung",
    "reverseTransKit": "Reverse Transkriptase-Kit",
    "pcrMasterMix": "PCR Master Mix",
    "rnaExtractionDevice": "RNA-Extraktionsgerät",
    "rnaExtractionKit": "RNA-Extraktionskit",

    "virology": "Virologie",
    "rnaExperience_isolation": "Arbeit mit RNA (insbes. Isolation mit Kit)",
    "qPCR": "Allgemein qPCR",
    "elisa": "ELISA",
    "protocolProduction": "Protokollerstellung",

    "jobTraining": "Ausbildung und Abschlüsse, bitte wählen Sie alle Zutreffenden aus.",
    "mtla": "MTLA",
    "bta_cta": "BTA/CTA",
    "bachelor": "Bachelor (abgeschlossen)",
    "master": "Master (abgeschlossen)",
    "doctorate": "Promotionsstudent*in",
    "postdoc": "Postdoc",
    "groupLeader": "Gruppenleiter*in",
    "other": "Andere"
  }
}
</i18n>
<template>
  <b-form-group :invalid-feedback="$t('required')" :state="valid" valid-feedback="OK">
    <b-container>
      <b-row>
        <template v-for="i in cols_number">
          <b-col sm :key="i">
            <b-form-checkbox-group
              stacked
              :id="name + i"
              v-model="inputVal"
              :options="arrD[i-1]"
              :name="name + i"
              @change="saveChanges"
              v-if="!radio"
              :required="required"
            ></b-form-checkbox-group>
            <b-form-radio-group
              stacked
              :id="name + i"
              v-model="inputVal"
              :options="arrD[i-1]"
              :name="name + i"
              @change="saveChanges"
              :required="required"
              v-else
            ></b-form-radio-group>
          </b-col>
        </template>
      </b-row>
    </b-container>
  </b-form-group>
</template>

<script>
function arraySplitter(array, cols) {
  let aCopy = Array.from(array);
  let result = [];
  for (let i = 0; i < cols; i++) {
    result.push([]);
  }
  let rows = Math.ceil(aCopy.length / cols);

  for (let i = 0; i < cols; i++) {
    if (aCopy.length == 0) break;
    for (let j = 0; j < rows; j++) {
      if (aCopy.length == 0) break;
      result[i].push(aCopy[0]);
      aCopy.splice(0, 1);
    }
  }

  return result;
}

export default {
  props: {
    saveChanges: {
      default: () => {},
      type: Function
    },
    data: Array,
    cols: {
      type: String,
      default: "2"
    },
    name: String,
    value: null,
    radio: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cols_number: parseInt(this.cols)
    };
  },
  methods: {

  },
  computed: {
    translatedData() {
      return this.data.map((x) => {
        x.text = this.$t(x.value)
        return x
      })
    },
    arrD() {
      return arraySplitter(this.translatedData, this.cols);
    },
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    valid() {
      if (!this.required) {
        return null
      }
      if (this.value === "" || (typeof this.value === "object" && this.value.length === 0)) {
        return false
      }
      return true
    }
  }
};
</script>
