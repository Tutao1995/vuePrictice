<template>
  <div class="wrapper">
    <div class="text">useModel 🍇🍇🍇🍓🍓🍓</div>
    <Test-Form v-model="formObj" />
  </div>
</template>

<script setup lang="ts">
import TestForm from './components/TestForm.vue'
import { FormType } from './types';
import { ref } from 'vue'
const formObj = ref<FormType>({
  input: '',
  select: 'Option1'
})
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
