<template>
  <div>

    <v-row :class="{'px-0': $vuetify.breakpoint. smAndDown, 'px-0': $vuetify.breakpoint. mdAndUp}"
           class="mx-0  text-left" justify="start">
      <v-col class="py-1" cols="12" md="6" sm="12">
        <v-row class="mx-0 text-left mt-5" justify="start">
          <v-col class="py-1" cols="6" md="6" sm="12">
            <label class="label-text-1">{{ $lang.TICKET_ID }}:</label>
            <p class="text-1">{{ ticket_id }}</p>
          </v-col>
          <v-col class="py-1" cols="6" md="6" sm="12">
            <label class="label-text-1">{{ $lang.STATUS }}:</label>
            <p class="text-1">
              <span :class="'ticket_'+status.toLowerCase()" class="px-2">{{ status }}</span>
              <v-btn color="success" small class="ml-3" v-if="status=='Open'" @click.stop="dialog_data.flag=true">
                <b>{{ $lang.CLOSED_TICKET }}</b>
              </v-btn>
            </p>
          </v-col>
          <v-col class="py-1" cols="6" md="6" sm="6">
            <label class="label-text-1">{{ $lang.RAISED_ON }}:</label>
            <p class="text-1">{{ raised_on }}</p>
          </v-col>
          <v-col class="py-1" cols="6" md="6" sm="6">
            <label class="label-text-1">{{ $lang.CLOSED_ON }}:</label>
            <p class="text-1">{{ closed_on }}</p>
          </v-col>
          <v-col class="py-1" cols="12" md="6" sm="12">
            <label class="label-text-1">{{ $lang.RAISED_BY }}:</label>
            <p class="text-1">{{ raised_by }}</p>
            <p class="text-1">{{ raised_by_mobile }}</p>
          </v-col>
          <v-col class="py-1" cols="12" md="6" sm="12">
            <label class="label-text-1">{{ $lang.CLOSED_BY }}:</label>
            <p class="text-1">{{ closed_by }}</p>
            <p class="text-1">{{ closed_by_mobile }}</p>
          </v-col>


          <v-col class="py-1" cols="6" md="6" sm="12">
            <label class="label-text-1">{{ $lang.CATEGORY }}:</label>
            <p class="text-1">{{ category }}</p>
          </v-col>
          <v-col class="py-1" cols="12" md="12" sm="12">
            <label class="label-text-1">{{ $lang.DESCRIPTION }}:</label>
            <p class="text-1">{{ description }}</p>
          </v-col>
        </v-row>

      </v-col>
      <v-col class="py-1" cols="12" md="6" sm="12">
        <v-row class="mx-0  text-left" justify="start" :class="{'mt-3': $vuetify.breakpoint. smAndDown, 'mt-0': $vuetify.breakpoint. mdAndUp}">
          <v-col class="px-0 " cols="12" md="12" sm="12">
            <div class="comment-section">
              <div class="comments-header"> Comments</div>
              <div class="comment-box px-2">
                <div v-for="(obj, i) in comment_list" :key="i" class="w-100">
                  <div v-if="!obj.my_comment" class="w-100">
                    <div class="comment-item py-2 px-4 mb-3 ">
                      <p class="fw-bold fs-14 mb-1">{{ obj.commented_by }}<small
                          class="font-weight-regular fs-10">({{ obj.account_type }})</small></p>
                      <p class="fs-12 ma-0" v-html="obj.comment_text" style="white-space: pre-line"></p>
                      <p class="text-right fs-10 mb-0"> {{ obj.created }}</p>
                    </div>
                  </div>
                  <div v-else class="w-100 bg-blue lighten-4">
                    <div class="my-comment pa-2 mb-3">
                      <p class="fw-bold fs-14 mb-1"> Me</p>
                      <p class="fs-12 ma-0" v-html="obj.comment_text" style="white-space: pre-line"></p>
                      <p class="text-right fs-10 mb-0"> {{ obj.created }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <v-form ref="comment_form" lazy-validation @submit.prevent="addComment()">
                <v-card-actions class="justify-end px-5 ">
                  <v-text-field
                      v-model="comment"
                      outlined
                      label="Write your comment"
                      type="text"
                      single-line
                      dense
                      class="mb-n2"
                      :rules="$rules.COMMENT"
                  >
                    <template v-slot:append-outer>
                      <v-btn fab small depressed color="primary" outlined class="mt-n2" type="submit"
                             :loading="btn_loader">
                        <v-icon size="21" class="ml-1"> mdi-send</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-card-actions>
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <ConfirmationDialog :data="dialog_data" @yes="closeTicket"></ConfirmationDialog>
  </div>
</template>
<style lang="scss" scoped>
.comment-section {
  border: solid 1px lightgrey;
  border-radius: 10px;
}

.comments-header {
  background-color: #32345F;
  color: #FFFFFF;
  padding: 10px 5px;
  font-size: 18px;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: solid 1px #32345F;
  margin-bottom: 5px;
}

.comment-box {
  height: 400px;
  overflow-y: scroll;


  .comment-item {
    max-width: 80%;
    width: max-content;
    min-width: 40%;
    background-color: #FBEE0552;
    border-radius: 8px;
  }

  .my-comment {
    width: max-content;
    max-width: 80%;
    min-width: 40%;
    display: block;
    background-color: #130DD724;
    border-radius: 8px;
    margin-left: auto;
    margin-right: 0;
  }
}
</style>
<script>

export default {
  components: {
    ConfirmationDialog: () => import("@/components/shared/dialogs/ConfirmationDialog"),
  },
  data() {
    return {
      ticket_table_id: null,
      ticket_id: "-",
      status: "-",
      raised_on: "-",
      closed_on: "-",
      raised_by: "-",
      raised_by_mobile: "-",
      closed_by: "-",
      closed_by_mobile: "-",
      category: "-",
      description: "-",
      comment_list: [],
      comment: "",
      btn_loader: false,
      dialog_data: {
        flag: false,
        // title: "Are you sure?",
        title: "Are you sure to close this ticket",
      }
    }
  },
  created() {
    if (this.$route.params.ticket_table_id) {
      this.ticket_table_id = this.decrypt(this.$route.params.ticket_table_id)
      this.getTicketDetails()
    }
  },
  methods: {
    getTicketDetails() {
      const self = this;
      self.$store.dispatch("setPageLoader", true);
      let params = {
        ticket_table_id: this.ticket_table_id,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.ticket_id = response.data.ticket_id
          self.status = response.data.status
          self.raised_on = response.data.created
          self.closed_on = response.data.closed_on || '-'
          self.raised_by = response.data.raised_by
          self.raised_by_mobile = response.data.raised_by_mobile
          self.closed_by = response.data.closed_by
          self.closed_by_mobile = response.data.closed_by_mobile
          self.category = response.data.category
          self.description = response.data.description
          self.comment_list = response.data.comment_list
        }
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };
      self.request_GET(
          self,
          self.$urls.DETAILS_TICKET,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
      );
    },
    /* add comment */
    addComment() {
      const self = this;
      if (this.$refs.comment_form.validate() == false)
        return false
      self.btn_loader = true
      var form = new URLSearchParams();
      form.append("ticket_table_id", self.ticket_table_id);
      form.append("comment", self.comment);
      let comment_obj = {
        'my_comment': true,
        'created': "just now",
        'comment_text': self.comment
      }
      this.$refs.comment_form.reset()

      const successHandler = (response) => {
        if (response.data.success) {
          this.comment_list.push(comment_obj)
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.ADD_COMMENT, form, successHandler, null, null, finallyHandler)
    },
    /* close  ticket */
    closeTicket() {
      const self = this;
      self.$store.dispatch("setPageLoader", true);
      var form = new URLSearchParams();
      form.append("ticket_table_id", self.ticket_table_id);
      const successHandler = (response) => {
        if (response.data.success) {
          self.dialog_data.flag = false
          self.getTicketDetails()
        }
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };
      this.request_POST(self, this.$urls.CLOSE_TICKET, form, successHandler, null, null, finallyHandler)
    }
  }
}
</script>