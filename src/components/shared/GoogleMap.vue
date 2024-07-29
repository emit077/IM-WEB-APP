<style media="screen" type="text/css">
#map {
  width: 100%;
  /*height: 400px;*/
}

.min-height {
  height: 300px;
}

@media screen and (max-width: 1260px) {
  .min-height {
    height: 200px;
  }
}

</style>
<template>
  <div>
    <v-text-field
        v-if="search_enable"
        id="ps-input"
        v-model="theKeyword"
        color="primary"
        dense
        outlined
        placeholder="Search near by location"
        single-line
    >
    </v-text-field>
    <div id="map" :class="class_name" readonly="">
    </div>
    <p>
      <!--		{{$store.state.map_center.lang}},-->
    </p>
  </div>
</template>
<script type="text/javascript">
import $Scriptjs from 'scriptjs';

export default {
  props: {
    search_enable: {
      type: Boolean,
      default: true,
    },
    class_name: {
      type: String,
      default: "",
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
  },
  data() {
    return {
      map: null,
      marker: null,
      center: {
        lat: 21.2514,
        lng: 81.6296
      },
      location: "",
      theKeyword: "",
      zoom: 14,
    }
  },
  /* add watcher for thr Center  shipments*/
  // watch: {
  //   center: {
  //     handler(newVal, oldVal) {
  //       if (newVal != oldVal) {
  //         this.intMap(this.center)
  //         // let myLatlng = new window.google.maps.LatLng(this.center.lat, this.center.lng);
  //         // this.updateMarker(myLatlng);
  //
  //       }
  //     },
  //     deep: true
  //   }
  // },
  mounted() {
    $Scriptjs('https://maps.googleapis.com/maps/api/js?key=' + this.$keys.GOOGLE_PLACES_API_KEY + '&libraries=geometry,places', () => {
      this.intMap(this.center);
      this.initMapAutocomplete();
      // this.updateMarker(this.center);
    });
  },
  methods: {
    intMap(center) {
      const self = this
      if (this.zoom_control) {
        this.map = new window.google.maps.Map(document.getElementById("map"), {
          center: center,
          zoom: this.zoom,
          mapTypeId: "terrain",
        });
      } else {
        this.map = new window.google.maps.Map(document.getElementById("map"), {
          center: center,
          zoom: this.zoom,
          mapTypeId: "terrain",
          scrollwheel: false, //false for stop
          zoomControl: false, // false for stop
          gestureHandling: "none",
          isableDoubleClickZoom: false, // false to disbaled

        });

      }

      // adding the click event
      if (this.clickable) {
        window.google.maps.event.addListener(this.map, "click", (event) => {
          this.lastLat = event.latLng.lat();
          this.lastLng = event.latLng.lng();
          this.updateMarker(event.latLng);
        });
      }
      // adding marker
      this.addMarker()
      // window.google.maps.event.addListener(this.map, 'dragend', function () {
      //   alert('map dragged');
      // });

      //listening the marker drag
      window.google.maps.event.addListener(this.marker, 'dragend', function (event) {
        self.updateMarker(event.latLng);
      });

    },
    initMapAutocomplete() {
      this.geocoder = new window.google.maps.Geocoder();

      const input = document.getElementById('ps-input');
      const autocomplete = new window.google.maps.places.Autocomplete(input);

      window.google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        this.updateFromTextAddress(place)

      });
    },
    updateFromTextAddress(payload) {

      this.map.setCenter(payload.geometry.location);
      this.updateMarker(payload.geometry.location);
      this.map.setZoom(15);

    },

    updateMarker(latLng) {
      if (!this.marker) {
        this.marker = new window.google.maps.Marker({
          position: this.center,
          map: this.map,
          draggable: this.draggable,
          animation: window.google.maps.Animation.DROP,
        });
      }
      // this.map.setZoom(15);
      this.marker.setPosition(latLng);
      this.$emit('update-center', latLng.lat(), latLng.lng())

      // this.$emit("update",latLng)
    },
    addMarker() {
      let map = this.map
      this.marker = new window.google.maps.Marker({
        position: this.center,
        map,
        draggable: this.draggable,
        animation: window.google.maps.Animation.DROP,
        // title: "Hello World!",
      });
    },
    deleteMarkers() {
      // clearMarkers();
    }


  }

}
</script>																																																																																																																																																																