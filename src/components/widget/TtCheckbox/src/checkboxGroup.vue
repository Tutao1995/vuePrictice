<template>
    <div :class="checkboxGroupClass">
        <tt-checkbox
            v-for="item in props.options"
            :key="item.value"
            :size="props.size"
            :label="item.label"
            :name="item.value"
            :disabled="item.disabled"
            @change="(value: boolean) => onchange(value, item)"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, computed, provide } from 'vue'
import { CheckboxGroupProps, checkboxGroupContextKey } from './checkbox'
import { createNamespace } from '../../utils/index'
import TtCheckbox from './checkbox.vue'
defineOptions({
    name: 'TtCheckboxGroup',
})

const { n } = createNamespace('checkbox-group')

const props = defineProps(CheckboxGroupProps)

const emit = defineEmits(['update:modelValue', 'change'])

const modelValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
        emit('change', value)
    },
})

const checkboxGroupClass = computed(() => {
    return [n()]
})

const onchange = (value: boolean, item: any) => {
    if (value) {
        modelValue.value = [...modelValue.value, item.value]
    } else {
        modelValue.value = modelValue.value.filter((v: any) => v !== item.value)
    }
}

provide(checkboxGroupContextKey, {
    ...props,
    modelValue: modelValue as any,
})
</script>

<style scoped></style>
