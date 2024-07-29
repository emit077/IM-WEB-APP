<style lang="scss" scoped>
.student-card {
  //min-height: 400px;
  box-shadow: 0px 4px 4px 5px rgba(0, 0, 0, 0.15);

}

.card-footer {
  height: 15px;
  width: 80%;
  margin-top: 12px;
  display: inline-block;
  background-color: #32345F;
  border-bottom-left-radius: 60px;
  border-bottom-right-radius: 60px;
}


</style>
<template>
  <div class="text-center">
    <div class="student-card border-r-30">

    </div>
  </div>
</template>

<script>
export default {
  props: ["student_basic_data"],

  data() {
    return {
      class_name: "min-height"
    }
  },
  methods: {}
}
</script>