<template>
  <div :class="radioGroupClass">
    <tt-radio 
      v-for="item in props.options"
      :key="item.value"
      :size="props.size"
      :label="item.label"
      :name="radioGroupName"
      :value="item.value"
      :disabled="item.disabled"
      @change="(value: boolean) => onchange(value, item)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed, provide } from 'vue'
import { RadioGroupProps, radioGroupContextKey } from './radio';
import { createNamespace } from '../../utils/index'
import TtRadio from './radio.vue'
defineOptions({
  name: 'TtRadioGroup',
})

const { n } = createNamespace('radio-group')

const props = defineProps(RadioGroupProps)

const emit = defineEmits(['update:modelValue', "change"])


const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value);
    emit('change', value);
  }
})

const radioGroupClass = computed(() => {
  return [
    n(),
  ]
})

const radioGroupName = computed(() => {
  return props.name || `tt-radio-group-${Math.random().toString(36).substr(2, 9)}`
})


const onchange = (value: boolean, item: any) => {
  if (value) {
    modelValue.value = item.value
  }
}

provide(radioGroupContextKey, {
  ...props,
  modelValue: modelValue as any
})

</script>

<style scoped>

</style>