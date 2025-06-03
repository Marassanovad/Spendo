<template>
  <div class="layout-container">
    <n-layout-header style="padding: 24px; display: flex; align-items: center">
      <n-menu
          style="font-size: 16px"
          :options="menuOptions"
          mode="horizontal"
          :value="selectedKey"
          @update:value="handleMenuClick"
      />
      <LanguageSwitcher />
    </n-layout-header>

    <n-layout-content style="flex: 1; padding: 24px;">
      <router-view />
    </n-layout-content>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import {
  NLayoutHeader,
  NLayoutContent,
  NMenu,
  type MenuOption
} from 'naive-ui'

import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Footer from "@/components/Footer.vue";
import {useI18n} from "vue-i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const menuOptions = computed<MenuOption[]>(() => [
  { label: t('navbar.main'), key: '/' },
  { label: t('navbar.categories'), key: '/categories' },
  { label: t('navbar.about'), key: '/about' }
])

const selectedKey = computed(() => route.path)

function handleMenuClick(key: string) {
  router.push(key)
}
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  min-width: 100vw;
}
</style>
