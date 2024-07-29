<style lang="scss" scoped>
.profile_card {
  background-color: #32345F;
  padding: 30px 30px;
  border-radius: 30px;
  background-image: url("../../../assets/images/student/profilr-bg.svg");
  background-size: contain;
  background-repeat: repeat;
}

.profile_card-mobile {
  background-color: #32345F;
  padding: 20px 0px;
  background-image: url("../../../assets/images/student/profilr-bg.svg");
  background-size: contain;
  background-repeat: repeat;
}


.title-txt {
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  color: #FFFFFF;
}

.sub-title {
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  color: #FFF200;
}

.sub-title-2 {
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #FFFFFF;
}

</style>
<template>
  <div
      :class="{'profile_card-mobile': $vuetify.breakpoint. smAndDown, 'profile_card mx-5': $vuetify.breakpoint. mdAndUp}">
    <v-row class="mx-0" justify="center">
      <v-col class="text-center" cols="12" md="2" sm="4">
        <v-avatar class="ml-1" size="110">
          <img
              v-if="gender=='Female'"
              alt="John"
              src="@/assets/images/student/female-profile.svg"
          >
          <img
              v-else
              alt="John"
              src="@/assets/images/student/male-profile.svg"
          >
        </v-avatar>
      </v-col>
      <v-col :class="{'pa-0': $vuetify.breakpoint. smAndDown, '': $vuetify.breakpoint. mdAndUp}" class="" cols="12"
             md="8"
             sm="8">
        <p :class="{'fs-22 text-center': $vuetify.breakpoint. smAndDown, 'fs-36': $vuetify.breakpoint. mdAndUp}"
           class="title-txt ma-0">
          {{ tutor_name }}
        </p>
        <div :class="{'fs-16 text-center': $vuetify.breakpoint. smAndDown, 'fs-18': $vuetify.breakpoint. mdAndUp}">
          <!--          <p class="sub-title ma-0">Class :-->
          <!--            <span v-if="student_basic_data">{{ student_basic_data.class_name }}</span>-->
          <!--            <span v-else>-</span>-->
          <!--          </p>-->
          <p class="sub-title ma-0">Date of Joining : {{ created }}</p>
          <p class="sub-title-2 ma-0  mt-1 small-screen">{{ $lang.TUTOR_ID }} : #<span v-if="tutor_id"
                                                                                       class="sub-title-2 text-right ma-0">{{
              tutor_id
            }}</span>
          </p>
        </div>
      </v-col>

      <v-col class="large-screen" cols="12" md="2" sm="12">
        <p class="sub-title text-right ma-0">{{ $lang.TUTOR_ID }}</p>
        <p v-if="tutor_id" class="sub-title-2 text-right ma-0">#{{ tutor_id }}</p>
      </v-col>
    </v-row>
    <div
        :class="{'text-center mt-5 mb-n2': $vuetify.breakpoint. smAndDown, 'text-right mb-n4 mt-n5': $vuetify.breakpoint. mdAndUp}">
      <v-btn color="rgba(0, 121, 208, 1)" small
             @click="$router.push({name:'edit_tutor_profile',query:{tutor_table_id:encrypt(tutor_table_id)}})">
        <img alt="
      " class="mr-1" src="@/assets/table-assets/edit.svg" width="20">
        <span style="color:#ffff">{{ $lang.EDIT_PROFILE }}</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["created", "tutor_table_id",  "tutor_name", "tutor_id","gender"],
  data() {
    return {}
  },
  methods: {}
}
</script>