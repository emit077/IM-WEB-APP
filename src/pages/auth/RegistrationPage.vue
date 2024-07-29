<style lang="scss" scoped>
@import url(../../assets/css/style.scss);

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

.login-card {
  max-width: 480px;
  width: 580px;
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
  <!-- -->
  <v-app :class="$project.NAME.toLowerCase() + '-bg'">
    <div class="justify-center h-100 d-flex" style="align-items: center;">
      <div>
        <!-- brand logo -->
        <div class="text-center mb-10">
          <img
            alt="logo"
            class="logo-img"
            width="250"
            src="@/assets/im-logo/logo-white.svg"
            v-if="$project.NAME == 'IM'"
          />
          <img
            alt="logo"
            class="logo-img"
            src="@/assets/logo/logo.svg"
            v-else
          />
        </div>
        <!-- brand logo end -->
        <v-row justify="center" class="mx-5">
          <v-col
            md="4"
            cols="12"
            class="d-md-flex d-none"
            :class="$project.NAME == 'IM' ? 'order-last' : 'order-fist'"
          >
            <div
              class="text-center d-flex justify-center mb-5 h-100"
              style="align-items: center;"
            >
              <div>
                <div class="mb-4">
                  <h1
                    class="color-theme-yellow"
                    v-if="$project.NAME == $keys.TF"
                  >
                    Welcome to Tutors Factory
                  </h1>
                  <h1 class="white--text" v-else>Welcome to Indian Mentors</h1>
                </div>

                <img
                  :src="
                    require('../../assets/registration/' +
                      $project.NAME +
                      '-' +
                      (is_student_form ? 'student' : 'tutor') +
                      '-hero.png')
                  "
                  class="my-4"
                  width="90%"
                />
                <div class="white--text">
                  <h3 v-if="$project.NAME == $keys.TF">
                    {{
                      is_student_form
                        ? "The best home tutor provider"
                        : "Give wings to your teaching passion"
                    }}
                  </h3>
                  <h3 v-else>
                    {{
                      is_student_form
                        ? "Education excellence at your doorstep"
                        : "Empower Your Teaching Career"
                    }}
                  </h3>
                </div>
              </div>
            </div>
            <!--  -->
          </v-col>
          <v-col
            md="4"
            cols="12"
            class="elevation-1 bg-white"
            :class="{
              'border-r-30': $vuetify.breakpoint.smAndDown,
              '': $vuetify.breakpoint.mdAndUp,
            }"
          >
            <div
              class="px-md-12 mx-3 d-flex justify-center h-100"
              style="align-items: center;"
            >
              <div class="py-5">
                <p class="auth-title">
                  {{ is_student_form ? "Student" : "Tutor" }}
                  {{ $lang.SING_UP }}
                </p>
                <v-stepper v-model="step" class="elevation-0">
                  <v-stepper-items class="">
                    <v-stepper-content class="px-0" step="1">
                      <v-form
                        ref="signup_form"
                        lazy-validation
                        @submit.prevent="signUp()"
                      >
                        <div class="form-filed-wrapper">
                          <label>{{ is_student_form ? $lang.STUDENT_NAME : $lang.TUTOR_NAME }}</label>
                          <v-text-field
                            v-model="form.name"
                            :placeholder="is_student_form ? $lang.STUDENT_NAME : $lang.TUTOR_NAME "
                            :rules="[$rules.REQUIRED_FIELD(is_student_form ? $lang.STUDENT_NAME : $lang.TUTOR_NAME )]"
                            class="mt-1"
                            dense
                            maxlength="80"
                            outlined
                            single-line
                          ></v-text-field>
                        </div>
                        <div class="form-filed-wrapper">
                          <label>{{ $lang.MOBILE_NUMBER }}</label>
                          <v-text-field
                            v-model="form.mobile"
                            :placeholder="$lang.MOBILE_NUMBER"
                            :rules="$rules.MOBILE"
                            class="mt-1"
                            dense
                            maxlength="10"
                            outlined
                            single-line
                          >
                            <template slot="prepend-inner">
                              <span class="mt-1">+91</span>
                            </template>
                          </v-text-field>
                        </div>
                        <p class="d-inline-flex">
                          <v-checkbox
                            v-model="form.agree"
                            :rules="[
                              $rules.REQUIRED_FIELD($lang.CONFIRM_PASSWORD),
                            ]"
                            class="shrink ma-0"
                            hide-details
                            style="display: inline-flex;"
                          ></v-checkbox>
                          <small class="agree-text">
                            I agree to the
                            <span v-if="$project.NAME == 'IM'">
                              Indian Mentors
                            </span>
                            <span v-else> Tutors Factory </span>
                            <a
                              v-if="$project.NAME == 'IM'"
                              href="https://indianmentors.in/terms/"
                              target="_blank"
                              >Terms of service</a
                            >
                            <a
                              v-else
                              href="https://www.tutorsfactory.com/terms-and-condition.html"
                              target="_blank"
                              >Terms of service</a
                            >
                            and
                            <a
                              v-if="$project.NAME == 'IM'"
                              href="https://indianmentors.in/privacy-policy/"
                              target="_blank"
                              >Privacy policy</a
                            >

                            <a
                              v-else
                              href="https://www.tutorsfactory.com/privacy-policy.html"
                              target="_blank"
                              >Privacy policy</a
                            >
                          </small>
                        </p>
                        <div class="text-center">
                          <v-btn
                            :loading="btn_loading"
                            block
                            class="pa-6 mt-5"
                            type="submit"
                            color="primary"
                          >
                            <span style="font-size: 17px;">{{
                              $lang.SING_UP
                            }}</span>
                          </v-btn>
                        </div>
                        <p class="text-center mt-5">
                          {{ $lang.ALREADY_HAVE_AN_ACCOUNT }}
                          <a
                            href="javascript:void(0);"
                            @click="$router.push({ name: 'login' })"
                            >{{ $lang.SING_IN }}</a
                          >
                        </p>
                      </v-form>
                    </v-stepper-content>
                    <v-stepper-content class="px-0" step="2">
                      <v-form ref="otp_form" lazy-validation>
                        <small class="float-right"
                          >OTP send to {{ form.mobile.slice(0, 2) }}******{{
                            form.mobile.slice(6, 10)
                          }}</small
                        >
                        <label class="auth-label">{{ $lang.ENTER_OTP }}</label>
                        <div class="input-sub-card">
                          <OtpBlock @on-complete="getOtp"></OtpBlock>
                          <p class="py-4 resent-otp-text" @click="resendOtp">
                            {{ $lang.RESEND_OTP }}
                          </p>
                        </div>

                        <div class="input-sub-card">
                          <v-btn
                            :loading="btn_loading"
                            block
                            class="auth-action-btn"
                            color="primary"
                            height="50px"
                            @click="submitOTP"
                          >
                            <span class="btn_text">{{ $lang.CONTINUE }}</span>
                          </v-btn>
                          <v-btn
                            block
                            class="auth-action-btn mt-3"
                            color="primary"
                            height="50px"
                            outlined
                            @click="
                              step = 1;
                              $refs.user_login_form.validate();
                            "
                          >
                            <span class="btn_text">{{ $lang.BACK }}</span>
                          </v-btn>
                        </div>
                      </v-form>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- </div> -->
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
      otp: "",
      otp_token: "",
      is_student_form: false,
      form: {
        name: "",
        mobile: "",
        agree: false,
      },
    };
  },
  created() {
    /* setting the favicon*/
    document.querySelector(
      "link[rel~='icon']"
    ).outerHTML = `<link rel="icon" href="./${this.$project.NAME}-fevicon.png">`;

    /*  show and hide the back btn*/
    this.is_student_form =
      this.$route.name == "student_registration" ? true : false;
  },
  methods: {
    getOtp(otp) {
      this.otp = otp;
      this.$refs.otp_form.validate();
    },
    signUp() {
      {
        const self = this;
        if (this.$refs.signup_form.validate() == false) return false;
        self.btn_loading = true;
        var form = new URLSearchParams();
        form.append("mobile", self.form.mobile);
        form.append("name", self.form.name);
        form.append(
          "account_type",
          self.is_student_form
            ? self.$keys.ACCOUNT_STUDENT
            : self.$keys.ACCOUNT_TEACHER
        );
        const successHandler = (response) => {
          if (response.data.success) {
            self.otp_token = response.headers["otp-token"];
            this.step = 2;
          }
        };
        const finallyHandler = () => {
          self.btn_loading = false;
        };
        this.request_POST(
          self,
          this.$urls.SIGNUP,
          form,
          successHandler,
          null,
          null,
          finallyHandler
        );
      }
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
          this.$refs.signup_form.reset();
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
      self.request_POST(
        self,
        self.$urls.RESEND_OTP,
        form,
        successHandler,
        header
      );
    },
  },
};
</script>
