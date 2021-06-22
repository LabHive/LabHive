<template>
<b-row align-h="center" align-v="center">
  <b-col class="bcol" sm="12" lg="6" xl="20">
    <div>
      <div class="box">
          <div class="box-header">
            <h4 style="color: #177867">{{$t("general.advice")}}</h4>
          </div>
            
            <hr><!-- Trennstrich -->
            <!-- Main Content (TODO) -->
      
          </div>
      </div>
              <!-- Aufruf der eigenen Box, Aufruf muss im script tag Z.35 importiert werden-->
            </b-col>
            <b-col class="bcol" sm="12" lg="6" xl="20">
                 <div>
          <div class="box">
            <div class="box-header">
              <h4 style="color: #177867">{{$t("general.advice")}}</h4>
            </div>
              
              <hr><!-- Trennstrich -->
              <!-- Main Content (TODO) -->
        
          </div>
      </div>
              <!-- Aufruf der eigenen Box, Aufruf muss im script tag Z.35 importiert werden-->
            </b-col>
            <b-col class="bcol" sm="12" lg="6" xl="20">
                  <div>
        <div class="box">
          <div class="box-header">
            <h4 style="color: #177867">{{$t("general.advice")}}</h4>
          </div>
            
            <hr><!-- Trennstrich -->
            <!-- Main Content (TODO) -->
      
        </div>
        </div>
              <!-- Aufruf der eigenen Box, Aufruf muss im script tag Z.35 importiert werden-->
            </b-col>
              <b-col class="bcol" sm="12" lg="6" xl="20">
                    <div>
                  <div class="box">
                    <div class="box-header">
                      <h4 style="color: #177867">{{$t("general.advice")}}</h4>
                    </div>
                      
                      <hr><!-- Trennstrich -->
                      <!-- Main Content (TODO) -->
                
                  </div>
              </div>
              <!-- Aufruf der eigenen Box, Aufruf muss im script tag Z.35 importiert werden-->
            </b-col>
          </b-row>


</template>

<style scoped>

.box {
  background-color: rgba(255,255,255,1);
  border-radius: 5px;
  padding: 20px;
}

.box-header {
  font-style: normal;
  color: #177867;
}

path {
      transition: all 1s;
    }

.svgContainer {
  height: 300px;
}
</style>


<script>


export default {
    mounted() {
        this.getResources();
        //console.log(this.capacityList);
    },

    data: function() {
      return {
        resources: []
      }
    },

    computed: {
        
    },

    methods: {

        //get capacity history from API. Parse and store in data->history and trigger visualization
        getResources() {
            return new Promise((res, rej) => {
                this.$http.get("testCapacity/getResources").then(
                    success => {
                        this.resources = success.body.data;
                        console.log(this.resources);
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