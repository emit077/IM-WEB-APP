<template>
  <div>
    <canvas :id="id" style="max-height: 350px"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  props: ["id"],
  name: "Chart",
  data() {
    return {
      chart: null,
    };
  },
  created() {
    // this.drawChartHandler(this.id)
  },
  methods: {
    drawChartHandler(id, labels, values, legend = false, legend_position = "top") {
      let color = "rgb(4, 35, 144,1)";
      let bg_color = "rgb(4, 35, 144,1)";
      let chart_data = {
        type: "bar",
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
              pointHoverRadius: 5,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
              position: legend_position || "bottom",
            },
          },
          scales: {
            x: {
              grid: {
                offset: true,
                drawOnChartArea: false,
              },
              ticks: {
                beginAtZero: true,
                // padding: 25,
              },
              beginAtZero: true,
            },
            y: {
              grid: {
                // offset: true,
              },
              border: {
                dash: [3, 5],
              },
              ticks: {
                beginAtZero: true,
              },
              beginAtZero: true,
            },
          },
        },
      };
      const ctx = document.getElementById(id);
      this.chart = new Chart(ctx, chart_data);
    },
  },
};
</script>
