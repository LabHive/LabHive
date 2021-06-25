<template>
    <div>
        <b-row>
            <div class="data">
                <span class="data-value">{{totalData.totalTests}}</span>Tests per Week, Germany
            </div>
            
            <div class="data">
                <span class="data-value">{{totalData.volunteers}}</span>Qualified Volunteers
            </div>

            <div class="data">
                <span class="data-value">{{totalData.researchLabs}}</span>Research Laboratories 
            </div>

            <div class="data">
                <span class="data-value">{{totalData.diagnosticLabs}}</span>Diagnostic Laboratories
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
      }
    },

    computed: {
        
    },

    methods: {
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