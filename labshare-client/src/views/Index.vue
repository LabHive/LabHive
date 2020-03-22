<template>
  <div class="index">
      <div class="container">
        <div class="row">
          <div class="col-sm">
          </div>
          <div class="col-sm">
            <div class="btn-group" role="group" aria-label="Basic example">
              <router-link to="/register" class="btn btn-primary btn-primary-custom btn-lg">
                  Login
              </router-link>
              <router-link to="/register" class="btn btn-primary btn-primary-custom btn-lg">
                  Register
              </router-link>
            </div>
          </div>
          <div class="col-sm">
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

</style>
