import { PropType } from 'vue'

export const CheckboxProps = {
  label: {
    type: String,
    default: ''
  },
  // 是否选中
  modelValue: {
    type: Boolean,
    default: false
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否为半选状态
  indeterminate: {
    type: Boolean,
    default: false
  },
  // 是否为选中状态
  checked: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  }
}