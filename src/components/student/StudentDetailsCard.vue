<style lang="scss" scoped>
.field-wrapper {
  margin-bottom: 8px;
}

.student-card .v-card {
  border-radius: 10px !important;
}

.card-divider {
  border: solid 1.5px !important;
  border-radius: 3px;
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
  <div class="student-card px-3">
    <v-card flat class="px-3" color="transparent">
      <v-card-text class="my-3">
        <v-row no-gutter>
          <!-- for mobile view -->
          <v-col class="py-0 small-screen" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.PROFILE_STATUS }} :</label>
              <p class="text-1">
                <span v-if="student_basic_data.profile_status"
                  :class="'status-' + student_basic_data.profile_status.toLowerCase()">{{
                    student_basic_data.profile_status }}</span>
              </p>
            </div>
          </v-col>
          <!--  -->
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.GENDER }} :</label>
              <p class="text-1">{{ student_basic_data.gender }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.DATE_OF_BIRTH }} :</label>
              <p class="text-1">{{ student_basic_data.dob }}</p>
            </div>
          </v-col>

          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.SING_UP_DATE }} :</label>
              <p class="text-1">{{ student_basic_data.signup_date }}</p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!--  ################ CONTACT_DETAILS #################    -->
    <v-card flat class="mb-5 pb-3" color="">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        <v-icon color="primary" class="mr-1" size="20">mdi-contacts</v-icon>
        {{ $lang.CONTACT_DETAILS }}</v-card-title>
      <div class="px-5">
        <v-divider class="card-divider" color="secondary"></v-divider>
      </div>
      <v-card-text class="my-3">
        <v-row no-gutter>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.MOBILE_NUMBER }} :</label>
              <p class="text-1">{{ mobile }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.WA_MOBILE_NUMBER }} :</label>
              <p class="text-1">{{ mobile }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.EMAIL }} :</label>
              <p class="text-1">{{ email || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.FATHER_NAME }} :</label>
              <p class="text-1">{{ student_basic_data.father_name || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">Father's {{ $lang.MOBILE_NUMBER }} :</label>
              <p class="text-1">{{ student_basic_data.father_contact_number || "-" }}</p>
            </div>
          </v-col>
          <!-- <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">Father's {{ $lang.EMAIL }} :</label>
              <p class="text-1">{{ student_basic_data.parent_email || "-" }}</p>
            </div>
          </v-col> -->
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.MOTHER_NAME }} :</label>
              <p class="text-1">{{ student_basic_data.mother_name || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.MOTHER_CONTACT_NUMBER }} :</label>
              <p class="text-1">{{ student_basic_data.mother_name || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.CONTACT_PERSON }} :</label>
              <p class="text-1">
                {{ student_basic_data.contact_person || "-" }}
              </p>
            </div>
          </v-col>

          <v-col class="py-0" cols="12" md="3" v-if="student_basic_data.contact_person == 'Other'">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.CONTACT_PERSON }} Name :</label>
              <p class="text-1">
                {{ student_basic_data.contact_person_name || "-" }}
              </p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3" v-if="student_basic_data.contact_person == 'Other'">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.CONTACT_PERSON }} Mobile :</label>
              <p class="text-1">
                {{ student_basic_data.contact_person_mobile || "-" }}
              </p>
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
        <v-divider class="card-divider" color="secondary"></v-divider>
      </div>
      <v-card-text class="my-3">
        <v-row no-gutter>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.CITY }} :</label>
              <p class="text-1">{{ student_basic_data.city || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="2">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.STATE }} :</label>
              <p class="text-1">{{ student_basic_data.state || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="1">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.PIN_CODE }} :</label>
              <p class="text-1">{{ student_basic_data.pin_code || "-" }}</p>
            </div>
            <!--        <GoogleMap ref="map_elm" :class_name="map_class_name" :clickable="false" :draggable="false"-->
            <!--                   :search_enable="false"-->
            <!--                   :zoom_control="false"></GoogleMap>-->
          </v-col>
          <v-col class="py-0" cols="12" md="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.LANDMARK }} :</label>
              <p class="text-1">{{ student_basic_data.landmark || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="12">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.ADDRESS }} :</label>
              <p class="text-1">{{ student_basic_data.address || "-" }}</p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!--  ############## ACADEMIC DETAILS ################    -->
    <v-card flat color="" class="mb-5 pb-3">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        <v-icon color="primary" class="mr-1">mdi-bank-circle</v-icon>
        {{ $lang.STUDENT_ACADEMIC_DETAILS }}
      </v-card-title>
      <div class="px-5">
        <v-divider class="card-divider" color="secondary"></v-divider>
      </div>
      <v-card-text class="my-3">
        <v-row no-gutter>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.CLASS }} :</label>
              <p class="text-1">{{ student_basic_data.class_name || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.EDUCATION_BOARD }} :</label>
              <p class="text-1">{{ student_basic_data.education_board || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.SCHOOL_NAME }} :</label>
              <p class="text-1">{{ student_basic_data.school_name || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.SUBJECTS }} :</label>
              <p class="text-1">
                <span v-for="(subject, i) in student_basic_data.subjects_list" :key="i">{{ subject }}
                  <span v-if="i >= 0 && i + 1 < student_basic_data.subjects_list.length">,
                  </span>
                </span>
              </p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="3">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.TUTOR_PREFERENCE }} :</label>
              <p class="text-1">{{ student_basic_data.tutor_preference || "-" }}</p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="9">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.SPECIAL_CONCERN }} :</label>
              <p class="text-1" style="width: 100%">
                {{ student_basic_data.special_concern || "-" }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!--  ############## OTHER DETAILS ################    -->
    <v-card flat color="" class="mb-5 pb-3">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        <v-icon color="primary" class="mr-1">mdi-information</v-icon>
        {{ $lang.OTHER_DETAILS }}
      </v-card-title>
      <div class="px-5">
        <v-divider class="card-divider" color="secondary"></v-divider>
      </div>
      <v-card-text class="my-3">
        <v-row no-gutter>
          <v-col class="py-0" cols="12" md="6" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.TEACHING_PREFERENCE }} :</label>

              <p class="text-1" v-if="student_basic_data.teaching_preference.length > 0">
                {{ student_basic_data.teaching_preference || "-" }}
              </p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="6" sm="6">
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.SUITABLE_DAYS }} :</label>

              <p class="text-1">
                <span class="text-1" v-for="(item, i) in student_basic_data.suitable_days" :key="item.id">
                  {{ item
                  }}<span v-if="i + 1 < student_basic_data.suitable_days.length">,</span>
                </span>
              </p>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="12" sm="6">
            <!-- suitable time -->
            <div class="field-wrapper">
              <label class="label-text-1">{{ $lang.SUITABLE_TIME_SLOT }} :</label> <br />
              <span v-for="item in morning_time_slots" :key="item.id">
                <span class="text-1" v-if="student_basic_data.time_slots_id_list.includes(item.id)">
                  {{ item.slot_from + " - " + item.slot_to }} ,
                </span>
              </span>
              <span v-for="item in afternoon_time_slots" :key="item.id">
                <span class="text-1" v-if="student_basic_data.time_slots_id_list.includes(item.id)">
                  {{ item.slot_from + " - " + item.slot_to }} ,</span>
              </span>
              <span v-for="item in evening_time_slots" :key="item.id">
                <span class="text-1" v-if="student_basic_data.time_slots_id_list.includes(item.id)">
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
    "email",
    "student_name",
    "mobile",
    "student_basic_data",
    "evening_time_slots",
    "morning_time_slots",
    "afternoon_time_slots",
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
