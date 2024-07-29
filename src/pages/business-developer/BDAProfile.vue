<style lang="scss" scoped>
.profile_card {
  background-color: #32345F;
  padding: 30px 30px;
  border-radius: 30px;
  background-image: url("../../assets/images/student/profilr-bg.svg");
  background-size: contain;
  background-repeat: repeat;
}

.profile_card-mobile {
  background-color: #32345F;
  padding: 20px 0px;
  background-image: url("../../assets/images/student/profilr-bg.svg");
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
  <div>
    <div
      :class="{ 'profile_card-mobile': $vuetify.breakpoint.smAndDown, 'profile_card mx-5': $vuetify.breakpoint.mdAndUp }">
      <v-row class="mx-0" justify="center">
        <v-col class="text-center" cols="12" md="2" sm="4">
          <v-avatar class="ml-1" size="110">
            <img v-if="gender == 'Female'" alt="John" src="../../assets/images/student/female-profile.svg">
            <img v-else alt="John" src="../../assets/images/student/male-profile.svg">
          </v-avatar>
        </v-col>
        <v-col :class="{ 'pa-0': $vuetify.breakpoint.smAndDown, '': $vuetify.breakpoint.mdAndUp }" class="" cols="12"
          md="8" sm="8">
          <p :class="{ 'fs-22 text-center': $vuetify.breakpoint.smAndDown, 'fs-36': $vuetify.breakpoint.mdAndUp }"
            class="title-txt ma-0">
            {{ name }} <br>
          </p>
          <p :class="{ 'text-center': $vuetify.breakpoint.smAndDown, '': $vuetify.breakpoint.mdAndUp }" class="font-weight-bold" style="color: #ffff;font-size: 14px;">( {{ account_type }} )</p>
          <div :class="{ 'fs-16 text-center': $vuetify.breakpoint.smAndDown, 'fs-18': $vuetify.breakpoint.mdAndUp }">
            <p class="sub-title ma-0">+91 {{ mobile }}</p>
            <p class="sub-title ma-0">Date of Joining : {{ created }}</p>
            <p class="sub-title-2 ma-0  mt-1 small-screen">{{ $lang.BUSINESS_DEVELOPER }} ID: #<span
                class="sub-title-2 text-right ma-0">{{ bda_table_id }}</span>
            </p>
          </div>
        </v-col>

        <v-col class="large-screen" cols="12" md="2" sm="12">
          <p class="sub-title text-right ma-0">{{ $lang.ASSOCIATE_ID }}</p>
          <p class="sub-title-2 text-right ma-0">#{{ bda_table_id }}</p>
        </v-col>
      </v-row>
      <div
        :class="{ 'text-center mt-5 mb-n2': $vuetify.breakpoint.smAndDown, 'text-right mb-n4 mt-n5': $vuetify.breakpoint.mdAndUp }">
        <v-btn color="rgba(0, 121, 208, 1)" small
          @click="$router.push({ name: 'edit_bda', params: { bda_table_id: encrypt(bda_table_id) } })">
          <img alt="" class="mr-1" src="@/assets/table-assets/edit.svg" width="20">
          <span style="color:#ffff">{{ $lang.EDIT_PROFILE }}</span>
        </v-btn>
      </div>
    </div>

    <!--  body  -->
    <v-row :class="{ 'px-2': $vuetify.breakpoint.smAndDown, 'px-6': $vuetify.breakpoint.mdAndUp }"
      class="mx-0 py-2 my-1 text-left">
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.MOBILE_NUMBER }} :</label>
          <p class="text-1">{{ secondary_mobile }} (secondary)</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.EMAIL }} :</label>
          <p class="text-1">{{ email || '-' }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.GENDER }} :</label>
          <p class="text-1">{{ gender }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.DATE_OF_BIRTH }} :</label>
          <p class="text-1">{{ date_of_birth }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.FATHER_NAME }} :</label>
          <p class="text-1">{{ father_name || '-' }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.MOTHER_NAME }} :</label>
          <p class="text-1">{{ mother_name || '-' }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.CITY }} :</label>
          <p class="text-1">{{ city || '-' }}</p>
        </div>
      </v-col>
      <v-col class="py-0" cols="12" md="4" sm="6">
        <div class="field-wrapper">
          <label class="label-text-1">{{ $lang.ADDRESS }} :</label>
          <p class="text-1">{{ address || '-' }}</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      mobile: "",
      email: "",
      father_name: "",
      mother_name: "",
      secondary_mobile: "",
      date_of_birth: "",
      address: "",
      city: "",
      pin_code: "",
      bda_table_id: "",
      gender: "",
      created: "",
      account_type: "",
    }
  },
  created() {
    this.getBDAtDetail()
  },
  methods: {
    /* fetching student profile */
    getBDAtDetail() {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let params = {};
      const successHandler = (response) => {
        if (response.data.success) {
          self.name = response.data.name
          self.mobile = response.data.mobile
          self.email = response.data.email
          self.gender = response.data.gender
          self.father_name = response.data.father_name
          self.mother_name = response.data.mother_name
          self.secondary_mobile = response.data.secondary_mobile
          self.date_of_birth = response.data.date_of_birth
          self.address = response.data.address
          self.city = response.data.city
          self.pin_code = response.data.pin_code
          self.bda_table_id = response.data.bda_table_id
          self.created = response.data.created
          self.account_type = response.data.account_type
        }
      };
      const finallyHandler = () => {
        this.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.BDA_DETAILS,
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