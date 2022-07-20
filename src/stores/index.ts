import { defineStore, createPinia } from 'pinia'
import { authorityType } from '@/assets/js/authority'
import piniaPluginPreset from 'pinia-plugin-persist'
import piniaPersistConfig from "@/config/piniaPluginPreset/index";


interface stateInterface {
  isLogin: boolean,
  authority: authorityType,
  title: string,
  expand: boolean
}
export const useMainStore = defineStore({
  id: 'main',
  state: function (): stateInterface {
    return {
      isLogin: false,
      authority: 'common',
      title: '',
      expand: true
    }
  },
  actions: {
    async changeLoginState(value: boolean) {
      this.isLogin = value
    },
    async changeTitleState(value: string) {
      this.title = value
    },
    async expandToggle() {
      this.expand = !this.expand
    }
  },
  // store 持续化  避免刷新内容清空
  persist: piniaPersistConfig("main")
})

const pinia = createPinia();
pinia.use(piniaPluginPreset);

export default pinia;

