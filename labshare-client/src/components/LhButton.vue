<i18n>
{
  "en": {
    
  },
  "de": {
    
  }
}
</i18n>

<template>
	<button class="lh-button" v-bind:class="{ active: active }" @click="$emit('click')">
		{{ text }}
	</button>
</template>

<script>
export default {
  props: {
    text: {
		type: String,
		required: true,
    },
    active: {
		type: Boolean,
		default: false,
    }
  },
};
</script>

<style lang="scss" scoped>
$color-green: #177867;
$color-bkg-primary: #f7f6fd;

.lh-button {
  padding: 12px 24px;
  background: #D9F0EF;
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
