<i18n>
{
  "en": {
    
  },
  "de": {
    
  }
}
</i18n>

<template>
  <button class="lh-button" v-bind:class="{ active: active }" @click="click">{{ text }}</button>
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'input'
  },
  props: {
    text: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ""
    }
  },
  computed: {
    active: {
      get() {
        return this.model === this.value
      },
      set(newValue) {
        let payload = ""
        if (newValue === true) {
          payload = this.value
        }

        this.$emit('input', payload)
        this.$emit('change', payload)
          
      }
    }
  },
  methods: {
    click() {
      this.active = !this.active
    },
  }
};
</script>

<style lang="scss" scoped>
$color-green: #177867;
$color-bkg-primary: #f7f6fd;

.lh-button {
  padding: 12px 24px;
  background: #d9f0ef;
  border-radius: 4px;
  border: 0;
  outline: none;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  color: #177867;

  &.active {
    background: #177867;
    color: #fff;
  }
}
</style>
