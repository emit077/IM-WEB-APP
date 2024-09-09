<style media="screen" type="text/css"></style>
<template>
  <div class="mt-5">
    <div>
      <v-row
        justify="end"
        v-if="
          [
            $keys.ACCOUNT_SUPER_ADMIN,
            $keys.ACCOUNT_ADMISSION_COUNSELLOR,
            $keys.ACCOUNT_ADMIN,
          ].includes($store.state.user.account_type)
        "
      >
        <v-col class="" md="6">
          <div class="text-right">
            <span
              class="fc-primary cursor-pointer"
              @click="$router.push({ name: 'add_subscription' })"
            >
              {{ $lang.ADD_SUBSCRIPTION_PLAN }}
              <v-btn color="primary" depressed fab x-small>
                <v-icon size="24">mdi-plus</v-icon>
              </v-btn>
            </span>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <div
          v-for="(status, i) in subscription_status_options"
          :key="i"
          :class="status == subscription_status ? 'elevation-5' : ''"
          class="px-3 py-1 d-inline mr-2 border-r-30 cursor-pointer"
          @click="apply_filter(status)"
        >
          <span>{{ status }}</span>
          <v-icon v-if="i == 3" size="10" class="pl-2" color="#EB5757">
            mdi-checkbox-blank-circle
          </v-icon>
          <v-icon v-if="i == 2" size="10" class="pl-2" color="#F2994A">
            mdi-checkbox-blank-circle
          </v-icon>
          <v-icon v-if="i == 1" size="10" class="pl-2" color="#27AE60">
            mdi-checkbox-blank-circle
          </v-icon>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search_query"
          :placeholder="$lang.SUBSCRIPTION_PLAN_SEARCH"
          append-icon="mdi-magnify"
          dense
          hide-details
          outlined
          single-line
          @keyup="getSubscriptionHistory"
        ></v-text-field>
      </v-col>
    </v-row>
    <div>
      <v-data-table
        :disable-sort="true"
        :headers="headers"
        :hide-default-footer="true"
        :items="subscription_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        class="elevation-1 custom-header-bg custom-table-body"
      >
        <template v-slot:[`item.student`]="{ item }">
          <p class="font-weight-bold">{{ item.student_name }}</p>
          <p>{{ item.student_mobile }}</p>
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <!-- <a class="d-inline" :href="$urls[$project.NAME][$project.ENV]+$urls.GET_INVOICE+item.id" target="_blank">
            <v-icon>mdi-download</v-icon>
          </a> -->
          <a
            class="d-inline"
            :href="
              $router.resolve({
                name: 'student_subscription_details',
                params: { std_subscription_id: encrypt(item.id) },
              }).href
            "
          >
            <TableDetailBtn></TableDetailBtn>
          </a>
        </template>
      </v-data-table>

      <v-pagination
        v-model="page_number"
        :length="total_page_count"
        :total-visible="7"
        class="custom-pagination"
        @input="getSubscriptionHistory"
      ></v-pagination>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  components: {
    TableDetailBtn: () => import("../../components/shared/buttons/TableDetailBtn"),
  },
  data() {
    return {
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      subscription_list: [],
      search_query: "",
      headers: [
        { text: "Plan Name", value: "plan_name", align: "start" },
        { text: "Student info", value: "student", align: "start" },
        { text: "Payable Amount", value: "payable_amount", align: "right" },
        { text: "Valid till", value: "expiry_date", align: "center" },
        { text: "Hours", value: "teaching_hours", align: "right" },
        { text: "Students allowed", value: "number_of_students", align: "center" },
        { text: "Plan Type", value: "plan_type" },
        { text: "", value: "action", align: "end", width: "80px" },
      ],
      subscription_status_options: ["All", "Active", "On-Hold", "Expired"],
      subscription_status: "All",
    };
  },
  computed: mapGetters({
    filter_data: "subscription_history/getFilter",
  }),
  created() {
    this.subscription_status = this.filter_data.subscription_status;
    this.page_number = this.filter_data.page_number;
    this.getSubscriptionHistory();
  },
  methods: {
    /* fetching shipment list */
    getSubscriptionHistory(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
        subscription_status: this.subscription_status,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.subscription_list = response.data.subscription_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
      };

      self.request_GET(
        self,
        self.$urls.SUBSCRIPTION_HISTORY,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
    },
    apply_filter(status) {
      this.subscription_status = status;
      this.$store.dispatch("subscription_history/setFilter", {
        subscription_status: self.subscription_status,
        page_number: self.page_number,
      });
      this.getSubscriptionHistory();
    },
  },
};
</script>
