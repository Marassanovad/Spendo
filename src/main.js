import './assets/main.css'
import piniaPersistedstate from 'pinia-plugin-persistedstate'
import {createApp} from 'vue'
import {createPinia} from "pinia";
import {createI18n} from "vue-i18n";
import router from "@/router/index.js";
import naive from "naive-ui";
import App from './App.vue'
import en from './locales/en.json'
import ru from './locales/ru.json'

const pinia = createPinia()
const app = createApp(App)
const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'en',
    messages: {
        en,
        ru
    }
})


pinia.use(piniaPersistedstate)
app.use(pinia)
app.use(i18n)
app.use(router)
app.use(naive)

app.mount('#app')
