<template>
  <div class="list-view">
    <h1 class="mt-4">Labore</h1>
    <div class="container">
      <template v-if="data">
        <template v-for="(set, index) in data._embedded">
          <div :key="'row' + index" class="row mb-2">
            <div class="col-12">
              <p class="lead">{{set.distance}} | {{ set.data.labContact.firstname }} {{ set.data.labContact.lastname }}</p>
            </div>
            <div class="col-12">
              <p>Wir suchen</p>
              <ul>
                <li v-if="set.data.lookingFor.humanRessources">Personal</li>
                <li v-if="set['data']['lookingFor']['devices']['RNA-Exctraction']">RNA-Exctraction</li>
                <li v-if="set['data']['lookingFor']['devices']['testingKit']">Test Kits</li>
                <li v-if="set['data']['lookingFor']['devices']['dataEvaluation']">Diagnostiker</li>
              </ul>

            </div>
            <div class="col-12">@: {{ set.data.labContact.email }}</div>
            <div class="col-12">T: {{ set.data.labContact.phone }}</div>

            <div class="col-12">
              {{ set.data.address.street }}
            </div>
            <div class="col-12">
              {{ set.data.address.zipcode }} {{ set.data.address.city }}
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {},
  computed: {

  },
  data: function() {
    return {
      data: null
    };
  },
  components: {},
  beforeMount: function() {
    this.$http.get('search', {params: {role: 'lab'}})
      .then(success => {
        this.data = success.body
        console.log(success.body)
      })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
