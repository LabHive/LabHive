<template>
  <div class="main-div">
    <nav class="navbar navbar-expand-lg navbar-light navbar-custom">
      <a class="navbar-brand" href="#"><img height="40px" src="./assets/logo.svg"/>LabShare</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item active">
            <router-link to="/register" class="nav-link">Registrieren</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/ueber-uns" class="nav-link">Über uns</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="content container-fluid">
      <div id="app">
        <router-view ></router-view>
      </div>
    </div>
    <!-- Footer -->
    <footer class="footer-custom">

      <!-- Copyright -->
      <div class="footer-copyright text-center py-3"><img src="./assets/wirvsvirus.png" alt="logo wir vs virus hackathon" />
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
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

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
$color-blue: #2c3e50;
$color-brand--primary: #99cccc;
$color-brand--secondary: #224D4D;
$color-white: #f2f2f2;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-blue;
}

body {
  display:flex;
  flex-direction:column;
  height:100vh;
}

.navbar-custom{
background-color: $color-brand--primary;

  .navbar-brand {
    color: $color-white;
    text-transform: uppercase;
    letter-spacing: 4px;
    font-weight: bold;
    font-size: 18px;
    line-height: 40px;
  }
}

.content {
  flex: 1;
}

.footer-custom {
  background-color:$color-brand--primary;
}

.main-div{
  height:100%;
  display: flex;
  flex-direction: column;
}

.welcome_text {
  text-align: left;
  margin-top: 30px;
}

%btn-primary-custom {
  background-color: $color-brand--secondary;
  border-color: lighten($color-brand--secondary, 10%);

  &:hover {
    background-color: darken($color-brand--secondary, 10%);
  border-color: $color-brand--secondary;
  }
}

.btn-primary-custom {
  @extend %btn-primary-custom;
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
  @extend .btn-primary-custom
}

</style>
