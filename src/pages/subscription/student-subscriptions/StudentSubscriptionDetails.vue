<style lang="scss" scoped>
.payment-table th {
  background-color: #d3d3d387;
  padding: 5px;
}

.payment-table td {
  padding: 5px;
  font-size: 14px;
}
</style>
<template>
  <div>
    <div class="mt-2 text-right">
      <!-- <a class="" :href="$urls[$project.NAME][$project.ENV]+$urls.GET_INVOICE+std_subscription_id" target="_blank">
        <v-btn small color="primary">
          Download Invoice
          <v-icon small>mdi-download</v-icon>
        </v-btn>
      </a> -->
    </div>
    <v-row :class="{'px-2': $vuetify.breakpoint. smAndDown, 'px-6': $vuetify.breakpoint. mdAndUp}"
           class="mx-0 py-2 mb-3 text-left">
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">{{ $lang.STUDENT_ID }}:</label>
        <p class="text-1">{{ student_id }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">{{ $lang.STUDENT_NAME }}:</label>
        <p class="text-1">{{ student_name }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">{{ $lang.MOBILE_NUMBER }}:</label>
        <p class="text-1">{{ mobile }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">{{ $lang.PLAN_NAME }}:</label>
        <p class="text-1">{{ plan_name }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">{{ $lang.STATUS }}:</label>
        <p class="text-1">
          <span class="px-3" :class="subscription_status.toLowerCase()">{{ subscription_status }}</span>
        </p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">{{ $lang.PLAN_TYPE }} :</label>
        <p class="text-1">{{ plan_type }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">{{ $lang.PRICE }} :</label>
        <p class="text-1">₹{{ price }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">{{ $lang.VALIDITY }}</label>
        <p class="text-1">{{ start_date }} to {{ expiry_date }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">Number of Students :</label>
        <p class="text-1">{{ number_of_students }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">Number of Subjects :</label>
        <p class="text-1">{{ number_of_subjects }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">{{ $lang.CLASSES_PER_WEEK }} :</label>
        <p class="text-1">{{ classes_per_week }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">Total {{ $lang.HOURS }} :</label>
        <p class="text-1">{{ teaching_hours }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1">Remaining {{ $lang.HOURS }} :</label>
        <p class="text-1">{{ remaining_teaching_hours }}</p>
      </v-col>
      <v-col class="py-1" cols="12" md="4" sm="6">
        <label class="label-text-1"> {{ $lang.INVOICE_TYPE }} :</label>
        <p class="text-1">{{ invoice_type }}</p>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div :class="{'px-2': $vuetify.breakpoint. smAndDown, 'px-2': $vuetify.breakpoint. mdAndUp}" class="my-4">
      <h4>Payment Summary</h4>
      <v-row class="mx-0 py-2 mb-3 text-left">
        <v-col class="py-1" cols="12" md="4" sm="6">
          <v-simple-table class="payment-table text-left mt-4">
            <tr>
              <td>{{ $lang.PRICE }}</td>
              <td class="text-right">{{ price }}</td>
            </tr>
            <tr>
              <td> Promo {{ $lang.DISCOUNT }} <small v-if="promo_code" class="fw-bold">({{ promo_code }})</small></td>
              <td class="text-right"><small>(-)</small> {{ discount_amount }}</td>
            </tr>
            <tr style=" background-color: #d3d3d387; ">
              <td>{{ $lang.TOTAL }}</td>
              <td class="text-right fw-bold">{{ payable_amount }}</td>
            </tr>

          </v-simple-table>
        </v-col>
        <v-col class="py-1" cols="12" md="8" sm="6">
          <v-simple-table class="payment-table text-left mt-4">
            <tr>
              <th>Due Date</th>
              <th>Payment Date</th>
              <th>Amount</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
            <tr v-for="(payment,i) in payment_list" :key="i">
              <td>{{ payment.due_date }}</td>
              <td>{{ payment.payment_date || "-" }}</td>
              <td>{{ payment.amount }}</td>
              <td>{{ payment.payment_mode }}</td>
              <td><span :class="'pay-'+payment.payment_status.toLowerCase()" class="px-3">{{
                  payment.payment_status
                }}</span></td>
            </tr>

          </v-simple-table>
        </v-col>
      </v-row>


    </div>
    <v-divider></v-divider>
  </div>
</template>

<script>

export default {
  data() {
    return {
      std_subscription_id: null,
      student_id: "",
      student_name: "",
      mobile: "",
      plan_name: "",
      plan_type: "",
      price: "",
      payable_amount: "",
      discount_amount: "",
      teaching_hours: "",
      remaining_teaching_hours: "",
      start_date: "",
      expiry_date: "",
      is_active: "",
      number_of_students: "",
      number_of_subjects: "",
      classes_per_week: "",
      subscription_status: "",
      invoice_type: "",
      promo_code: "",
      payment_list: [],
    }
  },
  created() {
    if (this.$route.params.std_subscription_id) {
      this.std_subscription_id = this.decrypt(this.$route.params.std_subscription_id)
      this.getSubscriptionDetails()
    }
  },
  methods: {
    getSubscriptionDetails() {
      const self = this;
      self.$store.dispatch("setPageLoader", true);
      let params = {
        std_subscription_plan_id: this.std_subscription_id,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.plan_name = response.data.plan_name;
          self.plan_type = response.data.plan_type;
          self.price = response.data.price;
          self.teaching_hours = response.data.teaching_hours;
          self.remaining_teaching_hours = response.data.remaining_teaching_hours;
          self.start_date = response.data.from_date;
          self.expiry_date = response.data.to_date;
          self.is_active = response.data.is_active;
          self.number_of_students = response.data.number_of_students;
          self.number_of_subjects = response.data.number_of_subjects;
          self.classes_per_week = response.data.classes_per_week;
          self.payment_list = response.data.payment_list;
          self.subscription_status = response.data.subscription_status;
          self.invoice_type = response.data.invoice_type;
          self.student_id = response.data.student_id;
          self.student_name = response.data.student_name;
          self.mobile = response.data.mobile;
          self.payable_amount = response.data.payable_amount;
          self.discount_amount = response.data.discount_amount;
          self.promo_code = response.data.promo_code;
        }
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
          self,
          self.$urls.STUDENT_SUBSCRIPTION_DETAILS,
          params,
          successHandler,
          null,
          null,
          finallyHandler,
      );
    },

  }
}
</script>