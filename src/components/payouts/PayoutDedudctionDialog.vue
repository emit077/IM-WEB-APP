<style lang="scss">
.right-input .v-text-field__slot input {
  text-align: right;
  font-size: 14px;
}

.right-input .v-input__append-outer {
  margin: 7px 0px 0px 0px;
  font-size: 14px;
}
</style>
<template>
  <div class="text-center">
    <v-dialog v-model="data.flag" width="450" persistent>
      <v-card v-if="is_confirmation">
        <div class="text-center pt-8">
          <img src="@/assets/others/warning-icon.svg" width="100" alt="">
        </div>
        <v-card-text class="py-5 text-center">
          <h2 class="font-weight-bold warning--text">Are you sure?</h2>

          <p class="mt-5 font-weight-bold" v-html="warning_msg"></p>

          <p class="mt-4">Note: This action cannot be undone later.</p>

        </v-card-text>
        <!--        <v-divider></v-divider>-->
        <v-card-actions class="just ify-end py-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined rounded width="100" @click="is_confirmation = false">{{ $lang.BACK }}</v-btn>
          <v-btn color="primary" outlined rounded width="100" @click="updateWalletBalance()">{{ $lang.CONTINUE
            }}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title class="text-h5 grey lighten-2 flex-column-reverse">
          {{ data.transaction_type }} Amount
        </v-card-title>
        <v-form ref="wallet_update_form" lazy-validation>
          <v-card-text class="py-5">
            <v-simple-table>
              <tr>
                <td class="py-1">Current Balance</td>
                <td class="text-right py-1">{{ data.wallet_amount.toFixed(2) }}</td>
              </tr>
              <tr>
                <td class="py-1">Security Deposit</td>
                <td class="text-right py-1"><small>( - )</small> {{ data.security_deposit.toFixed(2) }}</td>
              </tr>
              <tr>
                <td class="py-1">{{ data.transaction_type }} Details <br>
                  <v-text-field v-model="remark" placeholder="Remark" dense hide-details single-line
                    :rules="[$rules.REQUIRED_FIELD('')]" class="--input-font" style="text-align:right fs-14">
                  </v-text-field>
                </td>
                <td class="text-right py-1">
                  <v-text-field v-model="amount" placeholder="XXXXX" dense hide-details single-line maxlength="5"
                    :rules="[$rules.REQUIRED_NUMBER_FIELD('')]" style="width: 70px; text-align:right"
                    class="float-right mt-6 right-input">
                    <template v-slot:append-outer>
                      .00
                    </template>
                  </v-text-field>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <v-divider class="mt-2"></v-divider>
                </td>
              </tr>
              <tr style="border-top: 1px solid green">
                <td class="py-1">Wallet Balance</td>
                <td v-if="data.transaction_type == $keys.DEBIT" class="text-right fw-bold py-1">{{
      (parseFloat(data.wallet_amount) -
        parseFloat(data.security_deposit || 0) - parseFloat(amount || 0)).toFixed(2) }}</td>
                <td v-else class="text-right fw-bold py-1">{{ (parseFloat(data.wallet_amount) -
      parseFloat(data.security_deposit || 0)
      + parseFloat(amount || 0)).toFixed(2) }}</td>
              </tr>
            </v-simple-table>

          </v-card-text>
          <!-- v-divider></v-divider>-->
          <v-card-actions class="just ify-end py-4">
            <v-spacer></v-spacer>
            <v-btn color="primary" outlined rounded width="100"
              @click="$refs.wallet_update_form.reset(); data.flag = false">Cancel</v-btn>
            <!-- for admin/super admin -->
            <v-btn color="primary" rounded width="100" @click="confimeUpdate()" :loading="btn_loader">{{
              $lang.CONTINUE}}
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    is_confirmation: false,
    btn_loader: false,
    amount: "",
    remark: "",
    warning_msg: "",
  }),
  methods: {
    confimeUpdate() {
      if (this.$refs.wallet_update_form.validate() == false) return false;
      this.is_confirmation = true
      this.warning_msg = `Are you sure you want to ${this.data.transaction_type} the user's wallet with ₹${this.amount} `

    },
    updateWalletBalance() {
      const self = this
      self.btn_loader = true
      var form = new FormData();
      form.append("tutor_table_id", this.data.tutor_table_id)
      form.append("amount", this.amount)
      form.append("remark", this.remark)
      form.append("transaction_type", this.data.transaction_type)
      const successHandler = (response) => {
        if (response.data.success) {
          self.showSnakeBar('success', `Wallet successfully ${this.data.transaction_type}ed.`)
          this.$emit("yes")
          this.is_confirmation = false
          self.btn_loader = false
          self.data.flag = false
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.UPDATE_WALLET_AMOUNT, form, successHandler, null, null, finallyHandler)
    },
  }

}
</script>