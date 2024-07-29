<template>
  <div>
    <ProfileCard
      :created="created"
      :tutor_name="tutor_data.tutor_name"
      :tutor_id="tutor_data.tutor_id"
      :gender="tutor_data.gender"
      :tutor_table_id="tutor_table_id"
    ></ProfileCard>

    <InterviewDetails
      v-if="tutor_data.contract_status == $keys.INTERVIEW_SCHEDULED"
      :interview_data="interview_data"
      :tutor_table_id="tutor_table_id"
      @update="getTutorDetails"
    ></InterviewDetails>

    <v-row class="mt-4 mx-0">
      <v-col class="px-0" cols="12" md="12">
        <DetailsCard
          :afternoon_time_slots="afternoon_time_slots"
          :email="email"
          :evening_time_slots="evening_time_slots"
          :mobile="mobile"
          :morning_time_slots="morning_time_slots"
          :tutor_data="tutor_data"
          :academic_data="academic_data"
          :grade_list="grade_list"
        ></DetailsCard>
      </v-col>
    </v-row>

    <ProfileSettings :settings="settings"></ProfileSettings>

    <ProfileDialog
      v-if="$store.state.user.account_type == $keys.ACCOUNT_TEACHER"
      :data="dialog_data"
    ></ProfileDialog>
  </div>
</template>

<script>
export default {
  components: {
    ProfileDialog: () => import("@/components/student/ProfileDialog"),
    ProfileCard: () => import("../../components/teacher/tutor-profile/ProfileCard"),
    DetailsCard: () => import("../../components/teacher/tutor-profile/DetailsCard"),
    InterviewDetails: () => import("../../components/teacher/InterviewDetails"),
    ProfileSettings: () => import("../../components/shared/ProfileSettings"),
  },
  data() {
    return {
      tutor_table_id: -1,
      tutor_data: {},
      interview_data: {},
      created: "",
      student_name: "",
      email: null,
      mobile: "",
      morning_time_slots: [],
      afternoon_time_slots: [],
      evening_time_slots: [],
      grade_list: [],
      academic_data: [],
      settings: {
        profile_status:"",
        registration_fee_required: null,
        user_table_id: null,
        account_type: this.$keys.ACCOUNT_TEACHER,
        registration_fee_amount: 0,
      },
      dialog_data: {
        flag: false,
        title: "",
        message: "",
        profile_status: "",
        payment_type: this.$keys.TYPE_TUTOR_REGISTRATION,
        is_closable: false,
      },
    };
  },
  created() {
    if (this.$store.getters.getUsertype != this.$keys.ACCOUNT_TEACHER)
      this.tutor_table_id = this.decrypt(this.$route.query.tutor_table_id);
    this.getTutorDetails();
  },
  methods: {
    /* fetching student profile */
    getTutorDetails() {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let params = {};
      if (this.tutor_table_id && this.tutor_table_id != -1)
        params.tutor_table_id = this.tutor_table_id;

      const successHandler = (response) => {
        if (response.data.success) {
          this.tutor_data = response.data.tutor_data;
          this.created = response.data.created;
          this.morning_time_slots = response.data.morning_time_slots;
          this.afternoon_time_slots = response.data.afternoon_time_slots;
          this.evening_time_slots = response.data.evening_time_slots;
          this.grade_list = response.data.grade_list;
          this.academic_data = response.data.academic_data;
          this.interview_data = response.data.interview_data;
          //settings
          this.settings.registration_fee_required =
            response.data.registration_fee_required;
          this.settings.user_table_id = this.tutor_table_id;
          this.settings.registration_fee_amount = response.data.registration_fee_amount;

          this.settings.profile_status = response.data.profile_status;
          
          this.dialog_data.profile_status = response.data.profile_status;

          if (response.data.profile_status == this.$keys.PROFILE_INCOMPLETE) {
            this.dialog_data.flag = true;
            this.dialog_data.is_closable = true;
            this.dialog_data.title = "Complete Your profile";
            this.dialog_data.message = "Please complete your profile to continue";
          } else if (response.data.profile_status == this.$keys.PROFILE_COMPLETE) {
            this.dialog_data.flag = true;
            this.dialog_data.is_closable = true;
            // this.dialog_data.title = "Continue to complete your registration";
            // this.dialog_data.message =
            //   "Kindly pay one-time registration & account activation charges and get lifetime access to all the verified classes near your location.";
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
        self.$urls.GET_TUTOR_DETAILS,
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
