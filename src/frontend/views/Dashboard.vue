<template>
  <div class="dashboard">
    <span>{{$t("testcapacity.welcome")}} {{ profile.organization }}</span>
    
    <h1  style="margin-bottom: 0; text-align: left">{{$t("testcapacity.overview")}}</h1>
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
      <div class="col">
        <div  class="container" style="width: 80%;" >
          <HistoryChart />
        </div>
       <hr style="margin: 100px;">
      <div class="container" style="width: 50%;">
        <b-row align-h="center" align-v="center">
          <b-col sm="12" lg="6" xl="4">
        <Advice />  <!-- Aufruf der eigenen Box, Aufruf muss im script tag Z.35 importiert werden-->
        </b-col>
        <b-col sm="12" lg="6" xl="4">
        <Advice />  <!-- Aufruf der eigenen Box, Aufruf muss im script tag Z.35 importiert werden-->
        </b-col>
        <b-col sm="12" lg="6" xl="4">
        <Advice />  <!-- Aufruf der eigenen Box, Aufruf muss im script tag Z.35 importiert werden-->
        </b-col>
        <b-col sm="12" lg="6" xl="4">
        <Advice />  <!-- Aufruf der eigenen Box, Aufruf muss im script tag Z.35 importiert werden-->
        </b-col>
        </b-row>
      </div>
       <hr style="margin: 100px;">
        <div  class="container">
          <CapacityMap />
        </div>
      </div>
      

    </template>
  </div>
</template>

<script>
import HistoryChart from "./../components/historyChart";
import CapacityMap from "./../components/capacityMap";
import Advice from "./../components/Advice";  //hier den import einfügen und in Z.69 unter Components hinzufügen



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
    CapacityMap,
    Advice  //Hier das Component einfügen
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
