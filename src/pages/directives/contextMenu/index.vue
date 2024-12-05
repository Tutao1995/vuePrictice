<template>
    <div class="wrapper">
        <p>{{ showValue }}</p>
        <Context-Menu
            :options="currentOptions"
            :left="pageLeft"
            :top="pageTop"
            :isShow="isShow"
            @itemClick="itemClick"
        />
        <div class="item-1 test-item" ref="item1"></div>
        <div class="item-2 test-item" ref="item2"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import useContextMenu from '@/hooks/useContextMenu'
import ContextMenu from './components/ContextMenu.vue'
import { optionItemType } from './types'

const optionsMap = {
    item1: [
        { label: 'options-1', id: 'option-1' },
        { label: 'options-2', id: 'option-2' },
        { label: 'options-3', id: 'option-3' },
        { label: 'options-4', id: 'option-4' },
        { label: 'options-5', id: 'option-5' },
        { label: 'options-6', id: 'option-6' },
        { label: 'options-7', id: 'option-7' },
    ],
    item2: [
        { label: 'options-1', id: 'option-1' },
        { label: 'options-2', id: 'option-2' },
        { label: 'options-3', id: 'option-3' },
    ],
}
const currentRef = ref<'item1' | 'item2'>('item1')

const currentOptions = computed(() => {
    return optionsMap[currentRef.value]
})

const pageLeft = ref<number>(0)
const pageTop = ref<number>(0)
const isShow = ref<boolean>(false)
const item1 = ref(null)
const item2 = ref(null)

useContextMenu(item1, pageLeft, pageTop, isShow, currentRef, 'item1')
useContextMenu(item2, pageLeft, pageTop, isShow, currentRef, 'item2')

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
