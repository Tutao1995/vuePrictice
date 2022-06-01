import { onBeforeUnmount, onMounted, watchEffect } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { addUnit } from '@/utils/index'


export const useDraggable = (targetRef: Ref<HTMLElement | undefined>, dragRef: Ref<HTMLElement | undefined>, outerRef: Ref<HTMLElement | undefined>, draggable: ComputedRef<boolean>) => {
    let transform = {
        offsetX: 0,
        offsetY: 0
    }
    const onMousedown = (e: MouseEvent) => {
        const downX = e.clientX;
        const downY = e.clientY;
        const { offsetX, offsetY } = transform;
        console.log(offsetX, offsetY, "offsetX, offsetY")

        const targeRect = targetRef.value!.getBoundingClientRect();
        const targetTop = targeRect.top;
        const targetLeft = targeRect.left;
        const targetWidth = targeRect.width;
        const targetHeight = targeRect.height;

        const clientWidth = document.documentElement.clientWidth
        const clientHeight = document.documentElement.clientHeight

        const minTop = -targetTop + offsetY
        const minLeft = -targetLeft + offsetX;
        const maxTop = clientHeight - targetTop - targetHeight + offsetY
        const maxLeft = clientWidth - targetLeft - targetWidth + offsetX



        const onMousemove = (e: MouseEvent) => {
            const moveX = Math.min(
                Math.max(offsetX + e.clientX - downX, minLeft),
                maxLeft
            )
            const moveY = Math.min(
                Math.max(offsetY + e.clientY - downY, minTop),
                maxTop
            )
            transform = {
                offsetX: moveX,
                offsetY: moveY
            }
            targetRef.value!.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`
        }
        const onMouseup = (e: MouseEvent) => {
            document.removeEventListener('mousemove', onMousemove)
            document.removeEventListener('mouseup', onMouseup)
        }

        document.addEventListener('mousemove', onMousemove)
        document.addEventListener('mouseup', onMouseup)
    }

    const onDraggable = () => {
        if (targetRef.value && dragRef.value) {
            dragRef.value.addEventListener('mousedown', onMousedown)
        }
    }

    const offDraggable = () => {
        if (dragRef.value && targetRef.value) {
            dragRef.value.removeEventListener('mousedown', onMousedown)
        }
    }

    onMounted(() => {
        watchEffect(() => {
            if (draggable.value) {
                onDraggable()
            } else {
                offDraggable()
            }
        })
    })
    onBeforeUnmount(() => {
        offDraggable()
    })
}