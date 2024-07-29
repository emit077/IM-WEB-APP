<style lang="scss" scoped>
.comment-list {
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
<template>
  <div class="text-center">
    <v-dialog v-model="dialog.flag" width="550">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ $lang.COMMENTS }}
        </v-card-title>
        <section class="comment-list px-5 py-3">
          <div v-for="(obj, i) in comment_list" :key="i" class="w-100">
            <div v-if="!obj.my_comment" class="w-100">
              <div class="comment-item py-2 px-4 mb-3 ">
                <p class="fw-bold fs-14 mb-1">{{ obj.commented_by }}<small
                    class="font-weight-regular fs-10">({{ obj.account_type }})</small></p>
                <p class="fs-12 ma-0" v-html="obj.comment" style="white-space: pre-line"></p>
                <p class="text-right fs-10 mb-0"> {{ obj.created }}</p>
              </div>
            </div>
            <div v-else class="w-100">
              <div class="my-comment pa-2 mb-3">
                <p class="fw-bold fs-14 mb-1"> Me</p>
                <!--                <p class="fw-bold fs-14 mb-1">{{ obj.commented_by }}</p>-->
                <p class="fs-12 ma-0" v-html="obj.comment" style="white-space: pre-line"></p>
                <p class="text-right fs-10 mb-0"> {{ obj.created }}</p>
              </div>
            </div>
          </div>

        </section>
        <!--        <v-divider></v-divider>-->
        <v-form ref="comment_form" lazy-validation @submit.prevent="addComment()">
          <v-card-actions class="just ify-end pt-4 px-5 ">
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
                <v-btn fab small depressed color="primary" outlined class="mt-n2" type="submit" :loading="btn_loader">
                  <v-icon size="21" class="ml-1"> mdi-send</v-icon>
                </v-btn>
              </template>
            </v-text-field>
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
      required: true
    }
  },
  data: () => ({
    comment: '',
    comment_list: [{}],
    btn_loader: false,
  }),
  methods: {
    /* fetching shipment list */
    getCommentList(lead_id) {
      const self = this;
      let params = {
        lead_id: lead_id,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.comment_list = response.data.comment_list;
        }
      };
      // const finallyHandler = () => {
      // };

      self.request_GET(
          self,
          self.$urls.COMMENT_LIST,
          params,
          successHandler,
          null,
          null,
          // finallyHandler,
      )
      ;
    },
    /* add comment */
    addComment() {
      const self = this;
      if (this.$refs.comment_form.validate() == false)
        return false
      self.btn_loader = true
      var form = new URLSearchParams();
      form.append("lead_id", self.dialog.lead_id);
      form.append("comment", self.comment);

      this.$refs.comment_form.reset()

      const successHandler = (response) => {
        if (response.data.success) {
          self.getCommentList(self.dialog.lead_id)
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.COMMENT_ADD, form, successHandler, null, null, finallyHandler)
    }
  }

}
</script>