<style lang="scss" scoped>
.student_edit_form_wrapper {
  label {
    margin-left: 8px;
  }
}
</style>

<template>
  <div class="student_edit_form_wrapper">
    <v-form ref="student_edit_form" lazy-validation>
      <v-row
        :class="{
          'px-0': $vuetify.breakpoint.smAndDown,
          'px-0': $vuetify.breakpoint.mdAndUp,
        }"
        class="ma-0"
      >
        <v-col
          :class="{
            'px-0': $vuetify.breakpoint.smAndDown,
            'px-4': $vuetify.breakpoint.mdAndUp,
          }"
          cols="12"
          md="8"
        >
          <p class="pt-2 font-weight-bold">
            {{ $lang.STUDENT_BASIC_DETAILS }}
          </p>
          <v-row
            :class="{
              'px-0': $vuetify.breakpoint.smAndDown,
              'px-0': $vuetify.breakpoint.mdAndUp,
            }"
            class="ma-0"
          >
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1"
                  >{{ $lang.STUDENT_NAME }} <sup class="error--text">*</sup></label
                >
                <v-text-field
                  v-model="form.name"
                  :placeholder="$lang.STUDENT_NAME"
                  :rules="[$rules.REQUIRED_FIELD($lang.STUDENT_NAME)]"
                  class="mt-1"
                  dense
                  maxlength="80"
                  outlined
                  single-line
                ></v-text-field>
              </div>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
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
            <v-col class="py-0" cols="12" md="6">
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
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1">
                  Father's {{ $lang.MOBILE_NUMBER }}
                  <sup class="error--text">*</sup></label
                >
                <v-text-field
                  v-model="form.father_contact_number"
                  :placeholder="$lang.MOBILE_NUMBER"
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

            <!--            <v-col class="py-0" cols="12" md="6">-->
            <!--              <div class="form-filed-wrapper">-->
            <!--                <label class="label-text-1"> {{ $lang.MOTHER_NAME }} </label>-->
            <!--                <v-text-field-->
            <!--                    v-model="form.mother_name"-->
            <!--                    :placeholder="$lang.MOTHER_NAME"-->
            <!--                    class="mt-1"-->
            <!--                    dense-->
            <!--                    maxlength="80"-->
            <!--                    outlined-->
            <!--                    single-line-->
            <!--                ></v-text-field>-->
            <!--              </div>-->
            <!--            </v-col>-->

            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1">{{ $lang.WA_MOBILE_NUMBER }} </label>
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

            <v-col class="py-0" cols="12" md="6">
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

            <v-col class="py-0" cols="12" md="6">
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
                      :rules="[$rules.REQUIRED_FIELD($lang.DATE_OF_BIRTH)]"
                      dense
                      label="Date Of Birth"
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
          <v-divider></v-divider>
          <p class="pt-2 font-weight-bold">
            {{ $lang.STUDENT_ADDRESS_DETAILS }}
          </p>

          <v-row
            :class="{
              'px-0': $vuetify.breakpoint.smAndDown,
              'px-0': $vuetify.breakpoint.mdAndUp,
            }"
            class="ma-0"
          >
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1">
                  {{ $lang.LANDMARK }} <sup class="error--text">*</sup></label
                >
                <v-text-field
                  v-model="form.landmark"
                  :placeholder="$lang.LANDMARK"
                  :rules="[$rules.REQUIRED_FIELD($lang.LANDMARK)]"
                  class="mt-1"
                  dense
                  maxlength="250"
                  outlined
                  single-line
                  hide-details
                ></v-text-field>
              </div>
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
                  :loading="pin_loading"
                  hide-details
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
                  hide-details
                ></v-text-field>
              </div>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
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
                  rows="6"
                ></v-textarea>
              </div>
            </v-col>

            <!--     not using the map for now       -->
            <!--            <v-col class="py-0" cols="12" md="12">-->
            <!--              <GoogleMap ref="map_elm" :class_name="class_name" @update-center="get_location"></GoogleMap>-->

            <!--              <p v-if="!form.latitude" class="red&#45;&#45;text"> Please update your location</p>-->
            <!--            </v-col>-->
          </v-row>

          <v-divider></v-divider>
          <p class="pt-2 font-weight-bold">
            {{ $lang.STUDENT_ACADEMIC_DETAILS }}
          </p>
          <v-row
            :class="{
              'px-0': $vuetify.breakpoint.smAndDown,
              'px-0': $vuetify.breakpoint.mdAndUp,
            }"
            class="ma-0"
          >
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1">
                  {{ $lang.SCHOOL_NAME }} <sup class="error--text">*</sup></label
                >
                <v-text-field
                  v-model="form.school_name"
                  :placeholder="$lang.SCHOOL_NAME"
                  :rules="[$rules.REQUIRED_FIELD($lang.SCHOOL_NAME)]"
                  class="mt-1"
                  dense
                  maxlength="250"
                  outlined
                  single-line
                ></v-text-field>
              </div>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1">
                  {{ $lang.EDUCATION_BOARD }} <sup class="error--text">*</sup></label
                >
                <v-text-field
                  v-model="form.education_board"
                  :placeholder="$lang.EDUCATION_BOARD"
                  :rules="[$rules.REQUIRED_FIELD($lang.EDUCATION_BOARD)]"
                  class="mt-1"
                  dense
                  maxlength="250"
                  outlined
                  single-line
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row
            :class="{
              'px-0': $vuetify.breakpoint.smAndDown,
              'px-0': $vuetify.breakpoint.mdAndUp,
            }"
            class="ma-0"
          >
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1">
                  {{ $lang.CLASS }} <sup class="error--text">*</sup></label
                >
                <v-select
                  v-model="form.class_id"
                  :items="class_list"
                  :placeholder="$lang.CLASS"
                  :rules="[$rules.REQUIRED_FIELD($lang.CLASS)]"
                  class="mt-1"
                  dense
                  item-text="class_name"
                  item-value="id"
                  maxlength="80"
                  outlined
                  single-line
                ></v-select>
              </div>

              <div class="form-filed-wrapper">
                <label class="label-text-1">
                  {{ $lang.SUBJECTS }} <sup class="error--text">*</sup></label
                >
                <v-select
                  v-model="subject_id_list"
                  :items="subject_list"
                  :placeholder="$lang.SUBJECTS"
                  :rules="[$rules.REQUIRED_LIST_FIELD($lang.SUBJECTS)]"
                  class="mt-1"
                  dense
                  item-text="subject_name"
                  item-value="id"
                  maxlength="80"
                  multiple
                  outlined
                  single-line
                  @focus="getSubjectList"
                ></v-select>
              </div>

              <div class="form-filed-wrapper">
                <label class="label-text-1">
                  {{ $lang.TUTOR_PREFERENCE }} <sup class="error--text">*</sup></label
                >
                <v-select
                  v-model="form.tutor_preference"
                  :items="tutor_preference_options"
                  :placeholder="$lang.TUTOR_PREFERENCE"
                  :rules="[$rules.REQUIRED_FIELD($lang.TUTOR_PREFERENCE)]"
                  class="mt-1"
                  dense
                  maxlength="80"
                  outlined
                  single-line
                ></v-select>
              </div>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1">
                  {{ $lang.HOBBIES }} <sup class="error--text">*</sup></label
                >
                <v-text-field
                  v-model="form.hobbies"
                  :placeholder="$lang.HOBBIES"
                  :rules="[$rules.REQUIRED_FIELD($lang.HOBBIES)]"
                  class="mt-1"
                  dense
                  maxlength="350"
                  outlined
                  single-line
                ></v-text-field>
              </div>
              <div class="form-filed-wrapper">
                <label class="label-text-1"> {{ $lang.SPECIAL_CONCERN }} </label>
                <v-textarea
                  v-model="form.special_concern"
                  :placeholder="$lang.SPECIAL_CONCERN"
                  class="mt-1"
                  dense
                  outlined
                  row-height="40"
                  rows="5"
                  single-line
                ></v-textarea>
              </div>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <!-- Other details -->
          <p class="pt-2 font-weight-bold">
            {{ $lang.OTHER_DETAILS }}
          </p>
          <v-row
            :class="{
              'px-0': $vuetify.breakpoint.smAndDown,
              'px-0': $vuetify.breakpoint.mdAndUp,
            }"
            class="ma-0"
          >
            <v-col class="py-0" cols="12" md="12">
              <div class="form-filed-wrapper mt-2">
                <label class="label-text-1 pb-0">{{ $lang.MODE_OF_CLASS }}:</label>
                <div class="px-2 d-flex v-align-top">
                  <v-checkbox
                    v-for="(item, i) in $keys.CLASS_MODE_OPTION"
                    :key="item"
                    v-model="class_mode_preference"
                    :label="item"
                    :value="item"
                    class="shrink mr-3 mt-0"
                    hide-details
                  ></v-checkbox>
                </div>
              </div>
            </v-col>
            <!-- day Perference -->
            <v-col class="py-0" cols="12" md="12">
              <div class="form-filed-wrapper mt-2">
                <label class="label-text-1">{{ $lang.SUITABLE_DAYS }}:</label> <br />
                <div
                  class="px-2 d-flex v-align-top flex-wrap"
                  style="flex-direction: row"
                >
                  <v-checkbox
                    v-for="(item, i) in $keys.WEEKDAYS_OPTION"
                    :key="item"
                    v-model="suitable_days"
                    :label="item"
                    :value="item"
                    class="shrink mr-3 mt-0"
                    hide-details
                  ></v-checkbox>
                </div>
              </div>
            </v-col>
            <!-- time preference -->
            <v-col class="py-0" cols="12" md="12">
              <div class="form-filed-wrapper mt-2">
                <label class="label-text-1">{{ $lang.SUITABLE_TIME_SLOT }}:</label> <br />
                <div class="d-inline-block px-2 v-align-top">
                  <p class="text-1 text-md-left text-center mb-2">{{ $lang.MORNING }}</p>
                  <v-checkbox
                    v-for="item in morning_time_slots"
                    :key="item.id"
                    v-model="form.time_slots_id_list"
                    :label="item.slot_from + ' - ' + item.slot_to"
                    :value="item.id"
                    class="shrink ma-0"
                    hide-details
                  ></v-checkbox>
                </div>
                <div class="d-inline-block px-2 v-align-top">
                  <p class="text-1 text-md-left text-center mb-2">
                    {{ $lang.AFTER_NOON }}
                  </p>
                  <v-checkbox
                    v-for="item in afternoon_time_slots"
                    :key="item.id"
                    v-model="form.time_slots_id_list"
                    :label="item.slot_from + ' - ' + item.slot_to"
                    :value="item.id"
                    class="shrink ma-0"
                    hide-details
                  ></v-checkbox>
                </div>
                <div class="d-inline-block px-2 v-align-top">
                  <p class="text-1 text-md-left text-center mb-2">{{ $lang.EVENING }}</p>
                  <v-checkbox
                    v-for="item in evening_time_slots"
                    :key="item.id"
                    v-model="form.time_slots_id_list"
                    :label="item.slot_from + ' - ' + item.slot_to"
                    :value="item.id"
                    class="shrink ma-0"
                    hide-details
                  ></v-checkbox>
                </div>
              </div>
            </v-col>
          </v-row>

          <div class="d-flex mt-8 mb-4">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              width="180"
              @click="Save()"
              :loading="btn_loader"
              :disabled="btn_loader"
            >
              {{ $lang.SAVE }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" outlined width="180" @click="$router.go(-1)">
              {{ $lang.CANCEL }}
            </v-btn>
            <v-spacer></v-spacer>
          </div>
        </v-col>
      </v-row>
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
    btn_loader: false,
    bob_menu: false,
    student_table_id: -1,
    today: new Date().toISOString().substr(0, 10),
    class_name: "min-height",
    tutor_preference_options: ["Male", "Female", "Any"],
    form: {
      name: "",
      email: "",
      father_name: "",
      mother_name: "",
      gender: "",
      date_of_birth: "",
      father_contact_number: "",
      whatsapp_number: "",
      parent_email: "",
      address: "",
      landmark: "",
      pin_code: "",
      latitude: "",
      longitude: "",
      // city: "",
      // state: "",
      class_name: null,
      class_id: null,
      education_board: "",
      school_name: "",
      tutor_preference: "",
      hobbies: "",
      special_concern: "",
      time_slots_id_list: [],
    },
    suitable_days: [],
    class_mode_preference: [],
    morning_time_slots: [],
    afternoon_time_slots: [],
    evening_time_slots: [],
    subject_list: [],
    subject_id_list: [],
    class_list: [],
  }),
  created() {
    if (
      this.$store.getters.getUsertype != this.$keys.ACCOUNT_STUDENT &&
      this.$route.query.student_table_id
    )
      this.student_table_id = this.decrypt(this.$route.query.student_table_id);
    this.getStudentDetail();

    /* not using the map for now */
    // get current location for new registration
    // if (!this.$route.query.student_table_id) {
    //   this.$getLocation({
    //     enableHighAccuracy: true,
    //   })
    //       .then(coordinates => {
    //         this.form.latitude = coordinates.lat
    //         this.form.longitude = coordinates.lng
    //         this.$refs.map_elm.center = {
    //           lat: parseFloat(coordinates.lat),
    //           lng: parseFloat(coordinates.lng)
    //         }
    //         this.$refs.map_elm.intMap(this.$refs.map_elm.center)
    //       });
    // }
  },
  methods: {
    /* fetching student profile */
    getStudentDetail() {
      const self = this;

      this.$store.dispatch("setPageLoader", false);
      let params = {};
      if (this.student_table_id && this.student_table_id != -1)
        params.student_table_id = this.student_table_id;
      const successHandler = (response) => {
        if (response.data.success) {
          if (response.data.student_basic_data) {
            self.form = response.data.student_basic_data;
            self.city = response.data.student_basic_data.city;
            self.state = response.data.student_basic_data.state;
            self.subject_id_list = response.data.student_basic_data.subject_id_list;
          }
          if (response.data.student_name) {
            self.form.name = response.data.student_name;
            self.form.email = response.data.email;
          }
          self.morning_time_slots = response.data.morning_time_slots;
          self.afternoon_time_slots = response.data.afternoon_time_slots;
          self.evening_time_slots = response.data.evening_time_slots;
          self.class_mode_preference = response.data.student_basic_data.class_mode;
          self.suitable_days = response.data.student_basic_data.suitable_days;

          // self.set_location_in_map(response.data.student_basic_data.latitude, response.data.student_basic_data.longitude)
        }
      };
      const finallyHandler = () => {
        this.getSubjectList();
        this.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.GET_STUDENT_DETAILS,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    /* save profile details*/
    Save() {
      const self = this;
      if (this.$refs.student_edit_form.validate() == false) return false;
      self.btn_loader = true;
      this.$store.dispatch("setPageLoader", true);
      var form = new URLSearchParams();
      form.append("name", self.form.name);
      form.append("email", self.form.email);
      form.append("father_name", self.form.father_name);
      form.append("father_contact_number", self.form.father_contact_number);
      form.append("mother_name", self.form.mother_name);
      form.append("parent_email", self.form.parent_email);
      form.append("whatsapp_number", self.form.whatsapp_number);
      form.append("gender", self.form.gender);
      form.append("date_of_birth", self.form.date_of_birth);
      form.append("address", self.form.address);
      form.append("city", self.city);
      form.append("state", self.state);
      form.append("pin_code", self.form.pin_code);
      // form.append("latitude", self.form.latitude);
      // form.append("longitude", self.form.longitude);
      form.append("class_id", self.form.class_id);
      form.append("subject_id_list", JSON.stringify(self.subject_id_list));
      form.append("special_concern", self.form.special_concern);
      form.append("tutor_preference", self.form.tutor_preference);
      form.append("education_board", self.form.education_board);
      form.append("school_name", self.form.school_name);
      form.append("time_slots_id_list", JSON.stringify(self.form.time_slots_id_list));

      form.append("landmark", self.form.landmark);
      form.append("hobbies", self.form.hobbies);
      form.append("class_mode_preference", JSON.stringify(self.class_mode_preference));
      form.append("suitable_days", JSON.stringify(self.suitable_days));

      if (this.student_table_id) form.append("student_table_id", self.student_table_id);

      const successHandler = (response) => {
        if (response.data.success) {
          this.$refs.student_edit_form.reset();
          self.$router.push({
            name: "student_profile",
            query: { student_table_id: self.encrypt(response.data.student_table_id) },
          });
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false;
        this.$store.dispatch("setPageLoader", false);
      };
      this.request_POST(
        self,
        this.$urls.EDIT_DETAIL,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },

    /* get class and subjects list*/
    getSubjectList() {
      const self = this;
      let params = {};
      if (this.form.class_id) params.class_id = this.form.class_id;
      const successHandler = (response) => {
        if (response.data.success) {
          self.subject_list = response.data.subject_list;
          self.class_list = response.data.class_list;
        }
      };
      const finallyHandler = () => {};

      self.request_GET(
        self,
        self.$urls.CLASS_LIST,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },

    /* catch loction form map components
  get_location(lat, lng) {
    this.form.latitude = lat
    this.form.longitude = lng
  },
  /* set the current location in the map*/
    // set_location_in_map(lat, lng) {
    //   if (lat && lng) {
    //     // set the map with saved location
    //     this.form.latitude = lat
    //     this.form.longitude = lng
    //     this.$refs.map_elm.center = {
    //       lat: parseFloat(lat),
    //       lng: parseFloat(lng)
    //     }
    //     this.$refs.map_elm.intMap(this.$refs.map_elm.center)
    //   } else {
    //     //set map withhh current location
    //     this.$getLocation({
    //       enableHighAccuracy: true,
    //     }).then(coordinates => {
    //       this.form.latitude = coordinates.lat
    //       this.form.longitude = coordinates.lng
    //       this.$refs.map_elm.center = {
    //         lat: parseFloat(coordinates.lat),
    //         lng: parseFloat(coordinates.lng)
    //       }
    //       this.$refs.map_elm.intMap(this.$refs.map_elm.center)
    //     });
    //   }
    // }
  },
};
</script>
