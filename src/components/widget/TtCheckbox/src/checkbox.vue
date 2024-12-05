<template>
    <label :class="checkboxClass">
        <span :class="n('inner')">
            <input
                tab-index="-1"
                type="checkbox"
                :disabled="props.disabled"
                v-model="checkValue"
                @focus="onfocus"
                @blur="onblur"
                :class="n('input')"
            />
            <tt-icon :class="n('icon')" iconName="icon-check"></tt-icon>
        </span>
        <span :class="n('label')" :title="props.label">{{ props.label }}</span>
    </label>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed, inject } from 'vue'
import { CheckboxProps, checkboxGroupContextKey } from './checkbox'
import { createNamespace } from '../../utils/index'
import TtIcon from '../../TtIcon'

defineOptions({
    name: 'TtCheckbox',
})

const { n } = createNamespace('checkbox')

const props = defineProps(CheckboxProps)

const emit = defineEmits(['update:modelValue', 'change'])

const checkboxGroup = inject(checkboxGroupContextKey, undefined)

const indeterminate = ref(false)

const checkboxClass = computed(() => {
    return [
        n(),
        n(`--${props.size}`),
        props.disabled ? n(`--disabled`) : '',
        checkValue.value ? n(`--checked`) : '',
        props.indeterminate && indeterminate.value ? n(`--indeterminate`) : '',
        isFocus.value ? n(`--focus`) : '',
    ]
})

const checkValue = computed({
    get() {
        if (checkboxGroup?.group) {
            // @ts-ignore
            if (checkboxGroup?.modelValue?.value.includes(props.name)) {
                return true
            } else {
                return false
            }
        }
        return props.modelValue
    },
    set(val) {
        if (indeterminate.value) {
            val = true
        }
        emit('update:modelValue', val)
        emit('change', val)
        indeterminate.value = false
    },
})

watch(
    () => props.indeterminate,
    () => {
        indeterminate.value = props.indeterminate
    },
    {
        immediate: true,
    }
)

const isFocus = ref(false)

const onfocus = () => {
    isFocus.value = true
}

const onblur = () => {
    isFocus.value = false
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables.scss';
$N: 'tt-checkbox';
$CN: 'tt-checkbox--checked';
$FN: 'tt-checkbox--focus';
$DN: 'tt-checkbox--disabled';
$SN: 'tt-checkbox--small';
$MN: 'tt-checkbox--medium';
$LN: 'tt-checkbox--large';
$IN: 'tt-checkbox--indeterminate';

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
        border-radius: $border-radius;
        cursor: pointer;
        user-select: none;
        transition: all ease 0.3s;
        & > input {
            position: absolute;
            width: 100%;
            height: 100%;
            margin: 0;
            opacity: 0;
            z-index: 2;
            cursor: pointer;
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
    opacity: 0.5;
    cursor: not-allowed;
    .#{$N}__inner {
        cursor: not-allowed;
        opacity: 0.5;
        & > input {
            cursor: not-allowed;
        }
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

.#{$IN} {
    .#{$N}__inner {
        background: $bg-color;
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: $primary-color;
            margin-left: -5px;
            margin-top: -5px;
        }
    }
}
</style>
