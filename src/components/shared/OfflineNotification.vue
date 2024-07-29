<template>
  <div class="text-center">
    <v-snackbar
        v-model="$store.state.is_offline"
        :timeout="-1"
        absolute
        multi-line
        color="rgb(222, 53, 11)"
    >
      <h3 class="pb-3">{{ $messages.OFFLINE_MSG }}</h3>
      <p class="">{{ $messages.OFFLINE_MSG_DETAILS }}</p>

    </v-snackbar>
  </div>
</template>
<script>
export default {
  data: () => ({
  }),
}
</script>