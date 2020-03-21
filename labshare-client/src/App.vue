<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>App</h1>
    <router-view>

    </router-view>
  </div>
</template>

<script>
import 'primevue/resources/themes/nova-dark/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
