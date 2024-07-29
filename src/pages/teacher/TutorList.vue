<style media="screen" type="text/css"></style>
<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search_query"
          :placeholder="$lang.TUTOR_SEARCH"
          append-icon="mdi-magnify"
          dense
          hide-details
          outlined
          rounded
          single-line
          @keyup="getTutorList"
        ></v-text-field>
      </v-col>
      <v-col class="" cols="3" md="2">
        <div>
          <div @click="openFilterDialog">
            <TableFilterBtn :filter_count="filter_data.filter_count" />
          </div>
        </div>
      </v-col>
      <v-col class="text-right mt-4" cols="12" md="4" v-if="$project.NAME== $keys.TF">
        <span
          @click="downloadExcel"
          :style="{
            opacity:
            tutor_filter_data.filter_date_from && tutor_filter_data.filter_date_to
                ? 1
                : 0.4,
          }"
        >
          <ExportExcelBtn />
        </span>
      </v-col>
    </v-row>
    <div>
      <v-data-table
        :disable-sort="true"
        :headers="headers"
        :hide-default-footer="true"
        :items="tutor_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        :single-select="singleSelect"
        class="elevation-1 custom-header-bg custom-table-body"
        item-key="shipment_id"
      >
        <!-- account details -->
        <template v-slot:[`item.name`]="{ item }">
          <AccountInfoCard
            :type="$keys.ACCOUNT_TEACHER"
            :account_details="{
              tutor_table_id: item.id,
              name: item.tutor_name,
              mobile: item.tutor_mobile,
              email: item.email,
              gender: item.gender,
            }"
          />
        </template>

        <!-- swith btns-->
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
        <!-- peofile action -->
        <template v-slot:[`item.contract_status`]="{ item }">
          <div v-if="item.contract_status == $keys.CONTRACT_PENDING">
            <v-btn
              color="primary"
              outlined
              class="px-2"
              small
              @click="scheduleInterview(item.id)"
            >
              Schedule Interview
            </v-btn>
          </div>
          <div v-else>
            <span :class="item.contract_status.toLowerCase()" class="px-3 py-1">
              {{ item.contract_status }}
            </span>
          </div>
        </template>
        <!-- status -->
        <template v-slot:[`item.profile_status`]="{ item }">
          <span :class="'status-' + item.profile_status.toLowerCase()" class="px-2">{{
            item.profile_status
          }}</span>
        </template>
        <!-- action -->
        <template v-slot:[`item.action`]="{ item }">
          <a
            class="d-inline pr-1"
            v-if="
              [$keys.ACCOUNT_SUPER_ADMIN, $keys.ACCOUNT_ADMIN].includes(
                $store.state.user.account_type
              )
            "
            :href="
              $router.resolve({
                name: 'tutors-wallet',
                params: { tutor_table_id: encrypt(item.tutor_table_id) },
              }).href
            "
          >
            <WalletBtn />
          </a>
          <a
            class="d-inline"
            :href="
              $router.resolve({
                name: 'edit_tutor_profile',
                query: { tutor_table_id: encrypt(item.tutor_table_id) },
              }).href
            "
          >
            <TableEditBtn></TableEditBtn>
          </a>
          <a
            class="d-inline"
            :href="
              $router.resolve({
                name: 'tutor_profile',
                query: { tutor_table_id: encrypt(item.tutor_table_id) },
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
        @input="getTutorList"
      ></v-pagination>
    </div>

    <TutorFilter :filter_data="filter_data" @filter="getTutorList" />
    <ToggleStatusDialog :data="dialog" @yes="toggleAccountStatus" @no="getTutorList" />
    <TutorInterviewDialog :dialog="interview_dialog" @update="getTutorList" />
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  components: {
    AccountInfoCard: () => import("@/components/shared/table-components/AccountInfoCard"),
    TableEditBtn: () => import("@/components/shared/buttons/TableEditBtn"),
    ToggleStatusDialog: () => import("@/components/shared/dialogs/ToggleStatusDialog"),
    TableDetailBtn: () => import("@/components/shared/buttons/TableDetailBtn"),
    WalletBtn: () => import("@/components/shared/buttons/WalletBtn"),
    TableFilterBtn: () => import("@/components/shared/buttons/TableFilterBtn"),
    TutorFilter: () => import("@/components/teacher/TutorFilter"),
    TutorInterviewDialog: () => import("@/components/teacher/TutorInterviewDialog"),
    ExportExcelBtn: () => import("@/components/shared/buttons/ExportExcelBtn"),
  },
  data() {
    return {
      tutor_table_id: null,
      pdf_url: "",
      pdf: "",
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      tutor_list: [],
      selected: [],
      singleSelect: false,
      search_query: "",
      headers: [
        { text: "Tutor ID", align: "start", value: "tutor_id", width: "120px" },
        { text: "Tutor info", align: "start", value: "name" },
        { text: "City", value: "city" },
        { text: "Signup Date", value: "created", width: "100px", align: "center" },
        {
          text: "Profile Satus ",
          value: "profile_status",
          align: "center",
          width: "120px",
        },
        { text: "Action", value: "contract_status", align: "center", width: "180px" },
        { text: "Blocked", value: "action1", align: "end", width: "10px" },
        { text: "", value: "action", align: "end", width: "150px" },
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
        profile_status: "",
        filter_date_from: "",
        filter_date_to: "",
        pincode_list: [],
        filter_count: 0,
      },
      interview_dialog: {
        flag: false,
        tutor_table_id: null,
        action: "Schedule Interview",
      },
    };
  },
  computed: mapGetters({
    tutor_filter_data: "tutor/getFilter",
  }),
  created() {
    this.getTutorList();
  },
  methods: {
    // /*Open filter dialog*/
    openFilterDialog() {
      this.filter_data.city_id_list = this.tutor_filter_data.city_id_list;
      this.filter_data.profile_status = this.tutor_filter_data.profile_status;
      this.filter_data.student_status_list = this.tutor_filter_data.student_status_list;
      this.filter_data.class_id_list = this.tutor_filter_data.class_id_list;
      this.filter_data.filter_date_from = this.tutor_filter_data.filter_date_from;
      this.filter_data.filter_date_to = this.tutor_filter_data.filter_date_to;
      this.filter_data.time_slot_id_list = this.tutor_filter_data.time_slot_id_list;
      this.filter_data.pincode_list = this.tutor_filter_data.pincode_list;
      this.filter_data.flag = true;
    },
    /* fetching shipment list */
    getTutorList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
        profile_status: this.tutor_filter_data.profile_status,
        city_id_list: JSON.stringify(this.tutor_filter_data.city_id_list),
        pin_code_list: JSON.stringify(this.tutor_filter_data.pincode_list),
        student_status_list: JSON.stringify(this.tutor_filter_data.student_status_list),
        grade_id:
          this.tutor_filter_data.class_id_list.length > 0
            ? JSON.stringify(this.tutor_filter_data.class_id_list)
            : null,
        filter_date_from: this.tutor_filter_data.filter_date_from,
        filter_date_to: this.tutor_filter_data.filter_date_to,
        time_slot_table_id_list: JSON.stringify(this.tutor_filter_data.time_slot_id_list),
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
        self.$urls.GET_TUTOR_LIST,
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
        self.getTutorList();
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
        self.getTutorList();
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
    /* schedule interview*/
    scheduleInterview(tutor_table_id) {
      this.interview_dialog.flag = true;
      this.interview_dialog.tutor_table_id = tutor_table_id;
    },
    downloadExcel() {
      if (
        this.tutor_filter_data.filter_date_from &&
        this.tutor_filter_data.filter_date_to
      ) {
        let URL =
          this.$urls[this.$project.NAME][this.$project.ENV] +
          this.$urls.TUTOR_EXPORT +
          `?filter_date_from=${this.tutor_filter_data.filter_date_from}&filter_date_to=${this.tutor_filter_data.filter_date_to}`;
        window.open(URL, "_blank");
      }
    },
  },
};
</script>
