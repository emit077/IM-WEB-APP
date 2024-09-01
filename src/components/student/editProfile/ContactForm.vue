<style lang="scss" scoped>
.student_edit_form_wrapper {
  label {
    margin-left: 8px;
  }
}
</style>
<template>
  <v-card class="pb-5 py-5 bg-transparent" flat color="" v-if="form">
    <v-form ref="student_edit_form" lazy-validation>
      <v-row class="ma-0 px-0">
        <v-col class="py-0" cols="12" md="4">
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
              {{ $lang.DATE_OF_BIRTH }}
              <sup class="error--text">*</sup></label
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
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.MOBILE_NUMBER }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.mobile"
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
        <!-- fathers contact -->
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
              Father's {{ $lang.MOBILE_NUMBER }} <sup class="error--text">*</sup></label
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

        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.MOTHER_NAME }} <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.mother_name"
              :placeholder="$lang.MOTHER_NAME"
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
              Mother's {{ $lang.MOBILE_NUMBER }} <sup class="error--text">*</sup></label
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
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.CONTACT_PERSON }} <sup class="error--text">*</sup></label
            >
            <v-select
              v-model="form.contact_person"
              :items="contact_person_options"
              :placeholder="$lang.CONTACT_PERSON"
              :rules="[$rules.REQUIRED_FIELD($lang.CONTACT_PERSON)]"
              class="mt-1"
              dense
              maxlength="80"
              outlined
              single-line
            ></v-select>
          </div>
        </v-col>

        <v-col class="py-0" cols="12" md="4" v-if="form.contact_person == 'Other'">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.CONTACT_PERSON }} Name <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.contact_person_name"
              :placeholder="$lang.MOTHER_NAME"
              class="mt-1"
              dense
              maxlength="80"
              outlined
              single-line
            ></v-text-field>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="4" v-if="form.contact_person == 'Other'">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.CONTACT_PERSON }} {{ $lang.MOBILE_NUMBER }}
              <sup class="error--text">*</sup></label
            >
            <v-text-field
              v-model="form.contact_person_mobile"
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
      </v-row>
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
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: ["form", "student_table_id"],
  components: {},
  data: () => ({
    btn_loader: false,
    bob_menu: false,
    today: new Date().toISOString().substr(0, 10),
    contact_person_options: ["Father", "Mother", "Other"],
  }),
  created() {},
  methods: {
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
      form.append("contact_person", self.form.contact_person);
      if (self.form.contact_person == "Other") {
        form.append("contact_person_name", self.form.contact_person_name);
        form.append("contact_person_mobile", self.form.contact_person_mobile);
      }
      form.append("type", self.$keys.TYPE_CONTACT_FORM);
      if (self.student_table_id) form.append("student_table_id", self.student_table_id);

      const successHandler = (response) => {
        if (response.data.success) {
          // this.$refs.student_edit_form.reset();
          self.$emit("next", 2);
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
  },
};
</script>
