<template>
  <div>
    <UserProfileCard
      :data="{
        name: student_basic_data.name,
        id: student_basic_data.student_table_id,
        gender: student_basic_data.gender,
        display_id: student_basic_data.student_id,
        profile_status: student_basic_data.profile_status,
      }"
      :account_type="$keys.ACCOUNT_STUDENT"
    ></UserProfileCard>

    <DemoDetails v-if="demo_data" :demo_data="demo_data"></DemoDetails>

    <!-- Basic Details -->

    <v-row class="mt-4 mx-0">
      <v-col class="px-0" cols="12" md="12">
        <StudentDetailsCard
          :afternoon_time_slots="afternoon_time_slots"
          :email="email"
          :evening_time_slots="evening_time_slots"
          :mobile="mobile"
          :morning_time_slots="morning_time_slots"
          :student_basic_data="student_basic_data"
          :student_name="student_name"
        ></StudentDetailsCard>
      </v-col>
    </v-row>
    <ProfileSettings :settings="settings"></ProfileSettings>

    <ProfileDialog
      v-if="$store.state.user.account_type == $keys.ACCOUNT_STUDENT"
      :data="dialog_data"
    ></ProfileDialog>
  </div>
</template>

<script>
export default {
  components: {
    UserProfileCard: () => import("@/components/shared/UserProfileCard"),
    StudentDetailsCard: () => import("../../components/student/StudentDetailsCard"),
    ProfileDialog: () => import("../../components/student/ProfileDialog"),
    DemoDetails: () => import("../../components/student/DemoDetails"),
    ProfileSettings: () => import("../../components/shared/ProfileSettings"),
  },
  data() {
    return {
      student_table_id: -1,
      student_basic_data: {
        id: "",
        student_id: "",
        father_name: "",
        mother_name: "",
        gender: "",
        date_of_birth: "",
        father_contact_number: "",
        whatsapp_number: "",
        parent_email: "",
        address: "",
        pin_code: "",
        latitude: "",
        longitude: "",
        city: "",
        state: "",
        class_name: null,
        class_id: null,
        education_board: "",
        school_name: "",
        tutor_preference: "",
        special_concern: "",
        time_slots_id_list: [],
      },
      created: "",
      user_table_id: null,
      student_name: "",
      email: null,
      mobile: "",
      morning_time_slots: [],
      afternoon_time_slots: [],
      evening_time_slots: [],
      dialog_data: {
        flag: false,
        title: "",
        message: "",
        profile_status: "",
        payment_type: this.$keys.TYPE_STUDENT_REGISTRATION,
        is_closable: true,
      },
      demo_data: {},
      settings: {
        registration_fee_required: null,
        user_table_id: null,
        account_type: this.$keys.ACCOUNT_STUDENT,
        registration_fee_amount: 0,
      },
    };
  },
  created() {
    if (this.$store.getters.getUsertype != this.$keys.ACCOUNT_STUDENT)
      this.student_table_id = this.decrypt(this.$route.query.student_table_id);
    this.getStudentDetail();
  },
  methods: {
    /* fetching student profile */
    getStudentDetail() {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let params = {};
      if (this.student_table_id && this.student_table_id != -1)
        params.student_table_id = this.student_table_id;
      const successHandler = (response) => {
        if (response.data.success) {
          if (response.data.student_basic_data)
            self.student_basic_data = response.data.student_basic_data;
          self.student_address_data = response.data.student_address_data;
          self.student_academic_data = response.data.student_academic_data;
          self.created = response.data.created;
          self.user_table_id = response.data.user_table_id;
          self.student_name = response.data.student_name;
          self.email = response.data.email;
          self.mobile = response.data.mobile;
          self.morning_time_slots = response.data.morning_time_slots;
          self.afternoon_time_slots = response.data.afternoon_time_slots;
          self.evening_time_slots = response.data.evening_time_slots;
          this.dialog_data.profile_status = response.data.profile_status;
          this.demo_data = response.data.demo_data;

          //settings
          this.settings.registration_fee_required =
            response.data.registration_fee_required;
          this.settings.user_table_id = self.student_basic_data.student_table_id;
          this.settings.registration_fee_amount = response.data.registration_fee_amount;
          this.settings.profile_status = response.data.profile_status;

          if (response.data.profile_status == this.$keys.PROFILE_INCOMPLETE) {
            this.dialog_data.flag = true;
            this.dialog_data.title = "Complete Your profile";
            this.dialog_data.message = "Please complete your profile to continue";
            this.dialog_data.is_closable = true;
          } else if (response.data.profile_status == this.$keys.PROFILE_COMPLETE) {
            this.dialog_data.flag = true;
            this.dialog_data.is_closable = true;
            // this.dialog_data.title = "Continue to complete your registration";
            // this.dialog_data.message =
            //   "You don’t have any active plan, please pay your one time registration & account activation fee and get lifetime access to all the verified & experienced tutors near your location.";
            this.dialog_data.title = "Just one more step to go!";
            this.dialog_data.message = `Complete your profile by paying the <b>₹${this.settings.registration_fee_amount}</b> registration fee and embark on your learning journey today.`;
          }
        }
      };
      const finallyHandler = () => {
        this.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.GET_STUDENT_DETAILS,
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
