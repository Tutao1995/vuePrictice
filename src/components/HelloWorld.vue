<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
    <div class="wrapper">我是div</div>
</template>

<style lang="scss" scoped>
.wrapper {
    color: $red;
}
</style>
