<template>
  <v-app class="app">
    <!--    <div class="large-screen">-->
    <Navbar/>
    <Drawer/>
    <!--    </div>-->
    <v-main app class="ml-2">
      <Body/>
    </v-main>
    <Snakebar></Snakebar>
  </v-app>
</template>
<script>


export default {
  components: {
    Navbar: () => import('./Navbar.vue'),
    Drawer: () => import('./Drawer.vue'),
    Body: () => import('./Body.vue'),
    Snakebar: () => import('@/components/shared/Snakebar'),

  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize, {passive: true})
  },
  methods: {
    onResize() {
      this.$store.state.is_mobile = window.innerWidth < 600
      // this.$store.state.drawer.drawer = window.innerWidth > 600
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, {passive: true})
    }
  }
}
</script>