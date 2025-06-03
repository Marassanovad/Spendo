<template>
  <div class="language-switcher" style="display: flex; justify-content: center; gap: 10px; align-items: center">
    <n-text>Ру</n-text>
    <n-switch
        v-model:value="currentLang"
        :checked-value="'en'"
        :unchecked-value="'ru'"
        @update:value="switchLanguage"
    >
    </n-switch>
    <n-text>En</n-text>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { locale } = useI18n()
const currentLang = ref(locale.value)

const switchLanguage = (lang: string) => {
  locale.value = lang
  console.log(locale.value)
}
</script>
