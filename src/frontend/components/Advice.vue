<template>
<b-row align-h="center" align-v="center">
      <div key="2" data-aos="fade-up" data-aos-duration="750">
        <transition-group name="refresh" tag="div" class="rl-container" @before-leave="fixSize">
          <div
            class="resource-list"
            v-for="(item) in resourcesFormatted"
            :key="item.header + item.content"
          >
            <div class="rl-header">
              <font-awesome-icon :icon="item.faIcon" />
              {{ item.header }}
              <b-button pill variant="primary">Update<i class="bi bi-chevron-down"></i></b-button>
            </div>
            <hr>
            <div class="rl-body">
              <div class="rl-entry" v-for="item in item.content" :key="item">
                {{ item }}
              </div>
            </div>
          </div>

        </transition-group>
        </div>
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
        //console.log(this.resources);
    },

    data: function() {
      return {
        resources: [],
        resourcesFormatted: []
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
                        this.refreshSearchResults();
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
        refreshSearchResults() {
          const faIcons = {
            equipment: "cubes",
            advice: "hands-helping"
          };

          let tmp_resources = this.resources.map(x => {
            let searchResults = [];

            switch (x.role) {
              case "lab_research":
              case "supplier":
              case "lab_diag": {
                for (const i in x.lookingFor) {
                  if (
                    !Array.isArray(x.lookingFor[i]) ||
                    x.lookingFor[i].length === 0 ||
                    i === "volunteerSkills"
                  )
                    continue;

                  const result = {
                    header: this.$t(`search.lookingFor${i}`),
                    faIcon: "search",
                    content: x.lookingFor[i]
                      .map(y => {
                        return this.$t(`checkboxes.${i}.${y}`);
                      })
                      .sort(),
                  };

                  searchResults.push(result);
                }
                for (const i in x.offers) {
                  if (!Array.isArray(x.offers[i]) || x.offers[i].length === 0)
                    continue;

                  const result = {
                    header: this.$t(`search.offers${i}`),
                    faIcon: faIcons[i],
                    content: x.offers[i]
                      .map(y => {
                        return this.$t(`checkboxes.${i}.${y}`);
                      })
                      .sort(),
                  };

                  console.log(result);

                  searchResults.push(result);
                }
                
                break;
              }
              case "volunteer":
            }

            return searchResults;
          });

          if (!tmp_resources) {
            this.error = true;
          } else {
            this.resourcesFormatted = tmp_resources.flat();
          }
        }
    }
  }
</script><!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.resource-list {
  padding: 16px 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background-color: white;
  flex-basis: calc(50% - 16px);
  margin-bottom: 24px;
  display: inline-block;
  transition: all 0.5s;
  transition: all 0.15s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(0,0,0,0.20);
    transition: all 0.15s ease-in-out;
  }

  @media (max-width: 768px) {
    flex-basis: 100% !important;
  }
}

.result-row {
  margin-top: 2em;
}

.rl-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.rl-header {
  font-style: normal;
  color: #177867;
}

.rl-body {
  font-size: 16px;
  margin-top: 4px;
  hyphens: auto;
  display: flex;
}


.rl-entry {
  color: #000000;
  margin: 0px 10px;
  background: #F0F3F3;
  border-radius: 5px;
  padding: 11.5px 10px;

  font-family: Fira Sans;
  font-size: 15px;



}

$aos-distance: 32px;
@import 'node_modules/aos/src/sass/aos.scss';

</style>
