<i18n>
{
  "en": {
    "brand": "LabHive",
    "aboutUs": "About Us",
    "register": "Sign up",
    "login": "Login",
    "profile": "Profile",
    "changePassword": "Change Password",
    "signOut": "Logout",
    "dataProtection": "Data protection",
    "imprint": "Imprint",
    "requestResource": "Request Resources",
    "search": "Search"
  },
  "de": {
    "brand": "LabHive",
    "aboutUs": "Über uns",
    "register": "Registrieren",
    "login": "Login",
    "profile": "Profil",
    "changePassword": "Passwort ändern",
    "signOut": "Logout",
    "dataProtection": "Datenschutzerklärung",
    "imprint": "Impressum",
    "requestResource": "Bedarfsanfrage",
    "search": "Suche"
  }
}
</i18n>
<template>
  <div class="main-div">
    <b-navbar toggleable="lg" id="navbar">
      <div class="container">
        <b-navbar-brand href="#/">
          <img src="./assets/logo-green.svg" alt="LabHive" width="161" />
        </b-navbar-brand>
        <b-navbar-toggle style="float: right" target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#/ueber-uns">{{ $t("aboutUs") }}</b-nav-item>
            <b-nav-item href="#/search">{{ $t("search") }}</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <template v-if="!$authenticated">
              <b-nav-item href="#/register">{{ $t("register") }}</b-nav-item>
              <b-nav-item href="#/login">{{ $t("login") }}</b-nav-item>
            </template>

            <b-nav-item-dropdown v-if="$authenticated" right :text="userName">
              <b-dropdown-item href="#/profile">{{ $t("profile") }}</b-dropdown-item>
              <b-dropdown-item v-if="$user.role == 'lab_diag' || $user.role == 'lab_research'" href="#/offer">{{ $t("offerRessource") }}</b-dropdown-item>
              <b-dropdown-item v-if="$user.role == 'lab_diag'" href="#/request">{{ $t("requestRessource") }}</b-dropdown-item>
              <b-dropdown-item href="#/change-password">{{ $t("changePassword") }}</b-dropdown-item>
              <b-dropdown-item href="#" @click="logout">{{ $t("signOut") }}</b-dropdown-item>
            </b-nav-item-dropdown>
            <LocaleChange />
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    
    <div class="content container" v-bind:class="{ has_banner: $route.fullPath === '/' }">
      <div id="app">
        <router-view></router-view>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="footer-custom">
      <b-container>
        <b-row>
          <b-col cols lg="4" md="4" sm="12" class="copyright align-self-center">
            &copy; LabHive 2020
          </b-col>
          <b-col cols lg="4" md="4" sm="12" class="text-center align-self-center">
            <b-link to="dataProtection" class="clink">{{ $t('dataProtection') }}</b-link>
            <b-link to="imprint" class="clink">{{ $t('imprint') }}</b-link>
          </b-col>
          <b-col cols lg="4" md="4" sm="12" class="logo">
            <img src="./assets/logo-footer.svg" alt="Wirus Virus Projekt" width="192" height="66" />
          </b-col>
        </b-row>
      </b-container>
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
  mounted() {
    window.onscroll = function() {
      const navbar = document.getElementById('navbar');
      let className = navbar.className.replace('sticky', '');
      
      if (window.scrollY > 0) {
         className = className + ' sticky ';
      }

      navbar.className = className;
    };
  },
  computed: {
    userName: function() {
      if (this.$user.role) {
        if (this.$user.role === "volunteer") {
          return this.$user.contact.firstname;
        } else {
          return this.$user.organization;
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

$color-bkg-primary: #F7F6FD;
$color-green: #177867;

body {
  font-family: 'Fira Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  flex-direction: column;
  font-size: 14px;
  display: flex;
  height: 100vh;
  color: #000;
}

.clink {
  color: rgba(255, 255, 255, 0.5);
}

.clink:hover {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
}

#app {
  margin-top: 1em;
  margin-bottom: 3em;
}

.main-div {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 67px;
}

.content {
  flex: 1;
  margin-top: 20px;
}

#navbar, .footer-custom {
  background: $color-bkg-primary;
  position: relative;

  a {
    color: #000;
    text-transform: uppercase;

    &:hover {
      color: $color-green;
    }
  }

  &:after {
    left: 0;
    right: 0;
    top: 100%;
    content: '';
    height: 1px;
    margin-top: -1px;
    position: absolute;
    background: linear-gradient(270.04deg, rgba(218, 218, 218, 0) 0%, #DADADA 50.23%, rgba(218, 218, 218, 0) 100.45%);
  }

  .logo {
    text-align: right;
  }

  @media (max-width: 767px) {
    .copyright, .logo { 
      text-align: center; 
      padding: 10px 0;
    }
  }
}

#navbar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 20;

  a {
    margin-left: 10px;
    margin-right: 10px;
  }

  &.sticky {
    background: #fff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
  }
}

.footer-custom {
  padding: 8px 0;

  &:after {
    top: 1px;
  }

  a + a {
    margin-left: 40px;
  }
}

.has_banner {
  margin-top: 0;
  max-width: none;
  padding: 0;

  #app {
    margin: 0;
  }

  h3 {
    font-weight: normal;
    font-size: 22px;
    line-height: 1.81;
    margin: 0 0 45px;
  }
}

</style>
