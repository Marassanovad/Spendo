import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useTransactionsStore } from './useTransactionsStore'
import type { ChartData } from 'chart.js'
import {useI18n} from "vue-i18n";

export const useDashboardStore = defineStore('dashboard', () => {
    const chartType = ref<'pie' | 'bar' | 'line'>('pie')
    const viewMode = ref<'income' | 'expense' | 'all'>('expense')
    const {t} = useI18n()

    const transactionsStore = useTransactionsStore()

    // 👇 Группировка по категориям
    const groupByCategory = (type: 'income' | 'expense') => {
        const grouped: Record<string, number> = {}

        transactionsStore.transactions
            .filter(tx => tx.type === type)
            .forEach(tx => {
                if (!grouped[tx.category]) {
                    grouped[tx.category] = 0
                }
                grouped[tx.category] += tx.amount
            })

        return grouped
    }

    // 👇 Расходы по категориям
    const expenseChartData = computed<ChartData>(() => {
        const grouped = groupByCategory('expense')
        return {
            labels: Object.keys(grouped),
            datasets: [
                {
                    label: t("dashboard.expense"),
                    data: Object.values(grouped),
                    backgroundColor: ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#a78bfa']
                }
            ]
        }
    })

    // 👇 Доходы по категориям
    const incomeChartData = computed<ChartData>(() => {
        const grouped = groupByCategory('income')
        return {
            labels: Object.keys(grouped),
            datasets: [
                {
                    label: t("dashboard.income"),
                    data: Object.values(grouped),
                    backgroundColor: ['#34d399', '#60a5fa', '#a78bfa']
                }
            ]
        }
    })

    // 👇 Комбинированные графики
    const combinedChartData = computed<ChartData>(() => {
        return {
            labels: [t("dashboard.income"), t("dashboard.expense")],
            datasets: [
                {
                    label: t("categories.amount"),
                    data: [totalIncome.value, totalExpense.value],
                    backgroundColor: ['#34d399', '#f87171']
                }
            ]
        }
    })

    // 👇 Суммы
    const totalIncome = computed(() =>
        transactionsStore.transactions
            .filter(tx => tx.type === 'income')
            .reduce((sum, tx) => sum + tx.amount, 0)
    )

    const totalExpense = computed(() =>
        transactionsStore.transactions
            .filter(tx => tx.type === 'expense')
            .reduce((sum, tx) => sum + tx.amount, 0)
    )

    const balance = computed(() => totalIncome.value - totalExpense.value)

    // 👇 Активные данные под текущий режим
    const currentChartData = computed<ChartData>(() => {
        if (viewMode.value === 'income') return incomeChartData.value
        if (viewMode.value === 'expense') return expenseChartData.value
        return combinedChartData.value
    })

    return {
        chartType,
        viewMode,
        currentChartData,
        totalIncome,
        totalExpense,
        balance
    }
})
