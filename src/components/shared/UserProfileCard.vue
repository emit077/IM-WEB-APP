<style lang="scss" scoped>
.profile_card {
  background-color: rgb(var(--primary_rgb), 1) !important;
  background-image: url("../../assets/images/student/profile-bg.png");
  padding: 25px;
  border-radius: 30px;
  background-size: cover;
  background-repeat: repeat;
  height: 180px;
}

.title-txt {
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  color: #ffffff;
}

.sub-title {
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  color: #fff200;
}

.sub-title-2 {
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
}

@media screen and (max-width: 1260px) {
  .profile_card {
    height: auto;
    border-radius: 10px;
  }
}
</style>
<template>
  <div>
    <div class="profile_card mx-md-5">
      <!-- for desktop view -->
      <div class="large-screen" v-if="data">
        <div class="text-subtitle-1 float-right white--text font-weight-medium">
          <p class="secondary--text">#{{ data.display_id }}</p>
        </div>
      </div>
      <div
        class="d-md-flex text-md-left text-center h-100 justify-center justify-md-start"
        style="align-items: center"
      >
        <img
          height="110"
          style="border-radius: 30px"
          alt="John"
          :src="
            require(data.gender == 'Female'
              ? '../../assets/images/student/female-profile.png'
              : '../../assets/images/student/male-profile.png')
          "
        />
        <!-- mobile view -->
        <div class="small-screen text-center">
          <h3 class="ma-0 white--text">{{ data.name }}</h3>
          <p class="secondary--text">#{{ data.display_id }}</p>
          <v-btn class="mt-3" color="info" small @click="editProfile(data.id)">
            {{ $lang.EDIT_PROFILE }}
          </v-btn>
        </div>
        <!-- mobile view end -->
        <!-- desktop view -->
        <div class="px-3 large-screen">
          <h2 class="text-h4 white--text font-weight-bold">
            {{ data.name }}
          </h2>
          <span
            :title="'Profile Status: ' + data.profile_status"
            class="mt-2"
            style="background-color: #fff; border-radius: 20px; display: inline-flex"
          >
            <span
              v-if="data.profile_status"
              :class="'status-' + data.profile_status.toLowerCase()"
              >{{ data.profile_status }}</span
            >
          </span>
        </div>

        <!-- desktop view end -->
      </div>

      <div class="float-end large-screen" style="position: relative; top: -35px">
        <v-btn class="mt-3" color="info" small @click="editProfile(data.id)">
          {{ $lang.EDIT_PROFILE }}
        </v-btn>
      </div>

      <!-- destop view end  -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "account_type"],
  data() {
    return {};
  },
  methods: {
    editProfile(id) {
      if (this.account_type == this.$keys.ACCOUNT_STUDENT) {
        this.$router.push({
          name: "edit_student_profile",
          query: { student_table_id: this.encrypt(id) },
        });
      } else if (this.account_type == this.$keys.ACCOUNT_TEACHER) {
        this.$router.push({
          name: "edit_tutor_profile",
          query: { tutor_table_id: this.encrypt(id) },
        });
      }
    },
  },
};
</script>
