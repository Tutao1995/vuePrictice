import { ref } from 'vue'

export function useDrag(props: any) {
    const ttDialog = ref()
    const translateX = ref(0)
    const translateY = ref(0)
    let canDragging = false
    let startX = 0
    let startY = 0
    let lastX = 0
    let lastY = 0
    let width = 0
    let height = 0
    let target: HTMLElement
    const onMouseDown = (e: any) => {
        target = e.target
        canDragging = true
        startX = e.x
        startY = e.y
        document.addEventListener('mousemove', onMousemove)
        document.addEventListener('mouseup', onMouseup)
        console.log(ttDialog.value.clientWidth)
        width = ttDialog.value.clientWidth
        height = ttDialog.value.clientHeight
        e.target.style.cursor = 'move'
        e.target.style.userSelect = 'none'
    }

    const onMousemove = (e: any) => {
        if (!canDragging) return
        let xValue = e.x - startX + lastX
        let yValue = e.y - startY + lastY
        const maxXValue = width / 2
        const minXValue = -(width / 2)
        const maxYValue = height / 2
        const minYValue = -(height / 2)
        if (xValue < minXValue) {
            xValue = minXValue
        }

        if (xValue > maxXValue) {
            xValue = maxXValue
        }

        if (yValue < minYValue) {
            yValue = minYValue
        }

        if (yValue > maxYValue) {
            yValue = maxYValue
        }
        translateX.value = xValue
        translateY.value = yValue
    }

    const onMouseup = (e: any) => {
        target.style.cursor = 'default'
        target.style.userSelect = 'default'
        canDragging = false
        lastX = translateX.value
        lastY = translateY.value
        document.removeEventListener('mousemove', onMousemove)
        document.removeEventListener('mouseup', onMouseup)
    }

    watch(
        () => props.modelValue,
        (value) => {
            if (!value) {
                translateX.value = 0
                translateY.value = 0
                lastX = 0
                lastY = 0
            }
        }
    )

    onUnmounted(() => {
        translateX.value = 0
        translateY.value = 0
    })

    return {
        ttDialog,
        translateX,
        translateY,
        onMouseDown,
    }
}
