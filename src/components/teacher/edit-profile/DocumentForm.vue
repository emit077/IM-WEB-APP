<template>
  <div>
    <v-row class="ma-0">
      <v-col
        :class="{
          'pa-0': $vuetify.breakpoint.smAndDown,
          'px-1 py-0': $vuetify.breakpoint.mdAndUp,
        }"
        cols="12"
        md="3"
      >
        <div v-if="profile_picture">
          <img :src="profile_picture" alt="" height="200px" width="100%" />
          <v-btn
            fab
            width="26px"
            height="26px"
            color="#FFF"
            @click="deleteImages('profile_picture')"
            absolute
            class="v-align-top"
            style="margin-left: -17px; margin-top: -7px"
          >
            <v-icon size="18" color="error"> mdi-window-close</v-icon>
          </v-btn>
          <p class="label-text-1 text-center">Profile picture</p>
        </div>
        <div v-else>
          <UploadFile
            :height="'200px'"
            :file_input_label="'Profile picture'"
            :type="'profile_picture'"
            :file_loading="file_loading"
            @update-image="saveImages"
          ></UploadFile>
        </div>
      </v-col>

      <v-col
        :class="{
          'pa-0': $vuetify.breakpoint.smAndDown,
          'px-1 py-0': $vuetify.breakpoint.mdAndUp,
        }"
        cols="12"
        md="3"
      >
        <div v-if="security_document">
          <img :src="security_document" alt="" height="200px" width="100%" />
          <v-btn
            fab
            width="26px"
            height="26px"
            color="#FFF"
            @click="deleteImages('security_document')"
            absolute
            class="v-align-top"
            style="margin-left: -17px; margin-top: -7px"
          >
            <v-icon size="18" color="error"> mdi-window-close</v-icon>
          </v-btn>
          <p class="label-text-1 text-center">Aadhaar/Driving license/Passport</p>
        </div>
        <div v-else>
          <UploadFile
            :height="'200px'"
            :file_input_label="'Aadhaar/Driving license/Passport'"
            :type="'security_document'"
            :file_loading="file_loading"
            @update-image="saveImages"
          ></UploadFile>
        </div>
      </v-col>
    </v-row>

    <div class="text-center mt-5">
      <v-btn
        class="my-3 px-8 py-4"
        color="primary"
        width="200px"
        @click="
          $router.push({
            name: 'tutor_profile',
            query: { tutor_table_id: encrypt(tutor_table_id) },
          })
        "
      >
        {{ $lang.SUBMIT }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    UploadFile: () => import("@/components/shared/UploadFile"),
  },
  data() {
    return {
      tutor_table_id: -1,
      profile_picture: null,
      security_document: null,
      file_loading: false,
    };
  },
  created() {
    if (this.$store.getters.getUsertype != this.$keys.ACCOUNT_TEACHER)
      this.tutor_table_id = this.decrypt(this.$route.query.tutor_table_id);
    this.getTutorDocuments();
  },
  methods: {
    getTutorDocuments() {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let params = {};
      if (self.tutor_table_id) params.tutor_table_id = self.tutor_table_id;
      const successHandler = (response) => {
        if (response.data.success) {
          self.security_document = response.data.security_document;
          self.profile_picture = response.data.profile_picture;
        }
      };
      const finallyHandler = () => {
        this.$store.dispatch("setPageLoader", false);
      };

      self.request_GET(
        self,
        self.$urls.GET_TUTOR_DOCUMENTS,
        params,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    saveImages(image, type, action = "Create") {
      this.file_loader = true;
      const self = this;
      let form = new FormData();
      form.append("document_type", type);
      form.append("image", image);
      form.append("action", action);
      if (this.tutor_table_id) form.append("tutor_table_id", this.tutor_table_id);
      const successHandler = (response) => {
        this.file_loader = false;
        if (response.data.success) {
          this.showSnakeBar("File uploaded successfully!!");

          this.getTutorDocuments();
        }
      };
      const finallyHandler = () => {
        this.file_loader = false;
      };

      self.request_POST(
        self,
        self.$urls.UPLOAD_DOCUMENT,
        form,
        successHandler,
        null,
        null,
        finallyHandler
      );
    },
    deleteImages(type, action = "Delete") {
      const self = this;
      this.$store.dispatch("setPageLoader", false);
      let form = new FormData();
      form.append("document_type", type);
      form.append("action", action);
      if (this.tutor_table_id) form.append("tutor_table_id", this.tutor_table_id);
      const successHandler = (response) => {
        if (response.data.success) {
          this.getTutorDocuments();
        }
      };
      const finallyHandler = () => {
        this.$store.dispatch("setPageLoader", false);
      };

      self.request_POST(
        self,
        self.$urls.UPLOAD_DOCUMENT,
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
