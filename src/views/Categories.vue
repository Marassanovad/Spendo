<template>
  <div class="category-wrapper">
    <n-data-table
        :columns="columns"
        :data="transactions"
        :row-key="row => row.id"
        pagination
        :page-size="5"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { NDataTable, NButton, NPopconfirm } from 'naive-ui'
import { useTransactionsStore } from '@/stores/useTransactionsStore'
import { Trash2 } from 'lucide-vue-next'
import {useI18n} from "vue-i18n";

const {t} = useI18n()
const transactionsStore = useTransactionsStore()
const transactions = computed(() => transactionsStore.transactions)

const handleDelete = (id: number) => {
  transactionsStore.removeTransaction(id)
}

const columns = computed(() => [
  {
    title: t("categories.type"),
    key: 'type',
    filterOptions: [
      { label: t("dashboard.income"), value: 'income' },
      { label: t("dashboard.expense"), value: 'expense' }
    ],
    filter(value, row: Transaction) {
      return row.type === value
    },
    render(row: Transaction) {
      return row.type === 'income' ? t("dashboard.income") : t("dashboard.expense")
    }
  },
  {
    title: t("categories.category"),
    key: 'category',
    filterOptions: Array.from(new Set(transactions.value.map(tx => tx.category)))
        .map(cat => ({ label: cat, value: cat })),
    filter(value, row: Transaction) {
      return row.category === value
    }
  },
  {
    title: t("categories.amount"),
    key: 'amount',
    sorter: 'default',
    render(row: Transaction) {
      const sign = row.type === 'income' ? '+' : '-'
      const color = row.type === 'income' ? '#22c55e' : '#ef4444'
      return h('span', { style: { color, fontWeight: 'bold' } }, `${sign}${row.amount} ₸`)
    }
  },
  {
    title: t("categories.date"),
    key: 'date',
    filterOptions: Array.from(new Set(transactions.value.map(tx =>
        new Date(tx.date).toLocaleDateString('ru-RU')
    ))).map(date => ({ label: date, value: date })),
    filter(value, row: Transaction) {
      return new Date(row.date).toLocaleDateString('ru-RU') === value
    },
    render(row: Transaction) {
      return new Date(row.date).toLocaleDateString('ru-RU')
    }
  },
  {
    title: '',
    key: 'actions',
    width: 60,
    render(row: Transaction) {
      return h(
          NPopconfirm,
          {
            onPositiveClick: () => handleDelete(row.id),
            positiveText: t("categories.popup.delete"),
            negativeText: t("categories.popup.cancel"),
            style: {
              padding: '16px',
              fontSize: '16px',
              maxWidth: '300px'
            },
          },
          {
            trigger: () =>
                h(
                    NButton,
                    {
                      type: 'error',
                      size: 'small',
                      quaternary: true,
                      circle: true
                    },
                    {
                      icon: () => h(Trash2, { size: 16 })
                    }
                ),
            default: () => t("categories.popup.text")
          }
      )
    }
  }
]
)
</script>

<style>
.category-wrapper {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
