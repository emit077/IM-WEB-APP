<style lang="scss" media="screen" scoped>
.price-selection-block {
  border: solid 1px lightgrey;
  border-radius: 10px;
}

.selected-price-selection-block {
  background-color: #32345F;
  border-radius: 10px;
  color: yellow;

  .label-text-1 {
    color: white;
  }

}
</style>
<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog.flag" width="500">
      <v-card class="pa-5 pt-5  text-left" v-if="plan && is_summary==false">
        <v-card-text class="px-2">
          <p class="fc-primary font-weight-bold fs-18 mb-2">{{ plan.plan_name }}</p>
          <v-simple-table class="mb-3">
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
            <tr>
              <td colspan="2">
                <p class="subscription-description">
                  {{ plan.description }}
                </p>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <p class="py-2"> Select Tenure</p>
                <div v-for="(item, i) in tenure_list" :key="i"
                  class="d-inline-block text-center align-center cursor-pointer" :class="i == 0 ? 'pl-0 pr-3' : 'px-3'">
                  <div class="px-3 py-1 price-selection-block"
                    :class="tenure == item ? 'selected-price-selection-block' : 'price-selection-block'" @click="tenure = item">
                    <h3>{{ item }}</h3>
                    <p>Months</p>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p class="py-2"> Select your plan</p>
                <div class="mt-3">
                  <div v-for="(obj, i) in plan.price_list" :key="i"
                    class="d-inline-block text-center align-center cursor-pointer" :class="i == 0 ? 'pl-0 pr-3' : 'px-3'">
                    <div class="px-2 py-1 price-selection-block"
                      :class="obj.price_per_head == d_price ? 'selected-price-selection-block' : 'price-selection-block'"
                      @click="price = obj.price; d_price = obj.price_per_head; number_of_student = obj.number_of_students">
                      <span class="label-text-1 fs-14 fw-bold"> For {{ obj.number_of_students }} Students</span>
                      <h3>₹{{ obj.price_per_head }}/<small class="label-text-1">student</small></h3>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </v-simple-table>
          <h2 class="text-center mt-4"><small class="label-text-1">Total: </small>
            ₹{{ (parseInt(price) * parseInt(tenure)).toFixed(2) }}
          </h2>

        </v-card-text>
        <v-card-text class="text-center pb-0 pt-5">
          <v-btn width="200" color="primary" @click="is_summary=true">
            <b>
              {{ $lang.CONTINUE.toUpperCase() }}
            </b>
          </v-btn>
        </v-card-text>
        <!--  paytm form     -->
        <!--        <form method="post" :action="paytm_url+'?mid='+paytm_mid+'&orderId='+order_id" name="paytm">-->
        <!--          <table border="0" class="d-none">-->
        <!--            <tbody>-->
        <!--            <input type="text" name="mid" :value="$keys.PAYTM_MID">-->
        <!--            <input type="text" name="orderId" :value="order_id">-->
        <!--            <input type="text" name="txnToken" :value="transaction_token">-->
        <!--            </tbody>-->
        <!--          </table>-->
        <!--          <div class="text-center">-->
        <!--            <v-btn type="submit" color="primary" :loading="btn_loading" id="submitBtn" ref="submitBtn"-->
        <!--                   style="display:none">{{ $lang.CONTINUE }}-->
        <!--            </v-btn>-->
        <!--          </div>-->
        <!--        </form>-->
      </v-card>
      <v-card class="pa-5 pt-5  text-left" v-else-if="is_summary">
        <v-card-text class="px-2">
          <p class="fc-primary font-weight-bold fs-18 mb-5">Subscription Summary</p>
          <v-simple-table class="mb-3">
            <tr>
              <td style="width: 180px">Plan Name</td>
              <td>{{ plan.plan_name }} </td>
            </tr>
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
            <tr>
              <td>Validity</td>
              <td>{{ tenure }} Months</td>
            </tr>

            <tr >
              <td colspan="3"><b>Payment Breakup:</b></td>
            </tr>
            <tr style="border: solid 1px lightgray;">
              <td>Base Fee</td>
              <td>{{ ((parseInt(price) * parseInt(tenure)*100)/118).toFixed(2) }}</td>
            </tr>
            <tr>
              <td>CGST(9%)</td>
              <td>{{ ((parseInt(price) * parseInt(tenure)-((parseInt(price) * parseInt(tenure)*100)/118))/2).toFixed(2) }}</td>
            </tr>
            <tr>
              <td>SGST(9%)</td>
              <td>{{ ((parseInt(price) * parseInt(tenure)-((parseInt(price) * parseInt(tenure)*100)/118))/2).toFixed(2) }}</td>
            </tr>
            <tr>
              <td><b>Total(in INR)</b></td>
              <td><b>{{ (parseInt(price) * parseInt(tenure)).toFixed(2) }}</b></td>
            </tr>

            <tr>
              <td colspan="2">
                <p class="subscription-description">
                  {{ plan.description }}
                </p>
              </td>
            </tr>
          </v-simple-table>
        </v-card-text>
        <v-card-text class="text-center pb-0 pt-5">
          <!-- <v-btn width="200" color="primary" @click="buyNow(plan)"> -->
          <v-btn width="200" color="primary" >
            <b>
              {{ $lang.CONTINUE.toUpperCase() }}
            </b>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script type="text/javascript">
import HelperMixin from '@/helper/mixins/helper-mixin'

export default {
  mixins: [HelperMixin],
  props: ["dialog", "plan", "tenure_list"],
  data() {
    return {
      btn_loading: false,
      step: 1,
      payment_method: "",
      paytm_mid: "",
      paytm_url: "",
      order_id: "",
      transaction_token: "",

      d_price: 0,
      price: 0,
      tenure: null,
      number_of_student: 1,
      is_summary:false,
    }
  },
  methods: {
    /* initiate  purches sudbscription */
    buyNow() {
      this.$store.dispatch('setPageLoader', true)
      const self = this
      self.btn_loading = true
      let params = {
        subscription_plan_id: this.plan.id,
        validity: this.tenure,
        number_of_students: this.number_of_student,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          /* if payment methods  is paytm*/
          this.openPaymentGateway(
            response.data.razorpay_key_id,
            response.data.rzp_order_id,
            response.data.name,
            response.data.mobile,
            response.data.email,
          )
          this.dialog.flag = false

          // self.transaction_token = response.data.transaction_token;
          // self.order_id = response.data.paytm_order_id;
          // self.paytm_mid = response.data.paytm_mid;
          // self.paytm_url = response.data.paytm_url;
          // setTimeout(() => {
          //   document.getElementById("submitBtn").click()
          // }, 500);

        }
      };
      const finallyHandler = () => {
        self.btn_loading = false
        this.$store.dispatch('setPageLoader', false)
      };
      self.request_GET(self, self.$urls.SUBSCRIPTION_PAYMENT, params, successHandler, null, null, finallyHandler)

    },
    continueHandler() {
      if (this.payment_method == "Paytm") {
        this.buyNow()
      } else
        this.step = 2
    }
  }

}

</script>