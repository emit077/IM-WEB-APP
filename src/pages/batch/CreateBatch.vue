<style lang="scss">
.h-0 {
  height: 0px;
}

</style>
<template>
  <div>
    <v-form ref="batch_creation_form" lazy-validation @submit.prevent="createBatch()">
      <v-row class="custom-form" justify="start">
        <v-col class="px-0" cols="12" md="7">
          <v-row class="mx-0 pa-0">
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.STUDENT }} </label>
              <v-combobox
                  v-model="form.student"
                  :items="student_list"
                  :search-input.sync="student_search_query"
                  item-text="name"
                  item-value="id"
                  @focus="studentAutocomplete(true,student_search_query)"
                  @keyup="studentAutocomplete(true,student_search_query)"
                  placeholder="Select Students"
                  :rules="[$rules.REQUIRED_FIELD($lang.STUDENT)]"
                  @change="getStudentSubscriptionList"
                  dense
                  outlined
                  single-line
                  clearable
              >
                <template v-slot:item="{ index, item }">
                  <div>
                    <p class="fs-12 fw-bold">{{ item.name }}</p>
                    <p class="fs-12">{{ item.mobile }}</p>
                  </div>
                </template>
              </v-combobox>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.SUBSCRIPTION_PLAN }} </label>
              <v-select
                  v-model="form.subscription_table_id"
                  :items="subscription_list"
                  :placeholder="$lang.SUBSCRIPTION_PLAN_SEARCH"
                  :rules="[$rules.REQUIRED_FIELD($lang.SUBSCRIPTION_PLAN)]"
                  clearable
                  dense
                  outlined
                  single-line
                  :disabled="form.student?false:true"
                  item-text="subscription_plan_name"
                  item-value="id"
                  @change="checkStudentLimits"
              >
                <template v-slot:selection="{ item }">
                  <span>{{ item.plan_name }}</span>
                </template>
                <template v-slot:item="{ index, item }">
                  <div>
                    <p class="fs-12 fw-bold">{{ item.plan_name }} ({{ item.number_of_students }})</p>
                    <p class="fs-12">Expired on -{{ item.expiry_date }}</p>
                  </div>
                </template>
              </v-select>
            </v-col>
            <v-col class="py-0" cols="12" md="12" v-if="max_student_allowed>1">
              <label class="label-text-1">{{ $lang.ADD_MORE_STUDENT }} </label>
              <v-combobox
                  v-model="form.ref_student"
                  :items="student_list"
                  :search-input.sync="ref_student_search_query"
                  item-text="name"
                  item-value="id"
                  @focus="studentAutocomplete(true,ref_student_search_query)"
                  @keyup="studentAutocomplete(true,ref_student_search_query)"
                  placeholder="Select Students"
                  :rules="[$rules.REQUIRED_FIELD($lang.STUDENT)]"
                  dense
                  outlined
                  single-line
                  clearable
                  multiple
                  chips
                  :hint="'Maximum '+(max_student_allowed-1)+ ' Students allowed' "
                  persistent-hint
                  :disabled="form.subscription_table_id?false:true"
                  @change="(form.ref_student.length + 1) > max_student_allowed?$nextTick(() => form.ref_student.pop()):false"
              >
                <template v-slot:item="{ index, item }">
                  <div>
                    <p class="fs-12 fw-bold">{{ item.name }}</p>
                    <p class="fs-12">{{ item.mobile }}</p>
                  </div>
                </template>
              </v-combobox>
            </v-col>

            <v-col class="py-0" cols="12" md="12">
              <label class="label-text-1">{{ $lang.TUTOR }} </label>
              <v-combobox
                  v-model="form.tutor_list"
                  :items="tutor_list"
                  :search-input.sync="tutor_search_query"
                  item-text="name"
                  item-value="id"
                  @focus="tutorAutocomplete"
                  @keyup="tutorAutocomplete"
                  placeholder="Select Students"
                  :rules="[$rules.REQUIRED_LIST_FIELD($lang.TUTOR)]"
                  dense
                  outlined
                  single-line
                  clearable
                  multiple
                  chips
                  persistent-hint
              >

                <template v-slot:item="{ index, item }">
                  <div>
                    <p class="fs-12 fw-bold">{{ item.name }}</p>
                    <p class="fs-12">{{ item.mobile }}</p>
                  </div>
                </template>
              </v-combobox>
            </v-col>

            <v-col class="py-0" cols="12" md="12">
              <label class="label-text-1">{{ $keys.ACCOUNT_SENIOR_ACADEMIC_COUNSELOR }} </label>
              <v-combobox
                  v-model="form.bda"
                  :items="bda_list"
                  :search-input.sync="bda_search_query"
                  :placeholder="$keys.ACCOUNT_SENIOR_ACADEMIC_COUNSELOR"
                  :rules="[$rules.REQUIRED_FIELD($keys.ACCOUNT_SENIOR_ACADEMIC_COUNSELOR)]"
                  clearable
                  dense
                  outlined
                  single-line
                  item-text="name"
                  item-value="id"
                  @focus="bdaAutocomplete"
                  @keyup="bdaAutocomplete"
              >
                <template v-slot:item="{ index, item }">
                  <div>
                    <p class="fs-12 fw-bold">{{ item.name }}</p>
                    <p class="fs-12">{{ item.mobile }}</p>
                  </div>
                </template>
              </v-combobox>

            </v-col>

            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.TEACHER_PAY_RATE }} / Hours </label>
              <v-text-field
                  v-model="form.teacher_pay_rate"
                  :placeholder="$lang.TEACHER_PAY_RATE"
                  :rules="[$rules.REQUIRED_NUMBER_FIELD($lang.TEACHER_PAY_RATE)]"
                  class="mt-1"
                  dense
                  maxlength="3"
                  outlined
                  single-line
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.TRAVEL_EXPENSE_RATE }} / session </label>
              <v-text-field
                  v-model="form.travel_expenses_rate"
                  :placeholder="$lang.TRAVEL_EXPENSE_RATE"
                  :rules="[$rules.NUMBER_FIELD($lang.TRAVEL_EXPENSE_RATE)]"
                  class="mt-1"
                  dense
                  maxlength="3"
                  outlined
                  single-line
              ></v-text-field>
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
      batch_table_id: null,
      student_search_query: "",
      ref_student_search_query: "",
      tutor_search_query: "",
      bda_search_query: "",
      student_list: [],
      subscription_list: [],
      tutor_list: [],
      bda_list: [],
      tutor_loading: false,
      subscription_plan_id: "",
      max_student_allowed: 0,
      form: {
        student: null,
        ref_student: [],
        tutor_list: null,
        bda: null,
        subscription_table_id: null,
        teacher_pay_rate: null,
        travel_expenses_rate: 0,
      },
      grade_list: [],
      garde_loading: false,
    }
  },
  created() {
    if (this.$route.params.batch_table_id) {
      this.batch_table_id = this.decrypt(this.$route.params.batch_table_id)
      this.getBatchDetails()
    }
    /*  show and hide the back btn*/
    this.studentAutocomplete(true, "")
  },
  methods: {
    studentAutocomplete(is_cancel = true,search_query) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: search_query,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.student_list = response.data.student_list;
          self.total_page_count = response.data.total_page_count;


          let stu = self.student_list.find(el => el.id === self.form.student.id)
          if (stu) {
            self.student_list.splice(self.student_list.indexOf(stu), 1);
          }

        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
          self,
          self.$urls.STUDENT_LIST,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
          is_cancel
      );
    },
    getStudentSubscriptionList() {
      const self = this;
      this.form.subscription_table_id = null
      this.subscription_list = []
      this.form.ref_student = []

      if (!this.form.student)
        return false
      self.$store.dispatch("setPageLoader", true);
      let params = {
        student_table_id: this.form.student.id,
        subscription_status: 'Active',
      };

      const successHandler = (response) => {
        if (response.data.success) {
          self.subscription_list = response.data.subscription_list;
        }
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
          self,
          self.$urls.SUBSCRIPTION_HISTORY,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
      );
    },
    tutorAutocomplete(is_cancel = true) {
      const self = this;
      self.tutor_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.tutor_search_query,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.tutor_list = response.data.tutor_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
          self,
          self.$urls.TUTOR_AUTOCOMPLETE,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
          is_cancel
      );
    },
    checkStudentLimits() {
      let subscription_plan = this.subscription_list.find(el => el.id === this.form.subscription_table_id)
      this.max_student_allowed = subscription_plan.number_of_students
    },
    bdaAutocomplete(is_cancel = true) {
      const self = this;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.bda_search_query,
        account_type:this.$keys.ACCOUNT_SENIOR_ACADEMIC_COUNSELOR
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.bda_list = response.data.bda_list;
        }
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };
      self.request_GET(
          self,
          self.$urls.BDA_AUTO_COMPLETE,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
          is_cancel
      );
    },
    createBatch() {
      const self = this
      if (this.$refs.batch_creation_form.validate() == false)
        return false

      self.btn_loader = true
      var form = new FormData();
      if (this.batch_table_id)
        form.append("batch_table_id", this.batch_table_id);
      if (this.form.student)
        form.append("student_table_id", this.form.student.id);
      form.append("subscription_table_id", self.form.subscription_table_id);
      form.append("bda_table_id", self.form.bda.id);
      form.append("teacher_pay_rate", self.form.teacher_pay_rate);
      form.append("travel_expenses_rate", self.form.travel_expenses_rate||0);

      if (this.form.ref_student.length > 0) {
        let student_table_id_lists = this.form.ref_student.map(x => x.id);
        form.append("student_table_id_list", JSON.stringify(student_table_id_lists));
      }
      if (this.form.tutor_list) {
        let tutor_table_id_list = this.form.tutor_list.map(x => x.id);
        form.append("tutor_table_id_list", JSON.stringify(tutor_table_id_list));
      }


      const successHandler = (response) => {
        if (response.data.success) {
          this.$refs.batch_creation_form.reset()
          this.$router.push({name: 'batch_list'})
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.BATCH_CREATE, form, successHandler, null, null, finallyHandler)


    },
    getBatchDetails() {
      const self = this;
      self.$store.dispatch("setPageLoader", true);
      let params = {
        batch_table_id: this.batch_table_id,
      };

      const successHandler = (response) => {
        if (response.data.success) {
          self.form.student = response.data.student_name;
          self.form.ref_student = response.data.student_list;
          this.getStudentSubscriptionList()
          self.form.subscription_table_id = response.data.subscription_table_id;
          self.max_student_allowed = response.data.number_of_students;
          self.form.tutor_list = response.data.tutor_data;
          self.form.bda = response.data.bda_data;
          self.form.travel_expenses_rate = response.data.travel_expenses_rate;
          self.form.teacher_pay_rate = response.data.teacher_pay_rate;
        }
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
          self,
          self.$urls.BATCH_DETAILS,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
      );
    },

  }
}
</script>