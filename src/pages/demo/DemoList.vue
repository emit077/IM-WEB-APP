<style media="screen" type="text/css"></style>
<template>
  <div>
    <div>
      <v-row justify="end">
        <v-col class="" md="6">
          <div
            class="text-right"
            v-if="
              [
                $keys.ACCOUNT_ACADEMIC_COUNSELLOR,
                $keys.ACCOUNT_SUPER_ADMIN,
                $keys.ACCOUNT_ADMIN,
              ].includes($store.state.user.account_type)
            "
          >
            <span
              class="fc-primary cursor-pointer"
              @click="$router.push({ name: 'schedule_demo_class' })"
            >
              {{ $keys.SCHEDULE_DEMO }}
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
        <v-text-field
          v-model="search_query"
          :placeholder="$lang.DEMO_SEARCH"
          append-icon="mdi-magnify"
          dense
          hide-details
          outlined
          single-line
          @keyup="getDemoList"
        ></v-text-field>
      </v-col>
      <v-col class="" cols="3" md="2"> </v-col>
    </v-row>

    <!-- status filter -->
    <div class="mb-5">
      <div
        v-for="(item, i) in status_options"
        :key="i"
        :class="demo_status == item.status ? 'elevation-5 ' : ''"
        class="px-3 py-1 d-inline mr-2 border-r-30 cursor-pointer"
        @click="(demo_status = item.status), getDemoList()"
      >
        <span>{{ item.status || "All" }}</span>
        <v-icon v-if="i > 0" size="10" class="pl-2" :color="item.color">
          mdi-checkbox-blank-circle
        </v-icon>
      </div>
    </div>
    <!-- status filter end -->

    <div>
      <v-data-table
        :disable-sort="true"
        :headers="headers"
        :hide-default-footer="true"
        :items="demo_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        class="elevation-1 custom-header-bg custom-table-body"
        item-key="shipment_id"
      >
        <template v-slot:item.student_info="{ item }">
          <div>
            <p class="font-weight-bold large-screen">{{ item.student_name }}</p>
            <p class="font-weight-bold text-h6 small-screen">
              {{ item.student_name }}
            </p>
            <!-- <p class="font-weight-bold">{{ item.student_name }}</p> -->
            <p v-if="$store.state.user.account_type != $keys.ACCOUNT_TEACHER">
              {{ item.student_mobile }}
            </p>
          </div>
        </template>
        <template v-slot:item.tutor_info="{ item }">
          <div>
            <p class="font-weight-bold">{{ item.tutor_name }}</p>
            <p>{{ item.tutor_mobile }}</p>
          </div>
        </template>
        <template v-slot:item.bda_info="{ item }">
          <div>
            <p class="font-weight-bold">{{ item.bda_name }}</p>
            <p>{{ item.bda_mobile }}</p>
          </div>
        </template>
        <template v-slot:item.display_date="{ item }">
          <div>
            <p class="">{{ item.display_date }}</p>
            <p class="">{{ item.display_time }}</p>
          </div>
        </template>
        <template v-slot:item.mode="{ item }">
          <div>
            <span v-if="item.is_online" class="online px-3">{{ $lang.ONLINE }}</span>
            <span v-else class="offline px-3">{{ $lang.OFFLINE }}</span>
          </div>
        </template>

        <template v-slot:item.status="{ item }">
          <span :class="item.status.toLowerCase()" class="px-3">{{ item.status }}</span>
        </template>

        <template v-slot:item.action="{ item }">
          <!-- edit btn -->
          <a
            class="d-inline text-decoration-none"
            :href="
              $router.resolve({
                name: 'edit_demo',
                params: { demo_table_id: encrypt(item.id) },
              }).href
            "
          >
            <TableEditBtn></TableEditBtn>
          </a>
          <!-- detail btn -->
          <a
            class="d-inline text-decoration-none"
            :href="
              $router.resolve({
                name: 'demo_details',
                params: { demo_table_id: encrypt(item.id) },
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
        @input="getDemoList"
      ></v-pagination>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  components: {
    TableEditBtn: () => import("@/components/shared/buttons/TableEditBtn"),
    TableDetailBtn: () => import("../../components/shared/buttons/TableDetailBtn"),
  },
  data() {
    return {
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      demo_list: [],
      search_query: "",
      headers: [
        { text: "Student", align: "start", value: "student_info" },
        { text: "Tutor", align: "start", value: "tutor_info" },
        { text: "Admission Coordinator", align: "start", value: "bda_info" },
        { text: "Date", value: "display_date" },
        { text: "Mode", value: "mode" },
        { text: "Status", value: "status" },
        { text: "", value: "action", align: "end", width: "110px" },
      ],
      filter_dialog: {
        flag: false,
      },
      dialog: {
        user_table_id: "",
        flag: false,
        msg: "",
      },
      action_list: [
        { text: "Selected", value: "Selected" },
        { text: "Rejected", value: "Rejected" },
      ],
      status_options: [
        {
          status: "All",
          color: "#fffff",
        },
        {
          status: "Scheduled",
          color: "#dc63d0",
        },
        {
          status: "Rescheduled",
          color: "#f2994a",
        },
        {
          status: "Selected",
          color: "#27AE60",
        },
        {
          status: "Rejected",
          color: "#EB5757",
        },
      ],
      demo_status: "All",
    };
  },
  computed: mapGetters({}),
  created() {
    this.getDemoList();
  },
  methods: {
    /* fetching shipment list */
    getDemoList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
      };
      if (this.demo_status != "All") params.status = this.demo_status;

      const successHandler = (response) => {
        if (response.data.success) {
          self.demo_list = response.data.demo_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.DEMO_LIST,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
    },
    /* Open confirmation dialog for status toggle */
    toggleAccountStatus() {
      const self = this;
      var form = new FormData();
      form.append("user_table_id", this.dialog.user_table_id);
      const successHandler = (response) => {
        self.dialog.flag = false;
        self.getDemoList();
      };
      const finallyHandler = () => {};
      this.request_POST(
        self,
        self.$urls.TOGGLE_demo_status,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    openToggleAccountDialog(item) {
      this.dialog.user_table_id = item.user_table_id;
      this.dialog.is_active = item.is_active;
      this.dialog.msg = !item.is_active
        ? "Are you sure want to <b>Block</b>?\n <b>" + item.name + "</b>"
        : "Are you sure want to<b> Unblock</b>? \n <b>" + item.name + "</b>";
      this.dialog.flag = true;
    },
    /* delete student Api call*/
    deleteStudent(student_id) {
      const self = this;
      var form = new FormData();
      form.append("shipment_id", this.dialog.id);
      form.append("shipment_status", this.dialog.status);
      const successHandler = (response) => {
        self.dialog.flag = false;
        self.dialog.btn_loading = false;
        this.dialog.shipment_id = "";
        this.dialog.flag = false;
        self.getDemoList();
      };
      const finallyHandler = () => {};
      this.request_POST(
        self,
        self.$urls.CHANGE_SHIPMENT_STATUS,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    openActionDialog(action, item) {
      if (action == this.$keys.SCHEDULE_DEMO && item.student_table_id) {
        this.$router.push({
          name: "schedule_demo_class",
          query: { student_table_id: this.encrypt(item.student_table_id) },
        });
      } else {
        this.action_dialog.flag = true;
        this.action_dialog.action = action;
        this.action_dialog.lead_id = item.id;
        this.action_dialog.name = item.name;
      }
    },
  },
};
</script>
