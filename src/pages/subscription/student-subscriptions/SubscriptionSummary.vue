<style lang="scss" media="screen" scoped>
.price-selection-block {
  border: solid 1px lightgrey;
  border-radius: 10px;
}

.selected-price-selection-block {
  background-color: #32345f;
  border-radius: 10px;
  color: yellow;

  .label-text-1 {
    color: white;
  }
}
table tr td {
  padding: 7px 0px;
}
.payment-table tr td {
  padding: 7px 5px;
}
.payment-table tr:nth-child(2n) {
  background-color: #8080801f;
}
</style>
<template>
  <div>
    <v-row justify="center">
      <v-col md="6" cols="12" sm="12" class="pb-0">
        <v-card-text class="px-2 pb-0">
          <v-simple-table class="">
            <tr>
              <td style="width: 180px">Plan Name</td>
              <td class="fw-bold">
                {{ subscription_plan.plan_name }}
              </td>
            </tr>
            <tr>
              <td style="width: 180px">Hours</td>
              <td>
                <strong>{{ subscription_plan.teaching_hours }}</strong>
                <span class="fs-10 sub-text-light">Hours/Day</span>
              </td>
            </tr>
            <tr>
              <td>Classes in Week</td>
              <td>
                {{ subscription_plan.classes_per_week }}
                <span class="fs-10 sub-text-light">Days/Week</span>
              </td>
            </tr>
            <tr>
              <td>Subjects allowed</td>
              <td>{{ subscription_plan.number_of_subjects }}</td>
            </tr>
            <tr
              v-if="
                subscription_plan.description && subscription_plan.description.length > 2
              "
            >
              <td colspan="2">
                <p class="subscription-description">
                  {{ subscription_plan.description }}
                </p>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <p class="py-2">Select Tenure</p>
                <div
                  v-for="(item, i) in tenure_list"
                  :key="i"
                  class="d-inline-block text-center align-center cursor-pointer pr-1 pb-4"
                >
                  <div
                    class="px-3 py-1 price-selection-block"
                    :class="
                      tenure == item
                        ? 'selected-price-selection-block'
                        : 'price-selection-block'
                    "
                    @click="tenure = item"
                  >
                    <h3>{{ item }}</h3>
                    <p>Months</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p class="py-2">Select your subscription plan</p>
                <div class="mt-3">
                  <div
                    v-for="(obj, i) in subscription_plan.price_list"
                    :key="i"
                    class="d-inline-block text-center align-center cursor-pointer pb-4 pr-1"
                  >
                    <div
                      class="px-2 py-1 price-selection-block"
                      :class="
                        obj.price_per_head == d_price
                          ? 'selected-price-selection-block'
                          : 'price-selection-block'
                      "
                      @click="
                        price = obj.price;
                        d_price = obj.price_per_head;
                        number_of_student = obj.number_of_students;
                      "
                    >
                      <span class="label-text-1 fs-14 fw-bold">
                        For {{ obj.number_of_students }} Students</span
                      >
                      <h3>
                        ₹{{ obj.price_per_head }}/<small class="label-text-1"
                          >student</small
                        >
                      </h3>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </v-simple-table>
        </v-card-text>
      </v-col>
      <v-col md="6" cols="12" sm="12">
        <v-card-text class="px-2">
          <v-simple-table class="mb-3 payment-table">
            <tr>
              <td colspan="3"><b>Payment Breakup:</b></td>
            </tr>
            <tr style="border: solid 1px lightgray">
              <td>Base Fee</td>
              <td class="text-right">
                ₹ {{ ((parseInt(price) * parseInt(tenure) * 100) / 118).toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td>CGST(9%)</td>
              <td class="text-right">
                ₹
                {{
                  (
                    (parseInt(price) * parseInt(tenure) -
                      (parseInt(price) * parseInt(tenure) * 100) / 118) /
                    2
                  ).toFixed(2)
                }}
              </td>
            </tr>
            <tr>
              <td>SGST(9%)</td>
              <td class="text-right">
                ₹
                {{
                  (
                    (parseInt(price) * parseInt(tenure) -
                      (parseInt(price) * parseInt(tenure) * 100) / 118) /
                    2
                  ).toFixed(2)
                }}
              </td>
            </tr>
            <tr>
              <td><b>Total(in INR)</b></td>
              <td class="text-right">
                <h3>₹ {{ (parseInt(price) * parseInt(tenure)).toFixed(2) }}</h3>
              </td>
            </tr>
          </v-simple-table>
        </v-card-text>
        <div class="text-center">
          <p class="text-center mt-3 mb-5">
            <strong>Note:</strong>
            If you have any concerns or questions about the process, feel free to
            <a
              class="blue--text text-decoration-underline"
              target="_blank"
              :href="
                $project.NAME == $keys.IM
                  ? 'https://www.indianmentors.in/contact/'
                  : 'http://wa.link/js5g5t'
              "
            >
              Contact</a
            >
            for assistance.
          </p>
          <v-btn width="200" color="primary" @click="buyNow()" :loading="btn_loading">
            <!-- <v-btn width="200" color="primary" disabled :loading="btn_loading"> -->
            <b> {{ $lang.CONTINUE.toUpperCase() }} </b>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script type="text/javascript">
import HelperMixin from "@/helper/mixins/helper-mixin";

export default {
  mixins: [HelperMixin],
  data() {
    return {
      btn_loading: false,
      d_price: 0,
      price: 0,
      tenure: null,
      number_of_student: 1,
      tenure_list: [],
      subscription_plan: "",
      cashfree: "",
    };
  },
  // mounted() {
  //   this.cashfree = Cashfree({
  //     mode: this.$project.ENV == this.$keys.PRODUCTION ? "production" : "sandbox",
  //   });
  // },
  created() {
    if (this.$route.params.id) {
      this.getSubscriptionPlanDetails(this.decrypt(this.$route.params.id));
    }
  },
  methods: {
    /* fetch subscription_plan details */
    getSubscriptionPlanDetails(subscription_plan_id) {
      this.$store.dispatch("setPageLoader", true);
      const self = this;
      let params = {
        id: subscription_plan_id,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.subscription_plan = response.data;
          self.tenure_list = response.data.tenure_list;
          self.price_list = response.data.price_list;
          /* select the default tenure and student count*/
          self.price = self.price_list[0].price;
          self.d_price = self.price_list[0].price_per_head;
          self.number_of_student = self.price_list[0].number_of_students;
          self.tenure = self.tenure_list[0];
        }
      };
      const finallyHandler = () => {
        this.$store.dispatch("setPageLoader", false);
      };
      self.request_GET(
        self,
        self.$urls.SUBSCRIPTION_PLAN_DETAIL,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    /* initiate  purches sudbscription */
    buyNow() {
      this.$store.dispatch("setPageLoader", true);
      const self = this;
      self.btn_loading = true;
      let params = {
        subscription_plan_id: this.subscription_plan.id,
        validity: this.tenure,
        number_of_students: this.number_of_student,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          // open cashfee pg dialog
          this.openPaymentGateway(
            response.data.razorpay_key_id,
            response.data.rzp_order_id,
            response.data.name,
            response.data.mobile,
            response.data.email
          );
        }
      };
      const finallyHandler = () => {
        self.btn_loading = false;
        this.$store.dispatch("setPageLoader", false);
      };
      self.request_GET(
        self,
        self.$urls.SUBSCRIPTION_PAYMENT,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    openPaymentGateway(rzp_key_id, rzp_order_id, name, mobile, email, notes) {
      var options_data = {
        key: rzp_key_id,
        currency: "INR",
        name: this.$keys.PROJECT_NAME.toUpperCase(),
        description: "",
        // image:"@/assets/logo.png",
        order_id: rzp_order_id,
        handler: (res) => {
          console.log("razor pay response");
          console.log(res);
          // return this.verifySignature(res);
        },
        prefill: {
          name: name,
          email: email,
          contact: mobile,
        },
        notes: notes,
        theme: {
          color: "#5C80BC",
        },
      };
      // Init the rzp function
      var rzp1 = new window.Razorpay(options_data);
      // open rzp dialog
      rzp1.open();
    },
  },
};
</script>
