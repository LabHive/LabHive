<template>
  <div>
    <h1 style="marign-top: 20px">Login</h1>

    <div class="login-form">
      <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

      <b-form @submit="login">
        <b-form-group id="email" label="E-Mail Adresse">
          <b-form-input id="email" v-model="user.email" trim></b-form-input>
        </b-form-group>
        <b-form-group id="password" label="Passwort">
          <b-form-input id="password" v-model="user.password" trim></b-form-input>
        </b-form-group>
        <b-button variant="primary" type="submit">Einloggen</b-button>
      </b-form>
    </div>
    <!-- <div class="login-form">
      <span class="p-float-label form-element-spacer">
        <InputText id="email" type="text" v-model="user.email" />
        <label for="email">Email</label>
      </span>
      <span class="p-float-label form-element-spacer">
        <InputText id="password" type="password" v-model="user.password" />
        <label for="password">Password</label>
      </span>
      <Button icon="pi pi-chevron-right" iconPos="right" label="Login" @click="login()" />
    </div>-->
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {},
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
      login: function () {
          if(this.user.email !== '' && this.user.password !== '') {
            this.$store.dispatch('login', this.user)
            .then(() => {
              this.$store.dispatch('getProfile')
              .then(() => this.$router.push("/list"))
              .catch(response => {
                console.log("Profile fetch error:", response.status)
              })
            })
            .catch(response => {
              this.error = "Error logging in, please check you details and try again";
              console.log("Login error:", response)
            })
          } else {
              this.error = "Please fill in the fields and try again";
          }
      }
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-form {
  max-width: 500px;
  width: 100%;
  margin-top: 20px

}
</style>
