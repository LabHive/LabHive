<i18n>
{
  "en": {
    "noResults": "No results could be found!",
    "title": "Search"
  },
  "de": {
    "title": "Suche nach Ressourcen",
    "noResults": "Keine Ergebnisse gefunden!",
    "farAway": "entfernt",
    "volunteer": "Qualifizierter Freiwilliger",
    "equipment": "Equipment",
    "advice": "Beratung",
    "offersadvice": "Hilfe anzubieten",
    "lookingForadvice": "Hilfe benötigt",
    "offersequipment": "Equipment anzubieten",
    "lookingForequipment": "Equipment benötigt"
    }
    }
</i18n>
<template>
  <div class="list-view">
    <h1 class="mt-4">{{$t("title")}}</h1>
    <SearchForm @searchChange="updateListing" />

    <HeightTransition>
      <h3 v-if="this.searchResults.length === 0" style="margin-top: 20px">{{ $t("noResults") }}</h3>
    </HeightTransition>

    <transition-group name="refresh" tag="div" class="sr-container" @before-leave="fixSize">
      <div class="search-result" v-for="(item) in searchResults" :key="item.header + item.center + item.subHeader + item.user.slug">
        <div class="sr-header">
          <font-awesome-icon :icon="item.faIcon" />
          {{ item.header }}
        </div>
        <div class="sr-subHeader">{{ item.subHeader }}</div>
        <div class="sr-center" v-html="item.center"></div>
        <div class="sr-footer">{{ item.footer }}</div>
      </div>
    </transition-group>

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
import HeightTransition from "./../components/HeightTransition"
//import { chunk } from "lodash";

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
  computed: {},
  methods: {
    updateListing(newSearchAttributes) {
      this.searchAttributes = newSearchAttributes;
      const faIcons = {
        equipment: "cubes",
        advice: "hands-helping"
      };
      this.getSearchResults(this.currentPage).then(res => {
        let tmp_searchResults = res.map(x => {
          let subHeader = `${x.address.zipcode} ${x.address.city}`;
          if (x.distance) {
            let distance = `${(x.distance / 1000).toFixed(2)} km`;
            subHeader += `, ${distance} ${this.$t("farAway")}`;
          }

          let footer = "";
          let searchResults = [];

          switch (x.role) {
            case "lab_research":
            case "lab_diag": {
              footer = `${x.organization}, ${x.address.street}`;

              if (
                x.lookingFor &&
                (this.searchAttributes.mode == "lookingFor" ||
                  !this.searchAttributes.mode)
              ) {
                for (const i in x.lookingFor) {
                  if (
                    !Array.isArray(x.lookingFor[i]) ||
                    x.lookingFor[i].length === 0 ||
                    i === "volunteerSkills"
                  )
                    continue;
                  if (
                    this.searchAttributes.filterBy &&
                    this.searchAttributes.filterBy !== i
                  )
                    continue;

                  const result = {
                    header: this.$t("lookingFor" + i),
                    faIcon: "search",
                    subHeader: subHeader,
                    footer: footer,
                    center: x.lookingFor[i]
                      .map(y => {
                        return this.$t(y);
                      })
                      .join(", "),
                    user: x
                  };

                  searchResults.push(result);
                }
              }

              if (
                x.offers &&
                (this.searchAttributes.mode == "offers" ||
                  !this.searchAttributes.mode)
              ) {
                for (const i in x.offers) {
                  if (!Array.isArray(x.offers[i]) || x.offers[i].length === 0)
                    continue;
                  if (
                    this.searchAttributes.filterBy &&
                    this.searchAttributes.filterBy !== i
                  )
                    continue;

                  const result = {
                    header: this.$t("offers" + i),
                    faIcon: faIcons[i],
                    subHeader: subHeader,
                    footer: footer,
                    center: x.offers[i]
                      .map(y => {
                        return this.$t(y);
                      })
                      .join(", "),
                    user: x
                  };

                  searchResults.push(result);
                }
              }

              break;
            }

            case "volunteer": {
              const result = {
                header: this.$t("volunteer"),
                faIcon: "user-alt",
                subHeader: subHeader,
                footer: footer,
                center: x.details.skills
                  .map(y => {
                    return this.$t(y);
                  })
                  .join(", "),
                user: x
              };
              searchResults.push(result);
              break;
            }
          }

          return searchResults;
        });

        this.searchResults = tmp_searchResults.flat();
      });
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
    },
    fixSize(el) {
      const {marginLeft, marginTop, width, height} = window.getComputedStyle(el)
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
      el.style.width = width
      el.style.height = height
    }
  },
  components: {
    SearchForm,
    HeightTransition
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.refresh-leave-active {
  transition: opacity 0.25s;
  position: absolute;
}

.refresh-enter-active {
  transition: opacity 0.25s;
}

.refresh-enter, .refresh-leave-to {
  opacity: 0;
}

.refresh-move {
  transition: transform 0.5s;
}

@media (max-width: 768px) { 
  .search-result {
    flex-basis: 100% !important;
  }
  
}

.search-result {
  padding: 16px 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  background-color: white;
  flex-basis: calc(50% - 16px);
  margin-top: 24px;
  display: inline-block;
  transition: all 0.5s;
}

.search-result:hover {
  cursor: pointer;
}

.result-row {
  margin-top: 2em;
}

.sr-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.sr-header {
  font-style: normal;
  color: #177867;
}

.sr-subHeader {
  font-size: 12px;
  line-height: 14px;
  color: #898b91;
  margin-top: 16px;
}

.sr-center {
  color: #000000;
  font-size: 16px;
  margin-top: 4px;
}

.sr-footer {
  margin-top: 4px;
  color: #898b91;
  font-size: 12px;
}
</style>
