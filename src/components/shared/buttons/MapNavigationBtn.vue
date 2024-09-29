<template>
  <v-btn
    fab
    depressed
    small
    v-if="
      [$keys.ACCOUNT_SUPER_ADMIN, $keys.ACCOUNT_ADMIN].includes(
        $store.state.user.account_type
      ) &&
      lat &&
      lng
    "
    @click="startNavigation(lat, lng)"
  >
    <v-icon color="primary">mdi-navigation-variant-outline</v-icon>
  </v-btn>
</template>
<script type="text/javascript">
export default {
  props: ["lat", "lng"],
  methods: {
    startNavigation(lat, lng) {
      const url = "http://maps.google.com/maps?q=loc:" + lat + "," + lng;
      window.open(url, "_blank").focus();
    },
  },
};
</script>
