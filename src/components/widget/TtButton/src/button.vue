<template>
  <button type="button" :class="buttonClass" :disabled="disabled">
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, toRefs } from 'vue'
import { ButtonProps } from './button'
import { createNamespace } from '../../utils/index'

defineOptions({
  name: 'TtButton'
})

const { n } = createNamespace('button')
const props = defineProps(ButtonProps)
const { text, type, size, disabled, shape, loading } = toRefs(props)

const buttonClass = computed(() => {
  return [
    n(),
    n(`--${type.value}`),
    n(`--${size.value}`),
    n(`--${shape.value}`),
    disabled.value ? n(`--disabled`) : '',
  ]
})


</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
$N: 'tt-button';
$FN: 'tt-button--focus';
$DN: 'tt-button--disabled';
$SN: 'tt-button--small';
$MN: 'tt-button--medium';
$LN: 'tt-button--large';
$CN: 'tt-button--circle';
$DEN: 'tt-button--default';

.#{$N} {
  padding: 0 12px;
  display: inline-block;
  height: $medium-height;
  line-height: $medium-height;
  box-sizing: border-box;
  color: $text-color;
  white-space: nowrap;
  text-align: center;
  cursor: pointer;
  background: $bg-color;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  transition: all .3s cubic-bezier(.645,.045,.355,1);
  user-select: none;
  touch-action: manipulation;
  outline: none;
  -webkit-appearance: none;
}


.#{$CN} {
  border-radius: 50%;
}
.#{$DEN} {
  &:hover {
    opacity: 0.3;
    color: $active-color;
    border-color: $active-color;
    box-shadow: $box-shadow;
  }
  &:active {
    
  }
}

.#{$DN} { 
  background-color: $disabled-color !important;
  border-color: $text-color-disabled !important;
  cursor: not-allowed;
  &:hover {
    color: $text-color-disabled;
    border-color: $text-color-disabled !important;
    box-shadow: $box-shadow; 
  }
}

$sizeMap: (
  (size: 'small', height: $small-height, font-size: $small-font-size),
  (size: 'medium', height: $medium-height, font-size: $medium-font-size),
  (size: 'large', height: $large-height, font-size: $large-font-size),
);


@for $i from 1 through length($sizeMap) { // 遍历数组
  $item: nth($sizeMap, $i);
  .#{$N}--#{map-get($item, size)} {
    height: #{map-get($item, height)};
    font-size: #{map-get($item, font-size)};
  }
}


$typeMap: (
  (type: 'primary', color: $text-color-white, border-color: $primary-color, background: $primary-color),
  (type: 'success', color: $text-color-white, border-color: $success-color, background: $success-color),
  (type: 'warning', color: $text-color-white, border-color: $warning-color, background: $warning-color),
  (type: 'danger', color: $text-color-white, border-color: $error-color, background: $error-color),
  (type: 'info', color: $text-color-white, border-color: $info-color, background: $info-color),
);

@for $i from 1 through length($typeMap) { // 遍历数组
  $item: nth($typeMap, $i);
  .#{$N}--#{map-get($item, 'type')} {
    color: #{map-get($item, 'color')};
    border-color: #{map-get($item, 'border-color')};
    background: #{map-get($item, 'background')};
    &:hover {
      opacity: .8;
      box-shadow: $box-shadow;
    }
  }
}

</style>