import {
    computePosition,
    Middleware,
    Placement,
    Strategy,
    ComputePositionReturn,
} from '@floating-ui/vue'
import { onMounted, ref, ToRefs, unref, watchEffect, watch } from 'vue'
type UseFloatingProps = ToRefs<{
    middleware: Array<Middleware>
    placement: Placement
    strategy: Strategy
}>

export const useFloating = ({ middleware, placement, strategy }: UseFloatingProps) => {
    const referenceRef = ref()
    const contentRef = ref()
    const x = ref<number>(0)
    const y = ref<number>(0)
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
        const data = await computePosition(referenceRef.value, contentRef.value, {
            placement: unref(placement),
            middleware: unref(middleware),
            strategy: unref(strategy),
        })

        Object.keys(states).forEach((key) => {
            // @ts-ignore
            states[key].value = data[key]
        })
    }

    onMounted(() => {
        watchEffect(() => {
            update()
        })
        if (referenceRef.value) {
            let dom = referenceRef.value
            while (dom) {
                dom = dom.parentNode as HTMLElement
                dom && dom.addEventListener('scroll', update)
            }
        }
    })

    onUnmounted(() => {
        if (referenceRef.value) {
            let dom = referenceRef.value
            while (dom) {
                dom = dom.parentNode as HTMLElement
                dom && dom.removeEventListener('scroll', update)
            }
        }
    })

    return {
        ...states,
        x,
        y,
        update,
        referenceRef,
        contentRef,
    }
}
