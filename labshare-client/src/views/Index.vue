<template>
  <b-container class="container">
    <b-row>
      <b-col></b-col>
      <b-col cols="4">
        <img class="img-fluid" src="../assets/logo.svg" />
      </b-col>
    </b-row>
    <Map />
  </b-container>
</template>

<script>
import Map from "../components/Map";

export default {
  name: "Index",
  props: {},
  components: { Map }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
