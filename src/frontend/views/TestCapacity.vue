<template>
    <div class="test-capacity">
        <h1  style="margin-bottom: 0; text-align: left">{{$t("testcapacity.testCapacity")}}</h1>
        <div  class="container" style="width: 100%;margin-top: 70px;" >
          <HistoryChart />
          test
        </div>
    </div>
</template>
<script>
import HistoryChart from "./../components/historyChart";
export default {
    components: {
        HistoryChart
    }
  }
</script>