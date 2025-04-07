<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

tr {
  border-bottom: 1px solid rgb(var(--primary_rgb), 0.1);
}
tr td {
  vertical-align: middle;
  padding: 7px 7px;
}
</style>
<template>
  <div class="text-center">
    <v-dialog v-model="dialog.flag" width="600">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2 justify-center">
          {{ dialog.action }}
        </v-card-title>
        <v-form ref="interview_form" lazy-validation>
          <v-card-text class="">
            <table>
              <tbody>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.READING }}
                  </td>
                  <td class="text-right">
                    <star-rating
                      v-model="reading"
                      :star-size="30"
                      rounded-corners
                      :show-rating="false"
                      @rating-selected="validate"
                    ></star-rating>
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.WRITING }}
                  </td>
                  <td>
                    <star-rating
                      v-model="writing"
                      :star-size="30"
                      rounded-corners
                      :show-rating="false"
                    ></star-rating>
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.LISTENING }}
                  </td>
                  <td>
                    <star-rating
                      v-model="listening"
                      :star-size="30"
                      rounded-corners
                      :show-rating="false"
                      @rating-selected="validate"
                    ></star-rating>
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.COMMUNICATION }}
                  </td>
                  <td>
                    <star-rating
                      v-model="communication"
                      :star-size="30"
                      rounded-corners
                      :show-rating="false"
                      @rating-selected="validate"
                    ></star-rating>
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.PRESENCE_OF_MIND }}
                  </td>
                  <td>
                    <star-rating
                      v-model="presence_of_mind"
                      :star-size="30"
                      rounded-corners
                      :show-rating="false"
                      @rating-selected="validate"
                    ></star-rating>
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.SUBJECTIVE_KNOWLEDGE }}
                  </td>
                  <td>
                    <star-rating
                      v-model="subjective_knowledge"
                      :star-size="30"
                      rounded-corners
                      :show-rating="false"
                      @rating-selected="validate"
                    ></star-rating>
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.GOOD_HABITS }}
                  </td>
                  <td>
                    <v-textarea
                      v-model="good_habits"
                      :placeholder="$lang.GOOD_HABITS"
                      :rules="[$rules.REQUIRED_FIELD($lang.GOOD_HABITS)]"
                      class="mt-1"
                      dense
                      outlined
                      single-line
                      rows="2"
                      style="height: 100%"
                      hide-details
                      @keypress="validate"
                    ></v-textarea>
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.BAD_HABITS }}
                  </td>
                  <td>
                    <v-textarea
                      v-model="bad_habits"
                      :placeholder="$lang.BAD_HABITS"
                      :rules="[$rules.REQUIRED_FIELD($lang.BAD_HABITS)]"
                      class="mt-1"
                      dense
                      outlined
                      single-line
                      rows="2"
                      style="height: 100%"
                      hide-details
                      @keypress="validate"
                    ></v-textarea>
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.OFFICE_REMARKS }}
                  </td>
                  <td>
                    <v-textarea
                      v-model="office_remarks"
                      :placeholder="$lang.OFFICE_REMARKS"
                      :rules="[$rules.REQUIRED_FIELD($lang.OFFICE_REMARKS)]"
                      class="mt-1"
                      dense
                      outlined
                      single-line
                      rows="2"
                      style="height: 100%"
                      hide-details
                      @keypress="validate"
                    ></v-textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-card-text>
          <!-- <v-divider></v-divider> -->
          <v-card-actions class="just ify-end py-4">
            <v-spacer></v-spacer>
            <v-btn color="primary" outlined width="100" @click="dialog.flag = false"
              >{{ $lang.CANCEL }}
            </v-btn>
            <v-btn
              color="primary"
              width="100"
              :loading="btn_loader"
              :disabled="!is_validated"
              @click="changeInterviewStatus()"
              >{{ $lang.CONTINUE }}
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
export default {
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  components: {
    StarRating,
  },
  data() {
    return {
      is_validated: false,
      btn_loader: false,

      reading: 0,
      writing: 0,
      listening: 0,
      communication: 0,
      presence_of_mind: 0,
      subjective_knowledge: 0,
      good_habits: "",
      bad_habits: "",
      office_remarks: "",
    };
  },
  created() {},
  methods: {
    validate() {
      this.is_validated = true;
      if (this.personal_interview < 1) this.is_validated = false;
      if (this.academic_knowledge < 1) this.is_validated = false;
      if (this.teaching_skills < 1) this.is_validated = false;
      if (this.demo_session < 1) this.is_validated = false;
      if (this.office_remarks.length < 1) this.is_validated = false;
      return this.is_validated;
    },
    changeInterviewStatus(result) {
      if (this.validate() == false) return false;
      const self = this;
      self.btn_loader = true;
      var form = new URLSearchParams();
      form.append("tutor_table_id", self.dialog.tutor_table_id);
      form.append("interview_result", this.dialog.result);

      form.append("personal_interview", this.personal_interview);
      form.append("academic_knowledge", this.academic_knowledge);
      form.append("teaching_skills", this.teaching_skills);
      form.append("demo_session", this.demo_session);
      form.append("office_remarks", this.office_remarks);

      const successHandler = (response) => {
        if (response.data.success) {
          this.dialog.flag = false;
          this.$emit("update");
        }
      };
      const finallyHandler = () => {};
      this.request_POST(
        self,
        this.$urls.INTERVIEW_RESULT,
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
