<template>
  <div class="index">
      <div class="container">
        <div class="row">
          <div class="col-sm-auto">
            <h1 class="display-4">Wilkommen bei LabShare !</h1>
            <p class="lead">Wir unterstützen diagnostischen Labore, Wissenschaftler und technische Mitarbeiter bei der Verbesserung ihrer COVID-19 Diagnostik.
    LabShare fördert die Kommunikation und verbindet</p>
            <ul>
              <li>Hilfsbereite Wissenschaftler und Technische Mitarbeiter mit dem nächstgelegenen Labor, welches Unterstützung sucht </li>
              <lI>Labore mit Laboren zum Austausch von Geräten</li>
              <li>Labore mit Wissenschaftlern mit spezialisiertem Know-How </li>
            </ul>
            <hr class="my-4">
          </div>
        </div>
        <div class="row justify-content-md-center">
          <div class="col-sm-2">
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

</style>
