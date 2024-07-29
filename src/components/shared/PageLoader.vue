<style scoped type="text/css">
/*.page-loader-bg .v-overlay {*/
/*  background-color: rgba(33, 33, 33, 0.29) !important;*/
/*}*/
</style>

<template>
  <div class="text-center">
    <v-overlay :value="$store.state.page_loader" absolute opacity="0.3" z-index="4">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>