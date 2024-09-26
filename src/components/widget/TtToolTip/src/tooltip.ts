import { PropType } from 'vue'
export const TooltipProps = {
  content: String,
  placement: {
    type: String,
    default: 'bottom',
  },
  effect: {
    type: String as PropType<'light' | 'dark'>,
    default: 'dark'
  },
  disabled: {
    type: Boolean,
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  rawContent: Boolean,
  transitionName: {
    type: String,
    default: 'tt-popper-fade'
  }
}