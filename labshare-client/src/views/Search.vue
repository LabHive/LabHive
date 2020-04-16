<i18n>
{
  "en": {
    "noResults": "No results could be found!",
    "title": "Search"
  },
  "de": {
    "title": "Suche nach Ressourcen",
    "rnaExtraction": "RNA-Extraction",
    "testKits": "Test Kits",
    "diagnostics": "Diagnostiker",
    "noResults": "Keine Ergebnisse gefunden!",
    "offerEquipment": "Equipment anzubieten",
    "requestEquipment": "Benötigt Equipment",
    "farAway": "entfernt",
    "lab_research": "Forschungslabor",
    "lab_diag": "Diagnostikzentrum",
    "volunteer": "Qualifizierter Freiwilliger",
    "requests": "Benötigt",
    "offers": "Bietet",
    "equipment": "Equipment",
    "advice": "Beratung",
    "qualifiedVolunteers": "Qualif. Freiwillige"
    }
    }
</i18n>
<template>
  <div class="list-view">
    <h1 class="mt-4">{{$t("title")}}</h1>
    <SearchForm @searchChange="updateListing" />

    <b-container fluid>
      <b-row align-v="center" v-for="(chunk, i) in searchResults" :key="i">
        <b-col class="result-row" cols="md" md="6" lg="5" v-for="(item, j) in chunk" :key="i*2 + j">
          <div class="search-result">
            <div class="sr-header">{{ item.header }}</div>
            <div class="sr-subHeader">{{ item.subHeader }}</div>
            <div class="sr-center" v-html="item.center"></div>
            <div class="sr-footer">{{ item.footer }}</div>
          </div>
        </b-col>
      </b-row>
    </b-container>


    <b-pagination
      v-if="totalResults > 20"
      v-model="currentPage"
      :total-rows="totalResults"
      :per-page="20"
      aria-controls="table"
    ></b-pagination>
  </div>
</template>

<script>
import SearchForm from "./../components/SearchForm";
import { chunk } from "lodash"

export default {
  name: "List",
  data: function() {
    return {
      searchAttributes: {},
      currentPage: 1,
      totalResults: 0,
      selectedRows: [],
      searchResults: []
    };
  },
  computed: {
    
  },
  methods: {
    updateListing(newSearchAttributes) {
      this.searchAttributes = newSearchAttributes;
      this.getSearchResults(this.currentPage).then((res) => {
        this.searchResults = chunk(res.map((x) => {
          x.subHeader = `${x.address.zipcode} ${x.address.city}`
          if (x.distance) {
            x.distance = `${(x.distance / 1000).toFixed(2)} km`
            x.subHeader += `, ${x.distance} ${this.$t('farAway')}`
          }
          
          x.header = `${this.$t(x.role)}`
          x.footer = ""

          switch(x.role) {
            case 'lab_research':
            case 'lab_diag': {
              x.footer = `${x.organization}, ${x.address.street}`
              if (this.searchAttributes.mode && this.searchAttributes.filterBy) {
                const tmp = x[this.searchAttributes.mode][this.searchAttributes.filterBy].map((y) => {return this.$t(y)}).join(", ")
                x.center = `${tmp}`
              }
              else {
                let lookingFor = []
                if (x.lookingFor?.equipment.length > 0) lookingFor.push('equipment')
                if (x.lookingFor?.advice.length > 0) lookingFor.push('advice')
                if (x.lookingFor?.volunteerSkills.length > 0) lookingFor.push('qualifiedVolunteers')

                let offers = []
                if (x.offers?.equipment.length > 0) offers.push('equipment')
                if (x.offers?.advice.length > 0) offers.push('advice')
                
                let center = ""
                if (lookingFor.length > 0) {
                  center += `${this.$t('requests')} ` + lookingFor.map((x) => {return this.$t(x)}).join(", ")
                  center += "<br/>"
                }
                if (offers.length > 0) {
                  center += `${this.$t('offers')} ` + offers.map((x) => {return this.$t(x)}).join(", ")
                }
                x.center = center
              }
              
              break;
            }

            case 'volunteer': {
              const tmp = x.details.skills.map((y) => {return this.$t(y)}).join(", ")
              x.center = `${tmp}`
              break;
            }
          }


          return x
        }), 2)
      })
    },
    getSearchResults(page) {
      this.searchAttributes.page = page;
      return new Promise((res, rej) => {
        this.$http.get("search", { params: this.searchAttributes }).then(
          success => {
            res(success.body._embedded);
          },
          error => {
            rej(error);
            console.log(error);
          }
        );
      });
    }
  },
  components: {
    SearchForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-result {
  padding: 16px 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background-color: white;
}

.search-result:hover {
  cursor: pointer;
}


.result-row {
  margin-top: 2em
}

.sr-header {
  font-style: normal;
  color: #177867;
}

.sr-subHeader {
  font-size: 12px;
  line-height: 14px;
  color: #898B91;
  margin-top: 16px;
}

.sr-center {
  color: #000000;
  font-size: 16px;
  margin-top: 4px;
}

.sr-footer {
  margin-top: 4px;
  color: #898B91;
  font-size: 12px;
}
</style>
