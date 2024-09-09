<template>
  <div>
    <v-form ref="professional_form" lazy-validation>
      <v-row v-for="grade in grade_list" :key="grade.id" class="ma-0 mt-2">
        <v-col class="" cols="12" md="2">
          <p class="label-text-1 mt-2">{{ grade.grade_name }}</p>
        </v-col>
        <v-col class="" cols="12" md="10">
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
      <v-row class="ma-0">
        <v-col cols="12" md="5">
          <label class="label-text-1">
            {{ $lang.PREFERRED_BOARD }} <sup class="error--text">*</sup></label
          >
          <v-select
            v-model="form.preferred_boards"
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
        <v-col cols="12" md="4">
          <label class="label-text-1"
            >{{ $lang.EXPERIENCE }} <small>(in Years)</small></label
          >
          <!-- :rules="[$rules.REQUIRED_NUMBER_FIELD($lang.EXPERIENCE)]" -->

          <v-select
            v-model="form.experience"
            :placeholder="$lang.EXPERIENCE"
            class="mt-1"
            dense
            maxlength="2"
            outlined
            single-line
            :items="experience_options"
          ></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <label class="label-text-1"
            >Expected Tuition Fee <small>(per Hours)</small></label
          >
          <v-text-field
            v-model="form.tuition_fee"
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
        <v-col class="mt-3" cols="12" md="6">
          <label class="label-text-1"> {{ $lang.ACHIEVEMENTS }} </label>
          <v-textarea
            v-model="form.achievements"
            :placeholder="$lang.ABOUT_YOURSELF"
            class="mt-1"
            dense
            outlined
            row-height="40"
            rows="2"
            single-line
          ></v-textarea>
        </v-col>
        <v-col class="mt-3" cols="12" md="6">
          <label class="label-text-1"> {{ $lang.ABOUT_YOURSELF }} </label>
          <v-textarea
            v-model="form.about_you"
            :placeholder="$lang.ABOUT_YOURSELF"
            class="mt-1"
            dense
            outlined
            row-height="40"
            rows="2"
            single-line
          ></v-textarea>
        </v-col>
      </v-row>

      <!--  action btn -->
      <div class="text-center mt-5 px-3">
        <v-btn
          text
          outlined
          color="primary"
          class="ma-3"
          width="120"
          @click="$emit('next', 2)"
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
  </div>
</template>
<script>
export default {
  props: [
    "form",
    "tutor_table_id",
    "afternoon_time_slots",
    "evening_time_slots",
    "grade_list",
    "morning_time_slots",
    "time_slots_id_list",
  ],
  data() {
    return {
      btn_loader: false,
      board_options: ["CBSE", "ICSE", "State Board", "IB", "CISCE", "NIOS", "CIE"],
      experience_options: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
      ],
    };
  },
  methods: {
    /* save tutor profile */
    Save() {
      const self = this;
      if (this.$refs.professional_form.validate() == false) return false;

      var is_error = true;
      this.btn_loader = true;
      this.grade_list.forEach(function (item) {
        item.subject_list.forEach(function (subject) {
          if (subject.selected == true) is_error = false;
        });
      });

      if (is_error) {
        this.showSnakeBar("error", "Please Choose at least once subject");
        return false;
      }
      this.$store.dispatch("setPageLoader", false);
      let form = new FormData();
      form.append("grade_list", JSON.stringify(this.grade_list));
      form.append("slot_id_list", JSON.stringify(this.time_slots_id_list));
      form.append("about_you", this.form.about_you);
      form.append("achievements", this.form.achievements);
      form.append("preferred_board", JSON.stringify(this.form.preferred_boards));
      form.append("tuition_fee", this.form.tuition_fee);
      form.append("experience", this.form.experience);
      if (this.tutor_table_id) form.append("tutor_table_id", this.tutor_table_id);
      const successHandler = (response) => {
        if (response.data.success) {
          this.$emit("next", 4);
        }
      };
      const finallyHandler = () => {
        this.btn_loader = false;
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
  },
};
</script>
