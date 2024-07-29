<template>
  <div>
    <canvas :id="id"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  props: ['id'],
  name: 'Chart',
  data() {
    return {
      chart: null,
    }
  },
  created() {
    // this.drawChartHandler(this.id)
  },
  methods: {
    drawChartHandler(id, labels, values, legend = false, legend_position = 'top') {
      let color = this.$project.NAME == this.$keys.IM ? "rgb(31, 17, 188)" : "rgb(50, 52, 95)"
      let bg_color = this.$project.NAME == this.$keys.IM ? "rgb(31, 17, 188,0.2)" : "rgb(50, 52, 95,0.2)"

      let chart_data = {
        type: "line",
        data: {
          labels: labels || [],
          datasets: [
            {
              // label: "Number of Moons",
              data: values || [],
              backgroundColor: bg_color,
              borderColor: color,
              borderWidth: 2,
              pointRadius: 2,
              pointHoverRadius: 5

            },
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25
                }
              }
            ]
          },
          legend: {
            display: legend,
            position: legend_position || 'bottom'
          }
        }
      }
      const ctx = document.getElementById(id);
      this.chart = new Chart(ctx, chart_data);
    }
  }
}
</script>