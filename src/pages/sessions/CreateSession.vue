<style lang="scss">
.h-0 {
  height: 0px;
}

.subscription_table tr td {
  padding: 0px 10px;
}

.price-selection-block {
  border: solid 1px lightgrey;
  border-radius: 10px;
}

.selected-price-selection-block {
  background-color: #32345F;
  border-radius: 10px;
  color: yellow;

  .label-text-1 {
    color: white;
  }
}
</style>
<template>
  <div>
    <v-form ref="session_form" lazy-validation @submit.prevent="createSession()">
      <v-row class="custom-form" justify="start">
        <v-col class="px-0" cols="12" md="7">
          <v-row class="mx-0 pa-0">
            <v-col class="py-0" cols="12" md="12">
              <label class="label-text-1">{{ $lang.STUDENT }} </label>
              <v-select
                  v-model="form.batch_details"
                  :items="batch_list"
                  :placeholder="$lang.BATCH"
                  :rules="[$rules.REQUIRED_FIELD($lang.BATCH)]"
                  clearable
                  @focus="batchAutocomplete"
                  dense
                  outlined
                  single-line
                  @change="form.student_list=form.batch_details.student_list; student_list=form.batch_details.student_list"
              >
                <template v-slot:selection="data">
                  <span>{{ data.item.batch_id }}</span>
                </template>

                <template v-slot:item="{ index, item }">
                  <div class="py-3">
                    <p class="fs-12 fw-bold">{{ item.batch_id }}</p>
                    <p class="fs-12"><span v-for="(student,i) in item.student_list" :key="i">{{ student.name }} <span
                        v-if="(i+1)<item.student_list.length">, </span> </span></p>
                  </div>
                </template>

              </v-select>
            </v-col>
            <v-col class=" py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.STUDENT }}s </label>
              <v-combobox
                  v-model="form.student_list"
                  :items="student_list"
                  item-text="name"
                  item-value="id"
                  placeholder="Select Students"
                  :rules="[$rules.REQUIRED_LIST_FIELD($lang.STUDENT)]"
                  dense
                  outlined
                  single-line
                  clearable
                  multiple
                  chips
              >
                <template v-slot:item="{ index, item }">
                  <div>
                    <p class="fs-12 fw-bold">{{ item.name }}</p>
                    <p class="fs-12">{{ item.mobile }}</p>
                  </div>
                </template>
              </v-combobox>
            </v-col>
            <v-col class="py-0 " cols="12" md="6">
              <label class="label-text-1"> {{ $lang.SUBJECTS }} </label>
              <v-select
                  v-model="form.subject_id"
                  :items="subject_list"
                  :placeholder="$lang.SUBJECTS"
                  :rules="[$rules.REQUIRED_LIST_FIELD($lang.SUBJECTS)]"
                  class="mt-1"
                  dense
                  item-text="subject_name"
                  item-value="id"
                  maxlength="80"
                  outlined
                  single-line

                  @focus="getSubjectList"
              ></v-select>
            </v-col>
            <v-col class="py-0 " cols="12" md="12">
              <label class="label-text-1"> {{ $lang.TOPICS_COVERED }}</label>
              <v-textarea
                  v-model="form.topic_cover"
                  :placeholder="$lang.TOPICS_COVERED"
                  :rules="[$rules.REQUIRED_FIELD($lang.TOPICS_COVERED)]"
                  class="mt-1"
                  dense
                  outlined
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
      student_list: [],
      batch_list: [],
      subject_list: [],
      form: {
        batch_details: null,
        subject_id: null,
        topic_cover: "",
        student_list: [],
      },
    }
  },
  created() {
    /*  show and hide the back btn*/
    // this.studentAutocomplete(true, "")
    this.getSubjectList()
  },
  methods: {
    batchAutocomplete() {
      const self = this;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.batch_list = response.data.batch_list;
        }
      };
      const finallyHandler = () => {
      };

      self.request_GET(
          self,
          self.$urls.BATCH_LIST,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
      );
    },
    /* get class and subjects list*/
    getSubjectList() {
      const self = this;
      let params = {}
      if (this.form.class_id)
        params.class_id = this.form.class_id
      const successHandler = (response) => {
        if (response.data.success) {
          self.subject_list = response.data.subject_list
        }
      };
      const finallyHandler = () => {
      };

      self.request_GET(
          self,
          self.$urls.CLASS_LIST,
          params,
          successHandler,
          null,
          null,
          finallyHandler
      );
    },
    /* get class details */
    createSession() {
      const self = this
      if (this.$refs.session_form.validate() == false)
        return false

      self.btn_loader = true
      var form = new FormData();
      let student_table_id_list = this.form.student_list.map(x => x.id);
      form.append("student_table_id_list", JSON.stringify(student_table_id_list));
      form.append("batch_table_id", this.form.batch_details.id);
      form.append("subject_table_id", self.form.subject_id);
      form.append("description", self.form.topic_cover);

      const successHandler = (response) => {
        if (response.data.success) {
          this.$refs.session_form.reset()
          this.$router.push({name: 'session_list'})
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.SESSION_START, form, successHandler, null, null, finallyHandler)
    },

  }
}
</script>