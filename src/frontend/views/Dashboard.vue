<template>
  <div class="dashboard">
    <div class="background">
      <div class="top">
        <span>{{ $t("testcapacity.welcome") }} {{ profile.organization }}</span>

        <h1 style="margin-bottom: 0; text-align: left">
          {{ $t("testcapacity.overview") }}
        </h1>
        <span>{{ date }}</span>
      </div>
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
          <Advice />
        </div>
        <hr style="margin: 100px" />
        <div class="container">
          <CapacityMap />
        </div>
        <div class="container">
          <TotalDataOverview />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import HistoryChart from "./../components/historyChart";
import CapacityMap from "./../components/capacityMap";
import Advice from "./../components/Advice"; //hier den import einfügen und in Z.69 unter Components hinzufügen
import TotalDataOverview from "./../components/TotalDataOverview.vue";

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
    TotalDataOverview
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
  position: static;
  padding-bottom: 100pt;
  padding-top: 50pt;
  opacity: 1;
}

.background {
  
  background-image: url("../assets/decoration-1.svg");
  background-repeat: no-repeat;
  background-position: center;
  padding-bottom: -70pt;
  opacity: 0,5;
  
}

.bcol {
  margin-top: 20px;
}
h1 {
  margin-top: 4pt;
}
</style>
