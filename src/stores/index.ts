import { defineStore } from 'pinia'
import { authorityType } from '@/assets/authority'


interface stateInterface {
    isLogin: boolean,
    authority: authorityType
}

type stateType = () => stateInterface


export const useMainStore = defineStore({
    id: 'main',
    state: function (): stateInterface {
        return {
            isLogin: false,
            authority: 'common'
        }
    },
    actions: {
        async changeLoginState(value: boolean) {
            this.isLogin = value
        },
    },
})
