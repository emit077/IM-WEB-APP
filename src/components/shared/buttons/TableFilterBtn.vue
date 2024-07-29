<style lang="scss" scoped>
.download-svg-btn {
  background: #F7F7F7;
  border: 1px solid #988F8F;
  box-sizing: border-box;
  border-radius: 20px;
  font-style: normal;
  font-weight: bold !important;
  font-size: 14px !important;
  line-height: 16px;
  //height: 40px !important;
  margin-top: 2px;

  /*display: flex;*/
  align-items: center;
  text-align: center;
  letter-spacing: 0.04em;
  color: #988F8F !important;
}

.download-svg-btn img {
  margin-right: 4px;
}
</style>
<template>
  <div>
    <v-badge
        bordered
        color="primary"
        :content="filter_count"
        overlap
        v-if="filter_count>0"
    >
      <v-btn rounded depressed outlined class="download-svg-btn">
        <v-icon>mdi-filter</v-icon>
        {{ $lang.FILTER }}
      </v-btn>
    </v-badge>


    <v-btn v-if="filter_count<1" rounded depressed outlined class="download-svg-btn" width="100">
      <v-icon>mdi-filter</v-icon>
      {{ $lang.FILTER }}
    </v-btn>


  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    filter_count: {
      default: 0,
    }
  }
}


</script>