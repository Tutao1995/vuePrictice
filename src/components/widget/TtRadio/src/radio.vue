<template>
  <label :class="radioClass">
    <span :class="n('inner')">
      <input 
        type="radio" 
        tab-index="-1" 
        v-model="checkValue" 
        :name="props.name" 
        :class="n('input')"
        :disabled="props.disabled" 
        @focus="onfocus" 
        @blur="onblur"  
      />
    </span>
    <span :class="n('label')" :title="props.label">{{ props.label }}</span>
  </label>
</template>

<script setup lang="ts">


import { ref, defineEmits, computed, inject } from 'vue'
import { RadioProps, radioGroupContextKey } from './radio';
import { createNamespace } from '../../utils/index'


defineOptions({
  name: 'TtRadio',
})

const { n } = createNamespace('radio')

const props = defineProps(RadioProps)

const emit = defineEmits(['update:modelValue', 'change'])

const radioGroup = inject(radioGroupContextKey)


const radioClass = computed(() => {
  return [
    n(),
    n(`--${props.size}`),
    props.disabled ? n(`--disabled`) : '',
    checkValue.value ? n(`--checked`) : '',
    isFocus.value ? n(`--focus`) : '' 
  ]
})

const checkValue = computed({
  get() {
    if(radioGroup?.group) {
      // @ts-ignore
      return radioGroup.modelValue.value === props.value
    }
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

const isFocus = ref(false)

const onfocus = () => {
  isFocus.value = true;
}

const onblur = () => {
  isFocus.value = false;
}


</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
$N: 'tt-radio';
$CN: 'tt-radio--checked';
$FN: 'tt-radio--focus';
$DN: 'tt-radio--disabled';
$SN: 'tt-radio--small';
$MN: 'tt-radio--medium';
$LN: 'tt-radio--large';

.#{$N} {
  display: inline-flex;
  &__inner {
    position: relative;
    width: 16px;
    height: 16px;
    color: #fff;
    font-size: 12px;
    box-sizing: border-box;
    background: $bg-color;
    border: 1px solid $border-color;
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
    transition: all ease .3s;
    & > input {
      position: absolute;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
      z-index: 2;
      cursor: pointer;
    }
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: $bg-color;
      transition: all ease .3s;
    }
  }
  &__label {
    padding: 0 8px;
    color: $text-color;
    cursor: pointer;
  }
}

.#{$FN} {
  .#{$N}__inner {
    border-color: $primary-color;
  }
}

.#{$MN} {
  height: 16px;
}
.#{$DN} {
  opacity: .5;
  cursor: not-allowed;
  .#{$N}__inner {
    cursor: not-allowed;
    opacity: .5;
    & > input {
      cursor: not-allowed;
    }
  }
  .#{$N}__label {
    cursor: not-allowed;
    opacity: .5;
  }
}

.#{$CN} {
  .#{$N}__inner {
    background: $primary-color;
    box-shadow: $box-shadow;
  }
}

.#{$SN} {
  .#{$N}__inner {
    line-height: 1;
    background: $primary-color;
  }
}
.#{$MN} {
  .#{$N}__inner {
    line-height: 0.75;
  }
}
.#{$LN} {
  .#{$N}__inner {
    background: $primary-color;
    line-height: 1.5;
  }
}

</style>