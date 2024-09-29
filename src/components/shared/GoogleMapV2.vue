<style></style>
<template>
  <div>
    <!-- <div id="gMap" style="height: 500px"></div> -->
    <div class="google-map" ref="googleMap" style="height: 500px"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>
<script>
import { Loader } from "@googlemaps/js-api-loader";

export default {
  props: {
    mapConfig: Object,
    apiKey: String,
  },

  data() {
    return {
      google: null,
      map: null,
    };
  },

  async mounted() {
    const loader = new Loader({
      apiKey: "AIzaSyC_kd_VRTaoMWCvzx67MqTqqxa1R7AF51w",
    });
    loader
      .load()
      .then((google) => {
        this.google = google;
        this.initializeMap();
      })
      .catch((e) => {
        console.log("error while loading map:", e);
      });
  },

  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      const config = {
        center: { lat: 21.268430659896534, lng: 81.61408993448242 },
        zoom: 17,
        mapTypeId: "terrain",
        scrollwheel: false, //false for stop
        zoomControl: false, // false for stop
        gestureHandling: "none",
        isableDoubleClickZoom: false, // false to disbaled
      };
      //   new window.google.maps.Map(document.getElementById("gMap"), config);
      this.map = new this.google.maps.Map(mapContainer, config);
    },
  },
};
</script>
