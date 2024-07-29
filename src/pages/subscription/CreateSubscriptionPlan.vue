<template>
  <div>
    <v-form ref="subscription_plan_form" lazy-validation @submit.prevent="addSubscriptionPlan()">
      <v-row class="custom-form" justify="start">
        <v-col class="px-0" cols="12" md="7">
          <v-row class="mx-0 pa-0">
            <v-col class="py-0" cols="12" md="12">
              <label class="label-text-1">{{ $lang.PLAN_NAME }}</label>
              <v-text-field
                  v-model="form.name"
                  :placeholder="$lang.PLAN_NAME"
                  :rules="[$rules.REQUIRED_FIELD($lang.PLAN_NAME)]"
                  dense
                  maxlength="70"
                  outlined
                  single-line
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.PLAN_TYPE }}</label>
              <v-select
                  v-model="form.plan_type"
                  :items="plan_type_list"
                  :placeholder="$lang.PLAN_TYPE"
                  :rules="[$rules.REQUIRED_FIELD($lang.PLAN_TYPE)]"
                  clearable
                  dense
                  outlined
                  single-line
              ></v-select>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.PRICE }} (Per Month)</label>
              <v-text-field
                  v-model="form.price"
                  :placeholder="$lang.PRICE"
                  :rules="[$rules.REQUIRED_NUMBER_FIELD($lang.PRICE)]"
                  dense
                  maxlength="6"
                  outlined
                  single-line
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.GRADE }}</label>
              <v-select
                  v-model="form.grade"
                  :items="grade_list"
                  :loading="garde_loading"
                  :placeholder="$lang.GRADE"
                  :rules="[$rules.REQUIRED_FIELD($lang.GRADE)]"
                  clearable
                  dense
                  item-text="grade_name"
                  item-value="id"
                  outlined
                  single-line
                  @focus="getGradeList()"
              ></v-select>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.NO_OF_SUBJECTS_ALLOWED }}</label>
              <v-select
                  v-model="form.subjects_allowed"
                  :items="[1,2,3,4,'All']"
                  :placeholder="$lang.NO_OF_SUBJECTS_ALLOWED"
                  :rules="[$rules.REQUIRED_FIELD($lang.NO_OF_SUBJECTS_ALLOWED)]"
                  clearable
                  dense
                  outlined
                  single-line
              ></v-select>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.CLASSES_PER_WEEK }}</label>
              <v-select
                  v-model="form.classes_per_week"
                  :items="[2,3,4,5,6]"
                  :placeholder="$lang.CLASSES_PER_WEEK"
                  :rules="[$rules.REQUIRED_FIELD($lang.CLASSES_PER_WEEK)]"
                  clearable
                  dense
                  outlined
                  single-line
              ></v-select>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.CITY }}</label>
              <v-select
                  v-model="form.city"
                  :items="cities"
                  :placeholder="$lang.CITY"
                  :rules="[$rules.REQUIRED_FIELD($lang.CITY)]"
                  item-text="name"
                  item-value="id"
                  clearable
                  dense
                  outlined
                  single-line
              ></v-select>
            </v-col>
            <v-col class="py-0" cols="12" md="12">
              <label class="label-text-1">{{ $lang.DESCRIPTION }}</label>
              <v-textarea
                  v-model="form.description"
                  :placeholder="$lang.DESCRIPTION"
                  :rules="[$rules.REQUIRED_FIELD($lang.DESCRIPTION)]"
                  dense
                  maxlength="300"
                  outlined
                  rows="3"
                  single-line
              ></v-textarea>
            </v-col>
            <v-col class="py-0 text-right" cols="12" md="12">
              <v-btn color="primary font-weight-bold px-8" height="40" rounded type="submit">
                {{ $lang.SUBMIT }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import HelperMixin from '@/helper/mixins/helper-mixin'

export default {
  mixins: [HelperMixin],
  data() {
    return {
      btn_loading: false,
      is_edit: false,
      subscription_plan_id: "",
      form: {
        plan_type: null,
        name: "",
        price: "",
        description: "",
        grade: "",
        subjects_allowed: 1,
        classes_per_week: 3,
        city: null,
      },
      plan_type_list: [this.$keys.BASIC_PLAN, this.$keys.STANDARD_PLAN, this.$keys.PREMIUM_PLAN],
      grade_list: [],
      garde_loading: false,
      cities: []

    }
  },
  created() {
    /*  show and hide the back btn*/
    if (this.$route.name == "edit_subscription_plan") {
      this.subscription_plan_id = this.decrypt(this.$route.params.id)
      this.is_edit = true
      this.getGradeList()
      this.getSubscriptionPlanDetails()
    }
    this.cityList()
  },
  methods: {
    /* fetch plan details */
    getSubscriptionPlanDetails() {
      this.$store.dispatch('setPageLoader', true)
      const self = this
      let params = {
        id: this.subscription_plan_id,
      };

      const successHandler = (response) => {
        if (response.data.success) {
          self.form.name = response.data.plan_name
          self.form.price = response.data.price
          self.form.description = response.data.description
          self.form.grade = response.data.grade_id
          self.form.plan_type = response.data.plan_type
          self.form.classes_per_week = response.data.classes_per_week
          self.form.subjects_allowed = response.data.number_of_subjects
        }
      };
      const finallyHandler = () => {
        this.$store.dispatch('setPageLoader', false)

      };
      self.request_GET(self, self.$urls.SUBSCRIPTION_PLAN_DETAIL, params, successHandler, null, null, finallyHandler)

    },
    /* Add Edit subscription_plan_form*/
    addSubscriptionPlan() {
      const self = this
      if (this.$refs.subscription_plan_form.validate() == false)
        return false

      self.$store.dispatch("setPageLoader", true);

      var form = new FormData();

      form.append("plan_type", self.form.plan_type);
      form.append("plan_name", self.form.name);
      form.append("price", self.form.price);
      form.append("grade_id", self.form.grade);
      form.append("description", self.form.description);
      form.append("classes_per_week", self.form.classes_per_week);
      form.append("number_of_subjects", self.form.subjects_allowed);
      form.append("city_id", self.form.city);

      let url = this.$urls.ADD_SUBSCRIPTION_PLAN
      if (self.is_edit) {
        form.append("id", self.subscription_plan_id);
      }

      const successHandler = (response) => {
        if (response.data.success)
          this.$router.push({name: "subscription_list"})
      };
      const finallyHandler = () => {
        self.btn_loading = false
        self.$store.dispatch("setPageLoader", false);
      };

      this.request_POST(self, url, form, successHandler, null, null, finallyHandler)
    }
  }
}
</script>