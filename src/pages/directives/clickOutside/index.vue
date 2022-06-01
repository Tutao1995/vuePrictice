<template>
    <div class="wrapper">
        <div class="text">clickOutside指令 🍇🍇🍇🍓🍓🍓</div>
        <div>点我</div>
        <div v-clickOutside="test">
            <el-button @click="show">显示元素</el-button>
            <div v-if="count">我是显示元素</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(false)

const show = () => {
    count.value = true
}
const test = () => {
    count.value = false
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
