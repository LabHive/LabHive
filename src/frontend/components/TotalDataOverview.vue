<template>
    <div>
        <b-row>
            <div class="data" v-b-hover="handleHover">
                <div v-if="isHovered">
                    Daily situation report about COVID-19 by the RKI,<br> December 2nd 2020       
                </div>
                <div v-else>
                    <b-icon-info-circle class="float-right"></b-icon-info-circle>
                    <span class="data-value">{{totalData.totalTests}}</span>Tests per Week, Germany
                </div>                
            </div>
            <div class="data" v-b-hover="handleHover1">
                <div v-if="isHovered1">
                    Daily situation report about COVID-19 by the RKI,<br> December 2nd 2020       
                </div>
                <div v-else>
                    <b-icon-info-circle class="float-right"></b-icon-info-circle>
                    <span class="data-value">{{totalData.volunteers}}</span>Qualified Volunteers
                </div>                
            </div>

            <div class="data" v-b-hover="handleHover2">
                <div v-if="isHovered2">
                    Daily situation report about COVID-19 by the RKI,<br> December 2nd 2020       
                </div>
                <div v-else>
                    <b-icon-info-circle class="float-right"></b-icon-info-circle>
                    <span class="data-value">{{totalData.researchLabs}}</span>Research Laboratories
                </div>                
            </div>

            <div class="data" v-b-hover="handleHover3">
                <div v-if="isHovered3">
                    Daily situation report about COVID-19 by the RKI,<br> December 2nd 2020       
                </div>
                <div v-else>
                    <b-icon-info-circle class="float-right"></b-icon-info-circle>
                    <span class="data-value">{{totalData.diagnosticLabs}}</span>Diagnostic Laboratories
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
        isHovered: Boolean,
        isHovered1: Boolean,
        isHovered2: Boolean,
        isHovered3: Boolean,
      }
    },

    computed: {
        
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