<template>
  <div class="index">
      <h1>Index</h1>
      <router-link to="/login">
          <img class="img-fluid" src="https://via.placeholder.com/100x100?text=icon-login" />
      </router-link>
      <router-link to="/register">
          <img class="img-fluid" src="https://via.placeholder.com/100x100?text=icon-register" />
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {

  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
