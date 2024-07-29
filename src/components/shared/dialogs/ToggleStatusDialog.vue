<template>
  <div class="text-center">
    <v-dialog v-model="data.flag" width="450" @click:outside="noHandler">
      <v-card>
        <div class="text-center pt-8" v-if="!data.is_active">
          <v-icon color="red" size="90">mdi-block-helper</v-icon>
          <h2 class="red--text">Block</h2>
        </div>
        <div class="text-center pt-8" v-else>
          <v-icon color="green" size="110">mdi-check-circle-outline</v-icon>
          <h2 class="fc-theme-green">Un-Block</h2>
        </div>
        <v-card-text class="py-5">
          <p class="text-center" v-html="data.msg" style="white-space: break-spaces !important;"></p>
        </v-card-text>
        <!--        <v-divider></v-divider>-->
        <v-card-actions class="just ify-end py-4">
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              outlined
              rounded
              width="100"
              @click="noHandler"
          >Close
          </v-btn>
          <v-btn
              color="primary"
              rounded
              width="100"
              @click="yesHandler()"
          >Yes
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
    },
    noHandler() {
      this.data.flag = false
      this.$emit("no")
    }

  }

}
</script>