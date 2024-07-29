<template>
  <div>
    <v-form ref="educational_form" lazy-validation>
      <div>
        <v-row class="ma-0">
          <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"
                 md="5">
            <label class="label-text-1"> {{ $lang.SCHOOL_NAME }} <sup
                class="error--text">*</sup></label>
            <v-text-field
                v-model="school_name"
                :placeholder="$lang.SCHOOL_NAME"
                :rules="[$rules.REQUIRED_FIELD($lang.SCHOOL_NAME)]"
                class="mt-1"
                dense
                hide-details
                maxlength="100"
                outlined
                single-line
            ></v-text-field>
          </v-col>
          <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"
                 md="1">
            <label class="label-text-1"> 10th % <sup
                class="error--text">*</sup></label>
            <v-text-field
                v-model="score_10"
                placeholder="10th %"
                :rules="[$rules.REQUIRED_NUMBER_FIELD('10th %')]"
                class="mt-1"
                dense
                hide-details
                maxlength="5"
                outlined
                single-line
            >
            </v-text-field>
          </v-col>
          <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"
                 md="1">
            <label class="label-text-1"> 12th % <sup
                class="error--text">*</sup></label>
            <v-text-field
                v-model="score_12"
                placeholder="12th %"
                :rules="[$rules.REQUIRED_NUMBER_FIELD('12th %')]"
                class="mt-1"
                dense
                hide-details
                maxlength="5"
                outlined
                single-line
            >
            </v-text-field>
          </v-col>
          <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"
                 md="3">
            <label class="label-text-1"> {{ $lang.STREAM }} <sup
                class="error--text">*</sup></label>
            <v-select
                v-model="stream"
                :label="$lang.STREAM"
                :items="stream_options"
                class="mt-1"
                dense
                :rules="[$rules.REQUIRED_FIELD($lang.STREAM)]"
                hide-details
                maxlength="50"
                outlined
                single-line
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"
                 md="5">
            <label class="label-text-1"> {{ $lang.COLLAGE_NAME }} <sup
                class="error--text">*</sup></label>
            <v-text-field
                v-model="collage_name"
                :placeholder="$lang.COLLAGE_NAME"
                :rules="[$rules.REQUIRED_FIELD($lang.COLLAGE_NAME)]"
                class="mt-1"
                dense
                hide-details
                maxlength="100"
                outlined
                single-line
            ></v-text-field>
          </v-col>
          <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"
                 md="2">
            <label class="label-text-1"> {{ $lang.COURSE_NAME }} <sup
                class="error--text">*</sup></label>
            <v-text-field
                v-model="collage_course_name"
                :placeholder="$lang.COURSE_NAME"
                :rules="[$rules.REQUIRED_FIELD($lang.COURSE_NAME)]"
                class="mt-1"
                dense
                hide-details
                maxlength="100"
                outlined
                single-line
            ></v-text-field>
          </v-col>
          <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"
                 md="3">
            <label class="label-text-1"> {{ $lang.STREAM }} <sup class="error--text">*</sup></label>
            <v-select
                v-model="stream"
                :label="$lang.STREAM"
                :items="stream_options"
                class="mt-1"
                dense
                :rules="[$rules.REQUIRED_FIELD($lang.STREAM)]"
                hide-details
                maxlength="50"
                outlined
                single-line
            ></v-select>
          </v-col>
        </v-row>
      </div>


      <!--      <v-row v-for="(item,i) in education_list" :key="i" class="ma-0">-->
      <!--        <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"-->
      <!--               md="2">-->
      <!--          <label class="label-text-1"> {{ $lang.COURSE_NAME }} <sup-->
      <!--              class="error&#45;&#45;text">*</sup></label>-->
      <!--          <v-select-->
      <!--              v-model="item.course"-->
      <!--              :items="course_options"-->
      <!--              :label="$lang.COURSE_NAME"-->
      <!--              :rules="[$rules.REQUIRED_FIELD($lang.COURSE_NAME)]"-->
      <!--              class="mt-1"-->
      <!--              dense-->
      <!--              hide-details-->
      <!--              maxlength="6"-->
      <!--              outlined-->
      <!--              single-line-->
      <!--              :disabled="i<=1?true:false"-->
      <!--          ></v-select>-->
      <!--        </v-col>-->
      <!--        <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"-->
      <!--               md="4">-->
      <!--          <label class="label-text-1"> {{ $lang.INSTITUTE_NAME }} <sup-->
      <!--              class="error&#45;&#45;text">*</sup></label>-->
      <!--          <v-text-field-->
      <!--              v-model="item.institute_name"-->
      <!--              :label="$lang.INSTITUTE_NAME"-->
      <!--              :rules="[$rules.REQUIRED_FIELD($lang.INSTITUTE_NAME)]"-->
      <!--              class="mt-1"-->
      <!--              dense-->
      <!--              hide-details-->
      <!--              maxlength="100"-->
      <!--              outlined-->
      <!--              single-line-->
      <!--          ></v-text-field>-->
      <!--        </v-col>-->
      <!--        <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"-->
      <!--               md="2">-->
      <!--          <label class="label-text-1"> {{ $lang.SCORE }} <sup-->
      <!--              class="error&#45;&#45;text">*</sup></label>-->
      <!--          <v-text-field-->
      <!--              v-model="item.score"-->
      <!--              :label="$lang.SCORE"-->
      <!--              :rules="[$rules.REQUIRED_FIELD($lang.SCORE)]"-->
      <!--              class="mt-1"-->
      <!--              dense-->
      <!--              hide-details-->
      <!--              maxlength="6"-->
      <!--              outlined-->
      <!--              single-line-->
      <!--          ></v-text-field>-->
      <!--        </v-col>-->
      <!--        <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, 'px-1 py-0': $vuetify.breakpoint. mdAndUp}" cols="12"-->
      <!--               md="3">-->
      <!--          <label class="label-text-1"> {{ $lang.STREAM }} <sup-->
      <!--              class="error&#45;&#45;text">*</sup></label>-->
      <!--          <v-select-->
      <!--              v-model="item.stream"-->
      <!--              :label="$lang.STREAM"-->
      <!--              :items="stream_options"-->
      <!--              class="mt-1"-->
      <!--              dense-->
      <!--              :rules="[$rules.REQUIRED_FIELD($lang.STREAM)]"-->
      <!--              hide-details-->
      <!--              maxlength="50"-->
      <!--              outlined-->
      <!--              single-line-->
      <!--          ></v-select>-->
      <!--        </v-col>-->
      <!--        <v-col class="text-center" cols="12" md="1">-->
      <!--          <v-btn v-if="i>=2" class="mt-3" color="error" fab small text-->
      <!--                 @click="removeMoreInstitutes(i)"-->
      <!--                 :class="{'d-none': $vuetify.breakpoint. smAndDown, '': $vuetify.breakpoint. mdAndUp}">-->
      <!--            <v-icon>mdi-close</v-icon>-->
      <!--          </v-btn>-->
      <!--        </v-col>-->
      <!--      </v-row>-->
<!--      <v-btn v-if="education_list.length<6"-->
<!--             :block="($vuetify.breakpoint.xs||$vuetify.breakpoint.sm)  ? true : false"-->
<!--             class="mt-3 px-8 py-4" color="primary" outlined small-->
<!--             @click="addMoreInstitutes">-->
<!--        <v-icon>mdi-plus</v-icon>-->
<!--        Add more-->
<!--      </v-btn>-->

      <div class="text-center mt-5">
        <v-btn
            class="my-3 px-8 py-4" color="primary"
            width="200px"
            @click="saveAcademicDetails">
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
      education_list: [],
      course_options: ["High School", "Higher Secondary School", "Diploma", "Graduation", "Post Graduation", "Phd"],
      stream_options: ["Science", "Commerce", "Arts"],

      school_name: "",
      collage_name: "",
      score_10: "",
      score_12: "",
      stream: "",
      collage_course_name: "",
      collage_status: "",

    }
  },
  created() {
    if (this.$store.getters.getUsertype != this.$keys.ACCOUNT_TEACHER)
      this.tutor_table_id = this.decrypt(this.$route.query.tutor_table_id)
    this.getTutorDetails()
  },
  methods: {
    getTutorDetails() {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let params = {};
      if (self.tutor_table_id)
        params.tutor_table_id = self.tutor_table_id
      const successHandler = (response) => {
        if (response.data.success) {
          self.education_list = response.data.academic_data_list
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
    addMoreInstitutes() {
      this.education_list.push({
        course: "",
        institute_name: "",
        score: "",
        stream: "",
      })
    },
    removeMoreInstitutes(i) {
      this.education_list.splice(i, 1)
    },
    saveAcademicDetails() {
      const self = this
      if (this.$refs.educational_form.validate() == false)
        return false
      this.$store.dispatch("setPageLoader", false);
      let form = new FormData();
      form.append("academic_data_list", JSON.stringify(this.education_list))
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
          self.$urls.TUTOR_ADD_ACADEMIC_DATA,
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