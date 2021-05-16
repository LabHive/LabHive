<template>
    <div>
        <div class="box">
            <h4>Test for CapacityList</h4>
            <!-- Main Content -->
            <div
                class=""
                v-for="(item) in capacityList"
                :key="item.createdAt + item.totalCapacity + item.usedCapacity + item.positiveRate + item.sampleBackup"
            >
                <div class="row">
                    <div class="">{{ item.createdAt }} </div>
                    <div class="">{{ item.totalCapacity }} </div>
                    <div class="">{{ item.usedCapacity }} </div>
                    <div class="">{{ item.positiveRate }} </div>
                    <div class="">{{ item.sampleBackup }} </div>
                </div>
            </div>

        </div>
    </div>
</template>


<script>
export default {
    mounted() {
      this.getCapacityData();
      console.log(this.capacityList);
    },

    data: function() {
      return {
        capacityList: [], //all data storage not filtered by date
      }
    },

    computed: {
        
    },

    methods: {
      //get capacity history from API. Parse and store in data->history and trigger visualization
      getCapacityData() {
        return new Promise((res, rej) => {
          this.$http.get("testCapacity/getTestCapacity").then(
            success => {
              this.capacityList = success.body.data
              console.log(success.body.data); //Nur zum Testen ausgeben in der Console
            },
            error => {
              rej(error);
              this.error = "no data"
              console.log(error);
            }
          );
        });
      },
    }
  }
</script>

<style scoped>
.box {
    padding: 0px;
}

path {
    transition: all 1s;
}

.svgContainer {
    height: 300px;
}
</style>