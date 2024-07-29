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
        <v-tab v-for="(item, i) in  [$keys.ACCOUNT_TEACHER].includes($store.state.user.account_type) ?
        [
          'My Wallet',
          'Payment Request',
          'Payouts',]
        : [
          'Wallets',
          'Payment Request',
          'Payouts',
        ]" :key="i" class="tab-btn mr-1 px-3" active-class="tab-btn-active" style="
            max-width: fit-content;
            text-transform: none;
            padding: 0px;
            margin-right: 20px;
          " :ripple="false">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-divider></v-divider>
    </div>
    <v-tabs-items v-model="tab">
      <v-tab-item class="pt-5" v-if="[$keys.ACCOUNT_TEACHER].includes($store.state.user.account_type)">
        <TutorWallet />
      </v-tab-item>
      <v-tab-item class="pt-5" v-else>
        <WalletList />
      </v-tab-item>
      <v-tab-item class="pt-5">
        <WithdrawalRequestList />
      </v-tab-item>
      <v-tab-item class="pt-5">
        <PayoutList />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";
export default {
  components: {
    TutorWallet: () => import("@/pages/payouts/TutorsWallet"),
    WalletList: () => import("@/components/payouts/WalletList"),
    PayoutList: () => import("@/components/payouts/PayoutList"),
    WithdrawalRequestList: () => import("@/components/payouts/WithdrawalRequestList"),

  },
  watch: {},
  data() {
    return {
      tab: 0,
    };
  },
  methods: {},
};
</script>
