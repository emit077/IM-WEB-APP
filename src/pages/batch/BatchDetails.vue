<style>
.student-card {
  border: 1px solid lightgrey;
  padding: 10px;
  border-radius: 5px;
}
</style>
<template>
  <div>
    <v-row :class="{'px-2': $vuetify.breakpoint. smAndDown, 'px-6': $vuetify.breakpoint. mdAndUp}"
           class="mx-0 text-left">
      <v-col class="py-1" cols="12" md="3" sm="6">
        <label class="label-text-1">{{ $lang.BATCH_ID }}:</label>
        <p class="text-1">{{ batch_id }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="3" sm="6">
        <label class="label-text-1">{{ $lang.PLAN_NAME }}:</label>
        <p class="text-1">{{ plan_name }}</p>
      </v-col>
      <v-col class="py-1" cols="6" md="3" sm="6">
        <label class="label-text-1">{{ $lang.SESSIONS }}:</label>
        <p class="text-1">{{ session_count }}</p>
      </v-col>
      <v-col class="py-1" cols="6" md="3" sm="6">
        <label class="label-text-1">{{ $lang.HOURS }}:</label>
        <p class="text-1">{{ duration }}</p>
      </v-col>
      <v-col class="py-1" cols="6" md="3" sm="6">
        <label class="label-text-1">{{ $lang.REMAINING_TEACHING_HOURS }}:</label>
        <p class="text-1">{{ remaining_teaching_hours }}</p>
      </v-col>
      <v-col class="py-1" cols="6" md="3" sm="6">
        <label class="label-text-1">{{ $lang.EXPIRY_DATE }}:</label>
        <p class="text-1">{{ expiry_date }}</p>
      </v-col>
    </v-row>

    <v-row :class="{'px-2': $vuetify.breakpoint. smAndDown, 'px-6': $vuetify.breakpoint. mdAndUp}"
           class="mx-0 text-left">
      <v-col class="py-1" cols="12" md="12" sm="6">
        <h4>Student Details</h4>
      </v-col>
      <!--      <v-col class="py-1" cols="12" md="3" sm="6">-->
      <!--        <div class="student-card">-->
      <!--          <p class="text-1">{{ student_name }}</p>-->
      <!--          <p class="text-1">{{ student_mobile }}</p>-->
      <!--        </div>-->
      <!--      </v-col>-->
      <v-col class="py-1" cols="12" md="3" sm="6" v-for="(item,i) in  student_list" :key="i">
        <div class="student-card">
          <p class="text-1">{{ item.name }}</p>
          <p class="text-1">{{ item.mobile }}</p>
        </div>
      </v-col>
    </v-row>
    <v-row :class="{'px-2': $vuetify.breakpoint. smAndDown, 'px-6': $vuetify.breakpoint. mdAndUp}"
           class="mx-0 text-left">
      <v-col class="py-1" cols="12" md="12" sm="6">
        <h4>Tutor Details</h4>
      </v-col>
      <v-col class="py-1" cols="12" md="3" sm="6" v-for="(item,i) in  tutor_list" :key="i">
        <div class="student-card">
          <p class="text-1">{{ item.name }}</p>
          <p class="text-1"  v-if="$keys.ACCOUNT_STUDENT != getUser.account_type">{{ item.mobile }}</p>
        </div>
      </v-col>
    </v-row>

    <div class="mt-6" :class="{'px-3': $vuetify.breakpoint. smAndDown, 'px-8': $vuetify.breakpoint. mdAndUp}">
        <UnitTestList ref="unit_test_list"></UnitTestList>
    </div>

  </div>
</template>

<script>

export default {
  components: {
    UnitTestList: () => import("../../pages/unit-test/UnitTestList"),
  },
  data() {
    return {
      batch_table_id: null,
      batch_id: "",
      session_count: "",
      duration: "",
      student_name: "",
      student_mobile: "",
      student_list: [],
      tutor_list: [],
      bda_name: "",
      bda_mobile: "",
      plan_name: "",
      remaining_teaching_hours: "",
      expiry_date: "",
    }
  },
  created() {
    if (this.$route.params.batch_table_id) {
      this.batch_table_id = this.decrypt(this.$route.params.batch_table_id)
      this.getBatchDetails()
    }
  },
  methods: {
    getBatchDetails() {
      const self = this;
      self.$store.dispatch("setPageLoader", true);
      let params = {
        batch_table_id: this.batch_table_id,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.batch_id = response.data.batch_id;
          self.tutor_list = response.data.tutor_data
          self.student_list = response.data.student_list
          self.student_name = response.data.student_name.name
          self.student_mobile = response.data.student_name.mobile
          self.plan_name = response.data.plan_name
          self.bda_name = response.data.bda_data.name
          self.bda_mobile = response.data.bda_data.mobile
          self.session_count = response.data.session_count
          self.duration = response.data.duration
          self.remaining_teaching_hours = response.data.remaining_teaching_hours
          self.expiry_date = response.data.expiry_date

          self.student_list.unshift({
            student_table_id: response.data.student_name.student_table_id,
            name: response.data.student_name.name,
            mobile: response.data.student_name.mobile
          })


          self.$refs.unit_test_list.dialog_data.student_list = []
          self.student_list.forEach(function (element) {
            self.$refs.unit_test_list.dialog_data.student_list.push({
              student_table_id: element.student_table_id,
              name: element.name,
              mobile: element.mobile,
              obtained_marks: element.obtained_marks||0,
            })
          });
          self.$refs.unit_test_list.dialog_data.subject_list = response.data.subject_list
        }
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };
      self.request_GET(
          self,
          self.$urls.BATCH_DETAILS,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
      );
    },
    getTestRecords() {
      const self = this;
      self.$store.dispatch("setPageLoader", true);
      let params = {
        batch_table_id: this.batch_table_id,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.test_list = response.data.test_list;
        }
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };
      self.request_GET(
          self,
          self.$urls.UNIT_TEST_LIST,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
      );
    },


  }
}
</script>