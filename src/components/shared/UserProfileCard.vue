<style lang="scss" scoped>
.profile_card {
  background-color: rgb(var(--primary_rgb), 1) !important;
  background-image: url("../../assets/images/student/profile-bg.png");
  padding: 25px;
  border-radius: 30px;
  background-size: cover;
  background-repeat: repeat;
  height: 180px;
  margin-bottom: -50px;
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
    height: 150px;
    margin-bottom: -85px;
    border-radius: 10px;
  }
}
</style>
<template>
  <div>
    <div class="profile_card mx-md-5">
      <!-- for desktop view -->
      <div class="large-screen" v-if="data">
        <div class="text-subtitle-1 white--text text-right font-weight-medium">
          <p>#{{ data.display_id }}</p>
        </div>
        <div class="float-end" style="position: relative; top: 75px">
          <v-btn color="info" small @click="editProfile(data.id)">
            {{ $lang.EDIT_PROFILE }}
          </v-btn>
        </div>
      </div>
      <!-- destop view end  -->
    </div>
    <div class="ml-md-10" v-if="data">
      <div class="d-flex justify-center justify-md-start" style="align-items: end">
        <div>
          <img
            height="130"
            style="border-radius: 30px"
            alt="John"
            class="elevation-3"
            :src="
              require(data.gender == 'Female'
                ? '../../assets/images/student/female-profile.png'
                : '../../assets/images/student/male-profile.png')
            "
          />
          <!-- mobile view -->
          <div class="small-screen text-center">
            <h3 class="ma-0">{{ data.name }}</h3>
            <p>#{{ data.display_id }}</p>
            <v-btn class="mt-3" color="info" small @click="editProfile(data.id)">
              {{ $lang.EDIT_PROFILE }}
            </v-btn>
          </div>
          <!-- mobile view end -->
        </div>
        <!-- desktop view -->
        <div class="px-3 pb-5 large-screen">
          <h2 class="text-h4 font-weight-bold">
            {{ data.name }}
          </h2>
          <span
            v-if="data.profile_status"
            :class="'status-' + data.profile_status.toLowerCase()"
            >{{ data.profile_status }}</span
          >
        </div>
        <!-- desktop view end -->
      </div>
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
