<template>
  <div class="text-center">
    <v-card-title class="text-h5 grey lighten-2">
      {{ dialog.action }}
    </v-card-title>

    <v-card-text class="py-5" style="min-height:150px">

      <v-combobox
          v-model="bda_table_id"
          :items="bda_list"
          label="Select Interviewer"
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

      <v-textarea
          label="Meeting URL"
          v-model="url"
          :rules="[$rules.REQUIRED_FIELD('Meeting URL')]"
          filled
          dense
      ></v-textarea>

      <v-textarea
          :label="$lang.SPECIAL_CONCERN"
          v-model="special_concern"
          :rules="[$rules.REQUIRED_FIELD($lang.SPECIAL_CONCERN)]"
          filled
          dense
      ></v-textarea>

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
    special_concern: "",
    url: "",

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
  }

}
</script>