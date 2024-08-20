<style lang="scss" scoped>
.profile_card {
  background-color: rgb(var(--primary_rgb), 1) !important;
  background-image: url("../../assets/images/student/profile-bg.png");
  padding: 30px 30px;
  border-radius: 30px;
  background-size: contain;
  background-repeat: repeat;
}

.profile_card-mobile {
  background-color: rgb(var(--primary_rgb), 1) !important;
  background-image: url("../../assets/images/student/profile-bg.png");

  padding: 20px 0px;
  background-size: contain;
  background-repeat: repeat;
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
</style>
<template>
  <div
    :class="{
      'profile_card-mobile': $vuetify.breakpoint.smAndDown,
      'profile_card mx-5': $vuetify.breakpoint.mdAndUp,
    }"
  >
    <v-row class="mx-0" justify="center">
      <v-col class="text-center" cols="12" md="2" sm="4">
        <v-avatar class="ml-1" size="110">
          <img
            v-if="student_basic_data.gender == 'Female'"
            alt="John"
            src="../../assets/images/student/female-profile.svg"
          />
          <img v-else alt="John" src="../../assets/images/student/male-profile.svg" />
        </v-avatar>
      </v-col>
      <v-col
        :class="{
          'pa-0': $vuetify.breakpoint.smAndDown,
          '': $vuetify.breakpoint.mdAndUp,
        }"
        class=""
        cols="12"
        md="8"
        sm="8"
      >
        <p
          :class="{
            'fs-22 text-center': $vuetify.breakpoint.smAndDown,
            'fs-36': $vuetify.breakpoint.mdAndUp,
          }"
          class="title-txt ma-0"
        >
          {{ student_name }}
        </p>
        <div
          :class="{
            'fs-16 text-center': $vuetify.breakpoint.smAndDown,
            'fs-18': $vuetify.breakpoint.mdAndUp,
          }"
        >
          <p class="sub-title ma-0">
            Class :
            <span v-if="student_basic_data">{{ student_basic_data.class_name }}</span>
            <span v-else>-</span>
          </p>
          <p class="sub-title ma-0">Date of Joining : {{ created }}</p>
          <p class="sub-title-2 ma-0 mt-1 small-screen">
            {{ $lang.STUDENT_ID }} : #<span
              v-if="student_basic_data"
              class="sub-title-2 text-right ma-0"
              >{{ student_basic_data.student_id }}</span
            >
          </p>
        </div>
      </v-col>

      <v-col class="large-screen" cols="12" md="2" sm="12">
        <p class="sub-title text-right ma-0">{{ $lang.STUDENT_ID }}</p>
        <p v-if="student_basic_data" class="sub-title-2 text-right ma-0">
          #{{ student_basic_data.student_id }}
        </p>
      </v-col>
    </v-row>
    <div
      :class="{
        'text-center mt-5 mb-n2': $vuetify.breakpoint.smAndDown,
        'text-right mb-n4 mt-n5': $vuetify.breakpoint.mdAndUp,
      }"
    >
      <v-btn
        color="rgba(0, 121, 208, 1)"
        small
        @click="
          $router.push({
            name: 'edit_student_profile',
            query: { student_table_id: encrypt(student_table_id) },
          })
        "
      >
        <img
          alt="
      "
          class="mr-1"
          src="@/assets/table-assets/edit.svg"
          width="20"
        />
        <span style="color: #ffff">{{ $lang.EDIT_PROFILE }}</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["created", "student_name", "student_basic_data", "student_table_id"],
  data() {
    return {};
  },
  methods: {},
};
</script>
