import type { Placement, Strategy, Middleware, ComputePositionReturn } from '@floating-ui/vue'
import  { computePosition } from '@floating-ui/vue'
import { ref, ToRefs, Ref, watchEffect, onUnmounted, onMounted } from 'vue'

type UseFloatingProps = ToRefs<{
  middleware: Array<Middleware>
  placement: Placement
  strategy: Strategy
}>
const useFloating = ({ middleware, placement, strategy }: UseFloatingProps, referenceRef: Ref<HTMLElement | null>) => {
  const contentRef = ref()
  // popper位置信息
  const x = ref<number>()
  const y = ref<number>()
  // floating-ui 中间件数据
  const middlewareData = ref<ComputePositionReturn['middlewareData']>({})
  const states = {
    x,
    y,
    placement,
    strategy,
    middlewareData,
  } as const
  async function update() {
    if (!referenceRef.value || !contentRef.value) return
    // floating-ui 的 computePosition计算位置
    const data: any = await computePosition(referenceRef.value, contentRef.value, {
      middleware: unref(middleware),
      placement: unref(placement),
      strategy: unref(strategy)
    })
    console.log('scroll')
    Object.keys(states).forEach(key => {
      (states as any)[key].value = data[key]
    })
  }

  function parentBindScrollEvent(el:HTMLElement) {
    if(!el) return
    while(el.parentNode) {
      el.parentNode.addEventListener('scroll', update);
      el = el.parentNode as HTMLElement
    }
  }

  onMounted(() => {
    if(referenceRef.value) {
      parentBindScrollEvent(referenceRef.value)
    }
    watchEffect(() => {
      update()
    })
    document.addEventListener('scroll', update)
  })

  onUnmounted(() => {
    document.removeEventListener('scroll', update)
  })
  return {
    ...states,
    update,
    x,
    y,
    referenceRef,
    contentRef,
  }
}

export default useFloating
