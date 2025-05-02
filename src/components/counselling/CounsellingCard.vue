<style lang="scss" scoped>
.student-card .v-card {
  border-radius: 10px !important;
  background-color: #adff2f2b !important;
}

.card-divider {
  border: solid 1.5px !important;
  border-radius: 3px;
}
.card-bg {
  border-radius: 10px;
  margin-top: 20px;
  padding: 15px;
}

@media screen and (max-width: 1260px) {
  .student-card {
    label {
      display: inline-block;
      width: 40%;
      vertical-align: top;
    }

    .text-1 {
      display: inline-block;
      width: 60%;
      vertical-align: top;
      margin-bottom: 0px;
    }
  }
}
</style>
<template>
  <div
    class="px-md-3 student-card"
    v-if="$store.state.user.account_type !== $keys.ACCOUNT_STUDENT"
  >
    <v-card class="mb-5 tutor-rating-card elevation-0">
      <v-card-title class="primary--text text-body-1 font-weight-bold">
        <v-icon color="primary" class="mr-1" size="25">mdi-star</v-icon>
        Counselling Results</v-card-title
      >
      <div class="px-5">
        <v-divider class="card-divider" color="secondary"></v-divider>
      </div>
      <v-card-text class="mt-3">
        <v-row no-gutter class="justify-center mb-5">
          <v-col class="text-center justify-center" cols="12" md="2">
            <div class="d-flex justify-center">
              <div>
                <star-rating
                  v-model="counselling_data.reading"
                  :star-size="30"
                  :show-rating="false"
                  read-only
                ></star-rating>
                <label class="primary--text font-weight-bold">{{ $lang.READING }}</label>
              </div>
            </div>
          </v-col>
          <v-col class="text-center justify-center" cols="12" md="2">
            <div class="d-flex justify-center">
              <div>
                <star-rating
                  v-model="counselling_data.writing"
                  :star-size="30"
                  :show-rating="false"
                  read-only
                ></star-rating>
                <label class="primary--text font-weight-bold">{{ $lang.WRITING }}</label>
              </div>
            </div>
          </v-col>
          <v-col class="text-center justify-center" cols="12" md="2">
            <div class="d-flex justify-center">
              <div>
                <star-rating
                  v-model="counselling_data.listening"
                  :star-size="30"
                  :show-rating="false"
                  read-only
                ></star-rating>
                <label class="primary--text font-weight-bold">{{
                  $lang.LISTENING
                }}</label>
              </div>
            </div>
          </v-col>
          <v-col class="text-center justify-center" cols="12" md="2">
            <div class="d-flex justify-center">
              <div>
                <star-rating
                  v-model="counselling_data.communication"
                  :star-size="30"
                  :show-rating="false"
                  read-only
                ></star-rating>
                <label class="primary--text font-weight-bold">{{
                  $lang.COMMUNICATION
                }}</label>
              </div>
            </div>
          </v-col>
          <v-col class="text-center justify-center" cols="12" md="2">
            <div class="d-flex justify-center">
              <div>
                <star-rating
                  v-model="counselling_data.presence_of_mind"
                  :star-size="30"
                  :show-rating="false"
                  read-only
                ></star-rating>
                <label class="primary--text font-weight-bold">{{
                  $lang.PRESENCE_OF_MIND
                }}</label>
              </div>
            </div>
          </v-col>
          <v-col class="text-center justify-center" cols="12" md="2">
            <div class="d-flex justify-center">
              <div>
                <star-rating
                  v-model="counselling_data.subjective_knowledge"
                  :star-size="30"
                  :show-rating="false"
                  read-only
                ></star-rating>
                <label class="primary--text font-weight-bold">{{
                  $lang.SUBJECTIVE_KNOWLEDGE
                }}</label>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row no-gutter class="justify-center my-5">
          <v-col class="text-center justify-center" cols="12" md="4">
            <div class="d-flex justify-center">
              <div>
                <label class="">{{ $lang.GOOD_HABITS }}</label>
                <p class="font-weight-medium">{{ counselling_data.good_habits }}</p>
              </div>
            </div>
          </v-col>
          <v-col class="text-center justify-center" cols="12" md="4">
            <div class="d-flex justify-center">
              <div>
                <label class="">{{ $lang.BAD_HABITS }}</label>
                <p class="font-weight-medium">{{ counselling_data.bad_habits }}</p>
              </div>
            </div>
          </v-col>
          <v-col class="text-center justify-center" cols="12" md="4">
            <div class="d-flex justify-center">
              <div>
                <label class="">{{ $lang.OFFICE_REMARKS }}</label>
                <p class="font-weight-medium">{{ counselling_data.office_remarks }}</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
export default {
  // props: {
  //   student_table_id,
  // },
  components: {
    StarRating,
  },
  data() {
    return {
      student_table_id: "",
      counselling_data: {
        reading: 0,
        writing: 0,
        listening: 0,
        communication: 0,
        presence_of_mind: 0,
        subjective_knowledge: 0,
        good_habits: "",
        bad_habits: "",
        office_remarks: "",
      },
    };
  },
  created() {
    this.student_table_id = this.decrypt(this.$route.query.student_table_id);
    this.getCounsellingData();
  },
  methods: {
    /* fetching shipment list */
    getCounsellingData() {
      const self = this;
      let params = {
        student_table_id: this.student_table_id,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.counselling_data = response.data;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.STUDENT_COUNSELLING_DETAILS,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        null
      );
    },
  },
};
</script>
