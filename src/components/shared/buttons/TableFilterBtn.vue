<style lang="scss" scoped>
.download-svg-btn {
  background: rgb(var(--primary_rgb), 0.05) !important;
  box-sizing: border-box;
  color: rgb(var(--primary_rgb)) !important;
  border: solid 1px rgb(var(--primary_rgb), 0.1) !important;
}

.download-svg-btn img {
  margin-right: 4px;
}
</style>
<template>
  <span>
    <v-badge
      bordered
      color="primary"
      :content="filter_count"
      overlap
      v-if="filter_count > 0"
    >
      <v-btn outlined class="download-svg-btn">
        <v-icon>mdi-filter-variant</v-icon>
        <!-- {{ $lang.FILTER }} -->
      </v-btn>
    </v-badge>

    <v-btn
      v-else
      depressed
      class="download-svg-btn"
      height="40"
      width="40"
      style="min-height: 20px; min-width: 20px"
    >
      <v-icon size="28">mdi-filter-outline</v-icon>
    </v-btn>
  </span>
</template>

<script type="text/javascript">
export default {
  props: {
    filter_count: {
      default: 0,
    },
  },
};
</script>
