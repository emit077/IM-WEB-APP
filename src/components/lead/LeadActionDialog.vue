<template>
  <div class="text-center">
    <v-dialog v-model="dialog.flag" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ dialog.action }}
        </v-card-title>

        <v-card-text class="py-5" style="min-height:150px">

          <div v-if="dialog.action==$keys.RE_SCHEDULE" class="mt-5">
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
                    prepend-inner-icon=""
                    readonly
                    required
                    @click:prepend-inner="date_menu=!date_menu"
                >
                </v-text-field>
              </template>
              <v-date-picker
                  v-model="date"
                  :min="today"
                  @input="date_menu = false"
              ></v-date-picker>
            </v-menu>
          </div>
          <div v-if="dialog.action==$keys.RE_ASSIGN" class="mt-5">
            <v-combobox
                v-model="bda_table_id"
                :items="bda_list"
                :label="$lang.BUSINESS_DEVELOPER"
                :search-input.sync="bda_search_query"
                item-text="name"
                item-value="id"
                dense
                persistent-hint
                @focus="getBDAList"
            >
              <template v-slot:item="{ index, item }">
                <div>
                  <p>{{ item.name }}</p>
                  <small>{{ item.mobile }}</small>
                </div>
              </template>
            </v-combobox>
          </div>
          <div v-if="dialog.action==$keys.DEAD" class="mt-5">
            <h3 class="text-center red--text fw-bold">
              Are you sure want to mark as Dead to this lead <br>
              "{{ dialog.name }}"
            </h3>

          </div>

        </v-card-text>
        <!--        <v-divider></v-divider>-->
        <v-card-actions class="just ify-end py-4">
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              outlined
              width="100"
              @click="dialog.flag=false"
          >{{ $lang.CANCEL }}
          </v-btn>
          <v-btn
              color="primary"
              width="100"
              @click="yesHandler()"
          >{{ $lang.CONTINUE }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    date_menu: false,
    today: new Date().toISOString().substr(0, 10),
    date: new Date().toISOString().substr(0, 10),
    bda_list: [],
    bda_table_id: null,
    bda_search_query: "",

  }),
  methods: {
    /* perform action */
    yesHandler() {
      const self = this;
      self.btn_loader = true
      var form = new URLSearchParams();
      form.append("lead_id", self.dialog.lead_id);
      form.append("action", self.dialog.action);
      if (self.dialog.action == self.$keys.RE_SCHEDULE)
        form.append("date", self.date);
      if (self.dialog.action == self.$keys.RE_ASSIGN)
        form.append("bda_table_id", self.bda_table_id.id);

      const successHandler = (response) => {
        if (response.data.success) {
          this.$emit("update")
          this.dialog.flag = false
        }
      };
      const finallyHandler = () => {
        self.bda_table_id = null;
      };
      this.request_POST(self, this.$urls.LEAD_ACTION, form, successHandler, null, null, finallyHandler)
    },
    /* get bda list */
    getBDAList() {
      const self = this;
      let params = {
        search_query: self.bda_search_query,
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
          finallyHandler
      );
    },

    // yesHandler() {
    //   this.$emit("update")
    // }
  }

}
</script>