import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import { createPinia } from 'pinia'
import './mock/index.ts'
import Particles from "particles.vue3"
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(createPinia())
app.use(Particles)
app.mount('#app')
