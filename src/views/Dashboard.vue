<script setup lang="ts">
import SummaryCards from '../components/Dashboard/SummaryCards.vue'
import ChartSwitcher from '../components/Dashboard/ChartSwitcher.vue'
import ChartView from '../components/Dashboard/ChartView.vue'
import ViewModeSwitcher from "@/components/Dashboard/ViewModeSwitcher.vue";
import { useDashboardStore } from '@/stores/useDashboardStore'

const dashboard = useDashboardStore()
</script>

<template>
  <div class="dashboard-wrapper">
    <SummaryCards
        :income="dashboard.totalIncome"
        :expense="dashboard.totalExpense"
        :balance="dashboard.balance"
    />
    <ViewModeSwitcher :modelValue="dashboard.viewMode" @update:modelValue="dashboard.viewMode = $event"/>
    <ChartSwitcher v-model:type="dashboard.chartType" />
    <ChartView :type="dashboard.chartType" :data="dashboard.currentChartData" />
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

