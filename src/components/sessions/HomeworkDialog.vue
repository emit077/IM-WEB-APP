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
    <v-dialog v-model="data.flag" width="550">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ data.title }}
        </v-card-title>
        <v-card-text class="mt-4">
          <div class="mb-3">
            <label class="label-text-1 mr-2">Student Details:</label>
            <p class="font-weight-bold">{{ data.student_name }}</p>
          </div>
          <label class="label-text-1">{{ $lang.HOMEWORK_DESCRIPTION }}</label>
          <v-form ref="comment_form" lazy-validation @submit.prevent="AssignHomework()">
            <v-textarea
                v-model="data.description"
                outlined
                :label="$lang.HOMEWORK_DESCRIPTION"
                type="text"
                single-line
                dense
                class=""
                :rules="$rules.COMMENT"
            >
            </v-textarea>
            <div class="text-center">
              <v-btn depressed color="primary" outlined class="mr-2" :loading="btn_loader"
                     @click="$refs.comment_form.reset();data.flag=false">
                {{ $lang.CANCEL }}
              </v-btn>
              <v-btn depressed color="primary" class="" type="submit" :loading="btn_loader">
                {{ $lang.SUBMIT }}
              </v-btn>

            </div>
          </v-form>
        </v-card-text>

      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    btn_loader: false,
  }),
  methods: {
    /* add comment */
    AssignHomework() {
      const self = this;
      if (this.$refs.comment_form.validate() == false)
        return false
      self.btn_loader = true
      var form = new URLSearchParams();
      form.append("session_table_id", self.data.session_table_id);
      form.append("student_table_id", self.data.student_table_id);
      form.append("description", self.data.description);

      this.$refs.comment_form.reset()

      const successHandler = (response) => {
        if (response.data.success) {
          self.data.flag = false
          this.$emit("update")
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.ASSIGN_HOMEWORK, form, successHandler, null, null, finallyHandler)
    }
  }

}
</script>