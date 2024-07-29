<style scoped>
.upload_form {
  display: block;
  width: 100%;
  background: #ffff;
  text-align: center;
  border: 2px solid rgba(109, 124, 142, 0.5);
  box-sizing: border-box;
  box-shadow: 0px 5px 10px rgba(162, 158, 158, 0.2);
  border-radius: 10px;
  align-content: center
}

div.file-listing {
  margin: auto;
  padding: 10px;
}

div.remove-container a {
  color: red;
  cursor: pointer;
}

.pre-image {
  width: 20px;
  height: 142px;
  border-radius: 10px;
}
</style>
<template>
  <div id="file-drag-drop">
    <div v-if="!file">
      <label class="cursor-pointer">
        <input
          type="file"
          ref="files"
          @change="browseFile($event)"
          :accept="$keys.ACCEPTED_IMAGE_FORMATE"
          hidden
        />
        <div class="upload_form text-center" :style="{ height: height }">
          <div class="px-15" v-if="file_loading">
            <v-progress-linear
              color="primary"
              indeterminate
              rounded
              height="4"
            ></v-progress-linear>
          </div>
          <div v-else>
            <img
              src="@/assets/others/upload.svg"
              alt=""
              width="30px"
            />
            <p class="label-text-1 text-center">Click here to Upload file</p>
          </div>
        </div>
        <p class="label-text-1 text-center">{{ file_input_label }}</p>
      </label>
    </div>

    <div class="pt-3" v-else>
      <!-- <img :src="preview_url" alt="img" class="pre-image"> -->

      <v-btn
        fab
        width="16px"
        height="16px"
        color="#FFF"
        @click="removeFile()"
        class="v-align-top"
        style="margin-left: -10px; margin-top: -5px"
      >
        <v-icon size="10" color="error"> mdi-window-close</v-icon>
      </v-btn>
    </div>
    <!-- 	<div class="file-listing text-center" v-if="file"  >
        {{file.name}}
        <div class="remove-container">
          <a class="remove" @click="removeFile()">Remove</a>
        </div>
      </div> -->
  </div>
</template>
<script>
export default {
  props: ["file_input_label", "height", "type","file_loading"],
  data() {
    return {
      dragAndDropCapable: false,
      btn_loading: false,
      file: null,
      preview_url: "",
    };
  },

  mounted() {},
  methods: {
    /* upload Csv*/
    browseFile(e) {
      const self = this;
      self.csv_loading = true;

      if (!this.$keys.ACCEPTED_IMAGE_FORMATE.includes(e.target.files[0]["type"])) {
        self.$store.dispatch("snackbar/setSnackbar", {
          flag: true,
          text: self.$messages.INVALID_FILE,
          color: "error",
        });
        return false;
      }
      if (e.target.files[0].size > 1024 * 1024 * this.$keys.MAX_FILE_SIZE) {
        self.$store.dispatch("snackbar/setSnackbar", {
          flag: true,
          text: self.$messages.MAX_FILE_SIZE_ERROR + this.$keys.MAX_FILE_SIZE,
          color: this.$keys.ERROR,
        });
        return false;
      }
      // this.file.retailer_file=e.target.files[0]
      this.updateImage(e.target.files[0]);
      this.preview_url = URL.createObjectURL(e.target.files[0]);
    },

    removeFile() {
      this.updateImage(null);
    },
    updateImage(file) {
      this.file = file;
      this.$emit("update-image", file, this.type);
    },
  },
};
</script>
