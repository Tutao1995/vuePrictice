import { onBeforeMount } from 'vue'
let cachedContainer: HTMLElement
const selector = `tt-popper-container`

type PopperContainerType = {
  container: HTMLElement
  selector: string
}

const usePopperContainer = (): PopperContainerType => {
  onBeforeMount(() => {
    if (!cachedContainer && !document.querySelector(`#${selector}`)) {
      const container = document.createElement('div')
      container.id = selector
      cachedContainer = container
      document.body.appendChild(container)
    }
  })
  
  return {
    container: cachedContainer,
    selector
  } 
}

export default usePopperContainer
