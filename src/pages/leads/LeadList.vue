<style media="screen" type="text/css">
.lead_overdue {
  background-color: #fff20057;
}
</style>
<template>
  <div>
    <v-row class="my-6">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search_query"
          :placeholder="$lang.LEAD_SEARCH"
          append-icon="mdi-magnify"
          dense
          hide-details
          outlined
          single-line
          @keyup="getLeadList"
        ></v-text-field>
      </v-col>
      <v-col class="" cols="3" md="2">
        <div @click="openFilterDialog">
          <TableFilterBtn :filter_count="filter_data.filter_count" />
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
        :items="lead_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        class="custom-header-bg custom-table-body elevation-1"
        item-key="id"
        :item-class="getItemClass"
      >
        <!--      student info   -->
        <template v-slot:item.name="{ item }">
          <div class="py-2">
            <p class="mb-1">{{ item.name }}</p>
            <p class="mb-1">{{ item.mobile }}</p>
            <p class="mb-1">{{ item.email }}</p>
          </div>
        </template>
        <!--    lead type     -->
        <template v-slot:item.lead_type="{ item }">
          <span
            :class="item.lead_type.toLowerCase() + '_lead text-center'"
            class="px-3 py-1"
          >
            {{ item.lead_type }}
          </span>
        </template>
        <!--    lead status     -->
        <template v-slot:item.lead_status="{ item }">
          <span
            :class="item.lead_status.toLowerCase() + '_lead text-center'"
            class="px-3 py-1"
          >
            {{ item.lead_status }}
          </span>
        </template>

        <!--    lead assigned_to     -->
        <template v-slot:item.assigned_to="{ item }">
          <div class="py-2">
            <p class="mb-1">{{ item.assigned_to }}</p>
            <p class="mb-1">{{ item.assigned_to_mobile }}</p>
          </div>
        </template>

        <!--   action   -->
        <template v-slot:item.action="{ item }">
          <v-btn class="ml-2" color="primary" fab x-small @click="loadComment(item.id)">
            <v-icon> mdi-comment-text</v-icon>
          </v-btn>
          <!--  menu   -->
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-2"
                color="primary"
                outlined
                fab
                x-small
                v-bind="attrs"
                v-on="on"
              >
                <v-icon> mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(action, index) in action_list"
                :key="index"
                :class="actionFilter(item, action) ? '' : 'd-none'"
              >
                <v-list-item-title
                  @click="openActionDialog(action.value, item)"
                  class="cursor-pointer"
                  v-if="actionFilter(item, action)"
                >
                  {{ action.text }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <!--  empty state  -->
        <template v-slot:no-data>
          <EmptyTable :message="$lang.EMPTY_RETAILER" :type="$keys.EMPTY_TYPE_2" />
        </template>
      </v-data-table>

      <v-pagination
        v-model="page_number"
        :length="total_page_count"
        :total-visible="7"
        class="custom-pagination mt-5"
        @input="getLeadList"
      ></v-pagination>
    </div>
    <!--  action dialog -->
    <LeadActionDialog :dialog="action_dialog" @update="getLeadList" />
    <CommentDialog :dialog="comment_dialog" ref="lead_comment_dialog" />
    <lead-filters :filter_data="filter_data" @filter="getLeadList" />
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";

export default {
  components: {
    EmptyTable: () => import("@/components/shared/table-components/EmptyTable"),
    // TableActionBtn: () => import("@/components/shared/buttons/TableActionBtn"),
    LeadActionDialog: () => import("@/components/lead/LeadActionDialog"),
    CommentDialog: () => import("@/components/lead/CommentDialog"),
    leadFilters: () => import("@/components/lead/LeadFilters"),
    TableFilterBtn: () => import("@/components/shared/buttons/TableFilterBtn"),
  },

  data() {
    return {
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      lead_list: [],
      search_query: "",
      headers: [
        { text: "Lead ID", align: "start", value: "lead_id" },
        { text: "Student info", align: "start", value: "name" },
        { text: "City", value: "city" },
        { text: "Lead Type", value: "lead_type", align: "center" },
        { text: "Lead Status", value: "lead_status", align: "center" },
        { text: "Due Date", value: "due_date" },
        { text: "Assigned to", value: "assigned_to", align: "start" },
        { text: "", value: "action", align: "end", width: "150px" },
      ],
      filter_dialog: {
        flag: false,
      },
      action_dialog: {
        flag: false,
      },
      comment_dialog: {
        flag: false,
        lead_id: null,
      },
      action_list: [
        { text: "Re-Assign", value: "Re-Assign" },
        { text: "Re-Schedule", value: "Re-Schedule" },
        { text: "Makes As Dead", value: "Dead" },
        // {text: "Makes As Converted", value: "Converted"},
        { text: "Schedule Demo", value: "Schedule Demo" },
      ],
      filter_data: {
        flag: false,
        lead_status_list: [],
        lead_type_list: [],
        city_id_list: [],
        bda_id_list: [],
        filter_date_from: "",
        filter_date_to: "",
        filter_count: 0,
      },
    };
  },
  computed: mapGetters({
    lead_filter_data: "lead/getFilter",
  }),
  created() {
    this.getLeadList();
  },
  methods: {
    getItemClass(item) {
      if (item.is_overdue) return "lead_overdue";
      else return "";
    },
    /* action filter according to the lead status*/
    actionFilter(item, action) {
      if (action.value == this.$keys.SCHEDULE_DEMO && !item.student_table_id)
        return false;
      else return true;
    },
    /* fetching shipment list */
    getLeadList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
        bda_id_list: JSON.stringify(this.lead_filter_data.bda_id_list),
        lead_type_list: JSON.stringify(this.lead_filter_data.lead_type_list),
        lead_status_list: JSON.stringify(this.lead_filter_data.lead_status_list),
        filter_date_from: this.lead_filter_data.filter_date_from,
        filter_date_to: this.lead_filter_data.filter_date_to,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.lead_list = response.data.lead_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.LEAD_LIST,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
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
        self.getLeadList();
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
    loadComment(lead_id) {
      this.comment_dialog.flag = true;
      this.comment_dialog.lead_id = lead_id;
      this.$refs.lead_comment_dialog.getCommentList(lead_id);
    },
    /*Open filter dialog*/
    openFilterDialog() {
      console.log("methods_11");
      // this.$refs.shipmet_filter_dialog.getWholesalerList()
      this.filter_data.city_id_list = this.lead_filter_data.city_id_list;
      this.filter_data.bda_id_list = this.lead_filter_data.bda_id_list;
      this.filter_data.lead_status_list = this.lead_filter_data.lead_status_list;
      this.filter_data.lead_type_list = this.lead_filter_data.lead_type_list;
      this.filter_data.filter_date_from = this.lead_filter_data.filter_date_from;
      this.filter_data.filter_date_to = this.lead_filter_data.filter_date_to;
      this.filter_data.flag = true;
    },
  },
};
</script>
