<style lang="scss" scoped>
#payment-tab {
  .tab-btn {
    background-color: #f7f7f7;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border: 2px solid #f7f7f7;
  }
  .tab-btn-active {
    background-color: #fff;
  }
  .tab-btn::before {
    background-color: transparent !important;
  }
}
</style>
<template>
  <div>
    <!--  tabs -->
    <div id="payment-tab">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab
          v-for="(item, i) in [
            'Subscription Payments',
            'Student Reg. Payment',
            'Tutor Reg. Payment',
            'EMIs'
          ]"
          :key="i"
          class="tab-btn mr-1 px-3"
          active-class="tab-btn-active"
          style="
            max-width: fit-content;
            text-transform: none;
            padding: 0px;
            margin-right: 20px;
          "
          :ripple="false"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-divider></v-divider>
    </div>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <SubscriptioPaymentTable></SubscriptioPaymentTable>
      </v-tab-item>
      <v-tab-item>
        <registration-payment-table
          :payment_type="$keys.TYPE_STUDENT_REGISTRATION"
        ></registration-payment-table>
      </v-tab-item>
      <v-tab-item>
        <RegistrationPaymentTable
          :payment_type="$keys.TYPE_TUTOR_REGISTRATION"
        ></RegistrationPaymentTable>
      </v-tab-item>
      <v-tab-item>
        <SubscriptionEMITable
          :payment_type="$keys.TYPE_TUTOR_REGISTRATION"
        ></SubscriptionEMITable>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";
export default {
  components: {
    RegistrationPaymentTable: () =>
      import("../../components/payments/RegistrationPaymentTable"),
    SubscriptioPaymentTable: () =>
      import("@/components/payments/SubscriptioPaymentTable"),
    SubscriptionEMITable: () => import("@/components/payments/SubscriptionEMITable"),
  },
  watch: {},
  data() {
    return {
      tab: "",
    };
  },
  methods: {},
};
</script>
