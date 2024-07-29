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
      <v-card-text>
        <p class="mt-3">
          This service contract is made and entered into by and between {{project_name}}, a home tuition service
          provider in <b>{{ dialog.city }}</b> here in after called <b>{{project_name}}</b>
          here in after called the TUTOR.
          In Engagement the following definitions apply:
        </p>
        <ol type="1">
          <li>
            Your tenure for working in {{project_name}} will be from
            <b>{{ dialog.start_date }}</b> to<b>{{ dialog.end_date }}</b>
            and prohibition period will be 11 months from date of formal declaration of resigning the job.
          </li>
          <li>
            First class salary will be deducted by {{project_name}} as a security deposit fer the security of
            each and every student allotted to you and will be refunded after smooth completion of your
            tenure.
          </li>
          <li>
            If tutor fails to mark attendance on {{project_name}} Application, that class will be marked absent.
          </li>
          <li>
            Tutor shall maintain high standards set by {{project_name}} and follow the processes and the
            methodologies set by {{project_name}}.
          </li>
          <li>
            The tutor agrees to attend all the orientation and training programs organised by {{project_name}}.
          </li>
          <li>
            You have to arrange yourself for transportation.
          </li>
          <li>
            Tutor should inform {{project_name}} well in advance (15 days) on his leave plans.
          </li>
          <li>
            Tutor should mark daily attendance on {{project_name}} Application everyday. Any forgery
            against the attendance will be considered as crime and the tutor will be asked to follow the
            legal action with {{project_name}}.
          </li>
          <li>
            Salary will be given to the Tutor only at the proof of the daily attendance.
          </li>
          <li>
            Tutor should ensure that there is positive progress in the student's academic performance.
          </li>
          <li>Tutor is asked to give few demo classes at the starting of assignments and if the client is
            unhappy with the tutoring and asks for replacement, salary will not be given for the demo
            classes.
          </li>
          <li>Once TUTOR starts assignment with {{project_name}}, he/she should continue at least for 6
            months.
          </li>
          <li>At any cost TUTOR cannot leave the tutoring assignment at the time of examination.</li>
          <li>The TUTOR is not entitled to receive payment from {{project_name}} CLIENTS.</li>
          <li>TUTOR agrees to co-operate with the client's reasonable instructions but shall not engage in
            any conduct detrimental to the interests of the client.
          </li>
          <li>If any Student/Client leaves you in between security deposit and salary of the allotted class
            will be seized.
          </li>
          <li>If the student leaves the {{project_name}} after completion of the package, you have to sign the
            class discontinuation certificate to receive the security deposit of the allotted class.
          </li>
          <li>During the course of tutoring assignment, if the client wishes to employ the tutor directly and
            the tutor is fine with it, in such case TUTOR agrees to pay a sum of INR 50,000 (In words:
            Rupees Fifty Thousand only) each to {{project_name}}.
          </li>
          <li>Tutor shall abide by the additional clauses mentioned below:
            <ol type="a">
              <li>If the tutor cannot attend the class any day, TUTOR agrees to inform {{project_name}} in
                advance.
              </li>
              <li>There will be no negotiation on salary once the tutor sign the agreement with Tutors
                Factory.
              </li>
              <li>If {{project_name}} receives complain about TUTOR, then he/she agrees to pay the fine.</li>
              <li>TUTOR shall never divulge the company related confidential matter to the third party
                including student or student's family. If {{project_name}} finds TUTOR has divulged any
                company secrets that may affect the company's interest. {{project_name}} will charge the fine and
                terminate the
                TUTOR from the assignment.
              </li>
              <li>TUTOR agrees to regular update the {{project_name}} on progress that student is making.If there is
                negative
                trend in the student's progress, TUTOR shall immediately bring this to {{project_name}} notice.
              </li>
            </ol>
          </li>
        </ol>
        <div class="px-5 mt-3">
          <v-form ref="agreement_form" lazy-validation>
            <p class="font-weight-bold">Acknowledge *</p>
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
              I acknowledge that I have read and understood the above agreement entirety and agree to abide by them
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
      required: true
    }
  },
  data: () => ({
    agreement_accepted: false,
    project_name:""
  }),
  created(){
    project_name= this.$project.NAME == this.$keys.IM ? "Indian Mentors": "Tutors Factory"
  },
  methods: {
    /* perform action */
    yesHandler() {
      if (this.$refs.agreement_form.validate() == false)
        return false
      const self = this;
      self.btn_loader = true
      var form = new URLSearchParams();
      form.append("tutor_table_id", self.dialog.tutor_table_id);
      const successHandler = (response) => {
        if (response.data.success) {
          this.dialog.flag = false
          this.$emit('update')
        }
      };
      const finallyHandler = () => {
      };
      this.request_POST(self, this.$urls.START_AGREEMENT, form, successHandler, null, null, finallyHandler)
    },
  }

}
</script>