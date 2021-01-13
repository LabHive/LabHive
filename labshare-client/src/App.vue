<template>
  <div class="main-div">
    <b-navbar toggleable="lg" id="navbar">
      <div class="container">
        <b-navbar-brand to="/">
          <img src="./assets/logo-green.svg" alt="LabHive" width="161" />
        </b-navbar-brand>
        <b-navbar-toggle
          class="custom-toggle-icon collapsed"
          style="float: right"
          target="nav-collapse"
        >
          <span class="line line-1"></span>
          <span class="line line-2"></span>
          <span class="line line-3"></span>
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="mr-auto">
            <b-nav-item
              :active="$route.name =='pageAboutLabhive'"
              to="/"
            >{{ $t("layout.navbar.aboutLabhive") }}</b-nav-item>
            <b-nav-item
              :active="$route.name =='pageAboutUs'"
              to="/ueber-uns"
            >{{ $t("layout.navbar.aboutUs") }}</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              :active="$route.name =='pageSearch'"
              class="nav-cta"
              to="/search"
            >{{ $t("general.btn_search") }}</b-nav-item>
            <template v-if="!$authenticated">
              <b-nav-item
                :active="$route.name =='pageRegister'"
                to="/register"
              >{{ $t("general.signUp") }}</b-nav-item>
              <b-nav-item :active="$route.name =='pageLogin'" to="/login">{{ $t("general.login") }}</b-nav-item>
            </template>

            <b-nav-item-dropdown v-if="$authenticated" right :text="userName">
              <b-dropdown-item
                to="/profile"
                v-if="$user.role && $user.role.toLowerCase().indexOf('admin') == -1"
              >{{ $t("profile.title") }}</b-dropdown-item>
              <b-dropdown-item
                v-if="$user.role == 'lab_diag' || $user.role == 'lab_research'"
                to="/offer"
              >{{ $t("profile.offer.title") }}</b-dropdown-item>
              <b-dropdown-item
                v-if="$user.role == 'lab_diag'"
                to="/request"
              >{{ $t("profile.request.title") }}</b-dropdown-item>
              <b-dropdown-item to="/change-password">{{ $t("changePassword.title") }}</b-dropdown-item>
              <b-dropdown-item
                to="/admin"
                v-if="$user.role && $user.role.toLowerCase().indexOf('admin') > -1"
              >Admin</b-dropdown-item>
              <b-dropdown-item to="/" @click="logout">{{ $t("layout.navbar.signOut") }}</b-dropdown-item>
            </b-nav-item-dropdown>
            <LocaleChange />
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>

    <div class="content container" v-bind:class="{ has_hero: $route.fullPath === '/' }">
      <div style="text-align: center" v-if="staging">
        <h3
          class="staging-warning"
          style="color: red; margin: 0; margin-top: 20px"
          v-html="$t('layout.staging')"
        ></h3>
      </div>
      <div id="app">
        <keep-alive :include="/search.*/i">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <div class="container-fluid">
      <footer class="footer-custom">
        <b-container>
          <b-row align-h="between" align-v="center">
            <b-col
              id="copyright"
              class="text-center"
              cols="12"
              lg="auto"
              order="4"
              order-lg="2"
            >&copy; LabHive 2020</b-col>

            <b-col class="text-center" cols="12" lg="auto" order="1" order-lg="2">
              <b-link to="/privacyPolicy" class="clink">{{ $t('layout.footer.privacyPolicy') }}</b-link>
              <b-link to="/imprint" class="clink">{{ $t('layout.footer.imprint') }}</b-link>
              <b-link href="mailto:info@labhive.de" class="clink">{{ $t('layout.footer.contact') }}</b-link>
              <b-link to="/press" class="clink">{{ $t('layout.footer.press') }}</b-link>
              <b-link
                class="fa-icon social-icon"
                href="https://twitter.com/Lab_Hive"
                target="_blank"
              >
                <font-awesome-icon :icon="['fab', 'twitter']" />
              </b-link>
              <b-link
                class="fa-icon social-icon"
                href="https://github.com/LabHive/LabHive"
                target="_blank"
              >
                <font-awesome-icon :icon="['fab', 'github']" />
              </b-link>
            </b-col>

            <b-col
              id="footer-accolades"
              class="text-center"
              cols="12"
              lg="auto"
              order="3"
              order-lg="3"
            >
              <a href="https://wirvsvirushackathon.org/" target="_blank">
                <img
                  class="img-hover"
                  src="./assets/logo-wirvsvirus-projekt.png"
                  alt="Wir vs. Virus Projekt"
                  width="auto"
                  height="50"
                />
              </a>
              <a href="https://www.euvsvirus.org/" target="_blank">
                <img
                  class="img-hover"
                  src="./assets/logo-euvsvirus.png"
                  alt="EUvsVirus"
                  width="auto"
                  height="40"
                />
              </a>
              <a href="https://falling-walls.com/" target="_blank">
                <img
                  class="img-hover"
                  id="fwlogo"
                  src="./assets/logo-fwfinalist2020.png"
                  alt="Falling Walls Finalist 2020"
                  width="auto"
                  height="60"
                />
              </a>
            </b-col>
          </b-row>
        </b-container>
      </footer>
    </div>
  </div>
</template>

<script>
import LocaleChange from "./components/LocaleChange";

export default {
  name: "App",
  components: { LocaleChange },
  data() {
    return {
      staging: process.env.STAGING,
    };
  },
  mounted() {
    window.onscroll = function () {
      const navbar = document.getElementById("navbar");
      let className = navbar.className.replace("sticky", "");

      if (window.scrollY > 0) {
        className = className + " sticky ";
      }

      navbar.className = className;
    };
  },
  computed: {
    userName: function () {
      if (this.$user.role) {
        if (this.$user.role === "volunteer") {
          return this.$user.contact.firstname;
        } else if (this.$user.organization) {
          return this.$user.organization;
        } else {
          return this.$user.role;
        }
      } else {
        return "User";
      }
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style lang="scss">
$color-blue: #2c3e50;
$color-brand--primary: #0069d9;
$color-brand--secondary: #0069d9;
$color-white: #fff;

$color-bkg-primary: #f7f6fd;
$color-green: #177867;

@import "assets/custom.scss";
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/dist/bootstrap-vue.css";

@font-face {
  font-family: "Fira Sans";
  src: url("/fonts/FiraSans-Light.ttf") format("truetype");
  font-weight: 300;
  font-style: Light;
}
@font-face {
  font-family: "Fira Sans";
  src: url("/fonts/FiraSans-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: Regular;
}
@font-face {
  font-family: "Fira Sans";
  src: url("/fonts/FiraSans-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: Medium;
}
@font-face {
  font-family: "Fira Sans";
  src: url("/fonts/FiraSans-Bold.ttf") format("truetype");
  font-weight: 700;
  font-style: Bold;
}

html {
  overflow-y: scroll;
}

body {
  font-family: "Fira Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  flex-direction: column;
  font-size: 15px;
  display: flex;
  height: 100vh;
  color: #000;
  background-color: $color-bkg-primary;
}

#app {
  margin-top: 1em;
  margin-bottom: 3em;
}

h1,
h3 {
  font-weight: normal;
  font-size: 40px;
  line-height: 1.2;
  letter-spacing: 0.1em;
  color: #282e40;
  margin: 48px 0 48px 0;

  @media (max-width: 991px) {
    margin: 48px 0 32px 0;
    font-size: 32px;
    text-align: center;
  }
}

h3 {
  font-size: 28px;
  margin: 32px 0 8px 0;
  letter-spacing: 0.05em;
}

h4 {
  font-weight: normal;
  margin-bottom: 16px;
  font-size: 18px;
  color: #484c5a;
}

.social-icon {
  @media (max-width: 992px) {
    padding-top: 15px;
  }
}

.step-info-sub {
  margin-bottom: 44px;
  max-width: 60%;

  @media (max-width: 992px) {
    max-width: 100% !important;
  }
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

.btn-primary,
.btn-success {
  background: #c9e0df;
  border-radius: 4px;
  border: none;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  color: #0e5145;
  padding: 12px 24px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);

  &:not(:disabled):not(.disabled):hover {
    background: #ffffff;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.25);
    color: $color-green;
  }
  &:not(:disabled):not(.disabled):active,
  &:not(:disabled):not(.disabled).active {
    background: $color-green;
    color: #fff;
    box-shadow: none;
  }

  &:disabled,
  &.disabled {
    background: #c9e0df;
    color: #0e5145;
    box-shadow: 0 0 0 transparent;
  }
}

.btn {
  margin-bottom: 16px;
}

.btn-secondary {
  background: #e2e2e2;
  border-radius: 4px;
  border: none;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.1em;
  color: #000;
  padding: 12px 24px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);

  &:not(:disabled):not(.disabled):hover {
    background: #ffffff;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.25);
    color: #333;
  }
  &:not(:disabled):not(.disabled):active,
  &:not(:disabled):not(.disabled).active {
    background: #888;
    color: #fff;
    box-shadow: none;
  }

  &:disabled,
  &.disabled {
    background: #c9e0df;
    color: #0e5145;
    box-shadow: 0 0 0 transparent;
  }
}

.btn-success {
  color: #fff;
  background: #2aad70;
}

.btn-cta {
  margin: 20px 0 0;
  color: #fff;
  padding: 15px 30px;
  background: $color-green;
  border: none;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.1em;

  &:hover {
    background: #fff;
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.25);
    color: $color-green;
  }
}

#navbar,
.footer-custom {
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
    margin: 0 16px;

    &.active {
      color: rgba(0, 0, 0, 1);
      font-weight: 500;
    }

    &:hover {
      color: $color-green;
      font-weight: 500;
      transition: all 0.15s ease-in-out;
      -webkit-transition: all 0.15s ease-in-out;
    }

    @media (max-width: 1200px) {
      margin: 0 4px;
      font-size: 13.5px;
    }
  }

  .nav-cta .nav-link {
    border: 1.5px solid $color-green;
    border-radius: 4px;
    box-sizing: border-box;
    color: $color-green;
    padding: 8px;
    width: fit-content;
    margin: 0 24px;
    font-weight: 500;

    @media (max-width: 1200px) {
      margin: 0 12px;
    }

    @media (max-width: 991px) {
      margin: 0 4px;
    }

    &.active {
      background: #c9e0df;
      border: 1px solid #c9e0df;

      .nav-link {
        color: #000;
      }
    }

    &:hover {
      background: #fff;
      border: 1.5px solid #fff;
      box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.25);
      transition: all 0.15s ease-in-out;
      -webkit-transition: all 0.15s ease-in-out;

      .nav-link {
        color: $color-green;
      }
    }
  }

  &:after {
    left: 0;
    right: 0;
    top: 100%;
    content: "";
    height: 1px;
    margin-top: -1px;
    position: absolute;
    background: linear-gradient(
      270.04deg,
      rgba(218, 218, 218, 0) 0%,
      #dadada 50.23%,
      rgba(218, 218, 218, 0) 100.45%
    );
  }

  .logo {
    text-align: right;

    @media (max-width: 991px) {
      text-align: center;
      margin: 0 auto;
    }
  }

  @media (max-width: 991px) {
    .logo {
      text-align: center;
      padding: 10px 0 0 0;
    }
  }
}

.navbar-light .navbar-nav .nav-link:focus,
.navbar-toggler:focus {
  outline: 0;
}

.navbar-brand {
  margin-right: 32px;
}

.btn-primary {
  margin-bottom: 16px;
}

.btn.disabled,
.btn:disabled {
  opacity: 0.5;
}

#navbar .container {
  padding: 8px 10px;
  transition: all box-shadow 0.15s ease-in-out;
  -webkit-transition: all 0.15s ease-in-out;
}

#navbar.sticky .container {
  padding: 0px 15px;
  transition: all box-shadow 0.15s ease-in-out;
  -webkit-transition: all 0.15s ease-in-out;
}

#navbar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 20;
  transition: all box-shadow 0.15s ease-in-out;
  -webkit-transition: all 0.15s ease-in-out;

  &.sticky {
    background: #fff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05);
    transition: all box-shadow 0.15s ease-in-out;
    -webkit-transition: all 0.15s ease-in-out;
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
  padding: 15px 0;

  &:after {
    top: 1px;
  }

  a,
  #copyright {
    color: #000;
    display: inline-block;
    margin: 0 15px;

    &:hover {
      color: $color-green;
    }
  }

  @media (max-width: 991px) {
    padding: 40px 15px 0 15px;
    margin: 0 10px;

    #footer-accolades {
      margin: 25px 0 15px 0;

      img {
        height: 30px;
        margin: 10px 0;
      }

      #fwlogo {
        height: 50px;
      }
    }

    #copyright {
      margin: 0 0 10px 0;
    }
  }
}

.has_hero {
  margin-top: 0;
  max-width: none;
  padding: 0;
  background: $color-white;

  #app {
    margin: 0;
  }
}

.img-hover {
  transition: all 0.15s ease-in-out;

  &:hover {
    transform: scale(1.05);
    transition: all 0.15s ease-in-out;
    filter: drop-shadow(0px 8px 4px rgba(0, 0, 0, 0.15));
  }
}

.title-subtitle {
  margin-bottom: 64px;
}

.form-group {
  // margin-bottom: 16px;
}

#description {
  margin-top: 16px;
}

.consent-section {
  margin: 44px 0;
}

.staging-warning {
  @media (max-width: 767px) {
    font-size: 20px;
  }
}
</style>
