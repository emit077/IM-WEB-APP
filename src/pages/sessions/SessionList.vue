<style media="screen" type="text/css"></style>
<template>
  <div>
    <div>
      <v-row justify="end" v-if="$store.state.user.account_type == $keys.ACCOUNT_TEACHER">
        <v-col class="" md="6">
          <div class="text-right">
            <span
              class="fc-primary cursor-pointer"
              @click="$router.push({ name: 'sessions_start' })"
            >
              {{ $lang.START_SESSION }}
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
          :placeholder="$lang.STUDENT_SEARCH"
          append-icon="mdi-magnify"
          dense
          hide-details
          outlined
          single-line
          @keyup="getSessionList"
        ></v-text-field>
      </v-col>
      <v-col class="" cols="3" md="2">
        <div>
          <div @click="openFilterDialog">
            <TableFilterBtn :filter_count="filter_data.filter_count" />
          </div>
        </div>
      </v-col>
      <v-col class="" cols="9" md="2">
        <!--        <div class="cursor-pointer w-max-content" @click="openFilterDialog">-->
        <!--          <filter-btn :filter_count="shipment_filter_data.filter_count"/>-->
        <!--        </div>-->
      </v-col>
    </v-row>
    <div>
      <v-data-table
        :disable-sort="true"
        :headers="headers"
        :hide-default-footer="true"
        :items="session_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        :single-select="singleSelect"
        class="elevation-1 custom-header-bg custom-table-body"
        item-key="shipment_id"
      >
        <!-- tutor info -->
        <template v-slot:[`item.tutor_name`]="{ item }">
          <div>
            <p class="font-weight-bold">{{ item.tutor_name }}</p>
            <p>{{ item.tutor_mobile }}</p>
          </div>
        </template>

        <!-- Student info -->
        <template v-slot:[`item.student_list`]="{ item }">
          <div v-for="student in item.student_list" :key="student.id" class="mt-1">
            <p class="font-weight-bold">{{ student.name }}</p>
            <p>{{ student.mobile }}</p>
          </div>
        </template>

        <template v-slot:[`item.action1`]="{ item }">
          <v-switch
            v-model="item.is_active"
            :class="item.is_active ? 'active-toggle-btn' : 'deactive-toggle-btn'"
            :ripple="false"
            class="custom-toggle-btn"
            color="error"
            dense
            inset
            style="display: inline-flex; width: 50px"
            @click="openToggleAccountDialog(item)"
          ></v-switch>
        </template>

        <!-- duration info -->
        <template v-slot:[`item.duration`]="{ item }">
          <p>{{ item.duration + item.time_extended }}Min</p>
        </template>
        <!-- session status -->
        <template v-slot:[`item.session_status`]="{ item }">
          <span :class="'status-' + item.session_status.toLowerCase()">
            {{ item.session_status }}
          </span>
        </template>

        <template v-slot:[`item.action`]="{ item, index }">
          <!-- Action btns -->
          <div
            v-if="
              item.session_status == $keys.SESSION_PENDING &&
              [
                $keys.ACCOUNT_SUPER_ADMIN,
                $keys.ACCOUNT_ADMIN,
                $keys.ACCOUNT_ACADEMIC_COUNSELLOR,
                $keys.ACCOUNT_STUDENT,
              ].includes(getUser.account_type)
            "
            class="d-inline"
          >
            <span @click="openDialog(item, index, $keys.SESSION_APPROVED)">
              <CustomBtn icon="mdi-check-bold" color="success" title="Approve" />
            </span>
            <span @click="openDialog(item, index, $keys.SESSION_REJECTED)">
              <CustomBtn icon="mdi-close-thick" btn_type="error" title="Reject" />
            </span>
          </div>
          <!--  -->
          <div
            class="d-inline"
            @click="
              $router.push({
                name: 'sessions_details',
                params: { session_table_id: encrypt(item.id) },
              })
            "
          >
            <TableDetailBtn></TableDetailBtn>
          </div>
        </template>
      </v-data-table>
      <v-pagination
        v-model="page_number"
        :length="total_page_count"
        :total-visible="7"
        class="custom-pagination"
        @input="getSessionList"
      ></v-pagination>
    </div>

    <!--  -->
    <FilterDialog :filter_data="filter_data" @filter="getSessionList" />
    <ConfirmationDialog
      :data="confirmation_dialog_data"
      @yes="approveSession"
    ></ConfirmationDialog>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  components: {
    ConfirmationDialog: () => import("@/components/shared/dialogs/ConfirmationDialog"),
    TableDetailBtn: () => import("../../components/shared/buttons/TableDetailBtn"),
    TableFilterBtn: () => import("@/components/shared/buttons/TableFilterBtn"),
    FilterDialog: () => import("../../components/sessions/SessionFilters"),
    CustomBtn: () => import("@/components/shared/buttons/CustomBtn"),
  },
  watch: {
    selected: {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.getShipmentIdList();
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      session_list: [],
      selected: [],
      singleSelect: false,
      search_query: "",
      headers: [
        { text: "Session ID", align: "start", value: "session_id", width: "130px" },
        { text: "Student info", align: "start", value: "student_list" },
        { text: "Tutor info", align: "start", value: "tutor_name" },
        { text: "Date", align: "start", value: "date" },
        { text: "Time", align: "start", value: "start_time" },
        { text: "Duration", align: "start", value: "duration" },
        { text: "Status", align: "center", value: "session_status" },
        { text: "", value: "action", align: "end", width: "" },
      ],
      filter_dialog: {
        flag: false,
      },
      dialog: {
        user_table_id: "",
        flag: false,
        msg: "",
      },
      filter_data: {
        flag: false,
        city_id_list: [],
        class_id_list: [],
        student_status_list: [],
        bda_id_list: [],
        filter_date_from: "",
        filter_date_to: "",
        filter_count: 0,
      },
      confirmation_dialog_data: {
        flag: false,
        title: "",
        message: "",
        payment_table_id: null,
        btn_loader: false,
      },
    };
  },
  computed: mapGetters({
    session_filter_data: "session/getFilter",
  }),
  created() {
    this.getSessionList();
  },
  methods: {
    // /*Open filter dialog*/
    openFilterDialog() {
      this.filter_data.class_id_list = this.session_filter_data.class_id_list;
      this.filter_data.session_status = this.session_filter_data.session_status;
      this.filter_data.filter_date_from = this.session_filter_data.filter_date_from;
      this.filter_data.filter_date_to = this.session_filter_data.filter_date_to;
      this.filter_data.flag = true;
    },
    /* fetching shipment list */
    getSessionList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
        session_status: this.session_filter_data.session_status,
        class_id_list: JSON.stringify(this.session_filter_data.class_id_list),
        filter_date_from: this.session_filter_data.filter_date_from,
        filter_date_to: this.session_filter_data.filter_date_to,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.total_page_count = response.data.total_page_count;
          self.session_list = response.data.session_list;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.SESSION_LIST,
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
        self.getSessionList();
      };
      const finallyHandler = () => {};
      this.request_POST(
        self,
        self.$urls.TOGGLE_ACCOUNT_STATUS,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    openToggleAccountDialog(item, index) {
      this.dialog.user_table_id = item.user_table_id;
      this.dialog.is_active = item.is_active;
      this.dialog.msg = !item.is_active
        ? "Are you sure want to <b>Block</b>?\n <b>" + item.name + "</b>"
        : "Are you sure want to<b> Unblock</b>? \n <b>" + item.name + "</b>";
      this.dialog.flag = true;
    },
    /* Open confirmation dialog for status toggle */
    openDialog(item, index, session_status) {
      this.confirmation_dialog_data.title = session_status + " Session?";
      this.confirmation_dialog_data.message = `Are you sure want ${session_status.toLowerCase()} this session`;
      this.confirmation_dialog_data.session_table_id = item.id;
      this.confirmation_dialog_data.index = index;
      this.confirmation_dialog_data.session_status = session_status;
      this.confirmation_dialog_data.flag = true;
    },
    /* aprove the session data*/
    approveSession() {
      const self = this;
      self.confirmation_dialog_data.btn_loader = true;
      var form = new FormData();
      form.append("session_table_id", this.confirmation_dialog_data.session_table_id);
      form.append("session_status", this.confirmation_dialog_data.session_status);
      const successHandler = (response) => {
        if (response.data.success) {
          this.session_list[
            this.confirmation_dialog_data.index
          ].session_status = this.confirmation_dialog_data.session_status;
          this.confirmation_dialog_data.flag = false;
        }
      };
      const finallyHandler = () => {
        self.confirmation_dialog_data.btn_loader = false;
      };
      this.request_POST(
        self,
        this.$urls.APPROVE_SESSION,
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
