import { defineStore } from 'pinia'

export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        isLogin: false
    }),
    getters: {
        nameLength: (state) => state,
    },
    actions: {
        async changeState(value: boolean) {
            this.isLogin = value
        },
    },
})
