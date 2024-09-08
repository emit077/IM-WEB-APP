<style lang="scss" scoped>
.stepper-border {
  border: solid 3px !important;
  border-radius: 3px;
}
.student_edit_form_wrapper {
  label {
    margin-left: 8px;
  }
}
</style>

<template>
  <div class="student_edit_form_wrapper">
    <!-- <v-row class="ma-0 px-0">
      <v-col class="px-0" cols="12" md="8"> -->
    <v-stepper v-model="step" class="bg-transparent elevation-0">
      <!-- headers -->
      <v-stepper-header class="elevation-0">
        <v-stepper-step step="1" @click="step = 1"> </v-stepper-step>
        <v-divider class="stepper-border" color="secondary"></v-divider>
        <v-stepper-step step="2" @click="step = 2"> </v-stepper-step>
        <v-divider class="stepper-border" color="secondary"></v-divider>
        <v-stepper-step step="3" @click="step = 3"> </v-stepper-step>
        <v-divider class="stepper-border" color="secondary"></v-divider>
        <v-stepper-step step="4" @click="step = 4"> </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1" class="pa-3">
          <h3 class="font-weight-bold pl-3 mb-3">{{ $lang.CONTACT_DETAILS }}</h3>
          <v-divider></v-divider>
          <ContactForm
            :form="form"
            :student_table_id="student_table_id"
            @next="updateSteps"
          />
        </v-stepper-content>
        <v-stepper-content step="2" class="pa-3">
          <h3 class="font-weight-bold pl-3 mb-3">{{ $lang.STUDENT_ADDRESS_DETAILS }}</h3>
          <v-divider></v-divider>
          <AddressForm
            :form="form"
            :student_table_id="student_table_id"
            @next="updateSteps"
          />
        </v-stepper-content>
        <v-stepper-content step="3" class="pa-3">
          <h3 class="font-weight-bold pl-3 mb-3">{{ $lang.STUDENT_ACADEMIC_DETAILS }}</h3>
          <v-divider></v-divider>
          <AcademicForm
            :form="form"
            :student_table_id="student_table_id"
            @next="updateSteps"
          />
        </v-stepper-content>
        <v-stepper-content step="4" class="pa-3">
          <h3 class="font-weight-bold pl-3 mb-3">{{ $lang.OTHER_DETAILS }}</h3>
          <v-divider></v-divider>
          <OtherDetailsForm
            :student_table_id="student_table_id"
            :form="form"
            :morning_time_slots="morning_time_slots"
            :afternoon_time_slots="afternoon_time_slots"
            :evening_time_slots="evening_time_slots"
            :class_mode_preference="class_mode_preference"
            :suitable_days="suitable_days"
            @next="updateSteps"
          />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <!-- </v-col>
    </v-row> -->
  </div>
</template>

<script>
import HelperMixin from "@/helper/mixins/helper-mixin";

export default {
  mixins: [HelperMixin],
  components: {
    // GoogleMap: () => import("@/components/shared/GoogleMap"),
    ContactForm: () => import("@/components/student/editProfile/ContactForm"),
    AddressForm: () => import("@/components/student/editProfile/AddressForm"),
    AcademicForm: () => import("@/components/student/editProfile/AcademicForm"),
    OtherDetailsForm: () => import("@/components/student/editProfile/OtherDetailsForm"),
  },
  data: () => ({
    step: 1,
    student_table_id: -1,
    form: {
      name: "",
      email: "",
      father_name: "",
      mother_name: "",
      gender: "",
      date_of_birth: "",
      father_contact_number: "",
      whatsapp_number: "",
      parent_email: "",
      address: "",
      landmark: "",
      pin_code: "",
      latitude: "",
      longitude: "",
      // city: "",
      // state: "",
      class_name: null,
      class_id: null,
      education_board: "",
      school_name: "",
      tutor_preference: "",
      hobbies: "",
      special_concern: "",
      time_slots_id_list: [],
    },
    suitable_days: [],
    class_mode_preference: [],
    morning_time_slots: [],
    afternoon_time_slots: [],
    evening_time_slots: [],
    subject_id_list: [],
  }),
  created() {
    if (
      this.$store.getters.getUsertype != this.$keys.ACCOUNT_STUDENT &&
      this.$route.query.student_table_id
    )
      this.student_table_id = this.decrypt(this.$route.query.student_table_id);
    this.getStudentDetail();

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
    /* fetching student profile */
    getStudentDetail() {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let params = {};
      if (this.student_table_id && this.student_table_id != -1)
        params.student_table_id = this.student_table_id;
      const successHandler = (response) => {
        if (response.data.success) {
          if (response.data.student_basic_data) {
            self.form = response.data.student_basic_data;
            self.form.city = response.data.student_basic_data.city;
            self.form.state = response.data.student_basic_data.state;
            self.form.subject_id_list = response.data.student_basic_data.subject_id_list;
          }
          if (response.data.student_name) {
            self.form.name = response.data.student_name;
            self.form.email = response.data.email;
          }

          if (!Array.isArray(self.form.suitable_days)) {
            self.form.suitable_days = [self.form.suitable_days];
          }

          self.morning_time_slots = response.data.morning_time_slots;
          self.afternoon_time_slots = response.data.afternoon_time_slots;
          self.evening_time_slots = response.data.evening_time_slots;
          self.class_mode_preference = response.data.student_basic_data.class_mode;
          self.suitable_days = response.data.student_basic_data.suitable_days;

          // self.set_location_in_map(response.data.student_basic_data.latitude, response.data.student_basic_data.longitude)
        }
      };
      const finallyHandler = () => {
        this.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.GET_STUDENT_DETAILS,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    updateSteps(step) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      this.step = step;
    },
  },
};
</script>
