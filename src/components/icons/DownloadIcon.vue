<style lang="scss" scoped>
</style>
<template>
  <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 11V14H2V11H0V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V11H14ZM13 7L11.59 5.59L9 8.17V0H7V8.17L4.41 5.59L3 7L8 12L13 7Z"
      :fill="color" />
  </svg>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "#757575",
    },
    size: {
      type: Number,
      default: 16,
    }
  },
}
</script>
