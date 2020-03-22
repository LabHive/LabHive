<template>
  <div class="main-div">
    <nav class="navbar navbar-expand-lg navbar-light navbar-custom">
      <a class="navbar-brand" href="#">LabShare</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ueber-uns" class="nav-link">Über uns</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="content container-fluid">
      <div class="weclome_text" id="app">
        <h1 class="display-4">Wilkommen bei LabShare !</h1>
        <p class="lead">Wir unterstützen diagnostischen Labore, Wissenschaftler und technische Mitarbeiter bei der Verbesserung ihrer COVID-19 Diagnostik. 
    LabShare fördert die Kommunikation und verbindet</p>
          <ul>
            <li>Hilfsbereite Wissenschaftler und Technische Mitarbeiter mit dem nächstgelegenen Labor, welches Unterstützung sucht </li>
            <lI>Labore mit Laboren zum Austausch von Geräten</li>
            <li>Labore mit Wissenschaftlern mit spezialisiertem Know-How </li>
          </ul>
        <hr class="my-4">
        <router-view ></router-view>
      </div>
    </div>    
    <!-- Footer -->
    <footer class="footer-custom">

      <!-- Copyright -->
      <div class="footer-copyright text-center py-3">#WirVsVirus Hackathon 2020
      </div>
      <!-- Copyright -->

    </footer>
    <!-- Footer -->
  </div>
</template>

<script>
import 'primevue/resources/themes/nova-dark/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// TODO: remove this
// just an example
import { Validator } from '../dist-browser/lib/validation'
Validator.validateFirstname("test")

export default {
  name: "App",
  components: {}
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  display:flex;
  flex-direction:column;
  height:100vh;
}

.navbar-custom{
background-color:#99cccc;
}


.content {
  flex: 1;
  padding:20px;
}

.footer-custom {
  background-color:#99cccc;
}


.main-div{
  height:100%;
  display:flex;
  flex-direction: column;
}

.welcome_text {
  text-align:left;
}

.btn-primary-custom {
  background-color:#FFAA00;
  border-color:#FFD703;
}

.btn-primary-custom:hover {
  background-color:rgb(250, 193, 78);
  border-color:#FFD703;
}


.img-fluid {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.checkbox-group {
  &.checkbox--inline {
    display: flex;
    flex-flow: row wrap;

    .checkbox:not(:last-child) {
      margin-right: 1rem;
    }
  }
}

.checkbox {
  display: flex;
  justify-content: flex-start;
}

.p-dropdown {
  width: 100%;
  text-align: left;
}

.form-element-spacer {
  margin-bottom: 2rem;
}

.p-float-label {
  input {
    width: 100%;
  }
}

body .p-button {
  background-color:#FFAA00;
  border-color:#FFD703;
}

body .p-button:enabled:hover {
  background-color:rgb(250, 193, 78);
  border-color:#FFD703;
}
</style>
