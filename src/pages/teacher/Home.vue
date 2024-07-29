<template>
  <div class="pa-3">
    <v-row justify="center">
      <v-col md="3" sm="8" v-for="item in home_items" :key="item.title">
        <v-card class="text-center cursor-pointer" @click="$router.push({name:item.redirect_to})">
          <div class=" pa-3">
            <img :src="item.image_url" alt="img">
          </div>
          <div class="bg-primary">
            <p class="white--text">{{ item.title }}</p>
          </div>
        </v-card>

      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  components: {
    // StudentDetailsCard: () => import('@/components/student/StudentDetailsCard'),
  },
  data() {
    return {
      home_items: [
        {
          title: "Sessions",
          image_url: require('../../assets/images/tutor/session.png'),
          redirect_to: "create_session"
        },
        {
          title: "My Earnings",
          image_url: require('../../assets/images/tutor/wallate.png'),
          redirect_to: "create_session"
        },
        {
          title: "Demo Session",
          image_url: require('../../assets/images/tutor/demo.png'),
          redirect_to: "demo_session"
        },
        {
          title: "My profile",
          image_url: require('../../assets/images/tutor/user.png'),
          redirect_to: "tutor_profile"
        }
      ]
    }
  },
  created() {
    this.getStudentDetail()
  },
  methods: {
    /* fetching student profile */
    getStudentDetail() {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let params = {};
      const successHandler = (response) => {
        if (response.data.success) {
          self.student_basic_data = response.data.student_basic_data
          self.student_address_data = response.data.student_address_data
          self.student_academic_data = response.data.student_academic_data
          self.created = response.data.created
          self.user_table_id = response.data.user_table_id
          self.student_name = response.data.student_name
          self.email = response.data.email
          self.mobile = response.data.mobile
          self.morning_time_slots = response.data.morning_time_slots
          self.afternoon_time_slots = response.data.afternoon_time_slots
          self.evening_time_slots = response.data.evening_time_slots


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
  }
}
</script>