<template>
  <n-space vertical align="center" class="about-page">
    <n-h1>{{ t('about.greeting') }}</n-h1>

    <n-space vertical class="text-section">
      <n-p>
        {{ t('about.name') }}
      </n-p>
      <n-p>
        {{ t('about.passion') }}
      </n-p>
      <n-p>{{ t('about.experience') }}</n-p>
    </n-space>

    <n-space vertical align="center" class="contact-section">
      <n-h2>{{ t('about.contacts') }}</n-h2>
      <n-space justify="center" size="large">
        <a href="https://github.com/Marassanovad" target="_blank" class="icon-link">
          <Github :size="28" />
        </a>
        <a href="https://linkedin.com/in/your-linkedin" target="_blank" class="icon-link">
          <Linkedin :size="28" />
        </a>
        <a href="mailto:marassanovad@gmail.com" class="icon-link">
          <Mail :size="28" />
        </a>
      </n-space>
    </n-space>

    <n-space vertical class="skills-section">
      <n-h2>{{ t('about.skills') }}</n-h2>
      <n-ul>
        <n-li>Languages: JavaScript, Python, Java, C#</n-li>
        <n-li>Frameworks: React, Vue.js</n-li>
        <n-li>Tools: Git, MySQL, HTML/CSS, Tailwind, Bootstrap</n-li>
        <n-li>OS: MacOS (basic knowledge of Linux)</n-li>
        <n-li>Languages: Russian — native, English — B2</n-li>
      </n-ul>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Github, Linkedin, Mail } from 'lucide-vue-next'
import {
  NSpace,
  NH1,
  NH2,
  NP,
  NUl,
  NLi
} from 'naive-ui'

const { t } = useI18n()
</script>

<style scoped>
.about-page {
  padding: 2rem;
  max-width: 768px;
  margin: 0 auto;
  color: white;
}

.text-section p,
.skills-section li {
  font-size: 16px;
}

.icon-link {
  color: rgba(0, 0, 0, 0.69);
  transition: color 0.3s;
}

.icon-link:hover {
  color: #d4d4d8; /* zinc-400 */
}
</style>
