<style lang="scss" scoped>
.overview-stats-card {
  border-radius: 20px;
  padding: 15px 20px;
  background-color: rgb(var(--primary_rgb));
}

.w-25 {
  width: 25%;
}

.w-75 {
  width: 75%;
}
</style>
<template>
  <div class="px-2">
    <v-row>
      <v-col cols="12" md="8">
        <v-row class="mb-3">
          <v-col cols="12" md="6">
            <StatsCards
              :data="{
                title: 'Students',
                count: student_count,
                change: student_change,
                icon: 'mdi-account-school',
              }"
            />
          </v-col>
          <v-col cols="12" md="6">
            <StatsCards
              :data="{
                title: 'Tutors',
                count: tutors_count,
                change: tutor_change,
                icon: 'mdi-account',
              }"
            />
          </v-col>
        </v-row>

        <!-- charts -->
        <v-card class="pa-4 pb-6" flat outlined>
          <h2 class="mb-5">Student Registration Trend</h2>
          <LineChart :id="'line-chart-1'" ref="line_chart_1" />
        </v-card>
        <v-card class="pa-3 pb-6 mt-5" flat outlined>
          <h2 class="mb-5">Tutors Registration Trend</h2>
          <LineChart :id="'line-chart-2'" ref="line_chart_2" />
        </v-card>
        <!-- end charts -->
      </v-col>
      <v-col cols="12" md="4"></v-col>
    </v-row>
  </div>
</template>
<script type="text/javascript">
import ChartData from "../../helper/chart-data";

export default {
  components: {
    LineChart: () => import("../../components/overview/LineChart"),
    StatsCards: () => import("../../components/overview/StatsCards"),
  },
  data() {
    return {
      student_count: 0,
      tutors_count: 0,
      batch_count: 0,
      teaching_hours: 0,
      chart_data: [],
      tutor_change: 0,
      student_change: 0,
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
      let params = {};
      const successHandler = (response) => {
        if (response.data.success) {
          self.student_count = response.data.student_count;
          self.tutors_count = response.data.tutor_count;
          self.batch_count = response.data.batch_count;
          self.teaching_hours = response.data.teaching_hours;
          self.tutor_change = response.data.tutor_change;
          self.student_change = response.data.student_change;

          self.chart_data = response.data.chart_data;
          self.chart_data.forEach(function (currentValue, index, arr) {
            var data = ChartData;
            data.labels = self.chart_data[index].label_list;
            data.data.datasets.data = self.chart_data[index].values;
            self.$refs["line_chart_" + (index + 1).toString()].drawChartHandler(
              "line-chart-" + (index + 1).toString(),
              currentValue.label_list,
              currentValue.values
            );
          });
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);

        // this.$refs.line_chart_2.drawChartHandler('line-chart-2', ChartData)
      };

      self.request_GET(
        self,
        self.$urls.ADMIN_OVERVIEW,
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
