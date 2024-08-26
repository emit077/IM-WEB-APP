<style media="screen" type="text/css"></style>
<template>
  <div>
    <div>
      <v-row justify="end">
        <v-col class="" md="6">
          <div class="text-right">
            <span
              class="fc-primary cursor-pointer"
              @click="$router.push({ name: 'add_bda' })"
            >
              {{ $lang.ADD_EXECUTIVE }}
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
          :placeholder="$lang.BDA_SEARCH"
          append-icon="mdi-magnify"
          dense
          hide-details
          outlined
          single-line
          @keyup="getBDAList"
        ></v-text-field>
      </v-col>
      <v-col class="" cols="3" md="2">
        <div>
          <!--          <div @click="openFilterDialog">-->
          <!--            <TableFilterBtn :filter_count="filter_data.filter_count"/>-->
          <!--          </div>-->
        </div>
      </v-col>
      <v-col class="" cols="9" md="2"> </v-col>
    </v-row>

    <!-- status filter -->
    <div class="mb-5">
      <div
        v-for="(item, i) in account_status_options"
        :key="i"
        :class="account_status == item.status ? 'elevation-5 ' : ''"
        class="px-3 py-1 d-inline mr-2 border-r-30 cursor-pointer"
        @click="(account_status = item.status), getBDAList()"
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
        :items="bda_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        class="elevation-1 custom-header-bg custom-table-body"
        item-key="shipment_id"
      >
        <!-- <template v-slot:[`item.name`]="{ item }">
          <div>
            <p class="font-weight-bold">{{ item.name }}</p>
          </div>
        </template> -->
        <template v-slot:[`item.mobile`]="{ item }">
          <div>
            <p>
              {{ item.mobile
              }}<span v-if="item.secondary_mobile">, {{ item.secondary_mobile }}</span>
            </p>
            <p>{{ item.email }}</p>
          </div>
        </template>

        <template v-slot:[`item.account_type`]="{ item }">
          <span :title="item.account_type">
            {{ $lang.BDA_ABBREVIATION[item.account_type] }}
          </span>
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

        <template v-slot:[`item.action`]="{ item }">
          <div
            class="d-inline"
            @click="
              $router.push({
                name: 'edit_bda',
                params: { bda_table_id: encrypt(item.bda_table_id) },
              })
            "
          >
            <TableEditBtn></TableEditBtn>
          </div>
          <!--          <div class="d-inline" @click="deleteStudent(item.id)">-->
          <!--            <TableDeleteBtn></TableDeleteBtn>-->
          <!--          </div>-->
          <!--          <div class="d-inline"-->
          <!--               @click="$router.push({name:'student_profile',params:{bda_table_id:encrypt(item.bda_table_id)}})">-->
          <!--            <TableDetailBtn></TableDetailBtn>-->
          <!--          </div>-->
        </template>
      </v-data-table>

      <v-pagination
        v-model="page_number"
        :length="total_page_count"
        :total-visible="7"
        class="custom-pagination"
        @input="getBDAList"
      ></v-pagination>
    </div>
    <ToggleStatusDialog :data="dialog" @yes="toggleAccountStatus" @no="getBDAList" />
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  components: {
    TableEditBtn: () => import("@/components/shared/buttons/TableEditBtn"),
    ToggleStatusDialog: () =>
      import("../../components/shared/dialogs/ToggleStatusDialog"),
    // TableDetailBtn: () => import("../../components/shared/buttons/TableDetailBtn"),
    // TableFilterBtn: () => import("@/components/shared/buttons/TableFilterBtn"),
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
      search_query: null,
      bda_list: [],
      headers: [
        { text: "Associate ID", align: "start", value: "associate_id" },
        { text: "Name", align: "start", value: "name" },
        { text: "Contact info", align: "start", value: "mobile" },
        { text: "Gender", align: "center", value: "gender" },
        { text: "City", value: "city" },
        { text: "Type", align: "center", value: "account_type" },
        { text: "Blocked", value: "action1", align: "end", width: "40px" },
        { text: "", value: "action", align: "end", width: "110px" },
      ],
      dialog: {
        flag: false,
      },
      account_status: "Active",
      account_status_options: [
        {
          status: "All",
          color: "#fffff",
        },
        {
          status: "Active",
          color: "#27AE60",
        },
        {
          status: "Blocked",
          color: "#EB5757",
        },
      ],
    };
  },
  computed: mapGetters({
    // student_filter_data: "students/getFilter",
  }),
  created() {
    this.getBDAList();
  },
  methods: {
    /* fetching shipment list */
    getBDAList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
      };
      if (this.account_status != "All") params.account_status = this.account_status;

      const successHandler = (response) => {
        if (response.data.success) {
          self.bda_list = response.data.bda_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.BDA_LIST,
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
        self.getBDAList();
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
        self.getBDAList();
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
