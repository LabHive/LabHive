<template>
  <div class="coverage">
    <b-container>
      <b-row class="text-center">
        <b-col>
          <h3 data-aos="fade" data-aos-duration="750">{{ $t('landingpage.coverage.title') }}</h3>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col class="text-center title-subtitle" sm="12" lg="10" xl="8">
          <p data-aos="fade" data-aos-duration="750">{{ $t('landingpage.coverage.subTitle') }}</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols lg="6" md="6" sm="12" class="d-flex justify-content-center" data-aos="fade-up" data-aos-duration="750">
          <l-map
            v-if="showMap"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: 456px; width: 350px;"
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
          <b-row style="margin-bottom: 40px" align-v="center" align-h="center">
            <b-col class="totalStats" cols="auto">{{ $n(382154) }}</b-col>
            <b-col class="totalDetails" lg="5" md="12">{{ $t('landingpage.coverage.testsPerWeek') }}<sup>1</sup></b-col>
            <a target= "_blank" 
              href="https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Situationsberichte/2020-05-13-de.pdf?__blob=publicationFile" 
              id="rki-cit">
              <sup>1</sup>{{ $t('landingpage.coverage.referenceRKI', {date_de: "13.05.2020", date_en: "May 13th 2020"}) }}
            </a>
          </b-row>
          <template v-if="markerCounts">
            <b-row class="statRow" align-v="center">
              <b-col class="spacer"></b-col>
              <b-col class="detailsCount" sm="12" md="12"><img class="map-icon-counter" src="/map-icons/map-icon-volunteer.png">{{ markerCounts.volunteer }}</b-col>
              <b-col class="details" sm="12" md="12">{{ $tc('general.qVolunteer', 2) }}<sup>2</sup></b-col>
              <b-col class="spacer"></b-col>
            </b-row>
            <hr>
            <b-row class="statRow" align-v="center">
              <b-col class="spacer"></b-col>
              <b-col class="detailsCount" sm="12" md="12"><img class="map-icon-counter" src="/map-icons/map-icon-research.png">{{ markerCounts.lab_research }}</b-col>
              <b-col class="details" sm="12" md="12">{{ $tc('general.rLab', 2) }}<sup>2</sup></b-col>
              <b-col class="spacer"></b-col>
            </b-row>
            <hr>
            <b-row class="statRow last" align-v="center">
              <b-col class="spacer"></b-col>
              <b-col class="detailsCount" sm="12" md="12"><img class="map-icon-counter" src="/map-icons/map-icon-diag.png">{{ markerCounts.lab_diag }}</b-col>
              <b-col class="details last" sm="12" md="12">{{ $tc('general.dCenter', 2) }}<sup>2</sup></b-col>
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
      zoom: 5.5,
      center: latLng(51.1657, 10.4515),
      url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
      attribution:
        '<a href="https://foundation.wikimedia.org/wiki/Maps_Terms_of_Use">Wikimedia maps</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5,
        minZoom: 5.5,
        maxBounds: new latLngBounds(
          [47.100045, 5.430908],
          [55.412386, 15.424805]
        )
      },
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      showMap: true,
      testsPerWeek: undefined,
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
            data: { testsPerWeek, markerCounts, markers }
          }
        }) => {
          this.testsPerWeek = testsPerWeek && testsPerWeek.toLocaleString();
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
  padding: 88px 0;

  @media (max-width: 767px) {
    padding: 44px 0;
  }
  
  &:before {
    content: "";
    background: #fff;
    left: 0;
    right: 0;
    top: 0;
    height: 40px;
    position: absolute;
    z-index: 3;
  }

  &:after {
    content: "";
    background: $color-bkg-primary;
    left: 0;
    right: 0;
    top: 0;
    height: 80px;
    position: absolute;
    border-radius: 50%;
    z-index: 4;
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
  margin-bottom: 35px;
  text-align: center;

  &.last {
    margin-bottom: 15px;
  }
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
  font-size: 44px;
  text-align: right;
  font-weight: normal;
  line-height: 52px;
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
  margin-left: 6.5em;

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
  height: 37px;
  margin-right: 16px;
}

$aos-distance: 32px;
@import 'node_modules/aos/src/sass/aos.scss';

</style>
