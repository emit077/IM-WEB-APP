<style lang="scss" scoped>
.student_edit_form_wrapper {
  label {
    margin-left: 8px;
  }
}
</style>

<template>
  <v-card class="pb-5 py-5 bg-transparent" flat color="">
    <v-form ref="student_edit_form" lazy-validation>
      <v-row class="ma-0">
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.LANDMARK }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.landmark"
              :placeholder="$lang.LANDMARK"
              :rules="[$rules.REQUIRED_FIELD($lang.LANDMARK)]"
              class="mt-1"
              dense
              maxlength="250"
              outlined
              single-line
              hide-details
            ></v-text-field>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.PIN_CODE }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.pin_code"
              :placeholder="$lang.PIN_CODE"
              :rules="[$rules.PIN_CODE($lang.PIN_CODE)]"
              class="mt-1"
              dense
              maxlength="6"
              outlined
              single-line
              @change="getCityFromPincode(form.pin_code)"
              :loading="pin_loading"
            ></v-text-field>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.CITY }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.city"
              :placeholder="$lang.CITY"
              :rules="[$rules.REQUIRED_FIELD($lang.CITY)]"
              class="mt-1"
              dense
              maxlength="80"
              outlined
              single-line
              readonly
            ></v-text-field>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="12">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.ADDRESS }} <sup class="error--text">*</sup></label
            >
            <v-textarea
              v-model="form.address"
              :placeholder="$lang.ADDRESS"
              :rules="[$rules.REQUIRED_FIELD($lang.ADDRESS)]"
              class="mt-1"
              dense
              outlined
              single-line
              style="height: 100%"
            ></v-textarea>
          </div>
        </v-col>

        <!--     not using the map for now       -->
        <!-- <v-col class="py-0" cols="12" md="12">
          <GoogleMap
            ref="map_elm"
            :class_name="class_name"
            @update-center="get_location"
          ></GoogleMap>

          <p v-if="!form.latitude" class="red&#45;&#45;text">
            Please update your location
          </p>
        </v-col> -->
      </v-row>
      <!--  action btn -->
      <div class="text-center mt-5 px-3">
        <v-btn
          text
          outlined
          color="primary"
          class="ma-3"
          width="120"
          @click="$emit('next', 1)"
        >
          Back
        </v-btn>
        <v-btn
          color="primary"
          @click="Save()"
          width="120"
          :loading="btn_loader"
          :disabled="btn_loader"
        >
          Continue
        </v-btn>
      </div>
      <!-- action end -->
    </v-form>
  </v-card>
</template>

<script>
import HelperMixin from "@/helper/mixins/helper-mixin";
export default {
  props: ["form", "tutor_table_id"],
  mixins: [HelperMixin],
  components: {
    GoogleMap: () => import("@/components/shared/GoogleMap"),
  },
  data: () => ({
    btn_loader: false,
    pin_loading: false,
  }),
  created() {
    /* not using the map for now */
    // get current location for new registration
    // if (!this.$route.query.student_table_id) {
    //   this.$getLocation({
    //     enableHighAccuracy: true,
    //   })
    //       .then(coordinates => {
    //         this.form.latitude = coordinates.lat
    //         this.form.longitude = coordinates.lng
    //         this.$refs.map_elm.center = {
    //           lat: parseFloat(coordinates.lat),
    //           lng: parseFloat(coordinates.lng)
    //         }
    //         this.$refs.map_elm.intMap(this.$refs.map_elm.center)
    //       });
    // }
  },
  methods: {
    /* save profile details*/
    Save() {
      const self = this;
      if (this.$refs.student_edit_form.validate() == false) return false;
      self.btn_loader = true;
      this.$store.dispatch("setPageLoader", true);
      var form = new URLSearchParams();
      form.append("type", self.$keys.TYPE_ADDRESS_FORM);
      form.append("address", self.form.address);
      form.append("city", self.form.city);
      form.append("state", self.form.state);
      form.append("pin_code", self.form.pin_code);
      form.append("landmark", self.form.landmark);
      // form.append("latitude", self.form.latitude);
      // form.append("longitude", self.form.longitude);
      if (self.tutor_table_id) form.append("tutor_table_id", self.tutor_table_id);

      const successHandler = (response) => {
        if (response.data.success) {
          self.$emit("next", 3);
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false;
        this.$store.dispatch("setPageLoader", false);
      };
      this.request_POST(
        self,
        this.$urls.ADD_TUTOR_DATA,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    getCityFromPincode(pin_code) {
      const self = this;
      self.pin_loading = true;
      let params = {
        pin_code: pin_code,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          this.form.city = response.data.city;
          this.form.state = response.data.state;
          return response.data;
        }
      };
      const finallyHandler = () => {
        self.pin_loading = false;
      };
      self.request_GET(
        self,
        self.$urls.MATCH_PIN_CODE,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
  },
};
</script>
