<style lang="scss" scoped>


</style>
<template>
  <div>
    <v-row :class="{'px-2': $vuetify.breakpoint. smAndDown, 'px-6': $vuetify.breakpoint. mdAndUp}"
           class="mx-0 py-2 my-1 text-left">
      <v-col class="py-0" cols="12" md="4" sm="6">
        <label class="label-text-1">Batch ID:</label>
        <p class="text-1">{{ batch_id }}</p>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <label class="label-text-1">{{ $lang.SUBJECTS }} :</label>
        <p class="text-1">{{ subject_name }}</p>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <label class="label-text-1">Date and Time :</label>
        <p class="text-1">{{ date }}, {{ time }}</p>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <label class="label-text-1">Total Duration :</label>
        <p class="text-1">{{ duration + extended_time }} Minutes</p>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <label class="label-text-1">Extended Time :</label>
        <p class="text-1" v-if="extended_time">{{ extended_time }} Minutes</p>
        <p v-else-if="$store.state.user.account_type==$keys.ACCOUNT_TEACHER">
          <v-btn class="px-0 mr-2" style="border-radius: 5px" small color="primary" v-for="(item,i) in top_up_option"
                 @click="extendSessionDialog(item)" :key="i">
            <v-icon> mdi-plus</v-icon>
            {{ item }}
          </v-btn>
        </p>
        <p class="text-1" v-else>-</p>

      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <label class="label-text-1">Topic Covered :</label>
        <p class="text-1">{{ description }}</p>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row :class="{'px-2': $vuetify.breakpoint. smAndDown, 'px-6': $vuetify.breakpoint. mdAndUp}"
           class="mx-0 py-2 my-1 text-left ">
      <v-col class="py-0" cols="12" md="12" sm="12">
        <p class="font-weight-bold"> Tutor Details</p>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.TUTOR_NAME }} :</label>
          <p class="text-1">{{ tutor_name }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.MOBILE_NUMBER }} :</label>
          <p class="text-1">{{ tutor_mobile }}</p>
        </div>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <!--    <v-row :class="{'px-2': $vuetify.breakpoint. smAndDown, 'px-6': $vuetify.breakpoint. mdAndUp}"-->
    <!--           class="mx-0 py-2 my-1 text-left ">-->
    <!--      <v-col class="py-0" cols="12" md="12" sm="12">-->
    <!--        <p class="font-weight-bold"> Student Details</p>-->
    <!--      </v-col>-->
    <!--      <v-col class="py-0" cols="12" md="12" sm="12">-->
    <!--        <v-simple-table style="width: 100%">-->
    <!--          <tr v-for="(student) in student_list" :key="student.id">-->
    <!--            <td :class="{'py-2': $vuetify.breakpoint. smAndDown, 'py-1': $vuetify.breakpoint. mdAndUp}">-->
    <!--              <p class="text-1">{{ student.name }}</p>-->
    <!--              <p class="text-1">{{ student.mobile }}</p>-->
    <!--            </td>-->
    <!--            <td v-if="!student.assigned_homework"-->
    <!--                :class="{'text-right': $vuetify.breakpoint. smAndDown, '': $vuetify.breakpoint. mdAndUp}">-->
    <!--              <v-btn small color="primary" @click="assignHomework(student)">Assign Homework</v-btn>-->
    <!--            </td>-->
    <!--            <td v-if="student.assigned_homework"-->
    <!--                :class="{'text-right': $vuetify.breakpoint. smAndDown, '': $vuetify.breakpoint. mdAndUp}">-->
    <!--              {{ student.description }}-->
    <!--            </td>-->
    <!--            <td v-if="student.assigned_homework"-->
    <!--                :class="{'text-right': $vuetify.breakpoint. smAndDown, '': $vuetify.breakpoint. mdAndUp}">-->
    <!--              {{ student.home_work_status }}-->
    <!--            </td>-->
    <!--          </tr>-->
    <!--        </v-simple-table>-->
    <!--      </v-col>-->
    <!--    </v-row>-->


    <v-row :class="{'px-2': $vuetify.breakpoint. smAndDown, 'px-6': $vuetify.breakpoint. mdAndUp}"
           class="mx-0 py-2 my-1 text-left ">
      <v-col class="py-0" cols="12" md="12" sm="12">
        <p class="font-weight-bold"> Student Details</p>
      </v-col>
      <v-col class="py-0 px-1 mb-3" cols="12" md="4" sm="6" v-for="(student,i) in student_list" :key="student.id">
        <v-card outlined class="pa-3 h-100" >
          <div class="field-wrapper">
            <label class="label-text-1">Student info ({{ i + 1 }}) :</label>
            <v-btn
                v-if="student.assigned_homework && student.home_work_status==$keys.HOMEWORK_PENDING && $store.state.user.account_type==$keys.ACCOUNT_TEACHER"
                small text color="primary" @click="assignHomework(student)" class="float-right">
              <img alt="" class="mr-1" src="@/assets/table-assets/edit.svg" width="20">
              {{ $lang.EDIT }}
            </v-btn>
            <p class="text-1">{{ student.name }}</p>
            <p class="text-1">{{ student.mobile }}</p>
          </div>
          <div class="field-wrapper">
            <label class="label-text-1">Homework info ({{ i + 1 }}) :</label>


            <div v-if="!student.assigned_homework " class="pa-3 text-center">
              <v-btn v-if=" $store.state.user.account_type==$keys.ACCOUNT_TEACHER" small color="primary"
                     @click="assignHomework(student)">Assign Homework
              </v-btn>
            </div>
            <div v-else class="py-2">
              <p class="text-1">Status: <span class="px-2 fs-12"
                                              :class="student.home_work_status.replace(' ','-').toLowerCase()">
                {{ student.home_work_status }} </span></p>
              <span class="fs-12"> {{ student.description }}</span>
              <div class="ma-2 text-center"
                   v-if="student.home_work_status==$keys.HOMEWORK_PENDING && $store.state.user.account_type==$keys.ACCOUNT_TEACHER">
                <v-btn small color="error" @click="homeworkStatusChange(student,$keys.HOMEWORK_NOT_COMPLETED)">
                  {{ $keys.HOMEWORK_NOT_COMPLETED }}
                </v-btn>
                <v-btn class="ml-2" small color="primary"
                       @click="homeworkStatusChange(student,$keys.HOMEWORK_COMPLETED)">
                  {{ $keys.HOMEWORK_COMPLETED }}
                </v-btn>
              </div>

            </div>
          </div>
        </v-card>
      </v-col>

    </v-row>


    <ConfirmationDialog :data="confirmation_dialog_data" @yes="extendSession"></ConfirmationDialog>
    <HomeworkDialog :data="hw_dialog_data" @update="getSessionDetails"></HomeworkDialog>
  </div>
</template>

<script>
export default {
  components: {
    ConfirmationDialog: () => import('../../components/shared/dialogs/ConfirmationDialog'),
    HomeworkDialog: () => import('../../components/sessions/HomeworkDialog'),
  },
  data() {
    return {
      session_table_id: null,
      batch_id: null,
      tutor_name: "",
      tutor_mobile: "",
      student_list: [],
      date: "",
      time: "",
      duration: "",
      description: "",
      extended_time: "",
      homework_list: "",
      subject_name: "",
      top_up_option: [15, 30],
      confirmation_dialog_data: {
        flag: false,
        title: "Session Top up",
        message: "",
        time: 0
      },
      hw_dialog_data: {
        flag: false,
        title: "Assign Homework",
        student_name: "",
        student_table_id: "",
        session_table_id: null,
      }
    }

  },
  created() {
    if (this.$route.params.session_table_id) {
      this.session_table_id = this.decrypt(this.$route.params.session_table_id)
      this.getSessionDetails()
    }
  },
  methods: {
    getSessionDetails() {
      const self = this;
      self.$store.dispatch("setPageLoader", true);
      let params = {
        session_table_id: this.session_table_id,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          this.batch_id = response.data.batch_id
          this.tutor_name = response.data.tutor_name
          this.tutor_name = response.data.tutor_name
          this.tutor_mobile = response.data.tutor_mobile
          this.student_list = response.data.student_list
          this.subject_name = response.data.subject
          this.date = response.data.display_date
          this.time = response.data.display_time
          this.duration = response.data.duration
          this.extended_time = response.data.time_extended
          this.description = response.data.description
        }
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
          self,
          self.$urls.SESSION_DETAILS,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
      );
    },
    extendSessionDialog(time) {
      this.confirmation_dialog_data.flag = true
      this.confirmation_dialog_data.time = time
      this.confirmation_dialog_data.message = "Are you sure want to extend session by " + time + " Minutes"
    },
    /* get class details */
    extendSession() {
      var form = new FormData();
      form.append("session_table_id", this.session_table_id);
      form.append("time", this.confirmation_dialog_data.time);

      const successHandler = (response) => {
        if (response.data.success) {
          this.confirmation_dialog_data.flag = false
        }
      };
      const finallyHandler = () => {
        this.btn_loader = false
      };
      this.request_POST(this, this.$urls.EXTEND_SESSION, form, successHandler, null, null, finallyHandler)
    },
    /* open homework Dialog */
    assignHomework(student_info) {
      this.hw_dialog_data.student_name = student_info.name
      this.hw_dialog_data.student_table_id = student_info.student_table_id
      this.hw_dialog_data.description = student_info.description
      this.hw_dialog_data.session_table_id = this.session_table_id
      this.hw_dialog_data.flag = true
    },
    /* change HW status*/
    homeworkStatusChange(student_info, home_work_status) {
      const self = this
      self.$store.dispatch("setPageLoader", true);
      var form = new URLSearchParams();
      form.append("homework_table_id", student_info.homework_table_id);
      form.append("home_work_status", home_work_status);

      const successHandler = (response) => {
        if (response.data.success) {
          student_info.home_work_status = home_work_status
          this.getSessionDetails()
        }
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };
      this.request_POST(self, this.$urls.CHANGE_HOMEWORK_STATUS, form, successHandler, null, null, finallyHandler)

    },

  }
}
</script>
