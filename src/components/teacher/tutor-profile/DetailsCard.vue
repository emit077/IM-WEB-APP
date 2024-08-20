<style lang="scss" scoped>
.student-card {
  border: 1px solid lightgrey;
}

@media screen and (max-width: 1260px) {
  .student-card {
    label {
      display: inline-block;
      width: 40%;
      vertical-align: top;
    }

    .text-1 {
      display: inline-block;
      width: 60%;
      vertical-align: top;
      margin-bottom: 0px;
    }

    .field-wrapper {
      margin-bottom: 8px;
    }
  }
}
</style>
<template>
  <div class="student-card">
    <!--  ################################################    -->
    <!--  ################ BASIC DETAILS #################    -->
    <!--  ################################################    -->
    <div class="bg-primary">
      <p class="card-header-text text-center">{{ $lang.BASIC_DETAILS }}</p>
    </div>
    <v-row
      :class="{
        'px-2': $vuetify.breakpoint.smAndDown,
        'px-6': $vuetify.breakpoint.mdAndUp,
      }"
      class="mx-0 py-2 my-1 text-left"
    >
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.TUTOR_NAME }} :</label>
          <p class="text-1">{{ tutor_data.tutor_name }}</p>
        </div>
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.MOBILE_NUMBER }} :</label>
          <p class="text-1">{{ tutor_data.tutor_mobile }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.FATHER_NAME }} :</label>
          <p class="text-1">{{ tutor_data.father_name || "-" }}</p>
        </div>
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.EMAIL }} :</label>
          <p class="text-1">{{ tutor_data.email || "-" }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.DATE_OF_BIRTH }} :</label>
          <p class="text-1">{{ tutor_data.date_of_birth || "-" }}</p>
        </div>
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.GENDER }} :</label>
          <p class="text-1">{{ tutor_data.gender || "-" }}</p>
        </div>
      </v-col>
    </v-row>

    <!--  ################################################    -->
    <!--  ############## ADDRESS DETAILS #################    -->
    <!--  ################################################    -->
    <div class="bg-primary mt-5">
      <p class="card-header-text text-center">{{ $lang.STUDENT_ADDRESS_DETAILS }}</p>
    </div>
    <v-row
      :class="{
        'px-2': $vuetify.breakpoint.smAndDown,
        'px-6': $vuetify.breakpoint.mdAndUp,
      }"
      class="mx-0 py-2 my-1 text-left"
    >
      <v-col class="py-0" cols="12" md="6" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.ADDRESS }} :</label>
          <p class="text-1">{{ tutor_data.address || "-" }}</p>
        </div>
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.CITY }} :</label>
          <p class="text-1">{{ tutor_data.city || "-" }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="6" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.STATE }} :</label>
          <p class="text-1">{{ tutor_data.state || "-" }}</p>
        </div>
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.PIN_CODE }} :</label>
          <p class="text-1">{{ tutor_data.pin_code || "-" }}</p>
        </div>
      </v-col>

      <!--      <v-col class="py-0" cols="12" md="8" sm="6">-->
      <!--        <GoogleMap ref="map_elm" :class_name="map_class_name" :clickable="false" :draggable="false"-->
      <!--                   :search_enable="false"-->
      <!--                   :zoom_control="false"></GoogleMap>-->
      <!--      </v-col>-->
    </v-row>

    <!--  ################################################    -->
    <!--  ############## ACADEMIC DETAILS ################    -->
    <!--  ################################################    -->
    <div class="bg-primary">
      <p class="card-header-text text-center">{{ $lang.STUDENT_ACADEMIC_DETAILS }}</p>
    </div>
    <v-row
      no-gutters
      :class="{
        'px-2': $vuetify.breakpoint.smAndDown,
        'px-6': $vuetify.breakpoint.mdAndUp,
      }"
      class="mx-0 my-1 text-left"
      v-if="academic_data"
    >
      <v-col class="pa-3" cols="12" md="3" sm="6">
        <label class="label-text-1">{{ $lang.SCHOOL_NAME }} :</label>
        <p class="text-1">{{ academic_data.school_name || "-" }}</p>
      </v-col>
      <v-col class="pa-3" cols="12" md="3" sm="6">
        <label class="label-text-1">{{ $lang.STREAM }} :</label>
        <p class="text-1">{{ academic_data.stream || "-" }}</p>
      </v-col>
      <v-col class="pa-3" cols="12" md="3" sm="6">
        <label class="label-text-1">10th % :</label>
        <p class="text-1">{{ academic_data.score_10 || "-" }}</p>
      </v-col>
      <v-col class="pa-3" cols="12" md="3" sm="6">
        <label class="label-text-1">12th % :</label>
        <p class="text-1">{{ academic_data.score_12 || "-" }}</p>
      </v-col>
      <v-col class="pa-3" cols="12" md="3" sm="6">
        <label class="label-text-1">{{ $lang.COLLAGE_NAME }} :</label>
        <p class="text-1">{{ academic_data.collage_name || "-" }}</p>
      </v-col>
      <v-col class="pa-3" cols="12" md="3" sm="6">
        <label class="label-text-1">{{ $lang.STATUS }} :</label>
        <p class="text-1">{{ academic_data.collage_status || "-" }}</p>
      </v-col>
      <v-col class="pa-3" cols="12" md="3" sm="6">
        <label class="label-text-1">{{ $lang.COURSE_NAME }} :</label>
        <p class="text-1">{{ academic_data.collage_course_name || "-" }}</p>
      </v-col>
    </v-row>

    <!--  ################################################    -->
    <!--  ############## ACADEMIC DETAILS ################    -->
    <!--  ################################################    -->

    <div class="bg-primary">
      <p class="card-header-text text-center">{{ $lang.PROFESSIONAL_DETAILS }}</p>
    </div>
    <v-row
      v-for="grade in grade_list"
      :key="grade.id"
      :class="{
        'px-2': $vuetify.breakpoint.smAndDown,
        'px-9': $vuetify.breakpoint.mdAndUp,
      }"
      class="mx-0 my-1 text-left"
    >
      <v-col class="pa-0" cols="12" md="2">
        <p class="label-text-1 mt-2">{{ grade.grade_name }}</p>
      </v-col>
      <v-col class="pa-0" cols="12" md="10">
        <v-checkbox
          v-for="item in grade.subject_list"
          :key="item.id"
          v-model="item.selected"
          :label="item.subject_name"
          :value="item.selected"
          class="shrink ma-0 ml-3 d-inline-flex"
          hide-details
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row
      :class="{
        'px-2': $vuetify.breakpoint.smAndDown,
        'px-6': $vuetify.breakpoint.mdAndUp,
      }"
      class="mx-0 py-2 my-1 text-left"
    >
      <v-col class="py-0" cols="12" md="8" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.SUITABLE_TIME_SLOT }} :</label> <br />
          <div class="d-inline-block v-align-top">
            <p class="text-1 text-center mb-0">{{ $lang.MORNING }}</p>
            <div v-for="item in morning_time_slots" :key="item.id">
              <v-checkbox
                :disabled="!tutor_data.time_slots_id_list.includes(item.id)"
                :input-value="tutor_data.time_slots_id_list.includes(item.id)"
                :label="item.slot_from + ' - ' + item.slot_to"
                class="shrink ma-0"
                hide-details
                readonly
              ></v-checkbox>
            </div>
          </div>
          <div
            :class="{
              '': $vuetify.breakpoint.smAndDown,
              'px-4': $vuetify.breakpoint.mdAndUp,
            }"
            class="d-inline-block v-align-top"
          >
            <p class="text-1 text-center mb-0">{{ $lang.AFTER_NOON }}</p>
            <div v-for="item in afternoon_time_slots" :key="item.id">
              <v-checkbox
                :disabled="!tutor_data.time_slots_id_list.includes(item.id)"
                :input-value="tutor_data.time_slots_id_list.includes(item.id)"
                :label="item.slot_from + ' - ' + item.slot_to"
                class="shrink ma-0"
                hide-details
                readonly
              ></v-checkbox>
            </div>
          </div>
          <div
            :class="{
              '': $vuetify.breakpoint.smAndDown,
              'px-4': $vuetify.breakpoint.mdAndUp,
            }"
            class="d-inline-block v-align-top"
          >
            <p class="text-1 text-center mb-0">{{ $lang.EVENING }}</p>
            <div v-for="item in evening_time_slots" :key="item.id">
              <v-checkbox
                :disabled="!tutor_data.time_slots_id_list.includes(item.id)"
                :input-value="tutor_data.time_slots_id_list.includes(item.id)"
                :label="item.slot_from + ' - ' + item.slot_to"
                class="shrink ma-0"
                hide-details
                readonly
              ></v-checkbox>
            </div>
          </div>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.ABOUT_YOURSELF }} :</label>
          <p class="text-1" style="width: 100%">
            {{ tutor_data.special_concern || "-" }}
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: [
    "grade_list",
    "tutor_name",
    "mobile",
    "tutor_data",
    "evening_time_slots",
    "morning_time_slots",
    "afternoon_time_slots",
    "academic_data",
  ],
  components: {
    // GoogleMap: () => import('@/components/shared/GoogleMap'),
  },
  data() {
    return {
      map_class_name: "min-height",
    };
  },
  methods: {},
};
</script>
