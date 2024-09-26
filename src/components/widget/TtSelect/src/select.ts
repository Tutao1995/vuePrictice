import { PropType } from 'vue'
export type SelectValueType = string | number | boolean | Object | undefined
export type Option = {
  label: string | number,
  value: string | number,
  disabled?: Boolean
}

export const SelectProps = {
  // 下拉框的值
  modelValue: {
    type: [String, Number],
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
  placeholder: {
    type: String,
    default: ''
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  }
}