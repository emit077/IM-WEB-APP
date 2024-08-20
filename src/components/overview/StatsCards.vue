<style lang="scss" scoped>
.bubble-shape {
  position: relative;
  background-color: rgb(var(--primary_rgb), 0.8);

  &:before {
    content: "";
    position: absolute;
    width: 250px;
    height: 260px;
    top: -180px;
    right: -115px;
    background: rgba(255, 255, 255, 0.06);
    transform: rotate(30deg);
  }

  &:after {
    content: "";
    position: absolute;
    width: 210px;
    height: 210px;
    top: 85px;
    right: 5px;
    background: rgb(255, 255, 255, 0.04);
    transform: rotate(30deg);
  }
}
</style>
<template>
  <!-- <div class="elevation-5 overview-stats-card"> -->
  <v-card
    class="pa-4 pb-6 overflow-hidden bubble-shape bubble-secondary-shape"
    flat
    outlined
    color="primary"
  >
    <v-btn fab outlined color="white" small class="float-right">
      <v-icon>{{ data.icon }}</v-icon>
    </v-btn>
    <h2 class="font-weight-medium white--text">
      {{ data.title }}
    </h2>

    <div class="mt-5 text-start">
      <h1 class="white--text d-inline">
        {{ data.count.toLocaleString("en-IN") }}
      </h1>
      <span v-if="data.change" class="success--text fw-bold"> + {{ data.change }}</span>
    </div>
  </v-card>
</template>
<script type="text/javascript">
export default {
  props: ["data"],
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
