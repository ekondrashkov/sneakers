import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(autoAnimatePlugin).use(router).mount('#app')
