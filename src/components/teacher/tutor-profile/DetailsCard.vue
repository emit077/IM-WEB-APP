<style lang="scss" scoped>
.field-wrapper {
  margin-bottom: 8px;
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
  <div class="tutor-card">
    <v-card flat outlined class="px-0" color="transparent">
      <v-card-text>
    {{tutor_data.about_you}}
    </v-card-text>
    </v-card>
    <!--  ################ BASIC DETAILS #################    -->
    <v-card flat outlined class="px-0" color="transparent">
      <v-card-title class="primary--text text-body-1 font-weight-bold">{{
        $lang.CONTACT_DETAILS
      }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="py-2 text-left" no-gutter>
          <v-col class="py-0" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.TUTOR_NAME }} :</label>
              <p class="text-1">{{ tutor_data.tutor_name }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.MOBILE_NUMBER }} :</label>
              <p class="text-1">{{ tutor_data.tutor_mobile }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.WA_MOBILE_NUMBER }} :</label>
              <p class="text-1">{{ tutor_data.whatsapp_number }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.ALTERNATE_MOBILE_NUMBER }} :</label>
              <p class="text-1">{{ tutor_data.alternate_number }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.EMAIL }} :</label>
              <p class="text-1">{{ tutor_data.email || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.FATHER_NAME }} :</label>
              <p class="text-1">{{ tutor_data.father_name || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.DATE_OF_BIRTH }} :</label>
              <p class="text-1">{{ tutor_data.date_of_birth || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.GENDER }} :</label>
              <p class="text-1">{{ tutor_data.gender || "-" }}</p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!--  ############## ADDRESS DETAILS #################    -->
    <v-card flat outlined class="px-0" color="transparent">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        {{ $lang.STUDENT_ADDRESS_DETAILS }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="my-3">
        <v-row no-gutter>
          <v-col class="py-0" cols="12" md="2">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.CITY }} :</label>
              <p class="text-1">{{ tutor_data.city || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="2">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.STATE }} :</label>
              <p class="text-1">{{ tutor_data.state || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="1">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.PIN_CODE }} :</label>
              <p class="text-1">{{ tutor_data.pin_code || "-" }}</p>
            </div>
            <!--        <GoogleMap ref="map_elm" :class_name="map_class_name" :clickable="false" :draggable="false"-->
            <!--                   :search_enable="false"-->
            <!--                   :zoom_control="false"></GoogleMap>-->
          </v-col>
          <v-col class="py-0" cols="12" md="2">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.LANDMARK }} :</label>
              <p class="text-1">{{ tutor_data.landmark || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="5">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.ADDRESS }} :</label>
              <p class="text-1">{{ tutor_data.address || "-" }}</p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!--  ############## ACADEMIC DETAILS ################    -->
    <v-card flat outlined class="px-0" color="transparent">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        {{ $lang.STUDENT_ACADEMIC_DETAILS }}
      </v-card-title>
      <v-divider></v-divider>
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
    <!--  ############## ACADEMIC DETAILS ################    -->
    <v-card flat outlined class="px-0" color="transparent">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        {{ $lang.PROFESSIONAL_DETAILS }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="my-3">
        <v-row v-for="grade in grade_list" :key="grade.id" class="mx-0 my-1 text-left">
          <v-col class="pa-0" cols="12" md="2">
            <p class="label-text-1 mt-2">{{ grade.grade_name }}</p>
          </v-col>
          <v-col class="pa-0" cols="12" md="10">
            <span class="text-1" v-for="item in grade.subject_list" :key="item.id">
            <span v-if="item.selected">{{ item.subject_name }},</span>
            </span>
          </v-col>
        </v-row>
        <v-row no-gutter>
          <v-col class="py-0" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">Preferred board :</label>
              <p class="text-1">
                <span v-for="item in tutor_data.preferred_boards" :key="item.id">
                  {{ item }},
                </span>
              </p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.EXPERIENCE }} :</label>
              <p class="text-1">{{ tutor_data.experience }} Years</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1"
                >Expected Tuition Fee <small>(per Hours)</small> :</label
              >
              <p class="text-1">
                {{
                  tutor_data.tuition_fee.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })
                }}
              </p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1"
                >{{ $lang.ACHIEVEMENTS}}</small> :</label>
              <p class="text-1">
                {{tutor_data.achievements}}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card flat outlined class="px-0" color="transparent">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        {{ $lang.OTHER_DETAILS }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="my-3">
        <v-row no-gutter>
          <v-col class="py-0" cols="12" md="6" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.PERSONAL_COMPUTER }} :</label>
              <p class="text-1">
              <span v-if="tutor_data.personal_computer">Yes</span>
              <span v-else>No</span>
              </p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="6" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.PERSONAL_VEHICLE }} :</label>
              <p class="text-1">
                <span v-if="tutor_data.personal_vehicle">Yes</span>
                <span v-else>No</span>
              </p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="6" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.TEACHING_PREFERENCE }} :</label>
              <p class="text-1">
                <span v-for="item in tutor_data.teaching_preference" :key="item">
                  {{ item }} ,
                </span>
              </p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="6" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.MODE_OF_CLASS }} :</label>
              <p class="text-1">
                {{ tutor_data.class_mode[0] }}, {{ tutor_data.class_mode[1] }}
              </p>
            </div>
          </v-col>

          <v-col class="py-0" cols="12" md="6" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.SUITABLE_DAYS }} :</label>

              <p class="text-1">
                <span
                  class="text-1"
                  v-for="(item, i) in tutor_data.suitable_days"
                  :key="item.id"
                >
                  {{ item }},
                </span>
              </p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="12" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.SUITABLE_TIME_SLOT }} :</label> <br />
              <span v-for="item in morning_time_slots" :key="item.id">
                <span
                  class="text-1"
                  v-if="tutor_data.time_slots_id_list.includes(item.id)"
                >
                  {{ item.slot_from + " - " + item.slot_to }} ,
                </span>
              </span>
              <span v-for="item in afternoon_time_slots" :key="item.id">
                <span
                  class="text-1"
                  v-if="tutor_data.time_slots_id_list.includes(item.id)"
                >
                  {{ item.slot_from + " - " + item.slot_to }} ,</span
                >
              </span>
              <span v-for="item in evening_time_slots" :key="item.id">
                <span
                  class="text-1"
                  v-if="tutor_data.time_slots_id_list.includes(item.id)"
                >
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
