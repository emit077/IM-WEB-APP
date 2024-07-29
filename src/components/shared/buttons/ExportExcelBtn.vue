<style lang="scss" scoped>
.export-btn {
  border: solid 1px #988f8f;
  background-color: #f7f7f7;
  border-radius: 5px;
  padding: 10px 15px;
}
</style>
<template>
  <div class="d-inline export-btn mr-2 cursor-pointer" :title="tooltip">
    <DownloadIcon />
  </div>
</template>
<script>
export default {
  props: {
    tooltip: "Export report",
    required: false
  },
  components: {
    DownloadIcon: () => import("@/components/icons/DownloadIcon"),
  },
  data() {
    return {
    };
  },
};
</script>
