<style lang="scss" scoped>



</style>

<template>
  <div>
    <p class="auth-title">{{ $lang.VERIFY_ACCOUNT }}</p>
    <v-form ref="forget_password_form" lazy-validation @submit.prevent="sendOtp()">
      <div class="input-sub-card ">
        <label class="auth-label ">{{ $lang.ENTER_OTP }}</label>
    
        <OtpBlock @on-complete="getOtp" class="mt-5"></OtpBlock>
        <p class="">
          <small>{{ response_otp }}</small>
        </p>
        <p class="pt-2 resent-otp-text" @click="resendOtp">{{ $lang.RESEND_OTP }}</p>
      </div>
      <div class="input-sub-card">
        <v-btn
          :disabled="otp.length == 6 ? false : true"
          :loading="btn_loading"
          block
          class="auth-action-btn"
          color="primary"
          height="50px"
          @click="submitOTP"
        >
          <span class="btn_text">{{ $lang.CONTINUE }}</span>
        </v-btn>
        <p class="cursor-pointer text-center pt-5" @click="backToLogin">
          {{ $lang.SING_IN }}
        </p>
      </div>
    </v-form>
  </div>
</template>

<script>
// import offline from 'v-offline';

export default {
  props: ["otp_token"],
  components: {
    OtpBlock: () => import("@/components/shared/opt-input-box/OtpBlock"),
  },
  data() {
    return {
      btn_loading: false,
      otp: "",
      response_otp: "",
    };
  },
  methods: {
    backToLogin() {
      this.$emit("step-change", 1);
    },
    getOtp(otp) {
      this.otp = otp;
      this.$refs.forget_password_form.validate();
    },
    submitOTP() {
      const self = this;
      if (self.otp.length != 6) return false;
      self.btn_loading = true;
      var form = new URLSearchParams();
      form.append("otp", this.otp);
      var header = {
        "otp-token": this.otp_token,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          localStorage.setItem("token", response.headers.token);
          this.$emit("step-change", 1);
          this.$refs.forget_password_form.reset();
        }
      };
      const finallyHandler = () => {
        self.btn_loading = false;
      };
      self.request_POST(
        self,
        self.$urls.VERIFY_OTP,
        form,
        successHandler,
        header,
        null,
        finallyHandler
      );
    },
    resendOtp() {
      const self = this;
      var form = new FormData();
      var header = {
        "otp-token": this.otp_token,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          let text = "OTP resent";
          this.$store.dispatch("snackbar/setSnackbar", {
            flag: true,
            text,
            color: "success",
          });
        }
      };
      self.request_GET(self, self.$urls.RESEND_OTP, form, successHandler, header);
    },
  },
};
</script>
