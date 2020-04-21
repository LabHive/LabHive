<i18n>
{
  "en": {
    "noResults": "No results. Try other search criteria or stop by later",
    "title": "Search",
    "offersadvice": "Offers help",
    "lookingForadvice": "Help needed",
    "offersequipment": "Offers Devices/Reagents",
    "lookingForequipment": "Devices/Reagents needed",
    "volunteer": "Qualified Volunteers",
    "farAway": "far away",
    "error": "An error occurred, please try it again later.",
    "other": "Other"
  },
  "de": {
    "title": "Suche",
    "noResults": "Keine Treffer. Andere Suchkriterien verwenden oder später vorbei schauen",
    "farAway": "entfernt",
    "volunteer": "Qualifizierter Freiwilliger",
    "offersadvice": "Hilfe anzubieten",
    "lookingForadvice": "Hilfe benötigt",
    "offersequipment": "Geräte/Reagenzien anzubieten",
    "lookingForequipment": "Geräte/Reagenzien benötigt",
    "error": "Es ist ein Fehler aufgetreten, bitte versuchen Sie es später erneut.",
    "other": "Andere"
    }
    }
</i18n>
<template>
  <div class="list-view">
    <h1 class="mt-4">{{$t("title")}}</h1>
    <SearchForm @searchChange="updateListing" />

    <transition name="hoverIn" mode="out-in">
      <div
        v-if="(this.searchResults.length === 0 || this.error) && !initial"
        style="margin-top: 30px"
        key="1"
      >
        <b-row>
          <b-col col></b-col>
          <b-col cols="auto" style="text-align: center;">
            <img src="../assets/No-Search-Results-Illustration.svg" />
            <p style="margin-top: 15px">
              <strong v-if="!error">{{ $t('noResults') }}</strong>
              <strong v-else>{{ $t('error') }}</strong>
            </p>
          </b-col>
          <b-col col></b-col>
        </b-row>
      </div>

      <div v-else key="2">
        <transition-group name="refresh" tag="div" class="sr-container" @before-leave="fixSize">
          <div
            class="search-result"
            v-for="(item) in searchResults"
            :key="item.header + item.center + item.subHeader + item.user.slug"
            @click="showDetails(item.user)"
          >
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
          style="margin-top:30px"
          @change="pageChanged"
        ></b-pagination>
      </div>
    </transition>
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
      rawSearchResults: [],
      searchResults: [],
      error: false,
      initial: true
    };
  },
  computed: {},
  methods: {
    updateListing(newSearchAttributes) {
      this.searchAttributes = newSearchAttributes;
      this.getSearchResults(this.currentPage);
    },
    pageChanged() {
      this.$nextTick(() => {
        this.getSearchResults(this.currentPage);
      });
    },
    getSearchResults(page) {
      this.searchAttributes.page = page;
      this.$http.get("search", { params: this.searchAttributes }).then(
        success => {
          this.initial = false;
          this.error = false;
          this.rawSearchResults = success.body._embedded;
          this.totalResults = success.body.totalResults;

          this.refreshSearchResults();
        },
        error => {
          this.rawSearchResults = [];
          this.totalResults = 0;
          this.error = true;
          console.log(error);
        }
      );
    },
    fixSize(el) {
      const { marginLeft, marginTop, width, height } = window.getComputedStyle(
        el
      );
      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
      el.style.width = width;
      el.style.height = height;
    },

    refreshSearchResults() {
      const faIcons = {
        equipment: "cubes",
        advice: "hands-helping"
      };
      let tmp_searchResults = this.rawSearchResults.map(x => {
        let subHeader = `${x.address.zipcode} ${x.address.city}`;
        if (x.distance != null) {
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
                      return '•&nbsp;' + this.$t(y);
                    })
                    .sort()
                    .join("&emsp;&emsp;&emsp;&emsp;&emsp;"),
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
                      return '•&nbsp;' + this.$t(y);
                    })
                    .sort()
                    .join("&emsp;&emsp;&emsp;&emsp;&emsp;"),
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
                  return '•&nbsp;' + this.$t(y);
                })
                .sort()
                .join("&emsp;&emsp;&emsp;&emsp;&emsp;"),
              user: x
            };
            if (result.center == '') {
              if (result.user.description == "") {
                return searchResults
              }
              result.center = "• " + this.$t("other")
            }
            searchResults.push(result);
            break;
          }
        }

        return searchResults;
      });

      if (!tmp_searchResults) {
        this.error = true;
      } else {
        this.searchResults = tmp_searchResults.flat();
      }
    },
    showDetails(user) {
      this.$router.push({ name: 'details', params: { id: user.slug, profileData: user }});
    }
  },
  components: {
    SearchForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.refresh-leave-active {
  transition: opacity 0.25s;
  position: absolute;
}

.refresh-enter-active {
  transition: opacity 0.25s;
}

.refresh-enter,
.refresh-leave-to {
  opacity: 0;
}

.refresh-move {
  transition: transform 0.5s;
}

.hoverIn-enter-active,
.hoverIn-leave-active {
  transition: all 0.25s;
}

.hoverIn-enter,
.hoverIn-leave-to {
  opacity: 0;
  transform: translateY(30px);
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
  transition: all 0.15s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(0,0,0,0.20);
    transform: scale(1.01);
    transition: all 0.15s ease-in-out;
  }

  @media (max-width: 768px) {
    flex-basis: 100% !important;
  }
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
  hyphens: auto;
}

.sr-footer {
  margin-top: 4px;
  color: #898b91;
  font-size: 12px;
}
</style>
