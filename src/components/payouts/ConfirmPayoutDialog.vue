<template>
  <div class="text-center">
    <v-dialog v-model="data.flag" width="450" persistent>
      <v-card v-if="is_success">
        <div class="text-center pt-8">
          <img src="@/assets/others/success-icon.svg" width="100" alt="">
        </div>
        <v-card-text class="py-5 text-center">
          <h2 class="font-weight-bold success--text">Success</h2>
        </v-card-text>
        <!--        <v-divider></v-divider>-->
        <v-card-actions class="just ify-end py-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined rounded width="100" @click=" $emit('yes'); data.flag = false">{{ $lang.CLOSE
            }}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title class="text-h5 grey lighten-2 flex-column-reverse">
          Payout Breakup
        </v-card-title>
        <v-card-text class="py-5">
          <v-simple-table>
            <tr>
              <td class="py-1">Wallet Amount</td>
              <td class="text-right py-1">{{ data.wallet_amount.toFixed(2) }}</td>
            </tr>
            <tr>
              <td class="py-1">Security Deposit</td>
              <td class="text-right py-1"><small>( - )</small> {{ data.security_deposit.toFixed(2) }}</td>
            </tr>
            <tr>
              <td colspan="2">
                <v-divider></v-divider>
              </td>
            </tr>
            <tr style="border-top: 1px solid green">
              <td class="py-1">Withdrawable Amount</td>
              <td class="text-right fw-bold py-1">{{ data.payable_amount.toFixed(2) }}</td>
            </tr>
          </v-simple-table>
          <div class="text-center mt-5" v-if="data.payable_amount < $keys.MINIMUM_WITHDRAW_AMOUNT">
            <span class="error--text">
              Minimum Withdraw amount must me grater than ₹{{ $keys.MINIMUM_WITHDRAW_AMOUNT }}
            </span>
          </div>
        </v-card-text>
        <!--        <v-divider></v-divider>-->
        <v-card-actions class="just ify-end py-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined rounded width="100" @click="data.flag = false">Cancel
          </v-btn>
          <!-- for tutor -->
          <v-btn v-if="[$keys.ACCOUNT_TEACHER].includes($store.state.user.account_type)" color="primary" rounded
            width="100" @click="raiseWithdrawRequest()" :loading="btn_loader"
            :disabled="data.payable_amount < $keys.MINIMUM_WITHDRAW_AMOUNT">Withdraw
          </v-btn>
          <!-- for admin/super admin -->
          <v-btn v-else color="primary" rounded width="100" @click="withdrawAmount()" :loading="btn_loader"
            :disabled="data.payable_amount < $keys.MINIMUM_WITHDRAW_AMOUNT">Withdraw
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
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
    is_success: false,
    btn_loader: false,
  }),
  methods: {
    withdrawAmount() {
      const self = this
      self.btn_loader = true
      var form = new FormData();
      form.append("tutor_table_id", this.data.tutor_table_id)
      const successHandler = (response) => {
        if (response.data.success) {
          self.btn_loader = false
          self.is_success = true
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.CREATE_PAYOUT, form, successHandler, null, null, finallyHandler)
    },
    raiseWithdrawRequest() {
      const self = this
      self.btn_loader = true
      var form = new FormData();
      const successHandler = (response) => {
        if (response.data.success) {
          self.showSnakeBar('success', "Withdraw requirest has been raised")
          self.btn_loader = false
          self.is_success = false
          self.data.flag = false
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.RAISE_WITHDRAWAL_REQUEST, form, successHandler, null, null, finallyHandler)
    },
  }

}
</script>