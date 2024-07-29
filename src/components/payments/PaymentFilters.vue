<style lang="scss" media="screen" scoped>

.dialog-body {
  border-radius: 20px;
  overflow: hidden !important;
}

.filter-main-body {
  min-height: 440px;
  max-height: 440px;
  overflow-y: scroll;
}

.scrollable-box {
  min-height: 350px;
  max-height: 350px;
  overflow-y: scroll;
}

.cross-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}

.border-r {
  border-right: solid 2px #8180A6;
}

.border-b {
  border-bottom: solid 2px #8180A6;
}

</style>

<template>
  <v-dialog
      v-model="filter_data.flag"
      width="600"
      class="filter-dialog"
      :scollable="false"
  >
    <v-card class="dialog-body">
      <v-card-text class="pa-0">
        <v-btn class="cross-btn" fab small text>
          <v-icon color="primary" size="20" @click="filter_data.flag = false">
            mdi-window-close
          </v-icon>
        </v-btn>
        <v-card-title class="text-h6 grey lighten-2 flex-column py-2">
          {{ $lang.FILTER }}
        </v-card-title>

        <v-row class="border-b px-4 pt-3">
          <!--  Left Part of the filter -->

          <v-col md="4" class="border-r pl-4">
            <p class="filter-sub-title fw-bold fs-16 ">{{ $lang.FILTER_USING }}</p>

            <div v-for="(item, i) in filter_option" :key="i">
              <div
                  class="py-1 my-1 cursor-pointer"
                  @click="step = i + 1">

                  <span
                      class=""
                      :class="step == i + 1 ? 'fc-primary-light font-weight-bold fs-16' : ''"
                  >{{ item }}</span>

              </div>
            </div>
          </v-col>

          <!--  filter section -->
          <v-col md="8" class="px-0 filter-main-body">
            <v-stepper v-model="step" class="elevation-0">
              <v-stepper-items>
                <!-- $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ -->
                <!-- $$$$$$$$$$$$$$ STATUS FILTER $$$$$$$$$$$$$-->
                <!-- $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ -->
                <v-stepper-content step="1">
                  <v-checkbox
                      v-for="(item, i) in student_status_options"
                      :key="i"
                      v-model="filter_data.status_list"
                      :label="item.text"
                      :value="item.value"
                      @change="manageCount"
                      dense
                      hide-details
                      class="ml-2 mt-0 mb-2 "
                  >
                    <template v-slot:label>
                      <div>
                        <p class="sub-title-text-dark mb-0">{{ item.text }}</p>
                      </div>
                    </template>
                  </v-checkbox>
                </v-stepper-content>
                <!-- $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ -->
                <!-- $$$$$$$$$$$$$$ DATE FILTER $$$$$$$$$$$$$-->
                <!-- $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ -->
                <v-stepper-content step="2" class="px-5 py-0">
                  <div>
                    <!-- from date  -->
                    <div>
                      <p class="filter-sub-title">{{ $lang.FROM }}</p>
                      <v-menu
                          bottom
                          origin="center center"
                          transition="scale-transition"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <div
                              class="elevation-0"
                              v-bind="attrs"
                              v-on="on"
                          >
                            <label class="">
                              {{ $lang.FROM_DATE }}
                            </label><br>
                            <div>
                              <v-text-field
                                  v-model="form_date"
                                  placeholder="From date"
                                  dense
                                  outlined
                                  single-line
                                  maxlength="2"
                                  readonly
                                  hide-details
                              ></v-text-field>
                            </div>
                          </div>
                        </template>
                        <v-date-picker
                            v-model="form_date"
                            @change="dateChangeHandler()"
                            style="z-index: 5"
                        >
                          <!-- :max="today"-->

                        </v-date-picker>
                      </v-menu>
                    </div>
                    <!--  To date -->
                    <div>
                      <p class="filter-sub-title">{{ $lang.TO }}</p>
                      <v-menu
                          bottom
                          origin="center center"
                          transition="scale-transition"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <div
                              class="elevation-0 "
                              v-bind="attrs"
                              v-on="on"
                          >
                            <label class="">
                              {{ $lang.TO_DATE }}
                            </label><br>
                            <div>
                              <v-text-field
                                  v-model="to_date"
                                  placeholder="To date"
                                  dense
                                  outlined
                                  single-line
                                  maxlength="2"
                                  readonly
                                  hide-details
                              ></v-text-field>
                            </div>
                          </div>
                        </template>
                        <v-date-picker
                            v-model="to_date"
                            @change="dateChangeHandler()"
                            :min="form_date"
                        >
                          <!-- :max="today"-->

                        </v-date-picker>
                      </v-menu>
                    </div>
                  </div>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="mt-3">
        <v-row>
          <v-col md="6">
            <p class="fc-primary-light fw-bold fs-16 mt-1">
              {{ $lang.FILTER_SELECTED }}:
              {{ filter_count }}
            </p>
          </v-col>
          <v-col md="6" class="text-right">
            <v-btn color="primary" outlined @click="clearFIlter" class="mr-3">
                <span class="messge-text-green fs-13">
                  {{ $lang.CLEAR_ALL }}
                </span>
            </v-btn>
            <v-btn color="primary" @click="applyFilter" width="90">
              <span class="fs-13 font-bold px-4"> {{ $lang.APPLY }} </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["filter_data"],
  data() {
    return {
      step: 1,
      filter_option: ["Status", "Date"],
      student_status_options: [
        {text: this.$keys.PAYMENT_SUCCESS, value: this.$keys.PAYMENT_SUCCESS},
        {text: this.$keys.PAYMENT_UPCOMING, value: this.$keys.PAYMENT_UPCOMING},
        {text: this.$keys.PAYMENT_OVERDUE, value: this.$keys.PAYMENT_OVERDUE},
      ],
      today: new Date().toISOString().substr(0, 10),
      form_date: new Date().toISOString().substr(0, 10),
      to_date: new Date().toISOString().substr(0, 10),
      filter_count: 0,
    };
  },

  created() {
    this.setDisplayDate();
  },

  methods: {
    /* manage the filter count*/
    manageCount() {
      let t_len = this.filter_data.status_list.length;
      let d_len = 0;
      if (this.filter_data.filter_date_from)
        d_len = 1;
      this.filter_count = t_len + d_len;
    },
    applyFilter() {
      this.manageCount();
      this.filter_data.filter_count = this.filter_count;
      this.filter_data.flag = false;
      const self = this;
      this.$store.dispatch("payment/setFilter", {
        status_list: self.filter_data.status_list,
        filter_date_from: self.filter_data.filter_date_from,
        filter_date_to: self.filter_data.filter_date_to,
        filter_count: self.filter_data.filter_count,
      });
      this.$emit("filter");

    },
    /* clear filter */
    clearFIlter() {
      const self = this
      this.filter_data.status_list = [];
      this.filter_data.filter_date_from = "";
      this.filter_data.filter_date_to = "";
      this.manageCount();
    },
    dateChangeHandler() {
      this.filter_data.filter_date_from = this.form_date;
      this.filter_data.filter_date_to = this.to_date;
      this.setDisplayDate();
      this.manageCount();
    },
    setDisplayDate() {

    },
  },
};
</script>