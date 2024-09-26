import { PropType } from 'vue'

type Option = {
  label: string,
  value: string
}

export const SelectProps = {
  // 下拉框的值
  modelValue: {
    type: String,
    default: ''
  },
  // 下拉框的选项
  options: {
    type: [] as PropType<Option[]>,
    default: () => []
  },
  // 下拉框的宽度
  width: {
    type: String,
    default: '100px'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  }
}