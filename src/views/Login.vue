<template>
  <div>
    <h1 data-aos="fade" data-aos-duration="750">{{$t("login.title")}}</h1>

    <div class="login-form" data-aos="fade" data-aos-duration="750">
      <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

      <b-row>
        <b-col sm="*" md="5" lg="4">
          <b-form @submit="login">
            <InputForm name="general.emailAddress" v-model="user.email" trim></InputForm>
            <InputForm inType="password" name="general.password" v-model="user.password"></InputForm>
            <div class="my-3">
              <router-link to="/forgot-password">{{ $t("forgotPassword.title") }}</router-link>
            </div>
            <b-button variant="primary" type="submit">{{$t("general.login_verb")}}</b-button>
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
        this.error = this.$t("login.emptyField");
      }
    }
  },
  components: {
    InputForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.form-control {
  max-width: 300px;
}

$aos-distance: 32px;
@import 'node_modules/aos/src/sass/aos.scss';

</style>
