<style lang="scss">
.center-input .v-text-field__slot input {
  text-align: center;
  font-size: 14px;
}

.center-input .v-input__append-outer {
  margin: 7px 0px 0px 0px;
  font-size: 14px;
}
</style>
<template>
  <div class="text-center">
    <v-dialog v-model="data.flag" width="450">
      <v-card>
        <div class="text-center pt-8">
          <img v-if="data.type == $keys.WARNING" src="@/assets/others/warning-icon.svg" width="100" alt="">
          <img v-if="data.type == $keys.SUCCESS" src="@/assets/others/success-icon.svg" width="100" alt="">
        </div>
        <v-card-text class="py-5 text-center">
          <div class="mb-5">
            <h2 v-if="data.title" class=" font-weight-bold" v-html="data.title"></h2>
            <p v-html="data.message"></p>
            <div v-if="data.type == $keys.WARNING" class="text-center py-1 ">
              <center>
                <v-text-field v-model="data.registration_fee_amount" placeholder="XXXXXXX" dense hide-details
                  single-line maxlength="5" :rules="[$rules.REQUIRED_NUMBER_FIELD('')]"
                  style="width: 60px; text-align:right" class="mt-6 center-input">
                  <template v-slot:prepend>
                    <span class="mt-1 mr-n1">₹</span>
                  </template>
                </v-text-field>
              </center>
            </div>
          </div>

          <a v-if="data.type == $keys.SUCCESS" :href="$urls[$project.NAME][$project.ENV] +
      $urls.GET_REGISTRATION_PAYMNET_INVOICE +
      payment_table_id
      ">
            {{ $lang.DOWNLOAD_INVOICE }}
            <DownloadIcon class="ml-2" />
          </a>
        </v-card-text>

        <v-card-actions class=" justify-end py-4">
          <v-spacer></v-spacer>
          <div v-if="data.type == $keys.WARNING">
            <v-btn color="primary " class="mr-5" outlined rounded width="100" @click="data.flag = false"
              :disabled="btn_loading">
              Close
            </v-btn>
            <v-btn color="primary " rounded width="100" @click="collectRegistrationFee()" :loading="btn_loading">Yes
            </v-btn>
          </div>
          <div v-else-if="data.type == $keys.SUCCESS">
            <v-btn color="primary " class="mr-5" outlined rounded width="100" @click="realodpage"
              :disabled="btn_loading">
              Close
            </v-btn>
          </div>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      amount: ""
    }
  },
  components: {
    DownloadIcon: () => import("@/components/icons/DownloadIcon.vue"),
  },
  data: () => ({
    btn_loading: false,
    payment_table_id: ""
  }),
  methods: {
    realodpage() {
      window.location.reload()
    },
    collectRegistrationFee() {
      if (!this.data.registration_fee_amount || isNaN(this.data.registration_fee_amount)) 
        return

      const self = this;
      this.btn_loading = true
      var form = new URLSearchParams();
      form.append("registration_fee_amount", self.data.registration_fee_amount);
      if (self.data.payment_type == this.$keys.ACCOUNT_STUDENT)
        form.append("student_table_id", self.data.user_table_id);
      else
        form.append("tutor_table_id", self.data.user_table_id);
      const successHandler = (response) => {
        this.payment_table_id = response.data.payment_table_id
        this.data.type = this.$keys.SUCCESS
        this.data.title = this.$keys.SUCCESS
        this.data.message = "Payment Recived Successfully"
        this.btn_loading = false
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.COLLECT_REGISTRATION_FEE_OFFLINE, form, successHandler, null, null, finallyHandler)

    }
  }

}
</script>