<style media="screen" type="text/css" scoped>
#map {
  width: 100%;
}
.default_height {
  height: 300px;
}
@media screen and (max-width: 1260px) {
  .default_height {
    height: 300px;
  }
}
.location-permission-block {
  height: 200px;
  align-items: center;
  border: solid 1px rgb(var(--primary_rgb), 0.05);
  background-color: rgb(var(--primary_rgb), 0.05);
}
</style>
<template>
  <div>
    <div v-show="has_permission">
      <v-text-field
        v-if="search_enable"
        id="ps-input"
        v-model="theKeyword"
        color="primary"
        placeholder="Search near by location"
        hide-details
        filled
        class="mb-2"
      >
      </v-text-field>
      <div id="map" class="default_height" :class="class_name" readonly=""></div>
      <p>
        <!--		{{$store.state.map_center.lang}},-->
      </p>
    </div>
    <div v-if="!has_permission" class="d-flex justify-center location-permission-block">
      <div class="text-center">
        <p class="mb-5">{{ $lang.LOACTION_PERMISSION_MSG }}</p>
        <!-- <a @click="getLocationPermission">{{ $lang.LOACTION_PERMISSION_BTN_TEXT }}</a> -->
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { Loader } from "@googlemaps/js-api-loader";
export default {
  props: {
    search_enable: {
      type: Boolean,
      default: true,
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    zoom_control: {
      type: Boolean,
      default: true,
    },
    class_name: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "300px",
    },
    coordeinates: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      gMap: null,
      marker: null,
      location: "",
      theKeyword: "",
      zoom: 15,
      center: this.coordeinates ? this.coordeinates : null,
      has_permission: false,
    };
  },
  /* add watcher for thr Center  shipments*/
  watch: {
    center: {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.initMap(this.center);
          // // let myLatlng = new window.google.maps.LatLng(this.center.lat, this.center.lng);
          // this.updateMarker(this.center);
        }
      },
      deep: true,
    },
  },
  async mounted() {
    // set the current location
    const loader = new Loader({
      apiKey: "AIzaSyC_kd_VRTaoMWCvzx67MqTqqxa1R7AF51w",
      libraries: ["places", "geometry"],
    });
    loader
      .load()
      .then((google) => {
        this.google = google;
        this.getLocationPermission();
        this.initMap(this.center);
        this.initMapAutocomplete();
      })
      .catch((e) => {
        console.log("error while loading map:", e);
      });
  },
  methods: {
    getLocationPermission() {
      this.$getLocation({
        enableHighAccuracy: true,
      })
        .then((coordinates) => {
          this.has_permission = true;
          if (!this.center?.lat) {
            this.center = {
              lat: parseFloat(coordinates.lat),
              lng: parseFloat(coordinates.lng),
            };
            this.$emit("update-center", coordinates.lat, coordinates.lng);
          }
        })
        .catch((e) => {
          this.has_permission = false;
          console.log("error:", e);
        });
    },
    initMap(center) {
      const self = this;
      const map_config = {
        center: center,
        zoom: this.zoom,
        mapTypeId: "terrain",
        scrollwheel: this.zoom_control, //false for stop
        zoomControl: this.zoom_control, // false for stop
        gestureHandling: this.zoom_control ? "" : "none",
        isableDoubleClickZoom: this.zoom_control, // false to disbaled
      };
      if (window.google.maps.Map)
        this.gMap = new window.google.maps.Map(
          document.getElementById("map"),
          map_config
        );

      // adding the click event
      if (this.clickable && window.google.maps.event) {
        window.google.maps.event.addListener(this.gMap, "click", (event) => {
          this.lastLat = event.latLng.lat();
          this.lastLng = event.latLng.lng();
          this.updateMarker(event.latLng);
        });
      }
      // adding marker
      if (window.google.maps.Marker) this.addMarker();
      // window.google.maps.event.addListener(this.gMap, 'dragend', function () {
      //   alert('map dragged');
      // });

      //listening the marker drag
      if (window.google.maps.event) {
        window.google.maps.event.addListener(this.marker, "dragend", function (event) {
          self.updateMarker(event.latLng);
        });
      }
    },
    initMapAutocomplete() {
      this.geocoder = new window.google.maps.Geocoder();

      const input = document.getElementById("ps-input");
      const autocomplete = new window.google.maps.places.Autocomplete(input);

      window.google.maps.event.addListener(autocomplete, "place_changed", () => {
        const place = autocomplete.getPlace();
        this.updateFromTextAddress(place);
      });
    },
    updateFromTextAddress(payload) {
      this.gMap.setCenter(payload.geometry.location);
      this.updateMarker(payload.geometry.location);
      this.gMap.setZoom(15);
    },
    updateMarker(latLng) {
      if (!this.marker) {
        this.marker = new window.google.maps.Marker({
          position: this.center,
          map: this.gMap,
          draggable: this.draggable,
          animation: window.google.maps.Animation.DROP,
        });
      }
      // this.gMap.setZoom(15);
      this.marker.setPosition(latLng);
      this.$emit("update-center", latLng.lat(), latLng.lng());

      // this.$emit("update",latLng)
    },
    addMarker() {
      let map = this.gMap;
      this.marker = new window.google.maps.Marker({
        position: this.center,
        map,
        draggable: this.draggable,
        animation: window.google.maps.Animation?.DROP,
        // title: "Hello World!",
      });
    },
    deleteMarkers() {
      // clearMarkers();
    },
  },
};
</script>
