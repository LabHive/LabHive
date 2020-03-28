<template>
  <div class="main-div">
    <b-navbar toggleable="lg" type="dark" variant="primary" id="navbar">
      <div class="nav-container">
        <b-navbar-brand href="#/">LabHive</b-navbar-brand>
        <b-navbar-toggle style="float: right" target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#/UeberUns">Über uns</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <template v-if="!loggedIn">
              <b-nav-item href="#/register">Registrieren</b-nav-item>
              <b-nav-item href="#/login">Login</b-nav-item>
            </template>
          
            <b-nav-item-dropdown v-if="loggedIn" right text="User">
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>

    <div class="content container">
      <div id="app">
        <router-view></router-view>
      </div>
    </div>
    <!-- Footer -->
    <footer class="footer-custom">
      <!-- Copyright -->
      <div class="footer-copyright text-center py-3">
        <img src="./assets/wirvsvirus.png" alt="logo wir vs virus hackathon" />
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "App",
  components: {},
  computed: {
    loggedIn: function() {
      return this.$store.getters.authenticated;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="scss">
$color-blue: #2c3e50;
$color-brand--primary: #0069d9;
$color-brand--secondary: #0069d9;
$color-white: #fff;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  margin-top: 1em;
  margin-bottom: 3em;
}

#navbar {
  box-shadow: 0px 3px 4px 0 rgba(0, 0, 0, 0.3);
}

body {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.container {
  max-width: 800px;
}

.nav-container {
  max-width: 800px;
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}

.navbar-custom {
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

.main-div {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.footer-custom {
  background-color: $color-brand--primary;
}




</style>
