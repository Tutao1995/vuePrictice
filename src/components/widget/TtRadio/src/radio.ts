import { PropType, InjectionKey, ExtractPropTypes } from 'vue'

export const RadioProps = {
  modelValue: {
    type: String as PropType<string | number | boolean>,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  name: {
    type: String as PropType<string>,
    default: ''
  },
  value: {
    type: String as PropType<string | number | boolean>,
    default: ''
  }
}

export type Option = {
  label: string ,
  value: string | number,
  disabled?: boolean
}


type modelValueType = string | number

export const RadioGroupProps = {
  modelValue: {
    type: String as PropType<modelValueType>,
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
  },
  name: {
    type: String as PropType<string>,
    default: ''
  }
}


export const radioGroupContextKey: InjectionKey<ExtractPropTypes<typeof RadioGroupProps>> = Symbol('radioGroupContextKey')
