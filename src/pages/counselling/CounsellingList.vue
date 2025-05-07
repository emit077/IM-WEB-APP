<style media="screen" type="text/css"></style>
<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <!-- status filter -->
        <div
          v-for="(item, i) in counselling_status_options"
          :key="i"
          :class="counselling_status == item.status ? 'elevation-5 ' : ''"
          class="px-3 py-1 d-inline mr-2 border-r-30 cursor-pointer"
          @click="(counselling_status = item.status), getCounsellingList()"
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
          :placeholder="$lang.STUDENT_SEARCH"
          append-icon="mdi-magnify"
          dense
          hide-details
          outlined
          single-line
          @keyup="getCounsellingList"
        ></v-text-field>
      </v-col>
    </v-row>

    <div>
      <v-data-table
        :disable-sort="true"
        :headers="headers"
        :hide-default-footer="true"
        :items="counselling_list"
        :items-per-page="$keys.PAGE_LENGTH"
        :loading="table_loading"
        class="elevation-1 custom-header-bg custom-table-body"
        item-key="tutor_table_id"
      >
        <!-- tutor details -->
        <template v-slot:[`item.student`]="{ item }">
          <AccountInfoCard
            :type="$keys.ACCOUNT_STUDENT"
            :account_details="{
              student_table_id: item.student.student_table_id,
              name: item.student.name,
              mobile: item.student.mobile,
              email: item.student.email,
              gender: item.student.gender,
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

        <!-- status -->
        <template v-slot:[`item.counselling_status`]="{ item }">
          <span :class="'status-' + item.counselling_status.toLowerCase()">{{
            item.counselling_status
          }}</span>
        </template>

        <!-- action -->
        <template v-slot:[`item.action`]="{ item }">
          <div>
            <div v-if="item.counselling_status == $keys.COUNSELLING_SCHEDULED">
              <div
                class="d-inline"
                @click="updateCounsellingStatus(item, $keys.COUNSELLING_COMPLETED)"
              >
                <CustomBtn icon="mdi-check" color="success" />
              </div>
              <!-- <div
                class="d-inline"
                @click="updateCounsellingStatus(item, $keys.COUNSELLING_CANCELLED)"
              >
                <CustomBtn icon="mdi-close" color="error" />
              </div> -->
              <div class="d-inline" @click="openResheduleDialog(item)">
                <CustomBtn icon="mdi-calendar-refresh" color="info" />
              </div>
            </div>
            <!-- <a
              class="d-inline ml-n2"
              :href="
                $router.resolve({
                  name: 'interview_details',
                  params: { id: encrypt(item.id) },
                }).href
              "
            >
              <TableDetailBtn></TableDetailBtn>
            </a> -->
          </div>
        </template>
      </v-data-table>
      <v-pagination
        v-model="page_number"
        :length="total_page_count"
        :total-visible="7"
        class="custom-pagination"
        @input="getCounsellingList"
      ></v-pagination>
    </div>

    <CounsellingDialog
      :dialog="counselling_dialog"
      @update="getCounsellingList()"
      ref="counselling_form"
    ></CounsellingDialog>

    <CounsellingFormDialog
      :dialog="counselling_form_dialog"
      @update="getCounsellingList()"
    />
  </div>
</template>

<script type="text/javascript">
export default {
  components: {
    AccountInfoCard: () => import("@/components/shared/table-components/AccountInfoCard"),
    TableDetailBtn: () => import("@/components/shared/buttons/TableDetailBtn"),
    CustomBtn: () => import("@/components/shared/buttons/CustomBtn"),
    CounsellingDialog: () => import("../../components/student/CounsellingDialog"),
    CounsellingFormDialog: () =>
      import("@/components/counselling/CounsellingFormDialog.vue"),
  },
  data() {
    return {
      total_page_count: 1,
      page_number: 1,
      table_loading: false,
      counselling_list: [],
      search_query: "",
      headers: [
        {
          text: "Student info",
          align: "start",
          value: "student",
        },
        { text: "Counsellor", align: "start", value: "bda" },
        { text: "Date ", value: "display_date", align: "center" },
        { text: "time", value: "display_time", align: "center" },
        { text: "Status", value: "counselling_status", align: "center" },
        { text: "", value: "action", align: "end", width: "180px" },
      ],
      counselling_status: this.$keys.COUNSELLING_SCHEDULED,
      counselling_status_options: [
        {
          status: "All",
          color: "#fffff",
        },
        {
          status: this.$keys.COUNSELLING_SCHEDULED,
          color: "#F2994A",
        },
        {
          status: this.$keys.COUNSELLING_COMPLETED,
          color: "#27AE60",
        },
        {
          status: this.$keys.COUNSELLING_CANCELLED,
          color: "#EB5757",
        },
      ],
      counselling_form_dialog: {
        counselling_table_id: null,
        flag: false,
        action: "Counselling Result",
      },
      counselling_dialog: {
        flag: false,
        student_table_id: null,
        action: "Reschedule Counselling",
      },
    };
  },
  created() {
    this.getCounsellingList();
  },
  methods: {
    /* fetching shipment list */
    getCounsellingList(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.search_query,
      };
      if (this.counselling_status != "All")
        params["counselling_status"] = this.counselling_status;

      const successHandler = (response) => {
        if (response.data.success) {
          self.counselling_list = response.data.counselling_list;
          self.total_page_count = response.data.total_page_count;
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.STUDENT_COUNSELLING_LIST,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
    },
    openResheduleDialog(item) {
      // prefill the form data
      this.counselling_dialog.student_table_id = item.student.student_table_id;
      this.$refs.counselling_form.form.bda = item.bda;
      this.$refs.counselling_form.form.date = item.date;
      this.$refs.counselling_form.form.time = item.time;
      this.$refs.counselling_form.form.is_online = item.is_online;
      this.$refs.counselling_form.form.special_concern = item.special_concern;
      this.$refs.counselling_form.form.meeting_url = item.meeting_url;
      // open dialog
      this.counselling_dialog.flag = true;
    },
    updateCounsellingStatus(item, counselling_status) {
      this.counselling_form_dialog.counselling_status = counselling_status;
      this.counselling_form_dialog.counselling_table_id = item.id;
      this.counselling_form_dialog.flag = true;
    },
  },
};
</script>
