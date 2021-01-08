
<template>
  <span>{{ html }}</span>
</template>

<script>

export default {
  name: "Sanitize",
  props: {
    html: {
      required: true,
      type: String
    }
  }
}

</script>