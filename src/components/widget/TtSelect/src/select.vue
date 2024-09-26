<template>
  <div :class="n()" ref="selectRef">
    <tt-tooltip
      trigger="click"
      :disabled="props.disabled"
    >
      <div 
        :class="n('__input-wrapper')"
        :style="inputStyle"
      >
        <input 
          :size="props.size"
          type="text" 
          autocomplete="off"
          tab-index="-1"
          :class="n('__input')" 
          :value="props.modelValue" 
          :disabled="props.disabled" 
        />
      </div>
    </tt-tooltip>
  </div>
</template>

<script setup lang="ts">
import TtTooltip from '../../TtToolTip'
import { createNamespace } from '../../utils/index'
import { SelectProps } from './select'
defineOptions({
  name: 'TtSelect'
})

const { n } = createNamespace('select')
const props = defineProps(SelectProps)
const selectRef = ref()


const inputStyle = computed(() => {
  return {
    width: props.width
  }
})

</script>

<style scoped lang="scss">

</style>