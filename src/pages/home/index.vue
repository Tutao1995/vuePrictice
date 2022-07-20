<template>
  <div :style="style" class="home-wrapper">
    widthPixel: {{ widthPixel }} ; heightPixel: {{ heightPixel }}
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useWindowSize from '@/hooks/useWindowResize'
const { width, height, widthPixel, heightPixel } = useWindowSize()
const style = reactive({
  width: widthPixel,
  height: heightPixel,
})
</script>

<style lang="scss" scoped>
.home-wrapper {
  background: #eee;
}
</style>
