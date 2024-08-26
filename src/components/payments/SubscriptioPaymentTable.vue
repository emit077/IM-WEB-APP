<style lang="scss" scoped></style>
<template>
  <div>
    <v-row class="mt-5 mb-1" justify="space-between">
      <v-col cols="12" md="6" class="">
        <v-text-field
          v-model="search_query"
          :placeholder="$lang.PAYMENT_SEARCH"
          append-icon="mdi-magnify"
          dense
          hide-details
          outlined
          single-line
          @keyup="getPaymentList"
        ></v-text-field>
      </v-col>
      <v-col class="text-right" cols="12" md="3">
        <DateRangePicker @update="applyDateFilter"></DateRangePicker>
      </v-col>
    </v-row>
    <!-- status filter -->
    <v-row class="my-0 ml-1" justify="space-between">
      <v-col cols="12" md="6" class="">
        <div
          v-for="(item, i) in payment_status_options"
          :key="i"
          :class="filter_data.status_list.includes(item.status) ? 'elevation-5 ' : ''"
          class="px-3 py-1 d-inline mr-2 border-r-30 btn cursor-pointer"
          @click="(filter_data.status_list = item.status), getPaymentList()"
        >
          <span>{{ item.status || "All" }}</span>
          <v-icon v-if="i > 0" size="10" class="pl-2" :color="item.color">
            mdi-checkbox-blank-circle
          </v-icon>
        </div>
      </v-col>
      <v-col class="text-right" cols="12" md="3">
        <span
          class=""
          @click="downloadExcel"
          :style="{
            opacity: filter_data.filter_date_from && filter_data.filter_date_to ? 1 : 0.4,
          }"
        >
          <ExportExcelBtn />
        </span>
      </v-col>
    </v-row>
    <!-- status filter end -->

    <div class="mt-1">
      <v-data-table
        :disable-sort="true"
        :headers="headers"
        :hide-default-footer="true"
        :items="payment_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        :single-select="singleSelect"
        class="elevation-1 custom-header-bg custom-table-body"
        item-key="id"
        :item-class="getItemClass"
      >
        <template v-slot:[`item.name`]="{ item }">
          <p class="fw-bold">{{ item.student_name }}</p>
          <p>{{ item.student_mobile }}</p>
        </template>
        <!-- status -->
        <template v-slot:[`item.payment_status`]="{ item }">
          <span :class="'pay-' + item.payment_status.toLowerCase()" class="px-2">{{
            item.payment_status
          }}</span>
        </template>
        <!-- icons -->
        <template v-slot:[`item.payment_mode`]="{ item }">
          <TableIcons :type="$keys.PAYMENT_MODE" :data="{ mode: item.payment_mode }" />
        </template>
        <!-- action -->
        <template v-slot:[`item.action`]="{ item }">
          <a
            v-if="item.payment_status == $keys.PAYMENT_SUCCESS"
            class="d-inline"
            :href="
              $urls[$project.NAME][$project.ENV] +
              $urls.GET_SUBSCRIPTION_PAYMNET_INVOICE +
              item.id
            "
            target="_blank"
          >
            <v-icon>mdi-download</v-icon>
          </a>
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
        @input="getPaymentList"
      ></v-pagination>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  components: {
    TableIcons: () => import("@/components/shared/table-components/TableIcons"),
    EmptyTable: () => import("@/components/shared/table-components/EmptyTable"),
    DateRangePicker: () => import("@/components/shared/DateRangePicker"),
    ExportExcelBtn: () => import("@/components/shared/buttons/ExportExcelBtn"),
  },
  data() {
    return {
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      payment_list: [],
      selected: [],
      singleSelect: false,
      search_query: "",
      headers: [
        { text: "Transaction ID", align: "start", value: "order_id" },
        { text: "Student info", align: "start", value: "name" },
        { text: "Plan", value: "plan_name" },
        { text: "Amount", value: "amount", align: "end" },
        { text: "Mode", value: "payment_mode", align: "center" },
        { text: "Payment date", value: "payment_date", align: "center" },
        { text: "Status", value: "payment_status", align: "center" },
        { text: "", value: "action", align: "center", width: "60px" },
      ],
      dialog_data: {
        flag: false,
        title: "",
        message: "",
        payment_table_id: null,
      },
      filter_data: {
        flag: false,
        status_list: "All",
        filter_date_from: "",
        filter_date_to: "",
        filter_count: 0,
      },
      tab: "",
      payment_status_options: [
        {
          status: "All",
          color: "#fffff",
        },
        {
          status: "Success",
          color: "#27AE60",
        },
        {
          status: "Failed",
          color: "#EB5757",
        },
      ],
    };
  },
  computed: mapGetters({
    payment_filter_data: "payment/getFilter",
  }),
  created() {
    this.getPaymentList();
  },
  methods: {
    getItemClass(item) {
      return "payment-" + item.payment_status.toLowerCase();
    },
    downloadExcel() {
      if (this.filter_data.filter_date_from && this.filter_data.filter_date_to) {
        let URL =
          this.$urls[this.$project.NAME][this.$project.ENV] +
          this.$urls.SUBSCRIPTION_PAYMENT_REPORT +
          `?payment_type=${this.payment_type}&filter_date_from=${this.filter_data.filter_date_from}&filter_date_to=${this.filter_data.filter_date_to}`;
        window.open(URL, "_blank");
      }
    },
    applyDateFilter(start_date, end_date) {
      this.filter_data.filter_date_from = start_date;
      this.filter_data.filter_date_to = end_date;
      this.getPaymentList();
    },
    /* fetching shipment list */
    getPaymentList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
        status_list:
          this.filter_data.status_list != "All"
            ? JSON.stringify([this.filter_data.status_list])
            : null,
        filter_date_from: this.filter_data.filter_date_from,
        filter_date_to: this.filter_data.filter_date_to,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.payment_list = response.data.payment_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.SUBSCRIPTION_PAYMENT_LIST,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
    },
  },
};
</script>
