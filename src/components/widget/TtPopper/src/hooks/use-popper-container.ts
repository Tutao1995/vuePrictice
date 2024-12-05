import { onBeforeMount } from 'vue'

let cacheContainer: HTMLElement
const selector = `tt-popper-container`

type PopperContainerType = {
    container: HTMLElement
    selector: string
}

export const usePopperContainer = (): PopperContainerType => {
    onBeforeMount(() => {
        if (!cacheContainer && !document.querySelector(`#${selector}`)) {
            const container = document.createElement('div')
            container.id = selector
            cacheContainer = container
            document.body.appendChild(container)
        }
    })
    return {
        container: cacheContainer,
        selector,
    }
}
