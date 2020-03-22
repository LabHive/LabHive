<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>App</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import 'primevue/resources/themes/nova-dark/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// TODO: remove this
// just an example
import { Validator } from '../dist-browser/lib/validation'
Validator.validateFirstname("test")

export default {
  name: "App",
  components: {}
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.img-fluid {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.checkbox-group {
  &.checkbox--inline {
    display: flex;
    flex-flow: row wrap;

    .checkbox:not(:last-child) {
      margin-right: 1rem;
    }
  }
}

.checkbox {
  display: flex;
  justify-content: flex-start;
}

.p-dropdown {
  width: 100%;
  text-align: left;
}

.form-element-spacer {
  margin-bottom: 2rem;
}

.p-float-label {
  input {
    width: 100%;
  }
}
</style>
