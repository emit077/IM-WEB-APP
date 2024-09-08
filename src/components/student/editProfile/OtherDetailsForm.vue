<style lang="scss" scoped>
.student_edit_form_wrapper {
  label {
    margin-left: 8px;
  }
}
</style>

<template>
  <v-card class="pb-5 py-5 bg-transparent" flat color="">
    <v-form ref="student_edit_form" lazy-validation>
      <v-row
        :class="{
          'px-0': $vuetify.breakpoint.smAndDown,
          'px-0': $vuetify.breakpoint.mdAndUp,
        }"
        class="ma-0"
      >
        <v-col class="py-0" cols="12" md="4">
          <div class="form-filed-wrapper mt-2">
            <label class="label-text-1 pb-0">{{ $lang.MODE_OF_CLASS }}:</label>
            <div class="px-2 d-flex v-align-top">
              <v-checkbox
                v-for="(item, i) in $keys.CLASS_MODE_OPTION"
                :key="item"
                v-model="class_mode_preference"
                :label="item"
                :value="item"
                class="shrink mr-3 mt-0"
                hide-details
              ></v-checkbox>
            </div>
          </div>
        </v-col>
        <v-col class="py-0" cols="12" md="8">
          <div class="form-filed-wrapper mt-2">
            <label class="label-text-1 pb-0">{{ $lang.TEACHING_PREFERENCE }}:</label>
            <div class="px-2 d-flex v-align-top">
              <v-checkbox
                v-for="(item, i) in $keys.STUDENT_TEACHING_PREFERENCE_OPTION"
                :key="item"
                v-model="form.teaching_preference"
                :label="item"
                :value="item"
                class="shrink mr-3 mt-0"
                hide-details
              ></v-checkbox>
            </div>
          </div>
        </v-col>

        <!-- day Perference -->
        <v-col class="py-0" cols="12" md="12">
          <div class="form-filed-wrapper mt-2">
            <label class="label-text-1">{{ $lang.SUITABLE_DAYS }}:</label> <br />
            <div class="px-2 d-flex v-align-top flex-wrap" style="flex-direction: row">
              <v-checkbox
                v-for="(item, i) in $keys.WEEKDAYS_OPTION"
                :key="item"
                v-model="suitable_days"
                :label="item"
                :value="item"
                class="shrink mr-3 mt-0"
                hide-details
              ></v-checkbox>
            </div>
          </div>
        </v-col>
        <!-- time preference -->
        <v-col class="py-0" cols="12" md="12">
          <div class="form-filed-wrapper mt-2">
            <label class="label-text-1">{{ $lang.SUITABLE_TIME_SLOT }}:</label> <br />
            <div class="d-inline-block px-2 v-align-top">
              <p class="text-1 text-md-left text-center mb-2">{{ $lang.MORNING }}</p>

              <v-checkbox
                v-for="item in morning_time_slots"
                :key="item.id"
                v-model="form.time_slots_id_list"
                :label="item.slot_from + ' - ' + item.slot_to"
                :value="item.id"
                class="shrink ma-0"
                hide-details
              ></v-checkbox>
            </div>
            <div class="d-inline-block px-2 v-align-top">
              <p class="text-1 text-md-left text-center mb-2">
                {{ $lang.AFTER_NOON }}
              </p>
              <v-checkbox
                v-for="item in afternoon_time_slots"
                :key="item.id"
                v-model="form.time_slots_id_list"
                :label="item.slot_from + ' - ' + item.slot_to"
                :value="item.id"
                class="shrink ma-0"
                hide-details
              ></v-checkbox>
            </div>
            <div class="d-inline-block px-2 v-align-top">
              <p class="text-1 text-md-left text-center mb-2">{{ $lang.EVENING }}</p>
              <v-checkbox
                v-for="item in evening_time_slots"
                :key="item.id"
                v-model="form.time_slots_id_list"
                :label="item.slot_from + ' - ' + item.slot_to"
                :value="item.id"
                class="shrink ma-0"
                hide-details
              ></v-checkbox>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="text-center mt-5 px-3">
        <v-btn
          text
          outlined
          color="primary"
          class="ma-3"
          width="120"
          @click="$emit('next', 3)"
        >
          Back
        </v-btn>
        <v-btn
          color="primary"
          @click="Save()"
          width="120"
          :loading="btn_loader"
          :disabled="btn_loader"
        >
          Continue
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {
    form: {
      type: Object,
    },
    morning_time_slots: {
      default: [],
    },
    afternoon_time_slots: {
      default: [],
    },
    evening_time_slots: {
      default: [],
    },
    class_mode_preference: {
      default: null,
    },
    suitable_days: {
      default: [],
    },
    student_table_id: {
      default: null,
    },
  },
  data: () => ({
    btn_loader: false,
  }),

  methods: {
    /* save profile details*/
    Save() {
      const self = this;
      if (this.$refs.student_edit_form.validate() == false) return false;
      self.btn_loader = true;
      this.$store.dispatch("setPageLoader", true);
      var form = new URLSearchParams();
      form.append("type", self.$keys.TYPE_OTHER_FORM);
      form.append("time_slots_id_list", JSON.stringify(self.form.time_slots_id_list));
      form.append("class_mode_preference", JSON.stringify(self.class_mode_preference));
      form.append("suitable_days", JSON.stringify(self.suitable_days));
      form.append("teaching_preference", JSON.stringify(self.form.teaching_preference));

      if (this.student_table_id) form.append("student_table_id", self.student_table_id);

      const successHandler = (response) => {
        if (response.data.success) {
          self.$router.push({
            name: "student_profile",
            query: { student_table_id: self.encrypt(response.data.student_table_id) },
          });
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false;
        this.$store.dispatch("setPageLoader", false);
      };
      this.request_POST(
        self,
        this.$urls.EDIT_DETAIL,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
  },
};
</script>
