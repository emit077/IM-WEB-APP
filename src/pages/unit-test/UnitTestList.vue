<style media="screen" type="text/css">
</style>
<template>
  <div>

    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <!--        <v-text-field-->
        <!--            v-model="search_query"-->
        <!--            :placeholder="$lang.UNIT_TEST_SEARCH"-->
        <!--            append-icon="mdi-magnify"-->
        <!--            dense-->
        <!--            hide-details-->
        <!--            outlined-->
        <!--            rounded-->
        <!--            single-line-->
        <!--            @keyup="getTestRecords"-->
        <!--        ></v-text-field>-->
      </v-col>
      <v-col cols="12" md="6">
        <div class="text-right" v-if="$store.state.user.account_type==$keys.ACCOUNT_TEACHER">
          <v-btn small color="primary" @click="startUnitTest('Create')">
            <span class="fc-secondary">Start Test</span>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <div>
      <v-data-table
          :disable-sort="true"
          :headers="headers"
          :hide-default-footer="true"
          :items="test_list"
          :items-per-page="$keys.PAGE_LENGTH"
          :loading="table_loading"
          group-by="test_number"
          class="elevation-1 custom-header-bg custom-table-body"
      >
        <template v-slot:item.student="{ item }">
          <div>
            <p class="font-weight-bold">{{ item.student_name }}</p>
            <p>{{ item.student_mobile }}</p>
          </div>
        </template>
        <template v-slot:item.tutor="{ item }">
          <div>
            <p class="font-weight-bold">{{ item.tutor_name }}</p>
            <p>{{ item.tutor_mobile }}</p>
          </div>
        </template>
        <template v-slot:item.obtained_marks="{ item }">
          <div>
            <p v-if="!item.edit_marks">{{ item.obtained_marks }}
              <span v-if="$store.state.user.account_type==$keys.ACCOUNT_TEACHER" @click="item.edit_marks=true"><TableEditBtn></TableEditBtn>
              </span>
            </p>
            <div v-else>
              <v-text-field
                  :rules="[$rules.NUMBER_FIELD($lang.MARKS)]"
                  v-model="item.obtained_marks"
                  dense
                  maxlength="4"
                  hide-details
                  v-if="$store.state.user.account_type==$keys.ACCOUNT_TEACHER"
                  @change="updateStudentMarks(item)"
              ></v-text-field>

            </div>

          </div>
        </template>
        <!--        <template v-slot:item.action="{ item }">-->
        <!--          <div class="d-inline" @click="startUnitTest('Update',item)"-->
        <!--              >-->
        <TableEditBtn></TableEditBtn>
        <!--          </div>-->
        <!--        </template>-->
      </v-data-table>

      <v-pagination
          v-model="page_number"
          :length="total_page_count"
          :total-visible="7"
          class="custom-pagination"
          @input="getTestRecords"
      ></v-pagination>
    </div>

    <CreateTestDialog :data="dialog_data" :batch_table_id="batch_table_id"></CreateTestDialog>

  </div>
</template>

<script type="text/javascript">


export default {
  components: {
    CreateTestDialog: () => import("../../components/batch/CreateTestDialog"),
    TableEditBtn: () => import("@/components/shared/buttons/TableEditBtn"),
  },
  data() {
    return {
      batch_table_id: null,
      test_list: [],
      headers: [
        {text: "Test number", align: "start", value: "test_number"},
        {text: "Date", align: "start", value: "test_date"},
        {text: "Student info", align: "start", value: "student"},
        {text: "Tutor info", align: "start", value: "tutor"},
        {text: "Subject", value: "subject_name"},
        {text: "Total Marks", value: "total_marks"},
        {text: "Obtained Marks", value: "obtained_marks", width: '100px'},
        {text: "", value: "action", align: "end", width: "150px"},
      ],
      table_loading: false,
      total_page_count: 1,
      page_number: 1,
      search_query: "",
      dialog_data: {
        flag: false,
        student_list: [],
        total_marks: null,
        subject: "",
        subject_list: [],
        action: "Create"
      }
    };
  },
  created() {
    if (this.$route.params.batch_table_id) {
      this.batch_table_id = this.decrypt(this.$route.params.batch_table_id)
      this.getTestRecords()
    }
  },
  methods: {
    getTestRecords() {
      const self = this;
      // self.table_loading = true;
      let params = {
        batch_table_id: this.batch_table_id,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.test_list = response.data.test_list
          self.test_list = self.test_list.map(obj => ({...obj, edit_marks: false}))
          self.table_loading = false
        }
      };
      const finallyHandler = () => {
        self.table_loading = false
      };
      self.request_GET(
          self,
          self.$urls.UNIT_TEST_LIST,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
      );
    },
    startUnitTest(action = 'Create') {
      this.dialog_data.total_marks = null
      this.dialog_data.subject = null
      this.dialog_data.flag = true
    },
    updateStudentMarks(item) {
      const self = this
      var form = new FormData();
      form.append("batch_table_id", this.batch_table_id)
      form.append("student_table_id", item.student_table_id)
      form.append("obtained_marks", item.obtained_marks)
      form.append("action", "Update")
      form.append("test_number", item.test_number)

      const successHandler = (response) => {
        if (response.data.success) {
          this.showSnakeBar('success', "Marks Updated")
          item.edit_marks = false
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.START_UNIT_TEST, form, successHandler, null, null, finallyHandler)
    },
  },
};
</script>