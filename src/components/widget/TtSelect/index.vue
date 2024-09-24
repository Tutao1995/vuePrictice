<template>
  <div :class="n()">
    <div :class="n('__selection')" ref="triggerRef">
      <slot />
      <div :class="[n('__selection-item'), n('__input-wrapper')]">
        <input type="text" :class="n('__input')" :value="modelValue" autocomplete="off" readonly :spellcheck="false">
      </div>
    </div>
    <Teleport :to="`#${selector}`">
      <Transition :name="transitionName">
        <div
          v-if="visible"
          ref="contentRef"
          :class="['tt-popper', `is-${effect}`, popperClass]"
          :style="contentStyle"
          :data-side="side"
          @mousedown.stop
        >
          <select-item 
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
          <span
            v-if="showArrow"
            ref="arrowRef"
            class="tt-popper__arrow"
            :style="arrowStyle"
          >
          </span>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '../utils/index'
import useTrigger from '../hooks/useTrigger'
import usePopperContainer from '../hooks/usePopperContainer'
import useFloating from '../hooks/useFloating'
import { offset, arrow, shift, flip } from '@floating-ui/vue'
import type { Placement, Strategy } from '@floating-ui/vue'
import { PropType } from 'vue'
import SelectItem from './components/SelectItem.vue'

const { n } = createNamespace('tt-select')

const { triggerRef, visible, noWrap } = useTrigger();
const transitionName = 'tt-popper-fade';
const placement = ref<Placement>('bottom');
const effect = 'light'
const showArrow = true
const side = 'bottom'
const arrowRef = ref()
const strategy = ref<Strategy>('absolute')

const { selector } = usePopperContainer()

const middleware = computed(() => {
  const mds = [shift(), flip(), offset(10)]
  mds.push(arrow({ element: arrowRef.value }))
  return mds
})

const {
  x,
  y,
  contentRef,
  middlewareData,
  update
} = useFloating({ middleware, placement, strategy }, triggerRef)

const contentStyle = computed(() => ({ left: x.value + 'px', top: y.value + 'px' }))
const arrowStyle = computed(() => {
  const { arrow } = unref(middlewareData)
  return {
    left: arrow?.x + 'px',
    top: arrow?.y + 'px'
  }
})

interface OptionType {
  label: string,
  value: string
}
type OptionsType = OptionType[]


const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  popperClass: {
    type: String,
    default: ''
  },
  options: {
    type: Array as PropType<OptionsType>,
    default: () => []
  }
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