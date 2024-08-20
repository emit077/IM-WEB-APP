<template>
  <div>
    <div
      class="pb-7"
      :class="{
        'px-1 mt-5': $vuetify.breakpoint.smAndDown,
        'pt-4 px-1': $vuetify.breakpoint.mdAndUp,
      }"
    >
      <router-view></router-view>
    </div>
    <!-- full screen page loader -->
    <PageLoader></PageLoader>
  </div>
</template>

<script type="text/javascript">
export default {
  components: {
    PageLoader: () => import("@/components/shared/PageLoader"),
  },
};
</script>
