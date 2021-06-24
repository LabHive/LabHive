<template>
    <div >
        <div>
            <!-- Main Content -->

                       
            <div class="d-flex flex-row-reverse bd-highlight">     
                <b-button v-b-toggle="'addEntryBox'" variant="primary">{{$t("testcapacity.historyChart.addNewEntry")}}</b-button>
            </div>
            <b-collapse style="background-color:#DBDBDB;" id="addEntryBox" class="box" >
                <b-row cols="5" >
                    <b-col>
                        <input type="date" class="form-control"> 
                    </b-col>
                </b-row>
                <b-row cols="5"> 
                    <b-col>
                        <input type="number" class="form-control">
                    </b-col>
                    <b-col>
                        <input type="number" class="form-control">  
                    </b-col>
                    <b-col>
                        <input type="number" class="form-control">
                    </b-col>
                    <b-col>
                        <input type="number" class="form-control">   
                    </b-col>
                </b-row>

                <b-button style="margin: 10px;" variant="primary">{{$t("testcapacity.historyChart.addNewEntry")}}</b-button>
                <b-button style="margin: 10px;" v-b-toggle="'addEntryBox'" variant="primary">{{$t("testcapacity.historyChart.cancel")}}</b-button>
            </b-collapse>

            <div
                class=""
                v-for="(item, index) in formattedList"
                :key="index + item.createdAt + item.formattedDate + item.totalCapacity + item.usedCapacity + item.positiveRate + item.sampleBackup"
            >
                <div>
                    <b-row cols="7" class="box" >  
                        <b-col class="row align-items-center">
                            <div >{{ item.createdAt }} </div>
                        </b-col>
                        <b-col>
                            <div class="" id="numberDescription">{{ item.totalCapacity }}</div>{{$t("testcapacity.historyChart.capacity")}}
                        </b-col>
                        <b-col>
                            <div class="" id="numberDescription">{{ item.usedCapacity }}</div>{{$t("testcapacity.historyChart.tests")}}
                        </b-col>
                        <b-col>
                            <div class="" id="numberDescription">{{ item.sampleBackup }}</div>{{$t("testcapacity.historyChart.backlog")}}
                        </b-col>
                        <b-col>
                            <div class="" id="numberDescription">{{ item.positiveRate }}</div>{{$t("testcapacity.historyChart.positiveRate")}}
                        </b-col>
                        <b-col offset-md="1" class="d-flex flex-row-reverse">
                            <b-button v-b-toggle="'editBox'+index" variant="primary">{{$t("testcapacity.historyChart.editBox")}}<i class="bi bi-chevron-down"></i></b-button>
                        </b-col>
                    </b-row>
                </div>
                <b-collapse style="background-color:#DBDBDB; margin-top: 0; border-radius: 0px 0px 5px 5px;" :id="'editBox'+index" class="box" >
                    <b-row cols="5">   
                        <b-col>
                            <input type="date" class="form-control" :value="item.formattedDate"> 
                        </b-col>
                    </b-row>
                    <b-row cols="5" style="padding-top: 10px; padding-bottom: 10px"> 
                        <b-col  >
                            <input type="number" class="form-control" :value="item.totalCapacity">
                        </b-col>
                        <b-col>
                            <input type="number" class="form-control" :value="item.usedCapacity">  
                        </b-col>
                        <b-col>
                            <input type="number" class="form-control" :value="item.sampleBackup">
                        </b-col>
                        <b-col>
                            <input type="number" class="form-control" :value="item.positiveRate">   
                        </b-col>
                    </b-row >
                    <b-row cols="10" >
                        <b-col md="1" >
                            <b-button variant="primary">{{$t("testcapacity.historyChart.save")}}</b-button>
                        </b-col>
                        <b-col md="0.9" offset-md="1" >
                            <b-button v-b-toggle="'editBox'+index" variant="primary">{{$t("testcapacity.historyChart.cancel")}}</b-button>
                        </b-col>
                        <b-col md="1" offset-md="7">
                            <b-button variant="danger" >{{$t("testcapacity.historyChart.delete")}}</b-button>
                        </b-col>
                    </b-row>
                </b-collapse>
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
        //console.log(this.capacityList);
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
                        this.formattedList = this.formatData(success.body.data);
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
   
      formatData(bodyData) {
        let list = [];

        for(let item of bodyData){
            let d = new Date(item.createdAt);
            let locale = localStorage.getItem('locale')
            let ye = new Intl.DateTimeFormat(locale, { year: "numeric" }).format(d);
            let mo = new Intl.DateTimeFormat(locale, { month: "short" }).format(d);
            let mo_as_digit = new Intl.DateTimeFormat(locale, { month: "2-digit" }).format(d);
            let da = new Intl.DateTimeFormat(locale, { day: "2-digit" }).format(d);
            
            let fCreatedAt = `${da}-${mo}-${ye}`; 
            let fDate = `${ye}-${mo_as_digit}-${da}`;

            //console.log("Test: " + d.toISOString());

            let fTotalCapacity = item.totalCapacity.toFixed(0);
            let fUsedCapacity = item.usedCapacity.toFixed(0);
            let fSampleBackup = item.sampleBackup.toFixed(0);
            let fPositiveRate = item.positiveRate.toFixed(2);

            list.push({
                _id: item._id,
                createdAt: fCreatedAt,
                formattedDate:fDate,
                totalCapacity: fTotalCapacity,
                usedCapacity: fUsedCapacity,
                sampleBackup: fSampleBackup,
                positiveRate: fPositiveRate
            });
        }
        return list;
      }
    }
  }
</script>

<style scoped>
.box {
  background-color: rgba(255,255,255,1);
  border-radius: 5px;
  padding: 15px;
  margin-top: 10px;
}

#numberDescription{
    color: rgba(23, 120, 103, 1);
    font-size: 19px;
}

path {
    transition: all 1s;
}

.svgContainer {
    height: 300px;
}
</style>
