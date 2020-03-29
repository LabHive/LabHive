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
      <template v-for="(set, index) in searchData">
        <div :key="'row' + index" class="row mb-2">
          <div class="col-12">
            <p
              class="lead"
            >{{set.distance}} | {{ set.data.labContact.firstname }} {{ set.data.labContact.lastname }}</p>
          </div>
          <div class="col-12">
            <p>Wir suchen</p>
            <ul>
              <li v-if="set.data.lookingFor.humanRessources">Personal</li>
              <li
                v-if="set['data']['lookingFor']['devices']['RNA-Exctraction']"
              >{{$t("rnaExtraction")}}</li>
              <li v-if="set['data']['lookingFor']['devices']['testingKit']">{{$t("testKits")}}</li>
              <li
                v-if="set['data']['lookingFor']['devices']['dataEvaluation']"
              >{{$t("diagnostics")}}</li>
            </ul>
          </div>
          <div class="col-12">@: {{ set.data.labContact.email }}</div>
          <div class="col-12">T: {{ set.data.labContact.phone }}</div>

          <div class="col-12">{{ set.data.address.street }}</div>
          <div class="col-12">{{ set.data.address.zipcode }} {{ set.data.address.city }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {},
  computed: {
    searchData: function() {
      return this.$store.searchResults;
    }
  },
  data: function() {
    return {};
  },
  components: {},
  beforeMount: function() {
    this.$store.dispatch("getSearchResults");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
