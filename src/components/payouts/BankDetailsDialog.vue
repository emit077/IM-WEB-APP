<template>
  <div class="text-center">
    <v-dialog v-model="data.flag" width="800">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Bank Details
        </v-card-title>
        <v-card-text class="py-5">
          <v-form ref="bank_details_form" lazy-validation @submit.prevent="saveBankDetails()">
            <v-row>
              <v-col md="12" sm="12">
                <v-text-field :label="$lang.ACCOUNT_HOLDER_NAME"
                  :rules="[$rules.REQUIRED_FIELD($lang.ACCOUNT_HOLDER_NAME)]" v-model="bank_data.account_holder_name"
                  dense maxlength="100"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6" sm="12" class="">
                <v-text-field :label="$lang.ACCOUNT_NUMBER" :rules="$rules.ACCOUNT_NUMBER"
                  v-model="bank_data.account_number" dense maxlength="25" type="password"></v-text-field>
              </v-col>
              <v-col md="6" sm="12" class="">
                <v-text-field v-model="confirm_account_number" :label="'Confirm ' + $lang.ACCOUNT_NUMBER"
                  :rules="[$rules.CONFIRM_ACCOUNT_NUMBER(bank_data.account_number)]" dense
                  maxlength="25"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6" sm="12" class="">
                <v-text-field v-model="bank_data.bank_name" :label="$lang.BANK_NAME"
                  :rules="[$rules.REQUIRED_FIELD($lang.BANK_NAME)]" dense maxlength="100"></v-text-field>
              </v-col>
              <v-col md="6" sm="12" class="">
                <v-text-field v-model="bank_data.ifsc_code" :label="$lang.IFSC_CODE" :rules="$rules.IFSC_CODE" dense
                  maxlength="100"></v-text-field>
              </v-col>
              <v-col md="6" sm="12" class="">
                <v-text-field v-model="bank_data.upi_id" :label="$lang.UPI_ID" dense maxlength="100"></v-text-field>
              </v-col>
            </v-row>

            <div class="text-center mt-4">
              <v-btn color="primary" rounded width="100" @click="saveBankDetails()">Save
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
    bank_data: {
      type: Object,
      required: true
    },
    tutor_table_id: {
      type: String,
      required: false
    }
  },
  data: () => ({
    confirm_account_number: null,
  }),
  methods: {
    saveBankDetails() {
      if (this.$refs.bank_details_form.validate() == false)
        return false
      const self = this
      var form = new FormData();
      form.append("account_holder_name", this.bank_data.account_holder_name)
      form.append("account_number", this.bank_data.account_number)
      form.append("bank_name", this.bank_data.bank_name)
      form.append("ifsc_code", this.bank_data.ifsc_code)
      form.append("upi_id", this.bank_data.upi_id)
      if (this.tutor_table_id) {
        form.append("tutor_table_id", this.tutor_table_id)
      }

      const successHandler = (response) => {
        if (response.data.success) {
          this.data.flag = false
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.ADD_BANK_DETAILS, form, successHandler, null, null, finallyHandler)
    },
  }

}
</script>