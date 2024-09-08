<template>
  <v-card class="pb-5 py-5 bg-transparent" flat color="">
    <v-form ref="address_form" lazy-validation>
      <v-row class="ma-0">
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1"
              >{{ $lang.TUTOR_NAME }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.tutor_name"
              :placeholder="$lang.TUTOR_NAME"
              :rules="[$rules.REQUIRED_FIELD($lang.TUTOR_NAME)]"
              class="mt-1"
              dense
              maxlength="80"
              outlined
              single-line
            ></v-text-field>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.MOBILE_NUMBER }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.tutor_mobile"
              :placeholder="$lang.MOBILE_NUMBER"
              class="mt-1"
              dense
              maxlength="10"
              outlined
              single-line
              disabled
            >
              <template slot="prepend-inner">
                <span class="mt-1">+91</span>
              </template>
            </v-text-field>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.WA_MOBILE_NUMBER }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.whatsapp_number"
              :placeholder="$lang.WA_MOBILE_NUMBER"
              :rules="$rules.MOBILE"
              class="mt-1"
              dense
              maxlength="10"
              outlined
              single-line
            >
              <template slot="prepend-inner">
                <span class="mt-1">+91</span>
              </template>
            </v-text-field>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.ALTERNATE_MOBILE_NUMBER }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.alternate_number"
              :placeholder="$lang.ALTERNATE_NUMBER"
              :rules="$rules.MOBILE"
              class="mt-1"
              dense
              maxlength="10"
              outlined
              single-line
            >
              <template slot="prepend-inner">
                <span class="mt-1">+91</span>
              </template>
            </v-text-field>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1"
              >{{ $lang.EMAIL }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.email"
              :placeholder="$lang.EMAIL"
              :rules="$rules.EMAIL"
              class="mt-1"
              dense
              maxlength="80"
              outlined
              single-line
            ></v-text-field>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1"
              >{{ $lang.FATHER_NAME }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.father_name"
              :placeholder="$lang.FATHER_NAME"
              :rules="[$rules.REQUIRED_FIELD($lang.FATHER_NAME)]"
              class="mt-1"
              dense
              maxlength="80"
              outlined
              single-line
            ></v-text-field>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.GENDER }} <sup class="error--text">*</sup></label
            >
            <v-select
              v-model="form.gender"
              :items="$keys.GENDER_OPTIONS"
              :placeholder="$lang.GENDER"
              :rules="[$rules.REQUIRED_FIELD($lang.GENDER)]"
              class="mt-1"
              dense
              maxlength="80"
              outlined
              single-line
            ></v-select>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.DATE_OF_BIRTH }} <sup class="error--text">*</sup></label
            >
            <v-menu
              v-model="bob_menu"
              :close-on-content-click="false"
              :nudge-right="40"
              min-width="290px"
              offset-y
              transition="scale-transition"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="form.date_of_birth"
                  v-on="on"
                  :placeholder="$lang.DATE_OF_BIRTH"
                  :rules="[$rules.REQUIRED_FIELD($lang.DATE_OF_BIRTH)]"
                  dense
                  outlined
                  prepend-inner-icon=""
                  readonly
                  required
                  single-line
                  @click:prepend-inner="bob_menu = !bob_menu"
                >
                  <template slot="prepend-inner">
                    <v-icon class="mt-0">mdi-calendar-month-outline</v-icon>
                  </template>
                </v-text-field>
              </template>
              <v-date-picker
                v-model="form.date_of_birth"
                :max="today"
                @input="bob_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
        </v-col>
      </v-row>
      <!--  Educational details    -->
      <div>
        <v-row class="ma-0">
          <v-col
            :class="{
              'pa-0': $vuetify.breakpoint.smAndDown,
              'px-1 py-0': $vuetify.breakpoint.mdAndUp,
            }"
            cols="12"
            md="5"
          >
            <label class="label-text-1">
              {{ $lang.SCHOOL_NAME }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="academic_data.school_name"
              :placeholder="$lang.SCHOOL_NAME"
              :rules="[$rules.REQUIRED_FIELD($lang.SCHOOL_NAME)]"
              class="mt-1"
              dense
              maxlength="100"
              outlined
              single-line
            ></v-text-field>
          </v-col>
          <v-col
            :class="{
              'pa-0': $vuetify.breakpoint.smAndDown,
              'px-1 py-0': $vuetify.breakpoint.mdAndUp,
            }"
            cols="12"
            md="1"
          >
            <label class="label-text-1"> 10th % <sup class="error--text">*</sup></label>
            <v-text-field
              v-model="academic_data.score_10"
              placeholder="80%"
              :rules="[$rules.REQUIRED_NUMBER_FIELD('10th %')]"
              class="mt-1"
              dense
              maxlength="5"
              outlined
              single-line
            >
            </v-text-field>
          </v-col>
          <v-col
            :class="{
              'pa-0': $vuetify.breakpoint.smAndDown,
              'px-1 py-0': $vuetify.breakpoint.mdAndUp,
            }"
            cols="12"
            md="1"
          >
            <label class="label-text-1"> 12th % <sup class="error--text">*</sup></label>
            <v-text-field
              v-model="academic_data.score_12"
              placeholder="80%"
              :rules="[$rules.REQUIRED_NUMBER_FIELD('12th %')]"
              class="mt-1"
              dense
              maxlength="5"
              outlined
              single-line
            >
            </v-text-field>
          </v-col>
          <v-col
            :class="{
              'pa-0': $vuetify.breakpoint.smAndDown,
              'px-1 py-0': $vuetify.breakpoint.mdAndUp,
            }"
            cols="12"
            md="3"
          >
            <label class="label-text-1">
              {{ $lang.STREAM }} <sup class="error--text">*</sup></label
            >
            <v-select
              v-model="academic_data.stream"
              :label="$lang.STREAM"
              :items="stream_options"
              class="mt-1"
              dense
              :rules="[$rules.REQUIRED_FIELD($lang.STREAM)]"
              maxlength="50"
              outlined
              single-line
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="ma-0">
          <v-col
            :class="{
              'pa-0': $vuetify.breakpoint.smAndDown,
              'px-1 py-0': $vuetify.breakpoint.mdAndUp,
            }"
            cols="12"
            md="5"
          >
            <label class="label-text-1">
              {{ $lang.COLLAGE_NAME }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="academic_data.collage_name"
              :placeholder="$lang.COLLAGE_NAME"
              :rules="[$rules.REQUIRED_FIELD($lang.COLLAGE_NAME)]"
              class="mt-1"
              dense
              maxlength="100"
              outlined
              single-line
            ></v-text-field>
          </v-col>
          <v-col
            :class="{
              'pa-0': $vuetify.breakpoint.smAndDown,
              'px-1 py-0': $vuetify.breakpoint.mdAndUp,
            }"
            cols="12"
            md="2"
          >
            <label class="label-text-1">
              {{ $lang.COURSE_NAME }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="academic_data.collage_course_name"
              placeholder="BSc, MSc, BTech, BEd,"
              :rules="[$rules.REQUIRED_FIELD($lang.COURSE_NAME)]"
              class="mt-1"
              dense
              maxlength="100"
              outlined
              single-line
            ></v-text-field>
          </v-col>
          <v-col
            :class="{
              'pa-0': $vuetify.breakpoint.smAndDown,
              'px-1 py-0': $vuetify.breakpoint.mdAndUp,
            }"
            cols="12"
            md="3"
          >
            <label class="label-text-1">
              {{ $lang.STATUS }} <sup class="error--text">*</sup></label
            >
            <v-select
              v-model="academic_data.collage_status"
              :label="$lang.STATUS"
              :items="collage_status_options"
              class="mt-1"
              dense
              :rules="[$rules.REQUIRED_FIELD($lang.STATUS)]"
              maxlength="50"
              outlined
              single-line
            ></v-select>
          </v-col>
        </v-row>
      </div>

      <!-- action btn -->
      <div class="text-center mt-5 px-3">
        <v-btn
          text
          outlined
          color="primary"
          class="ma-3"
          width="120"
          @click="$router.go(-1)"
        >
          Cancel
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
      <!-- action btn end -->
    </v-form>
  </v-card>
</template>

<script>
import HelperMixin from "@/helper/mixins/helper-mixin";

export default {
  mixins: [HelperMixin],
  props: ["form", "tutor_table_id", "academic_data"],
  data: () => ({
    btn_loader: false,
    bob_menu: false,
    today: new Date().toISOString().substr(0, 10),
    stream_options: ["Science", "Commerce", "Arts"],
    collage_status_options: [
      "Pursuing Graduations",
      "Graduate",
      "Pursuing Post-Graduations",
      "Post-Graduate",
    ],
  }),
  methods: {
    /* get address */
    Save() {
      const self = this;
      if (
        this.$refs.address_form.validate() == false &&
        !this.form.longitude &&
        !this.form.latitude
      )
        return false;
      this.$store.dispatch("setPageLoader", false);
      let form = new FormData();
      if (self.tutor_table_id) form.append("tutor_table_id", self.tutor_table_id);
      form.append("type", self.$keys.TYPE_CONTACT_FORM);
      form.append("tutor_name", self.form.tutor_name);
      form.append("email", self.form.email);
      form.append("whatsapp_number", self.form.whatsapp_number);
      form.append("alternate_number", self.form.alternate_number);
      form.append("father_name", self.form.father_name);
      form.append("gender", self.form.gender);
      form.append("date_of_birth", self.form.date_of_birth);
      //education
      form.append("school_name", self.academic_data.school_name);
      form.append("collage_name", self.academic_data.collage_name);
      form.append("score_10", self.academic_data.score_10);
      form.append("score_12", self.academic_data.score_12);
      form.append("stream", self.academic_data.stream);
      form.append("collage_course_name", self.academic_data.collage_course_name);
      form.append("collage_status", self.academic_data.collage_status);

      // form.append("latitude", self.form.latitude);
      // form.append("longitude", self.form.longitude);

      const successHandler = (response) => {
        if (response.data.success) {
          this.$emit("next", 2);
        }
      };
      const finallyHandler = () => {
        this.$store.dispatch("setPageLoader", false);
      };

      self.request_POST(
        self,
        self.$urls.ADD_TUTOR_DATA,
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
