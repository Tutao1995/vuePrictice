<template>
    <div :class="inputClass">
        <input
            ref="inputRef"
            type="text"
            autocomplete="off"
            tab-index="-1"
            v-model="value"
            :class="n('inner')"
            :disabled="props.disabled"
            :readonly="props.readonly"
            :placeholder="props.placeholder"
            @focus="onfocus"
            @blur="onblur"
        />
        <tt-icon
            v-if="props.clearable && value && !props.disabled"
            @click="clear"
            :class="n('clear')"
            iconName="icon-x-circle"
        />
        <span v-if="$slots.suffix" :class="n('suffix')" tab-index="-1">
            <slot name="suffix"></slot>
        </span>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { InputProps } from './input'
import { createNamespace } from '../../utils/index'
import TtIcon from '../../TtIcon'

defineOptions({
    name: 'TtInput',
})

const { n } = createNamespace('input')

const props = defineProps(InputProps)

const emit = defineEmits(['update:modelValue', 'clear'])

const inputRef = ref()
const isFocus = ref(false)

const inputClass = computed(() => {
    return [
        n(),
        isFocus.value ? n('--focus') : '',
        props.disabled ? n('--disabled') : '',
        n(`--${props.size}`),
    ]
})

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    },
})

const clearShow = computed(() => {
    return props.clearable && value && !props.disabled
})

const clear = () => {
    if (!props.clearable || !value || props.disabled) return
    emit('update:modelValue', '')
    emit('clear')
}

const onfocus = () => {
    isFocus.value = true
}

const onblur = () => {
    isFocus.value = false
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
$N: 'tt-input';
$FN: 'tt-input--focus';
$DN: 'tt-input--disabled';
$SN: 'tt-input--small';
$MN: 'tt-input--medium';
$LN: 'tt-input--large';

.#{$N} {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    font-family: Microsoft YaHei, Arial, Helvetica, sans-serif;
    background: $bg-color;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &__inner {
        padding: 0px 10px;
        flex: 1;
        min-width: 0;
        background: $bg-color;
        outline: none;
        border: none;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    &__clear {
        margin-left: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 14px;
        height: 14px;
        color: #ccc;
        font-size: 12px;
        border-radius: 50%;
        cursor: pointer;
    }
    &__suffix {
        margin-left: 4px;
    }
}

$sizeMap: (
    (
        size: 'small',
        height: $small-height,
        font-size: $small-font-size,
    ),
    (
        size: 'medium',
        height: $medium-height,
        font-size: $medium-font-size,
    ),
    (
        size: 'large',
        height: $large-height,
        font-size: $large-font-size,
    )
);

@for $i from 1 through length($sizeMap) {
    // 遍历数组
    $item: nth($sizeMap, $i);
    .#{$N}--#{map-get($item, size)} {
        height: #{map-get($item, height)};
        font-size: #{map-get($item, font-size)};
    }
}

.#{$FN} {
    // height: $medium-height;
    font-size: $medium-font-size;
}

.#{$FN} {
    border-color: $primary-color !important;
    box-shadow: $box-shadow;
}
.#{$DN} {
    background-color: $disabled-color !important;
    cursor: not-allowed;
    .#{$N}__inner {
        background-color: $disabled-color !important;
        cursor: not-allowed;
    }
}
</style>
