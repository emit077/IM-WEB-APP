<template>
  <div>
    <v-form ref="professional_form" lazy-validation>
      <v-row v-for="grade in grade_list" :key="grade.id" class="ma-0 mt-2">
        <v-col class="pa-0" cols="12" md="2">
          <p class="label-text-1 mt-2">{{ grade.grade_name }}</p>
        </v-col>
        <v-col class="pa-0" cols="12" md="10">
          <v-checkbox
              v-for="item in grade.subject_list" :key="item.id"
              v-model="item.selected"
              :label="item.subject_name"
              :value="item.selected"
              class="shrink ma-0 ml-3  d-inline-flex"
              hide-details
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row class="ma-0 mt-5" justify="end">
        <v-col class="pa-0" cols="12" md="2">
          <label class="label-text-1">{{ $lang.SUITABLE_TIME_SLOT }}:</label>
        </v-col>
        <v-col class="pa-0" cols="12" md="10">
          <div class="form-filed-wrapper">
            <div class="d-inline-block px-2  v-align-top">
              <p class="text-1 text-center mb-0">{{ $lang.MORNING }}</p>
              <v-checkbox
                  v-for="item in morning_time_slots" :key="item.id"
                  v-model="time_slots_id_list"
                  :label="item.slot_from+' - '+item.slot_to"
                  :value="item.id"
                  class="shrink ma-0"
                  hide-details
              ></v-checkbox>
            </div>
            <div class="d-inline-block px-2  v-align-top">
              <p class="text-1 text-center mb-0">{{ $lang.AFTER_NOON }}</p>
              <v-checkbox
                  v-for="item in afternoon_time_slots" :key="item.id"
                  v-model="time_slots_id_list"
                  :label="item.slot_from+' - '+item.slot_to"
                  :value="item.id"
                  class="shrink ma-0"
                  hide-details
              ></v-checkbox>
            </div>
            <div class="d-inline-block px-2 v-align-top ">
              <p class="text-1  text-center mb-0">{{ $lang.EVENING }}</p>
              <v-checkbox
                  v-for="item in evening_time_slots" :key="item.id"
                  v-model="time_slots_id_list"
                  :label="item.slot_from+' - '+item.slot_to"
                  :value="item.id"
                  class="shrink ma-0"
                  hide-details
              ></v-checkbox>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row class="ma-0">
        <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"
               md="4">
          <label class="label-text-1"> {{ $lang.PREFERRED_BOARD }} <sup
              class="error--text">*</sup></label>
          <v-select
              v-model="preferred_board"
              :label="$lang.PREFERRED_BOARD"
              :items="board_options"
              class="mt-1"
              dense
              :rules="[$rules.REQUIRED_LIST_FIELD($lang.PREFERRED_BOARD)]"
              maxlength="50"
              multiple
              outlined
              single-line
          ></v-select>
        </v-col>
        <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"
               md="2">
          <label class="label-text-1">{{ $lang.EXPERIENCE }} <small>(in Years)</small></label>

          <v-select
              v-model="experience"
              :placeholder=" $lang.EXPERIENCE"
              :rules="[$rules.REQUIRED_NUMBER_FIELD( $lang.EXPERIENCE)]"
              class="mt-1"
              dense
              maxlength="2"
              outlined
              single-line
              :items="experience_options"
          ></v-select>
        </v-col>
        <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"
               md="2">
          <label class="label-text-1">Expected Tuition Fee <small>(per Hours)</small></label>
          <v-text-field
              v-model="tuition_fee"
              placeholder="Tuition Fee"
              :rules="[$rules.REQUIRED_NUMBER_FIELD('Tuition Fee')]"
              class="mt-1"
              dense
              maxlength="5"
              outlined
              single-line
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col class="pa-0 mt-3" cols="12" md="8">
          <label class="label-text-1 "> {{ $lang.ABOUT_YOURSELF }} </label>
          <v-textarea
              v-model="special_concern"
              :placeholder="$lang.ABOUT_YOURSELF"
              class="mt-1"
              dense
              outlined
              row-height="40"
              rows="4"
              single-line
          ></v-textarea>

        </v-col>
      </v-row>


      <div class="text-center mt-5">
        <v-btn
            class="my-3 px-8 py-4" color="primary"
            width="200px"
            @click="saveDetails">
          {{ $lang.SUBMIT }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>

export default {

  data() {
    return {
      tutor_table_id: null,
      special_concern: "",
      tutor_professional_data: [],
      grade_list: [],
      morning_time_slots: [],
      afternoon_time_slots: [],
      evening_time_slots: [],
      time_slots_id_list: [],
      board_options: ['CBSE', 'ICSE', 'State Board', 'IB', 'CISCE', 'NIOS', 'CIE'],
      experience_options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      preferred_board: [],
      tuition_fee: null,
      experience: null,
    }
  },
  created() {
    if (this.$store.getters.getUsertype != this.$keys.ACCOUNT_TEACHER)
      this.tutor_table_id = this.decrypt(this.$route.query.tutor_table_id)
    this.getTutorDetails()
  },
  methods: {
    /* fetching tutor profile */
    getTutorDetails() {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let params = {};
      if (self.tutor_table_id)
        params.tutor_table_id = self.tutor_table_id
      const successHandler = (response) => {
        if (response.data.success) {
          this.special_concern = response.data.tutor_data.special_concern
          self.tutor_professional_data = response.data.tutor_professional_data
          self.grade_list = response.data.grade_list
          self.morning_time_slots = response.data.morning_time_slots
          self.afternoon_time_slots = response.data.afternoon_time_slots
          self.evening_time_slots = response.data.evening_time_slots
          self.time_slots_id_list = response.data.slot_id_list
          self.tuition_fee = response.data.tutor_data.tuition_fee
          self.preferred_board = response.data.tutor_data.preferred_boards
          self.experience = response.data.tutor_data.experience
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
    /* save tutor profile */
    saveDetails() {
      const self = this
      if (this.$refs.professional_form.validate() == false)
        return false

      var is_error = true
      this.grade_list.forEach(function (item) {
        item.subject_list.forEach(function (subject) {
          if (subject.selected == true)
            is_error = false
        })
      })

      if (is_error) {
        this.showSnakeBar("error", "Please Choose at least once subject")
        return false
      }
      this.$store.dispatch("setPageLoader", false);
      let form = new FormData();
      form.append("grade_list", JSON.stringify(this.grade_list))
      form.append("slot_id_list", JSON.stringify(this.time_slots_id_list))
      form.append("special_concern", this.special_concern)
      form.append("preferred_board", JSON.stringify(this.preferred_board))
      form.append("tuition_fee", this.tuition_fee)
      form.append("experience", this.experience)
      if (this.tutor_table_id)
        form.append("tutor_table_id", this.tutor_table_id)
      const successHandler = (response) => {
        if (response.data.success) {
          this.$emit("next", 3)
        }
      };
      const finallyHandler = () => {
        this.$store.dispatch("setPageLoader", false);
      };

      self.request_POST(
          self,
          self.$urls.TUTOR_ADD_PROFESSIONAL_DATA,
          form,
          successHandler,
          null,
          null,
          finallyHandler
      );
    },
  }
}
</script>