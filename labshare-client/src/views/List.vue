<i18n>
{
  "en": {},
  "de": {
    "title": "Labore",
    "rnaExtraction": "RNA-Extraction",
    "testKits": "Test Kits",
    "diagnostics": "Diagnostiker"
  }
}
</i18n>
<template>
  <div class="list-view">
    <h1 class="mt-4">{{$t("title")}}</h1>
    <div class="container">
      <SearchForm @searchChange="updateListing" />
      <div v-for="(item, index) in searchResults._embedded" v-bind:key="index">
        
        <div v-if="searchAttributes.role==='lab'">
          <b-card :title="item.name">
            <b-card-text>
              City: {{item.address.city}} <br/>
              Streert: {{item.address.street}} <br/>
              Zipcode: {{item.address.zipcode}}
            </b-card-text>
            <b-link href="#" class="card-link">Contact</b-link>
            <b-link href="#" class="card-link">Get directions</b-link>
          </b-card>
        </div>

        <div v-if="searchAttributes.role==='human'">
          <b-card :title="item.availability ? 'Available' : 'Not available'">
            <b-card-text>
              City: {{item.address.city}} <br/>
              Zipcode: {{item.address.zipcode}}
            </b-card-text>

            <b-card-text>
              Skills: {{ item.details.skills }}
            </b-card-text>
            
            <b-link href="#" class="card-link">Contact</b-link>
            <b-link href="#" class="card-link">Get directions</b-link>
          </b-card>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from "./../components/SearchForm"

export default {
  name: "List",
  data: function() {
    return {
      searchResults: {},
      searchAttributes: {}
    };
  },
  methods: {
    updateListing(newSearchAttributes){
      this.searchAttributes = newSearchAttributes;
      this.getSearchResults()
    },
    getSearchResults() {
      this.$http.get('search', { params: { role: this.searchAttributes.role }})
      .then(success => {
        this.searchResults = success.body
      },
      error => {
        console.log(error)
      })
    }
  },
  components: {
    SearchForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
