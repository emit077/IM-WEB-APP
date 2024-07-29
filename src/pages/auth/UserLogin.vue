<style lang="scss" scoped>
@import url(../../assets/css/style.scss);

/* font style */
.auth-title {
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  color: #32345f;
}

@media screen and (max-width: 1260px) {
  .auth-title {
    font-size: 26px;
  }
}

.login-card {
  max-width: 480px;
  width: 580px;
}

.input-sub-card {
  padding-top: 20px;
}

.resent-otp-text {
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
}

.resent-otp-text:hover {
  text-decoration: underline;
}
</style>

<template>
  <v-app :class="$project.NAME == 'IM' ? 'im-bg' : 'tf-bg'">
    <div class="justify-center h-100 d-flex" style="align-items: center">
      <div class="login-card">
        <div class="elevation-10 mx-3 pt-5 border-r-30">
          <!-- logo wrapper  -->
          <div class="text-center justify-center mt-5 mb-5 ">
            <img alt="logo" class="logo-img" width="250" src="@/assets/im-logo/logo-white.svg"
              v-if="$project.NAME == 'IM'" />
            <img alt="logo" class="logo-img" src="@/assets/logo/logo.svg" height="" v-else />
            <h3>
              <span class="white--text mt-4 py-1 px-3 welcome-back-style">Welcome Back</span>
            </h3>
          </div>
          <!-- logo wrapper end  -->
          <div class="bg-white px-10 px-md-15 py-10 border-r-30 elevation-10">
            <p class="auth-title">{{ $lang.SING_IN }}</p>
            <v-stepper v-model="step" class="elevation-0 ">
              <v-stepper-items>
                <v-stepper-content class="px-0" step="1">
                  <v-form ref="user_login_form" lazy-validation @submit.prevent="sendOtp()">
                    <div class="input-sub-card">
                      <label class="auth-label">{{ $lang.MOBILE_NUMBER }}</label>
                      <v-text-field v-model="mobile" :rules="$rules.MOBILE" dense height="40" maxlength="10"
                        placeholder="1234567890">
                        <template slot="prepend-inner">
                          <span class="auth-placeholder pr-1 mt-3">+91</span>
                        </template>
                      </v-text-field>
                    </div>

                    <div class="input-sub-card">
                      <v-btn :loading="btn_loading" block class="auth-action-btn" color="primary" height="50px"
                        type="submit">
                        <span class="btn_text">{{ $lang.CONTINUE }}</span>
                      </v-btn>
                    </div>
                    <p class="text-center mt-5 mb-0 ">
                      {{ $lang.NOT_HAVE_AN_ACCOUNT }}
                      <a href="javascript:void(0);" @click="$router.push({ name: 'student_registration' })">{{
    $lang.SING_UP }}</a>
                    </p>
                  </v-form>
                </v-stepper-content>
                <v-stepper-content class="px-0" step="2">
                  <v-form ref="otp_form" lazy-validation>
                    <small class="float-right">OTP send to {{ mobile.slice(0, 2) }}******{{
    mobile.slice(6, 10)
  }}</small>
                    <label class="auth-label">{{ $lang.ENTER_OTP }}</label>
                    <div class="input-sub-card">
                      <OtpBlock @on-complete="getOtp"></OtpBlock>
                      <p class="pt-4 resent-otp-text" @click="resendOtp">
                        {{ $lang.RESEND_OTP }}
                      </p>
                    </div>

                    <div class="input-sub-card">
                      <v-btn :loading="btn_loading" block class="auth-action-btn" color="primary" height="50px"
                        @click="submitOTP">
                        <span class="btn_text">{{ $lang.CONTINUE }}</span>
                      </v-btn>
                      <v-btn block class="auth-action-btn mt-3" color="primary" height="50px" outlined @click="
    step = 1;
  $refs.user_login_form.validate();
  ">
                        <span class="btn_text">{{ $lang.BACK }}</span>
                      </v-btn>
                    </div>
                  </v-form>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </div>
        </div>
      </div>
    </div>
    <Snakebar></Snakebar>
  </v-app>
</template>

<script>
export default {
  components: {
    OtpBlock: () => import("@/components/shared/opt-input-box/OtpBlock"),
    Snakebar: () => import("@/components/shared/Snakebar"),
  },
  data() {
    return {
      step: 1,
      btn_loading: false,
      show_otp_box: true,
      otp: "",
      response_otp: "",
      otp_token: "",
      mobile: "",
    };
  },
  created() {
    /* setting the favicon*/
    document.querySelector("link[rel~='icon']").outerHTML = `<link rel="icon" href="./${this.$project.NAME}-fevicon.png">`

  },
  methods: {
    getOtp(otp) {
      this.otp = otp;
      this.$refs.otp_form.validate();
    },
    sendOtp() {
      const self = this;
      if (this.$refs.user_login_form.validate() == false) return false;
      self.btn_loading = true;
      var form = new FormData();
      form.append("mobile", self.mobile);

      const successHandler = (response) => {
        if (response.data.success) {
          self.show_otp_box = true;
          self.otp_token = response.headers["otp-token"];
          self.response_otp = response.data.otp;
          this.step = 2;
        }
      };
      const finallyHandler = () => {
        self.btn_loading = false;
      };

      this.request_POST(
        self,
        this.$urls.LOGIN,
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
          this.$refs.user_login_form.reset();
          this.$refs.otp_form.reset();
          this.step = 1;
          /* set the token */
          localStorage.setItem("token", response.headers.token);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("account_type", response.data.account_type);
          this.$store.dispatch("user/setUser", {
            name: response.data.name,
            account_type: response.data.account_type,
          });
          /* navigate to the profile */
          if (response.data.account_type == this.$keys.ACCOUNT_STUDENT)
            self.$router.push({ name: "student_profile" });
          else if (response.data.account_type == this.$keys.ACCOUNT_TEACHER)
            self.$router.push({ name: "tutor_profile" });
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
