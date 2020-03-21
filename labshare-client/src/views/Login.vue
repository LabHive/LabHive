<template>
  <div class="login">
    <h1>Login</h1>
    <span class="p-float-label">
      <InputText id="username" type="text" v-model="user.username" />
      <label for="username">Username</label>
    </span>
    <span class="p-float-label">
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
        username: "",
        password: ""
      }
    };
  },
  methods: {
      login: function () {
          if(this.user.username !== '' && this.user.password !== '') {
            console.log("Logged in");
            this.$router.push('/')
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
.p-float-label {
  margin-bottom: 1rem;
}

.p-float-label input {
  width: 100%;
}
</style>
