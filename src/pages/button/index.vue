<template>
    <div>{{ count }}</div>
    <el-button @click="add">+</el-button>
    <el-button @click="cut">-</el-button>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const count = ref<number>(0)

const add = () => {
    count.value++
}

const cut = () => {
    count.value--
}
</script>

<style lang="scss" scoped></style>
