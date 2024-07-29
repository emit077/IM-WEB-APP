<template>
    <div class="text-center">
      <v-dialog v-model="data.flag" width="450">
        <v-card>
          <v-card-text class="py-5">
            <p v-if="data.title" class="text-center font-weight-bold">
              {{ data.title }}
            </p>
            <p class="text-center">{{ data.message }}</p>
          </v-card-text>
          <!--        <v-divider></v-divider>-->
          <v-card-actions class="just ify-end py-4">
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                outlined
                rounded
                width="100"
                @click="data.flag=false"
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
      }
    }
  
  }
  </script>