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
        <button type="button" @click="clear">
          清空
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

const clear = () => {
  text.value = '';
  onRender()
}


</script>

<style lang="scss" scoped>
$wrapper: wrapper;

.#{$wrapper} {
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #a4b2c1;
  box-sizing: border-box;
  background: linear-gradient(45deg, #384663 5%,  #07090f 70%, #377e7a);
  textarea {
    border: none;
    outline: none; 
  }
  button {
    margin: 10px 10px 0 0;
    border: none;
    outline: none;
    min-width: 6rem;
    height: 2.5rem;
    padding: 0 1rem;
    color: #a4b2c1;
    font-weight: 700;
    background: hsl(216, 14%, 19%);
    border-radius: .6rem;
    cursor: pointer;
    transition: color .2s;
    user-select: none;
    &:hover {
      background: hsl(216, 14%, 24%);
    }
  }
}
</style>
