<template>
  <div>
    <v-form ref="address_form" lazy-validation>
      <v-row
        :class="{
          'px-0': $vuetify.breakpoint.smAndDown,
          'px-0': $vuetify.breakpoint.mdAndUp,
        }"
        class="ma-0"
      >
        <v-col
          :class="{
            'px-0 py-0': $vuetify.breakpoint.smAndDown,
            'pl-0': $vuetify.breakpoint.mdAndUp,
          }"
          cols="12"
          md="6"
        >
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
        <v-col
          :class="{
            'px-0 py-0': $vuetify.breakpoint.smAndDown,
            'pl-0': $vuetify.breakpoint.mdAndUp,
          }"
          cols="12"
          md="6"
        >
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
        <v-col
          :class="{
            'px-0 py-0': $vuetify.breakpoint.smAndDown,
            'pl-0': $vuetify.breakpoint.mdAndUp,
          }"
          cols="12"
          md="6"
        >
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
        <v-col
          :class="{
            'px-0 py-0': $vuetify.breakpoint.smAndDown,
            'pl-0': $vuetify.breakpoint.mdAndUp,
          }"
          cols="12"
          md="6"
        >
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
        <v-col
          :class="{
            'px-0 py-0': $vuetify.breakpoint.smAndDown,
            'pl-0': $vuetify.breakpoint.mdAndUp,
          }"
          cols="12"
          md="6"
        >
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.ADDRESS }} <sup class="error--text">*</sup></label
            >
            <v-textarea
              v-model="form.address"
              :placeholder="$lang.ADDRESS"
              :rules="[$rules.REQUIRED_FIELD($lang.ADDRESS)]"
              class="mt-1"
              dense
              outlined
              single-line
            ></v-textarea>
          </div>
        </v-col>
        <v-col
          :class="{
            'px-0 py-0': $vuetify.breakpoint.smAndDown,
            'pl-0': $vuetify.breakpoint.mdAndUp,
          }"
          cols="12"
          md="6"
        >
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.PIN_CODE }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.pin_code"
              :placeholder="$lang.PIN_CODE"
              :rules="[$rules.PIN_CODE($lang.PIN_CODE)]"
              class="mt-1"
              dense
              maxlength="6"
              outlined
              single-line
              @change="getPincodeData(form.pin_code)"
            ></v-text-field>
          </div>
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.CITY }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="city"
              :placeholder="$lang.CITY"
              :rules="[$rules.REQUIRED_FIELD($lang.CITY)]"
              class="mt-1"
              dense
              maxlength="80"
              outlined
              single-line
              readonly
            ></v-text-field>
          </div>
        </v-col>
        <!--       removed map for now  -->
        <!--        <v-col :class="{'px-0 py-0': $vuetify.breakpoint. smAndDown, 'pl-0': $vuetify.breakpoint. mdAndUp}" cols="12"-->
        <!--               md="12">-->
        <!--          <GoogleMap ref="map_elm" :class_name="class_name" @update-center="get_location"></GoogleMap>-->
        <!--        </v-col>-->
        <!--        <p v-if="!form.latitude" class="red&#45;&#45;text"> Please update your location</p>-->
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
              v-model="form.school_name"
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
              v-model="form.score_10"
              placeholder="10th %"
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
              v-model="form.score_12"
              placeholder="12th %"
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
              v-model="form.stream"
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
              v-model="form.collage_name"
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
              v-model="form.collage_course_name"
              :placeholder="$lang.COURSE_NAME"
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
              v-model="form.collage_status"
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

      <div class="text-center mt-5">
        <v-btn
          class="my-3 px-8 py-4"
          color="primary"
          width="200px"
          @click="saveAddressDetails"
        >
          {{ $lang.SUBMIT }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import HelperMixin from "@/helper/mixins/helper-mixin";

export default {
  mixins: [HelperMixin],
  components: {
    // GoogleMap: () => import('@/components/shared/GoogleMap'),
  },
  data: () => ({
    tutor_table_id: null,
    btn_loader: false,
    bob_menu: false,
    today: new Date().toISOString().substr(0, 10),
    class_name: "min-height",
    stream_options: ["Science", "Commerce", "Arts"],
    collage_status_options: [
      "Pursuing Graduations",
      "Graduate",
      "Pursuing Post-Graduations",
      "Post-Graduate",
    ],
    form: {
      email: "",
      father_name: "",
      gender: "",
      date_of_birth: "",
      address: "",
      pin_code: "",
      latitude: "",
      longitude: "",
      // city: "",
      // state: "",

      school_name: "",
      collage_name: "",
      score_10: "",
      score_12: "",
      stream: "",
      collage_course_name: "",
      collage_status: "",
    },
  }),
  created() {
    if (this.$store.getters.getUsertype != this.$keys.ACCOUNT_TEACHER)
      this.tutor_table_id = this.decrypt(this.$route.query.tutor_table_id);
    this.getTutorDetails();
  },
  methods: {
    /* fetching tutor profile */
    getTutorDetails() {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let params = {};
      if (self.tutor_table_id) params.tutor_table_id = self.tutor_table_id;

      const successHandler = (response) => {
        if (response.data.success) {
          this.form.email = response.data.tutor_data.email;
          this.form.father_name = response.data.tutor_data.father_name;
          this.form.gender = response.data.tutor_data.gender;
          this.form.date_of_birth = response.data.tutor_data.date_of_birth;
          this.form.address = response.data.tutor_data.address;
          this.form.pin_code = response.data.tutor_data.pin_code;
          this.city = response.data.tutor_data.city;
          this.state = response.data.tutor_data.state;
          this.form.pin_code = response.data.tutor_data.pin_code;
          //education
          this.form.school_name = response.data.academic_data.school_name;
          this.form.collage_name = response.data.academic_data.collage_name;
          this.form.score_10 = response.data.academic_data.score_10;
          this.form.score_12 = response.data.academic_data.score_12;
          this.form.stream = response.data.academic_data.stream;
          this.form.collage_course_name = response.data.academic_data.collage_course_name;
          this.form.collage_status = response.data.academic_data.collage_status;

          // this.form.latitude = response.data.tutor_data.latitude
          // this.form.longitude = response.data.tutor_data.longitude
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
    /* get and set map location */
    // get_location(lat, lng) {
    //   this.form.latitude = lat
    //   this.form.longitude = lng
    //
    // },
    /* get address */
    saveAddressDetails() {
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
      form.append("email", self.form.email);
      form.append("father_name", self.form.father_name);
      form.append("gender", self.form.gender);
      form.append("date_of_birth", self.form.date_of_birth);
      form.append("address", self.form.address);
      form.append("city", self.city);
      form.append("state", self.state);
      form.append("pin_code", self.form.pin_code);
      //education
      form.append("school_name", self.form.school_name);
      form.append("collage_name", self.form.collage_name);
      form.append("score_10", self.form.score_10);
      form.append("score_12", self.form.score_12);
      form.append("stream", self.form.stream);
      form.append("collage_course_name", self.form.collage_course_name);
      form.append("collage_status", self.form.collage_status);

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
        self.$urls.TUTOR_ADD_ADDRESS_DATA,
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
