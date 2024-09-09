<style lang="scss" scoped>
.student_edit_form_wrapper {
  label {
    margin-left: 8px;
  }
}
</style>

<template>
  <v-card class="pb-5 py-5 bg-transparent" flat color="">
    <v-form ref="student_edit_form" lazy-validation>
      <v-row class="ma-0">
        <v-col class="py-0" cols="12" md="4">
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
        <v-col class="py-0" cols="12" md="4">
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

        <v-col class="py-0" cols="12" md="4">
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
        </v-col>
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1">
              {{ $lang.SUBJECTS }} <sup class="error--text">*</sup></label
            >
            <v-select
              v-model="form.subject_id_list"
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
        </v-col>
        <v-col class="py-0" cols="12" md="4">
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
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper">
            <label class="label-text-1"> {{ $lang.HOBBIES }}</label>
            <v-text-field
              v-model="form.hobbies"
              :placeholder="$lang.HOBBIES"
              class="mt-1"
              dense
              maxlength="350"
              outlined
              single-line
            ></v-text-field>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="12">
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
    </v-form>
  </v-card>
</template>

<script>
import HelperMixin from "@/helper/mixins/helper-mixin";

export default {
  mixins: [HelperMixin],
  props: ["form", "student_table_id"],
  components: {},
  data: () => ({
    btn_loader: false,
    subject_list: [],
    subject_id_list: [],
    class_list: [],
    tutor_preference_options: ["Male", "Female", "Any"],
  }),
  created() {
    this.getSubjectList();
  },
  methods: {
    /* save profile details*/
    Save() {
      const self = this;
      if (this.$refs.student_edit_form.validate() == false) return false;
      self.btn_loader = true;
      this.$store.dispatch("setPageLoader", true);
      var form = new URLSearchParams();
      form.append("type", self.$keys.TYPE_ACADEMICS_FORM);
      form.append("class_id", self.form.class_id);
      form.append("subject_id_list", JSON.stringify(self.form.subject_id_list));
      form.append("special_concern", self.form.special_concern);
      form.append("tutor_preference", self.form.tutor_preference);
      form.append("education_board", self.form.education_board);
      form.append("school_name", self.form.school_name);
      form.append("hobbies", self.form.hobbies);
      form.append("class_mode_preference", JSON.stringify(self.class_mode_preference));
      if (this.student_table_id) form.append("student_table_id", self.student_table_id);

      const successHandler = (response) => {
        if (response.data.success) {
          self.$emit("next", 4);
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
  },
};
</script>
