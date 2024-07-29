<template>
  <div class="text-center">
    <v-dialog v-model="data.flag" width="450" persistent>
      <v-card>
        <div class="text-right" v-if="data.is_closable">
          <v-btn text small fab class="mr-2 mt-2" @click="data.flag = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="text-center" :class="data.is_closable ? 'pt-2' : 'pt-6'">
          <img src="../../assets/others/help-circle.svg" width="100" alt="" />
        </div>
        <v-card-text class="py-5">
          <p v-if="data.title" class="text-center font-weight-bold">
            {{ data.title }}
          </p>
          <p class="text-center" v-html="data.message"></p>
          <div class="text-center mt-5">
            <strong>Note:</strong><br />
            <p>
              If you have any concerns or questions about the process, feel free to
              <a
                class="blue--text text-decoration-underline"
                target="_blank"
                :href="'https://www.indianmentors.in/contact/'"
              >
                Contact
              </a>
              for assistance.
            </p>
          </div>
        </v-card-text>
        <v-card-actions class="just ify-end py-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded width="100" @click="yesHandler()"
            >{{ $lang.CONTINUE }}
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
// import HelperMixin from '@/helper/mixins/helper-mixin'

export default {
  // mixins: [HelperMixin],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    btn_loading: false,
    transaction_token: null,
    order_id: null,
    paytm_url: null,
    paytm_mid: null,
  }),
  // mounted() {
  //   this.cashfree = Cashfree({
  //     mode: this.$project.ENV == this.$keys.PRODUCTION ? "production" : "sandbox",
  //   });
  // },
  methods: {
    yesHandler() {
      if (this.data.profile_status == this.$keys.PROFILE_INCOMPLETE)
        if (this.data.payment_type == this.$keys.TYPE_STUDENT_REGISTRATION)
          this.$router.push({
            name: "edit_student_profile",
            query: { student_table_id: this.encrypt(-1) },
          });
        else
          this.$router.push({
            name: "edit_tutor_profile",
            query: { tutor_table_id: this.encrypt(-1) },
          });
      else this.buyNow();
    },
    buyNow() {
      // rediret to external payment pages.
      // if (this.$project.NAME == this.$keys.IM){
      //   if (this.$store.state.user.account_type == this.$keys.ACCOUNT_TEACHER)
      //     window.open("https://rpy.club/dp/Zodn62emZp", "_blank").focus();
      //   else if (this.$store.state.user.account_type == this.$keys.ACCOUNT_STUDENT)
      //     window.open("https://rpy.club/dp/dABcaFJas4", "_blank").focus();

      //   return
      // }
      /*Razorpay PG Link*/
      const self = this;
      self.btn_loading = true;
      var form = new FormData();
      form.append("payment_type", this.data.payment_type);

      const successHandler = (response) => {
        if (response.data.success) {
          this.openPaymentGateway(
            response.data.razorpay_key_id,
            response.data.rzp_order_id,
            response.data.name,
            response.data.mobile,
            response.data.email
          );
          this.data.flag = false;
        }
      };
      const finallyHandler = () => {
        self.btn_loading = false;
        this.$store.dispatch("setPageLoader", false);
      };
      self.request_POST(
        self,
        self.$urls.INIT_REGISTRATION_PAYMENT,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    /* open payment gateway*/
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
