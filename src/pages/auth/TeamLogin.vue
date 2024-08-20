<style lang="scss">
.login-card {
  max-width: 480px;
  width: 580px;
}
/* font style */
.auth-title {
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  color: #32345f;
}
@media screen and (max-width: 1260px) {
  .auth-title {
    font-size: 24px;
  }
}
.btn_text {
  font-family: Open Sans;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #ffffff;
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
  <v-app :class="$project.NAME.toLowerCase() + '-bg'">
    <div class="justify-center h-100 d-flex" style="align-items: center">
      <div class="elevation-10 login-card mx-3 border-r-30">
        <!-- brand logo -->
        <div class="text-center mt-5">
          <img
            alt="logo"
            class="logo-img"
            width="250"
            src="@/assets/im-logo/logo-white.svg"
            v-if="$project.NAME == 'IM'"
          />
          <img alt="logo" class="logo-img" src="@/assets/logo/logo.svg" v-else />
          <h3 class="text-center white--text my-5">- Welcome back to work -</h3>
        </div>
        <!-- brand logo end -->
        <div class="px-9 py-10 elevation-10 border-r-30 bg-white">
          <v-stepper v-model="step" class="elevation-0">
            <v-stepper-items class="">
              <v-stepper-content step="1">
                <LoginForm @step-change="manageStep" @update="getTokens"></LoginForm>
              </v-stepper-content>
              <v-stepper-content step="2">
                <ForgetPassword @step-change="manageStep"></ForgetPassword>
              </v-stepper-content>
              <v-stepper-content step="3">
                <ResetPassword @step-change="manageStep"></ResetPassword>
              </v-stepper-content>
              <v-stepper-content step="4">
                <VerifyAccount
                  @step-change="manageStep"
                  :otp_token="otp_token"
                ></VerifyAccount>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </div>
      </div>
    </div>
    <Snakebar></Snakebar>
  </v-app>
</template>
<script>
export default {
  name: "login",
  components: {
    LoginForm: () => import("@/components/auth/LoginForm"),
    ForgetPassword: () => import("@/components/auth/ForgetPassword"),
    ResetPassword: () => import("@/components/auth/ResetPassword"),
    VerifyAccount: () => import("@/components/auth/VerifyAccount"),
    Snakebar: () => import("@/components/shared/Snakebar"),
  },
  data: () => ({
    step: 1,
    otp_token: "",
  }),
  created() {
    /* setting the favicon*/
    document.querySelector(
      "link[rel~='icon']"
    ).outerHTML = `<link rel="icon" href="./${this.$project.NAME}-fevicon.png">`;
  },
  methods: {
    manageStep(step) {
      this.step = step;
    },
    getTokens(otp_token) {
      this.step = 4;
      this.otp_token = otp_token;
    },
  },
};
</script>
