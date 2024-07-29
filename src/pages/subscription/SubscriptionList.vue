<style media="screen" type="text/css">
</style>
<template>
  <div>
    <div>
      <v-row justify="end">
        <v-col class="" md="6">
          <div class="text-right add-new-btn-text" @click="$router.push({name:'add_subscription_plan'})">
            {{ $lang.CREATE_SUBSCRIPTION_PLAN }}
            <v-btn class="ml-1" color="primary" depressed fab x-small>
              <v-icon size="24">mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-text-field
            v-model="search_query"
            :placeholder="$lang.SUBSCRIPTION_PLAN_SEARCH"
            append-icon="mdi-magnify"
            dense
            hide-details
            outlined
            rounded
            single-line
            @keyup="getSubscriptionPlanList"
        ></v-text-field>
      </v-col>
      <v-col class="text-right" cols="12" md="3">
        <v-select
            v-model="city"
            :items="cities"
            :placeholder="$lang.CITY"
            item-text="name"
            item-value="id"
            outlined
            hide-details
            dense
            clearable
            @change="getSubscriptionPlanList"
        ></v-select>
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
          :items="subscription_plan_list"
          :items-per-page="$keys.PAGE_LENGTH"
          :loading="table_loading"
          class="elevation-1 custom-header-bg custom-table-body"
      >

        <template v-slot:item.teaching_hours="{ item }">

          <p> {{ item.teaching_hours }} Hours/Days </p>
          <p>{{ item.classes_per_week }} Days/Week</p>
        </template>

        <template v-slot:item.action="{ item }">
          <div class="d-inline"
               @click="$router.push({name:'edit_subscription_plan',params:{id:encrypt(item.id)}})">
            <TableEditBtn></TableEditBtn>
          </div>
          <div class="d-inline" @click="openDeleteDialog(item.id,item.plan_name)">
            <TableDeleteBtn></TableDeleteBtn>
          </div>
        </template>
      </v-data-table>

      <v-pagination
          v-model="page_number"
          :length="total_page_count"
          :total-visible="7"
          class="custom-pagination"
          @input="getSubscriptionPlanList"
      ></v-pagination>

    </div>
    <DeleteDialog :data="delete_dialog" @yes="deletePlan()"></DeleteDialog>
  </div>
</template>

<script type="text/javascript">
// import {mapGetters} from 'vuex';


export default {
  components: {
    TableEditBtn: () => import("@/components/shared/buttons/TableEditBtn"),
    TableDeleteBtn: () => import("@/components/shared/buttons/TableDeleteBtn"),
    DeleteDialog: () => import("@/components/shared/dialogs/DeleteDialog"),
  },
  data() {
    return {
      pdf_url: "",
      pdf: "",
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      cities: [],
      city: "",
      subscription_plan_list: [],
      search_query: "",
      headers: [
        {text: "Plan Name", value: "plan_name", align: "start",},
        {text: "Price", value: "price", align: "right",},
        {text: "Grade", value: "grade_name",align: "left"},
        {text: "Plan Type", value: "plan_type"},
        {text: "Hours", value: "teaching_hours", align: "left",},
        {text: "City", value: "city", align: "left",},
        // {text: "Validity(in Month)", value: "validity", align: "center",},
        {text: "", value: "action", align: "end", width: "150px"},
      ],
      delete_dialog: {
        id: "",
        flag: false,
        title: "",
        message: "Delete this subscription plan permanently!",
      },
      filter_data: {
        retailer_id_list: [],
        wholesaler_id_list: [],
        status_list: [],
        type_list: [],
        filter_date_from: [],
        filter_date_to: [],
        filter_count: [],
      }
    };
  },
  computed: {},
  created() {
    this.getSubscriptionPlanList()
    this.cityList()
  },
  methods: {
    /* fetching shipment list */
    getSubscriptionPlanList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
        city_id: this.city,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.subscription_plan_list = response.data.subscription_plan_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
      };

      self.request_GET(
          self,
          self.$urls.LIST_SUBSCRIPTION_PLAN,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
          is_cancel
      );
    },
    /* openDeleteDialog */
    openDeleteDialog(id, plan_name) {
      this.delete_dialog.id = id
      this.delete_dialog.title = plan_name
      this.delete_dialog.flag = true
    },
    /* delete student Api call */
    deletePlan() {
      const self = this;
      self.$store.dispatch("setPageLoader", true);
      let form = new FormData();
      form.append("id", this.delete_dialog.id);
      const successHandler = (response) => {
        self.delete_dialog.flag = false;
        self.delete_dialog.id = '';
        self.delete_dialog.title = "";
        self.getSubscriptionPlanList();
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