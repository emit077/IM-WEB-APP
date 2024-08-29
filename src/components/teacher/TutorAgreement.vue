<style lang="scss" scoped>
li {
  margin-bottom: 7px;
}
</style>

<template>
  <v-dialog v-model="dialog.flag" width="1100">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        {{ dialog.action }}
      </v-card-title>
      <v-card-text class="mt-5">
        <ol type="1">
          <li>
            Term and Prohibition Period: <br />
            The work tenure is from <b>{{ dialog.start_date }}</b> to<b>
              {{ dialog.end_date }}</b
            >, with an 11-month prohibition period from the formal declaration of
            resignation.
          </li>
          <li>
            Attendance and Performance Standards:
            <ol type="a">
              <li>
                If the mentor fails to mark attendance on the application, that class will
                be marked as absent.
              </li>
              <li>
                The mentor is expected to maintain high standards and adhere to the
                processes and methodologies set by Indian Mentors.
              </li>
              <li>
                The mentor should provide at least 15 day’s advance notice for any planned
                leave.
              </li>
              <li>
                The mentor is required to mark daily attendance on the application. Any
                falsification of attendance records will be considered a serious offense,
                and Indian Mentors may take legal action.
              </li>
              <li>
                Salary will only be disbursed to mentors upon proof of daily attendance.
              </li>
            </ol>
          </li>
          <li>
            Academic Progress and Demo Classes:
            <ol type="a">
              <li>
                The mentor will ensure positive progress in the student's academic
                performance.
              </li>
              <li>
                The mentor is required to conduct a few demo classes at the beginning of
                mentoring assignments. If the client is dissatisfied with the tutoring and
                requests a replacement, the mentor will not receive payment for the demo
                classes.
              </li>
              <li>
                Once the mentor begins a mentoring assignment with Indian Mentors, he/she
                should commit to at least 6 months of mentoring.
              </li>
            </ol>
          </li>

          <li>
            Examination and Payment:
            <ol type="a">
              <li>
                The mentor must not leave the mentoring assignment during the examination.
              </li>
              <li>
                The mentor must conduct weekly tests to evaluate the performance of the
                student.
              </li>
              <li>
                The mentor is not entitled to receive payment directly from parents or
                students.
              </li>
              <li>
                Payout will be disbursed to the mentor within 10 days after the completion
                of the monthly session, which is discussed during the class allotment for
                the particular mentoring assignment or student.
              </li>
            </ol>
          </li>

          <li>
            Cooperation and Misconduct:
            <ol type="a">
              <li>
                The mentor agrees to cooperate with reasonable instructions from the
                parents but shall not engage in any conduct detrimental to their
                interests.
              </li>
              <li>
                In the event of complaints about the mentor, the mentor is required to pay
                a fine.
              </li>
              <li>
                If any parent or student leaves before the end of the contract, the
                security deposit and the salary for the remaining class sessions will be
                forfeited.
              </li>
            </ol>
          </li>

          <li>
            Termination and Confidentiality:
            <ol type="a">
              <li>
                If the student leaves before or after completing the package, the mentor
                must sign the Class Discontinuation Certificate in order to receive the
                security deposit for the allotted class.
              </li>
              <li>
                The mentor must not leave in the middle of the academic session until the
                exams are over, such as in March.
              </li>
              <li>
                If the parents/students wish to employ the mentor directly and the mentor
                agrees, the mentor is obligated to pay a penalty of INR 1,50,000 to Indian
                Mentors.
              </li>
              <li>
                All terms and conditions, including mentoring salary or payout details,
                are strictly confidential and should not be disclosed to parents or anyone
                else without prior written permission from Indian Mentors. Unauthorized
                disclosure may result in immediate termination of the mentoring
                assignment.
              </li>
            </ol>
          </li>
          <li>
            Additional Clauses:
            <ol type="a">
              <li>
                The mentor is required to provide advance notice in the event of an
                inability to attend class on any given day.
              </li>
              <li>
                Once the agreement has been signed, salary negotiation is not allowed
                after starting the mentoring assignment for a student in the middle of the
                academic session.
              </li>
              <li>
                Mentor must not disclose any company-related confidential matters to any
                third parties, including the student or their family. Failure to adhere to
                this may result in fines and termination of the mentoring assignment.
              </li>
            </ol>
          </li>
        </ol>

        <div class="px-5 mt-3">
          <v-form ref="agreement_form" lazy-validation>
            <div>
              <p class="d-inline-flex">
                <v-checkbox
                  v-model="agreement_accepted"
                  :rules="[$rules.REQUIRED_FIELD($lang.CONFIRM_PASSWORD)]"
                  class="shrink ma-0"
                  hide-details
                  style="display: inline-flex"
                ></v-checkbox>
                <span class="pt-2">
                  I acknowledge that I have read and understood the above agreement in its
                  entirety, and I agree to abide by it.
                </span>
              </p>
            </div>
            <div class="text-center mt-3">
              <v-btn color="primary" width="150" @click="yesHandler">
                {{ $lang.CONTINUE }}
              </v-btn>
            </div>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    agreement_accepted: false,
    project_name: "Indian Mentors",
  }),
  created() {},
  methods: {
    /* perform action */
    yesHandler() {
      if (this.$refs.agreement_form.validate() == false) return false;
      const self = this;
      self.btn_loader = true;
      var form = new URLSearchParams();
      form.append("tutor_table_id", self.dialog.tutor_table_id);
      const successHandler = (response) => {
        if (response.data.success) {
          this.dialog.flag = false;
          this.$emit("update");
        }
      };
      const finallyHandler = () => {};
      this.request_POST(
        self,
        this.$urls.START_AGREEMENT,
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
