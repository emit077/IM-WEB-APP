<style lang="scss" scoped>
</style>

<template>
  <div>
    <p class="auth-title">{{ $lang.FORGOT_PASSWORD }}</p>
    <v-form ref="forget_password_form" lazy-validation @submit.prevent="sendOtp()">
      <div class="input-sub-card">
        <label class="auth-label">{{ $lang.MOBILE_NUMBER }}</label>
        <v-text-field
          v-model="mobile"
          :rules="$rules.MOBILE"
          dense
          height="40"
          maxlength="10"
          placeholder="1234567890"
        >
          <template slot="prepend-inner">
            <span class="auth-placeholder pr-1 mt-3">+91</span>
          </template>
        </v-text-field>
      </div>

      <div v-if="show_otp_box" class="input-sub-card ">
        <label class="auth-label">{{ $lang.ENTER_OTP }}</label>
        <OtpBlock @on-complete="getOtp" class="mt-4"></OtpBlock>
        <p class="">
          <small>{{ response_otp }}</small>
        </p>

        <p class="pt-2 resent-otp-text" @click="resendOtp">
          {{ $lang.RESEND_OTP }}
        </p>
      </div>

      <div class="input-sub-card">
        <v-btn
          v-if="!show_otp_box"
          :loading="btn_loading"
          block
          class="auth-action-btn"
          color="primary"
          height="50px"
          type="submit"
        >
          <span class="btn_text">{{ $lang.CONTINUE }}</span>
        </v-btn>
        <v-btn
          v-else
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
        <p class="cursor-pointer text-center pt-5" @click="$refs.forget_password_form.reset();show_otp_box=false;backToLogin()">
          {{ $lang.SING_IN }}
        </p>
      </div>
    </v-form>
  </div>
</template>

<script>
// import offline from 'v-offline';

export default {
  components: {
    OtpBlock: () => import("@/components/shared/opt-input-box/OtpBlock"),
  },
  data() {
    return {
      btn_loading: false,
      show_otp_box: false,
      otp: "",
      response_otp: "",
      otp_token: "",
      mobile: "",
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
    sendOtp() {
      const self = this;
      if (this.$refs.forget_password_form.validate() == false) return false;
      self.btn_loading = true;
      var form = new FormData();
      form.append("mobile", self.mobile);

      const successHandler = (response) => {
        if (response.data.success) {
          self.show_otp_box = true;
          self.otp_token = response.headers["otp-token"];
          self.response_otp = response.data.otp;
        }
      };
      const finallyHandler = () => {
        self.btn_loading = false;
      };

      this.request_POST(
        self,
        this.$urls.FORGOT_PASSWORD,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
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
          this.$emit("step-change", 3);
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
      self.request_POST(self, self.$urls.RESEND_OTP, form, successHandler, header);
    },
  },
};
</script>
