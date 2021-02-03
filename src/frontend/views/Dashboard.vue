<template>
  <div class="dashboard">
    <span>Willkommen zurück, {{ profile.organization }}</span>
    <h1 style="margin-bottom: 0">Hier ist ihre Übersicht</h1>
    <template v-if="updated">
      <div class="alert alert-success" role="alert">
        {{ $t("profile.updated") }}
      </div>
    </template>
    <template v-else>
      <div v-if="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>
      <div class="row">
        <div class="col">
          <HistoryChart />
        </div>
        <div class="col">
          <CapacityMap />
        </div>
      </div>

    </template>
  </div>
</template>

<script>
import HistoryChart from "./../components/historyChart";
import CapacityMap from "./../components/capacityMap";



export default {
  name: "Dashboard",
  props: {},
  data: function() {
    return {
      updated: false,
      error: null,
    };
  },
  computed: {
    profile: function() {
      return this.$user;
    },

  },
  methods: {
  },

  components: {
    HistoryChart,
    CapacityMap
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.staging-warning {
  display: none
}
</style>

<style scoped>
h1 {
  margin-top: 4pt;
}
</style>
