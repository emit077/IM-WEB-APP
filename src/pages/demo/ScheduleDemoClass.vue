<style lang="scss">
.h-0 {
  height: 0px;
}
</style>
<template>
  <div>
    <v-form ref="demo_creation_form" lazy-validation @submit.prevent="scheduleDemo()">
      <v-row class="custom-form" justify="space-between">
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
                @focus="studentAutocomplete()"
                @keyup="studentAutocomplete(true)"
                placeholder="Select Students"
                :rules="[$rules.REQUIRED_FIELD($lang.STUDENT)]"
                dense
                outlined
                single-line
                @change="getSuggestionsData(form.student?.id)"
                clearable
                :disabled="is_reschedule"
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
              <label class="label-text-1">{{ $lang.TUTOR }} </label>
              <v-combobox
                v-model="form.tutor"
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
                :disabled="is_reschedule"
              >
                <template v-slot:item="{ index, item }">
                  <div>
                    <p class="fs-12 fw-bold">{{ item.name }}</p>
                    <p class="fs-12">{{ item.mobile }}</p>
                  </div>
                </template>
              </v-combobox>
            </v-col>
            <v-col
              class="py-0"
              cols="12"
              md="6"
              v-if="getUser.account_type != this.$keys.ACCOUNT_ACADEMIC_COUNSELLOR"
            >
              <label class="label-text-1">{{ $keys.ACCOUNT_ACADEMIC_COUNSELLOR }} </label>
              <v-combobox
                v-model="form.sac"
                :items="bda_list"
                :search-input.sync="sac_search_query"
                :placeholder="$keys.ACCOUNT_ACADEMIC_COUNSELLOR"
                :rules="
                  demo_table_id
                    ? []
                    : [$rules.REQUIRED_FIELD($keys.ACCOUNT_ACADEMIC_COUNSELLOR)]
                "
                clearable
                dense
                outlined
                single-line
                item-text="name"
                item-value="id"
                :disabled="is_reschedule"
                @focus="bdaAutocomplete($keys.ACCOUNT_ACADEMIC_COUNSELLOR)"
                @keyup="bdaAutocomplete($keys.ACCOUNT_ACADEMIC_COUNSELLOR)"
              >
                <template v-slot:item="{ index, item }">
                  <div>
                    <p class="fs-12 fw-bold">{{ item.name }}</p>
                    <p class="fs-12">{{ item.mobile }}</p>
                  </div>
                </template>
              </v-combobox>
            </v-col>
            <!-- BDA -->
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1"
                >{{ $keys.ACCOUNT_ADMISSION_COORDINATOR }}
              </label>
              <v-combobox
                v-model="form.bda"
                :items="bda_list"
                :search-input.sync="bda_search_query"
                :placeholder="$keys.ACCOUNT_ADMISSION_COORDINATOR"
                :rules="[$rules.REQUIRED_FIELD($keys.ACCOUNT_ADMISSION_COORDINATOR)]"
                clearable
                dense
                outlined
                single-line
                item-text="name"
                item-value="id"
                :disabled="is_reschedule"
                @focus="bdaAutocomplete($keys.ACCOUNT_ADMISSION_COORDINATOR)"
                @keyup="bdaAutocomplete($keys.ACCOUNT_ADMISSION_COORDINATOR)"
              >
                <template v-slot:item="{ index, item }">
                  <div>
                    <p class="fs-12 fw-bold">{{ item.name }}</p>
                    <p class="fs-12">{{ item.mobile }}</p>
                  </div>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" md="6" class="">
              <v-checkbox
                v-model="is_online"
                class="d-inline-flex ml-2"
                dense
                label="Is Online"
                hide-details
              ></v-checkbox>
            </v-col>

            <v-col cols="12" md="12" class="py-0" v-if="is_online">
              <label class="label-text-1">{{ $lang.MEETING_URL }} </label>
              <v-textarea
                :placeholder="$lang.MEETING_URL"
                v-model="form.meeting_url"
                :rules="[$rules.REQUIRED_FIELD('Meeting URL')]"
                dense
                single-line
                outlined
                rows="2"
              ></v-textarea>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <label class="label-text-1">{{ $lang.DATE }} </label>
              <v-menu
                v-model="date_menu"
                :close-on-content-click="false"
                :nudge-right="40"
                min-width="290px"
                offset-y
                transition="scale-transition"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    v-on="on"
                    :label="$lang.DATE"
                    :rules="[$rules.REQUIRED_FIELD($lang.DATE)]"
                    dense
                    readonly
                    required
                    outlined
                    single-line
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  :min="today"
                  @input="date_menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <label class="label-text-1">{{ $lang.TIME }} </label>
              <v-menu
                ref="menu"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="time"
                    placeholder="HH:MM"
                    readonly
                    v-bind="attrs"
                    :rules="[$rules.REQUIRED_FIELD('Time')]"
                    v-on="on"
                    dense
                    outlined
                    single-line
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="time"
                  full-width
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" md="12" class="py-0">
              <v-textarea
                :label="$lang.DEMO_DETAILS"
                v-model="form.special_concern"
                dense
                single-line
                outlined
                rows="2"
              ></v-textarea>
            </v-col>

            <v-col class="py-0 text-right" cols="12" md="12">
              <v-btn
                color="primary font-weight-bold px-8"
                height="40"
                rounded
                type="submit"
              >
                {{ $lang.SUBMIT }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="px-0 large-screen" cols="12" md="3">
          <!-- interested data  -->
          <div>
            <h4>{{ $lang.INTERESTED_TUTOR }}</h4>
            <v-list v-if="interested_tutors.length > 0" class="bg-transparent">
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(tutor, i) in interested_tutors"
                  :key="i"
                  style="min-height: 40px"
                >
                  <v-list-item-content
                    @click="
                      form.tutor = {
                        id: tutor.tutor_table_id,
                        name: tutor.tutor_name,
                        mobile: tutor.tutor_mobile,
                      }
                    "
                    class="py-0"
                  >
                    <p>{{ tutor.tutor_name }}</p>
                    <small>{{ tutor.tutor_mobile }}</small>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <div v-else class="text-center mt-5 caption">
              {{ $lang.NO_DATA_AVAILABLE }}
            </div>
          </div>

          <!-- suggetion data -->
          <div class="mt-10">
            <h4>{{ $lang.TUTOR_SUGGESTION }}</h4>
            <v-list v-if="suggetion_list.length > 0" class="bg-transparent">
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(tutor, i) in suggetion_list"
                  :key="i"
                  style="min-height: 40px"
                >
                  <v-list-item-content
                    @click="
                      form.tutor = {
                        id: tutor.id,
                        name: tutor.tutor_name,
                        mobile: tutor.tutor_mobile,
                      }
                    "
                    class="py-0"
                  >
                    <p>{{ tutor.tutor_name }}</p>
                    <small>{{ tutor.tutor_mobile }}</small>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <div v-else class="text-center mt-5 caption">
              {{ $lang.NO_DATA_AVAILABLE }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import HelperMixin from "@/helper/mixins/helper-mixin";
import { get } from "scriptjs";

export default {
  mixins: [HelperMixin],
  data() {
    return {
      demo_table_id: "",
      is_reschedule: false,
      date_menu: false,
      today: new Date().toISOString().substr(0, 10),
      menu2: false,

      student_search_query: "",
      tutor_search_query: "",
      bda_search_query: "",
      sac_search_query: "",

      student_list: [],
      tutor_list: [],
      bda_list: [],
      tutor_loading: false,

      form: {
        student: null,
        tutor: null,
        tutor_list: null,
        bda: null,
        sac: null,
        meeting_url: "",
        special_concern: "",
      },
      is_online: false,
      time: null,
      date: new Date().toISOString().substr(0, 10),
      // suggetion data
      suggetion_loading: false,
      interested_tutors: [],
      suggetion_list: [],
    };
  },
  created() {
    if (this.$route.params.demo_table_id) {
      this.demo_table_id = this.decrypt(this.$route.params.demo_table_id);
      this.is_reschedule = true;
      this.getDemoDetails(this.demo_table_id);
    }
  },
  methods: {
    getDemoDetails(demo_table_id) {
      const self = this;
      self.table_loading = true;
      let params = {
        demo_table_id: demo_table_id,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.form.student = {
            id: response.data.demo_data.student_table_id,
            name: response.data.demo_data.student_name,
          };
          self.form.tutor = {
            id: response.data.demo_data.tuor_table_id,
            name: response.data.demo_data.tutor_name,
          };
          self.form.bda = {
            id: response.data.demo_data.bda_table_id,
            name: response.data.demo_data.bda_name,
          };

          self.is_online = response.data.demo_data.is_online;
          self.date = response.data.demo_data.date;
          self.time = response.data.demo_data.time;
          self.form.meeting_url = response.data.demo_data.meeting_url;
          self.form.special_concern = response.data.demo_data.special_concern;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.DEMO_DETAILS,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        null
      );
    },
    getSuggestionsData(student_table_id) {
      if (!student_table_id) {
        this.interested_tutors = [];
        this.suggetion_list = [];
        return;
      }
      const self = this;
      this.suggetion_loading = true;
      let params = {
        student_table_id: student_table_id,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          this.interested_tutors = response.data.interested_tutors;
          this.suggetion_list = response.data.tutor_list;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.GET_INTERESTED_TUTORS,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        null
      );
    },
    studentAutocomplete(is_cancel = false) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.student_search_query,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.student_list = response.data.student_list;
          self.total_page_count = response.data.total_page_count;

          let stu = self.student_list.find((el) => el.id === self.form.student.id);
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
    bdaAutocomplete(account_type, is_cancel = true) {
      const self = this;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.bda_search_query,
        account_type: account_type,
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
    scheduleDemo() {
      const self = this;
      if (this.$refs.demo_creation_form.validate() == false) return false;

      self.btn_loader = true;
      var form = new FormData();

      this.demo_table_id ? form.append("demo_table_id", this.demo_table_id) : "";
      form.append("student_table_id", this.form.student.id);
      form.append("tutor_table_id", self.form.tutor.id);
      form.append("bda_table_id", self.form.bda.id);
      if (self.form.sac) form.append("sac_table_id", self.form.sac.id);
      form.append("time", self.time);
      form.append("date", self.date);
      form.append("is_online", self.is_online ? "Y" : "N");
      form.append("meeting_url", self.is_online ? self.form.meeting_url : "");
      form.append("special_concern", self.form.special_concern);

      const successHandler = (response) => {
        if (response.data.success) {
          this.$refs.demo_creation_form.reset();
          this.$router.push({ name: "demo_list" });
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false;
      };
      this.request_POST(
        self,
        this.$urls.SCHEDULE_DEMO,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
  },
};
</script>
