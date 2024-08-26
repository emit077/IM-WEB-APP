<style media="screen" type="text/css">
.status-text-filter {
  font-style: normal;
  font-weight: 600;
  font-size: 13px !important;
  line-height: 18px !important;
  letter-spacing: 0.015em;
  color: #333232 !important;
  border-radius: 20px;
}
</style>
<template>
  <div>
    <div class="mt-5">
      <v-row justify="end">
        <v-col class="" md="6">
          <div
            class="text-right add-new-btn-text"
            @click="$router.push({ name: 'raise_ticket' })"
          >
            {{ $lang.RAISE_TICKET }}
            <v-btn class="ml-1" color="primary" depressed fab x-small>
              <v-icon size="24">mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-row class="mb-0">
      <v-col class="" cols="12" md="6">
        <div
          class="filter-btn d-inline-block status-text-filter px-4 py-1 mx-2 cursor-pointer"
          v-for="(item, i) in filter_ticket_status_options"
          :key="i"
          @click="applyFilter(item.value)"
          :class="filter_ticket_status == item.value ? 'elevation-5' : 'elevation-0'"
        >
          {{ item.text }}
          <v-icon
            v-if="i > 0"
            size="10"
            style="margin-top: -3px"
            class="pl-2"
            :color="i == 1 ? '#EB5757' : '#27AE60'"
          >
            mdi-checkbox-blank-circle
          </v-icon>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search_query"
          :placeholder="$lang.TICKET_SEARCH"
          append-icon="mdi-magnify"
          dense
          hide-details
          outlined
          single-line
          @keyup="getTicketList"
        ></v-text-field>
      </v-col>
      <v-col class="text-right" cols="3" md="2"> </v-col>
    </v-row>
    <div>
      <v-data-table
        :disable-sort="true"
        :headers="headers"
        :hide-default-footer="true"
        :items="ticket_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        class="elevation-1 custom-header-bg custom-table-body"
      >
        <template v-slot:[`item.raised_by`]="{ item }">
          <div>
            <p class="font-weight-bold">{{ item.raised_by }}</p>
            <p>{{ item.raised_by_mobile }}</p>
          </div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <span :class="'ticket_' + item.status.toLowerCase()" class="px-2">{{
            item.status
          }}</span>
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <div
            class="d-inline"
            @click="
              $router.push({
                name: 'support_ticket_details',
                params: { ticket_table_id: encrypt(item.id) },
              })
            "
          >
            <TableDetailBtn></TableDetailBtn>
          </div>
        </template>
        <!-- Empty Table -->
        <template v-slot:no-data>
          <EmptyTable :message="$lang.EMPTY_RETAILER" :type="$keys.EMPTY_TYPE_2" />
        </template>
      </v-data-table>

      <v-pagination
        v-model="page_number"
        :length="total_page_count"
        :total-visible="7"
        class="custom-pagination"
        @input="getTicketList"
      ></v-pagination>
    </div>
  </div>
</template>

<script type="text/javascript">
// import {mapGetters} from 'vuex';
export default {
  components: {
    TableDetailBtn: () => import("@/components/shared/buttons/TableDetailBtn"),
    EmptyTable: () => import("@/components/shared/table-components/EmptyTable"),
  },
  data() {
    return {
      pdf_url: "",
      pdf: "",
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      ticket_list: [],
      search_query: "",
      headers: [
        { text: "Ticket Id", value: "ticket_id", align: "start" },
        { text: "Raised By", value: "raised_by", align: "" },
        { text: "Category", value: "category" },
        { text: "Status", value: "status", align: "center" },
        { text: "Raised on", value: "created" },
        { text: "Closed On ", value: "closed_on", align: "end" },
        { text: "", value: "action", align: "end" },
      ],
      delete_dialog: {
        id: "",
        flag: false,
        title: "",
        message: "Delete this subscription plan permanently!",
      },
      filter_ticket_status_options: [
        {
          text: "All",
          value: null,
        },
        {
          text: "Open",
          value: "Open",
        },
        {
          text: "Close",
          value: "Close",
        },
      ],
      filter_ticket_status: null,
    };
  },
  // computed: mapGetters({
  //   shipment_filter_data: "shipment/getShipmentFilter",
  // }),
  created() {
    this.getTicketList();
  },
  methods: {
    applyFilter(status) {
      this.filter_ticket_status = status;
      this.page_number = 1;
      this.getTicketList();
    },
    /* fetching shipment list */
    getTicketList(status, is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
        ticket_status: this.filter_ticket_status,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.ticket_list = response.data.ticket_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
      };

      self.request_GET(
        self,
        self.$urls.LIST_TICKET,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
    },

    openDeleteDialog(id, plan_name) {
      this.delete_dialog.id = id;
      this.delete_dialog.title = plan_name;
      this.delete_dialog.flag = true;
    },
    /* delete student Api call*/
    deletePlan() {
      const self = this;
      self.$store.dispatch("setPageLoader", true);
      let form = new FormData();
      form.append("id", this.delete_dialog.id);
      const successHandler = (response) => {
        self.delete_dialog.flag = false;
        self.delete_dialog.id = "";
        self.delete_dialog.title = "";
        self.getTicketList();
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };
      this.request_POST(
        self,
        self.$urls.DELETE_SUBSCRIPTION_PLAN,
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
