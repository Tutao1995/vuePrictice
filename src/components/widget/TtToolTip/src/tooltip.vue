<template>
  <tt-popper v-bind="popperProps" :nowrap="nowrap" ref="popperRef">
    <slot></slot>
    <template #content>
      <slot name="content">
        <span>{{ content }}</span>
      </slot>
    </template>
  </tt-popper>
</template>

<script setup lang="ts">
import { useAttrs, ref, computed } from 'vue'
import TtPopper, { PopperProps } from '../../TtPopper';
import { TooltipProps } from './tooltip';
import { useNowrap } from '../../TtPopper/src/hooks/use-nowrap' 
defineOptions({
  name: 'TtToolTip'
})
const props = defineProps(TooltipProps)
const attrs = useAttrs()
const popperRef = ref()

const pick = (source: any, keys: string[]) => {
  return keys.reduce((acc: any, key) => {
    acc[key] = source[key]
    return acc
  }, {})
}

const popperProps = computed(() => {
  return { ...attrs, ...pick(props, Object.keys(PopperProps)) }
})

const nowrap = useNowrap()

const update = () => {
  popperRef.value.update()
}

const open = () => {
  popperRef.value.onOpen()
}

const close = () => {
  popperRef.value.onClose()
}

defineExpose({
  update,
  open,
  close
})
</script>

<style lang="scss" scoped>
.tt-tooltip-fade-enter-from,
.tt-tooltip-fade-leave-to {
  opacity: 0;
}
</style>