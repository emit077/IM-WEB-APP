<style lang="scss" scoped>
.overview-stats-card {
  border-radius: 20px;
  padding: 15px 20px;
  background-color:rgb(var(--primary_rgb));
}

.w-25 {
  width: 25%;
}

.w-75 {
  width: 75%;
}
</style>
<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="12" md="3">
        <div class="elevation-5 overview-stats-card">
          <div class="d-inline-block v-align-middle w-25">
            <img src="../../assets/overview/student.svg" alt="" height="70px">
          </div>
          <div class="d-inline-block v-align-middle w-75">
            <h1 class="text-center fw-bold white--text ma-0">{{ student_count }}</h1>
            <p class="fs-16 text-center font-weight-regular fc-secondary ma-0">{{ $lang.STUDENT }}s</p>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="3">
        <div class="elevation-5 overview-stats-card">
          <div class="d-inline-block v-align-middle w-25">
            <img src="../../assets/overview/teacher.svg" alt="" height="70px">
          </div>
          <div class="d-inline-block v-align-middle w-75">
            <h1 class="text-center fw-bold white--text ma-0">{{ tutors_count }}</h1>
            <p class="fs-16 text-center font-weight-regular fc-secondary ma-0">{{ $lang.TUTOR }}s</p>
          </div>
        </div>
      </v-col>


      <v-col cols="12" md="3">
        <div class="elevation-5 overview-stats-card">
          <div class="d-inline-block v-align-middle w-25">
            <img src="../../assets/overview/batch.svg" alt="" height="70px">
          </div>
          <div class="d-inline-block v-align-middle w-75">
            <h1 class="text-center fw-bold white--text ma-0">{{ batch_count }}</h1>
            <p class="fs-16 text-center font-weight-regular fc-secondary ma-0">{{ $lang.BATCH }}</p>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="3">
        <div class="elevation-5 overview-stats-card">
          <div class="d-inline-block v-align-middle w-25">
            <img src="../../assets/overview/hours.svg" alt="" height="70px">
          </div>
          <div class="d-inline-block v-align-middle w-75">
            <h1 class="text-center fw-bold white--text ma-0">{{ teaching_hours }}</h1>
            <p class="fs-16 text-center font-weight-regular fc-secondary ma-0">{{ $lang.HOURS }}</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <h4 class="mb-5 text-center">Student Registration Graph</h4>
        <LineChart :id="'line-chart-1'" ref="line_chart_1"/>
      </v-col>
      <v-col cols="12" md="6">
        <h4 class="mb-5 text-center">Tutors Registration Graph</h4>
        <LineChart :id="'line-chart-2'" ref="line_chart_2"/>
      </v-col>
    </v-row>

  </div>
</template>
<script type="text/javascript">
import ChartData from '../../helper/chart-data'

export default {
  components: {
    LineChart: () => import('../../components/overview/LineChart'),
  },
  data() {
    return {
      student_count: 0,
      tutors_count: 0,
      batch_count: 0,
      teaching_hours: 0,
      chart_data: [],
    };
  },
  created() {
    this.getTutorList()
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
          self.chart_data = response.data.chart_data;
          self.chart_data.forEach(function (currentValue, index, arr) {
            var data = ChartData
            data.labels = self.chart_data[index].label_list
            data.data.datasets.data = self.chart_data[index].values
            self.$refs['line_chart_' + (index + 1).toString()].drawChartHandler(
                'line-chart-' + (index + 1).toString(),
                currentValue.label_list,
                currentValue.values,
            )
          })
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
      )
      ;
    },
  },
};
</script>