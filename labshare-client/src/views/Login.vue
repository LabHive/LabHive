<template>
  <div class="login">
    <h1>Login</h1>
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
      }
    };
  },
  methods: {
      login: function () {
          if(this.user.username !== '' && this.user.password !== '') {
            console.log("Logged in");
            this.$http.post('login', { email: this.user.email, password: this.user.password })
                .then(response => {
                    this.$store.dispatch('login', response.body.sessionToken);
                    this.$router.push('/')
                }, error => {
                    console.log("error", error);
                });
          } else {
              console.log("Error loggin in.");
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

</style>
