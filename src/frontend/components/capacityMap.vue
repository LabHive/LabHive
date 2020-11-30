<template>
  <div>
    <div class="map">
      <MglMap :accessToken="accessToken" :mapStyle="mapStyle" :zoom="zoom" :center="center" @zoom="zooms" >
        <MglNavigationControl position="top-right" />
        <MglGeojsonLayer
          v-if="geoJSON"
          :sourceId="geoJSON.data.id"
          :source="geoJSON"
          layerId="totalCapacity"
          :layer="totalCapacity"
        />
        <MglGeojsonLayer
          v-if="geoJSON"
          :sourceId="geoJSON.data.id"
          :source="geoJSON"
          layerId="usedCapacity"
          :layer="usedCapacity"
        />
        <MglPopup :coordinates="popup.coordinates" anchor="top">
          <div>

          </div>
          <span>Hello world!</span>
        </MglPopup>
      </MglMap>
    </div>
    <img
      src="../assets/legend.png"
      alt="Kartenlegende"
      class="legend"
    />
  </div>
</template>

<script>
//import * as d3 from 'd3'
//import * as turf from 'turf'
import 'mapbox-gl/dist/mapbox-gl.css';
import Mapbox from "mapbox-gl";
import { MglMap, MglPopup, MglNavigationControl, MglGeojsonLayer } from "vue-mapbox";



export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeojsonLayer,
    MglPopup
  },

  props: {
  },

  data: function() {
    return {
      mapStyle: "mapbox://styles/tobi-vierzwo/ck8yodl5v02h31iny9yyy7m47",
      accessToken: "pk.eyJ1IjoibGFiaGl2ZSIsImEiOiJja2hvdXM5bWUwcTJ5MnlrOGdsOWpqZnNqIn0._qbMM9Al-fuxyicEDWlwsg",
      map: null,
      center: [11,52],
      zoom: 5,
      apiResponse: null,
      popup: {
        show: true,
        coordinates: [11,51]
      },
      circleSize: 250
    };
  },

  created() {
    this.getCapacity();
    this.mapbox = Mapbox;
  },

  mounted() {
  },

  computed: {
    geoJSON() {
      if(!this.apiResponse) return null
      let labs = this.apiResponse.map(lab => {
        return {
          type: "Feature",
          properties: {
            totalCapacity: lab.totalCapacity,
            usedCapacity: lab.usedCapacity,
            relativeCapacity:  lab.usedCapacity / lab.totalCapacity,

          },
          geometry: lab.user.location
        }
      })
      let geoJSON = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: labs,
          id: "labs"
        }
      }
      console.log(geoJSON)
      return geoJSON
    },

    totalCapacity() {
      return {
        'id': "totalCapacity",
        'type': 'circle',
        'paint': {
          "circle-radius": [
            '/',
            ['get','totalCapacity'],
            this.circleSize
          ],
          "circle-opacity": 0,
          "circle-stroke-opacity": .5,
          "circle-stroke-width": 1,
          "circle-stroke-color": {
            property: 'relativeCapacity',
            stops: [
                [.5, '#5EFAE7'],
                [.9, '#FF7020']
              ]
            },
        }
      }
    },
    usedCapacity() {
      return {
        'id': "usedCapacity",
        'type': 'circle',
        'paint': {
          "circle-radius": [
            '/',
            ['get','usedCapacity'],
            this.circleSize
          ],
          "circle-opacity": .5,
          "circle-color": {
            property: 'relativeCapacity',
            stops: [
                [.5, '#5EFAE7'],
                [.9, '#FF7020']
              ]
            },
        }
      }
    },
  },


  methods: {
    getCapacity() {
      return new Promise((res, rej) => {
        this.$http.get("testCapacity/query").then(
          success => {
            this.apiResponse = success.body.data
          },
          error => {
            rej(error);
            console.log(error);
          }
        );
      });
    },

    zooms(m) {
      this.circleSize = 8000 / m.map.transform.scale
      if (this.circleSize < 30) {
        this.circleSize = 30;
      }
      console.log(m.map.transform.scale, this.circleSize)
    }
  }
};
</script>
<style>
.staging-warning {
  display: none
}
</style>
<style scoped>
h1 {
  margin-bottom: 40px;
}
.map {
  width: 100%;
  height: 600px;
}
img.legend {
  height: 150px;
}
</style>
