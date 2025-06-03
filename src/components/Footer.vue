<template>
  <n-layout-footer class="footer">
    <div class="icons">
      <a
          href="https://github.com/Marassanovad"
          target="_blank"
          rel="noopener noreferrer"
          class="icon-link"
      >
        <Github />
      </a>
      <a
          href="https://t.me/marassanovad"
          target="_blank"
          rel="noopener noreferrer"
          class="icon-link"
      >
        <Send />
      </a>
      <a
          href="https://www.linkedin.com/in/darya-marassanova-058a02331/"
          target="_blank"
          rel="noopener noreferrer"
          class="icon-link"
      >
        <Linkedin />
      </a>
      <a href="mailto:marassanovad@gmail.com" class="icon-link">
        <Mail />
      </a>
    </div>
    <p class="footer-text">
      © 2025 Spendo
    </p>
  </n-layout-footer>
</template>

<script setup lang="ts">
import { NLayoutFooter } from 'naive-ui'
import { Github, Linkedin, Mail, Send } from 'lucide-vue-next'
</script>

<style scoped>
.footer {
  background-color: #373737;
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.icons {
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
}

.icon-link {
  transition: color 0.3s ease;
  color: white;
}

.icon-link:hover {
  color: #f87171; /* red-300 */
}

.footer-text {
  font-size: 0.875rem;
  color: #9ca3af; /* gray-400 */
  text-align: center;
}
</style>
