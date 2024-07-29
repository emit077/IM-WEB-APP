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
    <div class=" bg-primary">
      <p class="card-header-text text-center">{{ $lang.STUDENT_BASIC_DETAILS }}</p>
    </div>
    <v-row :class="{ 'px-2': $vuetify.breakpoint.smAndDown, 'px-6': $vuetify.breakpoint.mdAndUp }"
      class="mx-0 py-2 my-1 text-left">
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.STUDENT_NAME }} :</label>
          <p class="text-1">{{ student_name }}</p>
        </div>
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.MOBILE_NUMBER }} :</label>
          <p class="text-1">{{ mobile }}</p>
        </div>
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.EMAIL }} :</label>
          <p class="text-1">{{ email || '-' }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.FATHER_NAME }} :</label>
          <p class="text-1">{{ student_basic_data.father_name || '-' }}</p>
        </div>
        <div class="field-wrapper">
          <label class="label-text-1">Father's {{ $lang.MOBILE_NUMBER }} :</label>
          <p class="text-1">{{ student_basic_data.father_contact_number || '-' }}</p>
        </div>
        <div class="field-wrapper">
          <label class="label-text-1">Father's {{ $lang.EMAIL }} :</label>
          <p class="text-1">{{ student_basic_data.parent_email || '-' }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.MOTHER_NAME }} :</label>
          <p class="text-1">{{ student_basic_data.mother_name || '-' }}</p>
        </div>
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.GUARDIAN_CONTACT_NUMBER }} :</label>
          <p class="text-1">{{ student_basic_data.guardian_contact_number || '-' }}</p>
        </div>
      </v-col>
    </v-row>


    <!--  ################################################    -->
    <!--  ############## ADDRESS DETAILS #################    -->
    <!--  ################################################    -->
    <div class="bg-primary mt-5">
      <p class="card-header-text text-center ">{{ $lang.STUDENT_ADDRESS_DETAILS }}</p>
    </div>
    <v-row :class="{ 'px-2': $vuetify.breakpoint.smAndDown, 'px-6': $vuetify.breakpoint.mdAndUp }"
      class="mx-0 py-2  my-1 text-left">
      <v-col class="py-0" cols="12" md="6" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.ADDRESS }} :</label>
          <p class="text-1">{{ student_basic_data.address || "-" }}</p>
        </div>

        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.PIN_CODE }} :</label>
          <p class="text-1">{{ student_basic_data.pin_code || '-' }}</p>
        </div>
      </v-col>

      <v-col class="py-0" cols="12" md="6" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.CITY }} :</label>
          <p class="text-1">{{ student_basic_data.city || "-" }}</p>
        </div>
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.STATE }} :</label>
          <p class="text-1">{{ student_basic_data.state || "-" }}</p>
        </div>
        <!--        <GoogleMap ref="map_elm" :class_name="map_class_name" :clickable="false" :draggable="false"-->
        <!--                   :search_enable="false"-->
        <!--                   :zoom_control="false"></GoogleMap>-->
      </v-col>
    </v-row>

    <!--  ################################################    -->
    <!--  ############## ACADEMIC DETAILS ################    -->
    <!--  ################################################    -->
    <div class="bg-primary">
      <p class="card-header-text text-center">{{ $lang.STUDENT_ACADEMIC_DETAILS }}</p>
    </div>
    <v-row :class="{ 'px-2': $vuetify.breakpoint.smAndDown, 'px-6': $vuetify.breakpoint.mdAndUp }"
      class="mx-0 py-2 my-1 text-left">
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.EDUCATION_BOARD }} :</label>
          <p class="text-1">{{ student_basic_data.education_board || '-' }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.SCHOOL_NAME }} :</label>
          <p class="text-1">{{ student_basic_data.school_name || '-' }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.CLASS }} :</label>
          <p class="text-1">{{ student_basic_data.class_name || '-' }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.SUBJECTS }} :</label>
          <p class="text-1">
            <span v-for="(subject, i) in student_basic_data.subjects_list" :key="i">{{ subject }}
              <span v-if="i >= 0 && (i + 1) < student_basic_data.subjects_list.length">, </span>
            </span>
          </p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.TUTOR_PREFERENCE }} :</label>
          <p class="text-1">{{ student_basic_data.tutor_preference || '-' }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row :class="{ 'px-2': $vuetify.breakpoint.smAndDown, 'px-6': $vuetify.breakpoint.mdAndUp }"
      class="mx-0 py-2 my-1 text-left">
      <v-col class="py-0" cols="12" md="7" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.SUITABLE_TIME_SLOT }} :</label> <br>
          <div class="d-inline-block  v-align-top">
            <p class="text-1 text-center mb-0">{{ $lang.MORNING }}</p>
            <div v-for="item in morning_time_slots" :key="item.id">
              <v-checkbox :disabled="!student_basic_data.time_slots_id_list.includes(item.id)"
                :input-value="student_basic_data.time_slots_id_list.includes(item.id)"
                :label="item.slot_from + ' - ' + item.slot_to" class="shrink ma-0" hide-details readonly></v-checkbox>
            </div>

          </div>
          <div :class="{ '': $vuetify.breakpoint.smAndDown, 'px-4': $vuetify.breakpoint.mdAndUp }"
            class="d-inline-block v-align-top">
            <p class="text-1 text-center mb-0">{{ $lang.AFTER_NOON }}</p>
            <div v-for="item in afternoon_time_slots" :key="item.id">
              <v-checkbox :disabled="!student_basic_data.time_slots_id_list.includes(item.id)"
                :input-value="student_basic_data.time_slots_id_list.includes(item.id)"
                :label="item.slot_from + ' - ' + item.slot_to" class="shrink ma-0" hide-details readonly></v-checkbox>
            </div>
          </div>
          <div :class="{ '': $vuetify.breakpoint.smAndDown, 'px-4': $vuetify.breakpoint.mdAndUp }"
            class="d-inline-block  v-align-top ">
            <p class="text-1  text-center mb-0">{{ $lang.EVENING }}</p>
            <div v-for="item in evening_time_slots" :key="item.id">
              <v-checkbox :disabled="!student_basic_data.time_slots_id_list.includes(item.id)"
                :input-value="student_basic_data.time_slots_id_list.includes(item.id)"
                :label="item.slot_from + ' - ' + item.slot_to" class="shrink ma-0" hide-details readonly></v-checkbox>
            </div>
          </div>
        </div>

      </v-col>
      <v-col class="py-0" cols="12" md="5" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.SPECIAL_CONCERN }} :</label>
          <p class="text-1" style="width: 100%">{{ student_basic_data.special_concern || '-' }}</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["email", "student_name", 'mobile', "student_basic_data", 'evening_time_slots',
    'morning_time_slots', 'afternoon_time_slots'],
  components: {
    // GoogleMap: () => import('@/components/shared/GoogleMap'),
  },
  data() {
    return {
      map_class_name: "min-height"
    }
  },
  methods: {}
}
</script>