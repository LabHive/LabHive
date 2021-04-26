<template>
  <div class="box">
    <h4>{{$t("testcapacity.capacityMap.title")}}</h4>
    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary" @click="getCapacity('pcr')">{{$t("testcapacity.capacityMap.pcr")}}</button>
      <button type="button" class="btn btn-secondary" @click="getCapacity('antibody')">{{$t("testcapacity.capacityMap.antibody")}}</button>
    </div>
    <div class="map">
      <MglMap  v-if="geoJSON" :accessToken="accessToken" :mapStyle="mapStyle" :zoom="zoom" :center="center" @zoom="zooms" >
        <MglNavigationControl position="top-right" />
        <MglGeojsonLayer
          :sourceId="geoJSON.data.id"
          :source="geoJSON"
          layerId="totalCapacity"
          :layer="totalCapacity"
        />
        <MglGeojsonLayer
          :sourceId="geoJSON.data.id"
          :source="geoJSON"
          layerId="usedCapacity"
          :layer="usedCapacity"
        />
        <MglMarker v-for="(feature, i) in geoJSON.data.features" :key="i" :coordinates="feature.geometry.coordinates" >
          <svg width="6" height="6" slot="marker"><circle r="3" cx="3" cy="3" fill="white" /></svg>
          <MglPopup>
              <div>
                <p><strong>{{feature.properties.organization}}</strong></p>
                <p>Kontakt: <a :href="'mailto:'+feature.properties.email">{{feature.properties.contact}}</a></p>
              </div>
          </MglPopup>
        </MglMarker>
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
import { MglMap, MglPopup, MglNavigationControl, MglMarker, MglGeojsonLayer } from "vue-mapbox";



export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglGeojsonLayer,
    MglMarker,
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
        coordinates: [52,11]
      },
      circleSize: 250
    };
  },

  created() {
    this.getCapacity("pcr");
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
            organization: lab.user.organization,
            contact: lab.user.contact.firstname  + " " + lab.user.contact.lastname,
            email: lab.user.contact.email

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
    getCapacity(testType) {
      testType = "query" //TODO: assuming two API endpoints ("testCapacity/pcr" and "testCapacity/antibody"), delete this line
      return new Promise((res, rej) => {
        this.$http.get("testCapacity/"+testType).then(
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
      //console.log(m.map.transform.scale, this.circleSize)
    }
  }
};
</script>

<style scoped>
.box {
  background-color: rgba(255,255,255,1);
  border-radius: 5px;
  padding: 20px;
}

h1 {
  margin-bottom: 40px;
}
.map {
  width: 100%;
  height: 300px;
}
img.legend {
  height: 100px;
}
</style>
