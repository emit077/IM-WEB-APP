<style lang="scss" scoped>
.card-divider {
  border: solid 1.5px !important;
  border-radius: 3px;
}
</style>
<template>
  <div class="px-3" v-if="
    [
      $keys.ACCOUNT_BUSINESS_DEVELOPER,
      $keys.ACCOUNT_ADMIN,
      $keys.ACCOUNT_SUPER_ADMIN,
    ].includes($store.state.user.account_type)
  ">
    <!--  ################ Settings  #################    -->
    <v-card flat class="mb-3 pb-3" style="border-radius: 10px; background-color: var(--admin_setting_bg)">
      <v-card-title class="primary--text text-body-1 font-weight-medium">
        <v-icon color="primary" class="mr-1" size="20">mdi-cog</v-icon>
        {{ $lang.SETTINGS }}
      </v-card-title>
      <div class="px-5">
        <v-divider class="card-divider" color="secondary"></v-divider>
      </div>
      <v-card-text class="my-3">
        <v-row no-gutter>
          <v-col class="py-0" cols="12" md="4" sm="6">
            <div class="field-wrapper">
              <v-checkbox v-model="settings.registration_fee_required" :label="$lang.REGISTRATION_FEE_REQUIRE"
                class="shrink ma-0 ml-3 d-inline-flex" hide-details @change="saveSettings"></v-checkbox>
            </div>
          </v-col>
          <v-col class="py-0" cols="12" md="4" sm="6" v-if="settings.registration_fee_required">
            <div class="field-wrapper">
              <v-btn class="success" small @click="openPaymentDialog"
                :disabled="settings.profile_status != $keys.PROFILE_COMPLETE">
                {{ $lang.COLLECT_REGISTRATION_PAYMENT }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- offline registration payment -->
    <OfflinePaymentDialog :data="payment_dialog_data" />
  </div>
</template>

<script>
export default {
  props: ["settings"],
  data() {
    return {
      payment_dialog_data: {
        type: "",
        flag: false,
        title: "",
        message: "",
        payment_type: "",
        user_table_id: "",
        registration_fee_amount: 0,
      },
    };
  },
  created() { },
  components: {
    OfflinePaymentDialog: () => import("@/components/payments/OfflinePaymentDialog"),
  },
  methods: {
    saveSettings() {
      const self = this;
      self.btn_loader = true;
      var form = new URLSearchParams();
      form.append("account_type", self.settings.account_type);
      form.append("user_table_id", self.settings.user_table_id);
      const successHandler = (response) => {
        if (response.data.success) {
          self.showSnakeBar("success", "Setting Updated");
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false;
      };
      this.request_POST(
        self,
        this.$urls.PROFILE_SETTINGS,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    openPaymentDialog() {
      this.payment_dialog_data.type = this.$keys.WARNING;
      this.payment_dialog_data.title = "Are you sure?";
      this.payment_dialog_data.message = `You have collected the registration fee of `; //<b>₹${this.settings.registration_fee_amount}</b>

      this.payment_dialog_data.payment_type = this.settings.account_type;
      this.payment_dialog_data.user_table_id = this.settings.user_table_id;
      this.payment_dialog_data.flag = true;
      this.payment_dialog_data.registration_fee_amount = this.settings.registration_fee_amount;
    },
  },
};
</script>
