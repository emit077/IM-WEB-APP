<style lang="scss" scoped>
.h-0 {
  height: 0px;
}

.subscription_table tr td {
  padding: 0px 10px;
}

.price-selection-block {
  border: solid 1px lightgrey;
  border-radius: 10px;
}

.selected-price-selection-block {
  background-color: #32345f;
  border-radius: 10px;
  color: yellow;

  .label-text-1 {
    color: white;
  }
}

.promo-apply-btn {
  border-radius: 20px;
  color: #ffffff;
  cursor: pointer;
}

table tr:nth-child(2n) {
  background-color: #8080801f;
}

table td {
  padding: 7px 10px;
}

table {
  border-collapse: collapse;
}

.row-border {
  background-color: transparent !important;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
}

.emi-table {
  table,
  tr,
  td,
  th {
    border-collapse: collapse;
    border: solid 1px lightgray;
  }
}
</style>
<template>
  <div>
    <v-form ref="add_subscription_form" @submit.prevent="" lazy-validation>
      <v-row
        class="custom-form"
        justify="space-between"
        :class="{
          '': $vuetify.breakpoint.smAndDown,
          ' pl-4': $vuetify.breakpoint.mdAndUp,
        }"
      >
        <v-col class="px-0" cols="12" md="7">
          <v-row class="mx-0 pa-0">
            <v-col class="py-0" cols="12" md="12">
              <label class="label-text-1">{{ $lang.INVOICE_TYPE }} </label>
              <v-radio-group class="mt-0" v-model="form.invoice_type" row>
                <v-radio
                  v-for="(invoice_type, i) in invoice_type_option"
                  :key="i"
                  :label="invoice_type"
                  :value="invoice_type"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.STUDENT }} </label>
              <v-combobox
                v-model="form.student"
                :items="student_list"
                :search-input.sync="student_search_query"
                item-text="name"
                item-value="id"
                @focus="studentAutocomplete()"
                @keyup="studentAutocomplete()"
                placeholder="Select Students"
                :rules="[$rules.REQUIRED_FIELD($lang.STUDENT)]"
                @change="getStudentSubscriptionList"
                dense
                outlined
                single-line
                clearable
              >
                <template v-slot:item="{ index, item }">
                  <div :key="index">
                    <p class="fs-12 fw-bold">{{ item.name }}</p>
                    <p class="fs-12">{{ item.mobile }}</p>
                  </div>
                </template>
              </v-combobox>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.SUBSCRIPTION_PLAN }} </label>
              <v-select
                v-model="form.subscription_plan"
                :items="subscription_list"
                :placeholder="$lang.SUBSCRIPTION_PLAN_SEARCH"
                :rules="[$rules.REQUIRED_FIELD($lang.SUBSCRIPTION_PLAN)]"
                clearable
                dense
                outlined
                single-line
                :disabled="form.student ? false : true"
                @change="
                  form.price = form.subscription_plan.price;
                  form.number_of_student = form.subscription_plan.price_list[0];
                  subscriptionPreview();
                "
              >
                <template v-slot:selection="data">
                  <span>{{ data.item.plan_name }} ({{ data.item.price }})</span>
                </template>

                <template v-slot:item="{ index, item }">
                  <div :key="index">
                    <p class="fs-12 fw-bold">{{ item.plan_name }}</p>
                    <p class="fs-12">Price : {{ item.price }}</p>
                  </div>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row class="mx-0 pa-0" v-if="form.subscription_plan">
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.DURATION }} </label>
              <v-select
                v-model="form.tenure"
                :items="tenure_list"
                :placeholder="$lang.DURATION"
                :rules="[$rules.REQUIRED_FIELD($lang.DURATION)]"
                dense
                outlined
                single-line
                @change="subscriptionPreview"
              >
                <template v-slot:selection="data">
                  <span>{{ data.item }} Months</span>
                </template>
                <template v-slot:item="{ index, item }">
                  <div :key="index">
                    <p class="fs-12 fw-bold">{{ item }} Months</p>
                  </div>
                </template>
              </v-select>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.NUMBER_OF_STUDENTS }} </label>
              <v-select
                v-model="form.number_of_student"
                :items="form.subscription_plan.price_list"
                :placeholder="$lang.NUMBER_OF_STUDENTS"
                :rules="[$rules.REQUIRED_FIELD($lang.NUMBER_OF_STUDENTS)]"
                dense
                item-value="number_of_student"
                item-text="number_of_student"
                outlined
                single-line
                @change="subscriptionPreview"
              >
                <template v-slot:selection="data">
                  <div class="py-2">
                    <p class="label-text-1 fs-14 fw-bold">
                      For {{ data.item.number_of_students }} Students
                    </p>
                    <h3>
                      ₹{{ data.item.price_per_head }}/<small class="label-text-1"
                        >student</small
                      >
                    </h3>
                  </div>
                </template>
                <template v-slot:item="{ index, item }">
                  <div :key="index" class="py-2">
                    <p class="label-text-1 fs-14 fw-bold">
                      For {{ item.number_of_students }} Students
                    </p>
                    <h3>
                      ₹{{ item.price_per_head }}/<small class="label-text-1"
                        >student</small
                      >
                    </h3>
                  </div>
                </template>
              </v-select>
            </v-col>

            <v-col class="py-0" cols="12" md="6">
              <label class="label-text-1">{{ $lang.PAYMENT_TYPE }} </label>
              <v-select
                v-model="form.payment_type"
                :items="['Full', $keys.PAYMENT_TYPE_INSTALLMENT]"
                :placeholder="$lang.PAYMENT_TYPE"
                :rules="[$rules.REQUIRED_FIELD($lang.PAYMENT_TYPE)]"
                dense
                outlined
                single-line
              ></v-select>
            </v-col>
            <v-col class="py-0" cols="12" md="6">
              <div v-if="form.payment_type == $keys.PAYMENT_TYPE_INSTALLMENT">
                <label class="label-text-1">{{ $lang.NUMBER_OF_INSTALLMENT }} </label>
                <v-select
                  v-model="form.number_of_installment"
                  :items="[2, 3, 4, 5, 6 ,7,8,9,10,11,12]"
                  :placeholder="$lang.NUMBER_OF_INSTALLMENT"
                  :rules="[$rules.REQUIRED_FIELD($lang.NUMBER_OF_INSTALLMENT)]"
                  dense
                  outlined
                  single-line
                  :messages="
                    '₹' +
                    (
                      parseInt(preview_data.total_amount) /
                      parseInt(form.number_of_installment)
                    ).toFixed(2) +
                    '/month'
                  "
                  @change="subscriptionPreview"
                ></v-select>
              </div>
            </v-col>

            <v-col class="" cols="8" md="6">
              <v-text-field
                v-model="form.promo_code"
                :label="$lang.HAVE_A_PROMO_CODE"
                dense
                maxlength="10"
                single-line
                :disabled="parseInt(preview_data.discount_amount) > 0"
                @change="subscriptionPreview"
              >
                <template v-slot:append>
                  <v-icon
                    v-if="parseInt(preview_data.discount_amount) > 0"
                    @click="(form.promo_code = null), subscriptionPreview()"
                  >
                    mdi-close-circle</v-icon
                  >
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="4" md="6">
              <span
                v-if="parseInt(preview_data.discount_amount) > 0"
                class="completed px-2"
              >
                Applied!!</span
              >
              <v-btn v-else small color="primary">Apply</v-btn>
            </v-col>
          </v-row>
          <!-- emi table  -->
          <div
            v-if="
              form.payment_type == $keys.PAYMENT_TYPE_INSTALLMENT &&
              form.number_of_installment > 1
            "
            class="fs-14"
          >
            <table class="emi-table mt-10" style="width: 100%">
              <tr>
                <th class="text-left pa-2" style="width: 80px">EMI No.</th>
                <th class="text-left pa-2">Payment Date</th>
                <th class="text-right pa-2">Amount</th>
              </tr>
              <tr v-for="(emi_data, i) in installments_data" :key="i">
                <td>{{ i + 1 }}</td>
                <td>
                  <p v-if="i == 0">
                    {{ emi_data.emi_due_date }}
                    <span small class="px-2 pending">Today</span>
                  </p>
                  <input
                    type="date"
                    onfocus="this.showPicker()"
                    onkeydown="return false"
                    v-model="emi_data.emi_due_date"
                    :min="new Date().toISOString().split('T')[0]"
                    v-else
                  />
                </td>
                <td>
                  <input
                    style="width: 100%"
                    class="text-right"
                    type="text"
                    v-model="emi_data.emi_amount"
                    @change="calTotal"
                  />
                </td>
              </tr>
              <tr
                class="tw-bold"
                :class="
                  preview_data.total_amount == total_emi_amount ? 'success' : 'error'
                "
              >
                <td colspan="2" class="text-left">Total</td>
                <td class="text-right">{{ parseFloat(total_emi_amount) | formateAmount }}</td>
              </tr>
            </table>
            <div
              v-if="preview_data.total_amount != total_emi_amount"
              class="text-right error--text"
            >
              <span
                >The total EMI must be equal to
                <b>{{ preview_data.total_amount }}</b></span
              >
            </div>
          </div>
          <!-- emi end  -->
        </v-col>
        <!-- summary section -->
        <v-col
          cols="12"
          md="5"
          :class="{
            'px-5': $vuetify.breakpoint.smAndDown,
            'px-5': $vuetify.breakpoint.mdAndUp,
          }"
        >
          <div v-if="form.subscription_plan">
            <h3 class="mt-2 text-center">Summary</h3>
            <table style="width: 100%" class="mt-4">
              <tr>
                <td>
                  <label class="label-text-1"> {{ $lang.STUDENT_ID }} :</label>
                  <p class="text-1">{{ form.student.student_id || "-" }}</p>
                </td>
                <td>
                  <label class="label-text-1">{{ $lang.STUDENT_NAME }} :</label>
                  <p class="text-1">{{ form.student.name }}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="label-text-1"> {{ $lang.MOBILE_NUMBER }} :</label>
                  <p class="text-1">{{ form.student.mobile || "-" }}</p>
                </td>
                <td>
                  <label class="label-text-1"> {{ $lang.CLASS }} :</label>
                  <p class="text-1">{{ form.student.class_name || "-" }}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="label-text-1">{{ $lang.PLAN_NAME }} :</label>
                  <p class="text-1">
                    {{ preview_data.plan_name }}
                    <small> ({{ form.subscription_plan.plan_type }}) </small>
                  </p>
                </td>
                <td>
                  <label class="label-text-1">{{ $lang.HOURS }} :</label>
                  <p class="text-1">
                    {{ form.subscription_plan.teaching_hours }} <small>Hours/Day</small>
                    <br />
                    {{ form.subscription_plan.classes_per_week }} <small>Days/Week</small>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <label class="label-text-1">{{ $lang.NO_OF_SUBJECTS_ALLOWED }} :</label>
                  <p class="text-1">{{ form.subscription_plan.number_of_subjects }}</p>
                </td>
                <td>
                  <label class="label-text-1">Total {{ $lang.HOURS }} :</label>
                  <p class="text-1">{{ preview_data.teaching_hours }} Hours</p>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="height: 20px"></td>
              </tr>
              <tr class="row-border">
                <td>
                  <label class="label-text-1 py-1">{{ $lang.PRICE }}</label>
                </td>
                <td class="text-right py-1">{{ parseFloat(preview_data.price) | formateAmount }}</td>
              </tr>
              <tr v-if="parseInt(preview_data.discount_amount) > 0" class="row-border">
                <td>
                  <label class="label-text-1 py-1">{{ $lang.DISCOUNT }}</label>
                </td>
                <td class="text-right py-1">
                  <small>(-)</small> {{ parseFloat(preview_data.discount_amount) | formateAmount }}
                </td>
              </tr>
              <tr class="row-border">
                <td class="py-1">
                  <b>{{ $lang.TOTAL }}</b>
                </td>
                <td class="text-right fw-bold py-1">
                  {{ parseFloat(preview_data.total_amount) | formateAmount }}
                </td>
              </tr>
            </table>
            <div class="text-center">
              <v-btn
                color="primary font-weight-bold px-8 mt-5"
                height="40"
                rounded
                @click="OpenConfirmationDialog"
              >
                {{ $lang.SUBMIT }}
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-form>
    <!-- confirmation dialog -->
    <ConfirmationDialog
      :data="confirmation_dialog_data"
      @yes="addSubscriptions"
    ></ConfirmationDialog>
  </div>
</template>

<script>
import HelperMixin from "@/helper/mixins/helper-mixin";

export default {
  mixins: [HelperMixin],
  components: {
    ConfirmationDialog: () => import("@/components/shared/dialogs/ConfirmationDialog"),
  },
  data() {
    return {
      student_search_query: "",
      student_list: [],
      subscription_list: [],
      subscription_plan_id: "",
      tenure_list: [],
      invoice_type_option: ["GST Invoice", "Non GST Invoice"],
      form: {
        invoice_type: "GST Invoice",
        student: null,
        subscription_plan: null,
        price: null,
        payment_type: "Full",
        number_of_installment: null,
        number_of_student: 1,
        tenure: 1,
        promo_code: null,
      },
      preview_data: {
        plan_name: "",
        price: "",
        discount_amount: "",
        installment_amount: "",
        total_amount: "",
        teaching_hours: "",
      },
      installments_data: [],
      total_emi_amount: 0,
      confirmation_dialog_data: {
        flag: false,
        // title: "Are you sure?",
        title: "Are you sure? whant to issue the subsciption plan",
        message: "This action cannot be undone. Please check all the details carefully",
      },
    };
  },
  created() {
    /*  show and hide the back btn*/
    // this.studentAutocomplete(true, "")
  },
  methods: {
    studentAutocomplete(is_cancel = true) {
      const self = this;
      self.table_loading = true;
      let params = {
        page_number: this.page_number,
        page_length: this.$keys.PAGE_LENGTH,
        search_query: this.student_search_query,
        type: 2,
        profile_status: 2,
      };
      const successHandler = (response) => {
        if (response.data.success) {
          self.student_list = response.data.student_list;
          self.total_page_count = response.data.total_page_count;

          let stu = self.student_list.find((el) => el.id === self.form.student.id);
          if (stu) {
            self.student_list.splice(self.student_list.indexOf(stu), 1);
          }
        }
      };
      const finallyHandler = () => {
        self.table_loading = false;
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.STUDENT_LIST,
        params,
        successHandler,
        null,
        null,
        finallyHandler,
        is_cancel
      );
    },
    getStudentSubscriptionList() {
      const self = this;
      this.form.subscription_table_id = null;
      this.subscription_list = [];

      if (!this.form.student) return false;
      self.$store.dispatch("setPageLoader", true);
      let params = {
        student_table_id: this.form.student.id,
      };

      const successHandler = (response) => {
        if (response.data.success) {
          self.subscription_list = response.data.subscription_plan_list;
          self.tenure_list = response.data.tenure_list;
          this.form.tenure = response.data.tenure_list[0];
        }
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.LIST_SUBSCRIPTION_PLAN,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    calTotal() {
      this.total_emi_amount = 0;
      this.installments_data.forEach((element) => {
        this.total_emi_amount += parseFloat(element.emi_amount);
      });
    },
    subscriptionPreview() {
      const self = this;
      if (this.$refs.add_subscription_form.validate() == false) return false;

      self.$store.dispatch("setPageLoader", true);
      var form = new FormData();
      form.append("student_table_id", this.form.student.id);
      form.append("subscription_plan_id", self.form.subscription_plan.id);
      if (
        this.form.number_of_installment &&
        this.form.payment_type == this.$keys.PAYMENT_TYPE_INSTALLMENT
      )
        form.append("number_of_installments", self.form.number_of_installment);
      form.append("number_of_students", self.form.number_of_student.number_of_students);
      form.append("validity", self.form.tenure);
      if (self.form.promo_code) form.append("promo_code", self.form.promo_code);

      const successHandler = (response) => {
        if (response.data.success) {
          self.preview_data = response.data;
          self.plan_name = response.data.preview_data;
          self.price = response.data.preview_data;
          self.discount_amount = response.data.preview_data;
          self.installment_amount = response.data.preview_data;
          self.total_amount = response.data.preview_data;
          self.teaching_hours = response.data.preview_data;
          self.installments_data = response.data.installments_data;
        }

        if (this.form.payment_type == this.$keys.PAYMENT_TYPE_INSTALLMENT)
          this.calTotal();
      };
      const finallyHandler = () => {
        self.$store.dispatch("setPageLoader", false);
      };
      this.request_POST(
        self,
        this.$urls.SUBSCRIPTION_PREVIEW,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    OpenConfirmationDialog() {
      /* validate and open dialog box for confirmation*/
      if (this.$refs.add_subscription_form.validate() == false) return false;
      if (
        this.form.payment_type == this.$keys.PAYMENT_TYPE_INSTALLMENT &&
        parseFloat(this.preview_data.total_amount) !== parseFloat(this.total_emi_amount)
      )
        return false;
      this.confirmation_dialog_data.flag = true;
    },
    addSubscriptions() {
      /* submit the form */
      const self = this;
      if (this.$refs.add_subscription_form.validate() == false) return false;
      if (
        this.form.payment_type == this.$keys.PAYMENT_TYPE_INSTALLMENT &&
        parseFloat(this.preview_data.total_amount) !== parseFloat(this.total_emi_amount)
      )
        return false;
      self.btn_loader = true;
      var form = new FormData();
      form.append("student_table_id", this.form.student.id);
      form.append("invoice_type", this.form.invoice_type);
      form.append("subscription_plan_id", self.form.subscription_plan.id);
      form.append("number_of_students", self.form.number_of_student.number_of_students);
      form.append("validity", self.form.tenure);
      if (self.form.promo_code) form.append("promo_code", self.form.promo_code);

      if (
        this.form.payment_type == this.$keys.PAYMENT_TYPE_INSTALLMENT &&
        this.form.number_of_installment
      ) {
        form.append("number_of_installments", self.form.number_of_installment);
        form.append("installments_data", JSON.stringify(self.installments_data));
      }

      const successHandler = (response) => {
        if (response.data.success) {
          this.$refs.add_subscription_form.reset();
          this.$router.push({
            name: "student_subscription_details",
            params: {
              std_subscription_id: this.encrypt(response.data.subscription_table_id),
            },
          });
        }
      };
      const finallyHandler = () => {
        self.btn_loader = false;
      };
      this.request_POST(
        self,
        this.$urls.ACTIVATE_SUBSCRIPTION_MANUAL,
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
