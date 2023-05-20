<template>
    <div class="source_wrapper">
        <div class="source_header">
            computed
        </div>
        <CodeEditor :code="code" />
    </div>
</template>

<script lang="ts" setup>
import CodeEditor from '@/components/CodeEditor.vue'
import computedSource from './source/computed';
import effectSource from './source/computed';
import { reactive, computed } from 'vue'
const list = reactive(['computedSource', 'effectSource']);


const computedList = computed(() => {
    return list.map(item => {
        return {
            title: item,
            code: 
        }
    })
})




</script>

<style lang="scss" scoped>
.source_wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    .source_header {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
    }
}
</style>