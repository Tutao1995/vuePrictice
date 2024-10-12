<template>
    <div :class="n()" ref="selectRef">
        <tt-tooltip
            trigger="click"
            effect="light"
            placement="bottom-start"
            transitionName="tt-select-menu"
            :pure="true"
            :disabled="props.disabled"
            @open="onOpen"
            @close="onClose"
        >
            <div :class="n('input-wrapper')" :style="inputStyle">
                <tt-input
                    v-model="selectShowValue"
                    :placeholder="props.placeholder"
                    :disabled="props.disabled"
                    :size="props.size"
                    :readonly="true"
                >
                    <template #suffix>
                        <tt-icon :class="iconClass" iconName="icon-chevron-down" />
                    </template>
                </tt-input>
            </div>
            <template #content>
                <div :class="n('options')" :style="optionsStyle">
                    <div
                        v-for="item in props.options"
                        :key="item.value"
                        :class="[
                            n('option'),
                            item.value === selectValue ? n('option--selected') : '',
                            item.disabled ? n('option--disabled') : '',
                        ]"
                        :title="item.label"
                        @click.stop="selectItem(item)"
                    >
                        {{ item.label }}
                    </div>
                </div>
            </template>
        </tt-tooltip>
    </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import TtTooltip from '../../TtToolTip'
import { createNamespace } from '../../utils/index'
import { SelectProps, SelectContextKey } from './select'
import type { Option } from './select'

import TtInput from '../../TtInput'
import TtIcon from '../../TtIcon'
defineOptions({
    name: 'TtSelect',
})

const { n } = createNamespace('select')
const props = defineProps(SelectProps)
const selectRef = ref()

const inputStyle = computed(() => {
    return {
        width: props.width,
    }
})

const optionsStyle = computed(() => {
    return {
        width: props.width,
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

const selectValue = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emit('update:modelValue', val)
    },
})

const selectShowValue = computed(() => {
    const option = props?.options?.find((item) => item.value === selectValue.value)
    return option?.label || ''
})

const selectItem = (item: Option) => {
    console.log(new Date().toLocaleTimeString(), 'selectItem')
    if (item.disabled) return
    if (selectValue.value === item.value) return
    emit('update:modelValue', item.value)
    emit('change', item.value)
}

const isOpen = ref(false)
const iconClass = computed(() => {
    return {
        [n('icon-rotate')]: isOpen.value,
        [n('input-icon')]: true
    }
})

const onOpen = () => {
  isOpen.value = true
}

const onClose = () => {
  isOpen.value = false
}

</script>

<style scoped lang="scss">
@import '../../scss/variables.scss';

$N: 'tt-select';
.#{$N} {
    width: 100%;
    &__input-icon {
      cursor: pointer;
      transition: all .2s ease;
    }
    &__icon-rotate {
      transform: rotate(180deg);
    }
    &__options {
        padding: 0px !important;
        width: 100%;
        max-height: 270px;
        overflow-y: auto;
    }
    &__option {
        padding: 0px 10px !important;
        height: $medium-height;
        line-height: $medium-height;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        box-sizing: border-box;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        &:hover {
            color: $text-color-white;
            background: $active-color;
            opacity: 0.3
        }
    }
    &__option--selected {
        background: $primary-color !important;
        color: #fff;
        font-weight: 700;
    }
    &__option--disabled {
        color: $text-color-disabled !important;
        background: $bg-disabled-color !important;
        cursor: not-allowed !important;
    }
}
</style>
