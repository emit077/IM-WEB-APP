<style scoped lang="scss">
.student_test_table tr th {
  background-color: lightgrey;
  padding: 5px 8px;
  text-align: left;
}

.student_test_table tr td {
  padding: 5px 8px;
  text-align: left;
}

</style>
<template>
  <div class="text-center">
    <v-dialog v-model="data.flag" width="800">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Unit Test Data
        </v-card-title>
        <v-card-text class="py-5">
          <v-form ref="unit_test_details_form" lazy-validation @submit.prevent="startUnitTest()">
            <v-row>
              <v-col md="6" sm="12">
                <v-select
                    :label="$lang.SUBJECT"
                    :rules="[$rules.REQUIRED_FIELD($lang.SUBJECT)]"
                    v-model="data.subject"
                    :items="data.subject_list"
                    item-text="subject_name"
                    item-value="id"
                    dense
                    maxlength="100"
                ></v-select>
                {{data.subject}}
              </v-col>
              <v-col md="6" sm="12">
                <v-text-field
                    :label="$lang.MARKS"
                    :rules="[$rules.REQUIRED_NUMBER_FIELD($lang.MARKS)]"
                    v-model="data.total_marks"
                    dense
                    maxlength="4"
                ></v-text-field>
              </v-col>
            </v-row>

            <div>
              <v-simple-table class="student_test_table">
                <tr>
                  <th>Student</th>
                  <th>Total Marks</th>
                  <th style="width: 50px">Obtained Marks</th>
                  <th></th>
                </tr>
                <tr v-for=" (student,i) in data.student_list" :key="i">
                  <td>{{ student.name }}</td>
                  <td>{{ data.total_marks }}</td>
                  <td>
                    <v-text-field
                        :rules="[$rules.NUMBER_FIELD($lang.MARKS)]"
                        v-model="student.obtained_marks"
                        dense
                        maxlength="4"
                        hide-details
                        v-if="$store.state.user.account_type==$keys.ACCOUNT_TEACHER"
                    ></v-text-field>
                    <span v-else>{{ student.obtained_marks || '-' }}</span>
                  </td>
                  <td class="text-right">
                    <v-btn fab x-small text color="error" @click="removeStudent(i)" v-if="data.student_list.length>1">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </td>
                </tr>
                <tr>
                  <td colspan="4" v-if="unselected_student.length>0">
                    <v-btn block color="primary" @click="selectStudent()">
                      <v-icon>mdi-plus</v-icon>
                      Add More
                    </v-btn>
                  </td>
                </tr>
              </v-simple-table>
            </div>

            <div class="text-center mt-4">
              <v-btn
                  color="primary"
                  rounded
                  width="100"
                  type="submit"
              >Save
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
    },
    batch_table_id: {
      type: String,
    }
  },
  data: () => ({
    confirm_account_number: null,
    bank_data: {},
    unselected_student: []
  }),
  methods: {
    startUnitTest() {
      if (this.$refs.unit_test_details_form.validate() == false)
        return false
      const self = this
      var form = new FormData();
      form.append("batch_table_id", this.batch_table_id)
      form.append("student_list", JSON.stringify(this.data.student_list))
      form.append("subject", this.data.subject)
      form.append("total_marks", this.data.total_marks)
      form.append("action", this.data.action)
      if (this.data.action != 'Create')
        form.append("test_number", this.data.test_number)

      const successHandler = (response) => {
        if (response.data.success) {
          this.data.flag = false
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.START_UNIT_TEST, form, successHandler, null, null, finallyHandler)
    },
    removeStudent(index) {
      this.unselected_student.push(this.data.student_list[index])
      this.data.student_list.splice(index, 1)
    },
    selectStudent() {
      this.data.student_list.push(this.unselected_student[0])
      this.unselected_student.splice(0, 1)
    }
  }

}
</script>