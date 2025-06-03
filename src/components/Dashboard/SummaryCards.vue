<template>
  <n-grid cols="3" x-gap="16" responsive="screen" style="width: 100%">
    <n-gi>
      <n-card :title="t('dashboard.income')" size="small" hoverable @click="openModal('income')">
        <template #header-extra>
          <ArrowDownCircle style="color: #22c55e; font-size: 24px;" />
        </template>
        <div class="summary-value">{{ income || 0 }} ₸</div>
      </n-card>
    </n-gi>

    <n-gi>
      <n-card :title="t('dashboard.expense')" size="small" hoverable @click="openModal('expense')">
        <template #header-extra>
          <ArrowUpCircle style="color: #ef4444; font-size: 24px;" />
        </template>
        <div class="summary-value">{{ expense || 0 }} ₸</div>
      </n-card>
    </n-gi>

    <n-gi>
      <n-card :title="t('dashboard.balance')" size="small" hoverable @click="openModal('balance')">
        <template #header-extra>
          <Wallet style="color: #3b82f6; font-size: 24px;" />
        </template>
        <div class="summary-value">{{ balance || 0 }} ₸</div>
      </n-card>
    </n-gi>
  </n-grid>

  <!-- Модалка транзакции -->
  <n-modal v-model:show="showModal" preset="dialog" :title="modalTitle">
    <template v-if="modalType === 'balance'">
      <p style="text-align:center;">{{ t("dashboard.modal.balance")}}</p>
    </template>

    <template v-else>
      <n-form :model="form" label-placement="top">
        <n-form-item :label="t('categories.category')">
          <div style="display: flex; gap: 8px; align-items: center;">
            <n-auto-complete
                v-model:value="form.category"
                :options="filteredCategoryOptions"
                :placeholder="t('dashboard.modal.input')"
                style="flex: 1"
            />
            <n-button @click="handleOpenCategoryModal" type="primary" ghost circle>+</n-button>
          </div>
        </n-form-item>

        <n-form-item :label="t('dashboard.modal.sum')">
          <n-input-number
              v-model:value="form.amount"
              :placeholder="t('dashboard.modal.inputsum')"
              :min="0"
              :step="100"
              style="width: 100%"
          />
        </n-form-item>

        <n-form-item :label="t('dashboard.modal.type')">
          <n-radio-group v-model:value="form.type">
            <n-radio-button value="income">{{ t("dashboard.income") }}</n-radio-button>
            <n-radio-button value="expense">{{ t("dashboard.expense") }}</n-radio-button>
          </n-radio-group>
        </n-form-item>
      </n-form>

      <n-button @click="handleSubmit" type="primary" :disabled="modalType === 'balance'">
        {{ t("dashboard.modal.save") }}
      </n-button>
    </template>

  </n-modal>

  <!-- Модалка добавления категории -->
  <n-modal v-model:show="showCategoryModal" preset="dialog" :title="t('dashboard.modal.newcategory')">
    <n-form :model="newCategoryForm" label-placement="top">
      <n-form-item :label="t('dashboard.modal.newcategory')">
        <n-input v-model:value="newCategoryForm.name" :placeholder="t('dashboard.modal.example')" />
      </n-form-item>

      <n-form-item :label="t('dashboard.modal.type')">
        <n-radio-group v-model:value="newCategoryForm.type">
          <n-radio-button value="income">{{ t("dashboard.income")}}</n-radio-button>
          <n-radio-button value="expense">{{ t("dashboard.expense")}}</n-radio-button>
        </n-radio-group>
      </n-form-item>
    </n-form>

    <template #action>
      <n-button @click="handleAddCategory" type="primary">{{ t("dashboard.modal.add")}}</n-button>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import {
  NGrid, NGi, NCard, NModal,
  NForm, NFormItem, NInput, NInputNumber,
  NButton, NRadioGroup, NRadioButton, NAutoComplete
} from 'naive-ui'
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useTransactionsStore } from '@/stores/useTransactionsStore'
import { useCategoriesStore } from '@/stores/useCategoriesStore'
import {useI18n} from "vue-i18n";

defineProps<{
  income: number
  expense: number
  balance: number
}>()

const txStore = useTransactionsStore()
const categoryStore = useCategoriesStore()
const { t } = useI18n()

const showModal = ref(false)
const showCategoryModal = ref(false)
const modalType = ref<'income' | 'expense' | 'balance'>('income')

const form = ref({
  category: '',
  amount: null as number | null,
  type: 'income' as 'income' | 'expense'
})

const newCategoryForm = ref({
  name: '',
  type: 'income' as 'income' | 'expense'
})

// Автоматическая фильтрация категорий по вводу и типу
const filteredCategoryOptions = computed(() => {
  const query = form.value.category.toLowerCase()
  return categoryStore
      .getCategoriesByType(form.value.type)
      .filter(c => c.name.toLowerCase().includes(query))
      .map(c => ({
        label: c.name,
        value: c.name
      }))
})

const modalTitle = computed(() => {
  switch (modalType.value) {
    case 'income': return t('dashboard.modal.incomeTitle')
    case 'expense': return t('dashboard.modal.expenseTitle')
    case 'balance': return t('dashboard.modal.balanceTitle')
  }
})

const openModal = (type: 'income' | 'expense' | 'balance') => {
  modalType.value = type
  form.value.type = type === 'balance' ? 'income' : type
  form.value.amount = null
  form.value.category = ''
  newCategoryForm.value.type = form.value.type
  showModal.value = true
}

const handleOpenCategoryModal = () => {
  newCategoryForm.value.type = form.value.type
  newCategoryForm.value.name = ''
  showCategoryModal.value = true
}

const handleSubmit = () => {
  const { category, amount, type } = form.value
  if (!category || amount === null) return

  const categoryExists = categoryStore
      .getCategoriesByType(type)
      .some(c => c.name.toLowerCase() === category.trim().toLowerCase())

  if (!categoryExists) {
    categoryStore.addCategory({
      id: Date.now(),
      name: category.trim(),
      type
    })
  }

  txStore.addTransaction({
    id: Date.now(),
    type,
    category: category.trim(),
    amount,
    date: new Date().toISOString()
  })

  showModal.value = false
}

const handleAddCategory = () => {
  const name = newCategoryForm.value.name.trim()
  if (!name) return

  categoryStore.addCategory({
    id: Date.now(),
    name,
    type: newCategoryForm.value.type
  })

  form.value.category = name
  showCategoryModal.value = false
}
</script>

<style scoped>
.summary-value {
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
  margin-top: 1rem;
  user-select: none;
}

.n-card {
  cursor: pointer;
}
</style>
