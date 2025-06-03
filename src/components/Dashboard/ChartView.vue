<template>
  <div class="chart-container">
    <component
        :is="chartComponent"
        :data="data"
        :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import { defineProps, computed } from 'vue'
import { Pie, Bar, Line } from 'vue-chartjs'

import type { ChartData, ChartOptions } from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const props = defineProps<{
  type: 'pie' | 'bar' | 'line'
  data: ChartData
}>()

const chartComponent = computed(() => {
  switch (props.type) {
    case 'bar':
      return Bar
    case 'line':
      return Line
    case 'pie':
      return Pie
    default:
      return Pie
  }
})

const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: false
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
  padding: 1rem;
}
</style>
