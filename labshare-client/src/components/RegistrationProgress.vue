<template>
  <div>
    <b-modal
      id="confirm"
      :title="$t('general.attention')"
      :ok-title="$t('general.yes')"
      :cancel-title="$t('general.no')"
      ok-variant="primary"
      @ok="setStep(0)"
    >
      <p class="my-4">{{ $t('registration.progressResetWarning') }}</p>
    </b-modal>
    <b-container>
      <b-row v-if="role === 'volunteer'">
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(0)" v-b-modal.confirm>1) {{ $t("registration.usergroup") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(1)" @click="setStep(1)">2) {{ $t("registration.steps.loginInformation.title") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(2)" @click="setStep(2)">3) {{ $t("registration.steps.qualification.title") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(3)" @click="setStep(3)">4) {{ $t("registration.steps.skills.title") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(4)" @click="setStep(4)">5) {{ $t("registration.steps.contact.title_volunteer") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(5)" @click="setStep(5)">6) {{ $t("registration.steps.consent.title") }}</b-button></b-col>
      </b-row>
      <b-row v-else-if="role === 'lab_diag'">
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(0)" v-b-modal.confirm>1) {{ $t("registration.usergroup") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(1)" @click="setStep(1)">2) {{ $t("registration.steps.loginInformation.title") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(2)" @click="setStep(2)">3) {{ $t("registration.steps.contact.title") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(3)" @click="setStep(3)">4) {{ $t("profile.request.title") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(4)" @click="setStep(4)">5) {{ $t("profile.offer.title") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(5)" @click="setStep(5)">6) {{ $t("registration.steps.consent.title") }}</b-button></b-col>
      </b-row>
      <b-row v-else-if="role === 'lab_research'">
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(0)" v-b-modal.confirm>1) {{ $t("registration.usergroup") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(1)" @click="setStep(1)">2) {{ $t("registration.steps.loginInformation.title") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(2)" @click="setStep(2)">3) {{ $t("registration.steps.contact.title") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(3)" @click="setStep(3)">4) {{ $t("profile.offer.title") }}</b-button></b-col>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(4)" @click="setStep(4)">5) {{ $t("registration.steps.consent.title") }}</b-button></b-col>
      </b-row>
      <b-row v-else>
        <b-col cols="auto"><b-button variant="primary" :class="classForStep(0)" >1) {{ $t("registration.usergroup") }}</b-button></b-col>
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