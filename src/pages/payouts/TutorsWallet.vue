<style media="screen" type="text/css" scoped>
.transaction-table tr:nth-child(2n) {
  background-color: #8080801f;
}
</style>
<template>
  <div>
    <v-card class="my-12" max-width="100%">
      <v-row>
        <v-col cols="12" md="3" sm="3" class="pa-0">
          <div class="d-flex justify-center h-100 py-5 " style="align-items: center">
            <div class="text-center">
              <h4 class="text-left mb-1">{{ tutor_name }}'s Wallet</h4>
              <p class="text-h3 font-weight-bold success--text text-center mb-4">
                ₹{{ balance_amount | formateAmount }}
              </p>
              <div v-if="[$keys.ACCOUNT_SUPER_ADMIN, $keys.ACCOUNT_ADMIN].includes($store.state.user.account_type)">
                <v-btn color="primary" class="mx-1" @click="payoutBreakups">{{ $lang.WITHDRAW }}</v-btn>
                <v-btn class="mx-1" color="success" @click="OpenDeductionDialog($keys.CREDIT)" fab x-small><v-icon
                    size="20">mdi-plus</v-icon> </v-btn>
                <v-btn class="mx-1" color="error" @click="OpenDeductionDialog($keys.DEBIT)" fab x-small><v-icon
                    size="20">mdi-minus</v-icon> </v-btn>
              </div>
              <div v-if="[$keys.ACCOUNT_TEACHER].includes($store.state.user.account_type)" small>
                <v-btn color="primary" class="mx-1" @click="payoutBreakups">{{ $lang.RAISE_WITHDRAW_REQUEST }}</v-btn>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="9" sm="9" class="py-0">
          <v-btn @click="bank_details_dialog.flag = true" color="primary" class="float-right ma-3">
            {{ $lang.EDIT }}
          </v-btn>
          <v-card-title>{{ $lang.BANK_ACCOUNT_DETAILS }}</v-card-title>
          <v-divider class="mx-4"></v-divider>

          <v-card-text>
            <v-row>
              <v-col cols="6" md="4" sm="4" class="py-0 my-2">
                <div class="field-wrapper">
                  <label class="label-text-1">{{ $lang.ACCOUNT_HOLDER_NAME }} :</label>
                  <p class="text-1">{{ bank_details.account_holder_name || "-" }}</p>
                </div>
              </v-col>
              <v-col cols="6" md="4" sm="4" class="py-0 my-2">
                <div class="field-wrapper">
                  <label class="label-text-1">{{ $lang.ACCOUNT_NUMBER }} :</label>
                  <p class="text-1">{{ bank_details.account_number || "-" }}</p>
                </div>
              </v-col>
              <v-col cols="6" md="4" sm="4" class="py-0 my-2">
                <div class="field-wrapper">
                  <label class="label-text-1">{{ $lang.IFSC_CODE }} :</label>
                  <p class="text-1">{{ bank_details.ifsc_code || "-" }}</p>
                </div>
              </v-col>
              <v-col cols="6" md="4" sm="4" class="py-0 my-2">
                <div class="field-wrapper">
                  <label class="label-text-1">{{ $lang.BANK_NAME }} :</label>
                  <p class="text-1">{{ bank_details.bank_name || "-" }}</p>
                </div>
              </v-col>
              <v-col cols="6" md="4" sm="4" class="py-0 my-2">
                <div class="field-wrapper">
                  <label class="label-text-1">{{ $lang.UPI_ID }} :</label>
                  <p class="text-1">{{ bank_details.upi_id || "-" }}</p>
                </div>
              </v-col>
              <v-col cols="6" md="4" sm="4" class="py-0 my-2">
                <div class="field-wrapper">
                  <label class="label-text-1">{{ $lang.SECURITY_DEPOSIT }} :</label>
                  <div v-if="!edit_security_deposit">
                    <p class="text-1">
                      {{ security_deposit || "-" }}
                      <span @click="edit_security_deposit = !edit_security_deposit"
                        v-if="$store.state.user.account_type != $keys.ACCOUNT_TEACHER">
                        <TableEditBtn></TableEditBtn>
                      </span>
                    </p>
                  </div>
                  <div v-else>
                    <v-text-field :rules="[$rules.REQUIRED_NUMBER_FIELD($lang.SECURITY_DEPOSIT)]"
                      v-model="security_deposit" dense maxlength="5" @change="saveSecurityDeposit"></v-text-field>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="my-5 pb-0 elevation-0" max-width="100%">
      <v-simple-table v-if="transaction_list.length > 0" class="transaction-table">
        <tr>
          <th class="pa-3 fs-12 text-left">{{ $lang.DATE }}</th>
          <th class="pa-3 fs-12 text-left">{{ $lang.REMARK }}</th>
          <th class="pa-3 fs-12 text-right">{{ $lang.AMOUNT }}</th>
          <th class="pa-3 fs-12 text-right">{{ $lang.BALANCE }}</th>
        </tr>
        <tr v-for="(transaction, i) in transaction_list" :key="i">
          <td class="py-1 px-2" style="width: 100px">
            <small>{{ transaction.created }}</small>
          </td>
          <td class="py-1 px-2">
            <small>{{ transaction.remark }}</small>
          </td>
          <td class="py-1 px-2 text-right">
            <small v-if="transaction.transaction_type == $keys.CREDIT" class="success--text font-weight-bold">+ {{
                transaction.amount }}</small>
            <small v-else class="error--text">- {{ transaction.amount }}</small>
          </td>
          <td class="py-1 px-2 text-right">
            <small>{{ transaction.wallet_amount }}</small>
          </td>
        </tr>
      </v-simple-table>
      <div v-else class="text-center">
        <EmptyTable :message="'No transaction found'"></EmptyTable>
      </div>
      <div class="text-center my-3">
        <v-btn small :disabled="page_number >= total_page_count"
          @click="getTransactionList(parseInt(page_number) + 1)">{{ $lang.LOAD_MORE }}</v-btn>
      </div>
    </v-card>

    <BankDetailsDialog :data="bank_details_dialog" :bank_data="bank_details" :tutor_table_id="tutor_table_id" />
    <!--  imported components  -->
    <ConfirmPayoutDialog :data="dialog_data" @yes="getTransactionList" />
    <!--  -->
    <PayoutDedudctionDialog :data="deduction_dialog_data" @yes="getTransactionList"></PayoutDedudctionDialog>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  components: {
    BankDetailsDialog: () => import("@/components/payouts/BankDetailsDialog"),
    EmptyTable: () => import("@/components/shared/table-components/EmptyTable"),
    TableEditBtn: () => import("@/components/shared/buttons/TableEditBtn"),
    ConfirmPayoutDialog: () => import("../../components/payouts/ConfirmPayoutDialog"),
    PayoutDedudctionDialog: () => import("../../components/payouts/PayoutDedudctionDialog"),
  },
  data() {
    return {
      tutor_table_id: null,
      page_number: 1,
      total_page_count: 1,
      table_loading: false,
      transaction_list: [],
      balance_amount: 0,
      tutor_name: "",
      bank_details_dialog: {
        flag: false,
      },
      is_bank_details_exist: false,
      bank_details: {
        account_holder_name: "",
        account_number: "",
        bank_name: "",
        ifsc_code: "",
        upi_id: "",
      },
      security_deposit: "",
      edit_security_deposit: false,
      dialog_data: {
        flag: false,
        payable_amount: 0,
        security_deposit: 0,
        wallet_amount: 0,
        tutor_table_id: null,
      },
      deduction_dialog_data: {
        flag: false,
        payable_amount: 0,
        security_deposit: 0,
        wallet_amount: 0,
        tutor_table_id: null,
      }
    };
  },
  computed: mapGetters({
    payment_filter_data: "payment/getFilter",
  }),
  created() {
    if (this.$store.getters.getUsertype != this.$keys.ACCOUNT_TEACHER)
      this.tutor_table_id = this.decrypt(this.$route.params.tutor_table_id);
    this.getTransactionList(this.page_number);
  },
  methods: {
    /* fetching shipment list */
    getTransactionList(page_number) {
      const self = this;
      self.table_loading = true;
      self.page_number = page_number;
      let params = {
        page_number: page_number,
        page_length: this.$keys.PAGE_LENGTH,
      };
      if (this.$store.getters.getUsertype != this.$keys.ACCOUNT_TEACHER)
        params.tutor_table_id = this.tutor_table_id;
      const successHandler = (response) => {
        if (response.data.success) {
          self.transaction_list =
            page_number > 1
              ? self.transaction_list.concat(response.data.transaction_list)
              : response.data.transaction_list;

          self.total_page_count = response.data.total_page_count;

          self.tutor_name = response.data.tutor_name;
          self.balance_amount = response.data.balance_amount;
          self.is_bank_details_exist = response.data.is_bank_details_exist;
          self.security_deposit = response.data.security_deposit;
          if (response.data.is_bank_details_exist)
            self.bank_details = response.data.bank_data;
          else if (this.$store.getters.getUsertype == this.$keys.ACCOUNT_TEACHER)
            self.bank_details_dialog.flag = true;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.MY_WALLET,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    saveSecurityDeposit() {
      const self = this;
      var form = new FormData();
      form.append("tutor_table_id", this.tutor_table_id);
      form.append("security_deposit", this.security_deposit);
      form.append("action", "security_deposit");

      const successHandler = (response) => {
        if (response.data.success) {
          this.edit_security_deposit = false;
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false;
      };
      this.request_POST(
        self,
        this.$urls.ADD_BANK_DETAILS,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    payoutBreakups() {
      this.dialog_data.payable_amount = this.balance_amount - this.security_deposit;
      this.dialog_data.security_deposit = parseFloat(this.security_deposit);
      this.dialog_data.wallet_amount = this.balance_amount;
      this.dialog_data.tutor_table_id = this.tutor_table_id;
      this.dialog_data.flag = true;
    },
    OpenDeductionDialog(transaction_type) {
      this.deduction_dialog_data.payable_amount = this.balance_amount - this.security_deposit;
      this.deduction_dialog_data.security_deposit = parseFloat(this.security_deposit);
      this.deduction_dialog_data.wallet_amount = this.balance_amount;
      this.deduction_dialog_data.tutor_table_id = this.tutor_table_id;
      this.deduction_dialog_data.transaction_type = transaction_type;
      this.deduction_dialog_data.flag = true;
    },
  },
};
</script>
