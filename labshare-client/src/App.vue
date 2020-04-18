<i18n>
{
  "en": {
    "brand": "LabHive",
    "aboutLabhive": "About LabHive",
    "aboutUs": "Team",
    "register": "Sign up",
    "login": "Login",
    "profile": "Profile",
    "changePassword": "Change Password",
    "signOut": "Logout",
    "privacyPolicy": "Privacy Policy",
    "imprint": "Imprint",
    "requestResource": "Request Resources",
    "offerResource": "Offer Resources",
    "search": "Search For Ressources"
  },
  "de": {
    "brand": "LabHive",
    "aboutLabhive": "Über LabHive",
    "aboutUs": "Team",
    "register": "Registrieren",
    "login": "Login",
    "profile": "Profil",
    "changePassword": "Passwort ändern",
    "signOut": "Logout",
    "privacyPolicy": "Datenschutzerklärung",
    "imprint": "Impressum",
    "requestResource": "Bedarfsanfrage",
    "offerResource": "Ressource anbieten",
    "search": "Suche nach Ressourcen"
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
        <b-navbar-toggle class="custom-toggle-icon collapsed" style="float: right" target="nav-collapse">
          <span class="line line-1"></span>
          <span class="line line-2"></span>
          <span class="line line-3"></span>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="mr-auto">
            <b-nav-item :active='$route.name =="pageAboutLabhive"' href="#/">{{ $t("aboutLabhive") }}</b-nav-item>
            <b-nav-item :active='$route.name =="pageAboutUs"' href="#/ueber-uns">{{ $t("aboutUs") }}</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item :active='$route.name =="pageSearch"' class="nav-cta" href="#/search">{{ $t("search") }}</b-nav-item>
            <template v-if="!$authenticated">
              <b-nav-item :active='$route.name =="pageRegister"' href="#/register">{{ $t("register") }}</b-nav-item>
              <b-nav-item :active='$route.name =="pageLogin"' href="#/login">{{ $t("login") }}</b-nav-item>
            </template>

            <b-nav-item-dropdown v-if="$authenticated" right :text="userName">
              <b-dropdown-item href="#/profile" v-if="$user.role && $user.role.toLowerCase().indexOf('admin') == -1">{{ $t("profile") }}</b-dropdown-item>
              <b-dropdown-item v-if="$user.role == 'lab_diag' || $user.role == 'lab_research'" href="#/offer">{{ $t("offerResource") }}</b-dropdown-item>
              <b-dropdown-item v-if="$user.role == 'lab_diag'" href="#/request">{{ $t("requestResource") }}</b-dropdown-item>
              <b-dropdown-item href="#/change-password">{{ $t("changePassword") }}</b-dropdown-item>
              <b-dropdown-item href="#/admin" v-if="$user.role && $user.role.toLowerCase().indexOf('admin') > -1">Admin</b-dropdown-item>
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
          <b-col sm="12" md lg class="copyright align-self-center" order="3" order-lg="1">
            &copy; LabHive 2020
          </b-col>
          <b-col sm="12" md="12" lg="6" class="text-center align-self-center" order="1" order-lg="2">
            <b-link to="privacyPolicy" class="clink">{{ $t('privacyPolicy') }}</b-link>
            <b-link to="imprint" class="clink">{{ $t('imprint') }}</b-link>
            <b-link class="fa-icon" href="https://twitter.com/LabHive" target="_blank"><font-awesome-icon :icon="['fab', 'twitter']" /></b-link>
            <b-link class="fa-icon" href="https://github.com/Kavakuo/LabHive" target="_blank"><font-awesome-icon :icon="['fab', 'github']" /></b-link>
          </b-col>
          <b-col sm="12" md="12" lg class="logo" order="2" order-lg="3">
            <img src="./assets/logo-footer.png" alt="Wir vs Virus Projekt" width="192" height="66" />
          </b-col>
        </b-row>
      </b-container>
    </footer>
    <!-- Footer -->
  </div>
</template>

<script>
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
        } else if (this.$user.organization) {
          return this.$user.organization;
        }
        else {
          return this.$user.role
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

@import "assets/custom.scss";
@import "~bootstrap/scss/bootstrap.scss";
@import '~bootstrap-vue/dist/bootstrap-vue.css';

body {
  font-family: 'Fira Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  flex-direction: column;
  font-size: 14px;
  display: flex;
  height: 100vh;
  color: #000;
  background-color: $color-bkg-primary;
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

.btn-primary {
  background: $color-green;
  border-radius: 4px;
  border: none;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  color: #fff;
  padding: 12px 24px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.10);

  &:hover {
    background: #FFFFFF;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.25);
    color: $color-green;
  }
  &:not(:disabled):not(.disabled):active,
  &:not(:disabled):not(.disabled).active {
    background: #C9E0DF;
    color: $color-green;
    box-shadow: none;
  }
}



#navbar, .footer-custom {
  background: $color-bkg-primary;
  position: relative;

    .container {
      max-width: 1500px;
    }

    .navbar-nav .nav-link {
      color: rgba(0, 0, 0, 0.6);
      text-transform: uppercase;
      transition: all 0.15s ease-in-out;
      -webkit-transition: all 0.15s ease-in-out;

      &.active {
        color: rgba(0, 0, 0, 1);
        text-shadow: 0px 0px 1px #000;
      }

      &:hover {
        color: $color-green;
        text-shadow: 0px 0px 1px $color-green;
        transition: all 0.15s ease-in-out;
        -webkit-transition: all 0.15s ease-in-out;
      }

      @media (min-width: 991px) {
        margin: 0 16px;
    }
  }

  .nav-cta .nav-link{
    border: 1px solid $color-green;
    border-radius: 4px;
    box-sizing: border-box;
    color: $color-green;
    

    @media (min-width: 991px) {
      margin: 0 16px;
    }

    &.active {
      background: #C9E0DF;
      border: 1px solid #C9E0DF;

      .nav-link {
        color: #000;
        text-shadow: 0px 0px 1px #000;
      }
    }

    &:hover {
      background: #fff;
      border: 1px solid #fff;
      box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.25);
      transition: all 0.15s ease-in-out;
      -webkit-transition: all 0.15s ease-in-out;

      .nav-link {
        color: $color-green;
        text-shadow: 0px 0px 1px $color-green;
      }
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

    @media (max-width: 991px) {
      text-align: center;
      margin: 0 auto;
    }
  }

  @media (max-width: 991px) {
    .copyright, .logo { 
      text-align: center; 
      padding: 10px 0 0 0;
    }

    .copyright {
      margin-bottom: 10px;
    }
  }
}

.btn-primary {
  margin-bottom: 16px;
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

.navbar-toggler {
    border: none;
    margin-right: 15px;
    margin-bottom: 2px;
    outline: none;
}

.custom-toggle-icon {
      width: 30px;
      height: 30px;
}

.custom-toggle-icon .line {
  display: block;
  background: $color-green;
  width: 22px;
  height: 2px;
  position: relative;
  left: 0;
  border-radius: 50px;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  -moz-transition: all 0.4s;
}

.custom-toggle-icon .line.line-1 {
  margin-top: 0;
}

.custom-toggle-icon .line.line-2 {
  margin-top: 4px;
}

.custom-toggle-icon .line.line-3 {
  margin-top: 4px;
}

.custom-toggle-icon[aria-expanded="true"] .line-1 {
  transform: translateY(6px) translateX(0) rotate(45deg);
  -webkit-transform: translateY(6px) translateX(0) rotate(45deg);
}

.custom-toggle-icon[aria-expanded="true"] .line-2 {
  opacity: 0;
}

.custom-toggle-icon[aria-expanded="true"] .line-3 {
  transform: translateY(-6px) translateX(0) rotate(-45deg);
  -webkit-transform: translateY(-6px) translateX(0) rotate(-45deg);
}

.footer-custom {
  padding: 8px 0;

  &:after {
    top: 1px;
  }

  a + a {
    margin-left: 40px;
  }

  .fa-icon + .fa-icon {
    margin-left: 16px;
  }
}

.has_banner {
  margin-top: 0;
  max-width: none;
  padding: 0;
  background: $color-white;

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
