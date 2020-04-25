<i18n>
{
  "de": {
    "usergroup": "Nutzergruppe",
    "loginInformation": "Login Informationen",
    "qualification": "Qualifikation",
    "skills": "Fähigkeiten",
    "contact_availability": "Kontakt & Verfügbarkeit",
    "consent": "Optionale Einwilligung"
  }
}
</i18n>
<template>
  <div>
    <b-row v-if="role === 'volunteer'">
      <b-col cols="auto"><b-button variant="primary" :class="classForStep(1)" @click="setStep(1)">{{ $t("usergroup") }}</b-button></b-col>
      <b-col cols="auto"><b-button variant="primary" :class="classForStep(2)" @click="setStep(2)">{{ $t("loginInformation") }}</b-button></b-col>
      <b-col cols="auto"><b-button variant="primary" :class="classForStep(3)" @click="setStep(3)">{{ $t("qualification") }}</b-button></b-col>
      <b-col cols="auto"><b-button variant="primary" :class="classForStep(4)" @click="setStep(4)">{{ $t("skills") }}</b-button></b-col>
      <b-col cols="auto"><b-button variant="primary" :class="classForStep(5)" @click="setStep(5)">{{ $t("contact_availability") }}</b-button></b-col>
      <b-col cols="auto"><b-button variant="primary" :class="classForStep(6)" @click="setStep(6)">{{ $t("consent") }}</b-button></b-col>
    </b-row>
    <b-row v-else-if="role === 'labDiag'">
      <b-col><b-button variant="primary" :class="[classForStep(1)]" >Test 123</b-button></b-col>
    </b-row>
    <b-row v-else-if="role === 'labResearch'">
      <b-col><b-button variant="primary" :class="[classForStep(1)]" >f</b-button></b-col>
    </b-row>
    <b-row v-else>
      <b-col><b-button variant="primary" :class="[classForStep(1)]" >Nutzergruppe</b-button></b-col>
    </b-row>
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
          res.push('future')
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
  }
}
</script>

<style lang="scss" scoped>

.btn {
  border-radius: 100px;
  height: 28px;
  padding: 5px 8px;
}

.future {
  background: #C9E0DF;
  opacity: 0.5;
  box-shadow: none;

  &:hover, &:focus, &:active{
    background: #C9E0DF !important;
    opacity: 0.5 !important;
    box-shadow: none !important;
    cursor: inherit !important;
    color: #0E5145 !important;
  }
}

.col-auto {
  padding-right: 0px;
}
</style>