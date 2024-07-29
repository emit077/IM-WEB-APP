<style lang="scss" scoped>
.card-bg {
  background-color: yellow;
  border-radius: 20px;
  margin-top: 20px;
  padding: 15px;
}
</style>
<template>
  <div
      :class="{'profile_card-mobile': $vuetify.breakpoint. smAndDown, 'profile_card mx-5': $vuetify.breakpoint. mdAndUp}"
      class="card-bg">

    <div>
      <h3 class="text-center fc-primary mb-3">Your demo class has been scheduled</h3>

      <v-simple-table style="width: 100%; background-color: transparent ">
        <tr>
          <td>Tutor Info</td>
          <td><b>{{ demo_data.tutor_name }}</b></td>
          <td>BDA info</td>
          <td><b>{{ demo_data.bda_name }}, {{ demo_data.bda_mobile }}</b></td>
        </tr>
        <tr>
          <td>Meeting Url</td>
          <td><b>{{ demo_data.meeting_url ? demo_data.meeting_url : "-" }}</b></td>
          <td>Date & time</td>
          <td><b>{{ demo_data.date }}, {{ demo_data.time }}</b></td>
        </tr>
      </v-simple-table>
    </div>

  </div>
</template>

<script>
export default {
  components: {},
  props: ["demo_data"],
  data() {
    return {}
  },
  methods: {}
}
</script>