# labsphere

## Prerequesites
node
vue-cli

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Add new Views
1. create a new Vue Component in src/views
1. add a new view register the route in main.js routes constant
1. link to the route from anywhere with ``` <router-link to="/route-where-you-want-to-go"> ``` or programmatically ``` this.$router.push('/route-where-you-want-to-go') ```

## Basic Compontent
```
<template>
  <div class="component-class">
      <!-- Template goes here -->
  </div>
</template>

<script>
import ComponentsYouUse from 'wherever/components-you-use'

export default {
  name: 'ComponentName',
  props: {
      defineYourProps: any
  },
  computed: {
      session: () => {
          return this.$store.getters.session
      }
  },
  data: function() {
      return {
          yourData
      }
  }
  methods: {
      callMe: function() {

      }
  },
  components: {
      ComponentsYouUse
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

```

## Forms
Use the LabshareForm Component. Available props are ``` formDefinition ```, available events ``` formcomplete ```

A form definition consists of one or more steps which can hold any form element (for now: input text, select, checkbox, description)

The formDefinition structure looks like this:
```
[
    {
        title: 'step 1',
        formElements: [
            {/* formElement */},
            {/* formElement */},
        ]
    }
]
```