<style lang="scss">
@import url("assets/css/vutify.scss");
@import url("assets/css/font.scss");
@import url("assets/css/style.scss");
</style>
<template>
  <div id="app">
    <router-view />
    <!-- @detected-condition fires when the connectivity status of the device changes -->
    <offline @detected-condition="handleConnectivityChange"> </offline>
    <OfflineNotification></OfflineNotification>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import offline from "v-offline";

export default {
  name: "App",
  components: {
    offline,
    OfflineNotification: () => import("./components/shared/OfflineNotification"),
  },
  data: () => ({
    //
  }),
  created() {
    /* import dynamic css */
    import(`./assets/css/variables-${this.$project.NAME}.scss`);
    /* import end */

    /* setting the favicon*/
    // document.querySelector(
    //   "link[rel~='icon']"
    // ).outerHTML = `<link rel="icon" href="./${this.$project.NAME}-fevicon.png">`;
  },
  methods: {
    ...mapActions([
      "setIsOffline", // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),
    handleConnectivityChange(status) {
      this.is_offline = !status;
      this.setIsOffline(!status);
    },
  },
};
</script>
