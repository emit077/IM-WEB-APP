<style media="screen" type="text/css">
.premium-plan-card-bg {
  /*background-color: #8f92d545 !important;*/
}

.standard-plan-card-bg {
  /*background-color: #ffff001c !important;*/
}

.basic-plan-card-bg {
  /*background-color: #8f92d545 !important;*/
}

.plan-wrapper {
  border: solid 1px gray;

}
</style>
<template>
  <div>
    <v-row justify="end">
      <v-col class="" md="6">
        <div class="text-right cursor-pointer add-new-btn-text" @click="$router.push({name:'subscription_history'})">
          {{ $lang.SUBSCRIPTION_HISTORY }}
        </div>
      </v-col>
    </v-row>

    <!--    -->
    <div class="basic-plan-card-bg my-3" v-if="basic_plan.length>0">
      <h3 class="text-center fc-primary mb-3"> Basic Plans</h3>
      <v-row justify="center">
        <v-col md="4" cols="12" sm="12" v-for="plan in basic_plan" :key="plan.id">
          <v-card class=" elevation-2 px-5 pt-5 pb-3 border-r-30" outlined>
            <p class="fc-primary font-weight-bold fs-18 mb-2"> {{ plan.plan_name }}</p>
            <v-simple-table class="mb-3" style="background-color: transparent">
              <tr>
                <td style="width: 180px">Hours</td>
                <td>{{ plan.teaching_hours }} <span class="fs-10 sub-text-light">Hours/Day</span></td>
              </tr>
              <tr>
                <td>Classes in Week</td>
                <td>{{ plan.classes_per_week }} <span class="fs-10 sub-text-light">Days/Week</span></td>
              </tr>

              <tr>
                <td>Subjects allowed</td>
                <td>{{ plan.number_of_subjects }}</td>
              </tr>
            </v-simple-table>

            <v-divider></v-divider>
            <v-card-actions class="px-0">
              <v-row no-gutters class="pt-2">
                <v-col md="8" class="text-left py-0">
                  <div class="page-title text-left">
									<span class="fs-13 fw-500">
										{{ $lang.PRICE }}:
									</span>
                    <span class="fw-normal">
										<span class="fw-bold">₹{{ plan.price }}</span>
										<span class="fs-10 sub-text-light">/Month</span>
									</span>
                  </div>
                </v-col>
                <v-col md="4" class="text-right py-0">
                  <v-spacer>
                  </v-spacer>
                  <v-btn color="primary" @click="$router.push({name:'subscription_summary',params:{id:encrypt(plan.id)}})">
                    <b>
                      {{ $lang.BUY_NOW.toUpperCase() }}
                    </b>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
    <div class="standard-plan-card-bg my-3" v-if="standard_plan.length>0">
      <h3 class="text-center fc-primary mb-3"> Standard Plans</h3>
      <v-row justify="center">
        <v-col md="4" cols="12" sm="12" v-for="plan in standard_plan" :key="plan.id">
          <v-card class=" elevation-2 px-5 pt-5 pb-3 border-r-30" outlined>
            <p class="fc-primary font-weight-bold fs-18 mb-2"> {{ plan.plan_name }}</p>
            <v-simple-table class="mb-3" style="background-color: transparent">
              <tr>
                <td style="width: 180px">Hours</td>
                <td>{{ plan.teaching_hours }} <span class="fs-10 sub-text-light">Hours/Day</span></td>
              </tr>
              <tr>
                <td>Classes in Week</td>
                <td>{{ plan.classes_per_week }} <span class="fs-10 sub-text-light">Days/Week</span></td>
              </tr>

              <tr>
                <td>Subjects allowed</td>
                <td>{{ plan.number_of_subjects }}</td>
              </tr>
            </v-simple-table>

            <v-divider></v-divider>
            <v-card-actions class="px-0">
              <v-row no-gutters class="pt-2">
                <v-col md="8" class="text-left py-0">
                  <div class="page-title text-left">
									<span class="fs-13 fw-500">
										{{ $lang.PRICE }}:
									</span>
                    <span class="fw-normal">
										<span class="fw-bold">₹{{ plan.price }}</span>
										<span class="fs-10 sub-text-light">/Month</span>
									</span>
                  </div>
                </v-col>
                <v-col md="4" class="text-right py-0">
                  <v-spacer>
                  </v-spacer>
                  <v-btn color="primary" @click="$router.push({name:'subscription_summary',params:{id:encrypt(plan.id)}})">
                    <b>
                      {{ $lang.BUY_NOW.toUpperCase() }}
                    </b>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-divider></v-divider>
    <div class="premium-plan-card-bg mb-3" v-if="premium_plan.length>0">
      <h3 class="text-center fc-primary mb-3"> Premium plans</h3>
      <v-row justify="center">
        <v-col md="4" cols="12" sm="12" v-for="plan in premium_plan" :key="plan.id">
          <v-card class=" elevation-2 px-5 pt-5 pb-3 border-r-30" outlined>
            <p class="fc-primary font-weight-bold fs-18 mb-2"> {{ plan.plan_name }}</p>
            <v-simple-table class="mb-3" style="background-color: transparent">
              <tr>
                <td style="width: 180px">Hours</td>
                <td>{{ plan.teaching_hours }} <span class="fs-10 sub-text-light">Hours/Day</span></td>
              </tr>
              <tr>
                <td>Classes in Week</td>
                <td>{{ plan.classes_per_week }} <span class="fs-10 sub-text-light">Days/Week</span></td>
              </tr>

              <tr>
                <td>Subjects allowed</td>
                <td>{{ plan.number_of_subjects }}</td>
              </tr>
            </v-simple-table>

            <v-divider></v-divider>
            <v-card-actions class="px-0">
              <v-row no-gutters class="pt-2">
                <v-col md="8" class="text-left py-0">
                  <div class="page-title text-left">
									<span class="fs-13 fw-500">
										{{ $lang.PRICE }}:
									</span>
                    <span class="fw-normal">
										<span class="fw-bold">₹{{ plan.price }}</span>
										<span class="fs-10 sub-text-light">/Month</span>
									</span>
                  </div>
                </v-col>
                <v-col md="4" class="text-right py-0">
                  <v-spacer>
                  </v-spacer>
                  <!-- <v-btn color="primary" @click="buyPlan(plan)"> -->
                  <v-btn color="primary" @click="$router.push({name:'subscription_summary',params:{id:encrypt(plan.id)}})">
                    <b>
                      {{ $lang.BUY_NOW.toUpperCase() }}
                    </b>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>


    <BuySubscriptionDialog ref="buy_subscription_dialog" :dialog="dialog" :plan="selected_plan"
                           :tenure_list="tenure_list"></BuySubscriptionDialog>
  </div>
</template>

<script type="text/javascript">
// import {mapGetters} from 'vuex';


export default {
  components: {
    BuySubscriptionDialog: () => import('../../components/subscriptions/BuySubscriptionDialog'),
  },
  data() {
    return {
      total_page_count: 1,
      page_number: 1,
      subscription_plan_list: [],
      basic_plan: [],
      standard_plan: [],
      premium_plan: [],
      search_query: "",
      selected_plan: null,
      tenure_list: [],
      dialog: {
        flag: false,
      },
    };
  },
  // computed: mapGetters({
  //   shipment_filter_data: "shipment/getShipmentFilter",
  // }),
  created() {
    this.getSubscriptionPlanList()
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
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.subscription_plan_list = response.data.subscription_plan_list;
          self.basic_plan = response.data.Basic;
          self.standard_plan = response.data.Standard;
          self.premium_plan = response.data.Premium;
          self.tenure_list = response.data.tenure_list;
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

    buyPlan(selected_plan) {
      this.selected_plan = selected_plan
      this.dialog.flag = true
      this.$refs.buy_subscription_dialog.d_price = selected_plan.price
      this.$refs.buy_subscription_dialog.price = selected_plan.price
      this.$refs.buy_subscription_dialog.tenure = this.tenure_list[0]
    },

  },
};
</script>