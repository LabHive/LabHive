<i18n>
{
  "en": {},
  "de": {
    "title": "Suche",
    "rnaExtraction": "RNA-Extraction",
    "testKits": "Test Kits",
    "diagnostics": "Diagnostiker",
    "searchResults": "Suchergebnisse"
  }
}
</i18n>
<template>
  <div class="list-view">
    <h1 class="mt-4">{{$t("title")}}</h1>
      <SearchForm @searchChange="updateListing" />
      <table class="table search-results" v-if="searchResults._embedded">
        <template v-if="searchAttributes.role==='lab'">
          <thead>
            <tr>
              <th>Name</th>
              <th>Distance</th>
              <th>City</th>
              <th>Postleitzahl</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in searchResults._embedded" v-bind:key="index">
            <tr>
              <td><b-link href="#">{{ item.name }}</b-link></td>
              <td>{{ (item.distance/1000).toFixed(1) }}km</td>
              <td>{{ item.address.city }}</td>
              <td>{{ item.address.zipcode }}</td>
            </tr>
          </tbody>
        </template>
        <template v-if="searchAttributes.role==='human'">
          <thead>
            <tr>
              <th>Availability</th>
              <th>City</th>
              <th>Postleitzahl</th>
              <th>Skills</th>
            </tr>
          </thead>     
          <tbody v-for="(item, index) in searchResults._embedded" v-bind:key="index">
            <tr>
              <td><b-link href="#">{{ item.availability ? 'Available' : 'Not available' }}</b-link></td>
              <td>{{ item.address.city }}</td>
              <td>{{ item.address.zipcode }}</td>
              <td><span class="d-inline-block text-truncate">{{ item.details.skills }}</span></td>
            </tr>
          </tbody>
        </template>
      </table>
  </div>
</template>

<script>
import SearchForm from "./../components/SearchForm";

export default {
  name: "List",
  data: function() {
    return {
      searchResults: {},
      searchAttributes: {}
    };
  },
  methods: {
    updateListing(newSearchAttributes) {
      this.searchAttributes = newSearchAttributes;
      this.getSearchResults();
    },
    getSearchResults() {
      this.$http.get("search", { params: this.searchAttributes }).then(
        success => {
          this.searchResults = success.body;
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  components: {
    SearchForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-results {
  margin-top: 4em
}
</style>
