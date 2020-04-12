<i18n>
    {
    "en": {
    "title": "Search",
    "diagnostics": "Diagnostics",
    "noResults": "No results could be found!"
    },
    "de": {
    "title": "Suche",
    "diagnostics": "Diagnostiker",
    "noResults": "Keine Ergebnisse gefunden!"
    }
    }
</i18n>
<template>
  <div class="list-view">
    <h1 class="mt-4">{{$t("title")}}</h1>
    <SearchForm @searchChange="updateListing" />

    <div style="margin-top: 40px">
      <b-table
        v-show="totalResults > 0"
        ref="table"
        :fields="fields"
        :items="items"
        :current-page="currentPage"
        hover
        stacked="md"
        per-page="20"
        @row-selected="onRowSelected"
        selectable
        select-mode="single"
      >
        <template v-slot:cell(lookingForSummary)="data">
          <span v-html="data.value"></span>
        </template>
        <template v-slot:cell(offersSummary)="data">
          <span v-html="data.value"></span>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <b-container fluid>
              <b-row>
                <b-col cols="auto" v-if="row.item.contact">
                  <strong>Vorname:</strong> {{ row.item.contact.firstname }}<br/>
                  <strong>Nachname:</strong> {{ row.item.contact.lastname }}<br/>
                  <strong>E-Mail:</strong> {{ row.item.contact.email }}<br/>
                  <strong>Phone:</strong> {{ row.item.contact.phone }}<br/>
                </b-col>

                <b-col cols="auto">
                  <strong>{{ $t('address') }}:</strong><br/>
                  {{ row.item.address.zipcode }}<br/>
                  {{ row.item.address.city }}<br/>
                  <span v-if="row.item.address.street">{{ row.item.address.street }}</span>
                </b-col>

                <b-col cols="auto" v-if="row.item.offers" v-html="row.item.offersSummary"></b-col>
                <b-col cols="auto" v-if="row.item.lookingFor" v-html="row.item.lookingForSummary"></b-col>
                <b-col cols="auto" v-if="row.item.details">
                  <strong>{{ $t('volunteerSkills') }}:</strong> <span v-html="row.item.detailsSummary"></span>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </template>
      </b-table>

      <h3 v-if="totalResults == 0">{{ $t("noResults") }}</h3>
    </div>

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

export default {
  name: "List",
  data: function() {
    return {
      searchAttributes: {},
      currentPage: 1,
      totalResults: 0,
      selectedRows: [],
    };
  },
  computed: {
    fields() {
      if (this.searchAttributes.role === "volunteer") {
        return [
          {
            key: "distance",
            label: "Distance"
          },
          {
            key: "resolvedAddress",
            label: "Location"
          },
          {
            key: "detailsSummary",
            label: "Skills"
          }
        ];
      } else if (this.searchAttributes.role === "lab_diag") {
        return [
          {
            key: "organization",
            label: "Name"
          },
          {
            key: "distance",
            label: "Distance"
          },
          {
            key: "resolvedAddress",
            label: "Location"
          },
          {
            key: "lookingForSummary",
            label: "Looking for"
          }
        ];
      } else if (this.searchAttributes.role === "lab_research") {
        return [
          {
            key: "organization",
            label: "Name"
          },
          {
            key: "distance",
            label: "Distance"
          },
          {
            key: "resolvedAddress",
            label: "Location"
          },
          {
            key: "offersSummary",
            label: "Offers"
          }
        ];
      }

      return [];
    }
  },
  methods: {
    onRowSelected(items) {
      this.selectedRows.map((item) => {
        item._showDetails = false
      })

      this.selectedRows = items
      this.selectedRows.map((item) => {
        item._showDetails = true
      })
    },
    updateListing(newSearchAttributes) {
      this.searchAttributes = newSearchAttributes;
      this.$refs.table.refresh();
    },
    getSearchResults(page) {
      this.searchAttributes.page = page;
      return new Promise((res, rej) => {
        this.$http.get("search", { params: this.searchAttributes }).then(
          success => {
            res(success.body);
          },
          error => {
            rej(error);
            console.log(error);
          }
        );
      });
    },
    items(ctx) {
      let page = ctx.currentPage;
      return this.getSearchResults(page)
        .then(body => {
          this.totalResults = body.totalResults;
          let b = body._embedded;

          return b.map(item => {
            item._showDetails = false
            item.distance = `${(item.distance / 1000).toFixed(1)} km`;
            let final = "";
            if (item.lookingFor) {
              for (let i in item.lookingFor) {
                if (item.lookingFor[i].length > 0) {
                  final += `<strong>${i}:</strong> ${item.lookingFor[i].join(
                    ", "
                  )}<br/>`;
                }
              }
              item.lookingForSummary = final;
            }

            final = ""
            if (item.offers) {
              for (let i in item.offers) {
                if (item.offers[i].length > 0) {
                  final += `<strong>${i}:</strong> ${item.offers[i].join(
                    ", "
                  )}<br/>`;
                }
              }
              item.offersSummary = final;
            }

            if (item.address) {
              let r = `${item.address.zipcode}, ${item.address.city}`;
              item.resolvedAddress = r;
            }

            if (item.details) {
              item.detailsSummary = item.details.skills.join(", ");
            }
            return item;
          });
        })
        .catch(() => {
          return [];
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
.search-results {
  margin-top: 4em;
}
</style>
