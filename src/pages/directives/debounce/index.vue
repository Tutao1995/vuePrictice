<template>
  <div class="wrapper">
    <p class="text">防抖指令 🍇🍇🍇🍓🍓🍓</p>
    <el-button v-debounce="clickHandle">防抖元素</el-button>
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
