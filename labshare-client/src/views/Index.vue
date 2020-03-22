<template>
  <div class="index">
      <div class="container">
        <div class="row">
          <div class="col-4 offset-4">
            <img class="img-fluid" src="../assets/logo.svg" />
          </div>
          <div class="col-4"></div>
          <div class="col-sm d-flex justify-content-center m-5">
            <div class="btn-group" role="group" aria-label="Basic example">
              <router-link to="/login" class="btn btn-primary btn-primary-custom btn-lg">
                  Login
              </router-link>
              <router-link to="/register" class="btn btn-primary btn-primary-custom btn-lg">
                  Register
              </router-link>
            </div>
          </div>
        </div>
      </div>

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
  .container {
    padding-top: 40px;
  }
</style>
