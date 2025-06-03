import { defineStore } from 'pinia'
import { ref } from 'vue'

type Category = {
    id: number
    name: string
    type: 'income' | 'expense'
}

export const useCategoriesStore = defineStore('categories', () => {
    const categories = ref<Category[]>([
        { id: 1, name: 'Продукты', type: 'expense' },
        { id: 2, name: 'Транспорт', type: 'expense' },
        { id: 3, name: 'Зарплата', type: 'income' }
    ])

    function addCategory(category: Category) {
        categories.value.push(category)
    }

    function removeCategory(id: number) {
        categories.value = categories.value.filter(c => c.id !== id)
    }

    function getCategoriesByType(type: 'income' | 'expense') {
        return categories.value.filter(c => c.type === type)
    }

    return {
        categories,
        addCategory,
        removeCategory,
        getCategoriesByType
    }
}, {
    persist: true
})
