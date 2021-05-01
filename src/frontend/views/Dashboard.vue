<template>
  <div class="dashboard">
    <span>{{$t("testcapacity.welcome")}} {{ profile.organization }}</span>
    
    <h1 style="margin-bottom: 0">{{$t("testcapacity.overview")}}</h1>
    <span>{{ date }}</span>
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
    date: function() {
      
      let d = new Date();
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      console.log(`${da}-${mo}-${ye}`);

      return `${da}-${mo}-${ye}`;
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
