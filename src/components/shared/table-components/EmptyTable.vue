<style lang="scss" scoped>
.empty-text {
  font-size: 16px;
  line-height: 15px;
  letter-spacing: 0.015em;
  color: #64646470;
}
</style>

<template>
  <div class="py-80">
    <!--    <img alt="img" class="mb-3" src="@/assets/images/table-assets/empty.png" width="150px">-->
    <img alt="img" class="mb-0" src="@/assets/images/table-assets/user-empty.png"
         width="350px">

    <p class="empty-text mt-n5 mb-8">
      {{ message }}
    </p>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    message: {
      type: String,
      default: "No data found",
    },
  },
}
</script>
s