<style lang="scss" scoped>
.tutor-rating-card {
  border-radius: 10px;
  background-color: #adff2f2b !important;
}
</style>
<template>
  <div class="px-md-3">
    <v-card class="mb-5 pa-3 tutor-rating-card elevation-2">
      <v-card-text>
        <v-row no-gutter class="justify-center">
          <v-col class="text-center justify-center" cols="6" md="2">
            <div class="d-flex justify-center">
              <div>
                <star-rating
                  v-model="interview_data.personal_interview"
                  :star-size="30"
                  :show-rating="false"
                  read-only
                ></star-rating>
                <label class="primary--text font-weight-bold">{{
                  $lang.PERSONAL_INTERVIEW
                }}</label>
              </div>
            </div>
          </v-col>
          <v-col class="text-center justify-center" cols="6" md="2">
            <div class="d-flex justify-center">
              <div>
                <star-rating
                  v-model="interview_data.academic_knowledge"
                  :star-size="30"
                  :show-rating="false"
                  read-only
                ></star-rating>
                <label class="primary--text font-weight-bold">{{
                  $lang.ACADEMIC_KNOWLEDGE
                }}</label>
              </div>
            </div>
          </v-col>
          <v-col class="text-center justify-center" cols="6" md="2">
            <div class="d-flex justify-center">
              <div>
                <star-rating
                  v-model="interview_data.teaching_skills"
                  :star-size="30"
                  :show-rating="false"
                  read-only
                ></star-rating>
                <label class="primary--text font-weight-bold">{{
                  $lang.TEACHING_SKILLS
                }}</label>
              </div>
            </div>
          </v-col>
          <v-col class="text-center justify-center" cols="6" md="2">
            <div class="d-flex justify-center">
              <div>
                <star-rating
                  v-model="interview_data.demo_session"
                  :star-size="30"
                  :show-rating="false"
                  read-only
                ></star-rating>
                <label class="primary--text font-weight-bold">{{
                  $lang.DEMO_SESSION
                }}</label>
              </div>
            </div>
          </v-col>
          <v-col class="text-center justify-center" cols="6" md="2">
            <div class="d-flex justify-center">
              <div>
                <star-rating
                  v-model="interview_data.office_remarks"
                  :star-size="30"
                  :show-rating="false"
                  read-only
                ></star-rating>
                <label class="primary--text font-weight-bold">{{
                  $lang.OFFICE_REMARKS
                }}</label>
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
  props: ["interview_data"],
  components: {
    StarRating,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
