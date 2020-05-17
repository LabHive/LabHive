<template>
  <b-button variant="primary" class="lh-button" v-bind:class="{ active: active }" @click="click">{{ text }}</b-button>
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

.lh-button {
  margin-bottom: 0;
}
</style>
