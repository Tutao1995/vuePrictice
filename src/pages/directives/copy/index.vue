<template>
  <div class="wrapper">
    <div class="text">复制指令 🍇🍇🍇🍓🍓🍓</div>
    <el-button v-copy="count">复制元素</el-button>
    <el-input v-model="count"></el-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
