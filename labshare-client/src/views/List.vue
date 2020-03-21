<template>
  <div class="list-view">
    <h1>List</h1>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {},
  computed: {
      data: function() {
          return this.$store.getters.listData
      }
  },
  data: function() {
    return {

    };
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
