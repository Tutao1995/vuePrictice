import { Ref, onMounted, onUnmounted } from "vue"
export default function useContextMenu(refDom: Ref, left: Ref<number>, top: Ref<number>, isShow: Ref<boolean>) {
  const handler = (e: MouseEvent) => {
    isShow.value = false
    e.stopPropagation();
    e.preventDefault();
    setTimeout(() => {
      const { clientX, clientY } = e;
      console.log(clientX, clientY)
      left.value = clientX
      top.value = clientY
      isShow.value = true
    }, 50);
  }
  const hideHandler = () => {
    isShow.value = false
  }
  onMounted(() => {
    refDom.value.addEventListener('contextmenu', handler, true)
    document.addEventListener('click', hideHandler)
  })
  onUnmounted(() => {
    refDom.value.removeEventListener('contextmenu', handler, true)
    document.removeEventListener('click', hideHandler)
  })
}