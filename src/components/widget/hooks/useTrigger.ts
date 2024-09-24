import { ref, useSlots, computed, onMounted } from 'vue'

export default function useTrigger() {
  const triggerRef = ref()
  const visible = ref(false)
  const triggerSlot = useSlots!().default!();
  const noWrap = computed(() => triggerSlot[0].patchFlag === 0)
  const open = () => {
    visible.value = true
  }
  const close = () => {
    visible.value = false
  }

  const setTriggerRef = (el: HTMLElement | null) => {
    // nextElementSibling 忽略文本节点和注释节点
    triggerRef.value = el && el.nextElementSibling || null
  } 
  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    open();
    setTimeout(() => {
      document.addEventListener('click', close)
    })
  }
  const clickOutside = (e: MouseEvent) => {
    e.stopPropagation();
    close();
    document.removeEventListener('click', close)
  }


  onMounted(() => {
    if (!triggerRef.value) return
    triggerRef.value.addEventListener('click', onClick)
  })

  onBeforeUnmount(() => {
    triggerRef.value!.removeEventListener('click', onClick)
  })


  return {
    setTriggerRef,
    triggerRef,
    visible,
    noWrap,
    open,
    close
  }
}