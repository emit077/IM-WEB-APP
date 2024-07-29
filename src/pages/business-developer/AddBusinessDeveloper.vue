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
      <v-row :class="{ 'px-0': $vuetify.breakpoint.smAndDown, 'px-0': $vuetify.breakpoint.mdAndUp }" class="ma-0">
        <v-col :class="{ 'px-0': $vuetify.breakpoint.smAndDown, 'px-4': $vuetify.breakpoint.mdAndUp }" cols="12" md="8">
          <p class="pt-2 font-weight-bold">
            {{ $lang.STUDENT_BASIC_DETAILS }}
          </p>
          <v-row :class="{ 'px-0': $vuetify.breakpoint.smAndDown, 'px-0': $vuetify.breakpoint.mdAndUp }" class="ma-0">
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1">{{ $lang.NAME }} <sup class="error--text">*</sup></label>
                <v-text-field v-model="form.name" :placeholder="$lang.NAME" :rules="[$rules.REQUIRED_FIELD($lang.NAME)]"
                  class="mt-1" dense maxlength="80" outlined single-line></v-text-field>
              </div>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1">{{ $lang.MOBILE_NUMBER }} <sup class="error--text">*</sup> </label>
                <v-text-field v-model="form.mobile" :placeholder="$lang.MOBILE_NUMBER" :rules="$rules.MOBILE"
                  class="mt-1" dense maxlength="10" outlined single-line>
                  <template slot="prepend-inner">
                    <span class="mt-1">+91</span>
                  </template>
                </v-text-field>
              </div>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1">{{ $lang.EMAIL }} <sup class="error--text">*</sup></label>
                <v-text-field v-model="form.email" :placeholder="$lang.EMAIL" :rules="$rules.EMAIL" class="mt-1" dense
                  maxlength="80" outlined single-line></v-text-field>
              </div>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1">{{ $lang.SECONDARY_MOBILE }} </label>
                <v-text-field v-model="form.secondary_mobile" :placeholder="$lang.SECONDARY_MOBILE"
                  :rules="$rules.OPTIONAL_MOBILE" class="mt-1" dense maxlength="10" outlined single-line>
                  <template slot="prepend-inner">
                    <span class="mt-1">+91</span>
                  </template>
                </v-text-field>
              </div>
            </v-col>

            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1">{{ $lang.FATHER_NAME }} <sup class="error--text">*</sup></label>
                <v-text-field v-model="form.father_name" :placeholder="$lang.FATHER_NAME"
                  :rules="[$rules.REQUIRED_FIELD($lang.FATHER_NAME)]" class="mt-1" dense maxlength="80" outlined
                  single-line></v-text-field>
              </div>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1"> {{ $lang.MOTHER_NAME }} </label>
                <v-text-field v-model="form.mother_name" :placeholder="$lang.MOTHER_NAME" class="mt-1" dense
                  maxlength="80" outlined single-line></v-text-field>
              </div>
            </v-col>


            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1"> {{ $lang.GENDER }} <sup class="error--text">*</sup></label>
                <v-select v-model="form.gender" :items="$keys.GENDER_OPTIONS" :placeholder="$lang.GENDER"
                  :rules="[$rules.REQUIRED_FIELD($lang.GENDER)]" class="mt-1" dense maxlength="80" outlined
                  single-line></v-select>
              </div>
            </v-col>

            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1"> {{ $lang.DATE_OF_BIRTH }} <sup class="error--text">*</sup></label>
                <v-menu v-model="bob_menu" :close-on-content-click="false" :nudge-right="40" min-width="290px" offset-y
                  transition="scale-transition">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="form.date_of_birth" v-on="on"
                      :rules="[$rules.REQUIRED_FIELD($lang.DATE_OF_BIRTH)]" dense label="Date Of Birth" outlined
                      prepend-inner-icon="" readonly required single-line @click:prepend-inner="bob_menu = !bob_menu">
                      <template slot="prepend-inner">
                        <v-icon class="mt-0">mdi-calendar-month-outline</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="form.date_of_birth" :max="today" @input="bob_menu = false"></v-date-picker>
                </v-menu>
              </div>
            </v-col>

            <v-col class="py-0" cols="12" md="6"
              v-if="[$keys.ACCOUNT_ADMIN, $keys.ACCOUNT_SUPER_ADMIN].includes($store.getters.getUsertype)">
              <div class="form-filed-wrapper">
                <label class="label-text-1"> {{ $lang.TYPE }} <sup class="error--text">*</sup></label>
                <v-select v-model="form.account_type"
                  :items="[$keys.ACCOUNT_BUSINESS_DEVELOPER, $keys.ACCOUNT_SENIOR_ACADEMIC_COUNSELOR, $keys.ACCOUNT_JUNIOR_ACADEMIC_COUNSELOR]"
                  :placeholder="$lang.TYPE" :rules="[$rules.REQUIRED_FIELD($lang.TYPE)]" class="mt-1" dense
                  maxlength="80" outlined single-line></v-select>
              </div>
            </v-col>

          </v-row>
          <v-divider></v-divider>
          <p class="pt-2 font-weight-bold ">
            {{ $lang.STUDENT_ADDRESS_DETAILS }}
          </p>

          <v-row :class="{ 'px-0': $vuetify.breakpoint.smAndDown, 'px-0': $vuetify.breakpoint.mdAndUp }" class="ma-0">
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1"> {{ $lang.ADDRESS }} <sup class="error--text">*</sup></label>
                <v-textarea v-model="form.address" :placeholder="$lang.ADDRESS"
                  :rules="[$rules.REQUIRED_FIELD($lang.ADDRESS)]" class="mt-1" dense maxlength="80" outlined
                  single-line></v-textarea>
              </div>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <div class="form-filed-wrapper">
                <label class="label-text-1"> {{ $lang.CITY }} <sup class="error--text">*</sup></label>
                <v-text-field v-model="form.city" :placeholder="$lang.CITY" :rules="[$rules.REQUIRED_FIELD($lang.CITY)]"
                  class="mt-1" dense maxlength="80" outlined single-line></v-text-field>
              </div>
              <div class="form-filed-wrapper">
                <label class="label-text-1"> {{ $lang.PIN_CODE }} <sup class="error--text">*</sup></label>
                <v-text-field v-model="form.pin_code" :placeholder="$lang.PIN_CODE"
                  :rules="[$rules.PIN_CODE($lang.PIN_CODE)]" class="mt-1" dense maxlength="6" outlined
                  single-line></v-text-field>
              </div>
            </v-col>

          </v-row>
          <div class="d-flex  mt-8 mb-4">
            <v-spacer></v-spacer>
            <v-btn color="primary" width="280" @click="Save()">
              {{ $lang.SAVE }}
            </v-btn>
            <v-spacer></v-spacer>
          </div>

        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>

export default {
  components: {},
  data: () => ({
    btn_loader: false,
    bob_menu: false,
    bda_table_id: null,
    today: new Date().toISOString().substr(0, 10),
    class_name: "min-height",
    form: {
      name: "",
      mobile: "",
      email: "",
      father_name: "",
      mother_name: "",
      gender: "",
      date_of_birth: "",
      secondary_mobile: "",
      address: "",
      pin_code: "",
      city: "",
      state: "",
      account_type: ""
    },
  }),
  created() {
    if (this.$route.params.bda_table_id) {
      this.bda_table_id = this.decrypt(this.$route.params.bda_table_id)
      this.getBDAtDetail()
    }
  },
  methods: {
    /* fetching student profile */
    getBDAtDetail() {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let params = {};
      if (this.bda_table_id && this.bda_table_id != -1)
        params.bda_table_id = this.bda_table_id
      const successHandler = (response) => {
        if (response.data.success) {
          self.form = response.data
        }
      };
      const finallyHandler = () => {
        this.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.BDA_DETAILS,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    /* save details*/
    Save() {
      const self = this;
      if (this.$refs.student_edit_form.validate() == false)
        return false
      self.btn_loader = true
      var form = new URLSearchParams();
      form.append("name", self.form.name);
      form.append("mobile", self.form.mobile);
      form.append("email", self.form.email);
      form.append("father_name", self.form.father_name);
      form.append("secondary_mobile", self.form.secondary_mobile);
      form.append("mother_name", self.form.mother_name);
      form.append("gender", self.form.gender);
      form.append("date_of_birth", self.form.date_of_birth);
      form.append("address", self.form.address);
      form.append("city", self.form.city);
      form.append("state", self.form.state);
      form.append("pin_code", self.form.pin_code);
      form.append("account_type", self.form.account_type);
      let actions = self.$keys.ACTION_ADD
      if (this.bda_table_id) {
        actions = self.$keys.ACTION_EDIT
        form.append("bda_table_id", self.bda_table_id);
      }
      form.append("action", actions);

      const successHandler = (response) => {
        if (response.data.success) {
          this.$refs.student_edit_form.reset()
          this.$router.push({ name: "bda_list" })
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.BDA_ADD, form, successHandler, null, null, finallyHandler)
    },

  }
};
</script>
