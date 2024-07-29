<style lang="scss" scoped>
</style>

<template>
  <div>
    <p class="auth-title ">{{ $lang.CHANGE_PASSWORD }}</p>
    <v-form ref="reset_password_form" lazy-validation @submit.prevent="resetpassword()">
      <div class="input-sub-card">
        <label class="auth-label">{{ $lang.PASSWORD }}</label>
        <v-text-field
            v-model="password"
            :placeholder="$lang.ENTER_YOUR_PASSWORD"
            :rules="$rules.PASSWORD"
            :type="show_password?'password':'text'"
            dense
        >
          <template slot="append">
            <v-icon v-if="!show_password" class="eye-icon" @click="show_password=!show_password">mdi-eye</v-icon>
            <v-icon v-else class="eye-icon" @click="show_password=!show_password">mdi-eye-off</v-icon>
          </template>
        </v-text-field>
      </div>

      <div class="input-sub-card">
        <label class="auth-label">{{ $lang.CONFIRM_PASSWORD }}</label>
        <v-text-field
            v-model="confirm_password"
            :placeholder="$lang.CONFIRM_PASSWORD"
            :rules="[$rules.CONFIRM_PASSWORD(password)]"
            :type="show_password?'password':'password'"
            dense
            height="40"
        >
          <!--              <template slot="append">-->
          <!--                <v-icon v-if="!show_password" class="eye-icon" @click="show_password=!show_password">mdi-eye</v-icon>-->
          <!--                <v-icon v-else class="eye-icon" @click="show_password=!show_password">mdi-eye-off</v-icon>-->
          <!--              </template>-->
        </v-text-field>
      </div>

      <div class="input-sub-card">
        <v-btn block class="auth-action-btn" color="primary" height="50px" type="submit">
          <span class="btn_text">{{ $lang.CHANGE_PASSWORD }}</span>
        </v-btn>

        <p class="page-link text-center pt-5" @click="backToLogin"> {{ $lang.SING_IN }}</p>

      </div>

    </v-form>
  </div>
</template>

<script>
// import offline from 'v-offline';

export default {
  components: {},
  data() {
    return {
      password: "",
      confirm_password: "",
      show_password: true,
      password_mismatch: true
    }
  },
  methods: {
    backToLogin() {
      this.$emit("step-change", 1)
    },
    resetpassword() {
      const self = this;
      if (this.$refs.reset_password_form.validate() == false)
        return false

      var form = new URLSearchParams();
      form.append("password", self.password);

      const successHandler = (response) => {
        if (response.data.success) {
          localStorage.clear();
          this.$refs.reset_password_form.reset()
          this.$emit("step-change", 1)
        }
      };
      this.request_POST(self, this.$urls.RESET_PASSWORD, form, successHandler)

    }
  }
}
</script>