import { PropType, InjectionKey, ExtractPropTypes } from 'vue'

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
  },
  name: {
    type: String as PropType<string | number>,
    default: ''
  }
}

export type Option = {
  label: string ,
  value: string | number,
  disabled?: boolean
}

type modelValueType = string | number

export const CheckboxGroupProps = {
  modelValue: {
    type: Array as PropType<modelValueType[]>,
    default: () => []
  },
  options: {
    type: Array as PropType<Option[]>,
    default: () => []
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  group: {
    type: Boolean,
    default: true
  }
}

export const checkboxGroupContextKey: InjectionKey<ExtractPropTypes<typeof CheckboxGroupProps>> =
  Symbol('checkboxGroupContextKey')