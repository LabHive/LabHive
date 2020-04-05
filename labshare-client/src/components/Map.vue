<template>
  <div style="height: 500px; width: 1000px;">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 500px; width: 1000px;"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-marker
        v-for="marker in markers"
        :lat-lng="marker.position"
        :key="marker.id"
        @click="alert(marker)"
      />
      <l-tile-layer :url="url" :attribution="attribution" />
    </l-map>
  </div>
</template>
<script>
import { latLng, Icon } from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 6,
      center: latLng(51.1657, 10.4515),
      // url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      markers: [],
    };
  },
  created() {
    this.$http.get('lab-locations').then(({ body: { data } }) => {
      this.markers = data.map(({ lat, long }, index) => ({
        id: index,
        position: { lat, lng: long },
        draggable: false,
        visible: true,
      }));
    });
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
    },
  },
};
</script>
