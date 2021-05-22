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
                    <div class="col" style=""> 
                        <div class="">{{ item.createdAt }} </div>
                    </div>
                    <div class="col">
                        <div class="">{{ item.totalCapacity }} </div>
                        Capacity
                    </div>
                    <div class="col" > 
                        <div class="">{{ item.usedCapacity }} </div>
                        Tests
                    </div>
                    <div class="col" > 
                        <div class="">{{ item.sampleBackup }} </div>
                        Backlog
                    </div>
                    <div class="col" > 
                        <div class="">{{ item.positiveRate }} </div>
                        Positive Rate
                    </div>
                    <div class="col" >
                        <a href="#" class="btn lh-button btn-primary" target="_self">Edit</a>
                    </div>
                </div>
            </div>

            <b-pagination
                v-if="totalResults > 20"
                v-model="currentPage"
                :total-rows="totalResults"
                :per-page="20"
                aria-controls="table"
                style="margin-top:30px"
                @change="pageChanged"
            ></b-pagination>

        </div>
    </div>
</template>


<script>
export default {
    mounted() {
      this.getCapacityData();
      this.formatData();
      console.log(this.capacityList);
    },

    data: function() {
      return {
        capacityList: [], //all data storage not filtered by date
        formattedList: [], // capacityList with everything formatted
        currentPage: 1,
        totalResults: 0
      }
    },

    computed: {
        
    },

    methods: {
        pageChanged() {
            this.$nextTick(() => {
                this.getCapacityData();
            });
        },
        //get capacity history from API. Parse and store in data->history and trigger visualization
        getCapacityData() {
            return new Promise((res, rej) => {
                let backendParam = {};
                backendParam.page = this.currentPage;
                this.$http.get("testCapacity/getTestCapacity", { params: backendParam }).then(
                    success => {
                        this.capacityList = success.body.data
                        this.totalResults = success.body.totalResults;
                        //console.log(success.body.data); //Nur zum Testen ausgeben in der Console
                        //console.log(success.body.totalResults);
                    },
                    error => {
                        rej(error);
                        this.error = "no data"
                        console.log(error);
                    }
                );
            });
        },

      formatData() {
          
      }
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