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
          @keyup="gatRequestList"
        ></v-text-field>
      </v-col>
      <v-col class="" cols="3" md="2"> </v-col>
    </v-row>
    <div>
      <v-data-table
        :disable-sort="true"
        :headers="headers"
        :hide-default-footer="true"
        :items="request_list"
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

        <!-- payment status -->
        <template v-slot:[`item.request_status`]="{ item }">
          <span :class="'payout-' + item.request_status.toLowerCase()" class="px-2">{{
            item.request_status
          }}</span>
        </template>
        <!-- payment status end -->

        <!-- action btn -->
        <template v-slot:[`item.action`]="{ index, item }">
          <div
            v-if="
              item.request_status == $keys.PAYOUT_STATUS_PENDING &&
              [$keys.ACCOUNT_SUPER_ADMIN, $keys.ACCOUNT_ADMIN].includes(
                $store.state.user.account_type
              )
            "
          >
            <v-btn
              small
              color="success"
              class="mx-1"
              @click="openDialog(item, index, $keys.PAYOUT_STATUS_APPROVED)"
              >{{ $lang.APPROVE }}</v-btn
            >
            <v-btn
              small
              class="mx-1"
              color="error"
              @click="openDialog(item, index, $keys.PAYOUT_STATUS_REJECTED)"
              >{{ $lang.REJECT }}</v-btn
            >
          </div>
        </template>
        <!-- action btns -->
      </v-data-table>

      <v-pagination
        v-model="page_number"
        :length="total_page_count"
        :total-visible="7"
        class="custom-pagination"
        @input="gatRequestList"
      ></v-pagination>
    </div>

    <!--  imported components  -->
    <ConfirmationDialog :data="dialog_data" @yes="processRequest" />
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";
export default {
  components: {
    ConfirmationDialog: () => import("@/components/shared/dialogs/ConfirmationDialog"),
    TableDetailBtn: () => import("../../components/shared/buttons/TableDetailBtn"),
  },
  data() {
    return {
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      request_list: [],
      search_query: "",
      headers: [
        { text: "Request ID", align: "start", value: "request_id", width: "120px" },
        { text: "Tutor info", align: "start", value: "name" },
        { text: "date", align: "start", value: "created" },
        { text: "Amount", value: "amount", align: "end" },
        { text: "Status", value: "request_status", align: "center", width: "120px" },
        { text: "", value: "action", align: "center", width: "180px" },
      ],
      dialog_data: {
        flag: false,
        title: "",
        message: "",
        payment_table_id: null,
      },
    };
  },
  computed: mapGetters({
    tutor_filter_data: "tutor/getFilter",
  }),
  created() {
    this.gatRequestList();
    if ([this.$keys.ACCOUNT_TEACHER].includes(this.$store.state.user.account_type))
      this.headers = this.headers.slice(0, 4);
  },
  methods: {
    /* fetching shipment list */
    gatRequestList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.request_list = response.data.request_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.LIST_WITHDRAWAL_REQUEST,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
    },
    /* Open confirmation dialog for status toggle */
    openDialog(item, index, request_status) {
      this.dialog_data.title = "Confirm Payment";
      this.dialog_data.message =
        "Are you sure want to " +
        request_status +
        " this request. <br>( " +
        item.request_id +
        " )";
      this.dialog_data.request_status = request_status;
      this.dialog_data.payout_request_table_id = item.id;
      this.dialog_data.index = index;
      this.dialog_data.flag = true;
    },
    /* aprove or reject*/
    processRequest() {
      const self = this;
      var form = new FormData();
      form.append("payout_request_table_id", this.dialog_data.payout_request_table_id);
      form.append("request_status", this.dialog_data.request_status);

      const successHandler = (response) => {
        if (response.data.success) {
          this.showSnakeBar(
            "success",
            "Request has been " + this.dialog_data.request_status
          );
          this.request_list[
            this.dialog_data.index
          ].request_status = this.dialog_data.request_status;
          this.dialog_data.flag = false;
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false;
      };
      this.request_POST(
        self,
        this.$urls.PROCESS_WITHDRAWAL_REQUEST,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
  },
};
</script>
