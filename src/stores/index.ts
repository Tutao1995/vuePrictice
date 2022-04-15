import { defineStore } from 'pinia'

export const useMainStore = defineStore({
    id: 'main',
    state: () =>({
      name: '超级管理员'
    }),
    getters:{
        nameLength: (state) => state.name.length,
    },
    actions: {
        async insertPost(){
            this.name = Math.round(100 * Math.random())+''
        }
    }
})