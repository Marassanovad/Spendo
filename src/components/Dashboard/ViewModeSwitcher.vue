<template>
  <n-radio-group
      :value="modelValue"
      @update:value="val => $emit('update:modelValue', val)"
      name="view-mode"
  >
    <n-radio-button value="income">{{ t("dashboard.income")}}</n-radio-button>
    <n-radio-button value="expense">{{ t("dashboard.expense")}}</n-radio-button>
    <n-radio-button value="all">{{ t("dashboard.all")}}</n-radio-button>
  </n-radio-group>
</template>

<script setup lang="ts">

import {useI18n} from "vue-i18n";

const { t } = useI18n()

defineProps<{
  modelValue: 'income' | 'expense' | 'all'
}>()

defineEmits<{
  (e: 'update:modelValue', value: 'income' | 'expense' | 'all'): void
}>()
</script>
