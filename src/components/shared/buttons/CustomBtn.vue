<style>
.btn-error {
  background-color: #eb5757 !important;
  .v-icon {
    color: #fff !important;
  }
}
</style>

<template>
  <v-btn
    :color="color"
    fab
    x-small
    class="elevation-0 mr-2"
    :class="'btn-' + btn_type"
    :loading="loading"
  >
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>
<script>
export default {
  props: {
    btn_type: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    loading: {
      type: Boolean,
    },
  },
  data: () => ({
    falg: true,
  }),
  methods: {
    yesHandler() {
      this.$emit("yes");
    },
  },
};
</script>
