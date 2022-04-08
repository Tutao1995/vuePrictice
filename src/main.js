import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@mock';
import routers from '@routers';

createApp(App).use(routers).use(ElementPlus).mount('#app');
