<i18n>
{
  "en": {
    "brand": "LabHive",
    "aboutUs": "About Us",
    "register": "Sign up",
    "login": "Login",
    "profile": "Profile",
    "signOut": "Logout",
    "dataProtection": "Data protection",
    "imprint": "Imprint"
  },
  "de": {
    "brand": "LabHive",
    "aboutUs": "Über uns",
    "register": "Registrieren",
    "login": "Login",
    "profile": "Profil",
    "signOut": "Logout",
    "dataProtection": "Datenschutzerklärung",
    "imprint": "Impressum"
  }
}
</i18n>
<template>
  <div class="main-div">
    <b-navbar toggleable="lg" type="dark" variant="primary" id="navbar">
      <div class="nav-container">
        <b-navbar-brand href="#/">{{ $t("brand") }}</b-navbar-brand>
        <b-navbar-toggle style="float: right" target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#/ueber-uns">{{ $t("aboutUs") }}</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <template v-if="!$authenticated">
              <b-nav-item href="#/register">{{ $t("register") }}</b-nav-item>
              <b-nav-item href="#/login">{{ $t("login") }}</b-nav-item>
            </template>

            <b-nav-item-dropdown v-if="$authenticated" right :text="userName">
              <b-dropdown-item href="#/profile">{{ $t("profile") }}</b-dropdown-item>
              <b-dropdown-item href="#" @click="logout">{{$t("signOut")}}</b-dropdown-item>
            </b-nav-item-dropdown>
            <LocaleChange />
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
    <footer class="footer-custom bg-primary">
      <!-- Copyright -->
      <div class="text-center">
        <img src="./assets/Hackathon_slogan_weiß.png" width="200px" alt="logo wir vs virus hackathon" />
      </div>
      <div class="text-center">
        <b-row style="margin: 0; margin-top: 10px">
          <b-col></b-col>
          <b-col cols="auto">
            <b-link to="dataProtection" class="clink">{{ $t('dataProtection') }}</b-link>
          </b-col>
          <b-col cols="auto">
            <b-link to="imprint" class="clink">{{ $t('imprint') }}</b-link>
          </b-col>
          <b-col></b-col>
        </b-row>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import LocaleChange from "./components/LocaleChange";

export default {
  name: "App",
  components: { LocaleChange },
  computed: {
    userName: function() {
      if (this.$store.state.profile.role) {
        if (this.$store.state.profile.role === "human") {
          return this.$store.state.profile.contact.firstname;
        } else {
          return this.$store.state.profile.name;
        }
      } else {
        return "User";
      }
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

.footer-custom {
  padding: 10px 0;
}

.clink {
  color: rgba(255, 255, 255, 0.5);
}

.clink:hover {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
}

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

.footer-custom {
  box-shadow: 0px -3px 4px 0 rgba(0, 0, 0, 0.3);
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
  padding-left: 15px;
  padding-right: 15px
}

.navbar {
  padding-left: 0;
  padding-right: 0;
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
  margin-top: 20px;
}
</style>
