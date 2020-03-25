<template>
  <div class="login">
    <h1>Login</h1>

    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

    <div class="login-form">
      <span class="p-float-label form-element-spacer">
        <InputText id="email" type="text" v-model="user.email" />
        <label for="email">Email</label>
      </span>
      <span class="p-float-label form-element-spacer">
        <InputText id="password" type="password" v-model="user.password" />
        <label for="password">Password</label>
      </span>
      <Button icon="pi pi-chevron-right" iconPos="right" label="Login" @click="login()" />
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext"
import Button from "primevue/button"

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
          if(this.user.username !== '' && this.user.password !== '') {
            this.$http.post('login', { email: this.user.email, password: this.user.password })
                .then(response => {
                    this.$store.dispatch('login', response.body.sessionToken);
                    this.$router.push('/')
                }, error => {
                    this.error = "Error logging in, please check you details and try again";
                    console.log("Login error", error);
                });
          } else {
              this.error = "Please fill in the fields and try again";
          }
      }
  },
  components: {
    InputText,
    Button
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login{
    max-width: 20em;
    margin: auto;
  }
  .login-form{
    margin-top: 3em;
  }
</style>
