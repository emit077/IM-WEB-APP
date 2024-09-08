<style lang="scss" scoped>
.card-bg {
  background-color: yellow;
  border-radius: 20px;
  margin-top: 20px;
  padding: 15px;
}
</style>
<template>
  <div :class="{
    'profile_card-mobile': $vuetify.breakpoint.smAndDown,
    'profile_card mx-5': $vuetify.breakpoint.mdAndUp,
  }" class="card-bg">
    <div v-if="interview_data.result == $keys.RESULT_PENDING">
      <h3 class="text-center fc-primary mb-3">Interview Scheduled</h3>
      <v-row class="mx-0" justify="center">
        <v-col cols="12" md="5" sm="4">
          <p class="mb-2">
            Interviewer Name: <b>{{ interview_data.bda_name }}</b>
          </p>
          <p>
            Meeting Url:
            <b>{{ interview_data.meeting_url ? interview_data.meeting_url : "-" }}</b>
          </p>
        </v-col>
        <v-col cols="12" md="7" sm="4">
          Date and time:
          <b>{{ interview_data.interview_date }}, {{ interview_data.interview_time }}</b>
        </v-col>
      </v-row>
      <div v-if="
        [
          $keys.ACCOUNT_SUPER_ADMIN,
          $keys.ACCOUNT_BUSINESS_DEVELOPER,
          $keys.ACCOUNT_SENIOR_ACADEMIC_COUNSELOR,
          $keys.ACCOUNT_ADMIN,
        ].includes($store.state.user.account_type)
      " :class="{
        'text-center mt-5 mb-n2': $vuetify.breakpoint.smAndDown,
        'text-right': $vuetify.breakpoint.mdAndUp,
      }">
        <v-btn color="green" small class="mr-2" @click="ChangeInterviewStatus('Selected')">
          <span style="color: #ffff">Select</span>
        </v-btn>
        <v-btn color="error" small class="mr-2" @click="ChangeInterviewStatus('Rejected')">
          <span style="color: #ffff">Reject</span>
        </v-btn>
        <v-btn color="rgba(0, 121, 208, 1)" small @click="RescheduleInterview">
          <span style="color: #ffff">{{ $keys.RE_SCHEDULE }}</span>
        </v-btn>
      </div>
    </div>

    <div v-if="interview_data.result == $keys.RESULT_SELECTED" class="text-center">
      <h3 class="text-center fc-primary mb-3">Interview Result</h3>
      <p>
        We are pleased to inform you that your profile has been selected by the
        <span v-if="$project.NAME == $keys.IM">Indian Mentors.</span>
        <span v-else>Tutor factory.</span>
        please accept the offer to start your contract with us.
      </p>
      <v-btn color="success" small class="mt-3" v-if="[$keys.ACCOUNT_TEACHER].includes($store.state.user.account_type)"
        @click="AcceptAgreement">
        <span style="color: #ffff"><b>Accept</b></span>
      </v-btn>
    </div>
    <div v-if="interview_data.result == $keys.RESULT_REJECTED">
      <h3 class="text-center fc-primary mb-3">Interview Result</h3>
      <p class="error--text text-center fw-bold">Your profile has been rejected</p>
    </div>

    <TutorInterviewDialog :dialog="interview_dialog" @update="$emit('update')"></TutorInterviewDialog>
    <TutorAgreement :dialog="agreement_dialog" @update="$emit('update')"></TutorAgreement>
  </div>
</template>

<script>
export default {
  components: {
    TutorInterviewDialog: () => import("../../components/teacher/TutorInterviewDialog"),
    TutorAgreement: () => import("./TutorAgreement"),
  },
  props: ["interview_data", "tutor_table_id"],
  data() {
    return {
      interview_dialog: {
        flag: false,
        tutor_table_id: null,
        action: "Re-Schedule Interview",
      },
      agreement_dialog: {
        flag: false,
        tutor_table_id: null,
        action: "Tutor Agreement",
        start_date: "",
        end_date: "",
        city: "",
      },
    };
  },
  methods: {
    RescheduleInterview() {
      this.interview_dialog.flag = true;
      this.interview_dialog.tutor_table_id = this.tutor_table_id;
    },
    ChangeInterviewStatus(result) {
      const self = this;
      self.btn_loader = true;
      var form = new URLSearchParams();
      form.append("tutor_table_id", self.tutor_table_id);
      form.append("interview_result", result);

      const successHandler = (response) => {
        if (response.data.success) {
          this.$emit("update");
        }
      };
      const finallyHandler = () => { };
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
    AcceptAgreement() {
      this.agreement_dialog.flag = true;
      this.agreement_dialog.tutor_table_id = this.tutor_table_id;
      this.agreement_dialog.start_date = this.interview_data.start_date;
      this.agreement_dialog.end_date = this.interview_data.end_date;
      this.agreement_dialog.city = this.interview_data.city;
    },
  },
};
</script>
