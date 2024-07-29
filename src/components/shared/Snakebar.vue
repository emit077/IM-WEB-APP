<template>
  <v-snackbar v-model="getSnakbar.flag" :color="getSnakbar.color" center bottom>
    <b class="text--white">
      {{ getSnakbar.text }}
    </b>
    <template v-slot:action="{ attrs }">
      <v-btn v-bind="attrs" class="float-right px-0" dark fab
             small
             text
             @click="getSnakbar.flag = !getSnakbar.flag">
        <!-- <b>close</b> -->
        <v-icon>mdi-close-circle-outline</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex';

export default {
  computed: mapGetters({
    getSnakbar: 'snackbar/getSnakbar'
  }),

}
</script>