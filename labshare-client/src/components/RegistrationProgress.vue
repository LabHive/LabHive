<i18n>
{
  "en": {
    "usergroup": "User Group",
    "loginInformation": "Login Information",
    "qualification": "Qualifications",
    "skills": "Skills",
    "contact_availability": "Contact & Availability",
    "consent": "Optional Consents",
    "affiliation_contact": "Affiliation & Contact",
    "request": "Current Requests",
    "offer": "Current Offers",
    "reset": "Attention!",
    "warning": "All data will be deleted. Do you want to continue anyway?",
    "yes": "Yes",
    "no": "No"
  },
  "de": {
    "usergroup": "Nutzergruppe",
    "loginInformation": "Login Informationen",
    "qualification": "Qualifikation",
    "skills": "Fähigkeiten",
    "contact_availability": "Kontakt & Verfügbarkeit",
    "consent": "Optionale Einwilligung",
    "affiliation_contact": "Affiliation & Kontaktperson",
    "request": "Aktueller Bedarf",
    "offer": "Aktuelles Angebot",
    "reset": "Achtung!",
    "warning": "Es werden alle Daten zurückgesetzt. Trotzdem fortfahren?",
    "yes": "Ja",
    "no": "Nein"
  }
}
</i18n>
<template>
  <div>
    <b-modal
      id="confirm"
      :title="$t('reset')"
      :ok-title="$t('yes')"
      :cancel-title="$t('no')"
      ok-variant="primary"
      @ok="setStep(0)"
    >
      <p class="my-4">{{ $t('warning') }}</p>
    </b-modal>
    <b-container>
      <b-row v-if="role === 'volunteer'">
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(0)" v-b-modal.confirm>1) {{ $t("usergroup") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(1)" @click="setStep(1)">2) {{ $t("loginInformation") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(2)" @click="setStep(2)">3) {{ $t("qualification") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(3)" @click="setStep(3)">4) {{ $t("skills") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(4)" @click="setStep(4)">5) {{ $t("contact_availability") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(5)" @click="setStep(5)">6) {{ $t("consent") }}</b-button></b-col>
      </b-row>
      <b-row v-else-if="role === 'lab_diag'">
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(0)" v-b-modal.confirm>1: {{ $t("usergroup") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(1)" @click="setStep(1)">2) {{ $t("loginInformation") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(2)" @click="setStep(2)">3) {{ $t("affiliation_contact") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(3)" @click="setStep(3)">4) {{ $t("request") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(4)" @click="setStep(4)">5) {{ $t("offer") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(5)" @click="setStep(5)">6) {{ $t("consent") }}</b-button></b-col>
      </b-row>
      <b-row v-else-if="role === 'lab_research'">
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(0)" v-b-modal.confirm>1) {{ $t("usergroup") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(1)" @click="setStep(1)">2) {{ $t("loginInformation") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(2)" @click="setStep(2)">3) {{ $t("affiliation_contact") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(3)" @click="setStep(3)">4) {{ $t("offer") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(4)" @click="setStep(4)">5) {{ $t("consent") }}</b-button></b-col>
      </b-row>
      <b-row v-else>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(0)" >1) {{ $t("usergroup") }}</b-button></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number
    },
    role: {
      type: String
    }
  },
  data() {
    return {
      cache: {}
    }
  },
  computed: {
    step: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  methods: {
    classForStep(i) {
      let cache = this.cache[i] ? this.cache[i]: []
      let res = []

      if (i < this.step) {
        res.push('done');
      }
      
      if (i == this.step) {
        res.push('active');
        res.push('done');
      } 
      
      if (i > this.step) {
        if (cache.indexOf('done') == -1)
          res.push('disabled')
        else 
          res.push('done')
      } 

      this.cache[i] = res;
      return res;
    },
    setStep(i) {
      if (this.step < i && this.cache[i] && this.cache[i].indexOf('done') == -1) return;
      this.step = i
    }
  },
  watch: {
    value(newVal) {
      if (newVal === 0) {
        this.cache = {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.btn {
  border-radius: 100px;
  height: 28px;
  padding: 5px 8px;
  font-weight: normal;
  font-family: "Fira Sans";
  letter-spacing: inherit;
  margin-bottom: 14px;
}

.col-auto {
  padding-right: 8px;
  padding-left: 0px;
}
</style>