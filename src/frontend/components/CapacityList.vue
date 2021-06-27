<template>
    <div >
        <div>
            <!-- Main Content -->

                       
            <div class="d-flex flex-row-reverse bd-highlight">     
                <b-button v-b-toggle="'addEntryBox'" variant="primary">{{$t("testcapacity.historyChart.addNewEntry")}}</b-button>
            </div>
            <b-collapse style="background-color:#DBDBDB;" id="addEntryBox" class="box" >
                <b-row cols="5">
                    <b-col>
                        <input id="new_date" type="date" class="form-control"> 
                    </b-col>
                </b-row>
                <b-row cols="5"> 
                    <b-col>
                        <input id="new_totalCapacity" type="number" class="form-control" placeholder="Total Capacity">
                    </b-col>
                    <b-col>
                        <input id="new_usedCapacity" type="number" class="form-control" placeholder="Used Capacity">  
                    </b-col>
                    <b-col>
                        <input id="new_sampleBackup" type="number" class="form-control" placeholder="Backup Sample">
                    </b-col>
                    <b-col>
                        <input id="new_positiveRate" type="number" class="form-control" placeholder="Positive Rate">   
                    </b-col>
                </b-row>

                <b-button style="margin: 10px;" variant="primary" v-on:click="addEntry()">{{$t("testcapacity.historyChart.addNewEntry")}}</b-button>
                <b-button style="margin: 10px;" v-b-toggle="'addEntryBox'" variant="primary">{{$t("testcapacity.historyChart.cancel")}}</b-button>
            </b-collapse>

            <div
                class=""
                v-for="(item, index) in formattedList"
                :key="index + + item._id + item.createdAt + item.formattedDate + item.totalCapacity + item.usedCapacity + item.positiveRate + item.sampleBackup"
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
                            <div class="" id="numberDescription">{{ item.sampleBackup == null ? '0':item.sampleBackup}}</div>{{$t("testcapacity.historyChart.backlog")}}
                        </b-col>
                        <b-col>
                            <div class="" id="numberDescription">{{ item.positiveRate == null ? '0': item.positiveRate }}</div>{{$t("testcapacity.historyChart.positiveRate")}}
                        </b-col>
                        <b-col offset-md="1" class="d-flex flex-row-reverse">
                            <b-button v-b-toggle="'editBox'+index" variant="primary">{{$t("testcapacity.historyChart.editBox")}}<i class="bi bi-chevron-down"></i></b-button>
                        </b-col>
                    </b-row>
                </div>
                <b-collapse style="background-color:#DBDBDB; margin-top: 0; border-radius: 0px 0px 5px 5px;" :id="'editBox'+index" class="box" >
                    <b-row cols="5">   
                        <b-col>
                            <input :id="index+'_date'" type="date" class="form-control" :value="item.formattedDate"> 
                        </b-col>
                    </b-row>
                    <b-row cols="5" style="padding-top: 10px; padding-bottom: 10px"> 
                        <b-col  >
                            <input :id="index+'_totalCapacity'" type="number" class="form-control" :value="item.totalCapacity">
                        </b-col>
                        <b-col>
                            <input :id="index+'_usedCapacity'" type="number" class="form-control" :value="item.usedCapacity">  
                        </b-col>
                        <b-col>
                            <input :id="index+'_sampleBackup'" type="number" class="form-control" :value="item.sampleBackup">
                        </b-col>
                        <b-col>
                            <input :id="index+'_positiveRate'" type="number" class="form-control" :value="item.positiveRate">   
                        </b-col>
                    </b-row >
                    <b-row cols="10" >
                        <b-col md="1" >
                            <b-button v-on:click="updateEntry(index, item._id)" variant="primary">{{$t("testcapacity.historyChart.save")}}</b-button>
                        </b-col>
                        <b-col md="0.9" offset-md="1" >
                            <b-button v-b-toggle="'editBox'+index" variant="primary">{{$t("testcapacity.historyChart.cancel")}}</b-button>
                        </b-col>
                        <b-col md="1" offset-md="7">
                            <b-button v-on:click="deleteEntry(item._id)" variant="danger" >{{$t("testcapacity.historyChart.delete")}}</b-button>
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
    },

    data: function() {
      return {
        capacityList: [], //all data storage
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

        readEntry(prefix){
            let mainPart = {
                createdAt: new Date(document.getElementById(prefix + "_date").value),
                totalCapacity: parseInt(document.getElementById(prefix + "_totalCapacity").value),
                usedCapacity: parseInt(document.getElementById(prefix + "_usedCapacity").value),
            }

            let secondPart = {}
            let sampleBackup = document.getElementById(prefix + "_sampleBackup").value;
            if(!(sampleBackup == "")){
                secondPart = {sampleBackup: parseInt(sampleBackup)};
            }

            let thirdPart = {}
            let positiveRate = document.getElementById(prefix + "_positiveRate").value;
            if(!(positiveRate == "")){
                thirdPart = {positiveRate: parseInt(positiveRate)};
            }

            let entry = {
                ...mainPart,
                ...secondPart,
                ...thirdPart
            };

            return entry;
        },

        addEntry(){
            return new Promise((res, rej) => {
                let entry = this.readEntry("new");

                this.$http.post("testCapacity/add", entry).then(
                    success => {
                        success;
                        this.pageChanged();
                    },
                    error => {
                        rej(error);
                        this.error = "no data";
                        console.log(error);
                    }
                );
            });
        },
        deleteEntry(id) {
            return new Promise((res, rej) => {
                this.$http.post("testCapacity/delete", {_id: id}).then(
                    success => {
                        success;
                        this.pageChanged();
                    },
                    error => {
                        rej(error);
                        this.error = "no data";
                        console.log(error);
                    }
                );
            });
        },

        updateEntry(index, id){
            return new Promise((res, rej) => {
                let entry = this.readEntry(index);

                this.$http.post("testCapacity/update", {_id: id, data: entry}).then(
                    success => {
                        success;
                        this.pageChanged();
                    },
                    error => {
                        rej(error)
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

                let fTotalCapacity = item.totalCapacity == null ? 0 : item.totalCapacity.toFixed(0);
                let fUsedCapacity = item.usedCapacity == null ? 0 : item.usedCapacity.toFixed(0);
                let fSampleBackup = item.sampleBackup == null ? null : item.sampleBackup.toFixed(0);
                let fPositiveRate = item.positiveRate == null ? null : item.positiveRate.toFixed(2);

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

input {
    width: 200px;
}

.numInput{
    width: 200px;
    margin: 4px;
    margin-left: 15px;
}
</style>
