<template>
    <div>我是{{ mainStore.name }}</div>
    <div>长度：{{ mainStore.nameLength }}</div>

    <button @click="updateName">修改store中的name</button>
    <button @click="updateName2">修改store中的name2</button>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/index'
const mainStore = useMainStore()
const updateName = () => {
    mainStore.$patch({
        name: '名称被修改了,nameLength也随之改变了',
    })
}
const updateName2 = () => {
    mainStore.insertPost()
}
</script>

<style scoped></style>
