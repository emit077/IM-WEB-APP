<style media="screen" type="text/css"></style>
<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search_query"
          :placeholder="$lang.PAYOUT_SEARCH"
          append-icon="mdi-magnify"
          dense
          hide-details
          outlined
          single-line
          @keyup="getWalletList"
        ></v-text-field>
      </v-col>
      <v-col class="" cols="3" md="2"> </v-col>
    </v-row>
    <div>
      <v-data-table
        :disable-sort="true"
        :headers="headers"
        :hide-default-footer="true"
        :items="tutor_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        class="elevation-1 custom-header-bg custom-table-body"
        item-key="shipment_id"
      >
        <template v-slot:[`item.name`]="{ item }">
          <div>
            <p class="font-weight-bold">{{ item.tutor_name }}</p>
            <p>{{ item.tutor_mobile }}</p>
          </div>
        </template>
        <!-- action btn -->
        <template v-slot:[`item.action`]="{ item }">
          <!-- <v-btn small color="primary" :disabled="item.wallet_amount <= item.security_deposit ? true : false"
                        @click="payoutBreakups(item)">
                        Withdraw
                    </v-btn> -->

          <a
            class="d-inline"
            :href="
              $router.resolve({
                name: 'tutors-wallet',
                params: { tutor_table_id: encrypt(item.tutor_table_id) },
              }).href
            "
          >
            <TableDetailBtn></TableDetailBtn>
          </a>
        </template>
        <!-- action btns -->
      </v-data-table>

      <v-pagination
        v-model="page_number"
        :length="total_page_count"
        :total-visible="7"
        class="custom-pagination"
        @input="getWalletList"
      ></v-pagination>
    </div>

    <!--  imported components  -->
    <ConfirmPayoutDialog :data="dialog_data" @yes="getWalletList"></ConfirmPayoutDialog>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  components: {
    ConfirmPayoutDialog: () => import("../../components/payouts/ConfirmPayoutDialog"),
    TableDetailBtn: () => import("../../components/shared/buttons/TableDetailBtn"),
  },
  data() {
    return {
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      tutor_list: [],
      search_query: "",
      headers: [
        { text: "Tutor ID", align: "start", value: "tutor_id", width: "120px" },
        { text: "Tutor info", align: "start", value: "name" },
        { text: "City", align: "start", value: "city" },
        { text: "Wallet Amount", value: "wallet_amount", align: "end" },
        { text: "", value: "action", align: "center", width: "80px" },
      ],
      dialog_data: {
        flag: false,
        payable_amount: 0,
        security_deposit: 0,
        wallet_amount: 0,
        tutor_table_id: null,
      },
    };
  },
  computed: mapGetters({
    tutor_filter_data: "tutor/getFilter",
  }),
  created() {
    this.getWalletList();
  },
  methods: {
    /* fetching shipment list */
    getWalletList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.tutor_list = response.data.tutor_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.LIST_WALLET,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
    },
    payoutBreakups(tutor) {
      this.dialog_data.payable_amount = tutor.wallet_amount - tutor.security_deposit;
      this.dialog_data.security_deposit = tutor.security_deposit;
      this.dialog_data.wallet_amount = tutor.wallet_amount;
      this.dialog_data.tutor_table_id = tutor.tutor_table_id;
      this.dialog_data.flag = true;
    },
  },
};
</script>
