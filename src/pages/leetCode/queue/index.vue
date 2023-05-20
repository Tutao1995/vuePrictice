<template>
    <div>
        第一题
    </div>
    <CodeEditor :code="code" />
</template>

<script lang="ts" setup>
import CodeEditor from '@/components/CodeEditor.vue'
import { ref } from 'vue'
const code = ref<string>('test')

</script>

<style lang="scss" scoped></style>