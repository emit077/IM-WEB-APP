<style lang="scss" scoped>
.stepper-border {
  border: solid 3px !important;
  border-radius: 3px;
}
</style>

<template>
  <v-stepper v-model="step" class="elevation-0 bg-transparent">
    <v-stepper-header class="elevation-0">
      <v-stepper-step step="1" @click="step = 1"></v-stepper-step>
      <v-divider class="stepper-border" color="secondary"></v-divider>
      <v-stepper-step step="2" @click="step = 2"></v-stepper-step>
      <v-divider class="stepper-border" color="secondary"></v-divider>
      <v-stepper-step step="3" @click="step = 3"></v-stepper-step>
      <v-divider class="stepper-border" color="secondary"></v-divider>
      <v-stepper-step step="4" @click="step = 4"></v-stepper-step>
      <v-divider class="stepper-border" color="secondary"></v-divider>
      <v-stepper-step step="5" @click="step = 5"></v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <h3 class="font-weight-bold pl-3 mb-3">{{ $lang.STUDENT_BASIC_DETAILS }}</h3>
        <v-divider></v-divider>
        <BasicDetailsForm
          :form="tutor_data"
          :tutor_table_id="tutor_table_id"
          :academic_data="academic_data"
          @next="nextStep"
        />
      </v-stepper-content>

      <v-stepper-content step="2">
        <h3 class="font-weight-bold pl-3 mb-3">{{ $lang.STUDENT_ADDRESS_DETAILS }}</h3>
        <v-divider></v-divider>
        <AddressForm
          v-if="step == 2"
          :form="tutor_data"
          :tutor_table_id="tutor_table_id"
          @next="nextStep"
        />
      </v-stepper-content>
      <v-stepper-content step="3">
        <h3 class="font-weight-bold pl-3 mb-3">{{ $lang.PROFESSIONAL_DETAILS }}</h3>
        <v-divider></v-divider>
        <ProfessionalDetailsForm
          :form="tutor_data"
          :tutor_table_id="tutor_table_id"
          :afternoon_time_slots="afternoon_time_slots"
          :evening_time_slots="evening_time_slots"
          :grade_list="grade_list"
          :morning_time_slots="morning_time_slots"
          :time_slots_id_list="tutor_data.time_slots_id_list"
          @next="nextStep"
        />
      </v-stepper-content>
      <v-stepper-content step="4">
        <h3 class="font-weight-bold pl-3 mb-3">{{ $lang.OTHER_DETAILS }}</h3>
        <v-divider></v-divider>
        <OtherDetailsForm
          :tutor_table_id="tutor_table_id"
          :form="tutor_data"
          :morning_time_slots="morning_time_slots"
          :afternoon_time_slots="afternoon_time_slots"
          :evening_time_slots="evening_time_slots"
          @next="nextStep"
        />
      </v-stepper-content>

      <v-stepper-content step="5">
        <h3 class="font-weight-bold pl-3 mb-3">{{ $lang.UPLOAD_DOCUMENTS }}</h3>
        <v-divider></v-divider>
        <DocumentForm @next="nextStep" class="mt-8" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
export default {
  components: {
    AddressForm: () => import("@/components/teacher/edit-profile/AddressForm"),
    BasicDetailsForm: () => import("@/components/teacher/edit-profile/BasicDetailsForm"),
    ProfessionalDetailsForm: () =>
      import("@/components/teacher/edit-profile/ProfessionalDetailsForm"),
    OtherDetailsForm: () => import("@/components/teacher/edit-profile/OtherDetailsForm"),
    DocumentForm: () => import("@/components/teacher/edit-profile/DocumentForm"),
  },
  data() {
    return {
      step: 1,
      tutor_table_id: -1,
      tutor_data: {
        time_slots_id_list: [],
      },
      academic_data: {},
      tutor_professional_data: [],
      grade_list: [],
      mo: [],
      afternoon_time_slots: [],
      morning_time_slots: [],
      evening_time_slots: [],
    };
  },
  mounted() {
    if (this.$store.getters.getUsertype != this.$keys.ACCOUNT_TEACHER)
      this.tutor_table_id = this.decrypt(this.$route.query.tutor_table_id);

    this.getTutorDetails();
  },
  methods: {
    getTutorDetails() {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let params = {};
      if (this.tutor_table_id && this.tutor_table_id != -1) {
        params.tutor_table_id = self.tutor_table_id;
      }

      const successHandler = (response) => {
        if (response.data.success) {
          self.tutor_data = response.data.tutor_data;
          self.academic_data = response.data.academic_data;
          self.tutor_professional_data = response.data.tutor_professional_data;
          self.grade_list = response.data.grade_list;
          self.morning_time_slots = response.data.morning_time_slots;
          self.afternoon_time_slots = response.data.afternoon_time_slots;
          self.evening_time_slots = response.data.evening_time_slots;

          if (!Array.isArray(self.tutor_data.class_mode)) {
            self.tutor_data.class_mode = [self.tutor_data.class_mode];
          }

          if (!Array.isArray(self.tutor_data.teaching_preference)) {
            self.tutor_data.teaching_preference = [self.tutor_data.teaching_preference];
          }

          if (!Array.isArray(self.tutor_data.suitable_days)) {
            self.tutor_data.suitable_days = [self.tutor_data.suitable_days];
          }

          self.set_location_in_map(
            response.data.tutor_data.latitude,
            response.data.tutor_data.longitude
          );
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
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      this.step = step;
    },
  },
};
</script>
