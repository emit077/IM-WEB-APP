<style lang="scss" scoped>
.student-card {
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
    <div class="student-card border-r-30 elevation-2">

    </div>
    <div class="card-footer"></div>
  </div>
</template>

<script>
export default {
  props: ["student_basic_data", 'evening_time_slots',
    'morning_time_slots', 'afternoon_time_slots'],
  data() {
    return {}
  },
  methods: {}
}
</script>