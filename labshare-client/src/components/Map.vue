<i18n>{
  "en": {},
  "de": {
    "qualifiedVolunteers": "Qualifizierte Freiwillige",
    "researchLabs": "Forschungslabore",
    "diagnosticLabs": "Diagnostikzentren"
  }
}</i18n>
<template>
  <b-row>
    <b-col>
      <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 600px; width: 450px;"
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
    <b-col>
      <div v-if="markerCounts">
        <b-row>
          <b-col>{{markerCounts.volunteer}} {{$t('qualifiedVolunteers')}}</b-col>
        </b-row>
        <b-row>
          <b-col>{{markerCounts.lab_diag}} {{$t('diagnosticLabs')}}</b-col>
        </b-row>
        <b-row>
          <b-col>{{markerCounts.lab_research}} {{$t('researchLabs')}}</b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import { latLng, Icon, latLngBounds } from "leaflet";
import { LMap, LTileLayer, LCircleMarker } from "vue2-leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LCircleMarker
  },
  data() {
    return {
      zoom: 6,
      center: latLng(51.1657, 10.4515),
      url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
      attribution:
        '<a href="https://foundation.wikimedia.org/wiki/Maps_Terms_of_Use">Wikimedia maps</a>',
      mapOptions: {
        zoomSnap: 0.5,
        minZoom: 6,
        maxBounds: new latLngBounds(
          [47.100045, 5.430908],
          [55.412386, 15.424805]
        )
      },
      showMap: true,
      markers: [],
      markerCounts: undefined,
      labshareGreenHexCode: "#177867"
    };
  },
  created() {
    this.$http.get("lab-locations").then(
      ({
        body: {
          data: { markerCounts, markers }
        }
      }) => {
        console.log(markerCounts);
        this.markerCounts = markerCounts;
        this.markers = markers.map(({ latLong: { lat, long } }, index) => ({
          id: index,
          position: { lat, lng: long },
          draggable: false,
          visible: true
        }));
      }
    );
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    alert(marker) {
      window.alert(JSON.stringify(marker));
    }
  }
};
</script>
