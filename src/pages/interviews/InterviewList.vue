<style media="screen" type="text/css"></style>
<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <!-- status filter -->
        <div
          v-for="(item, i) in interview_status_options"
          :key="i"
          :class="interview_status == item.status ? 'elevation-5 ' : ''"
          class="px-3 py-1 d-inline mr-2 border-r-30 cursor-pointer"
          @click="(interview_status = item.status), getTutorList()"
        >
          <span>{{ item.status || "All" }}</span>
          <v-icon v-if="i > 0" size="10" class="pl-2" :color="item.color">
            mdi-checkbox-blank-circle
          </v-icon>
        </div>
        <!-- status filter end -->
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search_query"
          :placeholder="$lang.TUTOR_SEARCH"
          append-icon="mdi-magnify"
          dense
          hide-details
          outlined
          single-line
          @keyup="getTutorList"
        ></v-text-field>
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
        class="elevation-1 custom-header-bg custom-table-body"
        item-key="tutor_table_id"
      >
        <!-- tutor details -->
        <template v-slot:[`item.name`]="{ item }">
          <AccountInfoCard
            :type="$keys.ACCOUNT_TEACHER"
            :account_details="{
              tutor_table_id: item.id,
              name: item.tutor.name,
              mobile: item.tutor.mobile,
              email: item.tutor.email,
              gender: item.tutor.gender,
            }"
          />
        </template>

        <!-- BDA details -->
        <template v-slot:[`item.bda`]="{ item }">
          <AccountInfoCard
            :type="$keys.ACCOUNT_ADMISSION_COUNSELLOR"
            :account_details="{
              name: item.bda.name,
              mobile: item.bda.mobile,
              email: item.bda.email,
              gender: item.bda.gender,
            }"
          />
        </template>
        <!-- datetime -->
        <template v-slot:[`item.datetime`]="{ item }">
          <span>{{ item.time }}, {{ item.date }}</span>
        </template>

        <!-- status -->
        <template v-slot:[`item.result`]="{ item }">
          <span :class="'status-' + item.result.toLowerCase()">{{ item.result }}</span>
        </template>

        <!-- action -->
        <template v-slot:[`item.action`]="{ item }">
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
  </div>
</template>

<script type="text/javascript">
export default {
  components: {
    AccountInfoCard: () => import("@/components/shared/table-components/AccountInfoCard"),
    TableDetailBtn: () => import("@/components/shared/buttons/TableDetailBtn"),
  },
  data() {
    return {
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      tutor_list: [],
      search_query: "",
      headers: [
        { text: "Tutor ID", align: "start", value: "tutor_id", width: "120px" },
        { text: "Tutor info", align: "start", value: "name" },
        { text: "Interviewer", align: "start", value: "bda" },
        { text: "Date ", value: "date", align: "center" },
        { text: "time", value: "time", align: "center" },
        { text: "Result", value: "result", align: "center" },
        { text: "", value: "action", align: "end", width: "150px" },
      ],
      interview_status: this.$keys.RESULT_PENDING,
      interview_status_options: [
        {
          status: "All",
          color: "#fffff",
        },
        {
          status: this.$keys.RESULT_PENDING,
          color: "#F2994A",
        },
        {
          status: this.$keys.RESULT_SELECTED,
          color: "#27AE60",
        },
        {
          status: this.$keys.RESULT_REJECTED,
          color: "#EB5757",
        },
      ],
    };
  },
  created() {
    this.getTutorList();
  },
  methods: {
    /* fetching shipment list */
    getTutorList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
      };
      if (this.interview_status != "All")
        params["interview_status"] = this.interview_status;

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
        self.$urls.INTERVIEW_LIST,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
    },
  },
};
</script>
