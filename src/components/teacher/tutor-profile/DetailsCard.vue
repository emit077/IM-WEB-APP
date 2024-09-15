<style lang="scss" scoped>
.field-wrapper {
  margin-bottom: 8px;
}

.tutor-card .v-card {
  border-radius: 10px !important;
}

.card-divider {
  border: solid 1.5px !important;
  border-radius: 3px;
}

@media screen and (max-width: 1260px) {
  .tutor-card {
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
  <div class="tutor-card px-3">
    <v-card flat class="mb-5 pb-3" color="transparent">
      <v-card-text>
        <!-- {{ tutor_data }} -->
        <v-row no-gutter>
          <v-col class="py-0 small-screen" cols="12" md="3">
            <label class="label-text-1">{{ $lang.PROFILE_STATUS }} :</label>
            <p class="text-1 py-1">
              <span v-if="tutor_data.profile_status" :class="'status-' + tutor_data.profile_status.toLowerCase()">{{
                tutor_data.profile_status }}</span>
            </p>
          </v-col>
          <v-col class="py-1" cols="12" md="3">
            <label class="label-text-1">{{ $lang.SING_UP_DATE }} :</label>
            <p class="text-1">{{ tutor_data.created }}</p>
          </v-col>
          <v-col class="py-1" cols="12" md="9">
            <label class="label-text-1">{{ $lang.ABOUT_YOURSELF }} :</label>
            <p class="text-1">{{ tutor_data.about_you || "-" }}</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!--  ################ BASIC DETAILS #################    -->
    <v-card flat class="mb-5 pb-3" color="">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        <v-icon color="primary" class="mr-1" size="20">mdi-contacts</v-icon>
        {{ $lang.CONTACT_DETAILS }}
      </v-card-title>
      <div class="px-5">
        <v-divider color="secondary" class="card-divider"></v-divider>
      </div>
      <v-card-text>
        <v-row class="py-2 text-left" no-gutter>
          <!-- <v-col class="py-1" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.TUTOR_NAME }} :</label>
              <p class="text-1">{{ tutor_data.tutor_name }}</p>
            </div>
          </v-col> -->
          <v-col class="py-1" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.MOBILE_NUMBER }} :</label>
              <p class="text-1">{{ tutor_data.tutor_mobile || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.WA_MOBILE_NUMBER }} :</label>
              <p class="text-1">{{ tutor_data.whatsapp_number || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.ALTERNATE_MOBILE_NUMBER }} :</label>
              <p class="text-1">{{ tutor_data.alternate_number || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.EMAIL }} :</label>
              <p class="text-1">{{ tutor_data.email || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.FATHER_NAME }} :</label>
              <p class="text-1">{{ tutor_data.father_name || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.DATE_OF_BIRTH }} :</label>
              <p class="text-1">{{ tutor_data.date_of_birth || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.GENDER }} :</label>
              <p class="text-1">{{ tutor_data.gender || "-" }}</p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!--  ############## ADDRESS DETAILS #################    -->
    <v-card flat class="mb-5 pb-3" color="">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        <v-icon color="primary" class="mr-1">mdi-home-circle</v-icon>
        {{ $lang.STUDENT_ADDRESS_DETAILS }}
      </v-card-title>
      <div class="px-5">
        <v-divider color="secondary" class="card-divider"></v-divider>
      </div>
      <v-card-text class="my-3">
        <v-row no-gutter>
          <v-col class="py-1" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.CITY }} :</label>
              <p class="text-1">{{ tutor_data.city || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="2">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.STATE }} :</label>
              <p class="text-1">{{ tutor_data.state || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="1">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.PIN_CODE }} :</label>
              <p class="text-1">{{ tutor_data.pin_code || "-" }}</p>
            </div>
            <!--        <GoogleMap ref="map_elm" :class_name="map_class_name" :clickable="false" :draggable="false"-->
            <!--                   :search_enable="false"-->
            <!--                   :zoom_control="false"></GoogleMap>-->
          </v-col>
          <v-col class="py-1" cols="12" md="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.LANDMARK }} :</label>
              <p class="text-1">{{ tutor_data.landmark || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="12">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.ADDRESS }} :</label>
              <p class="text-1">{{ tutor_data.address || "-" }}</p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!--  ############## ACADEMIC DETAILS ################    -->
    <v-card flat class="mb-5 pb-3" color="">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        <v-icon color="primary" class="mr-1">mdi-bank-circle</v-icon>
        {{ $lang.STUDENT_ACADEMIC_DETAILS }}
      </v-card-title>
      <div class="px-5">
        <v-divider color="secondary" class="card-divider"></v-divider>
      </div>
      <v-card-text class="my-3">
        <v-row no-gutter>
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
      </v-card-text>
    </v-card>
    <!--  ############## professnal DETAILS ################    -->
    <v-card flat class="mb-5 pb-3" color="">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        <v-icon color="primary" class="mr-1">mdi-account-circle</v-icon>
        {{ $lang.PROFESSIONAL_DETAILS }}
      </v-card-title>
      <div class="px-5">
        <v-divider color="secondary" class="card-divider"></v-divider>
      </div>
      <v-card-text class="my-3">
        <v-row v-for="grade in grade_list" :key="grade.id" class="mx-0 my-1 text-left">
          <v-col class="pa-0" cols="12" md="2" v-if="grade.subject_list.some((x) => x.selected)">
            <p class="label-text-1 mt-2">{{ grade.grade_name }}</p>
          </v-col>
          <v-col class="pa-0" cols="12" md="10">
            <span class="" v-for="item in grade.subject_list" :key="item.id">
              <span v-if="item.selected" class="text-1">{{ item.subject_name }},</span>
            </span>
          </v-col>
        </v-row>
        <v-row no-gutter>
          <v-col class="py-1" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">Preferred board :</label>
              <p class="text-1" v-if="
                tutor_data.preferred_boards && tutor_data.preferred_boards.length > 0
              ">
                <span v-for="(item, i) in tutor_data.preferred_boards" :key="item.id">
                  {{ item }}
                  <span v-if="tutor_data.preferred_boards.length > i + 1">,</span>
                </span>
              </p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.EXPERIENCE }} <small>(in Years)</small>:</label>
              <p class="text-1">{{ tutor_data.experience }}</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">Expected Tuition Fee <small>(per Hours)</small> :</label>
              <p class="text-1" v-if="tutor_data.tuition_fee">
                {{
                  tutor_data.tuition_fee.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })
                }}
              </p>
              <p class="text-1" v-else>-</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.ACHIEVEMENTS }}:</label>
              <p class="text-1">
                {{ tutor_data.achievements }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card flat class="mb-5 pb-3" color="">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        <v-icon color="primary" class="mr-1">mdi-information</v-icon>
        {{ $lang.OTHER_DETAILS }}
      </v-card-title>
      <div class="px-5">
        <v-divider color="secondary" class="card-divider"></v-divider>
      </div>
      <v-card-text class="my-3">
        <v-row no-gutter>
          <v-col class="py-1" cols="12" md="6" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.PERSONAL_COMPUTER }} :</label>
              <p class="text-1">
                <span v-if="tutor_data.personal_computer">Yes</span>
                <span v-else-if="tutor_data.personal_computer == false">No</span>
                <span v-else>-</span>
              </p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="6" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.PERSONAL_VEHICLE }} :</label>
              <p class="text-1">
                <span v-if="tutor_data.personal_vehicle">Yes</span>
                <span v-else-if="tutor_data.personal_vehicle == false">No</span>
                <span v-else>-</span>
              </p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="6" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.TEACHING_PREFERENCE }} :</label>
              <p class="text-1" v-if="
                tutor_data.teaching_preference &&
                tutor_data.teaching_preference.length > 0
              ">
                <span v-for="(item, i) in tutor_data.teaching_preference" :key="item.id">
                  {{ item }}
                  <span v-if="tutor_data.teaching_preference.length > i + 1">,</span>
                </span>
              </p>
              <p class="text-1" v-else>-</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="6" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.MODE_OF_CLASS }} :</label>
              <p class="text-1" v-if="tutor_data.class_mode && tutor_data.class_mode.length > 0">
                <span v-for="(item, i) in tutor_data.class_mode" :key="item.id">
                  {{ item }}
                  <span v-if="tutor_data.class_mode.length > i + 1">,</span>
                </span>
              </p>
              <p class="text-1" v-else>-</p>
            </div>
          </v-col>

          <v-col class="py-1" cols="12" md="6" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.SUITABLE_DAYS }} :</label>

              <p class="text-1" v-if="tutor_data.suitable_days && tutor_data.suitable_days.length > 0">
                <span v-for="(item, i) in tutor_data.suitable_days" :key="item.id">
                  {{ item }}
                  <span v-if="tutor_data.suitable_days.length > i + 1">,</span>
                </span>
              </p>
              <p class="text-1" v-else>-</p>
            </div>
          </v-col>
          <v-col class="py-1" cols="12" md="12" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.SUITABLE_TIME_SLOT }} :</label> <br />
              <span v-for="item in morning_time_slots" :key="item.id">
                <span class="text-1" v-if="tutor_data.time_slots_id_list.includes(item.id)">
                  {{ item.slot_from + " - " + item.slot_to }} ,
                </span>
              </span>
              <span v-for="item in afternoon_time_slots" :key="item.id">
                <span class="text-1" v-if="tutor_data.time_slots_id_list.includes(item.id)">
                  {{ item.slot_from + " - " + item.slot_to }} ,</span>
              </span>
              <span v-for="item in evening_time_slots" :key="item.id">
                <span class="text-1" v-if="tutor_data.time_slots_id_list.includes(item.id)">
                  {{ item.slot_from + " - " + item.slot_to }} ,
                </span>
              </span>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
