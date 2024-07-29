<style lang="scss" scoped></style>
<template>
  <div>
    <v-row class="mt-5 mb-1" justify="space-between">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search_query"
          :placeholder="$lang.PAYMENT_SEARCH"
          append-icon="mdi-magnify"
          dense
          hide-details
          outlined
          rounded
          single-line
          @keyup="getEMIList"
        ></v-text-field>
      </v-col>
      <v-col class="" cols="12" md="3">
        <DateRangePicker @update="applyDateFilter"></DateRangePicker>
      </v-col>
    </v-row>
    <!-- status filter -->
    <v-row class="my-0" justify="space-between">
      <v-col cols="12" md="6">
        <div
          v-for="(item, i) in emi_status_options"
          :key="i"
          :class="filter_data.status_list.includes(item.status) ? 'elevation-5 ' : ''"
          class="px-3 py-1 d-inline mr-2 border-r-30 cursor-pointer"
          @click="(filter_data.status_list = item.status), getEMIList()"
        >
          <span>{{ item.status || "All" }}</span>
          <v-icon v-if="i > 0" size="10" class="pl-2" :color="item.color">
            mdi-checkbox-blank-circle
          </v-icon>
        </div>
      </v-col>
    </v-row>
    <!-- status filter end -->

    <div class="mt-5">
      <v-data-table
        :disable-sort="true"
        :headers="headers"
        :hide-default-footer="true"
        :items="installment_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        class="elevation-1 custom-header-bg custom-table-body"
        item-key="id"
      >
        <template v-slot:[`item.student_name`]="{ item }">
          <p class="fw-bold">{{ item.student_name }}</p>
          <p>{{ item.student_mobile }}</p>
        </template>
        <template v-slot:[`item.emi_status`]="{ item }">
          <span :class="'emi-' + item.emi_status.toLowerCase()" class="px-2">{{
            item.emi_status
          }}</span>
        </template>

        <!-- action -->
        <template v-slot:[`item.action`]="{ item }">
          <v-btn
            v-if="
              [
                $keys.EMI_STATUS_PARTIALLY_PAID,
                $keys.EMI_STATUS_DUE,
                $keys.EMI_STATUS_OVERDUE,
              ].includes(item.emi_status) &&
              [$keys.ACCOUNT_ADMIN, $keys.ACCOUNT_SUPER_ADMIN].includes(
                $store.state.user.account_type
              )
            "
            color="primary"
            small
            @click="openDialog(item)"
            >Pay
          </v-btn>
        </template>

        <!-- Empty Table -->
        <template v-slot:no-data>
          <EmptyTable :message="$lang.EMPTY_RETAILER" :type="$keys.EMPTY_TYPE_2" />
        </template>
        <!-- epmty table end -->
      </v-data-table>
      <v-pagination
        v-model="page_number"
        :length="total_page_count"
        :total-visible="7"
        class="custom-pagination"
        @input="getEMIList"
      ></v-pagination>
    </div>
    <!-- tabs end -->
    <ConfirmationDialog :data="dialog_data" @yes="payPayment" />
  </div>
</template>

<script type="text/javascript">
export default {
  props: ["payment_type"],
  components: {
    ConfirmationDialog: () => import("@/components/shared/dialogs/ConfirmationDialog"),
    EmptyTable: () => import("@/components/shared/table-components/EmptyTable"),
    DateRangePicker: () => import("@/components/shared/DateRangePicker"),
  },
  data() {
    return {
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      installment_list: [],
      search_query: "",
      headers: [
        { text: "User info", align: "start", value: "student_name" },
        { text: "Due date", value: "emi_due_date",align: "center"  },
        { text: "Amount", value: "emi_amount", align: "end" },
        { text: "Status", value: "emi_status", align: "center" },
        { text: "", value: "action",align: "center", width:"100px" },
      ],
      filter_data: {
        flag: false,
        status_list: "All",
        filter_date_from: "",
        filter_date_to: "",
        filter_count: 0,
      },
      emi_status_options: [
        {
          status: "All",
          color: "#fffff",
        },
        {
          status: "Paid",
          color: "#27AE60",
        },
        {
          status: "Due",
          color: "#5A44C4",
        },
        {
          status: "Overdue",
          color: "#F2994A",
        },
      ],
      dialog_data: {
        flag: false,
        title: "",
        message: "",
        payment_table_id: null,
      },
    };
  },
  created() {
    this.getEMIList();
  },
  methods: {
    applyDateFilter(start_date, end_date) {
      this.filter_data.filter_date_from = start_date;
      this.filter_data.filter_date_to = end_date;
      this.getEMIList();
    },
    /* fetching shipment list */
    getEMIList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
        payment_type: this.payment_type,
        emi_status:
          this.filter_data.status_list != "All" ? this.filter_data.status_list : null,
        filter_date_from: this.filter_data.filter_date_from,
        filter_date_to: this.filter_data.filter_date_to,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.installment_list = response.data.installment_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.GET_INSTALLMENTS,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
    },
    /* Open confirmation dialog for status toggle */
    openDialog(item) {
      this.dialog_data.title = "Confirm Payment";
      this.dialog_data.message = "Are you sure want to receive " + item.emi_amount.toString();
      this.dialog_data.emi_table_id = item.id;
      this.dialog_data.flag = true;
    },
    /* payment*/
    payPayment() {
      const self = this;
      var form = new FormData();
      form.append("emi_table_id", this.dialog_data.emi_table_id);
      form.append("emi_status", this.$keys.EMI_STATUS_PAID);
      const successHandler = (response) => {
        if (response.data.success) {
          this.getEMIList();
          this.dialog_data.flag = false;
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false;
      };
      this.request_POST(
        self,
        this.$urls.PAY_INSTALLMENT,
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
