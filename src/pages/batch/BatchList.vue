<style media="screen" type="text/css"></style>
<template>
  <div>
    <div
      v-if="
        [
          $keys.ACCOUNT_BUSINESS_DEVELOPER,
          $keys.ACCOUNT_ADMIN,
          $keys.ACCOUNT_SUPER_ADMIN,
        ].includes($store.state.user.account_type)
      "
    >
      <v-row justify="end">
        <v-col class="" md="6">
          <div class="text-right">
            <span
              class="fc-primary cursor-pointer"
              @click="$router.push({ name: 'batch_new' })"
            >
              {{ $lang.CREATE_BATCH }}
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
          @keyup="getBatchList"
        ></v-text-field>
      </v-col>
      <v-col class="" cols="3" md="2">
        <!--        <div>-->
        <!--          <div @click="openFilterDialog">-->
        <!--            <TableFilterBtn :filter_count="filter_data.filter_count"/>-->
        <!--          </div>-->
        <!--        </div>-->
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
        :items="batch_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        :single-select="singleSelect"
        class="elevation-1 custom-header-bg custom-table-body"
        item-key="shipment_id"
      >
        <!-- tutor info -->
        <template v-slot:item.tutor_name="{ item }">
          <div>
            <div v-for="tutor in item.tutor_list" :key="tutor.id" class="mt-1">
              <p class="font-weight-bold large-screen">{{ tutor.name }}</p>
              <p class="font-weight-bold text-h6 small-screen">
                {{ tutor.name }}
              </p>
              <p v-if="$keys.ACCOUNT_STUDENT != getUser.account_type">
                {{ tutor.mobile }}
              </p>
            </div>
          </div>
        </template>

        <!-- BDA info -->
        <template v-slot:item.bda_name="{ item }">
          <div>
            <p class="font-weight-bold">{{ item.bda_name }}</p>
            <p>{{ item.bda_mobile }}</p>
          </div>
        </template>

        <!-- Student info -->
        <template v-slot:item.student_list="{ item }">
          <div v-for="student in item.student_list" :key="student.id" class="mt-1">
            <p class="font-weight-bold large-screen">{{ student.name }}</p>
            <p class="font-weight-bold text-h6 small-screen">
              {{ student.name }}
            </p>
            <p>{{ student.mobile }}</p>
          </div>
        </template>

        <template v-slot:item.action1="{ item }">
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

        <template v-slot:item.action="{ item }">
          <div
            class="d-inline"
            v-if="
              [
                $keys.ACCOUNT_BUSINESS_DEVELOPER,
                $keys.ACCOUNT_ADMIN,
                $keys.ACCOUNT_SUPER_ADMIN,
              ].includes($store.state.user.account_type)
            "
            @click="
              $router.push({
                name: 'batch_edit',
                params: { batch_table_id: encrypt(item.id) },
              })
            "
          >
            <TableEditBtn></TableEditBtn>
          </div>
          <!--          <div class="d-inline" @click="deleteStudent(item.id)">-->
          <!--            <TableDeleteBtn></TableDeleteBtn>-->
          <!--          </div>-->
          <a
            class="d-inline"
            :href="
              $router.resolve({
                name: 'batch_details',
                params: { batch_table_id: encrypt(item.id) },
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
        @input="getBatchList"
      ></v-pagination>
    </div>

    <StudentFilters :filter_data="filter_data" @filter="getBatchList" />
    <ToggleStatusDialog :data="dialog" @yes="toggleAccountStatus" @no="getBatchList" />
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  components: {
    TableEditBtn: () => import("@/components/shared/buttons/TableEditBtn"),
    ToggleStatusDialog: () =>
      import("../../components/shared/dialogs/ToggleStatusDialog"),
    TableDetailBtn: () => import("../../components/shared/buttons/TableDetailBtn"),
    // TableFilterBtn: () => import("@/components/shared/buttons/TableFilterBtn"),
    StudentFilters: () => import("../../components/student/StudentFilters"),
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
      batch_list: [],
      selected: [],
      singleSelect: false,
      search_query: "",
      headers: [
        { text: "Student info", align: "start", value: "student_list" },
        { text: "Batch ID", align: "start", value: "batch_id" },
        { text: "Tutor info", align: "start", value: "tutor_name" },
        { text: "BDA info", value: "bda_name" },
        { text: "", value: "action", align: "end", width: "120px" },
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
    };
  },
  computed: mapGetters({
    student_filter_data: "students/getFilter",
  }),
  created() {
    this.getBatchList();
    if (this.getUser.account_type == this.$keys.ACCOUNT_STUDENT)
      this.headers = [
        { text: "Tutor info", align: "start", value: "tutor_name" },
        { text: "Batch ID", align: "start", value: "batch_id" },
        { text: "SAC info", value: "bda_name" },
        { text: "", value: "action", align: "end", width: "120px" },
      ];
  },
  methods: {
    // /*Open filter dialog*/
    openFilterDialog() {
      this.filter_data.city_id_list = this.student_filter_data.city_id_list;
      this.filter_data.bda_id_list = this.student_filter_data.bda_id_list;
      this.filter_data.student_status_list = this.student_filter_data.student_status_list;
      this.filter_data.class_id_list = this.student_filter_data.class_id_list;
      this.filter_data.filter_date_from = this.student_filter_data.filter_date_from;
      this.filter_data.filter_date_to = this.student_filter_data.filter_date_to;
      this.filter_data.flag = true;
    },
    /* fetching batch list */
    getBatchList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
        bda_id_list: JSON.stringify(this.student_filter_data.bda_id_list),
        city_id_list: JSON.stringify(this.student_filter_data.city_id_list),
        student_status_list: JSON.stringify(this.student_filter_data.student_status_list),
        class_id_list: JSON.stringify(this.student_filter_data.class_id_list),
        filter_date_from: this.student_filter_data.filter_date_from,
        filter_date_to: this.student_filter_data.filter_date_to,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.batch_list = response.data.batch_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.BATCH_LIST,
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
        self.getBatchList();
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
        self.getBatchList();
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
  },
};
</script>
