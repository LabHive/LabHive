<i18n>{
  "en": {
    "title": "Test Capacity and Support",
    "testsPerWeek": "Tests per Week",
    "qualifiedVolunteers": "Qualifiied Volunteers",
    "researchLabs": "Research Laboratories",
    "diagnosticLabs": "Diagnostic Centers"
  },
  "de": {
    "title": "Testkapazität und Unterstützung",
    "testsPerWeek": "Tests pro Woche",
    "qualifiedVolunteers": "Qualifizierte Freiwillige",
    "researchLabs": "Forschungslabore",
    "diagnosticLabs": "Diagnostikzentren"
  }
}</i18n>
<template>
  <div class="coverage">
    <b-container>
      <b-row class="text-center">
        <b-col>
          <h3>{{ $t('title') }}</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols lg="6" md="6" sm="12" class="d-flex justify-content-center">
          <l-map
            v-if="showMap"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: 456px; width: 350px;"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
          >
            <l-circle-marker
              v-for="marker in markers"
              :lat-lng="marker.position"
              :key="marker.id"
              :radius="8"
              :fill-color="labshareGreenHexCode"
              :color="labshareGreenHexCode"
              :fill-opacity="1"
            />
            <l-tile-layer :url="url" :attribution="attribution" />
          </l-map>
        </b-col>
        <b-col cols lg="6" md="6" sm="12">
          <dl v-if="testsPerWeek" class="total-stats">
            <dt>{{ testsPerWeek }}</dt>
            <dd>{{ $t('testsPerWeek') }}</dd>
          </dl>
          <dl v-if="markerCounts">
            <dt>{{ markerCounts.volunteer }}</dt>
            <dd>{{ $t('qualifiedVolunteers') }}</dd>
            <dt>{{ markerCounts.lab_research }}</dt>
            <dd>{{ $t('researchLabs') }}</dd>
            <dt>{{ markerCounts.lab_diag }}</dt>
            <dd>{{ $t('diagnosticLabs') }}</dd>
          </dl>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { latLng, Icon, latLngBounds } from 'leaflet';
import { LMap, LTileLayer, LCircleMarker } from 'vue2-leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LCircleMarker
  },
  data() {
    return {
      zoom: 5.5,
      center: latLng(51.1657, 10.4515),
      url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
      attribution:
        '<a href="https://foundation.wikimedia.org/wiki/Maps_Terms_of_Use">Wikimedia maps</a>',
      mapOptions: {
        zoomSnap: 0.5,
        minZoom: 5.5,
        maxBounds: new latLngBounds(
          [47.100045, 5.430908],
          [55.412386, 15.424805]
        )
      },
      showMap: true,
      testsPerWeek: undefined,
      markers: [],
      markerCounts: undefined,
      labshareGreenHexCode: '#177867'
    };
  },
  created() {
    this.$http.get('test-coverage').then(
      ({
        body: {
          data: { testsPerWeek, markerCounts, markers }
        }
      }) => {
        this.testsPerWeek = testsPerWeek && testsPerWeek.toLocaleString();
        this.markerCounts = markerCounts;
        this.markers = markers.map(({ latLong: { lat, long } }, index) => ({
          id: index,
          position: { lat, lng: long },
          draggable: false,
          visible: true
        }));
      }
    ).catch(() => {
      console.log("Fetching test-coverage failed")
    })
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    }
  }
};
</script>
<style lang="scss" scoped>
$color-green: #177867;
$color-bkg-primary: #f7f6fd;

.coverage {
  background: $color-bkg-primary;
  position: relative;
  padding: 65px 0;

  &:before {
    content: '';
    background: #fff;
    left: 0;
    right: 0;
    top: 0;
    height: 40px;
    position: absolute;
    z-index: 3;
  }

  &:after {
    content: '';
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
  }
}
</style>
