import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

type Transaction = {
    id: number
    type: 'income' | 'expense'
    category: string
    amount: number
    date: string
}

export const useTransactionsStore = defineStore('transactions', () => {
    const transactions: Ref<Transaction[]> = ref([])

    function addTransaction(tx: Transaction) {
        transactions.value.push(tx)
    }

    function removeTransaction(id: number) {
        transactions.value = transactions.value.filter(tx => tx.id !== id)
    }

    return {
        transactions,
        addTransaction,
        removeTransaction
    }
}, {
    persist: true
})
