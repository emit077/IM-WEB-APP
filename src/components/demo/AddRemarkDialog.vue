<style lang="scss" scoped>
.comment-list {
    height: 400px;
    overflow-y: scroll;

    .comment-item {
        max-width: 80%;
        width: max-content;
        min-width: 40%;
        background-color: #FBEE0552;
        border-radius: 8px;
    }

    .my-comment {
        width: max-content;
        max-width: 80%;
        min-width: 40%;
        display: block;
        background-color: #130DD724;
        border-radius: 8px;
        margin-left: auto;
        margin-right: 0;
    }
}
</style>
<template>
    <div class="text-center">
        <v-dialog v-model="dialog.flag" width="550">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                    {{ $lang.ADD }} {{ $lang.REMARK }}
                </v-card-title>
                <!--        <v-divider></v-divider>-->
                <v-form ref="remark_form" lazy-validation @submit.prevent="AddRemark()">
                    <div class="justify-center py-10 px-5  d-block">
                        <v-textarea v-model="dialog.remark" outlined label="Add remark here" type="text" single-line
                            dense class="mb-n2" :rules="$rules.COMMENT">
                        </v-textarea>
                        <div class="text-center">
                            <v-btn depressed color="primary" outlined class="" type="submit" :loading="btn_loader">
                                {{ $lang.SUBMIT }}
                            </v-btn>
                        </div>
                    </div>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    props: {
        dialog: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        btn_loader: false,
        remark: ""
    }),
    methods: {
        /* add comment */
        AddRemark() {
            const self = this;
            if (this.$refs.remark_form.validate() == false)
                return false
            self.btn_loader = true
            var form = new URLSearchParams();
            form.append("demo_table_id", self.dialog.demo_table_id);
            form.append("remark", self.dialog.remark);
            self.remark = self.dialog.remark

            this.$refs.remark_form.reset()

            const successHandler = (response) => {
                this.$emit("save", self.remark)
            };
            const finallyHandler = () => {
                self.btn_loader = false
            };
            this.request_POST(self, this.$urls.DEMO_CHANGE_STATUS, form, successHandler, null, null, finallyHandler)
        }
    }

}
</script>