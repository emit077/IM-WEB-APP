<template>
    <v-menu
      ref="date_menu"
      v-model="date_menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateFormatted"
          label="Date range"
          prepend-inner-icon="mdi-calendar"
          v-bind="attrs"
          v-on="on"
          hide-details=""
          single-line
          dense
          readonly
          outlined
        >
        <template v-slot:append>
          <v-icon v-if="dateFormatted" @click="date=null,dateFormatted=null,formatDate()"> mdi-close-circle</v-icon>
        </template>
        </v-text-field>
      </template>
      <v-date-picker v-model="date" range no-title>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="date_menu = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="$refs.date_menu.save(date), formatDate()">
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>
</template>

<script>
export default {
  data() {
    return {
      date: null,
      dateFormatted: null,
      date_menu: false,
    };
  },
  computed: {
    // computedDateFormatted() {
    //   return this.formatDate(this.date);
    // },
  },
  watch: {
    date(val) {
      //   this.dateFormatted = this.formatDate(this.date);
    },
  },
  methods: {
    formatDate() {
      let date = this.date;
      if (!date){
        this.$emit("update", null, null);
        return null;
      } 
      let s_date = date[0] > date[1] ? date[1] : date[0];
      let e_date = date[0] > date[1] ? date[0] : date[1];
      const [year, month, day] = s_date.split("-");
      let start_date = `${day}/${month}/${year}`;
      const [year2, month2, day2] = e_date.split("-");
      let end_date = `${day2}/${month2}/${year2}`;
      //   order_date
      this.date = [s_date, e_date];
      this.dateFormatted = `${start_date} - ${end_date}`;
      this.$emit("update", s_date, e_date);
    },
  },
};
</script>
