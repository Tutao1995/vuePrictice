import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import pinia from "@/stores/index";
import './mock/index.ts'
// 登录几面粒子效果库
import Particles from "particles.vue3"
// 虽然按需引入了，但是弹框等组件  必须要引入样式才会有效
import 'element-plus/dist/index.css'
// 饿了么图标库组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入指令
import directives from '@/directives/index'

import '@/assets/iconfont/font_4696021_9nyz5nqbqbo/iconfont.js'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(pinia)
app.use(Particles)
app.use(directives)
app.mount('#app')
