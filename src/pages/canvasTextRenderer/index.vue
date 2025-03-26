<template>
  <div class="wrapper">
    <div>
      <textarea
        ref="textRef"
        @change="onRender"
        v-model="text"
        style="width: 300px; height: 120px;"
        placeholder="请输入你需要渲染的内容"
      />
      {{ currentPage }}
      <div>
        <div ref="canvasRef"></div>
        <button type="button" @click="onRender">
          渲染内容
        </button>
        <button type="button" @click="download">
          下载图片
        </button>
        <button type="button" @click="downloadAll">
          下载所有图片
        </button>
        <button type="button" @click="prevPage">
          上一页
        </button>
        <button type="button" @click="nextPage">
          下一页
        </button>
      </div>
      <br />
      <div ref={divRef}></div>
    </div>

  </div>
      
</template>

<script setup lang="ts">
import CanvasTextRenderer from './utils/canvasTextRenderer'

const text = ref('')

const canvasRef = ref<HTMLElement>()

let renderer: CanvasTextRenderer

onMounted(() => {
  renderer = new CanvasTextRenderer({
    dom: canvasRef.value,
    options: {
      width: 300,
      height: 120,
    }
  })
})

const currentPage = computed(() => {
  console.log(renderer?.currentPageIndex, "value--->>>")
  return renderer?.currentPageIndex.value  ? renderer?.currentPageIndex.value + 1 : 1
})

const onRender = () => {
  renderer.render(text.value)
}
const download = () => {
  renderer.downloadCurrentPage()
}
const downloadAll = () => {
  renderer.downloadAll()
}
const prevPage = () => {
  renderer.prev()
  console.log(renderer?.currentPageIndex.value, "value--->>>")

}
const nextPage = () => {
  renderer.next()
  console.log(renderer?.currentPageIndex.value, "value--->>>")

}


</script>

<style lang="scss" scoped>
$wrapper: wrapper;

.#{$wrapper} {
  padding: 20px
}
</style>
