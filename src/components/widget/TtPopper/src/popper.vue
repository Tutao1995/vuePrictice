<template>
  <Trigger :nowrap="nowrap" :trigger="trigger" v-bind="$attrs">
    <slot></slot>
  </Trigger>
  <Teleport :to="`#${selector}`">
    <Transition>
      <div 
        v-if="show && !props.disabled"
        ref="contentRef"
        :class="contentClass"
        :style="contentStyle"
        :data-side="placement"
      >
        <slot name="content"></slot>
        <div 
          v-if="showArrow" 
          ref="arrowRef" 
          :class="n('arrow')" 
          :style="arrowStyle"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { provide, onMounted, ref, unref, computed, watch, Teleport } from 'vue'
import Trigger from './trigger.vue'
import { PopperProps, PopperContextKey } from './popper.ts'
import { createNamespace } from '../../utils/index'
import { usePopperContainer } from './hooks/use-popper-container'
import { useFloating } from './hooks/use-floating'
import { offset, arrow, shift, flip } from '@floating-ui/vue'

// 组件命名
defineOptions({
  name: 'TtPopper'
})

const props = defineProps(PopperProps)

// 统一类名
const { n } = createNamespace('popper')

// 三角箭头元素
const arrowRef = ref()
const show = ref(false)

const { selector } = usePopperContainer()

const placement = ref(props.placement)
const strategy = computed({
  get() {
    return props.strategy
  },
  set() {}
})

const middleware = computed(() => {
  const middlewares = [shift(), flip(), offset(props.offset)]
  if(props.showArrow) {
    middlewares.push(arrow({ element: arrowRef.value }))
  }
  return middlewares
})

const { x, y, referenceRef, contentRef, middlewareData, update } = useFloating({
  placement,
  middleware,
  strategy,
})

const contentStyle = computed(() => {
  return {
    left: x.value + 'px', top: y.value + 'px' 
  }
})

const contentClass = computed(() => {
  return [ n(), `is-${props.effect}`, { 'is-pure': props.pure }, props.popperClass ]
})
const side = computed(() => {
  return placement.value.split('-')[0]
})

const arrowStyle = computed(() => {
  if(!props.showArrow) return {}
  const { arrow } = unref(middlewareData)
  return { left: arrow?.x + 'px', top: arrow?.y + 'px' }
})




onMounted(() => {
  watch(
    () => props.reference || referenceRef.value,
    (el) => {
      referenceRef.value = el || undefined
    }, 
    {
      immediate: true
    }
  )
})

const onOpen = () => {
  show.value = true
}

const onClose = () => {
  show.value = false
}

watch(
  () => [props.visible],
  ([val]) => {
    show.value = val
  }
)


provide(PopperContextKey, {
  onClose,
  onOpen,
  triggerRef: referenceRef
})

defineExpose({
  reference: contentRef,
  update,
  onClose,
  onOpen
})


</script>

<style lang="scss" scoped>
$sides: (
  top: bottom,
  right: left,
  bottom: top,
  left: right
);
$N: 'tt-popper';
.#{$N} {
  --van-arrow-size: 10px;
  --tt-popper-content-bg: #fff;
  --tt-popper-border: 1px solid #ebedf0;
  border-radius: 4px;
  color: #000;
  background-color: var(--tt-popper-content-bg);
  padding: 10px 12px;
  border: var(--tt-popper-border);
  position: absolute;
  white-space: nowrap;
  transition: opacity .3s;
  font-size: 13px;
  z-index: 1000;
  width: max-content;
  
  &__arrow {
    position: absolute;
    width: 10px;
    height: 10px;
    background: var(--tt-popper-content-bg);
    transform: rotate(45deg);
  }
  @each $key, $value in $sides {
    &[data-side^='#{$value}'] {
      .#{$N}__arrow {
        #{$key}: -5px;
      }
      .#{$N}__arrow {
        border-#{$key}: var(--tt-popper-border);
        @if ($value=="top") {
          border-right: var(--tt-popper-border);
        }
        @if ($value=="bottom") {
          border-left: var(--tt-popper-border);
        }
        @if ($value=="left") {
          border-left: var(--tt-popper-border);
        }
        @if ($value=="right") {
          border-bottom: var(--tt-popper-border);
        }
      }
    }
  }
  &.is-dark {
    --tt-popper-content-bg: #000;
    color: #fff;
    border: none;

    .#{$N}__arrow {
      border-color: transparent;
    }
  }
}

.tt-popper-fade-enter-from,
.tt-popper-fade-leave-to {
  opacity: 0;
}
</style>