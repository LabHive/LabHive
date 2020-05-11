<i18n>
    {
    "en": {
    "title": "Login",
    "submit": "Log in",
    "forgotPassword": "Forgot password",
    "emptyField": "Please fill in the fields and try again!"
    },
    "de": {
    "title": "Anmeldung",
    "submit": "Einloggen",
    "forgotPassword": "Passwort vergessen",
    "emptyField": "Bitte die Felder ausfüllen und erneut probieren!"
    }
    }
</i18n>
<template>
  <div>
    <h1 data-aos="fade" data-aos-duration="750">{{$t("title")}}</h1>

    <div class="login-form" data-aos="fade" data-aos-duration="750">
      <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

      <b-row>
        <b-col sm="*" md="5" lg="4">
          <b-form @submit="login">
            <InputForm name="email" v-model="user.email" trim></InputForm>
            <InputForm inType="password" name="password" v-model="user.password"></InputForm>
            <div class="my-3">
              <router-link to="/forgot-password">{{ $t('forgotPassword') }}</router-link>
            </div>
            <b-button variant="primary" type="submit">{{$t("submit")}}</b-button>
          </b-form>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import InputForm from "@/components/InputForm";

export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    login: function(ev) {
      ev.preventDefault()
      if (this.user.email !== "" && this.user.password !== "") {
        this.$store
          .dispatch("login", this.user)
          .then(() => {
            this.$store
              .dispatch("getProfile")
              .then(() => this.$router.push("/search"))
              .catch(response => {
                console.log("Profile fetch error:", response.status);
              });
          })
          .catch(response => {
            this.error = this.$t("backend." + response.body.errorDescription)
            console.log("Login error:", response);
          });
      } else {
        this.error = this.$t("emptyField");
      }
    }
  },
  components: {
    InputForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control {
  max-width: 300px;
}
</style>
