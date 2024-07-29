<template>
    <v-app>
        <div class="text-center d-flex justify-center h-100 align-items-center">
            <v-card flat :loading="loading" style="min-width:400px;min-height:10px">
                <div v-show="!loading">
                    <div class="text-center">
                        <img v-if="type == $keys.WARNING" src="@/assets/others/warning-icon.svg" width="100" alt="">
                        <img v-if="type == $keys.SUCCESS" src="@/assets/others/success-icon.svg" width="100" alt="">
                    </div>
                    <v-card-text class="py-5 text-center">
                        <h2 v-if="title" class=" font-weight-bold" v-html="title"></h2>
                        <p class="mb-5" v-html="message"></p>
                    </v-card-text>
                    <v-btn color="primary" rounded width="100" @click="$router.push({ name: 'login' })"> Login</v-btn>
                </div>

            </v-card>
        </div>
    </v-app>
</template>
<script>
export default {
    data: () => ({
        title: "",
        message: "",
        type: "",
        loading: true
    }),
    created() {
        this.collectRegistrationFee()
    },
    methods: {
        collectRegistrationFee() {
            const self = this;
            var form = new URLSearchParams();
            form.append("student_table_id", this.$route.query.sid);
            form.append("tutor_table_id", this.$route.query.tid);
            const successHandler = (response) => {
                if (response.data.success) {
                    this.type = this.$keys.SUCCESS
                    this.title = "Your request has been submitted successfully."
                } else {
                    this.type = this.$keys.WARNING
                    this.title = "Something went wrong. Please try again later."
                }
            };
            const finallyHandler = () => {
                self.loading = false
            };
            this.request_POST(self, this.$urls.SET_INTERESTED_TUTORS, form, successHandler, null, null, finallyHandler)

        }
    }

}
</script>