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
    <v-dialog v-model="dialog.flag" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2 justify-center">
          {{ dialog.action }}
        </v-card-title>
        <v-form ref="interview_form" lazy-validation>
          <v-card-text class="">
            <h2
              :class="
                dialog.result == $keys.RESULT_SELECTED ? 'success--text' : 'error--text'
              "
              class="text-center mb-5"
            >
              Tutor has been {{ dialog.result }}
            </h2>
            <table>
              <tbody>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.PERSONAL_INTERVIEW }}
                  </td>
                  <td class="text-right">
                    <star-rating
                      v-model="personal_interview"
                      :star-size="30"
                      rounded-corners
                      :show-rating="false"
                      @rating-selected="validate"
                    ></star-rating>
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.ACADEMIC_KNOWLEDGE }}
                  </td>
                  <td>
                    <star-rating
                      v-model="academic_knowledge"
                      :star-size="30"
                      rounded-corners
                      :show-rating="false"
                    ></star-rating>
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.TEACHING_SKILLS }}
                  </td>
                  <td>
                    <star-rating
                      v-model="teaching_skills"
                      :star-size="30"
                      rounded-corners
                      :show-rating="false"
                      @rating-selected="validate"
                    ></star-rating>
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.DEMO_SESSION }}
                  </td>
                  <td>
                    <star-rating
                      v-model="demo_session"
                      :star-size="30"
                      rounded-corners
                      :show-rating="false"
                      @rating-selected="validate"
                    ></star-rating>
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1">
                    {{ $lang.OFFICE_REMARKS }}
                  </td>
                  <td>
                    <star-rating
                      v-model="office_remarks"
                      :star-size="30"
                      rounded-corners
                      :show-rating="false"
                      @rating-selected="validate"
                    ></star-rating>
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
      personal_interview: 0,
      academic_knowledge: 0,
      teaching_skills: 0,
      demo_session: 0,
      office_remarks: 0,
      is_validated: false,
      btn_loader: false,
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
      if (this.office_remarks < 1) this.is_validated = false;
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
