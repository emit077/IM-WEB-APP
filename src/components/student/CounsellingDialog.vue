<template>
  <div class="text-center">
    <v-dialog v-model="dialog.flag" width="600">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2 justify-center">
          {{ dialog.action }}
        </v-card-title>
        <v-form ref="interview_form" lazy-validation @submit.prevent="yesHandler()">
          <v-card-text class="" style="min-height: 150px">
            <v-row class="">
              <v-col cols="12" md="12" class="pa-5">
                <v-combobox
                  v-model="form.bda"
                  :items="bda_list"
                  label="Select Interviewer"
                  :search-input.sync="bda_search_query"
                  :rules="[$rules.REQUIRED_FIELD('Interviewer')]"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                  persistent-hint
                  @keyup="getBDAList(true)"
                  @focus="getBDAList"
                  hide-details
                >
                  <template v-slot:item="{ index, item }">
                    <div>
                      <p>{{ item.name }}</p>
                      <small>{{ item.mobile }}</small>
                    </div>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" md="6" class="px-5 pt-5">
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
                      v-model="form.date"
                      v-on="on"
                      :label="$lang.DATE"
                      :rules="[$rules.REQUIRED_FIELD($lang.DATE)]"
                      dense
                      outlined
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      required
                      hide-details
                      @click:prepend-inner="date_menu = !date_menu"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.date"
                    :min="today"
                    @input="date_menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6" class="px-5 pt-5">
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="form.time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.time"
                      label="Time"
                      prepend-inner-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      :rules="[$rules.REQUIRED_FIELD('Time')]"
                      v-on="on"
                      dense
                      outlined
                      hide-details
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="form.time"
                    full-width
                    @click:minute="$refs.menu.save(form.time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <!-- <v-col cols="12" md="12" class="pa-5">
                <v-textarea
                  :label="$lang.SPECIAL_CONCERN"
                  v-model="form.special_concern"
                  dense
                  outlined
                  rows="2"
                  hide-details
                ></v-textarea>
              </v-col> -->
            </v-row>
          </v-card-text>
          <!-- <v-divider></v-divider> -->
          <v-card-actions class="just ify-end py-4">
            <v-spacer></v-spacer>
            <v-btn color="primary" outlined width="100" @click="dialog.flag = false"
              >{{ $lang.CANCEL }}
            </v-btn>
            <v-btn color="primary" width="100" @click="yesHandler()"
              >{{ $lang.CONTINUE }}
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    date_menu: false,
    menu2: false,
    today: new Date().toISOString().substr(0, 10),
    bda_list: [],
    bda_search_query: "",
    form: {
      bda: null,
      date: new Date().toISOString().substr(0, 10),
      time: null,
      is_online: true,
      meeting_url: "",
      special_concern: "",
    },
  }),
  created() {},
  methods: {
    /* perform action */
    yesHandler() {
      if (!this.$refs.interview_form.validate()) return false;
      const self = this;
      self.btn_loader = true;
      var form = new URLSearchParams();
      form.append("student_table_id", self.dialog.student_table_id);
      form.append("bda_table_id", self.form.bda.id);
      form.append("date", self.form.date);
      form.append("time", self.form.time);
      // form.append("special_concern", self.form.special_concern);

      const successHandler = (response) => {
        if (response.data.success) {
          this.$refs.interview_form.reset();
          this.$emit("update");
          this.dialog.flag = false;
        }
      };
      const finallyHandler = () => {};
      this.request_POST(
        self,
        this.$urls.STUDENT_SCHEDULE_COUNSELLING,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    /* get bda list */
    getBDAList(is_cancel = false) {
      const self = this;
      let params = {
        search_query: self.bda_search_query,
        account_type: this.$keys.ACCOUNT_ACADEMIC_COUNSELLOR,
      };
      self.loading = true;
      const successHandler = (response) => {
        self.bda_list = response.data.bda_list;
      };
      const finallyHandler = () => {
        self.loading = false;
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
  },
};
</script>
