<template>
  <div class="wrapper">
    <p>{{ showValue }}</p>
    <Context-Menu :options="options" :left="pageLeft" :top="pageTop" :isShow="isShow" @itemClick="itemClick" />
    <div class="item-1 test-item" ref="item1"></div>
    <div class="item-2 test-item" ref="item2"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useContextMenu from '@/hooks/useContextMenu'
import ContextMenu from './components/ContextMenu.vue';
import { optionItemType } from './types'


const options = [
  { label: 'options-1', id: 'option-1' },
  { label: 'options-2', id: 'option-2' },
  { label: 'options-3', id: 'option-3' },
  { label: 'options-4', id: 'option-4' },
  { label: 'options-5', id: 'option-5' }
]
const pageLeft = ref<number>(0)
const pageTop = ref<number>(0)
const isShow = ref<boolean>(false)
const item1 = ref(null)
const item2 = ref(null)

useContextMenu(item1, pageLeft, pageTop, isShow)


const showValue = ref<string>('')
const itemClick = (item: optionItemType) => {
  showValue.value = item.label
  isShow.value = false
}
</script>

<style scoped>
.wrapper {
  display: flex;
}

.test-item {
  width: 500px;
  height: 600px;
}

.item-1 {
  background: red;
}

.item-2 {
  background: blanchedalmond;
  height: 800px;
}
</style>