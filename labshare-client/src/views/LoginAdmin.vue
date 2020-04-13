<i18n>
{
  "en": {},
  "de": {
    "title": "Admin-Login",
    "submit": "Einloggen"
  }
}
</i18n>
<template>
  <div>
    <h1>{{$t("title")}}</h1>

    <div class="login-form">
      <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

      <b-form @submit="login">
        <b-form-group id="email" label="E-Mail Adresse">
          <b-form-input id="email" v-model="user.email" trim></b-form-input>
        </b-form-group>
        <b-form-group id="password" label="Passwort">
          <b-form-input type="password" id="password" v-model="user.password" trim></b-form-input>
        </b-form-group>
        <b-button variant="primary" type="submit">{{$t("submit")}}</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
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
        this.$http.post('admin/login', this.user).then((response) => {
            let token = response.body.sessionToken
            this.$store.commit('auth_success', token)
            this.$router.push("/admin")
        }).catch((response) => {
          this.error = this.$t("backend." + response.body.errorDescription)
          console.log("Login error:", response);
        })
      } else {
        this.error = "Please fill in the fields and try again";
      }
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control {
  max-width: 300px;
}
</style>
