<template>
  <div :class="n('-item')">
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '../../utils/index'


const { n } = createNamespace('tt-select')

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})

</script>

<style scoped>

</style>