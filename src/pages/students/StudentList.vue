<style media="screen" type="text/css"></style>
<template>
  <div>
    <div>
      <v-row justify="end">
        <v-col class="" md="6">
          <div class="text-right">
            <span
              class="fc-primary cursor-pointer"
              @click="$router.push({ name: 'add_student' })"
            >
              {{ $lang.ADD_STUDENTS }}
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
          rounded
          single-line
          @keyup="getStudentList"
        ></v-text-field>
      </v-col>
      <v-col class="" cols="3" md="2">
        <div>
          <div @click="openFilterDialog">
            <TableFilterBtn :filter_count="filter_data.filter_count" />
          </div>
        </div>
      </v-col>
      <v-col class="text-right mt-4" cols="12" md="4" v-if="$project.NAME == $keys.TF">
        <span
          @click="downloadExcel"
          :style="{
            opacity:
              student_filter_data.filter_date_from && student_filter_data.filter_date_to
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
        :items="student_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        :single-select="singleSelect"
        class="elevation-1 custom-header-bg custom-table-body"
        item-key="shipment_id"
      >
        <!-- account details -->
        <template v-slot:[`item.name`]="{ item }">
          <AccountInfoCard
            :type="$keys.ACCOUNT_STUDENT"
            :account_details="{
              student_table_id: item.id,
              name: item.name,
              mobile: item.mobile,
              email: item.email,
              gender: item.gender,
            }"
          />
        </template>
        <!-- swith btn -->
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

        <!-- status -->
        <template v-slot:[`item.profile_status`]="{ item }">
          <span :class="'status-' + item.profile_status.toLowerCase()" class="px-2">{{
            item.profile_status
          }}</span>
        </template>

        <!-- action btn -->
        <template v-slot:[`item.action`]="{ item }">
          <a
            class="d-inline"
            :href="
              $router.resolve({
                name: 'edit_student_profile',
                query: { student_table_id: encrypt(item.id) },
              }).href
            "
          >
            <TableEditBtn></TableEditBtn>
          </a>
          <a
            class="d-inline"
            :href="
              $router.resolve({
                name: 'student_profile',
                query: { student_table_id: encrypt(item.id) },
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
        @input="getStudentList"
      ></v-pagination>
    </div>

    <StudentFilters :filter_data="filter_data" @filter="getStudentList" />
    <ToggleStatusDialog :data="dialog" @yes="toggleAccountStatus" @no="getStudentList" />
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  components: {
    AccountInfoCard: () => import("@/components/shared/table-components/AccountInfoCard"),
    TableEditBtn: () => import("@/components/shared/buttons/TableEditBtn"),
    ToggleStatusDialog: () =>
      import("../../components/shared/dialogs/ToggleStatusDialog"),
    TableDetailBtn: () => import("../../components/shared/buttons/TableDetailBtn"),
    TableFilterBtn: () => import("@/components/shared/buttons/TableFilterBtn"),
    StudentFilters: () => import("../../components/student/StudentFilters"),
    ExportExcelBtn: () => import("@/components/shared/buttons/ExportExcelBtn"),
  },

  data() {
    return {
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      student_list: [],
      singleSelect: false,
      search_query: "",
      headers: [
        { text: "Student ID", align: "start", value: "student_id", width: "120px" },
        { text: "Student info", align: "start", value: "name" },
        { text: "Class", value: "class_name" },
        { text: "City", value: "city" },
        { text: "Signup Date", value: "signup_date", width: "100px", align: "center" },
        {
          text: "Profile Status",
          value: "profile_status",
          align: "center",
          width: "120px",
        },
        { text: "Blocked", value: "action1", align: "end", width: "40px" },
        { text: "", value: "action", align: "end", width: "100px" },
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
        gender: "",
      },
    };
  },
  computed: mapGetters({
    student_filter_data: "students/getFilter",
  }),
  created() {
    this.getStudentList();
  },
  methods: {
    // /*Open filter dialog*/
    openFilterDialog() {
      this.filter_data.city_id_list = this.student_filter_data.city_id_list;
      this.filter_data.student_status_list = this.student_filter_data.student_status_list;
      this.filter_data.profile_status = this.student_filter_data.profile_status;
      this.filter_data.class_id_list = this.student_filter_data.class_id_list;
      this.filter_data.filter_date_from = this.student_filter_data.filter_date_from;
      this.filter_data.filter_date_to = this.student_filter_data.filter_date_to;
      this.filter_data.flag = true;
    },
    /* fetching shipment list */
    getStudentList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
        bda_id_list: JSON.stringify(this.student_filter_data.bda_id_list),
        city_id_list: JSON.stringify(this.student_filter_data.city_id_list),
        student_status_list: JSON.stringify(this.student_filter_data.student_status_list),
        profile_status: this.student_filter_data.profile_status,
        class_id_list: JSON.stringify(this.student_filter_data.class_id_list),
        gender: this.student_filter_data.gender,
        filter_date_from: this.student_filter_data.filter_date_from,
        filter_date_to: this.student_filter_data.filter_date_to,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.student_list = response.data.student_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.STUDENT_LIST,
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
        self.getStudentList();
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
        self.getStudentList();
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
    downloadExcel() {
      if (
        this.student_filter_data.filter_date_from &&
        this.student_filter_data.filter_date_to
      ) {
        let URL =
          this.$urls[this.$project.NAME][this.$project.ENV] +
          this.$urls.STUDENT_EXPORT +
          `?filter_date_from=${this.student_filter_data.filter_date_from}&filter_date_to=${this.student_filter_data.filter_date_to}`;
        window.open(URL, "_blank");
      }
    },
  },
};
</script>
