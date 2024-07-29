<style lang="scss" scoped></style>

<template>
  <div>
    <p class="auth-title">{{ $lang.SING_IN }}</p>
    <v-form ref="login_form" lazy-validation @submit.prevent="login()">
      <div class="input-sub-card">
        <label class="auth-label">{{ $lang.MOBILE_NUMBER }}</label>
        <v-text-field v-model="mobile" :rules="$rules.MOBILE" dense height="40" maxlength="10" placeholder="1234567890">
          <template slot="prepend-inner">
            <span class="mt-3">+91</span>
          </template>
        </v-text-field>
      </div>

      <div class="input-sub-card">
        <label class="auth-label">{{ $lang.PASSWORD }}</label>
        <v-text-field v-model="password" :placeholder="$lang.ENTER_YOUR_PASSWORD" :rules="$rules.PASSWORD"
          :type="show_password ? 'text' : 'password'" dense>
          <template slot="append">
            <v-icon v-if="show_password" class="eye-icon" @click="show_password = !show_password">mdi-eye
            </v-icon>
            <v-icon v-else class="eye-icon" @click="show_password = !show_password">mdi-eye-off</v-icon>
          </template>
        </v-text-field>
      </div>

      <div class="input-sub-card">
        <v-btn :loading="btn_loader" block class="register-action-btn" color="primary" height="50px" type="submit">
          <span class="btn_text">{{ $lang.CONTINUE }}</span>
        </v-btn>
        <p class="page-link text-center pt-5" @click="forgetPassword"> {{ $lang.FORGOT_PASSWORD }}</p>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      mobile: "",
      password: null,
      show_password: false,
      btn_loader: false,
    }
  },
  methods: {
    forgetPassword() {
      this.$emit("step-change", 2)
    },
    login() {
      const self = this;
      if (this.$refs.login_form.validate() == false)
        return false
      self.btn_loader = true
      var form = new URLSearchParams();
      form.append("mobile", self.mobile);
      form.append("password", self.password);

      const successHandler = (response) => {
        if (response.data.success) {
          if (response.data.is_otp_verified) {
            localStorage.setItem("token", response.headers.token);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("account_type", response.data.account_type);
            this.$store.dispatch("user/setUser", { name: response.data.name, account_type: response.data.account_type });
            this.$refs.login_form.reset()
            /* blocked student and tutor login form here */
            // if (response.data.account_type == this.$keys.ACCOUNT_STUDENT)
            //   self.$router.push({ name: 'student_profile' })
            // else if (response.data.account_type == this.$keys.ACCOUNT_TEACHER)
            //   self.$router.push({ name: 'tutor_profile' })

            /* redirect the user accounding to the thie account type*/
            if (response.data.account_type == this.$keys.ACCOUNT_SUPER_ADMIN) {
              self.$router.push({ name: 'overview' })
            } else if ([this.$keys.ACCOUNT_BUSINESS_DEVELOPER, this.$keys.ACCOUNT_SENIOR_ACADEMIC_COUNSELOR, this.$keys.ACCOUNT_JUNIOR_ACADEMIC_COUNSELOR].includes(response.data.account_type)) {
              self.$router.push({ name: 'bda_profile' })
            }
          } else {
            this.$emit("update", response.headers["otp-token"])
          }

        }
      };
      const finallyHandler = () => {
        self.btn_loader = false
      };
      this.request_POST(self, this.$urls.ADMIN_LOGIN, form, successHandler, null, null, finallyHandler)

    }
  }
}
</script>