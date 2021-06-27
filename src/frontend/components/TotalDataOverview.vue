<template>
    <div>
        <b-row>
            <div class="data" v-b-hover="handleHover">
                <div v-if="isHovered">
                {{$t("totalDataOverview.dailySituation")}} {{ currentDate }}       
                </div>
                <div v-else>
                    <b-icon-info-circle class="float-right"></b-icon-info-circle>
                    <span class="data-value">{{totalData.totalTests}}   </span>{{$t("totalDataOverview.testPerWeek")}}
                </div>              
            </div>
            <div class="data" v-b-hover="handleHover1">
                <div v-if="isHovered1">
                    {{$t("totalDataOverview.registeredON")}}       
                </div>
                <div v-else>
                    <b-icon-info-circle class="float-right"></b-icon-info-circle>
                    <span class="data-value">{{totalData.volunteers}} </span>{{$t("totalDataOverview.qualifiedVolunteers")}}
                </div>                
            </div>

            <div class="data" v-b-hover="handleHover2">
                <div v-if="isHovered2">
                    {{$t("totalDataOverview.registeredON")}}       
                </div>
                <div v-else>
                    <b-icon-info-circle class="float-right"></b-icon-info-circle>
                    <span class="data-value">{{totalData.researchLabs}} </span>{{$t("totalDataOverview.researchLab")}}
                </div>                
            </div>

            <div class="data" v-b-hover="handleHover3">
                <div v-if="isHovered3">
                    {{$t("totalDataOverview.registeredON")}}       
                </div>
                <div v-else>
                    <b-icon-info-circle class="float-right"></b-icon-info-circle>
                    <span class="data-value">{{totalData.diagnosticLabs}} </span>{{$t("totalDataOverview.digData")}}
                </div>
            </div>
        </b-row>
    </div>
    
</template>

<script>

export default {
   

    mounted() {
        this.getTotalData();
    },

    data: function() {
      return {
        totalData: [], 
        isHovered: false,
        isHovered1: false,
        isHovered2: false,
        isHovered3: false,
      }
    },

    computed: {
        currentDate(){
        const current = new Date();
        const date = `${current.getDate()}-${current.getMonth()}-${current.getFullYear()}`;
        return date;
    },
        
    },

    methods: {

        handleHover(hovered) {
            this.isHovered = hovered
        },
        handleHover1(hovered) {
            this.isHovered1 = hovered
        },
        handleHover2(hovered) {
            this.isHovered2 = hovered
        },
        handleHover3(hovered) {
            this.isHovered3 = hovered
        },

        
        getTotalData() {
            return new Promise((res, rej) => {
                this.$http.get("testCapacity/totalData").then(
                    success => {
                        this.totalData = success.body.data;
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

<style>

.data {
    color: #000000;
    margin: 4px 10px;
    background: #F0F3F3;
    border-radius: 5px;
    padding: 11.5px 10px;
    margin-left: 15px;
    font-family: Fira Sans;
}

.data-value {
    font-size: 24px;
    margin-right: 10px;
}
</style>