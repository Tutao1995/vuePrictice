import { Ref, onMounted, onUnmounted } from 'vue'
export default function useContextMenu(
  refDom: Ref,
  left: Ref<number>,
  top: Ref<number>,
  isShow: Ref<boolean>,
  currentRef: Ref,
  type: 'item1' | 'item2'
) {
  const handler = (e: MouseEvent) => {
    isShow.value = false
    e.stopPropagation()
    e.preventDefault()
    setTimeout(() => {
      const { clientX, clientY } = e
      left.value = clientX
      top.value = clientY
      isShow.value = true
      currentRef.value = type
    }, 50)
  }
  const hideHandler = () => {
    isShow.value = false
  }
  onMounted(() => {
    refDom.value.addEventListener('contextmenu', handler, true)
    document.addEventListener('click', hideHandler)
    document.addEventListener('scroll', hideHandler)
    let tempParent = refDom.value.parentElement
    while (tempParent) {
      tempParent.addEventListener('scroll', hideHandler)
      tempParent = tempParent.parentElement
    }
  })
  onUnmounted(() => {
    refDom.value.removeEventListener('contextmenu', handler, true)
    document.removeEventListener('click', hideHandler)
    let tempParent = refDom.value.parentElement
    while (tempParent) {
      tempParent.removeEventListener('scroll', hideHandler)
      tempParent = tempParent.parentElement
    }
  })
}
