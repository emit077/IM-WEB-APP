<style lang="scss" scoped></style>
<template>
    <div>
        <div class="text-right mb-2 pr-3">
            <v-btn class="ma-2" outlined color="success" rounded
                v-if="[$keys.ACCOUNT_SUPER_ADMIN,$keys.ACCOUNT_SENIOR_ACADEMIC_COUNSELOR].includes($store.state.user.account_type)"
                @click="
                    confirmation_dialog_data.flag = true;
                confirmation_dialog_data.message = 'Modifying the status to Selected'; confirmation_dialog_data.status = 'Selected'">{{
                    $lang.SELECT
                }}</v-btn>
            <v-btn class="ma-2" outlined color="warning" rounded
                v-if="[$keys.ACCOUNT_SUPER_ADMIN].includes($store.state.user.account_type)"
                @click="confirmation_dialog_data.flag = true;
                confirmation_dialog_data.message = 'Modifying the status to Rejected'; confirmation_dialog_data.status = 'Rejected'">{{
                    $lang.REJECT
                }}</v-btn>
            <v-btn class="ma-2" outlined color="primary" rounded
                v-if="[$keys.ACCOUNT_SUPER_ADMIN, $keys.ACCOUNT_BUSINESS_DEVELOPER].includes($store.state.user.account_type)"
                @click="remark_dialog_data.remark = remark; remark_dialog_data.demo_table_id = demo_table_id; remark_dialog_data.flag = true">+{{
                    $lang.ADD + " " +
                    $lang.REMARK }}</v-btn>
        </div>
        <v-row :class="{ 'px-2': $vuetify.breakpoint.smAndDown, 'px-6': $vuetify.breakpoint.mdAndUp }"
            class="mx-0 py-0 my-1 text-left">
            <v-col class="py-2" cols="12" md="4" sm="6">
                <label class="label-text-1">{{ $lang.STUDENT }} Details</label>
                <p class="text-1">{{ student_name }}</p>
                <p class="text-1" v-if="$store.state.user.account_type != $keys.ACCOUNT_TEACHER">{{ student_mobile }}
                </p>
            </v-col>
            <v-col class="py-2" cols="12" md="4" sm="6">
                <label class="label-text-1">{{ $lang.TUTOR }} Details</label>
                <p class="text-1">{{ tutor_name }}</p>
                <p class="text-1">{{ tutor_mobile }}</p>
            </v-col>
            <v-col class="py-2" cols="12" md="4" sm="6">
                <label class="label-text-1">{{ $keys.ACCOUNT_SENIOR_ACADEMIC_COUNSELOR }} Details</label>
                <p class="text-1">{{ sac_name }}</p>
                <p class="text-1">{{ sac_mobile }}</p>
            </v-col>
            <v-col class="py-2" cols="12" md="4" sm="6">
                <label class="label-text-1">{{ $keys.ACCOUNT_JUNIOR_ACADEMIC_COUNSELOR }} Details</label>
                <p class="text-1">{{ bda_name }}</p>
                <p class="text-1">{{ bda_mobile }}</p>
            </v-col>

            <v-col class="py-2" cols="12" md="4" sm="6">
                <label class="label-text-1">Date and Time :</label>
                <p class="text-1">{{ display_date }}, {{ display_time }}</p>
            </v-col>
            <v-col class="py-2" cols="12" md="4" sm="6">
                <label class="label-text-1">{{ $lang.STATUS }}</label>
                <p>
                    <span :class="status.toLowerCase()" class="px-3">{{ status }}</span>
                </p>

            </v-col>
            <v-col class="py-2" cols="12" md="4" sm="6">
                <label class="label-text-1">{{ $lang.MDDE }}</label>
                <p>
                    <span v-if="is_online" class="online px-3">{{ $lang.ONLINE }}</span>
                    <span v-else class="offline px-3">{{ $lang.OFFLINE }}</span>
                </p>
            </v-col>
            <v-col class="py-2" cols="12" md="4" sm="6">
                <label class="label-text-1">{{ $lang.MEETING_URL }}:</label>
                <p>{{ meeting_url || "-" }}</p>
            </v-col>
            <v-col class="py-2" cols="12" md="4" sm="6">
                <label class="label-text-1">{{ $lang.DEMO_DETAILS }}:</label>
                <p class="text-1">{{ special_concern || "-" }}</p>
            </v-col>
            <v-col class="py-2" cols="12" md="4" sm="6">
                <label class="label-text-1">{{ $lang.REMARK }}:</label>
                <p class="text-1">{{ remark || "-" }}</p>
            </v-col>
        </v-row>
        <ConfirmationDialog :data="confirmation_dialog_data" @yes="changeDemoStatus()"></ConfirmationDialog>
        <RemarkDialogDialog @save="updateRemark" :dialog="remark_dialog_data"></RemarkDialogDialog>
    </div>
</template>

<script>
export default {
    components: {
        ConfirmationDialog: () => import('../../components/shared/dialogs/ConfirmationDialog'),
        RemarkDialogDialog: () => import('../../components/demo/AddRemarkDialog.vue'),
    },
    data() {
        return {
            demo_table_id: null,
            student_table_id: "",
            student_name: "",
            student_mobile: "",
            tutor_table_id: "",
            tutor_name: "",
            tutor_mobile: "",
            bda_table_id: "",
            bda_name: "",
            bda_mobile: "",
            sac_table_id: "",
            sac_name: "",
            sac_mobile: "",
            date: "",
            display_date: "",
            is_online: "",
            meeting_url: "",
            time: "",
            display_time: "",
            special_concern: "",
            remark: "",
            status: "",
            confirmation_dialog_data: {
                flag: false,
                title: "Are you sure?",
                message: "Modifying the status to"
            },
            remark_dialog_data: {
                flag: false,
                remark: "",
                demo_table_id: ""
            }
        }
    },
    created() {
        if (this.$route.params.demo_table_id) {
            this.demo_table_id = this.decrypt(this.$route.params.demo_table_id);
            this.getDemoDetails(this.demo_table_id);
        }
    },
    methods: {
        getDemoDetails(demo_table_id) {
            const self = this;
            self.table_loading = true;
            let params = {
                demo_table_id: demo_table_id,
            };
            const successHandler = (response) => {
                if (response.data.success) {
                    self.student_table_id = response.data.demo_data.student_table_id
                    self.student_name = response.data.demo_data.student_name
                    self.student_mobile = response.data.demo_data.student_mobile
                    self.tutor_table_id = response.data.demo_data.tutor_table_id
                    self.tutor_name = response.data.demo_data.tutor_name
                    self.tutor_mobile = response.data.demo_data.tutor_mobile
                    self.bda_table_id = response.data.demo_data.bda_table_id
                    self.bda_name = response.data.demo_data.bda_name
                    self.bda_mobile = response.data.demo_data.bda_mobile
                    self.sac_table_id = response.data.demo_data.sac_table_id
                    self.sac_name = response.data.demo_data.sac_name
                    self.sac_mobile = response.data.demo_data.sac_mobile
                    self.date = response.data.demo_data.date
                    self.display_date = response.data.demo_data.display_date
                    self.is_online = response.data.demo_data.is_online
                    self.meeting_url = response.data.demo_data.meeting_url
                    self.time = response.data.demo_data.time
                    self.display_time = response.data.demo_data.display_time
                    self.special_concern = response.data.demo_data.special_concern
                    self.remark = response.data.demo_data.remark
                    self.status = response.data.demo_data.status

                }
            };
            const finallyHandler = () => {
                self.table_loading = false;
                self.$store.dispatch("setPageLoader", false);
            };

            self.request_GET(
                self,
                self.$urls.DEMO_DETAILS,
                params,
                successHandler,
                null,
                null,
                finallyHandler,
                null
            );
        },
        changeDemoStatus() {
            const self = this;
            var form = new URLSearchParams();
            form.append("demo_table_id", self.demo_table_id);
            form.append("status", self.confirmation_dialog_data.status);

            const successHandler = (response) => {
                self.confirmation_dialog_data.flag = false
                self.status = self.confirmation_dialog_data.status
            };
            const finallyHandler = () => {
            };
            this.request_POST(self, this.$urls.DEMO_CHANGE_STATUS, form, successHandler, null, null, finallyHandler)

        },
        updateRemark(remark) {
            this.remark_dialog_data.flag = false
            this.remark = remark
        }
    }
}
</script>
