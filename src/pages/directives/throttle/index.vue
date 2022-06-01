<template>
    <div class="wrapper">
        <div class="text">节流指令 🍇🍇🍇🍓🍓🍓</div>
        <el-button v-throttle="clickHandle">节流元素</el-button>
        <div>{{ count }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const clickHandle = () => {
    count.value++
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
