<template>
  <div class="text-center">
    <v-dialog v-model="data.flag" width="450">
      <v-card>
        <div class="text-center pt-8">
          <img src="@/assets/others/warning-icon.svg" width="100" alt="">
        </div>
        <v-card-text class="py-5">
          <p v-if="data.title" class="text-center font-weight-bold" v-html="data.title"></p>
          <p class="text-center" v-html="data.message"></p>
        </v-card-text>
        <!--        <v-divider></v-divider>-->
        <v-card-actions class="just ify-end py-4">
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined rounded width="100" @click="data.flag = false">Close
          </v-btn>
          <v-btn color="primary" rounded width="100" @click="yesHandler()">Yes
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    falg: true
  }),
  methods: {
    yesHandler() {
      this.$emit("yes")
    }
  }

}
</script>