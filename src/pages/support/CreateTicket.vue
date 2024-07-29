<template>
  <div>
    <v-form ref="create_ticket_form" lazy-validation @submit.prevent="createNewTicket()">
      <v-row class="custom-form" justify="start">
        <v-col class="px-0" cols="12" md="7">
          <v-row class="mx-0 pa-0">
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.CATEGORY }}</label>
              <v-select
                  v-model="form.category"
                  :items="category_options"
                  :placeholder="$lang.CATEGORY"
                  :rules="[$rules.REQUIRED_FIELD($lang.CATEGORY)]"
                  item-text="category"
                  item-value="id"
                  clearable
                  dense
                  outlined
                  single-line
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="mx-0 pa-0">
            <v-col class="py-0" cols="12" md="6">
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
          </v-row>
          <v-row class="mx-0 pa-0">
            <v-col class="py-0 text-center" cols="12" md="6">
              <v-btn color="primary font-weight-bold px-8" height="40" rounded type="submit" :loading="btn_loading">
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
      category_options: [],
      form: {
        category: null,
        description: ""
      },
    }
  },
  created() {
    // /*  show and hide the back btn*/
    // if (this.$route.name == "edit_subscription_plan") {
    //   this.subscription_plan_id = this.decrypt(this.$route.params.id)
    //   this.is_edit = true
    //   this.getGradeList()
    // }
    this.getTicketDetails()
  },
  methods: {
    /* fetch plan details */
    getTicketDetails() {
      this.$store.dispatch('setPageLoader', true)
      const self = this
      let params = {};
      const successHandler = (response) => {
        if (response.data.success) {
          self.category_options = response.data.category_list
        }
      };
      const finallyHandler = () => {
        this.$store.dispatch('setPageLoader', false)
      };
      self.request_GET(self, self.$urls.TICKET_CATEGORY, params, successHandler, null, null, finallyHandler)
    },
    /* create_ticket_form*/
    createNewTicket() {
      const self = this
      if (this.$refs.create_ticket_form.validate() == false)
        return false

      self.$store.dispatch("setPageLoader", true);

      var form = new FormData();
      form.append("category_table_id", self.form.category);
      form.append("description", self.form.description);

      const successHandler = (response) => {
        if (response.data.success)
          this.$router.push({name: "support_ticket"})
      };
      const finallyHandler = () => {
        self.btn_loading = false
        self.$store.dispatch("setPageLoader", false);
      };
      this.request_POST(self, this.$urls.RAISE_TICKET, form, successHandler, null, null, finallyHandler)
    }
  }
}
</script>