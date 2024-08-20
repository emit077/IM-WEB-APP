<template>
  <v-app class="app">
    <!--    <div class="large-screen">-->
    <Navbar />
    <Drawer />
    <!--    </div>-->
    <v-main app class="ml-0 surface">
      <Body />
    </v-main>
    <Footer />
    <Snakebar></Snakebar>
  </v-app>
</template>
<script>
import Footer from "./Footer.vue";

export default {
  components: {
    Navbar: () => import("./Navbar.vue"),
    Drawer: () => import("./Drawer.vue"),
    Body: () => import("./Body.vue"),
    Footer: () => import("./Footer.vue"),
    Snakebar: () => import("@/components/shared/Snakebar"),
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      this.$store.state.is_mobile = window.innerWidth < 600;
      // this.$store.state.drawer.drawer = window.innerWidth > 600
    },
  },
  beforeDestroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.onResize, { passive: true });
    }
  },
};
</script>
