<template>
  <div class="dashboard">
    <div class="background">
      <div class="top">
        <span>{{ $t("testcapacity.welcome") }} {{ profile.organization }}</span>

        <h1 style="margin-bottom: 0; text-align: left">
          {{ $t("testcapacity.overview") }}
        </h1>

      </div>
      <span>{{ date }}</span>
    </div>

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
        <div class="container" style="width: 80%">
          <HistoryChart />
        </div>
        <hr style="margin: 100px" />
        <div class="container" style="width: 100%">
          <b-row align-h="center" align-v="center">
            <b-col class="bcol" sm="12" lg="6" xl="20">
              <Advice />
              <!-- Aufruf der eigenen Box, Aufruf muss im script tag Z.35 importiert werden-->
            </b-col>
            <b-col class="bcol" sm="12" lg="6" xl="20">
              <Advice />
              <!-- Aufruf der eigenen Box, Aufruf muss im script tag Z.35 importiert werden-->
            </b-col>
            <b-col class="bcol" sm="12" lg="6" xl="20">
              <Advice />
              <!-- Aufruf der eigenen Box, Aufruf muss im script tag Z.35 importiert werden-->
            </b-col>
            <b-col class="bcol" sm="12" lg="6" xl="20">
              <Advice />
              <!-- Aufruf der eigenen Box, Aufruf muss im script tag Z.35 importiert werden-->
            </b-col>
          </b-row>
        </div>
        <hr style="margin: 100px" />
        <div class="container">
          <CapacityMap />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import HistoryChart from "./../components/historyChart";
import CapacityMap from "./../components/capacityMap";
import Advice from "./../components/Advice"; //hier den import einfügen und in Z.69 unter Components hinzufügen

export default {
  name: "Dashboard",
  props: {},
  data: function () {
    return {
      updated: false,
      error: null,
    };
  },
  computed: {
    profile: function () {
      return this.$user;
    },
    date: function () {
      let d = new Date();
      let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
      let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
      console.log(`${da}-${mo}-${ye}`);

      return `${da}-${mo}-${ye}`;
    },
  },
  methods: {},

  components: {
    HistoryChart,
    CapacityMap,
    Advice, //Hier das Component einfügen
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.staging-warning {
  display: none;
}
</style>

<style scoped>
.top {
  padding-top: 10%;
  padding-bottom: 10%;
}

.background {
  background-image: url("../assets/decoration-1.svg");
  background-repeat: no-repeat;
  background-position: center,;
  

}

.bcol {
  margin-top: 20px;
}
h1 {
  margin-top: 4pt;
}
</style>
