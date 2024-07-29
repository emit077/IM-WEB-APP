<template>
  <v-stepper v-model="e1" class="elevation-0">
    <v-stepper-header>
      <v-stepper-step
          step="1"
          @click="e1 = 1"
      >
        Personal details
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
          step="2"
          @click="e1 = 2"
      >
        Professional Details
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3" @click="e1 = 3">
        Upload Documents
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <AddressDetails @next="nextStep"/>
      </v-stepper-content>

      <v-stepper-content step="2">
        <!--        <EducationalDetails :academic_data_list="academic_data_list" @next="nextStep"/>-->
        <ProfessionalDetails :afternoon_time_slots="afternoon_time_slots"
                             :evening_time_slots="evening_time_slots"
                             :grade_list="grade_list"
                             :morning_time_slots="morning_time_slots"
                             :time_slots_id_list="tutor_data.time_slots_id_list" @next="nextStep"/>
      </v-stepper-content>

      <v-stepper-content step="3">
        <OtherDetails @next="nextStep"/>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
export default {
  components: {
    // EducationalDetails: () => import('@/components/teacher/edit-profile/EducationalDetails'),
    AddressDetails: () => import('@/components/teacher/edit-profile/AddressDetails'),
    ProfessionalDetails: () => import('@/components/teacher/edit-profile/ProfessionalDetails'),
    OtherDetails: () => import('@/components/teacher/edit-profile/OtherDetails'),
  },
  data() {
    return {
      e1: 1,
      tutor_table_id: -1,
      tutor_data: {
        time_slots_id_list: []
      },
      academic_data_list: [],
      tutor_professional_data: [],
      grade_list: [],
      mo: [],
      afternoon_time_slots: [],
      morning_time_slots: [],
      evening_time_slots: [],
    }
  },
  mounted() {
    if (this.$store.getters.getUsertype != this.$keys.ACCOUNT_TEACHER)
      this.tutor_table_id = this.decrypt(this.$route.query.tutor_table_id)

    this.getTutorDetails()
  },
  methods: {
    getTutorDetails() {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let params = {};
      if (this.tutor_table_id && this.tutor_table_id != -1) {
        params.tutor_table_id = self.tutor_table_id
      }

      const successHandler = (response) => {
        if (response.data.success) {
          self.tutor_data = response.data.tutor_data
          self.academic_data_list = response.data.academic_data_list
          self.tutor_professional_data = response.data.tutor_professional_data
          self.grade_list = response.data.grade_list
          self.morning_time_slots = response.data.morning_time_slots
          self.afternoon_time_slots = response.data.afternoon_time_slots
          self.evening_time_slots = response.data.evening_time_slots

          self.set_location_in_map(response.data.tutor_data.latitude, response.data.tutor_data.longitude)
        }
      };
      const finallyHandler = () => {
        this.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
          self,
          self.$urls.GET_TUTOR_DETAILS,
          params,
          successHandler,
          null,
          null,
          finallyHandler
      );

    },
    nextStep(step) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
      this.e1 = step
    },
    /* set the current location in the map*/
    // set_location_in_map(lat, lng) {
    //   if (lat && lng) {
    //     // set the map with saved location
    //     this.form.latitude = lat
    //     this.form.longitude = lng
    //     this.$refs.map_elm.center = {
    //       lat: parseFloat(lat),
    //       lng: parseFloat(lng)
    //     }
    //     this.$refs.map_elm.intMap(this.$refs.map_elm.center)
    //   } else {
    //     //set map withhh current location
    //     this.$getLocation({
    //       enableHighAccuracy: true,
    //     }).then(coordinates => {
    //       this.form.latitude = coordinates.lat
    //       this.form.longitude = coordinates.lng
    //       this.$refs.map_elm.center = {
    //         lat: parseFloat(coordinates.lat),
    //         lng: parseFloat(coordinates.lng)
    //       }
    //       this.$refs.map_elm.intMap(this.$refs.map_elm.center)
    //     });
    //   }
    // }
  }
}
</script>