<template>
  <div class="coverage">
    <b-container>
      <b-row class="text-center">
        <b-col>
          <h3 data-aos="fade" data-aos-duration="750">{{ $t('landingpage.coverage.title') }}</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols lg="6" md="6" sm="12" class="d-flex justify-content-center" data-aos="fade-up" data-aos-duration="750">
          <l-map
            v-if="showMap"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: 514px; width: 438px;"
          >
            <l-marker v-for="marker in markers" :lat-lng="marker.position" :key="marker.id">
              <l-icon
                :icon-url="`${publicPath}map-icons/${marker.iconPath}`"
                :icon-size="iconSize"
                :icon-anchor="iconAnchor"
              ></l-icon>
            </l-marker>
            <l-tile-layer :url="url" :attribution="attribution" />
          </l-map>
        </b-col>
        <b-col cols lg="6" md="6" sm="12" class="stats" data-aos="fade-up" data-aos-duration="750" data-aos-delay="100">
          <b-row style="margin-bottom: 33px" align-v="center" align-h="center">
            <b-col class="totalStats" cols="auto">{{ $n(testsPerWeek) }}</b-col>
            <b-col class="totalDetails" lg="5" md="12">{{ $t('landingpage.coverage.testsPerWeek') }}<sup>1</sup></b-col>
            <a target= "_blank" 
              :href="$t('landingpage.coverage.link')" 
              id="rki-cit">
              <sup>1</sup>{{ $t('landingpage.coverage.referenceRKI', {date: $t('landingpage.coverage.update_date')}) }}
            </a>
          </b-row>
          <template v-if="markerCounts">
            <b-row class="statRow last" align-v="center">
              <b-col class="spacer"></b-col>
              <b-col class="detailsCount" sm="12" md="12"><img class="map-icon-counter" src="/map-icons/map-icon-diag.png"><span class="number">{{ markerCounts.lab_diag }}</span></b-col>
              <b-col class="details last" sm="12" md="12">{{ $tc('general.dCenter', 2) }}<sup>2</sup></b-col>
              <b-col class="spacer"></b-col>
            </b-row>
            <hr>
            <b-row class="statRow" align-v="center">
              <b-col class="spacer"></b-col>
              <b-col class="detailsCount" sm="12" md="12"><img class="map-icon-counter" src="/map-icons/map-icon-volunteer.png"><span class="number">{{ markerCounts.volunteer }}</span></b-col>
              <b-col class="details" sm="12" md="12">{{ $tc('general.qVolunteer', 2) }}<sup>2</sup></b-col>
              <b-col class="spacer"></b-col>
            </b-row>
            
            <b-row class="statRow" align-v="center">
              <b-col class="spacer"></b-col>
              <b-col class="detailsCount" sm="12" md="12"><img class="map-icon-counter" src="/map-icons/map-icon-research.png"><span class="number">{{ markerCounts.lab_research }}</span></b-col>
              <b-col class="details" sm="12" md="12">{{ $tc('general.rLab', 2) }}<sup>2</sup></b-col>
              <b-col class="spacer"></b-col>
            </b-row>
            <hr>
            <b-row class="statRow" align-v="center">
              <b-col class="spacer"></b-col>
              <b-col class="detailsCount" sm="12" md="12"><img class="map-icon-counter" src="/map-icons/map-icon-supplier.png"><span class="number">{{ markerCounts.supplier }}</span></b-col>
              <b-col class="details" sm="12" md="12">{{ $tc('general.supplier', 2) }}<sup>2</sup></b-col>
              <b-col class="spacer"></b-col>
            </b-row>
            
            <b-row>
              <b-col class="spacer"></b-col>
              <b-col cols="10" style="text-align: left; font-size: 12px"><p id="platform-cit"><sup>2</sup>{{ $t('landingpage.coverage.referenceRegistered') }}</p></b-col>
              <b-col class="spacer"></b-col>
            </b-row>
          </template>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { latLng, latLngBounds } from "leaflet";
import { LMap, LMarker, LTileLayer, LIcon } from "vue2-leaflet";

import { UserMapIconPaths } from "@/../dist-browser/lib/userRoles";

export default {
  name: "Coverage",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  data() {
    return {
      zoom: 5.7,
      center: latLng(51.1657, 10.4515),
      url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5,
        minZoom: 5.5,
        maxZoom: 11,
        maxBounds: new latLngBounds(
          [47.100045, 5.430908],
          [55.412386, 15.424805]
        )
      },
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      showMap: true,
      testsPerWeek: parseInt(this.$t("landingpage.coverage.testNumber")),
      markers: [],
      markerCounts: undefined,
      publicPath: process.env.BASE_URL
    };
  },
  created() {
    this.$http
      .get("test-coverage")
      .then(
        ({
          body: {
            data: { markerCounts, markers }
          }
        }) => {
          this.markerCounts = markerCounts;
          this.markers = markers.map(
            ({ latLong: { lat, long }, role }, index) => ({
              id: index,
              iconPath: UserMapIconPaths[role],
              position: { lat, lng: long },
              draggable: false,
              visible: true
            })
          );
        }
      )
      .catch(() => {
        console.log("Fetching test-coverage failed");
      });
  }
};
</script>
<style lang="scss" scoped>
$color-green: #177867;
$color-bkg-primary: #f7f6fd;

.coverage {
  background: $color-bkg-primary;
  position: relative;
  padding: 80px 0 80px 0; 

  @media (max-width: 991px) {
      padding: 40px 15px 40px 15px;
    }

  h3 {
  font-weight: normal;
  font-size: 32px;
  letter-spacing: 0;
  color: #000;
  margin: 0 0 80px 0;

  @media (max-width: 991px) {
      margin: 0 0 40px 0;
    }
  }

  .container {
    position: relative;
    z-index: 5;
  }

  figure {
    margin: 0;
  }

  dl {
    overflow: hidden;
    max-width: 340px;
    line-height: 52px;
    margin: 0;

    dt {
      width: 30%;
      float: left;
      clear: both;
      color: $color-green;
      font-family: Fira Sans;
      font-size: 44px;
      text-align: center;
      font-weight: normal;
      margin-bottom: 35px;
    }
    dd {
      float: right;
      font-size: 22px;
      width: 70%;
      margin: 0;
    }

    &.total-stats {
      padding-top: 60px;

      dt {
        border: 3px solid $color-green;
        box-sizing: border-box;
        border-radius: 5px;
        text-align: center;
        width: 50%;
        font-family: Fira Sans;
        margin-bottom: 40px;
      }
      dd {
        width: 50%;
        padding-left: 30px;
        line-height: 1.4;
      }
    }
  }
}

.statRow {
  margin-bottom: 20px;
  text-align: center;

  &.last {
    margin-bottom: 15px;
  }
}

.number {
  margin-top: 6px
}

.details {
  font-size: 22px;
}

.totalDetails {
  font-size: 22px;
}

.detailsCount {
  color: $color-green;
  font-family: Fira Sans;
  font-size: 33px;
  text-align: right;
  font-weight: normal;
  line-height: 41px;
  text-align: center;
}

.totalStats {
  border: 3px solid $color-green;
  box-sizing: border-box;
  border-radius: 5px;
  text-align: center;
  font-family: Fira Sans;
  line-height: 52px;
  font-size: 44px;
  color: $color-green;
}

@media (max-width: 992px) {
  .totalDetails {
    text-align: center;
    margin-top: 6px;
  }
}

@media (min-width: 767px) {
  hr {
    display: none;
  }
}

@media (max-width: 767px) {
  .coverage {
    padding-bottom: 20px;

    dl {
      dt {
        margin-bottom: 20px;
      }
      dd {
        font-size: 20px;
      }
    }
    dl.total-stats {
      padding-top: 40px;

      dt {
        margin-bottom: 20px;
      }
    }

    .stats {
      margin-top: 32px;
    }
  }

  .totalStats {
    margin-top: 20px
  }

  .totalDetails {
    text-align: center;
    margin-top: 6px;
  }

  .details {
    text-align: center;
    line-height: initial;
  }

  .detailsCount {
    margin: 0;
    text-align: center;
  }

}

.vue2leaflet-map {
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transition: all 0.15s ease-in-out;

  &:hover {
    box-shadow: 0 8px 20px rgba(0,0,0,0.20);
    transform: scale(1.01);
    transition: all 0.15s ease-in-out;
  }
}

#rki-cit {
  font-size: 12px;
  margin-right: auto;
  margin-left: 5.5em;

  @media (max-width: 1200px) {
    margin-left: 4.3em;
  }

  @media (max-width: 991px) {
    margin: 0 auto;
  }
}

#platform-cit {

  @media (max-width: 991px) {
    text-align: center;
  }
}

.map-icon-counter {
  width: 32px;
  height: 32px;
  margin-right: 16px;
  margin-bottom: 5px
}

$aos-distance: 32px;
@import 'node_modules/aos/src/sass/aos.scss';

</style>
