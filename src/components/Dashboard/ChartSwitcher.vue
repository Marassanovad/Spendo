<template>
  <n-radio-group
      :value="type"
      @update:value="onUpdate"
      name="chart-type"
      size="medium"
      class="chart-switcher"
  >
    <n-radio-button value="pie">{{t("dashboard.chart.pie")}}</n-radio-button>
    <n-radio-button value="bar">{{t("dashboard.chart.bar")}}</n-radio-button>
    <n-radio-button value="line">{{t("dashboard.chart.line")}}</n-radio-button>
  </n-radio-group>
</template>

<script setup lang="ts">
import { NRadioGroup, NRadioButton } from 'naive-ui'
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const props = defineProps<{
  type: 'pie' | 'bar' | 'line'
}>()

const emit = defineEmits<{
  (e: 'update:type', value: 'pie' | 'bar' | 'line'): void
}>()

function onUpdate(value: 'pie' | 'bar' | 'line') {
  emit('update:type', value)
}
</script>

<style scoped>
.chart-switcher {
  display: flex;
  justify-content: center;
  padding: 16px;
  min-height: 50px;
}
</style>
